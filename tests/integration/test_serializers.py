import json
import unittest
from operator import itemgetter
from pathlib import Path

from mock_server.utils.serializers import SubgraphSerializer


# path to tests/ dir
TEST_DIR = Path(__file__).resolve().parent.parent
FIXTURES_DIR = TEST_DIR / "fixtures"


def sort_payload(data: dict):
    """Sort payload dict according to spec in-place."""

    nodes = data["nodes"]

    for node in nodes:
        node["initPorts"] = sorted(node["initPorts"], key=itemgetter("primitiveID"))

    data["nodes"] = sorted(nodes, key=itemgetter("primitiveID"))
    data["edges"] = sorted(data["edges"], key=itemgetter(
        "sourceNode", "sourcePort", "targetNode", "targetPort"))


class TestSubgraphSerializer(unittest.TestCase):

    def test_load_dump_small(self):
        with open(FIXTURES_DIR / "graph-sample-small.json") as f:
            data = json.load(f)
        sort_payload(data)
        serializer = SubgraphSerializer()
        subgraph = serializer.load(data)
        exported = serializer.dump(subgraph)
        sort_payload(exported)
        self.assertEqual(data, exported)

    def test_load_dump_large(self):
        with open(FIXTURES_DIR / "graph-sample-large.json") as f:
            data = json.load(f)
        sort_payload(data)
        serializer = SubgraphSerializer()
        subgraph = serializer.load(data)
        exported = serializer.dump(subgraph)
        sort_payload(exported)
        self.assertEqual(data, exported)


if __name__ == '__main__':
    unittest.main()
