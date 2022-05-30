from rest_framework.urlpatterns import format_suffix_patterns

from .views.log_config import LogsView
from .views.design_objects import DesignObjects
from .views.plugins_list import PluginsList
from .views.graph import (
    FragmentListCreateView, FragmentUpdateDestroyView, Neo4jGraphView)
from .views.workspace import Workspace
from .views.workspace_dir import WorkspaceDir
from .views.page import PageView
from .views.user import UserView
from .views.change_password import ChPassView
from django.urls import re_path
from django.urls import include, path


app_name = 'dtcd_server'
urlpatterns = [
    re_path(r'^get-design-objects/?$', DesignObjects.as_view()),
    re_path(r'^plugins/plugins.json/?$', PluginsList.as_view()),
    path('workspace/object', Workspace.as_view()),
    path('workspace/dir', WorkspaceDir.as_view()),
    path('workspace/object/<path:workspace_path>', Workspace.as_view()),
    path('workspace/dir/<path:workspace_path>', WorkspaceDir.as_view()),
    re_path(r'^logs/object/?$', LogsView.as_view()),
    path('page/<str:pagename>', PageView.as_view()),
    re_path(r'^user/?$', UserView.as_view()),
    re_path(r'^user/change-password?$', ChPassView.as_view()),
    path('graphContent/', include([
        path('fragments/', FragmentListCreateView.as_view(), name='fragments'),
        path('fragments/object/', FragmentUpdateDestroyView.as_view(), name='fragment-detail'),
        path('fragments/object/graph/', Neo4jGraphView.as_view(), name='fragment-graph'),
    ]))
]

urlpatterns = format_suffix_patterns(urlpatterns)
