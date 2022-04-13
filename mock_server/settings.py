import configparser
import os
from pathlib import Path
from core.settings.ini_config import merge_ini_config_with_defaults

__author__ = "Ilia Sagaidak"
__copyright__ = "Copyright 2021, ISG Neuro"
__credits__ = []
__license__ = ""
__version__ = "0.1.0"
__maintainer__ = "Ilia Sagaidak"
__email__ = "isagaidak@isgneuro.com"
__status__ = "Dev"


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
    },
    'graph': {},
    'workspace': {},
    'neo4j': {
        'uri': 'neo4j://localhost:7687',
        'user': 'neo4j',
        'password': 'password',
        'name': 'neo4j'
    },
    'testing': {
        'through_neo4j': False
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

GRAPH_BASE_PATH = ini_config['graph']['base_path']
GRAPH_TMP_PATH = ini_config['graph']['tmp_path']
GRAPH_ID_NAME_MAP_PATH = ini_config['graph']['id_name_map_path']

if not os.path.isdir(GRAPH_BASE_PATH):
    os.mkdir(Path(GRAPH_BASE_PATH))

if not os.path.isdir(GRAPH_TMP_PATH):
    os.mkdir(Path(GRAPH_TMP_PATH))

if not os.path.isdir(GRAPH_ID_NAME_MAP_PATH):
    os.mkdir(Path(GRAPH_ID_NAME_MAP_PATH))

# workspace configuration

WORKSPACE_BASE_PATH = ini_config['workspace']['base_path']
WORKSPACE_TMP_PATH = ini_config['workspace']['tmp_path']

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

# neo4j config
NEO4J = {
    'uri': ini_config['neo4j']['uri'],
    'user': ini_config['neo4j']['user'],
    'password': ini_config['neo4j']['password'],
    'name': ini_config['neo4j']['name']
}
