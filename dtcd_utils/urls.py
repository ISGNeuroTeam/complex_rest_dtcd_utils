from django.urls import path, re_path

from .views.change_password import ChPassView
from .views.design_objects import DesignObjects
from .views.log_config import LogsView
from .views.page import PageView
from .views.plugins_list import PluginsList
from .views.user import UserView
from .views.primitives import PrimitivesView


app_name = 'dtcd_utils'
urlpatterns = [
    re_path(r'^get-design-objects/?$', DesignObjects.as_view()),
    re_path(r'^plugins/plugins.json/?$', PluginsList.as_view()),
    re_path(r'^logs/object/?$', LogsView.as_view()),
    path('page/<str:pagename>', PageView.as_view()),
    re_path(r'^user/?$', UserView.as_view()),
    re_path(r'^user/change-password/?$', ChPassView.as_view()),
    re_path(r'^custom-primitive-templates/?$', PrimitivesView.as_view())
]
