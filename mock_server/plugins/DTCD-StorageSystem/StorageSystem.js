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

function _checkPrivateRedeclaration(obj, privateCollection) {
  if (privateCollection.has(obj)) {
    throw new TypeError("Cannot initialize the same private elements twice on an object");
  }
}

function _classPrivateFieldInitSpec(obj, privateMap, value) {
  _checkPrivateRedeclaration(obj, privateMap);

  privateMap.set(obj, value);
}

function _classPrivateMethodInitSpec(obj, privateSet) {
  _checkPrivateRedeclaration(obj, privateSet);

  privateSet.add(obj);
}

class BaseAdapter {
  /**
   * Getting instances of systems in the constructor
   * @constructor
   */
  constructor() {
    this.app = Application;
  }
  /**
   * This method returns an instance of the required system
   * @param {String} name Name of getting system
   * @returns {Object} Instance of system
   */


  getSystem(name) {
    return this.app.getSystem(name);
  }

}

class LogSystemAdapter extends BaseAdapter {
  /**
   * @constructor
   * @param {String} guid guid of plugin instance
   * @param {String} pluginName name of plugin
   */
  constructor(guid, pluginName) {
    super();
    this.instance = this.getSystem('LogSystem');
    this.guid = guid;
    this.pluginName = pluginName;
  }
  /**
   * Adds new fatal level log record to the system
   * @param {String} message - log message to record
   * @returns {Boolean} - indicatior of success
   */


  fatal(message) {
    return this.instance.fatal(this.guid, this.pluginName, message);
  }
  /**
   * Adds new error level log record to the system
   * @param {String} message - log message to record
   * @returns {Boolean} - indicatior of success
   */


  error(message) {
    return this.instance.error(this.guid, this.pluginName, message);
  }
  /**
   * Adds new warn level log record to the system
   * @param {String} message - log message to record
   * @returns {Boolean} - indicatior of success
   */


  warn(message) {
    return this.instance.warn(this.guid, this.pluginName, message);
  }
  /**
   * Adds new info level log record to the system
   * @param {String} message - log message to record
   * @returns {Boolean} - indicatior of success
   */


  info(message) {
    return this.instance.info(this.guid, this.pluginName, message);
  }
  /**
   * Adds new debug level log record to the system
   * @param {String} message - log message to record
   * @returns {Boolean} - indicatior of success
   */


  debug(message) {
    return this.instance.debug(this.guid, this.pluginName, message);
  }
  /**
   * Invokes callback if current log level is above or equel to the given, otherwise nothing happens
   * @param {(String|Number)} logLevel - level on what callback should be invoked
   * @param {callback} callback - callback which should be invoked if level is suitable, should return String message!
   * @returns {Boolean} - indicatior of success
   */


  invokeOnLevel(logLevel, callback) {
    return this.instance.invokeOnLevel(this.guid, this.pluginName, logLevel, callback);
  }
  /**
   * Returns current global log level
   * @returns {String} - current global log level
   */


  getGlobalLogLevel() {
    return this.instance.getGlobalLogLevel();
  }
  /**
   * Sets new global log level
   * @param {(String|Number)} logLevel - new log level
   * @returns {Boolean} - indicatior of success
   */


  setGlobalLogLevel(logLevel) {
    this.instance.setGlobalLogLevel(logLevel);
  }
  /**
   * Returns current log level for plugin
   * @returns {String} - current log level of plugin
   */


  getPluginLogLevel() {
    return this.instance.getPluginLogLevel(this.guid, this.pluginName);
  }
  /**
   * Sets new plugin log level
   * @param {(String|Number)} logLevel - new log level
   * @returns {Boolean} - indicatior of success
   */


  setPluginLogLevel(logLevel) {
    return this.instance.setPluginLogLevel(this.guid, this.pluginName, logLevel);
  }
  /**
   * Removes current log level of plugin
   * @returns {Boolean} - indicatior of success
   */


  removePluginLogLevel() {
    return this.instance.removePluginLogLevel(this.guid, this.pluginName);
  }
  /**
   * Sets new interval for sending logs, work only after page reload
   * @param {Number} seconds - interval in seconds
   * @returns {Boolean} - indicatior of success
   */


  setSendInerval(seconds) {
    return this.instance.setSendInerval(seconds);
  }
  /**
   * Sets new buffer size logs, work only after page reload
   * @param {Number} bytes - buffer size in bytes
   * @returns {Boolean} - indicatior of success
   */


  setBufferSize(bytes) {
    return this.instance.setBufferSize(bytes);
  }
  /**
   * Resets current configuration of LogSystem
   */


  resetConfiguration() {
    this.instance.resetConfiguration();
  }

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

class BaseError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }

}

class RecordKeyError extends BaseError {
  constructor(msg) {
    super(`Record key error: ${msg}`);
  }

}
class RecordValueError extends BaseError {
  constructor(msg) {
    super(`Record value error: ${msg}`);
  }

}
class RecordDuplicateError extends BaseError {
  constructor(key) {
    super(`Record with key "${key}" already exists`);
  }

}

function checkKey(key) {
  if (typeof key !== 'string') {
    throw new RecordKeyError('Key must be a string');
  } else if (key === '') {
    throw new RecordKeyError('Key cannot be empty');
  } else if (key.startsWith(' ')) {
    throw new RecordKeyError('Key cannot start with a space');
  } else return key.trim();
}
function checkValue(value) {
  if (value === undefined) {
    throw new RecordValueError('Value must be defined');
  } else if (typeof value === 'function') {
    throw new RecordValueError('Value cannot be a function');
  } else return value;
}

class AbstractClassInstanceError extends BaseError {
  constructor(className) {
    super(`Abstract class ${className} cannot have instances`);
  }

}
class MethodImplementError extends BaseError {
  constructor(methodName, className) {
    super(`The "${methodName}" method must be implemented in the ${className} class`);
  }

}

/**
 * Storage system base module class.
 * @class @abstract
 */

class BaseModule {
  /**
   * Initialize BaseModule instance.
   * @constructor
   */
  constructor() {
    if (this.constructor === BaseModule) {
      throw new AbstractClassInstanceError(this.constructor.name);
    }
  }
  /**
   * Checking the record key for compliance with the rules.
   * @method @static @public
   * @param {string} key Checks record key name.
   * @returns {string} Trimmed record key.
   */


  static checkRecordKey(key) {
    return checkKey(key);
  }
  /**
   * Checking the record value for compliance with the rules.
   * @method @static @public
   * @param {*} value Checks record value.
   * @returns {*} Record value.
   */


  static checkRecordValue(value) {
    return checkValue(value);
  }
  /**
   * Abstract method that must be implemented.
   * @method @abstract
   */


  addRecord() {
    throw new MethodImplementError('addRecord', this.constructor.name);
  }
  /**
   * Abstract method that must be implemented.
   * @method @abstract
   */


  putRecord() {
    throw new MethodImplementError('putRecord', this.constructor.name);
  }
  /**
   * Abstract method that must be implemented.
   * @method @abstract
   */


  getRecord() {
    throw new MethodImplementError('getRecord', this.constructor.name);
  }
  /**
   * Abstract method that must be implemented.
   * @method @abstract
   */


  hasRecord() {
    throw new MethodImplementError('hasRecord', this.constructor.name);
  }
  /**
   * Abstract method that must be implemented.
   * @method @abstract
   */


  removeRecord() {
    throw new MethodImplementError('removeRecord', this.constructor.name);
  }
  /**
   * Abstract method that must be implemented.
   * @method @abstract
   */


  clearModule() {
    throw new MethodImplementError('clearModule', this.constructor.name);
  }

}

/**
 * Storage system session module class.
 * @class @extends BaseModule
 */

var _state = /*#__PURE__*/new WeakMap();

var _storage = /*#__PURE__*/new WeakMap();

var _logSystem$1 = /*#__PURE__*/new WeakMap();

var _setRecord = /*#__PURE__*/new WeakSet();

class SessionModule extends BaseModule {
  /**
   * Private JavaScript Map object instance.
   * @property @private
   */

  /**
   * StorageSystem name.
   * @property @private
   */

  /**
   * Private instance of the LogSystemAdapter class.
   * @property @private
   */

  /**
   * Initialize SessionModule instance.
   * @constructor
   * @param {string} storage StorageSystem name.
   * @param {Object} logSystem StorageSystem`s LogSystemAdapter instance.
   */
  constructor(storage, logSystem) {
    super();

    _classPrivateMethodInitSpec(this, _setRecord);

    _classPrivateFieldInitSpec(this, _state, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldInitSpec(this, _storage, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _logSystem$1, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _storage, storage);

    _classPrivateFieldSet(this, _logSystem$1, logSystem);

    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} --> new SessionModule()`);

    _classPrivateFieldGet(this, _logSystem$1).info(`${_classPrivateFieldGet(this, _storage)} session module: initialization complete`);
  }
  /**
   * Helper method for `addRecord()` and `putRecord()` public methods.
   * @method @private
   * @param {string} key Record key name.
   * @param {*} value Record value.
   * @param {boolean} checkUnique Check record key uniqueness.
   */


  /**
   * Create a new record.
   * @method @public @override
   * @param {string} key Record key name.
   * @param {*} value Record value.
   * @returns {SessionModule} This SessionModule instance.
   */
  addRecord(key, value) {
    const settedKey = _classPrivateMethodGet(this, _setRecord, _setRecord2).call(this, key, value, true);

    _classPrivateFieldGet(this, _logSystem$1).info(`${_classPrivateFieldGet(this, _storage)} session module: added "${settedKey}" record`);

    return this;
  }
  /**
   * Replace record value by key or create a new record.
   * @method @public @override
   * @param {string} key Record key name.
   * @param {*} value Record value.
   * @returns {SessionModule} This SessionModule instance.
   */


  putRecord(key, value) {
    const settedKey = _classPrivateMethodGet(this, _setRecord, _setRecord2).call(this, key, value);

    _classPrivateFieldGet(this, _logSystem$1).info(`${_classPrivateFieldGet(this, _storage)} session module: putted "${settedKey}" record`);

    return this;
  }
  /**
   * Get record value by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {*} Record value.
   */


  getRecord(key) {
    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} SessionModule state --> get(${key})`);

    return _classPrivateFieldGet(this, _state).get(key);
  }
  /**
   * Check record existence by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {number} Record existence.
   */


  hasRecord(key) {
    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} SessionModule state --> has(${key})`);

    return _classPrivateFieldGet(this, _state).has(key);
  }
  /**
   * Delete record by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {boolean} Success of record deletion.
   */


  removeRecord(key) {
    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} SessionModule state --> delete(${key})`);

    return _classPrivateFieldGet(this, _state).delete(key);
  }
  /**
   * Delete all records.
   * @method @public @override
   * @returns {number} Number of deleted records.
   */


  clearModule() {
    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} SessionModule state --> clear()`);

    const countBeforeClear = this.recordCount;

    _classPrivateFieldGet(this, _state).clear();

    return countBeforeClear;
  }
  /**
   * Number of module records.
   * @property @public
   * @returns {number} Number of records.
   */


  get recordCount() {
    return _classPrivateFieldGet(this, _state).size;
  }
  /**
   * List of module records keys.
   * @property @public
   * @returns {string[]} Array of records keys.
   */


  get recordList() {
    return Array.from(_classPrivateFieldGet(this, _state).keys());
  }

}

function _setRecord2(key, value, checkUnique = false) {
  try {
    const addedKey = BaseModule.checkRecordKey(key);
    const addedValue = BaseModule.checkRecordValue(value);

    if (checkUnique && this.hasRecord(addedKey)) {
      throw new RecordDuplicateError(addedKey);
    }

    _classPrivateFieldGet(this, _state).set(addedKey, addedValue);

    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} SessionModule state: SET "${addedKey}" => ${addedValue}`);

    return addedKey;
  } catch (err) {
    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} SessionModule: ${err.stack}`);

    _classPrivateFieldGet(this, _logSystem$1).info(`${_classPrivateFieldGet(this, _storage)} session module ${err.message}`);

    throw err;
  }
}

var pluginMeta = {
  type: 'core',
  name: 'StorageSystem',
  title: 'Система хранения данных',
  version: '0.3.0',
  priority: 3
};

/**
 * StorageSystem core plugin class.
 * @class @extends SystemPlugin
 */

var _sessionModule = /*#__PURE__*/new WeakMap();

var _logSystem = /*#__PURE__*/new WeakMap();

class StorageSystem extends SystemPlugin {
  /**
   * Private instance of the SessionModule class.
   * @property @private
   */

  /**
   * Private instance of the LogSystemAdapter class.
   * @property @private
   */

  /**
   * Initialize StorageSystem instance.
   * @constructor
   * @param {string} guid System instance GUID.
   */
  constructor(guid) {
    super();

    _classPrivateFieldInitSpec(this, _sessionModule, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _logSystem, {
      writable: true,
      value: void 0
    });

    const systemName = `StorageSystem[${guid}]`;

    _classPrivateFieldSet(this, _logSystem, new LogSystemAdapter(guid, pluginMeta.name));

    _classPrivateFieldGet(this, _logSystem).debug(`Start of ${systemName} creation`);

    _classPrivateFieldSet(this, _sessionModule, new SessionModule(systemName, _classPrivateFieldGet(this, _logSystem)));

    _classPrivateFieldGet(this, _logSystem).debug(`End of ${systemName} creation`);

    _classPrivateFieldGet(this, _logSystem).info(`${systemName} initialization complete`);
  }
  /**
   * Session module.
   * @property @public
   * @returns {SessionModule} SessionModule instance.
   */


  get session() {
    return _classPrivateFieldGet(this, _sessionModule);
  }
  /**
   * Returns plugin metadata object.
   * @method @static
   * @returns {object} Plugin metadata object.
   */


  static getRegistrationMeta() {
    return pluginMeta;
  }

}

export { StorageSystem };
