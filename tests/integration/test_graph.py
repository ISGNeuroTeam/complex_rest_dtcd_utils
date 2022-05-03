import json
import unittest
from pathlib import Path

from django.urls import reverse
from django.test import tag
from rest_framework import status
from rest_framework.test import APISimpleTestCase

from dtcd_server import settings

from .. import fixtures


TEST_DIR = Path(__file__).resolve().parent.parent
FIXTURES_DIR = TEST_DIR / "fixtures"
USE_DB = settings.ini_config['testing'].getboolean('use_db')
N = 50


@unittest.skipUnless(USE_DB, 'use_db=False')
@tag('neo4j')
class TestNeo4jGraphView(APISimpleTestCase):

    def setUp(self):
        """
        define instructions that will be executed before each test method
        """

        self.url = reverse('dtcd_server:graph')
        self.data = fixtures.generate_data()['data']
        fixtures.sort_payload(self.data)

    def test_post_get(self):
        # post
        response = self.client.post(self.url, data={'graph': self.data}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # get
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        freshdata = response.data['graph']
        fixtures.sort_payload(freshdata)
        self.assertEqual(self.data, freshdata)

    @unittest.expectedFailure
    def test_post_get_duplicated_edge(self):
        data = {
            "nodes": [{"primitiveID": "france"}, {"primitiveID": "spain"}],
            "edges": [
                {
                    "sourceNode": "france",
                    "targetNode": "spain",
                    "sourcePort": "paris",
                    "targetPort": "madrid"},
                {
                    "sourceNode": "france",
                    "targetNode": "spain",
                    "sourcePort": "lyon",
                    "targetPort": "barcelona"}]
        }
        # post
        response = self.client.post(self.url, data={'graph': data}, format='json')
        print(response.data)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # get
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        freshdata = response.data['graph']
        fixtures.sort_payload(freshdata)
        self.assertEqual(data, freshdata)

    @unittest.expectedFailure
    @tag('slow')
    def test_post_get_large(self):
        with open(FIXTURES_DIR / "graph-sample-large.json") as f:
            data = json.load(f)
        fixtures.sort_payload(data)

        # post
        response = self.client.post(self.url, data={'graph': data}, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # get
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        freshdata = response.data['graph']
        fixtures.sort_payload(freshdata)
        self.assertEqual(data, freshdata)

    @tag('slow')
    def test_post_get_many_times(self):
        for i in range(N):
            self.maxDiff = None  # to see full difference

            # post
            response = self.client.post(self.url, data={'graph': self.data}, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

            # get
            response = self.client.get(self.url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            freshdata = response.data['graph']
            fixtures.sort_payload(freshdata)
            self.assertEqual(
                self.data, freshdata, msg=f"Lap {i}"
            )

    @unittest.skip
    @tag('slow')
    def test_post_get_many_times_large_graph(self):
        with open(FIXTURES_DIR / "graph-sample-large.json") as f:
            data = json.load(f)

        for i in range(15):
            self.maxDiff = None  # to see full difference

            # post
            response = self.client.post(self.url, data={'graph': data}, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

            # get
            response = self.client.get(self.url)
            self.assertEqual(response.status_code, status.HTTP_200_OK)
            freshdata = response.data['graph']
            fixtures.sort_payload(freshdata)
            self.assertEqual(
                data, freshdata, msg=f"Lap {i}"
            )
