function _classPrivateFieldGet(receiver, privateMap) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "get");

  return _classApplyDescriptorGet(receiver, descriptor);
}

function _classPrivateFieldSet(receiver, privateMap, value) {
  var descriptor = _classExtractFieldDescriptor(receiver, privateMap, "set");

  _classApplyDescriptorSet(receiver, descriptor, value);

  return value;
}

function _classExtractFieldDescriptor(receiver, privateMap, action) {
  if (!privateMap.has(receiver)) {
    throw new TypeError("attempted to " + action + " private field on non-instance");
  }

  return privateMap.get(receiver);
}

function _classApplyDescriptorGet(receiver, descriptor) {
  if (descriptor.get) {
    return descriptor.get.call(receiver);
  }

  return descriptor.value;
}

function _classApplyDescriptorSet(receiver, descriptor, value) {
  if (descriptor.set) {
    descriptor.set.call(receiver, value);
  } else {
    if (!descriptor.writable) {
      throw new TypeError("attempted to set read only private field");
    }

    descriptor.value = value;
  }
}

function _classPrivateMethodGet(receiver, privateSet, fn) {
  if (!privateSet.has(receiver)) {
    throw new TypeError("attempted to get private field on non-instance");
  }

  return fn;
}

/**
 * @typedef {Object} PluginMeta
 * @property {String} title
 * @property {String} name
 * @property {String[]} actions
 * @property {String[]} events
 * @property {String[]} requirements
 */
class AbstractPlugin {
  /**
   * Static method of AbstractPlugin class which need to reload!
   * @static
   * @returns {PluginMeta}
   * @return {String} meta.title
   * @return {String} meta.name
   * @return {String[]} meta.actions
   * @return {String[]} meta.events
   * @return {String[]} meta.dependencies
   */
  static getRegistrationMeta() {
    throw new Error('Implement the getRegistrationMeta static method!');
  }
  /**
   * Getting module from dependencies
   * @method
   * @param {String} name
   * @returns {Object[]}
   */


  getDependence(name) {
    return Application.getDependence(name);
  }
  /**
   * Getting all extensions for plugin by name
   * @method
   * @param {String} name
   * @return {Object[]}
   */


  getExtensions(name) {
    return Application.getExtensions(name);
  }
  /**
   * Getting list of all awailable panels
   * @method
   * @return {Object[]}
   */


  getPanels() {
    return Application.getPanels();
  }
  /**
   * Getting system by name
   * @method
   * @param {String} name
   * @return {Object}
   */


  getSystem(name) {
    return Application.getSystem(name);
  }
  /**
   * Installing plugin by name
   * @method
   * @param {String} name
   */


  installPlugin(name, ...args) {
    return Application.installPlugin(name, ...args);
  }
  /**
   * Uninstall plugin from Application by instance
   * @method
   * @param {Object} instance
   * @returns {Boolean}
   */


  uninstallPluginByInstance(instance) {
    return Application.uninstallPluginByInstance(instance);
  }
  /**
   * Uninstall plugin from Application by unique identifier
   * @method
   * @param {String} guid Unique identifier of the instance to be uninstalled
   * @returns {Boolean}
   */


  uninstallPluginByGUID(guid) {
    return Application.uninstallPluginByGUID(guid);
  }
  /**
   * Getting instance by guid
   * @method
   * @param {String} guid
   * @returns {Object}
   */


  getInstance(guid) {
    this.instance.getInstance(guid);
    return this.instance.getInstance(guid);
  }

}

class SystemPlugin extends AbstractPlugin {}

function sizeof(v) {
  let f = sizeof,
      o = {
    undefined: () => 0,
    boolean: () => 4,
    number: () => 8,
    string: i => 2 * i.length,
    object: i => !i ? 0 : Object.keys(i).reduce((t, k) => f(k) + f(i[k]) + t, 0)
  };
  return o[typeof v](v);
}

var _guid = new WeakMap();

var _logLevels = new WeakMap();

var _logs = new WeakMap();

var _config = new WeakMap();

var _globalLogLevel = new WeakMap();

var _bufferSize = new WeakMap();

var _intervalSeconds = new WeakMap();

var _intervalID = new WeakMap();

var _consoleOutputMode = new WeakMap();

var _createTimeInterval = new WeakSet();

var _log = new WeakSet();

var _uploadLogs = new WeakSet();

var _getConfig = new WeakSet();

var _saveConfig = new WeakSet();

var _checkLogLevel = new WeakSet();

var _getFunctionCaller = new WeakSet();

class LogSystem extends SystemPlugin {
  /**
   * @constructor
   * @param {String} guid guid of system instance
   */
  constructor(_guid2) {
    super();

    _getFunctionCaller.add(this);

    _checkLogLevel.add(this);

    _saveConfig.add(this);

    _getConfig.add(this);

    _uploadLogs.add(this);

    _log.add(this);

    _createTimeInterval.add(this);

    _guid.set(this, {
      writable: true,
      value: void 0
    });

    _logLevels.set(this, {
      writable: true,
      value: void 0
    });

    _logs.set(this, {
      writable: true,
      value: void 0
    });

    _config.set(this, {
      writable: true,
      value: void 0
    });

    _globalLogLevel.set(this, {
      writable: true,
      value: void 0
    });

    _bufferSize.set(this, {
      writable: true,
      value: void 0
    });

    _intervalSeconds.set(this, {
      writable: true,
      value: void 0
    });

    _intervalID.set(this, {
      writable: true,
      value: void 0
    });

    _consoleOutputMode.set(this, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _guid, _guid2);

    _classPrivateFieldSet(this, _logLevels, {
      fatal: 1,
      error: 2,
      warn: 3,
      info: 4,
      debug: 5
    });

    _classPrivateFieldSet(this, _logs, []);

    _classPrivateFieldSet(this, _config, {});

    _classPrivateFieldSet(this, _consoleOutputMode, false);
  }
  /**
   * Returns meta information about plugin for registration in application
   * @returns {Object} - meta-info
   */


  static getRegistrationMeta() {
    return {
      type: 'core',
      title: 'Система логирования',
      name: 'LogSystem',
      version: '0.3.1',
      withDependencies: false,
      priority: 7
    };
  }
  /**
   * Returns guid of LogSystem instance
   * @returns {String} - guid
   */


  get guid() {
    return _classPrivateFieldGet(this, _guid);
  }
  /**
   * Returns availiable log levels (keys) and their priority(values) of LogSystem instance
   * @returns {Object} - meta-info
   */


  get logLevels() {
    return _classPrivateFieldGet(this, _logLevels);
  }
  /**
   * Returns log buffer of LogSystem instance
   * @returns {Array} - meta-info
   */


  get logs() {
    return _classPrivateFieldGet(this, _logs);
  }
  /**
   * Returns current global log level of LogSystem instance
   * @returns {String} - meta-info
   */


  get globalLogLevel() {
    return _classPrivateFieldGet(this, _globalLogLevel);
  }
  /**
   * Returns scheduler interval in seconds of LogSystem instance
   * @returns {Number} - meta-info
   */


  get intervalSeconds() {
    return _classPrivateFieldGet(this, _intervalSeconds);
  }
  /**
   * Returns buffer size of LogSystem instance
   * @returns {Number} - buffer size in bytes
   */


  get bufferSize() {
    return _classPrivateFieldGet(this, _bufferSize);
  }

  get consoleOutputMode() {
    return _classPrivateFieldGet(this, _consoleOutputMode);
  }

  set consoleOutputMode(value) {
    if (typeof value != 'boolean') return;

    let config = _classPrivateMethodGet(this, _getConfig, _getConfig2).call(this);

    config['consoleOutputMode'] = value;

    _classPrivateFieldSet(this, _consoleOutputMode, value);

    _classPrivateMethodGet(this, _saveConfig, _saveConfig2).call(this, config);
  }
  /**
   * Initializes system configuration after creation of instance.  Must be called after creation!
   */


  async init() {
    try {
      const response = await fetch('mock_server/v1/logs/object');

      _classPrivateFieldSet(this, _config, await response.json());
    } catch (err) {
      _classPrivateFieldSet(this, _config, {
        GlobalLogLevel: 'fatal',
        BufferSize: 11122,
        SendInterval: 144,
        consoleOutputMode: false
      });
    } finally {
      var _classPrivateFieldGet2, _classPrivateFieldGet3, _classPrivateFieldGet4, _classPrivateFieldGet5;

      let localStorageConfig = _classPrivateMethodGet(this, _getConfig, _getConfig2).call(this);

      if (!localStorageConfig) {
        localStorageConfig = {};

        _classPrivateMethodGet(this, _saveConfig, _saveConfig2).call(this, localStorageConfig);
      }

      for (let prop in localStorageConfig) {
        _classPrivateFieldGet(this, _config)[prop] = localStorageConfig[prop];
      }

      _classPrivateFieldSet(this, _globalLogLevel, ((_classPrivateFieldGet2 = _classPrivateFieldGet(this, _config)) === null || _classPrivateFieldGet2 === void 0 ? void 0 : _classPrivateFieldGet2.GlobalLogLevel) || 'fatal');

      _classPrivateFieldSet(this, _bufferSize, ((_classPrivateFieldGet3 = _classPrivateFieldGet(this, _config)) === null || _classPrivateFieldGet3 === void 0 ? void 0 : _classPrivateFieldGet3.BufferSize) || 11122);

      _classPrivateFieldSet(this, _intervalSeconds, ((_classPrivateFieldGet4 = _classPrivateFieldGet(this, _config)) === null || _classPrivateFieldGet4 === void 0 ? void 0 : _classPrivateFieldGet4.SendInterval) || 144);

      _classPrivateFieldSet(this, _consoleOutputMode, ((_classPrivateFieldGet5 = _classPrivateFieldGet(this, _config)) === null || _classPrivateFieldGet5 === void 0 ? void 0 : _classPrivateFieldGet5.consoleOutputMode) || false);

      _classPrivateFieldSet(this, _intervalID, _classPrivateMethodGet(this, _createTimeInterval, _createTimeInterval2).call(this, _classPrivateFieldGet(this, _intervalSeconds)));
    }
  }
  /**
   * Creates scheduler for sendign logs to server
   * @param {Number} seconds - interval in seconds
   * @returns {Number} - id of created interval
   */


  /**
   * Adds new fatal level log record to the system
   * @param {String} guid - guid of plugin instance
   * @param {String} pluginName - name of plugin instance
   * @param {String} message - log message to record
   * @returns {Boolean} - indicatior of success
   */
  fatal(guid, pluginName, message) {
    const level = this.getPluginLogLevel(guid, pluginName);

    if (_classPrivateFieldGet(this, _logLevels)[level] >= _classPrivateFieldGet(this, _logLevels)['fatal']) {
      return _classPrivateMethodGet(this, _log, _log2).call(this, 'fatal', guid, pluginName, message);
    }
  }
  /**
   * Adds new error level log record to the system
   * @param {String} guid - guid of plugin instance
   * @param {String} pluginName - name of plugin instance
   * @param {String} message - log message to record
   * @returns {Boolean} - indicatior of success
   */


  error(guid, pluginName, message) {
    const level = this.getPluginLogLevel(guid, pluginName);

    if (_classPrivateFieldGet(this, _logLevels)[level] >= _classPrivateFieldGet(this, _logLevels)['error']) {
      return _classPrivateMethodGet(this, _log, _log2).call(this, 'error', guid, pluginName, message);
    }
  }
  /**
   * Adds new warn level log record to the system
   * @param {String} guid - guid of plugin instance
   * @param {String} pluginName - name of plugin instance
   * @param {String} message - log message to record
   * @returns {Boolean} - indicatior of success
   */


  warn(guid, pluginName, message) {
    const level = this.getPluginLogLevel(guid, pluginName);

    if (_classPrivateFieldGet(this, _logLevels)[level] >= _classPrivateFieldGet(this, _logLevels)['warn']) {
      return _classPrivateMethodGet(this, _log, _log2).call(this, 'warn', guid, pluginName, message);
    }
  }
  /**
   * Adds new info level log record to the system
   * @param {String} guid - guid of plugin instance
   * @param {String} pluginName - name of plugin instance
   * @param {String} message - log message to record
   * @returns {Boolean} - indicatior of success
   */


  info(guid, pluginName, message) {
    const level = this.getPluginLogLevel(guid, pluginName);

    if (_classPrivateFieldGet(this, _logLevels)[level] >= _classPrivateFieldGet(this, _logLevels)['info']) {
      return _classPrivateMethodGet(this, _log, _log2).call(this, 'info', guid, pluginName, message);
    }
  }
  /**
   * Adds new debug level log record to the system
   * @param {String} guid - guid of plugin instance
   * @param {String} pluginName - name of plugin instance
   * @param {String} message - log message to record
   * @returns {Boolean} - indicatior of success
   */


  debug(guid, pluginName, message) {
    const level = this.getPluginLogLevel(guid, pluginName);

    if (_classPrivateFieldGet(this, _logLevels)[level] >= _classPrivateFieldGet(this, _logLevels)['debug']) {
      return _classPrivateMethodGet(this, _log, _log2).call(this, 'debug', guid, pluginName, message);
    }
  }
  /**
   * Invokes callback if current log level is above or equel to the given, otherwise nothing happens
   * @param {String} guid - guid of plugin instance
   * @param {String} pluginName - name of plugin instance
   * @param {(String|Number)} logLevel - level on what callback should be invoked
   * @param {callback} callback - callback which should be invoked if level is suitable, should return String message!
   * @returns {Boolean} - indicatior of success
   */


  invokeOnLevel(guid, pluginName, logLevel, callback) {
    if (typeof callback != 'function') return false;

    const givenLevel = _classPrivateMethodGet(this, _checkLogLevel, _checkLogLevel2).call(this, logLevel);

    const pluginLevel = _classPrivateFieldGet(this, _config)[`${guid}${pluginName}`] || _classPrivateFieldGet(this, _globalLogLevel);

    if (givenLevel && _classPrivateFieldGet(this, _logLevels)[pluginLevel] >= _classPrivateFieldGet(this, _logLevels)[givenLevel]) {
      const result = callback();

      if (result instanceof Promise) {
        result.then(message => {
          return this[givenLevel](guid, pluginName, message);
        });
      } else return this[givenLevel](guid, pluginName, result);
    } else return false;
  }
  /**
   * Returns current global log level
   * @returns {String} - current global log level
   */


  getGlobalLogLevel() {
    return _classPrivateFieldGet(this, _globalLogLevel);
  }
  /**
   * Sets new global log level
   * @param {(String|Number)} logLevel - new log level
   * @returns {Boolean} - indicatior of success
   */


  setGlobalLogLevel(logLevel) {
    const level = _classPrivateMethodGet(this, _checkLogLevel, _checkLogLevel2).call(this, logLevel);

    let config = _classPrivateMethodGet(this, _getConfig, _getConfig2).call(this);

    if (level && config) {
      const tempLevel = _classPrivateFieldGet(this, _globalLogLevel);

      _classPrivateFieldSet(this, _globalLogLevel, level);

      config[`GlobalLogLevel`] = level;

      _classPrivateMethodGet(this, _saveConfig, _saveConfig2).call(this, config);

      this.info(this.guid, 'LogSystem', `Global log level changed from "${tempLevel}" to "${level}"`);
      return true;
    } else return false;
  }
  /**
   * Returns current log level of plugin
   * @param {String} guid - guid of plugin instance
   * @param {String} pluginName - name of plugin instance
   * @returns {String} - current log level of plugin
   */


  getPluginLogLevel(guid, pluginName) {
    return _classPrivateFieldGet(this, _config)[`${guid}${pluginName}`] || _classPrivateFieldGet(this, _globalLogLevel);
  }
  /**
   * Sets new plugin log level
   * @param {String} guid - guid of plugin instance
   * @param {String} pluginName - name of plugin instance
   * @param {(String|Number)} logLevel - new log level
   * @returns {Boolean} - indicatior of success
   */


  setPluginLogLevel(guid, pluginName, logLevel) {
    let level = _classPrivateMethodGet(this, _checkLogLevel, _checkLogLevel2).call(this, logLevel);

    let config = _classPrivateMethodGet(this, _getConfig, _getConfig2).call(this);

    if (config && level) {
      config[`${guid}${pluginName}`] = level;
      _classPrivateFieldGet(this, _config)[`${guid}${pluginName}`] = level;

      _classPrivateMethodGet(this, _saveConfig, _saveConfig2).call(this, config);

      this.info(this.guid, 'LogSystem', `Log level of plugin "${pluginName}" with guid "${guid}" changed to "${logLevel}"`);
      return true;
    } else {
      return false;
    }
  }
  /**
   * Removes current log level of plugin
   * @param {String} guid - guid of plugin instance
   * @param {String} pluginName - name of plugin instance
   * @returns {Boolean} - indicatior of success
   */


  removePluginLogLevel(guid, pluginName) {
    let config = _classPrivateMethodGet(this, _getConfig, _getConfig2).call(this);

    if (config) {
      delete config[`${guid}${pluginName}`];
      delete _classPrivateFieldGet(this, _config)[`${guid}${pluginName}`];

      _classPrivateMethodGet(this, _saveConfig, _saveConfig2).call(this, config);

      this.info(this.guid, 'LogSystem', `Log level of plugin "${pluginName}" with guid "${guid}" was reseted`);
      return true;
    } else {
      return false;
    }
  }
  /**
   * Sets new interval for sending logs, work only after page reload
   * @param {Number} seconds - interval in seconds
   * @returns {Boolean} - indicatior of success
   */


  setSendInerval(seconds) {
    if (typeof seconds != 'number') return false;

    let config = _classPrivateMethodGet(this, _getConfig, _getConfig2).call(this);

    if (config) {
      config['SendInterval'] = seconds;

      _classPrivateMethodGet(this, _saveConfig, _saveConfig2).call(this, config);

      this.info(this.guid, 'LogSystem', `Logs send interval was changed to ${seconds} seconds`);
      return true;
    } else {
      return false;
    }
  }
  /**
   * Sets new buffer size logs, work only after page reload
   * @param {Number} bytes - buffer size in bytes
   * @returns {Boolean} - indicatior of success
   */


  setBufferSize(bytes) {
    if (typeof bytes != 'number') return false;

    let config = _classPrivateMethodGet(this, _getConfig, _getConfig2).call(this);

    if (config) {
      config['BufferSize'] = bytes;

      _classPrivateMethodGet(this, _saveConfig, _saveConfig2).call(this, config);

      this.info(this.guid, 'LogSystem', `Buffer size was changed to ${bytes} bytes`);
      return true;
    } else {
      return false;
    }
  }
  /**
   * Resets current configuration of LogSystem
   */


  resetConfiguration() {
    localStorage.removeItem('logSystemConfig');
    this.info(this.guid, 'LogSystem', `Log system configuration was reseted!`);
  }

}

function _createTimeInterval2(seconds) {
  return setInterval(() => {
    if (_classPrivateFieldGet(this, _logs).length > 0) {
      _classPrivateMethodGet(this, _uploadLogs, _uploadLogs2).call(this);

      _classPrivateFieldSet(this, _logs, []);
    }
  }, seconds * 1000);
}

function _log2(logLevel, guid, pluginName, message) {
  if (typeof guid === 'string' && typeof pluginName === 'string' && typeof message === 'string' && guid.length > 0 && pluginName.length > 0 && message.length > 0) {
    const time = Date.now();

    const caller = _classPrivateMethodGet(this, _getFunctionCaller, _getFunctionCaller2).call(this);

    const object = {
      timestamps: time,
      logLevel,
      guid,
      plugin: pluginName,
      caller,
      message: message
    };

    if (sizeof(object) > _classPrivateFieldGet(this, _bufferSize)) {
      return false;
    } else if (sizeof(object) + sizeof(_classPrivateFieldGet(this, _logs)) > _classPrivateFieldGet(this, _bufferSize)) {
      try {
        _classPrivateMethodGet(this, _uploadLogs, _uploadLogs2).call(this);
      } catch (err) {
        console.log(err);
      } finally {
        _classPrivateFieldSet(this, _logs, []);

        if (_classPrivateFieldGet(this, _intervalSeconds)) {
          clearInterval(_classPrivateFieldGet(this, _intervalID));

          _classPrivateFieldSet(this, _intervalID, _classPrivateMethodGet(this, _createTimeInterval, _createTimeInterval2).call(this, _classPrivateFieldGet(this, _intervalSeconds)));
        }

        _classPrivateFieldGet(this, _logs).push(object);
      }
    } else {
      _classPrivateFieldGet(this, _logs).push(object);
    }

    if (_classPrivateFieldGet(this, _consoleOutputMode)) {
      // prettier-ignore
      console.log(`%ctimestamp:%c ${object.timestamps},
%cguid:%c ${object.guid},
%cplugin:%c ${object.plugin},
%clogLevel:%c ${object.logLevel},
%ccaller:%c ${object.caller},
%cmessage:%c ${object.message}`, 'font-weight:bold', '', 'font-weight:bold', '', 'font-weight:bold', '', 'font-weight:bold', '', 'font-weight:bold', '', 'font-weight:bold', '');
    }

    return true;
  } else return false;
}

function _uploadLogs2() {
  try {
    const jsonLogs = JSON.stringify(_classPrivateFieldGet(this, _logs));
    fetch('mock_server/v1/logs/object', {
      method: 'POST',
      body: jsonLogs,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => data);
  } catch (error) {
    console.error('Ошибка:', error);
  }
}

function _getConfig2() {
  const config = localStorage.getItem('logSystemConfig');

  if (config) {
    return JSON.parse(config);
  } else {
    return false;
  }
}

function _saveConfig2(config) {
  localStorage.setItem('logSystemConfig', JSON.stringify(config));
}

function _checkLogLevel2(logLevel) {
  if (typeof logLevel == 'string' && Object.keys(_classPrivateFieldGet(this, _logLevels)).indexOf(logLevel.toLocaleLowerCase()) > -1) {
    return logLevel.toLocaleLowerCase();
  } else if (typeof logLevel == 'number' && Object.values(_classPrivateFieldGet(this, _logLevels)).indexOf(logLevel) > -1) {
    return Object.keys(_classPrivateFieldGet(this, _logLevels)).find(key => _classPrivateFieldGet(this, _logLevels)[key] == logLevel);
  } else return false;
}

function _getFunctionCaller2() {
  const oldStackTrace = Error.prepareStackTrace;

  try {
    // eslint-disable-next-line handle-callback-err
    Error.prepareStackTrace = (err, structuredStackTrace) => structuredStackTrace;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this);

      if (this.stack[4]) {
        return this.stack[4].getFunctionName();
      } else {
        return '';
      }
    } else {
      this.stack = new Error().stack.split('\n');
      if (this.stack[4]) return this.stack[4].split('@')[0];else return '';
    }
  } finally {
    Error.prepareStackTrace = oldStackTrace;
  }
}

export { LogSystem };
