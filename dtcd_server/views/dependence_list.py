from rest.views import APIView
from rest.response import Response, status
from rest.permissions import AllowAny
from pathlib import Path
import json
import logging

logger = logging.getLogger('dtcd_server')


class DependenceList(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get']

    def get(self, request):
        with open(Path(__file__).parent / "../dependencies/manifest.json", "r") as file:
            data = json.load(file)
        return Response(
            data,
            status.HTTP_200_OK
        )
