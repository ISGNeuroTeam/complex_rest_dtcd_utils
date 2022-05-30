from rest.views import APIView
from rest.response import status, SuccessResponse, ErrorResponse
from rest.permissions import AllowAny
from rest_framework.request import Request
import logging

from .. import settings
from ..serializers import GraphSerializer, FragmentSerializer
from ..utils.exceptions import (
    FragmentDoesNotExist, FragmentExists, FragmentNotEmpty)
from ..utils.neo4j_graphmanager import Neo4jGraphManager
from ..utils.serializers import SubgraphSerializer

logger = logging.getLogger('dtcd_server')

GRAPH_MANAGER = Neo4jGraphManager(
    settings.NEO4J['uri'],
    settings.NEO4J['name'],
    auth=(settings.NEO4J['user'], settings.NEO4J['password'])
)


class FragmentListCreateView(APIView):
    """Read a list of existing fragment names or create a new one."""

    http_method_names = ["get", "post"]
    permission_classes = (AllowAny,)
    serializer_class = FragmentSerializer
    graph_manager = GRAPH_MANAGER

    def get(self, request: Request, format=None):
        """Read a list of existing fragment names."""

        names = self.graph_manager.fragment_names()
        return SuccessResponse({"fragments": sorted(names)})

    def post(self, request: Request, format=None):
        """Create a new fragment with the given name if it does not exist.

        Returns 201 on success or 400 if the fragment already exists.
        """

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        name = serializer.validated_data["name"]

        try:
            self.graph_manager.create_fragment(name)
        except FragmentExists as e:
            return ErrorResponse(error_message=str(e))
        else:
            return SuccessResponse(http_status=status.HTTP_201_CREATED)


class FragmentUpdateDestroyView(APIView):
    """Rename or delete a fragment."""

    http_method_names = ["put", "delete"]
    permission_classes = (AllowAny,)
    serializer_class = FragmentSerializer
    graph_manager = GRAPH_MANAGER

    def update(self, request: Request, pk: str, format=None):
        """Rename a fragment.

        Returns 404 if a fragment does not exist or 400 if a new name is
        already taken.
        """

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        new = serializer.validated_data["name"]
        old = pk

        try:
            self.graph_manager.rename_fragment(old, new)
        except FragmentDoesNotExist as e:
            return ErrorResponse(
                http_status=status.HTTP_404_NOT_FOUND, error_message=str(e))
        except FragmentExists as e:
            return ErrorResponse(error_message=str(e))
        else:
            return SuccessResponse()

    def delete(self, request: Request, pk: str, format=None):
        """Delete a fragment.

        Returns 404 if a fragment does not exist or 400 if a fragment
        has graph content (not empty).
        """

        try:
            self.graph_manager.remove_fragment(pk)
        except FragmentDoesNotExist as e:
            return ErrorResponse(
                http_status=status.HTTP_404_NOT_FOUND, error_message=str(e))
        except FragmentNotEmpty as e:
            return ErrorResponse(error_message=str(e))
        else:
            return SuccessResponse()


class Neo4jGraphView(APIView):
    """Read, replace or delete graph content."""

    http_method_names = ["get", "put", "delete"]
    permission_classes = (AllowAny,)
    serializer_class = GraphSerializer
    converter_class = SubgraphSerializer
    graph_manager = GRAPH_MANAGER

    def get(self, request: Request, pk: str, format=None):
        """Read graph content of a fragment."""

        # read fragment's graph
        try:
            subgraph = self.graph_manager.read(pk)
        except FragmentDoesNotExist as e:
            return ErrorResponse(
                http_status=status.HTTP_404_NOT_FOUND, error_message=str(e))

        # convert to representation format
        converter = self.converter_class()
        payload = converter.dump(subgraph)

        # TODO validation checks?
        # TODO move hard-coded key to config

        return SuccessResponse({'graph': payload})

    def put(self, request: Request, pk: str, format=None):
        """Replace graph content.

        Returns 400 if it cannot convert data to subgraph or 404 if
        given fragment pk is missing.
        """

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        payload = serializer.validated_data["graph"]

        # convert dict to subgraph
        converter = self.converter_class()
        try:
            subgraph = converter.load(payload)
        except Exception:
            return ErrorResponse(error_message="Failed to convert data to subgraph.")

        # replace fragment content with new subgraph
        try:
            self.graph_manager.write(subgraph, pk)
        except FragmentDoesNotExist as e:
            return ErrorResponse(
                http_status=status.HTTP_404_NOT_FOUND, error_message=str(e))

        return SuccessResponse()
