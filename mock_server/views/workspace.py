from rest.views import APIView
from rest.response import Response, status
from rest.permissions import AllowAny
from rest_framework.request import Request
from pathlib import Path
import json
import os
import logging

logger = logging.getLogger('mock_server')

class Workspace(APIView):
    permission_classes = (AllowAny,)
    http_method_names = ['get', 'post', 'put', 'delete']

    @staticmethod
    def _get_workspace_list():
        list_dir_workspaces = os.listdir(Path(__file__).parent / "../workspaces")
        list_dir_workspaces.remove(".gitkeep")
        if ".DS_Store" in list_dir_workspaces:
            list_dir_workspaces.remove(".DS_Store")

        workspaces = []
        for file_name in list_dir_workspaces:
            with open(Path(__file__).parent / '../workspaces' / file_name, "r") as file:
                configuration = json.load(file)
                workspaces.append(configuration)
        return workspaces

    def get(self, request):
        qs = dict(request.query_params)
        if 'id' not in qs:
            id = 0
        else:
            id = int(qs['id'][0])
        workspaces = self._get_workspace_list()
        if not id:  # return general info about every conf
            mapped_confs = list(map(lambda conf: {'id': conf['id'], 'title': conf['title']}, workspaces))
            return Response(mapped_confs, status.HTTP_200_OK)
        conf = next(conf for conf in workspaces if conf["id"] == id)  # return all info about specified conf
        return Response(conf, status.HTTP_200_OK)

    def post(self, request):
        workspaces = request.data
        for configuration in workspaces:
            workspaceList = self._get_workspace_list()
            id = 0
            if len(workspaceList) != 0:
                id = max(list(map(lambda conf: conf['id'], workspaceList))) + 1
            else:
                id = 1
            configuration["id"] = id
            with open(Path(__file__).parent / "../workspaces" / f"{id}.json", "w") as file:
                file.write(json.dumps(configuration))
        return Response(workspaces, status.HTTP_200_OK)

    def put(self, request):
        workspaces = request.data
        file_list = os.listdir(Path(__file__).parent / "../workspaces")
        edited = []
        for conf in workspaces:
            file_name = f"{conf['id']}.json"
            if file_name in file_list:
                if 'content' not in conf:  # if no content change title
                    configuration = ''
                    with open(Path(__file__).parent / f'../workspaces/{file_name}', "r") as file:
                        configuration = json.load(file)
                    configuration['title'] = conf['title']
                    with open(os.path.join(Path(__file__).parent / "../workspaces", file_name), "w") as file:
                        file.write(json.dumps(configuration))
                else:
                    with open(os.path.join(Path(__file__).parent / "../workspaces", file_name), "w") as file:
                        file.write(json.dumps(conf))
                edited.append(conf['id'])
        return Response(edited, status.HTTP_200_OK)

    def delete(self, request):
        idxes = request.data
        file_list = os.listdir(Path(__file__).parent / "../workspaces")
        for idx in idxes:
            file_name = f"{idx}.json"
            if file_name in file_list:
                os.remove(Path(__file__).parent / "../workspaces" / file_name)
            else:
                return Response('error', status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response('success', status.HTTP_200_OK)
