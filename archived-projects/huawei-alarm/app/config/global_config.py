import os.path
from configparser import ConfigParser
from functools import lru_cache

env = os.getenv("env", "")
if env == "prod":
    env_file = "config-prod.ini"
else:
    env_file = "config-dev.ini"


class ConfigSetting:
    """
    读取配置通用类
    """
    def __init__(self, config_file=env_file):
        self._path = os.path.join(os.getcwd(), config_file)
        if not os.path.exists(self._path):
            raise FileNotFoundError("No such file: %s" % config_file)
        self._config = ConfigParser()
        self._config.read(self._path, encoding='utf-8')

    def get(self, section, name, strip_blank=True):
        if section not in self._config or name not in self._config[section]:
            return ""
        res = self._config.get(section, name)
        if strip_blank:
            s = res.strip()
        return res

    def getboolean(self, section, name):
        return self._config.getboolean(section, name)

    def getint(self, section, name):
        return self._config.getint(section, name)


class GlobalConfig:
    CONFIG_SETTING = ConfigSetting()

    # PgSQL配置
    PGSQL_HOST = CONFIG_SETTING.get('pgsql', 'host')
    PGSQL_PORT = CONFIG_SETTING.get('pgsql', 'port')
    PGSQL_DBNAME = CONFIG_SETTING.get('pgsql', 'dbname')
    PGSQL_USER = CONFIG_SETTING.get('pgsql', 'user')
    PGSQL_PASSWD = CONFIG_SETTING.get('pgsql', 'passwd')
    PGSQL_ECHO = CONFIG_SETTING.getboolean('pgsql', 'echo')

    # Robot配置
    ROBOT_APP_ID = CONFIG_SETTING.get('robot', 'app_id')
    ROBOT_APP_SECRET = CONFIG_SETTING.get('robot', 'app_secret')
    TENANT_TOKEN_URL = CONFIG_SETTING.get('robot', 'tenant_token_url')
    CHAT_MESSAGE_URL = CONFIG_SETTING.get('robot', 'chat_message_url')
    CHAT_INFO_URL = CONFIG_SETTING.get('robot', 'chat_info_url')
    GET_USER_ID_URL = CONFIG_SETTING.get('robot', 'get_user_id_url')
    USER_MESSAGE_URL = CONFIG_SETTING.get('robot', 'user_message_url')


@lru_cache()
def get_configs():
    return GlobalConfig()


configs = get_configs()
