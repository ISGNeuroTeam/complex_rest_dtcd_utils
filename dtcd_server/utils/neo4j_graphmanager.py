from typing import Union

from py2neo import Graph, Node, NodeMatch, Relationship, Subgraph

from .abc_graphmanager import AbstractGraphManager
from .exceptions import FragmentDoesNotExist, FragmentExists


class Neo4jGraphManager(AbstractGraphManager):
    """Interface to Neo4j operations."""

    def __init__(self, profile: str, name: str = None, **settings):
        self._graph = Graph(profile, name, **settings)
        # TODO make sure graph is available

    def read(self, id):
        raise NotImplementedError  # TODO

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

    def write(self, subgraph: Subgraph):
        """Save a subgraph.

        Overwrites existing data with new subgraph.
        """

        tx = self._graph.begin()
        tx.update('MATCH (n) DETACH DELETE n')  # del all nodes & rels
        tx.create(subgraph)
        self._graph.commit(tx)

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
