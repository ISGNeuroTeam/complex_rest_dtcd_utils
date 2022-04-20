from typing import Mapping

# from neotools.serializers import RecursiveSerializer  # TODO
from py2neo import Relationship, Subgraph

from mock_server.settings import SCHEMA


# FIXME replace with RecursiveSerializer
class RecursiveSerializerStub:
    def __init__(self, subgraph=None, config=None) -> None:
        self._c = config
        raise NotImplementedError

    def load():
        raise NotImplementedError

    def dump():
        raise NotImplementedError


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

        nodes = []
        relationships = []
        id2root = {}
        serializer = RecursiveSerializerStub(config=self._c)

        # create nodes, deal with corresp. attributes
        for node_dict in data[self._c["keys"]["nodes"]]:
            # (recursively) construct root node and its (nested) properties
            tree = serializer.load(node_dict)

            # save nodes & rels created
            nodes.extend(tree.subgraph.nodes)
            relationships.extend(tree.subgraph.relationships)

            root = tree.root
            root.add_label(self._c["labels"]["root"])

            node_id = root[self._c["keys"]["yfiles_id"]]
            id2root[node_id] = root

        # create relationships using instantiated unbound nodes
        for rel_dict in data[self._c["keys"]["edges"]]:
            properties: dict = rel_dict

            # TODO what happens if src / tgt node ids are not in nodes?
            src_node = id2root[properties.pop(self._c["keys"]["source_node"])]
            tgt_node = id2root[properties.pop(self._c["keys"]["target_node"])]

            relationships.append(
                Relationship(src_node, self._c["types"]["edge"], tgt_node, **properties)
            )

        return Subgraph(nodes, relationships)

    def dump(self, subgraph: Subgraph) -> dict:
        """Dump the subgraph to a dictionary.

        See See `docs/Format.md` for exchange format specification.
        """

        # TODO subgraphs of incorrect format (missing VERTEX nodes / EDGE rels)

        roots = list(
            node for node in subgraph.nodes if node.has_label(self._c["labels"]["root"])
        )
        serializer = RecursiveSerializerStub(subgraph=subgraph, config=self._c)
        nodes = [serializer.dump(root) for root in roots]

        rels = set(
            r
            for r in subgraph.relationships
            if type(r).__name__ == self._c["types"]["edge"]
        )
        edges = list(map(self._dump_relationship, rels))

        result = {
            self._c["keys"]["nodes"]: nodes,
            self._c["keys"]["edges"]: edges,
        }

        return result

    def _dump_relationship(self, relationship: Relationship) -> dict:
        result = dict(relationship)

        # save src & tgt node IDs
        result[self._c["keys"]["source_node"]] = relationship.start_node[
            self._c["keys"]["yfiles_id"]
        ]
        result[self._c["keys"]["target_node"]] = relationship.end_node[
            self._c["keys"]["yfiles_id"]
        ]

        return result
