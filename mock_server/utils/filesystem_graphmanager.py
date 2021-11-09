import os
import shutil

from ..utils.abc_graphmanager import AbstractGraphManager
from pathlib import Path


class FilesystemGraphManager(AbstractGraphManager):

    def __init__(self, path, tmp_path):  # or better import it from settings here?
        self.final_path = path
        self.tmp_path = Path(tmp_path) / 'tmp.graphml'
        self.graph_list = [int(num) for num in os.listdir(self.final_path)]
        self.default_filename = 'graph.graphml'

    def read(self, id):
        try:
            pos = self.graph_list.index(id)
        except ValueError:
            raise ValueError
        with open(Path(self.final_path) / str(self.graph_list[pos]) / self.default_filename, 'r') as graph:
            return graph.read()

    def write(self, graph):
        with open(self.tmp_path, 'w') as file:
            file.write(graph["content"])
        if not self.graph_list:
            current_max_id = -1
        else:
            current_max_id = max(self.graph_list)
        graph_dir = Path(self.final_path) / str(current_max_id + 1)
        self.graph_list.append(current_max_id + 1)
        if not os.path.isdir(graph_dir):
            os.mkdir(graph_dir)
        os.rename(self.tmp_path, Path(graph_dir / self.default_filename))  # atomic operation

    def update(self, graph) -> bool:
        try:
            pos = self.graph_list.index(graph['id'])
        except ValueError:
            return False
        with open(self.tmp_path, 'w') as file:
            file.write(graph["content"])
        graph_dir = Path(self.final_path) / str(self.graph_list[pos])
        os.rename(self.tmp_path, Path(graph_dir / self.default_filename))  # atomic operation
        return True

    def remove(self, id) -> bool:
        try:
            pos = self.graph_list.index(id)
        except ValueError:
            return False
        shutil.rmtree(Path(self.final_path) / str(self.graph_list[pos]))  # delete directory and it's content
        self.graph_list.pop(pos)
        return True


