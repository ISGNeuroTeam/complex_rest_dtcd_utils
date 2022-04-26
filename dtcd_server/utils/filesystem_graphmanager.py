import os
import shutil
import uuid
import json

from ..utils.graphmanager_exception import GraphManagerException
from ..utils import graphmanager_exception
from ..utils.abc_graphmanager import AbstractGraphManager
from pathlib import Path


class FilesystemGraphManager(AbstractGraphManager):

    def __init__(self, path, tmp_path, map_path):  # or better import it from settings here?
        self.final_path = path
        self.tmp_path = tmp_path + '/tmp.graphml'
        self.map_path = map_path + '/graph_map.json'  # not empty, at least {}
        if not os.path.isfile(self.map_path):
            with open(self.map_path, 'w') as map_file:
                map_file.write('{}')
        self.map_backup_path = map_path + '/graph_backup.json'
        self.map_tmp_path = map_path + '/graph_tmp.json'
        self.default_filename = 'graph.graphml'

    def read(self, id):
        graph_data = {}
        try:
            with open(Path(self.final_path) / id / self.default_filename, 'r') as graph:
                graph_data['content'] = graph.read()
            shutil.copyfile(self.map_path, self.map_backup_path)
            with open(self.map_path, 'r') as map_file:
                id_map = json.load(map_file)
                graph_data['name'] = id_map[id]['name']
            return graph_data
        except OSError:
            raise GraphManagerException(graphmanager_exception.NO_GRAPH, id)

    def read_all(self):
        graph_list = []
        with open(self.map_path, 'r') as map_file:
            id_map = json.load(map_file)
            for k, v in id_map.items():
                graph_list.append({'id': k, 'name': v['name']})
        return graph_list

    def write(self, graph):
        shutil.copyfile(self.map_path, self.map_backup_path)
        with open(self.map_path, 'r') as map_file:
            id_map = json.load(map_file)
            name = graph["name"]
            for _, v in id_map.items():
                if v['name'] == name:
                    raise GraphManagerException(graphmanager_exception.NAME_EXISTS, name)
        unique_id = str(uuid.uuid4())
        id_map[unique_id] = {'name': graph["name"]}
        with open(self.map_tmp_path, 'w') as map_tmp_file:
            json.dump(id_map, map_tmp_file)
        os.rename(self.map_tmp_path, self.map_path)  # atomic operation
        with open(self.tmp_path, 'w') as file:
            file.write(graph["content"])
        graph_dir = Path(self.final_path) / unique_id
        os.mkdir(graph_dir)
        os.rename(self.tmp_path, Path(graph_dir / self.default_filename))  # atomic operation

    def update(self, graph):
        if 'id' not in graph:
            raise GraphManagerException(graphmanager_exception.NO_ID)
        if 'name' in graph:
            shutil.copyfile(self.map_path, self.map_backup_path)
            with open(self.map_path, 'r') as map_file:
                id_map = json.load(map_file)
                name = graph["name"]
                for k, v in id_map.items():
                    if v['name'] == name and k != graph['id']:
                        raise GraphManagerException(graphmanager_exception.NAME_EXISTS, name)
            try:
                id_map[graph['id']]['name'] = name
            except KeyError:
                raise GraphManagerException(graphmanager_exception.NO_GRAPH, graph['id'])
            with open(self.map_tmp_path, 'w') as map_tmp_file:
                json.dump(id_map, map_tmp_file)
            os.rename(self.map_tmp_path, self.map_path)  # atomic operation
        if 'content' in graph:
            graph_dir = Path(self.final_path) / graph['id']
            if not os.path.isdir(graph_dir):
                raise GraphManagerException(graphmanager_exception.NO_GRAPH, graph['id'])
            with open(self.tmp_path, 'w') as file:
                file.write(graph["content"])
            os.rename(self.tmp_path, Path(graph_dir) / self.default_filename)  # atomic operation

    def remove(self, id):
        graph_dir = Path(self.final_path) / id
        if not os.path.isdir(graph_dir):
            raise GraphManagerException(graphmanager_exception.NO_GRAPH, id)
        shutil.rmtree(Path(self.final_path) / id)  # delete directory and it's content
        shutil.copyfile(self.map_path, self.map_backup_path)
        with open(self.map_path, 'r') as map_file:
            id_map = json.load(map_file)
        del id_map[id]
        with open(self.map_tmp_path, 'w') as map_tmp_file:
            json.dump(id_map, map_tmp_file)
        os.rename(self.map_tmp_path, self.map_path)  # atomic operation
