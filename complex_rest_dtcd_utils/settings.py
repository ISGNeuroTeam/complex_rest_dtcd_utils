import configparser
import json
import os
from pathlib import Path

from core.settings.ini_config import merge_ini_config_with_defaults, merge_dicts


PROJECT_DIR = Path(__file__).parent

default_ini_config = {
    'logging': {
        'level': 'INFO'
    },
    # 'workspace': {},
}

# main config
config_parser = configparser.ConfigParser()
config_parser.read(PROJECT_DIR / 'dtcd_utils.conf')
# FIXME option false in config gets converted from 'false' to True
ini_config = merge_ini_config_with_defaults(config_parser, default_ini_config)

# service dirs
if not os.path.isdir(PROJECT_DIR / "plugins"):
    os.mkdir(PROJECT_DIR / "plugins")

if not os.path.isdir(PROJECT_DIR / "public"):
    os.mkdir(PROJECT_DIR / "public")

# primitives configuration
PRIMITIVES_BASE_PATH = ini_config['primitives']['base_path']
PRIMITIVES_TMP_PATH = ini_config['primitives']['tmp_path']

if not os.path.isdir(PRIMITIVES_BASE_PATH):
    os.mkdir(Path(PRIMITIVES_BASE_PATH))

if not os.path.isdir(PRIMITIVES_TMP_PATH):
    os.mkdir(Path(PRIMITIVES_TMP_PATH))

RAW_PRIMITIVES_BASE_PATH = ini_config['raw_primitives']['base_path']
RAW_PRIMITIVES_JSON_NAME = ini_config['raw_primitives']['json_name']

if not os.path.isdir(RAW_PRIMITIVES_BASE_PATH):
    os.mkdir(Path(RAW_PRIMITIVES_BASE_PATH))

DTCD_LOGS_FILE = ini_config['logging'].get('dtcd_logs_file', 'calc_log.json')
DTCD_LOGS_CONF = ini_config['logging'].get('dtcd_logs_conf', 'log_configuration.json')
