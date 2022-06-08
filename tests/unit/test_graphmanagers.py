import configparser
import unittest
from pathlib import Path

from py2neo import Node, Relationship

from dtcd_server import settings
from dtcd_server.utils.exceptions import FragmentDoesNotExist, FragmentNotEmpty
from dtcd_server.utils.neo4j_graphmanager import Fragment, Neo4jGraphManager

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

    def test_fragments(self):
        # no fragments
        self.assertEqual(self.manager.fragments(), [])

        # add some names
        self.manager.create_fragment("hr")
        self.manager.create_fragment("it")
        self.manager.create_fragment("sales")
        fragments = self.manager.fragments()
        self.assertEqual({f.name for f in fragments}, {"hr", "it", "sales"})

    def test_get_fragment(self):
        self.assertIsNone(self.manager.get_fragment(42))

        orig = self.manager.create_fragment("hr")
        f = self.manager.get_fragment(orig.__primaryvalue__)
        self.assertEqual(f, orig)

    def test_get_fragment_or_exception(self):
        orig = self.manager.create_fragment("hr")
        f = self.manager.get_fragment_or_exception(orig.__primaryvalue__)
        self.assertEqual(f, orig)

        with self.assertRaises(FragmentDoesNotExist):
            self.manager.get_fragment_or_exception(orig.__primaryvalue__ + 1)

    def test_create_fragment(self):
        orig = self.manager.create_fragment("hr")
        f = self.manager._repo.get(Fragment, orig.__primaryvalue__)
        self.assertEqual(f, orig)

    def test_rename_fragment(self):
        with self.assertRaises(FragmentDoesNotExist):
            self.manager.rename_fragment(42, "sales")

        orig = self.manager.create_fragment("it")
        fragment_id = orig.__primaryvalue__
        self.manager.rename_fragment(fragment_id, "r&d")
        f = self.manager.get_fragment(fragment_id)
        self.assertEqual(f.name, "r&d")

    def test_remove_fragment(self):
        orig = self.manager.create_fragment("hr")
        fragment_id = orig.__primaryvalue__
        self.manager.remove_fragment(fragment_id)
        f = self.manager.get_fragment(fragment_id)
        self.assertIsNone(f)

        # missing fragment error
        with self.assertRaises(FragmentDoesNotExist):
            self.manager.remove_fragment(fragment_id + 1)

        # non-empty fragment error
        orig = self.manager.create_fragment("it")
        fragment_id = orig.__primaryvalue__
        self.manager.write(self.tree1, fragment_id)  # content bound

        with self.assertRaises(FragmentNotEmpty):
            self.manager.remove_fragment(fragment_id)

    def test_match_fragment_content_nodes(self):
        fragment = self.manager.create_fragment("hr")
        root = fragment.__node__
        r1 = Relationship(root, 'CONTAINS_ENTITY', self.e1)
        r2 = Relationship(root, 'CONTAINS_ENTITY', self.e2)
        full = self.content | root | r1 | r2
        self.manager._graph.create(full)

        tx = self.manager._graph.begin(True)
        nodes_cursor = self.manager._match_fragment_content_nodes(
            tx, fragment.__primaryvalue__)
        self.manager._graph.commit(tx)
        nodes = set(i[0] for i in nodes_cursor)

        self.assertEqual(nodes, self.content.nodes)

    # TODO def test_match_fragment_content_relationships

    def test_fragment_content(self):
        f = self.manager.create_fragment("hr")
        root = f.__node__
        r1 = Relationship(root, 'CONTAINS_ENTITY', self.e1)
        r2 = Relationship(root, 'CONTAINS_ENTITY', self.e2)
        full = self.content | root | r1 | r2
        self.manager._graph.create(full)

        tx = self.manager._graph.begin(True)
        subgraph = self.manager._fragment_content(tx, f.__primaryvalue__)
        self.manager._graph.commit(tx)

        self.assertEqual(subgraph, self.content)

    def test_read(self):
        # TODO add one more fragment
        # create fragment node, link it to entities
        f = self.manager.create_fragment("hr")
        root = f.__node__
        r1 = Relationship(root, 'CONTAINS_ENTITY', self.e1)
        r2 = Relationship(root, 'CONTAINS_ENTITY', self.e2)
        full = self.content | root | r1 | r2
        full |= self.dummy  # add some dummy data
        self.manager._graph.create(full)

        content = self.manager.read(f.__primaryvalue__)
        self.assertEqual(content, self.content)

        with self.assertRaises(FragmentDoesNotExist):
            content = self.manager.read(f.__primaryvalue__ + 1)

    def test_read_empty(self):
        f = self.manager.create_fragment("hr")

        content = self.manager.read(f.__primaryvalue__)
        self.assertFalse(bool(content))  # make sure empty subgraph

    def test_write(self):
        f = self.manager.create_fragment("hr")
        fragment_id = f.__primaryvalue__
        self.manager.write(self.tree1, fragment_id)  # content bound

        # check link from fragment to entity
        # TODO replace hard-coded stuff
        root = f.__node__
        link = self.manager._graph.match_one((root, ), r_type='CONTAINS_ENTITY')
        self.assertIsNotNone(
            link, 'relationship from fragment node to entity node is missing')
        self.assertTrue(
            link.end_node.has_label('_Entity'), 'must link to node with entity label')

        # check fragment content ok
        fromdb = self.manager.read(fragment_id)  # fromdb bound
        self.assertEqual(fromdb, self.tree1)

        with self.assertRaises(FragmentDoesNotExist):
            self.manager.write(self.dummy, fragment_id + 1)

    def test_write_rewrite(self):
        # TODO tests for frontier nodes & relationship retention
        # TODO replace hard-coded stuff
        f = self.manager.create_fragment("hr")
        fragment_id = f.__primaryvalue__
        root = f.__node__

        # old data
        r1 = Relationship(root, 'CONTAINS_ENTITY', self.e1)
        old = self.tree1 | root | r1
        self.manager._graph.create(old)  # tree1, f, r1 bound

        self.manager.write(self.tree2, fragment_id)
        fromdb = self.manager.read(fragment_id)
        self.assertEqual(fromdb, self.tree2)

        with self.assertRaises(FragmentDoesNotExist):
            self.manager.write(self.tree2, fragment_id + 1)

    # TODO def test_write_frontiers(self):

    def test_remove(self):
        orig = self.manager.create_fragment("hr")
        fragment_id = orig.__primaryvalue__
        self.manager.write(self.tree1, fragment_id)  # content bound

        self.manager.remove(fragment_id)
        # make sure root is still present
        f = self.manager.get_fragment(fragment_id)
        self.assertIsNotNone(f)
        # no links from fragment root
        root = f.__node__
        link = self.manager._graph.match_one((root, ), r_type='CONTAINS_ENTITY')
        self.assertIsNone(link)
        # check content is empty now
        content = self.manager.read(fragment_id)
        self.assertFalse(bool(content))

    def test_empty(self):
        f = self.manager.create_fragment("hr")
        fragment_id = f.__primaryvalue__
        # empty
        self.assertTrue(self.manager.empty(fragment_id))
        # write some data
        self.manager.write(self.tree1, fragment_id)
        self.assertFalse(self.manager.empty(fragment_id))
        # error
        with self.assertRaises(FragmentDoesNotExist):
            self.manager.empty(fragment_id + 1)


if __name__ == '__main__':
    unittest.main()
