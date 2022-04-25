import configparser
import os
from pathlib import Path
from neotools.serializers import DEFAULTS
from core.settings.ini_config import merge_ini_config_with_defaults, merge_dicts

__author__ = "Ilia Sagaidak"
__copyright__ = "Copyright 2021, ISG Neuro"
__credits__ = []
__license__ = ""
__version__ = "0.1.0"
__maintainer__ = "Ilia Sagaidak"
__email__ = "isagaidak@isgneuro.com"
__status__ = "Dev"


PROJECT_DIR = Path(__file__).parent

default_ini_config = {
    'logging': {
        'level': 'INFO'
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
        'use_db': False
    }
}

# main config
config_parser = configparser.ConfigParser()
config_parser.read(PROJECT_DIR / 'mock_server.conf')
# FIXME option false in config gets converted from 'false' to True
ini_config = merge_ini_config_with_defaults(config_parser, default_ini_config)

# service dirs
if not os.path.isdir(PROJECT_DIR / "plugins"):
    os.mkdir(PROJECT_DIR / "plugins")

if not os.path.isdir(PROJECT_DIR / "public"):
    os.mkdir(PROJECT_DIR / "public")

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

# neo4j config
NEO4J = ini_config['neo4j']

# settings for custom data design
# TODO configs for serialization and exchange schemas
serialization_conf = configparser.ConfigParser()
serialization_conf.read(PROJECT_DIR / 'serialization.conf')
serialization_conf = {
    section: dict(serialization_conf.items(section))
    for section in serialization_conf.sections()}
SERIALIZATION_SCHEMA = merge_dicts(
    serialization_conf, DEFAULTS)

exchange_conf = configparser.ConfigParser()
exchange_conf.read(PROJECT_DIR / 'exchange.conf')
EXCHANGE_SCHEMA = {
    section: dict(exchange_conf.items(section))
    for section in exchange_conf.sections()}

SCHEMA = merge_dicts(SERIALIZATION_SCHEMA, EXCHANGE_SCHEMA)
