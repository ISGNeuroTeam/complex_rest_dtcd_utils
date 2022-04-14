from py2neo import Node, Relationship


amy = Node('Root', 'Composite', name='amy')
amy['primitiveID'] = 'n1'
city1 = Node('Attribute', city='Lyon')
friends = Node('Attribute', 'Array')
bob = Node('Item', name='bob')
cloe = Node('Item', name='cloe')
dan = Node('Root', 'Composite', name='dan')
dan['primitiveID'] = 'n2'
city2 = Node('Attribute', city='London')

HAS_ATTR = Relationship.type('HAS_ATTRIBUTE')
HAS_ITEM = Relationship.type('HAS_ITEM')
EDGE = Relationship.type('EDGE')

amy_city = HAS_ATTR(amy, city1)
amy_city['key'] = 'address'

amy_friends = HAS_ATTR(amy, friends)
amy_friends['key'] = 'friends'

friends_bob = HAS_ITEM(friends, bob)
friends_bob['pos'] = 0
friends_cloe = HAS_ITEM(friends, cloe)
friends_cloe['pos'] = 1

dan_city = HAS_ATTR(dan, city2)
dan_city['key'] = 'address'

amy_dan = EDGE(amy, dan)

# save the subgraph and some nodes for tests
subgraph = (
    amy_city | amy_friends | friends_bob | friends_cloe
    | amy_dan | dan_city)
