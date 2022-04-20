import json
import unittest
from pathlib import Path


from mock_server.utils.serializers import SubgraphSerializer


# path to tests/ dir
TEST_DIR = Path(__file__).resolve().parent.parent
# filepath to subgraph-sample.json file in specified format
SAMPLE_PATH = TEST_DIR / "fixtures" / "subgraph-sample.json"


class TestSubgraphSerializer(unittest.TestCase):

    @classmethod
    def setUpClass(cls) -> None:
        # test data dictionary in exchange format
        with open(SAMPLE_PATH) as f:
            cls.data = json.load(f)

    def test_load(self):
        # TODO more tests?
        serializer = SubgraphSerializer()
        subgraph = serializer.load(self.data)

        self.assertEqual(len(subgraph.nodes), 15)
        self.assertEqual(len(subgraph.relationships), 14)

    # def test_dump(self):
    #     # TODO integration test?
    #     with open(SAMPLE_PATH) as f:
    #         data = json.load(f)  # original data

    #     serializer = SubgraphSerializer()
    #     # TODO replace with manually constructed Subgraph
    #     subgraph = serializer.load(data)
    #     exported = serializer.dump(subgraph)
    #     # TODO replace with sort_payload()
    #     # fix order of arrays
    #     exported[DEFAULTS["keys"]["nodes"]] = sorted(
    #         exported[DEFAULTS["keys"]["nodes"]], key=itemgetter("primitiveID")
    #     )
    #     exported[DEFAULTS["keys"]["edges"]] = sorted(
    #         exported[DEFAULTS["keys"]["edges"]],
    #         key=itemgetter(
    #             DEFAULTS["keys"]["source_node"], DEFAULTS["keys"]["target_node"]
    #         ),
    #     )

    #     self.assertEqual(data, exported)


if __name__ == '__main__':
    unittest.main()