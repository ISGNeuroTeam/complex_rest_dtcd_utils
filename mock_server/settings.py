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

if not os.path.isdir(Path(__file__).parent / "graphs"):
    os.mkdir(Path(__file__).parent / "graphs")

# configure your own database if you need
# DATABASE = {
#         "ENGINE": 'django.db.backends.postgresql',
#         "NAME": ini_config['db_conf']['database'],
#         "USER": ini_config['db_conf']['user'],
#         "PASSWORD": ini_config['db_conf']['password'],
#         "HOST": ini_config['db_conf']['host'],
#         "PORT": ini_config['db_conf']['port']
# }