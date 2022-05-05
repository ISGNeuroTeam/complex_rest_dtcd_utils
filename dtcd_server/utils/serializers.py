from typing import Mapping

from neotools.serializers import RecursiveSerializer
from py2neo_fixed import Subgraph

from ..settings import SCHEMA


class SubgraphSerializer:
    """ADT for data serialization to/from specified exchange formats."""

    def __init__(self, config: Mapping[str, Mapping[str, str]] = SCHEMA) -> None:
        self._c = config

    def load(self, data: dict) -> Subgraph:
        """Create a subgraph from data.

        See `docs/Format.md` for exchange format specification.

        The nodes in the created subgraph are unbound.
        See https://py2neo.org/2021.1/data/index.html#py2neo.data.Node.
        """

        subgraph = Subgraph()
        serializer = RecursiveSerializer(config=self._c)

        # yfiles nodes
        for node_dict in data[self._c["keys"]["nodes"]]:
            # (recursively) construct root node and its (nested) properties
            tree = serializer.load(node_dict)
            tree.root.add_label(self._c["labels"]["node"])
            # save nodes & rels created
            subgraph |= tree.subgraph

        # yfiles edges
        for rel_dict in data[self._c["keys"]["edges"]]:
            tree = serializer.load(rel_dict)
            tree.root.add_label(self._c["labels"]["edge"])
            subgraph |= tree.subgraph

        return subgraph

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
