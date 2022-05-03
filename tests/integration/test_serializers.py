import configparser
import json
import unittest
from pathlib import Path

from dtcd_server.utils.serializers import SubgraphSerializer

from ..fixtures import sort_payload


# path to tests/ dir
TEST_DIR = Path(__file__).resolve().parent.parent
FIXTURES_DIR = TEST_DIR / "fixtures"
# testing config
config = configparser.ConfigParser()
config.read(TEST_DIR / 'config.ini')
N = config['general'].getint('num_iter')


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

    def test_load_dump_many_times(self):
        with open(FIXTURES_DIR / "graph-sample-small.json") as f:
            data = json.load(f)
        sort_payload(data)

        ok = True

        # TODO settings for number of iterations
        for _ in range(N):
            serializer = SubgraphSerializer()
            subgraph = serializer.load(data)
            serializer = SubgraphSerializer()
            exported = serializer.dump(subgraph)
            sort_payload(exported)
            if data != exported:
                ok = False
                break

        self.assertTrue(ok)

    def test_load_dump_large(self):
        with open(FIXTURES_DIR / "graph-sample-large.json") as f:
            data = json.load(f)
        sort_payload(data)
        serializer = SubgraphSerializer()
        subgraph = serializer.load(data)
        exported = serializer.dump(subgraph)
        sort_payload(exported)
        self.assertEqual(data, exported)

    def test_load_dump_large_many_times(self):
        with open(FIXTURES_DIR / "graph-sample-large.json") as f:
            data = json.load(f)
        sort_payload(data)

        for i in range(N):
            serializer = SubgraphSerializer()
            subgraph = serializer.load(data)
            exported = serializer.dump(subgraph)
            sort_payload(exported)
            self.assertEqual(data, exported, msg=f'Lap {i}')

    # TODO add tests through DB: duplicated edges


if __name__ == '__main__':
    unittest.main()
