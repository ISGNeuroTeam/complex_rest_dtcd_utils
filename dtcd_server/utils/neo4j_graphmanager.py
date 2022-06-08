from textwrap import shorten
from typing import List, Set, Union

from py2neo import Graph, Node, Relationship, Subgraph, Transaction
from py2neo import ogm
from py2neo.cypher import Cursor, cypher_join

from . import clauses
from .abc_graphmanager import AbstractGraphManager
from .exceptions import FragmentDoesNotExist, FragmentNotEmpty
from ..settings import SCHEMA


KEYS = SCHEMA["keys"]
LABELS = SCHEMA["labels"]
TYPES = SCHEMA["types"]


class Fragment(ogm.Model):
    __primarylabel__ = LABELS["fragment"]
    name = ogm.Property()

    def __repr__(self):
        text = f"[{self.__primaryvalue__}] {self.name}"
        return shorten(text, 30)


class Neo4jGraphManager(AbstractGraphManager):
    """Interface to Neo4j operations."""

    def __init__(self, profile: str, name: str = None, **settings):
        self._graph = Graph(profile, name, **settings)  # raw queries
        self._repo = ogm.Repository.wrap(self._graph)  # ogm management
        # TODO make sure graph is available

    def read_all(self) -> Subgraph:
        """Return a subgraph of all nodes and relationships."""

        # TODO set artificial limit on number of nodes and rels returned
        tx = self._graph.begin(readonly=True)
        nodes_cursor = tx.run('MATCH (n) RETURN n')
        rels_cursor = tx.run(
            "MATCH () -[r]-> () "
            "RETURN id(startNode(r)) AS start_id, id(endNode(r)) AS end_id, "
            "type(r) AS `type`, properties(r) AS `properties`")
        self._graph.commit(tx)

        # FIXME py2neo bug in Nodes.__hash__ logic
        id2node = {
            record['n'].identity: record['n']
            for record in nodes_cursor
        }

        relationships = []
        for record in rels_cursor:
            start_node = id2node[record['start_id']]
            end_node = id2node[record['end_id']]
            t = record['type']
            properties = record.get('properties', {})
            relationships.append(Relationship(start_node, t, end_node, **properties))

        return Subgraph(id2node.values(), relationships)

    def remove_all(self):
        """Remove all nodes and relationships from this graph."""

        self._graph.delete_all()

    def update(self, graph):
        raise NotImplementedError  # TODO

    # ------------------------------------------------------------------
    # fragment root management
    # ------------------------------------------------------------------

    def fragments(self) -> List[Fragment]:
        """Return a set of all fragments."""
        return Fragment.match(self._repo).all()

    def get_fragment(self, fragment_id: int) -> Union[Fragment, None]:
        """Return a fragment with given id if it exists, None otherwise."""
        return self._repo.get(Fragment, fragment_id)

    def get_fragment_or_exception(self, fragment_id: int) -> Fragment:
        """Return a fragment with given id.

        Raises `FragmentDoesNotExist` if the fragment is missing.
        """

        fragment = self.get_fragment(fragment_id)

        if fragment is not None:
            return fragment
        else:
            raise FragmentDoesNotExist(f"fragment [{fragment_id}] does not exist")

    def create_fragment(self, name: str) -> Fragment:
        """Create and return a fragment with the given name."""

        fragment = Fragment(name=name)
        self._repo.save(fragment)

        return fragment

    def rename_fragment(self, fragment_id: int, name: str):
        """Rename a fragment.

        Raises `FragmentDoesNotExist` if fragment is missing.
        """

        fragment = self.get_fragment_or_exception(fragment_id)  # TODO separate tx
        fragment.name = name
        self._repo.save(fragment)  # TODO or push?

    def remove_fragment(self, fragment_id: int):
        """Remove fragment.

        Raises `FragmentDoesNotExist` if a fragment is missing,
        `FragmentNotEmpty` if a fragment has some content.
        """

        # TODO take into account descendants
        fragment = self.get_fragment_or_exception(fragment_id)  # TODO separate tx

        if self.empty(fragment_id):  # TODO separate tx
            self._repo.delete(fragment)
        else:
            raise FragmentNotEmpty(f"fragment [{fragment_id}] has content")

    # ------------------------------------------------------------------
    # fragment content management
    # ------------------------------------------------------------------

    def _match_fragment_content_nodes(self, tx: Transaction, name: str) -> Cursor:
        """
        Match all descendant nodes belonging to a given fragment within a transaction.

        Returned records contain nodes under `n` key.
        """

        q, params = cypher_join(
            clauses.MATCH_FRAGMENT_DATA,
            'UNWIND nodes(p) as n',  # TODO explain where p comes from
            'RETURN DISTINCT n',
            name=name,  # TODO explain why we need this
        )
        cursor = tx.run(q, params)

        return cursor

    def _fragment_content_nodes(self, tx: Transaction, name: str) -> Set[Node]:
        """
        Return a set of descendant nodes belonging to a given fragment within a transaction.
        """

        cursor = self._match_fragment_content_nodes(tx, name)
        return set(record[0] for record in cursor)

    def _match_fragment_content_relationships(self, tx: Transaction, name: str) -> Cursor:
        """
        Match all descendant relationships belonging to a given fragment
        within a transaction.

        Each returned record contains several values under the following keys:
        - `start_id` / `end_id` are internal IDs of start/end nodes
        - `type` is a relationship type
        - `properties` is a dictionary of relationship properties
        """

        # TODO relationships between entities are not matched yet
        q, params = cypher_join(
            clauses.MATCH_FRAGMENT_DATA,
            'UNWIND relationships(p) as r',
            'RETURN',
            ", ".join(
                ['id(startNode(r)) AS start_id',
                 'id(endNode(r)) AS end_id',
                 'type(r) AS `type`',
                 'properties(r) AS `properties`', ]
            ),
            name=name,
        )
        cursor = tx.run(q, params)

        return cursor

    def _fragment_content(self, tx: Transaction, name: str) -> Subgraph:
        """Return bound subgraph belonging to given fragment.

        All operations run within a given transaction.
        """

        # TODO rels between entities are missing
        # nodes
        nodes = self._fragment_content_nodes(tx, name)
        id2node = {
            node.identity: node
            for node in nodes
        }

        # relationships
        rels_cursor = self._match_fragment_content_relationships(tx, name)

        # workaround: py2neo sucks at efficient convertsion of rels to Subgraph
        # manually construct Relationships
        relationships = []
        for record in rels_cursor:
            start_node = id2node[record['start_id']]
            end_node = id2node[record['end_id']]
            t = record['type']
            properties = record.get('properties', {})
            relationships.append(Relationship(start_node, t, end_node, **properties))

        return Subgraph(id2node.values(), relationships)

    def read(self, fragment_id: int) -> Subgraph:
        """Return subgraph belonging to given fragment.

        Raises `FragmentDoesNotExist` if the fragment is missing.
        """

        fragment = self.get_fragment_or_exception(fragment_id)  # TODO separate tx
        name = fragment.name
        tx = self._graph.begin(readonly=True)
        subgraph = self._fragment_content(tx, name)
        self._graph.commit(tx)

        return subgraph

    def write(self, subgraph: Subgraph, fragment_id: str):
        """Write new content for a given fragment.

        Binds subgraph nodes on success.
        Raises `FragmentDoesNotExist` if the fragment is missing.
        """

        # TODO error handling? (empty, bad format / input)
        # TODO this approach deletes frontier nodes & cross-fragment rels

        fragment = self.get_fragment_or_exception(fragment_id)  # TODO separate tx
        name = fragment.name
        tx = self._graph.begin()

        # delete fragment content
        nodes = self._fragment_content_nodes(tx, name)
        tx.delete(Subgraph(nodes))

        # re-link fragment node to new subgraph entities
        root = fragment.__node__
        type_ = SCHEMA["types"]["contains_entity"]
        rels = [
            Relationship(root, type_, node)
            for node in subgraph.nodes
            if node.has_label(SCHEMA["labels"]["entity"])
        ]

        # create the rest of the subgraph & fragment-entity links
        tx.create(subgraph | Subgraph(relationships=rels))

        self._graph.commit(tx)

    def remove(self, fragment_id: int):
        """Remove content of a given fragment.

        Does not remove fragment root node.
        Raises `FragmentDoesNotExist` if the fragment is missing.
        """

        fragment = self.get_fragment_or_exception(fragment_id)  # TODO separate tx
        name = fragment.name
        tx = self._graph.begin()
        nodes = self._fragment_content_nodes(tx, name)
        tx.delete(Subgraph(nodes))
        self._graph.commit(tx)

    def empty(self, fragment_id: int) -> bool:
        """Return True if fragment's content is empty, False otherwise.

        Raises `FragmentDoesNotExist` if the fragment is missing.
        """

        fragment = self.get_fragment_or_exception(fragment_id)  # TODO separate tx

        # empty if there are no links to entities
        n = fragment.__node__
        link = self._graph.match_one((n, ), r_type=SCHEMA['types']['contains_entity'])
        return link is None
