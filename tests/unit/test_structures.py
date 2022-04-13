import unittest

from mock_server.utils.structures import Graph


class TestGraph(unittest.TestCase):
    """Tests for custom Graph class."""

    def test_contains(self):
        g = Graph()

        g._out['amy'] = {}  # manually add vertex
        self.assertIn('amy', g)

        v = object()
        g._out[v] = {}  # hashable, comparable obj
        self.assertIn(v, g)

    def test_add_vertex(self):
        g = Graph()
        g.add_vertex('amy')
        self.assertIn('amy', g._out)

        with self.assertRaises(Graph.VertexAlreadyExists):
            g.add_vertex('amy')

        v = object()
        g.add_vertex(v)
        self.assertIn(v, g._out)

    def test_verify(self):
        g = Graph()

        g._out['amy'] = {}
        self.assertIsNone(g._verify('amy'))

        g._in['bob'] = {}
        self.assertIsNone(g._verify('bob'))

        with self.assertRaises(Graph.VertexDoesNotExist):
            g._verify('cloe')

    def test_add_edge(self):
        g = Graph()
        g.add_vertex('amy')
        g.add_vertex('bob')
        g.add_edge('amy', 'bob', 42)

        self.assertEqual(g._out['amy']['bob'], 42)
        self.assertEqual(g._in['bob']['amy'], 42)

        # first vertex missing
        with self.assertRaises(Graph.VertexDoesNotExist):
            g.add_edge('dan', 'bob', 17)

        # second vertex missing
        with self.assertRaises(Graph.VertexDoesNotExist):
            g.add_edge('amy', 'dan', 17)

    def test_get_edge(self):
        g = Graph()
        g.add_vertex('amy')
        g.add_vertex('bob')
        g.add_edge('amy', 'bob', 42)
        e = g.get_edge('amy', 'bob')

        self.assertEqual(e, 42)

        g.add_vertex('sue')
        default = g.get_edge('amy', 'sue', default=100)
        self.assertEqual(default, 100)  # default

        # first vertex missing
        with self.assertRaises(Graph.VertexDoesNotExist):
            g.add_edge('dan', 'bob', 17)

        # second vertex missing
        with self.assertRaises(Graph.VertexDoesNotExist):
            g.add_edge('amy', 'dan', 17)

    def test_incident_vertices(self):
        g = Graph()
        g.add_vertex('amy')
        g.add_vertex('bob')
        g.add_vertex('dan')
        g.add_edge('amy', 'bob', 12)
        g.add_edge('amy', 'dan', 15)
        g.add_edge('bob', 'dan', 7)

        self.assertEqual(
            {'bob', 'dan'}, set(g.incident_vertices('amy')))
        self.assertEqual(
            {'bob', 'amy'}, set(g.incident_vertices('dan', outgoing=False)))

        with self.assertRaises(Graph.VertexDoesNotExist):
            list(g.incident_vertices('cloe'))

    def test_incident_edges(self):
        g = Graph()
        g.add_vertex('amy')
        g.add_vertex('bob')
        g.add_vertex('dan')
        g.add_edge('amy', 'bob', 12)
        g.add_edge('amy', 'dan', 0)
        g.add_edge('bob', 'dan', -5)

        self.assertEqual({12, 0}, set(g.incident_edges('amy')))
        self.assertEqual(
            {0, -5}, set(g.incident_edges('dan', outgoing=False)))

        with self.assertRaises(Graph.VertexDoesNotExist):
            list(g.incident_edges('cloe'))


if __name__ == '__main__':
    unittest.main()
