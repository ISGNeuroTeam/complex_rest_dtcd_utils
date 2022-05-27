from typing import Set, Union

from py2neo import Graph, Node, NodeMatch, Relationship, Subgraph, Transaction
from py2neo.cypher import Cursor, cypher_join

from . import clauses
from .abc_graphmanager import AbstractGraphManager
from .exceptions import FragmentDoesNotExist, FragmentExists
from ..settings import SCHEMA


class Neo4jGraphManager(AbstractGraphManager):
    """Interface to Neo4j operations."""

    def __init__(self, profile: str, name: str = None, **settings):
        self._graph = Graph(profile, name, **settings)
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

    def remove(self, id):
        raise NotImplementedError  # TODO

    def remove_all(self):
        """Remove all nodes and relationships from this graph."""

        self._graph.delete_all()

    def update(self, graph):
        raise NotImplementedError  # TODO

    def _match_fragment(self, name: str) -> NodeMatch:
        """Match a fragment with given name and return the match."""
        # TODO hardcoded fragment label
        # TODO hardcoded name key
        return self._graph.nodes.match("Fragment", name=name)

    def has_fragment(self, name: str) -> bool:
        """Return True if a fragment with the given name exists, False otherwise."""

        return self._match_fragment(name).exists()

    def get_fragment(self, name: str) -> Union[Node, None]:
        """Return bound fragment node with name if it exists, None otherwise."""

        return self._match_fragment(name).first()

    def create_fragment(self, name: str) -> Node:
        """Create and return a bound fragment node with the given name.

        Raises FragmentExistsError if fragment with the given name
        already exists.
        """

        if not self.has_fragment(name):  # TODO this is a separate transaction
            # TODO fragment label
            # TODO name key
            n = Node("Fragment", name=name)
            self._graph.create(n)
            return n
        else:
            raise FragmentExists(f"fragment [{name}] already exists")

    def rename_fragment(self, old: str, new: str):
        """Rename fragment with an old name to new one.

        Raises FragmentDoesNotExist if a fragment with an old name is
        missing.
        """

        node = self.get_fragment(old)  # TODO separate tx

        if node is not None:
            # TODO hardcoded name key
            node["name"] = new
            self._graph.push(node)
        else:
            raise FragmentDoesNotExist(f"fragment [{old}] does not exist")

    def remove_fragment(self, name: str):
        """Remove fragment.

        Raises FragmentDoesNotExist if a fragment is missing.
        """

        # TODO take into account descendants
        n = self.get_fragment(name)

        if n is not None:
            self._graph.delete(n)
        else:
            raise FragmentDoesNotExist(f"fragment [{name}] does not exist")

    def _match_fragment_content_nodes(self, name: str, tx: Transaction) -> Cursor:
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

    def _fragment_content_nodes(self, name: str, tx: Transaction) -> Set[Node]:
        """
        Return a set of descendant nodes belonging to a given fragment within a transaction.
        """

        cursor = self._match_fragment_content_nodes(name, tx)
        return set(record[0] for record in cursor)

    def _match_fragment_content_relationships(self, name: str, tx: Transaction) -> Cursor:
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

    def _fragment_content(self, name: str, tx: Transaction) -> Subgraph:
        """Return bound subgraph belonging to given fragment.

        All operations run within a given transaction.
        """

        # TODO rels between entities are missing
        # nodes
        nodes = self._fragment_content_nodes(name, tx)
        id2node = {
            node.identity: node
            for node in nodes
        }

        # relationships
        rels_cursor = self._match_fragment_content_relationships(name, tx)

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

    def read(self, fragment: str) -> Subgraph:
        """Return subgraph belonging to given fragment.

        Raises FragmentDoesNotExist if the fragment is missing.
        """

        if self.has_fragment(fragment):  # TODO separate tx
            tx = self._graph.begin(readonly=True)
            subgraph = self._fragment_content(fragment, tx)
            self._graph.commit(tx)
            return subgraph
        else:
            raise FragmentDoesNotExist(f"fragment [{fragment}] does not exist")

    def write(self, subgraph: Subgraph, fragment: str):
        """Write new content for a given fragment.

        Binds subgraph nodes on success.
        Raises FragmentDoesNotExist if the fragment is missing.
        """

        # TODO error handling? (empty, bad format / input)

        f = self.get_fragment(fragment)  # TODO separate tx

        if f is not None:
            tx = self._graph.begin()

            # merge vertex roots on (label, yfiles_id)
            label = SCHEMA["labels"]["node"]
            vertices = set(filter(lambda x: x.has_label(label), subgraph.nodes))  # O(n)
            key = SCHEMA["keys"]["yfiles_id"]
            tx.merge(Subgraph(vertices), label, key)  # now some vertex roots may be bound

            # delete difference
            current = self._fragment_content_nodes(fragment, tx)
            diff = current - vertices
            tx.delete(Subgraph(diff))

            # re-link fragment to subgraph entities
            type_ = SCHEMA["types"]["contains_entity"]
            rels = [
                Relationship(f, type_, node)
                for node in subgraph.nodes
                if node.has_label(SCHEMA["labels"]["entity"])
            ]

            # create the rest of the subgraph & fragment-entity links
            # skips already bound nodes & relationships
            tx.create(subgraph | Subgraph(relationships=rels))

            self._graph.commit(tx)
        else:
            raise FragmentDoesNotExist(f"fragment [{fragment}] does not exist")
