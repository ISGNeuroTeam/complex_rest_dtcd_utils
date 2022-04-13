from copy import deepcopy
from enum import Enum
from operator import itemgetter
from typing import Dict, List, Union

from py2neo import Node, Relationship, Subgraph
from py2neo.cypher import cypher_escape

from .structures import Graph as G  # TODO replace with relative import


class KEY(Enum):
    """Service constants for keys."""

    # TODO comments
    ID = 'primitiveID'  # node property with ID
    KEY = 'key'
    NODES = 'nodes'
    POSITION = 'pos'
    RELATIONSHIPS = 'edges'
    SOURCE_NODE = 'sourceNode'
    TARGET_NODE = 'targetNode'


class LABEL(Enum):
    """Service labels for nodes in Neo4j"""

    ARRAY = '_Array'  # for top-level nodes representing array structure
    ATTRIBUTE = '_Attribute'  # for nodes representing nested attribute
    COMPOSITE = '_Composite'  # for nodes containing nested attribute(s)
    ITEM = '_Item'  # for nodes representing individual items in array struct
    ROOT = '_Root'  # base label for all Y-files nodes


class RELATIONSHIP(Enum):
    """Service types for relationships in Neo4j."""

    EDGE = '_EDGE'  # link between two Y-files nodes
    HAS_ATTRIBUTE = '_HAS_ATTRIBUTE'  # link from entity to an attribute
    HAS_ITEM = '_HAS_ITEM'  # from a top-level Array node to its item


class Loader:
    """
    Helper class for recursive construction of an entity with nested attrs.
    """
    # TODO better docstring

    def __init__(self):
        self._nodes = []
        self._relationships = []
        self._root = None  # root node

    def load(self, node_dict: dict) -> Node:
        """(Recursively) load a node from dictionary.

        Each nested attribute is represented by a separate node
        structure, which depends on the type of attribute.
        We keep track of newly created nodes and relationships.
        """

        # TODO better docstring
        self._nodes.clear()  # clear storage for attr entities
        self._relationships.clear()
        # recursively load the root node, track attr nodes & rels
        self._root = self._load(node_dict)

        return self._root

    def _load(self, node_struct: Union[dict, list]) -> Node:
        # Load and return a node, create and track attr nodes
        #   if necessary.
        # TODO docstring
        # TODO side effects
        # TODO tests?

        if isinstance(node_struct, dict):
            return self._load_dict(node_struct)
        if isinstance(node_struct, list):
            return self._load_list(node_struct)

        raise TypeError('node_struct must be dict or list')

    def _load_dict(self, node_dict: dict) -> Node:
        """Create a node and its tree from the dictionary."""

        node = Node()

        # -- base case: dict with simple (non-nested) values
        # get two sets of keys corresponding to flat and nested values
        # TODO deal with heterogeneous lists / lists of lists
        nested_keys = set(
            key
            for key, val in node_dict.items()
            if self._is_dict_or_list_of_dicts(val)
        )
        flat_keys = set(node_dict) - nested_keys

        # save all flat attributes on node properties
        for key in flat_keys:
            node[key] = node_dict[key]  # FIXME heterogeneous lists

        # -- recursion step
        # create a child node for each nested attribute
        if nested_keys:
            for key in nested_keys:
                child = self._load(node_dict[key])
                child.add_label(LABEL.ATTRIBUTE.value)
                rel = Relationship(
                    node, RELATIONSHIP.HAS_ATTRIBUTE.value, child)
                rel[KEY.KEY.value] = key
                self._relationships.append(rel)

            node.add_label(LABEL.COMPOSITE.value)

        self._nodes.append(node)

        return node

    def _load_list(self, node_list: list) -> Node:
        """Create an array tree from the list of node dictionaries."""

        # pre-condition
        if not all(isinstance(item, dict) for item in node_list):
            raise ValueError('node_list must contain only dicts')

        root = Node(LABEL.ARRAY.value)
        self._nodes.append(root)

        for pos, item in enumerate(node_list):
            child = self._load(item)
            child.add_label(LABEL.ITEM.value)

            rel = Relationship(root, RELATIONSHIP.HAS_ITEM.value, child)
            rel[KEY.POSITION.value] = pos  # save items' pos in original list
            self._relationships.append(rel)

        return root

    @staticmethod
    def _is_dict_or_list_of_dicts(x) -> bool:
        """
        Return True if x is a dict or a list of dicts, False otherwise.
        """
        t = type(x)

        return (t is list and all(isinstance(item, dict) for item in x)) or t is dict

    @property
    def root(self) -> Node:
        """Top-level node node structure."""
        return self._root

    @property
    def tree(self) -> Subgraph:
        """Subgraph with all nodes and relationships."""
        # TODO better way to access these? without reconstruction?
        return Subgraph(self._nodes, self._relationships)


class SubgraphSerializer:
    """
    Helper class for Subgraph import/export to/from specified exchange
    format.
    """

    def __init__(self) -> None:
        self.g = G()

    @staticmethod
    def load(dictionary: dict, fragment: str = None) -> Subgraph:
        """Create a subgraph from the dictionary.

        See `docs/` for exchange format specification.

        Each top-level `ROOT` node gets `fragment` label assigned, if any.

        The nodes in the created subgraph are unbound.
        See https://py2neo.org/2021.1/data/index.html#py2neo.data.Node.
        """

        # TODO docstring
        # TODO refactor

        nodes = []
        relationships: List[Relationship] = []
        id2root: Dict[str, Node] = {}

        # create nodes, deal with corresp. attributes
        for node_dict in dictionary[KEY.NODES.value]:
            # (recursively) construct root node and its (nested) properties
            loader = Loader()
            loader.load(node_dict)

            # save nodes & rels created
            nodes.extend(loader.tree.nodes)
            relationships.extend(loader.tree.relationships)

            root = loader.root
            root.add_label(LABEL.ROOT.value)
            # TODO checks for fragment?
            if fragment:
                root.add_label(cypher_escape(fragment))

            node_id = root[KEY.ID.value]
            id2root[node_id] = root

        # create relationships using instantiated unbound nodes
        for rel_dict in dictionary[KEY.RELATIONSHIPS.value]:
            properties: dict = deepcopy(rel_dict)

            # TODO what happens if src / tgt node ids are not in nodes?
            src_node = id2root[properties.pop(KEY.SOURCE_NODE.value)]
            tgt_node = id2root[properties.pop(KEY.TARGET_NODE.value)]

            relationships.append(
                Relationship(
                    src_node, RELATIONSHIP.EDGE.value, tgt_node, **properties)
            )

        subgraph = Subgraph(nodes, relationships)

        return subgraph

    def dump(self, subgraph: Subgraph) -> dict:
        """Dump the subgraph to a dictionary.

        See See `docs/` for exchange format specification.
        """

        # TODO fragment handling
        # TODO subgraphs of incorrect format (missing VERTEX nodes / EDGE rels)

        # step 0: put everything in a graph structure
        self._initialize(subgraph)

        roots = list(
            node for node in subgraph.nodes
            if node.has_label(LABEL.ROOT.value))
        rels = set(
            r for r in subgraph.relationships
            if type(r).__name__ == RELATIONSHIP.EDGE.value)

        result = {
            KEY.NODES.value: [self._dump_node(root) for root in roots],
            KEY.RELATIONSHIPS.value: list(map(self._dump_relationship, rels))
        }

        return result

    def _initialize(self, subgraph: Subgraph):
        """Create in-memory Graph structure from subgraph."""

        self.g = G()  # re-init

        for node in subgraph.nodes:
            self.g.add_vertex(node)

        for rel in subgraph.relationships:
            start = rel.start_node
            end = rel.end_node
            self.g.add_edge(start, end, rel)

    def _dump_node(self, node: Node) -> Union[dict, list]:
        """Convert a (recursively defined) node to dict or list."""

        if node not in self.g:
            raise KeyError('node does not exist in self.g')

        if node.has_label(LABEL.ARRAY.value):
            return self._dump_to_list(node)
        else:
            return self._dump_to_dict(node)

    def _dump_to_dict(self, node: Node) -> dict:

        # -- base case: simple node
        result = dict(node)  # pack node's flat properties into dict

        # -- recurse
        if node.has_label(LABEL.COMPOSITE.value):
            children: List[Node] = [
                child for child in self.g.incident_vertices(node)
                if child.has_label(LABEL.ATTRIBUTE.value)]

            for child in children:
                child_result = self._dump_node(child)
                # TODO what if the key is already in result dict?
                rel = self.g.get_edge(node, child)
                key = rel[KEY.KEY.value]
                result[key] = child_result

        return result

    def _dump_to_list(self, node: Node) -> list:
        # pre-conditions
        if not node.has_label(LABEL.ARRAY.value):
            raise ValueError('node must be root of an array structure')

        result = []

        relationships: List[Node] = [
            rel for rel in self.g.incident_edges(node)
            if type(rel).__name__ == RELATIONSHIP.HAS_ITEM.value]
        relationships = sorted(
            relationships, key=itemgetter(KEY.POSITION.value))  # restore initial order

        for rel in relationships:
            item = self._dump_to_dict(rel.end_node)
            result.append(item)

        return result

    @staticmethod
    def _dump_relationship(relationship: Relationship) -> dict:
        if type(relationship).__name__ != (RELATIONSHIP.EDGE.value):
            raise ValueError('relationship must be of type EDGE')

        result = dict(relationship)

        # save src & tgt node IDs
        result[KEY.SOURCE_NODE.value] = relationship.start_node[KEY.ID.value]
        result[KEY.TARGET_NODE.value] = relationship.end_node[KEY.ID.value]

        return result
