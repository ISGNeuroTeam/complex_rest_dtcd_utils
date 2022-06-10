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
MATCH_FRAGMENT, _ = cypher_join(
    'MATCH (fragment:{})'.format(LABELS["fragment"]),
    'WHERE id(fragment) = $id',
)

MATCH_ENTITIES, _ = cypher_join(
    f'MATCH (fragment) -[:{TYPES["contains_entity"]}]-> (entity:{LABELS["entity"]})',
)

MATCH_DATA, _ = cypher_join(
    f'OPTIONAL MATCH p = (entity) -[:{TYPES["has_data"]}]-> (:{LABELS["data"]})',
    f'-[:{t}*0..]-> (descendant)',
)

MATCH_FRAGMENT_DATA, _ = cypher_join(
    MATCH_FRAGMENT,
    MATCH_ENTITIES,
    MATCH_DATA,
)

DELETE_FRAGMENT_DESCENDANTS, _ = cypher_join(
    MATCH_FRAGMENT,
    'MATCH (fragment) -[*0..]-> (descendant)',
    'DETACH DELETE (descendant)',
)
