import logging

from rest_framework.request import Request

from rest.views import APIView
from rest.response import status, SuccessResponse, ErrorResponse
from rest.permissions import AllowAny

from .. import settings
from ..serializers import (
    GraphSerializer, FragmentSerializer, FragmentUpdateSerializer)
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


class FragmentListView(APIView):
    """List existing fragments or create a new one."""

    http_method_names = ["get", "post"]
    permission_classes = (AllowAny,)
    serializer_class = FragmentSerializer
    graph_manager = GRAPH_MANAGER

    def get(self, request: Request):
        """Read a list of existing fragment names."""

        names = self.graph_manager.fragment_names()
        return SuccessResponse({"fragments": sorted(names)})

    def post(self, request: Request):
        """Create a new fragment with the given name if it does not exist.

        Returns 201 on success or 400 if the fragment already exists.
        """

        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        pk = serializer.validated_data["fragment"]

        try:
            self.graph_manager.create_fragment(pk)
        except FragmentExists as e:
            return ErrorResponse(error_message=str(e))
        else:
            return SuccessResponse(http_status=status.HTTP_201_CREATED)


class FragmentDetailView(APIView):
    """Update or delete a fragment."""

    http_method_names = ["put", "delete"]
    permission_classes = (AllowAny,)
    graph_manager = GRAPH_MANAGER

    def put(self, request: Request):
        """Rename a fragment.

        Returns 404 if a fragment does not exist or 400 if a new name is
        already taken.
        """

        serializer = FragmentUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        old = serializer.validated_data["fragment"]
        new = serializer.validated_data["new_name"]

        try:
            self.graph_manager.rename_fragment(old, new)
        except FragmentDoesNotExist as e:
            return ErrorResponse(
                http_status=status.HTTP_404_NOT_FOUND, error_message=str(e))
        except FragmentExists as e:
            return ErrorResponse(error_message=str(e))
        else:
            return SuccessResponse()

    def delete(self, request: Request):
        """Delete a fragment.

        Returns 404 if a fragment does not exist or 400 if a fragment
        has graph content (not empty).
        """

        serializer = FragmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pk = serializer.validated_data["fragment"]

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
    """Retrieve, replace or delete graph content."""

    http_method_names = ["get", "put", "delete"]
    permission_classes = (AllowAny,)
    converter_class = SubgraphSerializer
    graph_manager = GRAPH_MANAGER

    def get(self, request: Request):
        """Read graph content of a fragment."""

        serializer = FragmentSerializer(data=request.GET)
        serializer.is_valid(raise_exception=True)
        pk = serializer.validated_data["fragment"]

        # read fragment's graph
        try:
            subgraph = self.graph_manager.read(pk)
        except FragmentDoesNotExist as e:
            return ErrorResponse(
                http_status=status.HTTP_404_NOT_FOUND, error_message=str(e))
        logger.info(
            f"Read {len(subgraph.nodes)} nodes, {len(subgraph.relationships)} relationships.")

        # convert to representation format
        converter = self.converter_class()
        payload = converter.dump(subgraph)
        n, m = describe(payload)
        logger.info(f"Converted to payload with {n} vertices, {m} edges.")

        # TODO validation checks?
        # TODO move hard-coded key to config

        return SuccessResponse({'graph': payload})

    def put(self, request: Request):
        """Replace graph content.

        Returns 400 if it cannot convert data to subgraph or 404 if
        given fragment pk is missing.
        """

        serializer = GraphSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pk = serializer.validated_data["fragment"]
        payload = serializer.validated_data["graph"]

        n, m = describe(payload)
        logger.info(f"Got payload with {n} vertices, {m} edges.")

        # convert dict to subgraph
        converter = self.converter_class()
        try:
            subgraph = converter.load(payload)
        except Exception:
            return ErrorResponse(error_message="Failed to convert data to subgraph.")
        logger.info(
            f"Writing {len(subgraph.nodes)} nodes, {len(subgraph.relationships)} relationships.")

        # replace fragment content with new subgraph
        try:
            self.graph_manager.write(subgraph, pk)
        except FragmentDoesNotExist as e:
            return ErrorResponse(
                http_status=status.HTTP_404_NOT_FOUND, error_message=str(e))

        return SuccessResponse()

    def delete(self, request: Request):
        """Delete graph content.

        Raises 404 if given fragment is missing.
        """

        serializer = FragmentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        pk = serializer.validated_data["fragment"]

        try:
            self.graph_manager.remove(pk)
        except FragmentDoesNotExist as e:
            return ErrorResponse(error_message=str(e))
        else:
            return SuccessResponse()


def describe(data):
    """Return (num_nodes, num_edges) tuple from data."""
    return len(data["nodes"]), len(data["edges"])
