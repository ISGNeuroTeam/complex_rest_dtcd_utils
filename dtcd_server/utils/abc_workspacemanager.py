from abc import ABC, abstractmethod


class AbstractWorkspaceManager(ABC):

    @abstractmethod
    def read(self, id, *args, **kwargs):
        pass

    @abstractmethod
    def read_all(self, *args, **kwargs):
        pass

    @abstractmethod
    def write(self, conf, *args, **kwargs):
        pass

    @abstractmethod
    def update(self, conf, *args, **kwargs):
        pass

    @abstractmethod
    def remove(self, id, *args, **kwargs):
        pass