from rest.views import APIView
from rest.response import Response, status
from rest.permissions import AllowAny
from pathlib import Path
from ..settings import WORKSPACE_BASE_PATH, WORKSPACE_TMP_PATH
from ..utils.filesystem_workspacemanager import FilesystemWorkspaceManager
import json
import os
import logging
import uuid

logger = logging.getLogger('mock_server')


class Workspace(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post', 'put', 'delete']
    workspace_manager = FilesystemWorkspaceManager(WORKSPACE_BASE_PATH, WORKSPACE_TMP_PATH)

    def get(self, request):
        logger.info('ladybug')
        qs = dict(request.query_params)
        if 'id' not in qs:
            try:
                mapped_confs = self.workspace_manager.read_all()  # return general info about every conf
            except Exception as e:
                return Response(str(e), status.HTTP_400_BAD_REQUEST)
            return Response(mapped_confs, status.HTTP_200_OK)
        id = qs['id'][0]
        try:
            conf = self.workspace_manager.read(id)  # return all info about specified conf
        except Exception as e:
            return Response(str(e), status.HTTP_400_BAD_REQUEST)
        return Response(conf, status.HTTP_200_OK)

    def post(self, request):
        workspaces = request.data
        for configuration in workspaces:
            try:
                self.workspace_manager.write(configuration)
            except Exception as e:
                return Response(str(e), status.HTTP_400_BAD_REQUEST)
        return Response(workspaces, status.HTTP_200_OK)

    def put(self, request):
        workspaces = request.data
        edited = []
        for conf in workspaces:
            try:
                edited.append(self.workspace_manager.update(conf))
            except Exception as e:
                return Response(str(e), status.HTTP_400_BAD_REQUEST)
        return Response(edited, status.HTTP_200_OK)

    def delete(self, request):
        idxes = request.data
        for idx in idxes:
            try:
                self.workspace_manager.remove(idx)
            except Exception as e:
                return Response(str(e), status.HTTP_400_BAD_REQUEST)
        return Response('success', status.HTTP_200_OK)
