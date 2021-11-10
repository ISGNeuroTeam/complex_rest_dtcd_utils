from abc import ABC, abstractmethod


class AbstractGraphManager(ABC):

    @abstractmethod
    def read(self, id):
        pass

    @abstractmethod
    def read_all(self):
        pass

    @abstractmethod
    def write(self, graph):
        pass

    @abstractmethod
    def update(self, graph):
        pass

    @abstractmethod
    def remove(self, id):
        pass
