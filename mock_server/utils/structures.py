class Graph:
    """Lightweight ADT representing a directed graph."""

    class VertexDoesNotExist(Exception):
        pass

    class VertexAlreadyExists(Exception):
        pass

    def __init__(self):
        self._out = {}
        self._in = {}

    def __contains__(self, vertex):
        """Return True if vertex is in the graph, False otherwise."""
        return vertex in self._out

    def add_vertex(self, vertex):
        """Create a vertex.

        Vertex must be hashable and support comparisons. Raises
        `VertexAlreadyExists` error if vertex is already in the graph.
        """

        if vertex in self._out:
            raise self.VertexAlreadyExists('vertex already exists')

        self._out[vertex] = {}
        self._in[vertex] = {}

    def _verify(self, vertex, msg=''):
        if (vertex not in self._out) and (vertex not in self._in):
            raise self.VertexDoesNotExist(msg)

    def add_edge(self, start, end, edge):
        """Create an edge from start to end vertices.

        Raises `VertexDoesNotExist` error if start or end vertices
        are missing.
        """

        self._verify(start, 'start vertex does not exist')
        self._verify(end, 'end vertex does not exist')

        self._out[start][end] = edge
        self._in[end][start] = edge

    def get_edge(self, start, end, default=None):
        """Return edge between start and end vertices, if any.

        Raises `VertexDoesNotExist` error if start or end vertices
        are missing.
        """

        self._verify(start, 'start vertex does not exist')
        self._verify(end, 'end vertex does not exist')

        return self._out[start].get(end, default)

    def incident_vertices(self, vertex, outgoing=True):
        """Return all (outgoing) neighbors of this vertex.

        Raises `VertexDoesNotExist` error if a vertex is missing.
        """

        self._verify(vertex)

        adjacent = self._out if outgoing else self._in

        for neighbor in adjacent[vertex].keys():
            yield neighbor

    def incident_edges(self, vertex, outgoing=True):
        """Return all (outgoing) edges incident to vertex.

        Raises `VertexDoesNotExist` error if a vertex is missing.
        """

        self._verify(vertex)

        adjacent = self._out if outgoing else self._in

        for edge in adjacent[vertex].values():
            yield edge
