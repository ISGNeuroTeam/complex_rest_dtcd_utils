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

logger = logging.getLogger('dtcd_server')


class WorkspaceDir(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post', 'put', 'delete']
    workspace_manager = FilesystemWorkspaceManager(WORKSPACE_BASE_PATH, WORKSPACE_TMP_PATH)

    def get(self, request, **kwargs):
        workspace_path = kwargs.get('workspace_path', '')
        qs = dict(request.query_params)
        if 'dir' not in qs:
            try:
                mapped_confs = self.workspace_manager.read_all_dir(workspace_path=workspace_path)  # return general info about every dir
            except Exception as e:
                return Response(str(e), status.HTTP_400_BAD_REQUEST)
            return Response(mapped_confs, status.HTTP_200_OK)
        dir = qs['dir'][0]
        try:
            conf = self.workspace_manager.read_dir(dir, workspace_path=workspace_path)  # return all info about specified dir
        except Exception as e:
            return Response(str(e), status.HTTP_400_BAD_REQUEST)
        return Response(conf, status.HTTP_200_OK)

    def post(self, request, **kwargs):
        workspace_path = kwargs.get('workspace_path', '')
        directories = request.data
        for configuration in directories:
            try:
                self.workspace_manager.write_dir(configuration, workspace_path=workspace_path)
            except Exception as e:
                return Response(str(e), status.HTTP_400_BAD_REQUEST)
        return Response(directories, status.HTTP_200_OK)

    def put(self, request, **kwargs):
        workspace_path = kwargs.get('workspace_path', '')
        workspaces = request.data
        edited = []
        for configuration in workspaces:
            try:
                edited.append(self.workspace_manager.update_dir(configuration, workspace_path=workspace_path))
            except Exception as e:
                return Response(str(e), status.HTTP_400_BAD_REQUEST)
        return Response(edited, status.HTTP_200_OK)

    def delete(self, request, **kwargs):
        workspace_path = kwargs.get('workspace_path', '')
        dirs = request.data
        for dir in dirs:
            try:
                self.workspace_manager.remove_dir(dir, workspace_path=workspace_path)
            except Exception as e:
                return Response(str(e), status.HTTP_400_BAD_REQUEST)
        return Response('success', status.HTTP_200_OK)
