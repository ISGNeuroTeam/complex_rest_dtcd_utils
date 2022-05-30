from rest.views import APIView
from rest.response import status, SuccessResponse, ErrorResponse
from rest.permissions import AllowAny
from rest_framework.request import Request
import logging

from .. import settings
from ..serializers import FragmentSerializer
from ..utils.exceptions import FragmentExists
from ..utils.neo4j_graphmanager import Neo4jGraphManager
from ..utils.serializers import SubgraphSerializer

logger = logging.getLogger('dtcd_server')

GRAPH_MANAGER = Neo4jGraphManager(
    settings.NEO4J['uri'],
    settings.NEO4J['name'],
    auth=(settings.NEO4J['user'], settings.NEO4J['password'])
)


class Neo4jGraph(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ["get", "post", "delete"]
    graph_manager = GRAPH_MANAGER

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
        payload = request.data.get('graph')  # TODO key in config
        if payload is None:
            return ErrorResponse(error_message="graph key is missing")

        serializer = SubgraphSerializer()   # TODO config

        try:  # TODO smarter error handling
            subgraph = serializer.load(payload)  # FIXME bad design
        except Exception:
            return ErrorResponse(
                http_status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                error_message='graph loading error')
        else:
            # TODO implement fragment merge here or in put
            # TODO log number of nodes and relationships
            try:
                self.graph_manager.write(subgraph)  # TODO error handling
            except Exception:
                return ErrorResponse(
                    http_status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    error_message='graph writing error')
            else:
                # TODO structure of response?
                return SuccessResponse(http_status=status.HTTP_201_CREATED)

    def delete(self, request: Request):
        """Delete a fragment."""

        self.graph_manager.remove_all()

        return SuccessResponse(http_status=status.HTTP_200_OK)


class FragmentListCreateView(APIView):
    """Read a list of existing fragment names or create a new one."""

    http_method_names = ["get", "post"]
    permission_classes = (AllowAny,)
    serializer_class = FragmentSerializer
    graph_manager = GRAPH_MANAGER

    def get(self, request: Request, *args, **kwargs):
        """Read a list of existing fragment names."""

        names = self.graph_manager.fragment_names()
        return SuccessResponse({"fragments": sorted(names)})

    def post(self, request: Request, *args, **kwargs):
        """Create a new fragment with the given name if it does not exist.

        Returns 201 on success or 400 if the fragment already exists.
        """

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        name = serializer.validated_data["name"]

        try:
            self.graph_manager.create_fragment(name)
        except FragmentExists as e:
            return ErrorResponse(error_message=e)
        else:
            return SuccessResponse(http_status=status.HTTP_201_CREATED)
