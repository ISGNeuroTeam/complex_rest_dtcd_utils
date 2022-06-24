from django.urls import path, re_path

from .views.change_password import ChPassView
from .views.design_objects import DesignObjects
from .views.graph import (
    RootGraphView, FragmentListView, FragmentDetailView, FragmentGraphView, ResetNeo4j
)
from .views.log_config import LogsView
from .views.page import PageView
from .views.plugins_list import PluginsList
from .views.user import UserView
from .views.workspace import Workspace
from .views.workspace_dir import WorkspaceDir


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
    path('fragments', FragmentListView.as_view(), name='fragments'),
    path('fragments/<int:pk>', FragmentDetailView.as_view(), name='fragment-detail'),
    path('fragments/<int:pk>/graph', FragmentGraphView.as_view(), name='fragment-graph'),
    path('fragments/root/graph', RootGraphView.as_view(), name='root-graph'),
    path('reset', ResetNeo4j.as_view(), name='reset'),
]