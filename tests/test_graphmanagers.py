import unittest
from copy import deepcopy

from mock_server import settings
from mock_server.utils.graphmanagers import Neo4jGraphManager

from . import fixtures


# whether to use DB in tests
# FIXME fails if no testing field in config
USE_DB = settings.ini_config['testing'].getboolean('use_db')


@ unittest.skipUnless(USE_DB)
class TestNeo4jGraphManager(unittest.TestCase):

    @ classmethod
    def setUpClass(cls) -> None:
        cls.manager = Neo4jGraphManager(
            settings.NEO4J['uri'],
            settings.NEO4J['name'],
            auth=(settings.NEO4J['user'], settings.NEO4J['password'])
        )

    @ classmethod
    def tearDownClass(cls) -> None:
        cls.manager._graph.delete_all()  # FIXME wipes out the database

    def setUp(self):
        self.manager._graph.delete_all()  # FIXME wipes out the database

    def tearDown(self) -> None:
        self.manager._graph.delete_all()  # FIXME wipes out the database

    def test_read_all(self):
        # TODO use manager.write instead?
        subgraph = deepcopy(fixtures.subgraph)
        self.manager._graph.create(subgraph)  # populate the subgraph
        fromdb = self.manager.read_all()

        # TODO make sure equality check is ok
        self.assertEqual(fromdb, subgraph)

    @ unittest.expectedFailure
    def test_write(self):
        # TODO make sure sequencing is ok
        # create initial data
        amy_dan = deepcopy(fixtures.amy_dan)
        self.manager._graph.create(amy_dan)

        # overwrite with new data
        dan_city = deepcopy(fixtures.dan_city)
        self.manager.write(dan_city)
        fromdb = self.manager.read_all()

        # TODO make sure equality check is ok
        self.assertEqual(fromdb, dan_city)


if __name__ == '__main__':
    unittest.main()
