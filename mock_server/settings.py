import configparser
import os
from pathlib import Path
from core.settings.ini_config import merge_ini_config_with_defaults

default_ini_config = {
    'logging': {
        'level': 'INFO'
    },
    'db_conf': {
        'host': 'localhost',
        'port': '5432',
        'database':  'mock_server',
        'user': 'mock_server',
        'password': 'mock_server'
    }
}

config_parser = configparser.ConfigParser()

config_parser.read(Path(__file__).parent / 'mock_server.conf')

ini_config = merge_ini_config_with_defaults(config_parser, default_ini_config)

if not os.path.isdir(Path(__file__).parent / "plugins"):
    os.mkdir(Path(__file__).parent / "plugins")

if not os.path.isdir(Path(__file__).parent / "public"):
    os.mkdir(Path(__file__).parent / "public")

# graphs configuration

GRAPH_BASE_PATH = os.path.expanduser(config_parser.get('graph', 'base_path'))
GRAPH_TMP_PATH = os.path.expanduser(config_parser.get('graph', 'tmp_path'))
GRAPH_ID_NAME_MAP_PATH = os.path.expanduser(config_parser.get('graph', 'id_name_map_path'))

if not os.path.isdir(GRAPH_BASE_PATH):
    os.mkdir(Path(GRAPH_BASE_PATH))

if not os.path.isdir(GRAPH_TMP_PATH):
    os.mkdir(Path(GRAPH_TMP_PATH))

if not os.path.isdir(GRAPH_ID_NAME_MAP_PATH):
    os.mkdir(Path(GRAPH_ID_NAME_MAP_PATH))

# workspace configuration

WORKSPACE_BASE_PATH = os.path.expanduser(config_parser.get('workspace', 'base_path'))
WORKSPACE_TMP_PATH = os.path.expanduser(config_parser.get('graph', 'tmp_path'))

if not os.path.isdir(WORKSPACE_BASE_PATH):
    os.mkdir(Path(WORKSPACE_BASE_PATH))

if not os.path.isdir(WORKSPACE_TMP_PATH):
    os.mkdir(Path(WORKSPACE_TMP_PATH))

# configure your own database if you need
# DATABASE = {
#         "ENGINE": 'django.db.backends.postgresql',
#         "NAME": ini_config['db_conf']['database'],
#         "USER": ini_config['db_conf']['user'],
#         "PASSWORD": ini_config['db_conf']['password'],
#         "HOST": ini_config['db_conf']['host'],
#         "PORT": ini_config['db_conf']['port']
# }