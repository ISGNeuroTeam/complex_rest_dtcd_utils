"""
Helper module with custom Cypher clauses.

Object-based functionality of py2neo is limited, so we need to use raw
queries to do stuff on custom structures. Queries can get big and
complicated quickly; we also re-use some of them in different places.
This module is a collection of such queries.
"""

from py2neo.cypher import cypher_join

from ..settings import SCHEMA


KEYS = SCHEMA["keys"]
LABELS = SCHEMA["labels"]
TYPES = SCHEMA["types"]
t = "|".join((TYPES["has_attribute"], TYPES["contains_item"]))  # TODO rename

# TODO table-driven methods?
# TODO replace hard-coded labels & properties
# TODO explain what each claose is used for
# TODO documentation? what variables you get? templates?
MATCH_ALL_FRAGMENTS, _ = cypher_join(
    'MATCH (fragment:{})'.format(LABELS["fragment"]),
)

MATCH_FRAGMENT, _ = cypher_join(
    MATCH_ALL_FRAGMENTS,
    'WHERE id(fragment) = $id',
)

MATCH_ENTITIES, _ = cypher_join(
    f'MATCH (fragment) -[:{TYPES["contains_entity"]}]-> (entity:{LABELS["entity"]})',
)

MATCH_DATA, _ = cypher_join(
    f'OPTIONAL MATCH p = (entity) -[:{TYPES["has_data"]}]-> (:{LABELS["data"]})',
    f'-[:{t}*0..]-> (descendant)',
)

MATCH_CONTENT, _ = cypher_join(
    MATCH_ENTITIES,
    MATCH_DATA,
)

MATCH_FRAGMENT_CONTENT, _ = cypher_join(
    MATCH_FRAGMENT,
    MATCH_CONTENT,
)

RETURN_NODES, _ = cypher_join(
    'UNWIND nodes(p) AS n',
    'RETURN DISTINCT n',
)

_FINAL = ", ".join([
    'id(startNode(r)) AS start_id',
    'id(endNode(r)) AS end_id',
    'type(r) AS `type`',
    'properties(r) AS `properties`',
])

RETURN_RELATIONSHIPS, _ = cypher_join(
    'UNWIND relationships(p) AS r',
    'WITH DISTINCT r AS r',
    'RETURN',
    _FINAL
)

MATCH_FRAGMENT_DESCENDANTS, _ = cypher_join(
    'MATCH (fragment) -[*1..]-> (descendant)',
    'WITH DISTINCT descendant AS descendant',
)

DELETE_DESCENDANT , _ = cypher_join(
    'DETACH DELETE (descendant)',
)

DELETE_FRAGMENT_DESCENDANTS, _ = cypher_join(
    MATCH_FRAGMENT,
    MATCH_FRAGMENT_DESCENDANTS,
    DELETE_DESCENDANT,
)
