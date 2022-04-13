"""
Integration tests for custom utils.py module.
"""

import configparser
import json
import unittest
from operator import itemgetter
from pathlib import Path

from py2neo import Graph, ServiceUnavailable

from mock_server.utils import serializers


def setUpModule():
    # path to tests/ dir
    global TEST_DIR
    TEST_DIR = Path(__file__).resolve().parent.parent

    # filepath to subgraph-sample.json file in specified format
    global SAMPLE_PATH
    SAMPLE_PATH = TEST_DIR / 'fixtures' / 'subgraph-sample.json'

    # test config  TODO replace with plugins's config
    global CONFIG
    CONFIG = configparser.ConfigParser()
    CONFIG.read(TEST_DIR / 'config.ini')

    # connection to neo4j DB
    global GRAPH
    uri = CONFIG['neo4j']['uri']
    user = CONFIG['neo4j']['user']
    password = CONFIG['neo4j']['password']
    GRAPH = Graph(uri, auth=(user, password))

    try:
        GRAPH.query('SHOW DEFAULT DATABASE')  # check connection
    except ServiceUnavailable:
        raise


def sort_payload(data: dict):
    # sort payload dict according to spec in-place
    nodes = data['nodes']

    for node in nodes:
        node['ports'] = sorted(
            node['ports'], key=itemgetter('primitiveID'))

    data['nodes'] = sorted(nodes, key=itemgetter('primitiveID'))
    data['edges'] = sorted(
        data['edges'], key=itemgetter('sourceNode', 'targetNode'))


class TestSubgraphSerializer(unittest.TestCase):
    """Integration tests for SubgraphSerializer."""

    @classmethod
    def setUpClass(cls) -> None:
        with open(SAMPLE_PATH) as f:
            cls.data = json.load(f)  # test data dictionary in exchange format
        sort_payload(cls.data)

    def test_load_dump(self):
        serializer = serializers.SubgraphSerializer()
        subgraph = serializer.load(self.data)
        payload = serializer.dump(subgraph)
        sort_payload(payload)

        self.assertEqual(self.data, payload)

    def test_load_dump_through_database(self):
        # TODO figure out safe use of DB for tests
        GRAPH.delete_all()  # TODO wipes out all data from DB
        serializer = serializers.SubgraphSerializer()
        subgraph = serializer.load(self.data)
        GRAPH.create(subgraph)
        x = GRAPH.query('MATCH ()-[r]->() RETURN r LIMIT 500').to_subgraph()
        GRAPH.delete_all()  # TODO wipes out all data from DB
        payload = serializer.dump(x)
        sort_payload(payload)

        self.assertEqual(self.data, payload)


if __name__ == '__main__':
    unittest.main()
