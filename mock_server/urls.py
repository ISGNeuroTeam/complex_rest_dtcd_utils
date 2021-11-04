from rest.urls import path
from cache import cache_page
from .views.read_html import ReadHTML
from .views.dependence_list import DependenceList
from .views.log_config import LogsView
from .views.design_objects import DesignObjects
from .views.plugins_list import PluginsList
from .views.graph import Graph
from .views.graph_list import GraphList
from .views.workspace import Workspace

# Use cache_page decorator for caching view

# urlpatterns = [
#     path('example/', cache_page(60 * 15)(ExampleView.as_view())),
# ]

version = 'v2'

# many urls are deprecated, use urls with 'object/' at the end of url and send different request methods,
# but if required as legacy, uncomment lines in the urlpatterns
# '/graph/list/' is also considered legacy, use 'graphContent/object/' GET without providing id instead

urlpatterns = [
    path('', ReadHTML.as_view()),
    path('get-dependence-list/', DependenceList.as_view()),
    path('get-design-objects/', DesignObjects.as_view()),
    path('plugins/plugins.json/', PluginsList.as_view()),
    path(f'{version}/workspace/object/', Workspace.as_view()),
    path(f'{version}/logs/object/', LogsView.as_view()),
    path(f'{version}/graphContent/object/', Graph.as_view()),
    # path(f'{version}/graph/list/', GraphList.as_view()),
    # path(f'{version}/logs/configuration/', LogsView.as_view()),
    # path(f'{version}/logs/save/', LogsView.as_view()),
    # path(f'{version}/graphContent/save/', Graph.as_view()),
    # path(f'{version}/graphContent/update/', Graph.as_view()),
    # path(f'{version}/graphContent/delete/', Graph.as_view()),
    # path(f'{version}/graphContent/load/', Graph.as_view()),
]
