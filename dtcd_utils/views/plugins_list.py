from rest.views import APIView
from rest.response import Response, status
from rest.permissions import AllowAny
from pathlib import Path
import os
import logging

logger = logging.getLogger('dtcd_utils')


class PluginsList(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get']

    @staticmethod
    def _item_to_path(item):
        if os.path.isdir(Path(__file__).parent / "../plugins" / item):
            js_file = next(file_name for file_name in os.listdir(Path(__file__).parent / "../plugins" / item) if file_name.endswith(".js"))
            return "./{0}/{1}".format(item, js_file)

    def get(self, request):
        list_dir = os.listdir(Path(__file__).parent / "../plugins")
        if ".gitkeep" in list_dir:
            list_dir.remove(".gitkeep")
        if ".DS_Store" in list_dir:
            list_dir.remove(".DS_Store")
        return Response(
            [self._item_to_path(item) for item in list_dir],
            status.HTTP_200_OK
        )
