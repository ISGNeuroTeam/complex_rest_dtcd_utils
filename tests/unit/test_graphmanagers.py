import configparser
import unittest
from pathlib import Path

from py2neo import Subgraph

from dtcd_server import settings
from dtcd_server.utils.exceptions import FragmentDoesNotExist, FragmentExists
from dtcd_server.utils.neo4j_graphmanager import Neo4jGraphManager


from .. import fixtures


TEST_DIR = Path(__file__).resolve().parent.parent
# testing config
config = configparser.ConfigParser()
config.read(TEST_DIR / 'config.ini')
USE_DB = config['general'].getboolean('use_db')


@ unittest.skipUnless(USE_DB, 'use_db=False')
class TestNeo4jGraphManager(unittest.TestCase):

    @ classmethod
    def setUpClass(cls) -> None:
        cls.manager = Neo4jGraphManager(
            settings.NEO4J['uri'],
            settings.NEO4J['name'],
            auth=(settings.NEO4J['user'], settings.NEO4J['password'])
        )

    def setUp(self):
        self.data = fixtures.generate_dummy()
        self.manager._graph.delete_all()  # FIXME wipes out the database

    def tearDown(self) -> None:
        self.manager._graph.delete_all()  # FIXME wipes out the database

    @unittest.skip
    def test_read_all(self):
        subgraph = self.data['subgraph']
        self.manager._graph.create(subgraph)  # populate the subgraph
        fromdb = self.manager.read_all()

        self.assertEqual(fromdb, subgraph)

    # TODO read_all on empty subgraph

    @unittest.skip
    def test_write(self):
        # create initial data
        # IMPORTANT do not use same nodes in this and next command
        amy_friends = self.data['amy_friends']
        self.manager._graph.create(amy_friends)

        # overwrite with new data
        dan_city = Subgraph(None, [self.data['dan_city']])
        self.manager.write(dan_city)
        fromdb = self.manager.read_all()

        self.assertEqual(fromdb, dan_city)

    def test_has_fragment(self):
        self.manager.create_fragment("hr")
        self.assertTrue(self.manager.has_fragment("hr"))
        self.assertFalse(self.manager.has_fragment("sales"))

    def test_get_fragment(self):
        self.assertIsNone(self.manager.get_fragment("hr"))

        self.manager.create_fragment("hr")
        n = self.manager.get_fragment("hr")
        # TODO replace hard-coded labels & properties
        self.assertIsNotNone(n.identity)  # make sure node is bound
        self.assertTrue(n.has_label("Fragment"))
        self.assertIn("name", n)
        self.assertTrue(n["name"] == "hr")

    def test_create_fragment(self):
        self.manager.create_fragment("hr")
        # TODO replace hard-coded labels & properties
        match = self.manager._graph.nodes.match("Fragment", name="hr")
        self.assertTrue(match.exists())

        with self.assertRaises(FragmentExists):
            self.manager.create_fragment("hr")

    def test_rename_fragment(self):
        with self.assertRaises(FragmentDoesNotExist):
            self.manager.rename_fragment("hr", "sales")

        self.manager.create_fragment("it")
        self.manager.rename_fragment("it", "r&d")
        self.assertTrue(self.manager.has_fragment("r&d"))
        self.assertFalse(self.manager.has_fragment("it"))

    def test_remove_fragment(self):
        self.manager.create_fragment("hr")
        self.manager.remove_fragment("hr")
        self.assertFalse(self.manager.has_fragment("hr"))

        with self.assertRaises(FragmentDoesNotExist):
            self.manager.remove_fragment("sales")


if __name__ == '__main__':
    unittest.main()
