from rest.views import APIView
from rest.response import Response, status, SuccessResponse
from rest.permissions import AllowAny
from rest_framework.request import Request
from ..utils.filesystem_graphmanager import FilesystemGraphManager
from ..settings import GRAPH_BASE_PATH, GRAPH_TMP_PATH, GRAPH_ID_NAME_MAP_PATH
import logging

from mock_server import settings
from mock_server.utils.graphmanagers import Neo4jGraphManager
from mock_server.utils.serializers import SubgraphSerializer

logger = logging.getLogger('mock_server')


class Graph(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post', 'put', 'delete']
    graph_manager = FilesystemGraphManager(GRAPH_BASE_PATH, GRAPH_TMP_PATH, GRAPH_ID_NAME_MAP_PATH)

    def post(self, request):
        graphs = request.data
        for graph in graphs:
            try:
                self.graph_manager.write(graph)
            except Exception as e:
                return Response(
                    {"status": "ERROR", "msg": str(e)},
                    status.HTTP_400_BAD_REQUEST
                )
        return Response(
            {"status": "SUCCESS"},
            status.HTTP_200_OK
        )

    def put(self, request: Request):
        graphs = request.data
        for graph in graphs:
            try:
                self.graph_manager.update(graph)
            except Exception as e:
                return Response(
                    {"status": "ERROR", "msg": str(e)},
                    status.HTTP_400_BAD_REQUEST
                )
        return Response(
            {"status": "SUCCESS"},
            status.HTTP_200_OK
        )

    def delete(self, request):
        ids = request.data
        for id in ids:
            try:
                self.graph_manager.remove(id)
            except Exception as e:
                return Response(
                    {"status": "ERROR", "msg": str(e)},
                    status.HTTP_400_BAD_REQUEST
                )
        return Response(
            {"status": "SUCCESS"},
            status.HTTP_200_OK
        )

    def get(self, request: Request):
        qs = dict(request.query_params)
        if 'id' not in qs:
            return Response(self.graph_manager.read_all(), status.HTTP_200_OK)
        try:
            graph_content = self.graph_manager.read(qs['id'][0])
        except Exception as e:
            return Response({"status": "ERROR", "msg": str(e)}, status.HTTP_400_BAD_REQUEST)
        return Response(graph_content, status.HTTP_200_OK)


class Neo4jGraph(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ["get", "post"]
    graph_manager = Neo4jGraphManager()

    def get(self, request: Request):
        """Return requested fragment representation."""

        # for now, fragment handling does not work - we return full graph

        # TODO validate the request - must have fragment key
        fragment = request.data.get('fragment')  # TODO key in config?

        subgraph = self.graph_manager.read(fragment)
        serializer = SubgraphSerializer()
        data = serializer.dump(subgraph)
        # TODO validation checks?

        # TODO structure of response?
        return SuccessResponse({'graph': data})  # TODO key in config?
