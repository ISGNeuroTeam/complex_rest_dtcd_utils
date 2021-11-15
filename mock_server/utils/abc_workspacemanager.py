from abc import ABC, abstractmethod


class AbstractWorkspaceManager(ABC):

    @abstractmethod
    def read(self, id):
        pass

    @abstractmethod
    def read_all(self):
        pass

    @abstractmethod
    def write(self, conf):
        pass

    @abstractmethod
    def update(self, conf):
        pass

    @abstractmethod
    def remove(self, id):
        pass