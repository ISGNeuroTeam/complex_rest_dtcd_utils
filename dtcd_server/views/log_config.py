from rest.views import APIView
from rest.response import Response, status
from rest.permissions import AllowAny
from rest_framework.request import Request
from pathlib import Path
import json
import logging

logger = logging.getLogger('dtcd_server')


class LogsView(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post']

    def get(self, request):  # get config of log system BUT should be get log, for get config should be another endpoint
        with open(Path(__file__).parent / "../log_configuration.json", "r") as file:
            data = json.load(file)
        return Response(
            data,
            status.HTTP_200_OK
        )

    def post(self, request: Request):  # when on Front buffer is full or timeout reached
        logs = request.data
        with open(Path(__file__).parent / "../calc_log.txt", 'a') as file:
            file.write(str(logs))
        return Response('saved!', status.HTTP_200_OK)
