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
# testing config
config = configparser.ConfigParser()
config.read(TEST_DIR / 'config.ini')
USE_DB = config['general'].getboolean('use_db')
N = config['general'].getint('num_iter')


@unittest.skip("deprecated")
@unittest.skipUnless(USE_DB, 'use_db=False')
@tag('neo4j')
class TestNeo4jGraphView(APISimpleTestCase):

    def setUp(self):
        """
        define instructions that will be executed before each test method
        """

        # TODO add graph clear
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

    def test_post_get_duplicated_edge(self):
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

    @unittest.skip("py2neo bug")
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

    @unittest.skip("py2neo bug")
    @tag('slow')
    def test_post_get_many_times_large_graph(self):
        with open(FIXTURES_DIR / "graph-sample-large.json") as f:
            data = json.load(f)
        fixtures.sort_payload(data)

        for i in range(N):
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
