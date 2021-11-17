import os
import uuid
import json

from ..utils.workspacemanager_exception import WorkspaceManagerException
from ..utils import workspacemanager_exception
from ..utils.abc_workspacemanager import AbstractWorkspaceManager
from pathlib import Path


class FilesystemWorkspaceManager(AbstractWorkspaceManager):

    def __init__(self, path, tmp_path):
        self.final_path = path
        self.tmp_path = tmp_path + '/tmp.json'

    def _get_workspace_list(self):
        list_dir_workspaces = os.listdir(self.final_path)
        list_dir_workspaces.remove(".gitkeep")
        if ".DS_Store" in list_dir_workspaces:
            list_dir_workspaces.remove(".DS_Store")

        workspaces = []
        for file_name in list_dir_workspaces:
            with open(Path(self.final_path) / file_name, "r") as file:
                configuration = json.load(file)
                workspaces.append(configuration)
        return workspaces

    def read(self, id):
        workspaces = self._get_workspace_list()
        try:
            workspace = next(conf for conf in workspaces if conf["id"] == id)
        except:
            raise WorkspaceManagerException(workspacemanager_exception.NO_WORKSPACE, id)
        return workspace

    def read_all(self):
        workspaces = self._get_workspace_list()
        return list(map(lambda conf: {'id': conf['id'], 'title': conf['title']}, workspaces))

    def write(self, conf):
        unique_id = str(uuid.uuid4())
        conf["id"] = unique_id
        with open(self.tmp_path, "w") as file:
            file.write(json.dumps(conf))
        os.rename(self.tmp_path, Path(self.final_path) / f"{unique_id}.json")  # atomic operation

    def update(self, conf):
        if 'id' not in conf:
            raise WorkspaceManagerException(workspacemanager_exception.NO_ID)
        file_list = os.listdir(self.final_path)
        file_name = f"{conf['id']}.json"
        if file_name in file_list:
            if 'content' not in conf:  # if no content change title
                if 'title' not in conf:
                    raise WorkspaceManagerException(workspacemanager_exception.NO_ID)
                with open(Path(self.final_path) / file_name, "r") as file:
                    configuration = json.load(file)
                configuration['title'] = conf['title']
                with open(self.tmp_path, "w") as file:
                    file.write(json.dumps(configuration))
                os.rename(self.tmp_path, Path(self.final_path) / file_name)  # atomic operation
            else:
                with open(self.tmp_path, "w") as file:
                    file.write(json.dumps(conf))
                os.rename(self.tmp_path, Path(self.final_path) / file_name)  # atomic operation
            return conf['id']
        raise WorkspaceManagerException(workspacemanager_exception.NO_WORKSPACE, file_name)

    def remove(self, id):
        file_list = os.listdir(self.final_path)
        file_name = f"{id}.json"
        if file_name in file_list:
            os.remove(Path(self.final_path) / file_name)
        else:
            raise WorkspaceManagerException(workspacemanager_exception.NO_WORKSPACE, file_name)
