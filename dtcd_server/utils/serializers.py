from typing import Mapping

from neotools.serializers import RecursiveSerializer
from py2neo import Relationship, Subgraph

from ..settings import SCHEMA


class SubgraphSerializer:
    """ADT for data serialization to/from specified exchange formats."""

    def __init__(self, config: Mapping[str, Mapping[str, str]] = SCHEMA) -> None:
        self._c = config
        self._loader = RecursiveSerializer(config=config)

    def _load_data(self, data: dict) -> RecursiveSerializer.Tree:
        """Recursively construct a tree from data."""

        tree = self._loader.load(data)
        tree.root.add_label(self._c["labels"]["data"])

        return tree

    def load(self, data: dict) -> Subgraph:
        """Create a subgraph from data.

        See `docs/Format.md` for exchange format specification.

        The nodes in the created subgraph are unbound.
        See https://py2neo.org/2021.1/data/index.html#py2neo.data.Node.
        """

        nodes, rels = [], []
        serializer = RecursiveSerializer(config=self._c)
        id2node = {}

        # yfiles nodes
        for node_dict in data[self._c["keys"]["nodes"]]:
            # (recursively) construct root node and its (nested) properties
            tree = serializer.load(node_dict)
            tree.root.add_label(self._c["labels"]["node"])
            # save nodes & rels created
            nodes.extend(tree.subgraph.nodes)
            rels.extend(tree.subgraph.relationships)
            # remember the root to link with edges later
            node_id = tree.root[self._c["keys"]["yfiles_id"]]
            id2node[node_id] = tree.root

        # yfiles edges
        for rel_dict in data[self._c["keys"]["edges"]]:
            tree = serializer.load(rel_dict)
            tree.root.add_label(self._c["labels"]["edge"])
            nodes.extend(tree.subgraph.nodes)
            rels.extend(tree.subgraph.relationships)
            # link the edge with src and tgt nodes
            # TODO what happens if src / tgt node ids are not in nodes?
            e = tree.root
            src = id2node[e[self._c["keys"]["source_node"]]]
            tgt = id2node[e[self._c["keys"]["target_node"]]]
            r1 = Relationship(src, self._c["types"]["out"], e)
            r2 = Relationship(e, self._c["types"]["in"], tgt)
            rels.extend((r1, r2))

        return Subgraph(nodes, rels)

    def dump(self, subgraph: Subgraph) -> dict:
        """Dump the subgraph to a dictionary.

        See See `docs/Format.md` for exchange format specification.
        """

        # TODO subgraphs of incorrect format (missing VERTEX nodes / EDGE rels)
        nodes, edges = [], []

        for n in subgraph.nodes:
            if n.has_label(self._c["labels"]["node"]):
                nodes.append(n)
            elif n.has_label(self._c["labels"]["edge"]):
                edges.append(n)

        serializer = RecursiveSerializer(subgraph=subgraph, config=self._c)

        result = {
            self._c["keys"]["nodes"]: [serializer.dump(n) for n in nodes],
            self._c["keys"]["edges"]: [serializer.dump(e) for e in edges],
        }

        return result
