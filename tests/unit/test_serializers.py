"""
Unit tests for custom utils.py module.
"""

import json
import unittest
from operator import itemgetter
from pathlib import Path

from py2neo import Node, Relationship

from mock_server.utils import serializers


def setUpModule():
    # path to tests/ dir
    global TEST_DIR
    TEST_DIR = Path(__file__).resolve().parent.parent

    if not TEST_DIR.exists():
        raise FileNotFoundError('cannot find tests/ directory')

    # filepath to subgraph-sample.json file in specified format
    global SAMPLE_PATH
    SAMPLE_PATH = TEST_DIR / 'fixtures' / 'subgraph-sample.json'


class TestLoader(unittest.TestCase):
    """Tests for Loader class."""

    def test_is_dict_or_list_of_dicts(self):
        self.assertTrue(
            serializers.Loader._is_dict_or_list_of_dicts(
                {"age": 42}
            )
        )
        self.assertTrue(
            serializers.Loader._is_dict_or_list_of_dicts(
                [{"age": 42}, {"name": "amy"}]
            )
        )
        self.assertFalse(
            serializers.Loader._is_dict_or_list_of_dicts(
                [1, 2, 3]  # list of ints
            )
        )

    def test_load_dict_base_case(self):
        # one level of nesting
        loader = serializers.Loader()
        data = {'age': 27, 'name': 'amy', 'groceries': ['spam', 'ham']}
        node = loader._load_dict(data)
        tree = loader.tree

        self.assertEqual(
            dict(node), data, 'node properties do not match the data')
        self.assertEqual(
            len(tree.nodes), 1, 'tree must have only one node')
        self.assertEqual(
            len(tree.relationships), 0, 'tree must have no relationships')

    def test_load_dict_nested(self):
        loader = serializers.Loader()
        data = {'name': 'amy', 'address': {'country': 'France'}}
        parent = loader._load_dict(data)  # top-level node
        tree = loader.tree

        # tree checks: node, rel counts
        self.assertEqual(len(tree.nodes), 2, 'tree must have 2 nodes')
        self.assertEqual(
            len(tree.relationships), 1,
            'tree must have only 1 relationship'
        )

        # parent node checks: label, properties
        self.assertTrue(
            parent.has_label(serializers.LABEL.COMPOSITE.value),
            'parent node must have COMPOSITE label'
        )
        self.assertEqual(
            dict(parent), {'name': 'amy'},
            'parent node properties do not match the data'
        )

        # relationship checks: count, type, key property, direction
        rel = next(iter(tree.relationships))
        self.assertEqual(
            type(rel).__name__, serializers.RELATIONSHIP.HAS_ATTRIBUTE.value,
            'relationship type must be HAS_ATTRIBUTE'
        )
        self.assertIn(
            serializers.KEY.KEY.value, rel,
            'relationship must have KEY key'
        )
        self.assertEqual(
            'address', rel.get(serializers.KEY.KEY.value),
            'KEY value must be equal to "address"'
        )
        self.assertIs(
            rel.start_node, parent, 'parent must be a start node')

        # child node checks: label, properties
        child = rel.end_node
        self.assertTrue(
            child.has_label(serializers.LABEL.ATTRIBUTE.value),
            'child node must have ATTRIBUTE label'
        )
        self.assertEqual(
            dict(child), {'country': 'France'},
            'child node properties do not match the data'
        )

    def test_load_dict_multiple_nested_attributes(self):
        loader = serializers.Loader()
        data = {
            'name': 'amy',
            'address': {'country': 'France'},
            'passport': {'id': 123456}
        }
        loader._load_dict(data)  # top-level node

        self.assertEqual(len(loader.tree.nodes), 3)
        self.assertEqual(len(loader.tree.relationships), 2)

    def test_load_dict_deep_nesting(self):
        loader = serializers.Loader()
        data = {
            'name': 'amy',
            'inner': {
                'name': 'bob',
                'leaf': {
                    'name': 'cloe'
                }}}
        loader._load_dict(data)  # top-level node

        self.assertEqual(len(loader.tree.nodes), 3)
        self.assertEqual(len(loader.tree.relationships), 2)

    def test_load_list(self):
        loader = serializers.Loader()
        data = [{'name': 'amy'}, {'name': 'bob'}]
        root = loader._load_list(data)

        # tree root check
        self.assertTrue(
            root.has_label(serializers.LABEL.ARRAY.value),
            'root node must have ARRAY label'
        )

        # tree checks: node, rel counts
        tree = loader.tree
        self.assertEqual(
            len(tree.nodes), 3,
            'tree must have 3 nodes: Array and two Items'
        )
        self.assertEqual(
            len(tree.relationships), 2,
            'tree must have 2 relationships'
        )

        # relationships checks
        rels = sorted(
            tree.relationships, key=itemgetter(serializers.KEY.POSITION.value))
        # 1st rel: (root) -- (amy)
        rel = rels[0]
        self.assertIs(root, rel.start_node)
        self.assertEqual('amy', rel.end_node['name'])
        self.assertEqual(0, rel[serializers.KEY.POSITION.value])  # correct pos
        # 2nd rel: (root) -- (bob)
        rel = rels[1]
        self.assertIs(root, rel.start_node)
        self.assertEqual('bob', rel.end_node['name'])
        self.assertEqual(1, rel[serializers.KEY.POSITION.value])

    def test_load(self):
        loader = serializers.Loader()
        data = {
            'name': 'amy',
            'age': 27,
            'groceries': ['spam', 'ham'],
            'address': {'country': 'France'},
            'inner': {
                'name': 'bob',
                'leaf': {
                    'name': 'cloe'
                }},
            'friends': [{'name': 'dan'}, {'name': 'eva'}]
        }
        root = loader.load(data)  # top-level node

        # tree checks: node, rel counts
        tree = loader.tree
        self.assertEqual(len(tree.nodes), 7)
        self.assertEqual(len(tree.relationships), 6)

        self.assertIs(root, loader.root)


class TestSubgraphSerializer(unittest.TestCase):
    """Tests for SubgraphSerializer."""

    @classmethod
    def setUpClass(cls) -> None:
        # test data dictionary in exchange format
        with open(SAMPLE_PATH) as f:
            cls.data = json.load(f)

        # test Subgraph
        # TODO draw the test subgraph somewhere?
        # TODO how to pack this better?
        # populate the DB with some test data
        amy = Node(
            serializers.LABEL.ROOT.value, serializers.LABEL.COMPOSITE.value,
            name='amy')
        amy[serializers.KEY.ID.value] = 'n1'
        city1 = Node(serializers.LABEL.ATTRIBUTE.value, city='Lyon')
        friends = Node(serializers.LABEL.ATTRIBUTE.value, serializers.LABEL.ARRAY.value)
        bob = Node(serializers.LABEL.ITEM.value, name='bob')
        cloe = Node(serializers.LABEL.ITEM.value, name='cloe')
        dan = Node(
            serializers.LABEL.ROOT.value, serializers.LABEL.COMPOSITE.value,
            name='dan')
        dan[serializers.KEY.ID.value] = 'n2'
        city2 = Node(serializers.LABEL.ATTRIBUTE.value, city='London')

        HAS_ATTR = Relationship.type(serializers.RELATIONSHIP.HAS_ATTRIBUTE.value)
        HAS_ITEM = Relationship.type(serializers.RELATIONSHIP.HAS_ITEM.value)
        EDGE = Relationship.type(serializers.RELATIONSHIP.EDGE.value)

        amy_city = HAS_ATTR(amy, city1)
        amy_city[serializers.KEY.KEY.value] = 'address'

        amy_friends = HAS_ATTR(amy, friends)
        amy_friends[serializers.KEY.KEY.value] = 'friends'

        friends_bob = HAS_ITEM(friends, bob)
        friends_bob[serializers.KEY.POSITION.value] = 0
        friends_cloe = HAS_ITEM(friends, cloe)
        friends_cloe[serializers.KEY.POSITION.value] = 1

        dan_city = HAS_ATTR(dan, city2)
        dan_city[serializers.KEY.KEY.value] = 'address'

        amy_dan = EDGE(amy, dan)

        # save the subgraph and some nodes for tests
        cls.subgraph = (
            amy_city | amy_friends | friends_bob | friends_cloe
            | amy_dan | dan_city)
        cls.dan = dan
        cls.city1 = city1
        cls.dan_tree = dan_city
        cls.friends = friends
        cls.friends_tree = friends_bob | friends_cloe
        cls.amy = amy
        cls.amy_tree = amy_city | amy_friends | cls.friends_tree | amy_dan
        cls.edge = amy_dan

    def test_load(self):
        # TODO more tests?
        serializer = serializers.SubgraphSerializer()
        subgraph = serializer.load(self.data, fragment='test_label')

        self.assertEqual(len(subgraph.nodes), 15)
        self.assertEqual(len(subgraph.relationships), 14)
        self.assertIn('test_label', subgraph.labels())

    def test_dump(self):
        # TODO integration test?
        with open(SAMPLE_PATH) as f:
            data = json.load(f)  # original data

        serializer = serializers.SubgraphSerializer()
        # TODO replace with manually constructed Subgraph
        subgraph = serializer.load(data)
        exported = serializer.dump(subgraph)
        # fix order of arrays
        exported[serializers.KEY.NODES.value] = sorted(
            exported[serializers.KEY.NODES.value], key=itemgetter('primitiveID'))
        exported[serializers.KEY.RELATIONSHIPS.value] = sorted(
            exported[serializers.KEY.RELATIONSHIPS.value],
            key=itemgetter(
                serializers.KEY.SOURCE_NODE.value, serializers.KEY.TARGET_NODE.value)
        )

        self.assertEqual(data, exported)

    def test_dump_node(self):
        serializer = serializers.SubgraphSerializer()
        serializer._initialize(self.amy_tree)

        data = serializer._dump_node(self.amy)
        self.assertEqual(
            data,
            {
                'name': 'amy',
                'primitiveID': 'n1',
                'address': {'city': 'Lyon'},
                'friends': [{'name': 'bob'}, {'name': 'cloe'}]
            }
        )

        with self.assertRaises(KeyError):
            serializer._dump_node(Node())

    def test_dump_to_dict_base_case(self):
        serializer = serializers.SubgraphSerializer()
        serializer._initialize(self.dan_tree)

        data = serializer._dump_to_dict(self.city1)
        self.assertEqual(
            data, {'city': 'Lyon'}, 'base case data does not match')

    def test_dump_to_dict_nested(self):
        serializer = serializers.SubgraphSerializer()
        serializer._initialize(self.dan_tree)

        # one level nesting
        data = serializer._dump_to_dict(self.dan)
        self.assertEqual(
            data,
            {'name': 'dan', 'primitiveID': 'n2', 'address': {'city': 'London'}},
            'one level nesting case data does not match'
        )

    def test_dump_to_list(self):
        serializer = serializers.SubgraphSerializer()
        serializer._initialize(self.friends_tree)

        data = serializer._dump_to_list(self.friends)
        self.assertEqual(data, [{'name': 'bob'}, {'name': 'cloe'}])

        # error on non-array structure
        with self.assertRaises(
                ValueError,
                msg='must raise error on nodes without ARRAY label'):
            serializer._dump_to_list(self.amy)

    def test_dump_relationship(self):
        serializer = serializers.SubgraphSerializer()

        data = serializer._dump_relationship(self.edge)
        self.assertEqual(
            data, {"sourceNode": "n1", "targetNode": "n2"})


if __name__ == '__main__':
    unittest.main()
