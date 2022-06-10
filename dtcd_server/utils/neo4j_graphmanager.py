from itertools import chain
from textwrap import shorten
from typing import Generator, List, Set, Union

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


def filter_nodes(subgraph: Subgraph, label: str) -> Generator[Node, None, None]:
    """Construct an iterator over subgraph nodes with the given label."""
    return (x for x in subgraph.nodes if x.has_label(label))


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

    def rename_fragment(self, fragment_id: int, name: str) -> Fragment:
        """Rename a fragment.

        Raises `FragmentDoesNotExist` if fragment is missing.
        """

        fragment = self.get_fragment_or_exception(fragment_id)  # TODO separate tx
        fragment.name = name
        self._repo.save(fragment)
        return fragment

    def remove_fragment(self, fragment_id: int):
        """Remove fragment.

        Raises `FragmentDoesNotExist` if a fragment is missing,
        `FragmentNotEmpty` if a fragment has some content.
        """

        # TODO cascade remove content?
        fragment = self.get_fragment_or_exception(fragment_id)  # TODO separate tx

        if self.empty(fragment_id):  # TODO separate tx
            self._repo.delete(fragment)
        else:
            raise FragmentNotEmpty(f"fragment [{fragment_id}] has content")

    # ------------------------------------------------------------------
    # fragment content management
    # ------------------------------------------------------------------

    def _match_fragment_content_nodes(self, tx: Transaction, fragment_id: int) -> Cursor:
        """
        Match all descendant nodes belonging to a given fragment within a transaction.

        Returned records contain nodes under `n` key.
        """

        q, params = cypher_join(
            clauses.MATCH_FRAGMENT_DATA,
            'UNWIND nodes(p) as n',  # TODO explain where p comes from
            'RETURN DISTINCT n',
            id=fragment_id,  # TODO explain why we need this
        )
        cursor = tx.run(q, params)

        return cursor

    def _fragment_content_nodes(self, tx: Transaction, fragment_id: int) -> Set[Node]:
        """
        Return a set of descendant nodes belonging to a given fragment within a transaction.
        """

        cursor = self._match_fragment_content_nodes(tx, fragment_id)
        return set(record[0] for record in cursor)

    def _match_fragment_content_relationships(self, tx: Transaction, fragment_id: int) -> Cursor:
        """
        Match all descendant relationships belonging to a given fragment
        within a transaction.

        Each returned record contains several values under the following keys:
        - `start_id` / `end_id` are internal IDs of start/end nodes
        - `type` is a relationship type
        - `properties` is a dictionary of relationship properties
        """

        # TODO relationships BETWEEN entities are not matched here
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
            id=fragment_id,
        )
        cursor = tx.run(q, params)

        return cursor

    def _fragment_content(self, tx: Transaction, fragment_id: int) -> Subgraph:
        """Return bound subgraph belonging to given fragment.

        All operations run within a given transaction.
        """

        # TODO rels between entities are missing
        # nodes
        nodes = self._fragment_content_nodes(tx, fragment_id)
        id2node = {
            node.identity: node
            for node in nodes
        }

        # relationships
        rels_cursor = self._match_fragment_content_relationships(tx, fragment_id)

        # workaround: py2neo sucks at efficient conversion of rels to Subgraph
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

        _ = self.get_fragment_or_exception(fragment_id)  # TODO separate tx
        tx = self._graph.begin(readonly=True)
        subgraph = self._fragment_content(tx, fragment_id)
        self._graph.commit(tx)

        return subgraph

    @staticmethod
    def _merge_vertices(tx: Transaction, subgraph: Subgraph):
        """Merge Vertex nodes from subgraph, return a set of merged nodes."""

        # merge vertex roots on (label, yfiles_id)
        label = SCHEMA["labels"]["node"]
        vertices = set(filter_nodes(subgraph, label))  # O(n)
        key = SCHEMA["keys"]["yfiles_id"]
        tx.merge(Subgraph(vertices), label, key)

        return vertices

    @staticmethod
    def _merge_edges(tx: Transaction, subgraph: Subgraph):
        """Merge Edge nodes from subgraph, return a set of merged nodes."""
        label = SCHEMA["labels"]["edge"]
        edges = set(filter_nodes(subgraph, label))  # O(n)
        # TODO edge.pk
        keys = tuple(
            SCHEMA["keys"][key]
            for key in ('source_node', 'source_port', 'target_node', 'target_port')
        )
        tx.merge(Subgraph(edges), label, keys)

        return edges

    def _merge(self, tx: Transaction, subgraph: Subgraph, fragment: Fragment):
        """Merge given subgraph into the fragment.

        We want to preserve connections (edges and frontier vertices)
        between fragments. The merge is made as follows:

        1. Merge entity roots:
            1. Merge root nodes of *vertex* trees.
            2. Merge root nodes of *edge* trees.
        2. Remove old content (entity roots and their trees).
        3. Re-link fragment with new entities to be created.
        4. Merge newly created entities and links.
        """

        vertices = self._merge_vertices(tx, subgraph)
        edges = self._merge_edges(tx, subgraph)

        # delete difference
        # TODO think about this more
        current = self._fragment_content_nodes(tx, fragment.__primaryvalue__)
        old = current - vertices - edges
        tx.delete(Subgraph(old))

        # re-link fragment to subgraph entities (roots of vertex and edge trees)
        # entities with existing relationship are skipped
        root = fragment.__node__
        type_ = SCHEMA["types"]["contains_entity"]
        links = set(
            Relationship(root, type_, entity)
            for entity in chain(vertices, edges)
        )

        # create the rest of the subgraph & fragment-entity links
        # skips already bound nodes & relationships
        tx.create(subgraph | Subgraph(relationships=links))

    def write(self, subgraph: Subgraph, fragment_id: int):
        """Write new content for a given fragment.

        Binds subgraph nodes on success.
        Raises `FragmentDoesNotExist` if the fragment is missing.
        """

        # TODO error handling? (empty, bad format / input)
        fragment = self.get_fragment_or_exception(fragment_id)  # TODO separate tx
        tx = self._graph.begin()
        self._merge(tx, subgraph, fragment)
        self._graph.commit(tx)

    def remove(self, fragment_id: int):
        """Remove content of a given fragment.

        Does not remove fragment root node.
        Raises `FragmentDoesNotExist` if the fragment is missing.
        """

        _ = self.get_fragment_or_exception(fragment_id)  # TODO separate tx
        tx = self._graph.begin()
        nodes = self._fragment_content_nodes(tx, fragment_id)
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
