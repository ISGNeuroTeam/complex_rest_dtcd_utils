from rest.views import APIView
from rest.response import Response, status
from rest.permissions import AllowAny
from rest_framework.request import Request
from pathlib import Path
from ..utils.filesystem_graphmanager import FilesystemGraphManager
from ..settings import GRAPH_BASE_PATH, GRAPH_TMP_PATH
import os
import logging

logger = logging.getLogger('mock_server')


class Graph(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post', 'put', 'delete']
    graph_manager = FilesystemGraphManager(GRAPH_BASE_PATH, GRAPH_TMP_PATH)

    def post(self, request):
        graphs = request.data
        for graph in graphs:
            self.graph_manager.write(graph)
        return Response(
            {"status": "SUCCESS"},
            status.HTTP_200_OK
        )

    def put(self, request: Request):
        count = 0
        graphs = request.data
        for graph in graphs:
            if self.graph_manager.update(graph):
                count += 1
        if count == len(graphs):  # always one
            return Response(
                {"status": "SUCCESS", "count": count},
                status.HTTP_200_OK
            )
        return Response(
            {"status": "ERROR", "count": count},
            status.HTTP_400_BAD_REQUEST
        )

    def delete(self, request):
        ids = request.data
        count = 0
        for id in ids:
            if self.graph_manager.remove(id):
                count += 1
        if count == len(ids):  # always one
            return Response(
                {"status": "SUCCESS", "count": count},
                status.HTTP_200_OK
            )
        return Response(
            {"status": "ERROR", "count": count},
            status.HTTP_400_BAD_REQUEST
        )

    def get(self, request:Request):
        qs = dict(request.query_params)
        if 'id' not in qs:
            return Response('id not in query_string', status.HTTP_404_NOT_FOUND)
        try:
            graph_content = self.graph_manager.read(int(qs['id'][0]))
        except ValueError:
            return Response('no graph with such id', status.HTTP_404_NOT_FOUND)
        return Response(graph_content, status.HTTP_200_OK)
