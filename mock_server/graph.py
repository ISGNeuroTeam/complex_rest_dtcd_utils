from abc import abstractmethod
from pathlib import Path


class AbstractGraph:

    @abstractmethod
    def write(self):
        pass

    @abstractmethod
    def read(self):
        pass


class FileSystemGraph(AbstractGraph):

    def __init__(self, _path):
        self.final_path = _path
        self.temp_path = Path("temp")
        pass

    def write(self):
        pass

    def read(self):
        pass