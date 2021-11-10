import os
import shutil
import uuid
import json

from ..utils.abc_graphmanager import AbstractGraphManager
from pathlib import Path


class FilesystemGraphManager(AbstractGraphManager):

    def __init__(self, path, tmp_path, map_path):  # or better import it from settings here?
        self.final_path = path
        self.tmp_path = tmp_path + '/tmp.graphml'
        self.map_path = map_path + '/map.json'  # not empty, at least {}
        self.map_backup_path = map_path + '/backup.json'
        self.map_tmp_path = map_path + '/tmp.json'
        self.default_filename = 'graph.graphml'

    def read(self, id):
        with open(Path(self.final_path) / id / self.default_filename, 'r') as graph:
            return graph.read()

    def read_all(self):
        graph_list = []
        with open(self.map_path, 'r') as map_file:
            id_map = json.load(map_file)
            for k, v in id_map.items():
                graph_list.append({'id': k, 'name': v['name']})
        return graph_list

    def write(self, graph) -> bool:
        shutil.copyfile(self.map_path, self.map_backup_path)
        with open(self.map_path, 'r') as map_file:
            id_map = json.load(map_file)
            name = graph["name"]
            for _, v in id_map.items():
                if v['name'] == name:
                    return False
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
        return True

    def update(self, graph) -> bool:
        if 'id' not in graph:
            return False
        if 'name' in graph:
            shutil.copyfile(self.map_path, self.map_backup_path)
            with open(self.map_path, 'r') as map_file:
                id_map = json.load(map_file)
                name = graph["name"]
                for k, v in id_map.items():
                    if v['name'] == name and k != graph['id']:
                        return False
            try:
                id_map[graph['id']]['name'] = name
            except KeyError:
                return False
            with open(self.map_tmp_path, 'w') as map_tmp_file:
                json.dump(id_map, map_tmp_file)
            os.rename(self.map_tmp_path, self.map_path)  # atomic operation
        if 'content' in graph:
            graph_dir = Path(self.final_path) / graph['id']
            if not os.path.isdir(graph_dir):
                return False
            with open(self.tmp_path, 'w') as file:
                file.write(graph["content"])
            os.rename(self.tmp_path, Path(graph_dir) / self.default_filename)  # atomic operation
        return True

    def remove(self, id) -> bool:
        graph_dir = Path(self.final_path) / id
        if not os.path.isdir(graph_dir):
            return False
        shutil.rmtree(Path(self.final_path) / id)  # delete directory and it's content
        shutil.copyfile(self.map_path, self.map_backup_path)
        with open(self.map_path, 'r') as map_file:
            id_map = json.load(map_file)
        del id_map[id]
        with open(self.map_tmp_path, 'w') as map_tmp_file:
            json.dump(id_map, map_tmp_file)
        os.rename(self.map_tmp_path, self.map_path)  # atomic operation
        return True
