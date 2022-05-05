import py2neo
from py2neo import *


class FixedNode(Node):

    def __hash__(self):
        if self.graph and self.identity is not None:
            return hash(self.graph.service) ^ hash(self.graph.name) ^ hash(self.identity)
        else:
            return hash(id(self))


Node = FixedNode
py2neo.data.Node = FixedNode
