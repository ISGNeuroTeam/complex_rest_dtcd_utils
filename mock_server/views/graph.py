from rest.views import APIView
from rest.response import Response, status, SuccessResponse
from rest.permissions import AllowAny
from rest_framework.request import Request
from ..utils.filesystem_graphmanager import FilesystemGraphManager
from ..settings import GRAPH_BASE_PATH, GRAPH_TMP_PATH, GRAPH_ID_NAME_MAP_PATH
import logging

from .. import settings
from ..utils.neo4j_graphmanager import Neo4jGraphManager
from ..utils.serializers import SubgraphSerializer

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
    graph_manager = Neo4jGraphManager(
        settings.NEO4J['uri'],
        settings.NEO4J['name'],
        auth=(settings.NEO4J['user'], settings.NEO4J['password'])
    )

    def get(self, request: Request):
        """Return requested fragment representation."""

        # for now, fragment handling does not work - we return full graph

        # TODO validate the request - must have fragment key
        # TODO implement fragment handling

        subgraph = self.graph_manager.read_all()
        serializer = SubgraphSerializer()  # TODO config
        payload = serializer.dump(subgraph)
        # TODO validation checks?
        # TODO structure of response?

        return SuccessResponse({'graph': payload})  # TODO key in config?

    def post(self, request: Request):
        """Save a fragment."""

        # for now, re-write the whole DB

        # TODO validate the request - graph data, fragment key
        payload = request.data['graph']  # TODO key in config
        serializer = SubgraphSerializer()   # TODO config
        subgraph = serializer.load(payload)
        # TODO implement fragment merge here or in put
        self.graph_manager.write(subgraph)  # TODO error handling
        # TODO structure of response?

        return SuccessResponse(http_status=status.HTTP_201_CREATED)
