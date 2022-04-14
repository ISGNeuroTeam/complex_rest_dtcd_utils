- create `Neo4jGraphManager` class
    - read
    - post
    - delete
    - think about initialization params (check **settings stuff)
- finish `Neo4jGraph` view
    - `get`
    - `dump`
    - `delete`
- configuration
    - plugins/ and public/ folders?
    - graph configuration?
- view stub for interaction with graph backend
- required settings for neo4j
- integrate subgraph serializer here?
- tests
- make it follow guidelines
- readme and stuff


# Code

- SubgraphSerializer
    - add verification for format
    - remove hard-coded values into config

- Neo4jGraphManager
    - limits on returned nodes and rels
    - run unit tests

- tests
    - move subgraph init to fixtures in serializers
    - put graph connection check logic in one place