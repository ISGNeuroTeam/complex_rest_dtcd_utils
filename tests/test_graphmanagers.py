import unittest
from copy import deepcopy

from mock_server import settings
from mock_server.utils.graphmanagers import Neo4jGraphManager

from . import fixtures


# whether to use DB in tests
USE_DB = bool(settings.ini_config['testing']['through_neo4j'])


@unittest.skipUnless(USE_DB)
class TestNeo4jGraphManager(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        cls.manager = Neo4jGraphManager(
            settings.NEO4J['uri'],
            settings.NEO4J['name'],
            auth=(settings.NEO4J['user'], settings.NEO4J['password'])
        )
        cls.manager._graph.delete_all()  # FIXME wipes out the database

    @classmethod
    def tearDownClass(cls) -> None:
        cls.manager._graph.delete_all()  # FIXME wipes out the database

    def setUp(self):
        self.subgraph = deepcopy(fixtures.subgraph)

    def test_read_all(self):
        # TODO use manager.write instead?
        self.manager._graph.create(self.subgraph)  # populate the subgraph
        fromdb = self.manager.read_all()

        self.assertEqual(fromdb, self.subgraph)


if __name__ == '__main__':
    unittest.main()
