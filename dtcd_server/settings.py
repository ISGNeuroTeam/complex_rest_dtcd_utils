import configparser
import json
import os
from pathlib import Path
from neotools.serializers import DEFAULTS
from core.settings.ini_config import merge_ini_config_with_defaults, merge_dicts


PROJECT_DIR = Path(__file__).parent

default_ini_config = {
    'logging': {
        'level': 'INFO'
    },
    'graph': {},
    'workspace': {},
    'neo4j': {
        'uri': 'bolt://localhost:7687',
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
config_parser.read(PROJECT_DIR / 'dtcd_server.conf')
# FIXME option false in config gets converted from 'false' to True
ini_config = merge_ini_config_with_defaults(config_parser, default_ini_config)

# service dirs
if not os.path.isdir(PROJECT_DIR / "plugins"):
    os.mkdir(PROJECT_DIR / "plugins")

if not os.path.isdir(PROJECT_DIR / "public"):
    os.mkdir(PROJECT_DIR / "public")

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
with open(PROJECT_DIR / 'serialization.json') as f:
    serialization_conf = json.load(f)
SERIALIZATION_SCHEMA = merge_dicts(serialization_conf, DEFAULTS)

with open(PROJECT_DIR / 'exchange.json') as f:
    exchange_conf = json.load(f)
EXCHANGE_SCHEMA = exchange_conf

SCHEMA = merge_dicts(SERIALIZATION_SCHEMA, EXCHANGE_SCHEMA)
