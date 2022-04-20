import json
import unittest
from operator import itemgetter
from pathlib import Path

from mock_server.settings import SCHEMA
from mock_server.utils.serializers import SubgraphSerializer


# path to tests/ dir
TEST_DIR = Path(__file__).resolve().parent.parent
# filepath to subgraph-sample.json file in specified format
SAMPLE_PATH = TEST_DIR / "fixtures" / "subgraph-sample.json"


class TestSubgraphSerializer(unittest.TestCase):

    def test_load_dump(self):
        with open(SAMPLE_PATH) as f:
            data = json.load(f)  # original data

        serializer = SubgraphSerializer()
        # TODO replace with manually constructed Subgraph
        subgraph = serializer.load(data)
        exported = serializer.dump(subgraph)
        # TODO replace with sort_payload()
        # fix order of arrays
        exported[SCHEMA["keys"]["nodes"]] = sorted(
            exported[SCHEMA["keys"]["nodes"]], key=itemgetter("primitiveID")
        )
        exported[SCHEMA["keys"]["edges"]] = sorted(
            exported[SCHEMA["keys"]["edges"]],
            key=itemgetter(
                SCHEMA["keys"]["source_node"], SCHEMA["keys"]["target_node"]
            ),
        )

        self.assertEqual(data, exported)


if __name__ == '__main__':
    unittest.main()
