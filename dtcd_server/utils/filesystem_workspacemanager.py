import os
import uuid
import json

from ..utils.workspacemanager_exception import WorkspaceManagerException
from ..utils import workspacemanager_exception
from ..utils.abc_workspacemanager import AbstractWorkspaceManager
from pathlib import Path
from typing import Optional, List, Dict
from shutil import rmtree


class FilesystemWorkspaceManager(AbstractWorkspaceManager):

    def __init__(self, path, tmp_path):
        self.final_path = path
        self.tmp_path = tmp_path + '/tmp.json'
        self.dir_metafile_name = '.DIR_INFO.json'

    def _validate_dir_name(self, name):
        if '/' in name:
            raise WorkspaceManagerException(workspacemanager_exception.SLASHES_IN_DIR_NAME, name)
        if not name:
            raise WorkspaceManagerException(workspacemanager_exception.EMPTY_DIR_NAME)
        if name == self.dir_metafile_name:
            raise WorkspaceManagerException(workspacemanager_exception.DIR_NAME_RESERVED_FOR_META, name)

    def _get_full_path(self, workspace_path: str) -> Path:
        tokens = workspace_path.split(os.sep)
        for token in tokens[:len(tokens) - 1]:  # security
            if token == '..' or token == '':
                raise WorkspaceManagerException(workspacemanager_exception.PATH_WITH_DOTS, workspace_path)
        if tokens[-1] == '..':
            raise WorkspaceManagerException(workspacemanager_exception.PATH_WITH_DOTS, workspace_path)
        full_path = Path(self.final_path) / workspace_path
        if not full_path.exists():
            raise WorkspaceManagerException(workspacemanager_exception.INVALID_PATH, workspace_path)
        return full_path

    def _get_workspace_list(self, workspace_path) -> List[Dict]:
        full_path = self._get_full_path(workspace_path)
        list_dir_workspaces = os.listdir(full_path)

        workspaces = []
        for file_name in list_dir_workspaces:
            current_path = full_path / file_name
            if current_path.is_dir() or file_name == self.dir_metafile_name:
                continue
            with open(current_path, "r") as file:
                configuration = json.load(file)
                configuration['modification_time'] = os.path.getmtime(current_path)
                workspaces.append(configuration)
        return workspaces

    def _get_directories_list(self, workspace_path) -> List[Dict]:
        full_path = self._get_full_path(workspace_path)
        list_dir_workspaces = os.listdir(full_path)

        directories = []
        for dir_name in list_dir_workspaces:
            current_path = full_path / dir_name
            if current_path.is_dir():
                creation_time = None
                meta_path = current_path / self.dir_metafile_name
                if meta_path.exists():
                    with open(meta_path) as meta_file:
                        creation_time = json.load(meta_file).get("creation_time", None)
                directories.append({
                    'name': dir_name,
                    'creation_time': creation_time,
                    'modification_time': os.path.getmtime(current_path)
                })
        return directories

    def read(self, id, *args, **kwargs):
        workspaces = self._get_workspace_list(kwargs.get('workspace_path', ''))
        try:
            workspace = next(conf for conf in workspaces if conf["id"] == id)
        except StopIteration:
            raise WorkspaceManagerException(workspacemanager_exception.NO_WORKSPACE, id)
        return workspace

    def read_dir(self, dir, *args, **kwargs):
        self._validate_dir_name(dir)
        directories = self._get_directories_list(kwargs.get('workspace_path', ''))
        try:
            directory = next(conf for conf in directories if conf["name"] == dir)
        except StopIteration:
            raise WorkspaceManagerException(workspacemanager_exception.NO_DIR, dir)
        return directory

    def read_all(self, *args, **kwargs):
        workspaces = self._get_workspace_list(kwargs.get('workspace_path', ''))
        return list(map(lambda conf: {
            'id': conf['id'],
            'title': conf['title'],
            'creation_time': conf.get('creation_time', None),
            'modification_time': conf['modification_time']
        }, workspaces))

    def read_all_dir(self, *args, **kwargs):
        return self._get_directories_list(kwargs.get('workspace_path', ''))

    def write(self, conf, *args, **kwargs):
        full_path = self._get_full_path(kwargs.get('workspace_path', ''))
        unique_id = str(uuid.uuid4())
        conf["id"] = unique_id
        with open(self.tmp_path, "w") as file:
            conf["creation_time"] = os.path.getmtime(self.tmp_path)
            file.write(json.dumps(conf))
        os.rename(self.tmp_path, full_path / f"{unique_id}.json")  # atomic operation

    def write_dir(self, conf, *args, **kwargs):
        if 'name' not in conf:
            raise WorkspaceManagerException(workspacemanager_exception.NO_DIR_NAME)
        self._validate_dir_name(conf['name'])
        full_path = self._get_full_path(kwargs.get('workspace_path', ''))
        os.mkdir(full_path / conf['name'])  # atomic operation
        meta_path = full_path / conf['name'] / self.dir_metafile_name
        with open(meta_path, 'w') as meta_file:
            json.dump({'creation_time': os.path.getmtime(meta_path)}, meta_file)

    def update(self, conf, *args, **kwargs):
        full_path = self._get_full_path(kwargs.get('workspace_path', ''))
        if 'id' not in conf:
            raise WorkspaceManagerException(workspacemanager_exception.NO_ID)
        file_list = os.listdir(full_path)
        file_name = f"{conf['id']}.json"
        if file_name in file_list:
            if 'content' not in conf:  # if no content change title
                if 'title' not in conf:
                    raise WorkspaceManagerException(workspacemanager_exception.NO_TITLE)
                with open(full_path / file_name, "r") as file:
                    configuration = json.load(file)
                configuration['title'] = conf['title']
                with open(self.tmp_path, "w") as file:
                    file.write(json.dumps(configuration))
                os.rename(self.tmp_path, full_path / file_name)  # atomic operation
            else:
                with open(self.tmp_path, "w") as file:
                    file.write(json.dumps(conf))
                os.rename(self.tmp_path, full_path / file_name)  # atomic operation
            return conf['id']
        raise WorkspaceManagerException(workspacemanager_exception.NO_WORKSPACE, file_name)

    def update_dir(self, conf, *args, **kwargs):
        full_path = self._get_full_path(kwargs.get('workspace_path', ''))
        if 'old_name' not in conf or not conf['old_name']:
            raise WorkspaceManagerException(workspacemanager_exception.NO_OLD_DIR_NAME)
        if not (full_path / conf['old_name']).exists():
            raise WorkspaceManagerException(workspacemanager_exception.UPD_NOT_EXISTING_DIR, conf['old_name'])
        if ('new_name' not in conf or not conf['new_name']) and 'new_path' not in conf:
            raise WorkspaceManagerException(workspacemanager_exception.NO_NEW_DIR_NAME)
        if 'new_path' not in conf:  # rename
            self._validate_dir_name(conf['new_name'])
            if conf['old_name'] == conf['new_name']:
                raise WorkspaceManagerException(workspacemanager_exception.NEW_NAME_EQ_OLD_NAME, conf['old_name'])
            os.rename(full_path / conf['old_name'], full_path / conf['new_name'])
            return str(full_path / conf['new_name'])
        else:  # move
            if conf['new_path'] == kwargs.get('workspace_path', ''):
                raise WorkspaceManagerException(workspacemanager_exception.NEW_PATH_EQ_OLD_PATH, conf['new_path'])
            new_path = Path(self.final_path) / conf['new_path']
            if not new_path.exists():
                raise WorkspaceManagerException(workspacemanager_exception.INVALID_PATH, new_path)
            if full_path / conf['old_name'] in new_path.parents:
                raise WorkspaceManagerException(workspacemanager_exception.MOVING_DIR_INSIDE_ITSELF, full_path, new_path)
            os.rename(full_path / conf['old_name'], new_path / conf['old_name'])
            return str(new_path / conf['old_name'])

    def remove(self, id, *args, **kwargs):
        full_path = self._get_full_path(kwargs.get('workspace_path', ''))
        file_list = os.listdir(full_path)
        file_name = f"{id}.json"
        if file_name in file_list:
            os.remove(full_path / file_name)
        else:
            raise WorkspaceManagerException(workspacemanager_exception.NO_WORKSPACE, file_name)

    def remove_dir(self, dir, *args, **kwargs):
        self._validate_dir_name(dir)
        full_path = self._get_full_path(kwargs.get('workspace_path', ''))
        file_list = os.listdir(full_path)
        if dir in file_list:
            rmtree(full_path / dir)
        else:
            raise WorkspaceManagerException(workspacemanager_exception.NO_DIR, dir)
