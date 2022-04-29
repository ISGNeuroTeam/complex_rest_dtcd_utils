from py2neo import Graph, Subgraph

from .abc_graphmanager import AbstractGraphManager


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
        # TODO replace with single statement?
        nodes_cursor = tx.run('MATCH (n) RETURN n')
        rels_cursor = tx.run('MATCH ()-[r]->() RETURN r')
        self._graph.commit(tx)

        nodes_subgraph = nodes_cursor.to_subgraph()
        rels_subgraph = rels_cursor.to_subgraph()

        result = Subgraph()
        if nodes_subgraph is not None:
            result |= nodes_subgraph
        if rels_subgraph is not None:
            result |= rels_subgraph

        return result

    def remove(self, id):
        raise NotImplementedError  # TODO

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
