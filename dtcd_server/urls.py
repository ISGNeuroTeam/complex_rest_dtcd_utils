from .views.log_config import LogsView
from .views.design_objects import DesignObjects
from .views.plugins_list import PluginsList
from .views.graph import Neo4jGraph
from .views.workspace import Workspace
from .views.workspace_dir import WorkspaceDir
from .views.page import PageView
from .views.user import UserView
from .views.change_password import ChPassView
from django.urls import re_path
from django.urls import path


app_name = 'dtcd_server'
urlpatterns = [
    re_path(r'^get-design-objects/?$', DesignObjects.as_view()),
    re_path(r'^plugins/plugins.json/?$', PluginsList.as_view()),
    path('workspace/object', Workspace.as_view()),
    path('workspace/dir', WorkspaceDir.as_view()),
    path('workspace/object/<path:workspace_path>', Workspace.as_view()),
    path('workspace/dir/<path:workspace_path>', WorkspaceDir.as_view()),
    re_path(r'^logs/object/?$', LogsView.as_view()),
    re_path(r'^graphContent/object/?$', Neo4jGraph.as_view(), name='graph'),
    path('page/<str:pagename>', PageView.as_view()),
    re_path(r'^user/?$', UserView.as_view()),
    re_path(r'^user/change-password?$', ChPassView.as_view()),
]
