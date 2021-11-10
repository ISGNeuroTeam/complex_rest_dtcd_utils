from rest.urls import path
from cache import cache_page
from .views.read_html import ReadHTML
from .views.dependence_list import DependenceList
from .views.log_config import LogsView
from .views.design_objects import DesignObjects
from .views.plugins_list import PluginsList
from .views.graph import Graph
from .views.workspace import Workspace

# Use cache_page decorator for caching view

# urlpatterns = [
#     path('example/', cache_page(60 * 15)(ExampleView.as_view())),
# ]

urlpatterns = [
    path('', ReadHTML.as_view()),
    path('get-dependence-list/', DependenceList.as_view()),
    path('get-design-objects/', DesignObjects.as_view()),
    path('plugins/plugins.json/', PluginsList.as_view()),
    path('workspace/object/', Workspace.as_view()),
    path('logs/object/', LogsView.as_view()),
    path('graphContent/object/', Graph.as_view()),
]
