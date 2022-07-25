from rest.views import APIView
from rest.response import Response, status
from rest.permissions import AllowAny
from rest_framework.request import Request
from dtcd_utils.settings import DTCD_LOGS_FILE, DTCD_LOGS_CONF
from pathlib import Path
import json
import logging

logger = logging.getLogger('dtcd_utils')


class LogsView(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post']

    def get(self, request):
        with open(Path(__file__).parent.parent / DTCD_LOGS_CONF, "r") as file:
            data = json.load(file)
        return Response(
            data,
            status.HTTP_200_OK
        )

    def post(self, request: Request):  # when on Front buffer is full or timeout reached
        logs = request.data
        with open(Path(__file__).parent.parent / DTCD_LOGS_FILE, 'a') as file:
            file.write(json.dumps(logs) + '\n')
        return Response('saved!', status.HTTP_200_OK)
