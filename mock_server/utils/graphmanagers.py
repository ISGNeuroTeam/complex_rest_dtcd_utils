from py2neo import Graph, Subgraph

from .abc_graphmanager import AbstractGraphManager


class Neo4jGraphManager(AbstractGraphManager):
    """Interface to Neo4j operations."""

    def __init__(self, profile: str, name: str = None, **settings):
        self._graph = Graph(profile, name, **settings)

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

        return nodes_subgraph | rels_subgraph
