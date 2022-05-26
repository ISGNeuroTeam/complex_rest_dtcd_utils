"""
Helper module with custom Cypher clauses.

Object-based functionality of py2neo is limited, so we need to use raw
queries to do stuff on custom structures. Queries can get big and
complicated quickly; we also re-use some of them in different places.
This module is a collection of such queries.
"""

from py2neo.cypher import cypher_join


# TODO table-driven methods?
# TODO replace hard-coded labels & properties
# TODO explain what each claose is used for
# TODO documentation? what variables you get? templates?
MATCH_FRAGMENT_DATA, _ = cypher_join(
    'MATCH (fragment:Fragment {name: $name})',
    '-[:CONTAINS_ENTITY]-> (entity:_Entity)',
    'OPTIONAL MATCH p = (entity) -[:HAS_DATA]-> (:_Data)',
    '-[:HAS_ATTRIBUTE|CONTAINS_ITEM*]-> (descendant)',
)
