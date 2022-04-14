import unittest
from copy import deepcopy

from py2neo import Graph, ServiceUnavailable, DatabaseError

from mock_server import settings
from mock_server.utils.graphmanagers import Neo4jGraphManager

from . import fixtures


# whether to use DB in tests
USE_DB = bool(settings.ini_config['testing']['through_neo4j'])
# connection to neo4j DB
uri = settings.NEO4J['uri']
user = settings.NEO4J['user']
password = settings.NEO4J['password']
name = settings.NEO4J['name']
GRAPH = Graph(uri, name=name, auth=(user, password))

try:
    GRAPH.query('SHOW DEFAULT DATABASE')
    DB_OK = True
except (ServiceUnavailable, DatabaseError):
    print('Issues with Neo4j database - check the connection.')
    DB_OK = False


@unittest.skipUnless(USE_DB and DB_OK)
class TestNeo4jGraphManager(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.manager = Neo4jGraphManager(
            settings.NEO4J['uri'],
            settings.NEO4J['name'],
            auth=(settings.NEO4J['user'], settings.NEO4J['password'])
        )

    def setUp(self):
        self.subgraph = deepcopy(fixtures.subgraph)

    def test_read_all(self):
        # TODO use manager.write instead?
        self.manager._graph.create(self.subgraph)  # populate the subgraph
        fromdb = self.manager.read_all()

        self.assertEqual(fromdb, self.subgraph)


if __name__ == '__main__':
    unittest.main()
