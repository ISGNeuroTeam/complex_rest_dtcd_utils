from rest.views import APIView
from rest_framework import renderers
from rest.response import Response, status
from rest.permissions import AllowAny
from pathlib import Path
import logging

logger = logging.getLogger('dtcd_server')


class ReadHTML(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get']
    renderer_classes = [renderers.StaticHTMLRenderer]

    def get(self, request):
        with open(Path(__file__).parent / "../public/index.html", 'r') as file:
            html = file.read()
        return Response(
            html,
            status.HTTP_200_OK,
            content_type='text/html'
        )
