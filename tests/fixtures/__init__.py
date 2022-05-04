from operator import itemgetter

from py2neo import Node, Relationship


def sort_payload(data: dict) -> None:
    """Sort payload dict according to spec in-place."""

    nodes = data["nodes"]

    for node in nodes:
        if 'initPorts' in node:
            node["initPorts"] = sorted(node["initPorts"], key=itemgetter("primitiveID"))

    data["nodes"] = sorted(nodes, key=itemgetter("primitiveID"))
    data["edges"] = sorted(data["edges"], key=itemgetter(
        "sourceNode", "sourcePort", "targetNode", "targetPort"))


def generate_dummy():
    # TODO replace hard-coded values with those from DEFAULT config
    HAS_ATTR = Relationship.type('HAS_ATTRIBUTE')
    CONTAINS_ITEM = Relationship.type('CONTAINS_ITEM')
    EDGE = Relationship.type('EDGE')

    amy = Node('Root', 'Composite', name='amy')
    amy['primitiveID'] = 'n1'

    city1 = Node('Attribute', city='Lyon')
    amy_city = HAS_ATTR(amy, city1)
    amy_city['key'] = 'address'

    friends = Node('Attribute', 'Array')
    bob = Node('Item', name='bob')
    cloe = Node('Item', name='cloe')
    friends_bob = CONTAINS_ITEM(friends, bob)
    friends_bob['pos'] = 0
    friends_cloe = CONTAINS_ITEM(friends, cloe)
    friends_cloe['pos'] = 1
    amy_friends = HAS_ATTR(amy, friends)
    amy_friends['key'] = 'friends'

    dan = Node('Root', 'Composite', name='dan')
    dan['primitiveID'] = 'n2'
    city2 = Node('Attribute', city='London')
    dan_city = HAS_ATTR(dan, city2)
    dan_city['key'] = 'address'

    amy_dan = EDGE(amy, dan)

    subgraph = (
        amy_city | amy_friends | friends_bob | friends_cloe
        | amy_dan | dan_city)

    return {
        'subgraph': subgraph,
        'amy_friends': amy_friends,
        'dan_city': dan_city,
    }


def generate_data():
    data = {
        'nodes': [
            {"primitiveID": "n1", "layout": {"x": 0, "y": 0}},
            {"primitiveID": "n2", "initPorts": [{'primitiveID': 'p3'}]},
            {"primitiveID": "n3"},
            {"primitiveID": "n4"},
        ],
        'edges': [
            {
                "sourceNode": "n1", "sourcePort": "p1",
                "targetNode": "n2", "targetPort": "p3"
            },
            {
                "sourceNode": "n1", "sourcePort": "p2",
                "targetNode": "n3", "targetPort": "p4"
            },
            {

                "sourceNode": "n3", "sourcePort": "p5",
                "targetNode": "n4", "targetPort": "p6"
            },
        ]
    }

    n1 = Node('Node', '_Composite', primitiveID="n1")
    attr = Node('_Attribute', x=0, y=0)
    n1_has_attr = Relationship(n1, 'HAS_ATTRIBUTE', attr, _key='layout')
    n2 = Node('Node', '_Composite', primitiveID="n2")
    ports = Node('_Array', '_Attribute')
    item0 = Node('_Item', primitiveID='p3')
    ports_contains_item0 = Relationship(ports, 'CONTAINS_ITEM', item0, _pos=0)
    n2_has_ports = Relationship(n2, 'HAS_ATTRIBUTE', ports, _key='initPorts')
    n3 = Node('Node', primitiveID="n3")
    n4 = Node('Node', primitiveID="n4")
    n1_n2 = Node('Edge', sourceNode='n1', targetNode='n2', sourcePort="p1", targetPort="p3")
    n1_n3 = Node('Edge', sourceNode='n1', targetNode='n3', sourcePort="p2", targetPort="p4")
    n3_n4 = Node('Edge', sourceNode='n3', targetNode='n4',  sourcePort="p5", targetPort="p6")
    subgraph = (
        n1_has_attr
        | ports_contains_item0
        | n2_has_ports
        | n3
        | n4
        | n1_n2
        | n1_n3
        | n3_n4)

    return {'data': data, 'subgraph': subgraph}
