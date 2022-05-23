import json
import unittest
from operator import itemgetter
from pathlib import Path

from dtcd_server.utils.serializers import SubgraphSerializer

from .. import fixtures


TEST_DIR = Path(__file__).resolve().parent.parent
FIXTURES_DIR = TEST_DIR / "fixtures"


class TestSubgraphSerializer(unittest.TestCase):

    def test_load_data(self):
        data = {
            "name": "amy",
            "online": True,
            "address": ["bob", "dan"],
            "layout": {
                "x": 0,
                "y": 0
            }
        }

        serializer = SubgraphSerializer()
        tree = serializer._load_data(data)
        self.assertEqual(len(tree.subgraph.nodes), 2)
        self.assertEqual(len(tree.subgraph.relationships), 1)
        self.assertTrue(tree.root.has_label("_Data"))

    def test_load(self):
        data = fixtures.generate_data()['data']
        serializer = SubgraphSerializer()
        subgraph = serializer.load(data)
        self.assertEqual(len(subgraph.nodes), 10)
        self.assertEqual(len(subgraph.relationships), 9)

    def test_load_from_json(self):
        with open(FIXTURES_DIR / "graph-sample-small.json") as f:
            data = json.load(f)

        serializer = SubgraphSerializer()
        subgraph = serializer.load(data)
        self.assertEqual(len(subgraph.nodes), 16)
        self.assertEqual(len(subgraph.relationships), 15)

    def test_dump(self):
        d = fixtures.generate_data()
        data = d['data']
        subgraph = d['subgraph']
        serializer = SubgraphSerializer()
        exported = serializer.dump(subgraph)

        # fix order of arrays
        exported['nodes'] = sorted(
            exported['nodes'], key=itemgetter("primitiveID")
        )
        exported["edges"] = sorted(
            exported["edges"],
            key=itemgetter(
                "sourceNode", "sourcePort", "targetNode", "targetPort"),
        )

        self.assertEqual(data, exported)


if __name__ == '__main__':
    unittest.main()
