import configparser
import json
import unittest
from pathlib import Path

from django.urls import reverse
from django.test import tag
from rest_framework import status
from rest_framework.test import APISimpleTestCase

from .. import fixtures


TEST_DIR = Path(__file__).resolve().parent.parent
FIXTURES_DIR = TEST_DIR / "fixtures"
DATA_DIR = TEST_DIR / "data"
# testing config
config = configparser.ConfigParser()
config.read(TEST_DIR / 'config.ini')
USE_DB = config['general'].getboolean('use_db')
N = config['general'].getint('num_iter')


@unittest.skipUnless(USE_DB, 'use_db=False')
@tag('api', 'neo4j')
class TestNeo4jGraphView(APISimpleTestCase):

    @classmethod
    def setUpClass(cls):
        cls.url_fragments = reverse('dtcd_server:fragments')
        cls.url_reset = reverse('dtcd_server:reset')
        cls.data = fixtures.generate_data()['data']
        fixtures.sort_payload(cls.data)

    @classmethod
    def tearDownClass(cls):
        pass

    def setUp(self):
        # create a fragment
        response = self.client.post(
            self.url_fragments, data={"name": "sales"}, format="json")
        self.fragment_id = int(response.data["fragment"]["id"])
        self.url_graph = reverse(
            'dtcd_server:fragment-graph', args=(self.fragment_id,))

    def tearDown(self):
        # clear Neo4j
        self.client.post(self.url_reset)

    def _put(self, data):
        """Shortcut to upload graph data to pre-created fragment."""

        fixtures.sort_payload(data)
        response = self.client.put(
            self.url_graph, data={'graph': data}, format='json')
        return response

    def _check_put(self, data):
        response = self._put(data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        return response

    def _get(self):
        """Shortcut to read graph data from pre-created fragment."""

        response = self.client.get(self.url_graph, format='json')
        return response

    def _check_get(self):
        response = self._get()
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("graph", response.data)
        return response

    def _check_put_get(self, data):
        self._check_put(data)
        freshdata = self._check_get().data['graph']
        fixtures.sort_payload(freshdata)
        self.assertEqual(freshdata, data)

    def _check_put_get_from_json(self, path):
        with open(path) as f:
            data = json.load(f)
        self._check_put_get(data)

    def test_put_get(self):
        self._check_put_get(self.data)

    def test_put_get_duplicated_edges(self):
        data = {
            "nodes": [{"primitiveID": "france"}, {"primitiveID": "spain"}],
            "edges": [
                {
                    "sourceNode": "france",
                    "targetNode": "spain",
                    "sourcePort": "lyon",
                    "targetPort": "barcelona"},
                {
                    "sourceNode": "france",
                    "targetNode": "spain",
                    "sourcePort": "paris",
                    "targetPort": "madrid"},
            ]
        }
        self._check_put_get(data)

    def test_put_get_basic(self):
        self._check_put_get_from_json(DATA_DIR / "basic.json")

    def test_put_get_basic_attributes(self):
        self._check_put_get_from_json(DATA_DIR / "basic-attributes.json")

    def test_put_get_basic_edges(self):
        self._check_put_get_from_json(DATA_DIR / "basic-edges.json")

    def test_put_get_basic_ports(self):
        self._check_put_get_from_json(DATA_DIR / "basic-ports.json")

    def test_put_get_basic_nested_attributes(self):
        self._check_put_get_from_json(DATA_DIR / "basic-nested-attributes.json")

    def test_put_get_basic_nested_edges(self):
        self._check_put_get_from_json(DATA_DIR / "basic-nested-edges.json")

    def test_put_get_basic_nested_ports(self):
        self._check_put_get_from_json(DATA_DIR / "basic-nested-ports.json")

    @tag('slow')
    def test_put_get_large(self):
        self._check_put_get_from_json(FIXTURES_DIR / "graph-sample-large.json")

    def test_put_get_empty(self):
        self._check_put_get_from_json(DATA_DIR / "empty.json")

    @tag('slow')
    def test_put_get_n25_e25(self):
        self._check_put_get_from_json(DATA_DIR / "n25_e25.json")

    @tag('slow')
    def test_put_get_n50_e25(self):
        self._check_put_get_from_json(DATA_DIR / "n50_e25.json")


if __name__ == '__main__':
    unittest.main()
