from rest.urls import path
from cache import cache_page
from .views.read_html import ReadHTML
from .views.dependence_list import DependenceList
from .views.log_config import LogsView
from .views.design_objects import DesignObjects
from .views.plugins_list import PluginsList
from .views.graph import Graph
from .views.workspace import Workspace
from django.urls import re_path
from django.conf import settings
from django.conf.urls.static import static

# Use cache_page decorator for caching view

# urlpatterns = [
#     path('example/', cache_page(60 * 15)(ExampleView.as_view())),
# ]

urlpatterns = [
    # re_path(r'^get-dependence-list/?$', DependenceList.as_view()),
    re_path(r'^get-design-objects/?$', DesignObjects.as_view()),
    re_path(r'^plugins/plugins.json/?$', PluginsList.as_view()),
    re_path(r'^workspace/object/?$', Workspace.as_view()),   # change id
    re_path(r'^logs/object/?$', LogsView.as_view()),  # logging not ready
    re_path(r'^graphContent/object/?$', Graph.as_view()),  # not checked PUT DELETE
]
