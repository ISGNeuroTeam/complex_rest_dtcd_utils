from rest.views import APIView
from rest.response import Response, status
from rest.permissions import AllowAny
from pathlib import Path
import os
import logging

logger = logging.getLogger('mock_server')


class GraphList(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get']

    def get(self, request):
        file_list = os.listdir(Path(__file__).parent / "../graphs")
        file_list.remove(".gitkeep")
        return Response([{"name": file_name, "id": index} for index, file_name in enumerate(file_list)], status.HTTP_200_OK)
