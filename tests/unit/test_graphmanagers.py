import unittest

from mock_server import settings
from mock_server.utils.graphmanagers import Neo4jGraphManager

from .. import fixtures


# whether to use DB in tests
# FIXME fails if no testing field in config
USE_DB = settings.ini_config['testing'].getboolean('use_db')


@ unittest.skipUnless(USE_DB, 'testing.use_db set to False in config')
class TestNeo4jGraphManager(unittest.TestCase):

    @ classmethod
    def setUpClass(cls) -> None:
        cls.manager = Neo4jGraphManager(
            settings.NEO4J['uri'],
            settings.NEO4J['name'],
            auth=(settings.NEO4J['user'], settings.NEO4J['password'])
        )

    def setUp(self):
        self.data = fixtures.generate_data()
        self.manager._graph.delete_all()  # FIXME wipes out the database

    def tearDown(self) -> None:
        self.manager._graph.delete_all()  # FIXME wipes out the database

    def test_read_all(self):
        subgraph = self.data['subgraph']
        self.manager._graph.create(subgraph)  # populate the subgraph
        fromdb = self.manager.read_all()

        self.assertEqual(fromdb, subgraph)

    def test_write(self):
        # create initial data
        # IMPORTANT do not use same nodes in this and next command
        amy_friends = self.data['amy_friends']
        self.manager._graph.create(amy_friends)

        # overwrite with new data
        from py2neo import Subgraph
        dan_city = Subgraph(None, [self.data['dan_city']])
        self.manager.write(dan_city)
        fromdb = self.manager.read_all()

        self.assertEqual(fromdb, dan_city)


if __name__ == '__main__':
    unittest.main()
