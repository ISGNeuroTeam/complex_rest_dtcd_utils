# Graph data format for communication between Neo4j and Y-files

The (sub)graph is represented using JSON with the following structure:

```
{
    "nodes": [node, node, ...],
    "edges": [edge, edge, ...]
}
```

## Nodes

Top-level `nodes` key corresponds to an *array* of objects, each representing a particular node.

Each object is a *mapping* that may contain variable amount of keys and values of arbitrary nesting. Every node object **must** have a `primitiveID` key with unique ID.

Example of a valid node object

```json
{
    "primitiveID": "n1",
    "primitiveName": "name",
    "extensionName": "extension",
    "nodeTitle": "title",
    "properties": {
        "custom_field": {"attribute": "value"}
    },
    "ports": [
        {
            "primitiveID": "p1",
            "primitiveName": "port_name",
            "type": "port_type",
            "properties": {"property": "value"}
        }
    ]
}
```

## Edges

`edges` is an array of objects which represent edges. 

- Each object is a *flat mapping*: it can contain a variable amount of keys, but the values must be **non-nested**.
- Every edge object **must** have `sourceNode` and `targetNode` keys corresponding to valid node object IDs.

Example of a valid edge object

```json
{
    "sourceNode": "n1",
    "targetNode": "n2",
    "sourcePort": "p1",
    "targetPort": "p3",
    "extensionName": "extension"
}
```

## Requirements

- All arrays must be *homogeneous*: contain members of the same type.
- Allowed types for array members: *numeric, bool, string, object*.