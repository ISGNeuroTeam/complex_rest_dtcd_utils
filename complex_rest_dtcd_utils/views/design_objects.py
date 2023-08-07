from rest.views import APIView
from rest.response import Response, status
from rest.permissions import AllowAny
from pathlib import Path
import json
import logging

logger = logging.getLogger('dtcd_utils')


class DesignObjects(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get']

    def get(self, request):
        with open(Path(__file__).parent / "../Design_objects.json", "r", encoding='utf-8') as file:
            data = json.load(file)
        return Response(
            data,
            status.HTTP_200_OK
        )