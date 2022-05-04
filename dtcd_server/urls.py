from .views.log_config import LogsView
from .views.design_objects import DesignObjects
from .views.plugins_list import PluginsList
from .views.graph import Neo4jGraph
from .views.workspace import Workspace
from .views.page import PageView
from .views.user import UserView
from .views.change_password import ChPassView
from django.urls import re_path
from django.urls import path

__author__ = "Ilia Sagaidak"
__copyright__ = "Copyright 2021, ISG Neuro"
__credits__ = []
__license__ = ""
__version__ = "0.1.0"
__maintainer__ = "Ilia Sagaidak"
__email__ = "isagaidak@isgneuro.com"
__status__ = "Dev"

app_name = 'dtcd_server'
urlpatterns = [
    re_path(r'^get-design-objects/?$', DesignObjects.as_view()),
    re_path(r'^plugins/plugins.json/?$', PluginsList.as_view()),
    re_path(r'^workspace/object/?$', Workspace.as_view()),
    re_path(r'^logs/object/?$', LogsView.as_view()),
    re_path(r'^graphContent/object/?$', Neo4jGraph.as_view(), name='graph'),
    path('page/<str:pagename>', PageView.as_view()),
    re_path(r'^user/?$', UserView.as_view()),
    re_path(r'^user/change-password?$', ChPassView.as_view()),
]
