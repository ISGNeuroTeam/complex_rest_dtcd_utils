from django.urls import reverse
from django.test import tag
from rest_framework import status
from rest_framework.test import APISimpleTestCase

from .. import fixtures


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

    @tag('slow')
    def test_post_get_many_times(self):
        for i in range(500):
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
