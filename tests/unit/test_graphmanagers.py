import configparser
import unittest
from pathlib import Path

from py2neo import Node, Relationship

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
        self.dummy = fixtures.generate_dummy()
        self.manager._graph.delete_all()  # FIXME wipes out the database

        # TODO replace hard-coded labels & types
        self.e1 = Node('_Entity', 'Node', primitiveID="e1")
        self.d1 = Node('_Data', '_Composite', primitiveID="e1", age=27)
        self.attr = Node('_Attribute', x=0, y=0)
        self.d1_has_attr = Relationship(self.d1, 'HAS_ATTRIBUTE', self.attr, _key='layout')
        self.e1_d1 = Relationship(self.e1, 'HAS_DATA', self.d1)
        self.tree1 = (
            self.e1
            | self.d1
            | self.attr
            | self.d1_has_attr
            | self.e1_d1
        )

        self.e2 = Node('_Entity', 'Node', primitiveID="e2")
        self.d2 = Node('_Data', '_Composite', primitiveID="e2", online=True)
        self.ports = Node('_Array', '_Attribute')
        self.item0 = Node('_Item', primitiveID='p3')
        self.ports_contains_item0 = Relationship(self.ports, 'CONTAINS_ITEM', self.item0, _pos=0)
        self.d2_has_ports = Relationship(self.d2, 'HAS_ATTRIBUTE', self.ports, _key='initPorts')
        self.e2_d2 = Relationship(self.e2, 'HAS_DATA', self.d2)
        self.tree2 = (
            self.e2
            | self.d2
            | self.ports
            | self.item0
            | self.ports_contains_item0
            | self.d2_has_ports
            | self.e2_d2
        )

        self.content = self.tree1 | self.tree2

        self.e3 = Node('_Entity', primitiveID="e3")

    def tearDown(self) -> None:
        self.manager._graph.delete_all()  # FIXME wipes out the database

    # TODO read_all

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

    def test_match_fragment_content_nodes(self):
        f = self.manager.create_fragment("hr")
        r1 = Relationship(f, 'CONTAINS_ENTITY', self.e1)
        r2 = Relationship(f, 'CONTAINS_ENTITY', self.e2)
        full = self.content | f | r1 | r2
        self.manager._graph.create(full)

        tx = self.manager._graph.begin(True)
        nodes_cursor = self.manager._match_fragment_content_nodes(tx, "hr")
        self.manager._graph.commit(tx)
        nodes = set(i[0] for i in nodes_cursor)

        self.assertEqual(nodes, self.content.nodes)

    # TODO def test_match_fragment_content_relationships

    def test_fragment_content(self):
        f = self.manager.create_fragment("hr")
        r1 = Relationship(f, 'CONTAINS_ENTITY', self.e1)
        r2 = Relationship(f, 'CONTAINS_ENTITY', self.e2)
        full = self.content | f | r1 | r2
        self.manager._graph.create(full)

        tx = self.manager._graph.begin(True)
        subgraph = self.manager._fragment_content(tx, "hr")
        self.manager._graph.commit(tx)

        self.assertEqual(subgraph, self.content)

    def test_read(self):
        # TODO add one more fragment
        # create fragment node, link it to entities
        f = self.manager.create_fragment("hr")
        r1 = Relationship(f, 'CONTAINS_ENTITY', self.e1)
        r2 = Relationship(f, 'CONTAINS_ENTITY', self.e2)
        full = self.content | f | r1 | r2
        full |= self.dummy  # add some dummy data
        self.manager._graph.create(full)

        content = self.manager.read("hr")
        self.assertEqual(content, self.content)

        with self.assertRaises(FragmentDoesNotExist):
            content = self.manager.read("sales")

    def test_write(self):
        f = self.manager.create_fragment("hr")
        self.manager.write(self.content, "hr")  # content bound

        # check link from fragment to entity
        # TODO replace hard-coded stuff
        link = self.manager._graph.match_one((f, ), r_type='CONTAINS_ENTITY')
        self.assertIsNotNone(
            link, 'relationship from fragment node to entity node is missing')
        self.assertTrue(
            link.end_node.has_label('_Entity'), 'must link to node with entity label')

        # check fragment content ok
        fromdb = self.manager.read("hr")  # fromdb bound
        self.assertEqual(fromdb, self.content)

        with self.assertRaises(FragmentDoesNotExist):
            self.manager.write(self.dummy, "sales")

    def test_write_rewrite(self):
        # TODO tests for frontier nodes & relationship retention
        # TODO replace hard-coded stuff
        f = self.manager.create_fragment("hr")
        # old data
        r1 = Relationship(f, 'CONTAINS_ENTITY', self.e1)
        old = self.tree1 | f | r1
        self.manager._graph.create(old)  # tree1, f, r1 bound

        self.manager.write(self.tree2, "hr")
        fromdb = self.manager.read("hr")
        self.assertEqual(fromdb, self.tree2)

        with self.assertRaises(FragmentDoesNotExist):
            self.manager.write(self.tree2, "sales")

    # TODO def test_write_frontiers(self):


if __name__ == '__main__':
    unittest.main()
