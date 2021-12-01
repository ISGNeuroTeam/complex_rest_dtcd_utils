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

var _guid = /*#__PURE__*/new WeakMap();

var _instance = /*#__PURE__*/new WeakMap();

class EventSystemAdapter extends BaseAdapter {
  /**
   * @constructor
   * @param {String} guid guid of plugin, in which the adapter instance will be inited
   */
  constructor(guid) {
    super();

    _classPrivateFieldInitSpec(this, _guid, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _instance, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _guid, guid);

    _classPrivateFieldSet(this, _instance, this.getSystem('EventSystem'));
  }
  /**
   * Configure state of EventSystem by object
   * @method
   * @param {*} conf Config object
   * @returns {Boolean} true, if everything is ok
   */


  setPluginConfig(conf) {
    return _classPrivateFieldGet(this, _instance).setPluginConfig(conf);
  }
  /**
   * Getting state of EventSystem
   * @method
   * @returns {*} State of system by object
   */


  getPluginConfig() {
    return _classPrivateFieldGet(this, _instance).getPluginConfig();
  } // ---- getters ----


  get events() {
    return _classPrivateFieldGet(this, _instance).events;
  }

  get actions() {
    return _classPrivateFieldGet(this, _instance).actions;
  }

  get subscriptions() {
    return _classPrivateFieldGet(this, _instance).subscriptions;
  }
  /**
   * Register methods of instance as actions in EventSystem. Register events of instance by names.
   * @method
   * @param {*} obj An instance of the plugin being registered
   * @param {String[]} eventList Array of eventNames of plugin that being registered
   * @param {String} customGUID instance guid of plugin that will register
   * @returns {Boolean} true, if everything is ok
   */


  registerPluginInstance(obj, eventList, customGUID) {
    if (typeof customGUID === 'undefined') return _classPrivateFieldGet(this, _instance).registerPluginInstance(_classPrivateFieldGet(this, _guid), obj, eventList);else return _classPrivateFieldGet(this, _instance).registerPluginInstance(customGUID, obj, eventList);
  }
  /**
   * Adding event type to event list into eventSystem (register them)
   * @method
   * @param {String} eventName event name
   * @returns {Boolean} true, if everything is ok
   */


  registerEvent(eventName, ...args) {
    return _classPrivateFieldGet(this, _instance).registerEvent(_classPrivateFieldGet(this, _guid), eventName, ...args);
  }
  /**
   * Register new action
   * @method
   * @param {String} actionName action name
   * @param {Function} callback callback whitch invoked on event
   * @returns {Boolean} true, if everything is ok
   */


  registerAction(actionName, callback) {
    return _classPrivateFieldGet(this, _instance).createActionByCallback(_classPrivateFieldGet(this, _guid), actionName, callback);
  }
  /**
   * Publishes event from instance by name
   * @method
   * @param {String} eventName event name
   * @param {*} args ...
   * @returns {Boolean} true, if everything is ok
   */


  publishEvent(eventName, args) {
    return _classPrivateFieldGet(this, _instance).publishEvent(_classPrivateFieldGet(this, _guid), eventName, args);
  }
  /**
   * Subscribing
   * @method
   * @param {String} eventGUID instance guid of firing plugin
   * @param {String} eventName name of event
   * @param {String} actionsGUID instance guid of plugin whom invoke callback
   * @param {String} actionName name of action
   * @param {Array} args arguments of event
   * @returns {Boolean} true, if everything is ok
   */


  subscribe(eventGUID, eventName, actionGUID, actionName, ...args) {
    return _classPrivateFieldGet(this, _instance).subscribe(eventGUID, eventName, actionGUID, actionName, ...args);
  }
  /**
   * Unsubscribing
   * @method
   * @param {String} eventGUID instance guid of firing plugin
   * @param {String} eventName name of event
   * @param {String} actionsGUID instance guid of plugin whom invoke callback
   * @param {String} actionName name of action
   * @param {Array} args arguments of event
   * @returns {Boolean} true, if everything is ok
   */


  unsubscribe(eventGUID, eventName, actionGUID, actionName, ...args) {
    return _classPrivateFieldGet(this, _instance).unsubscribe(eventGUID, eventName, actionGUID, actionName, ...args);
  } // /**
  //  * Subsribes all events with the given name to the action
  //  * @method
  //  * @param {String} actionsGUID instance guid of plugin who invokes callback
  //  * @param {String} actionName name of action
  //  * @param {String} eventName name of event
  //  * @returns {Boolean} true, if everything is ok
  //  */
  // subscribeActionOnEventName(actionGUID, actionName, eventName) {
  //   return this.#instance.subscribeActionOnEventName(actionGUID, actionName, eventName);
  // }
  // /**
  //  * Subsribes all events with the given name to the action
  //  * @method
  //  * @param {String} eventGUID instance guid of plugin who publishes the event
  //  * @param {String} eventName name of action
  //  * @param {String} actionName name of action
  //  * @returns {Boolean} true, if everything is ok
  //  */
  // subscribeEventOnActionName(eventGUID, eventName, actionName) {
  //   return this.#instance.subscribeEventOnActionName(eventGUID, eventName, actionName);
  // }
  // /**
  //  * Subsribe all actions with the given name on all events with name
  //  * @method
  //  * @param {String} eventName name of action
  //  * @param {String} actionName name of action
  //  * @returns {Boolean} true, if everything is ok
  //  */
  // subscribeByNames(eventName, actionName) {
  //   return this.#instance.subscribeByNames(eventName, actionName);
  // }


}

class CustomError extends Error {
  constructor(msg) {
    super(msg);
    this.name = this.constructor.name;
  }

}

class AbstractMethodImplementError extends CustomError {
  constructor(methodName, className) {
    super(`The "${methodName}" method must be implemented in the ${className} class`);
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
    throw new AbstractMethodImplementError('Implement the getRegistrationMeta static method!');
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
   * @return {Object} Returns instance of plugin
   */


  installPlugin(name, ...args) {
    return Application.installPlugin(name, ...args);
  }
  /**
   * Install extension by target and name
   * @method
   * @param {String} target
   * @param {String} pluginName
   * @return {Object} Returns instance of plugin
   */


  installExtension(target, pluginName, ...args) {
    return Application.installExtension(target, pluginName, ...args);
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
   * Uninstall plugin from Application by unique identifier (GUID)
   * @method
   * @param {String} guid Unique identifier of the instance to be uninstalled
   * @returns {Boolean}
   */


  uninstallPluginByGUID(guid) {
    return Application.uninstallPluginByGUID(guid);
  }
  /**
   * Getting instance by GUID
   * @method
   * @param {String} guid
   * @returns {Object}
   */


  getInstance(guid) {
    return Application.getInstance(guid);
  }
  /**
   * Getting GUID by instance of plugin
   * @method
   * @param {Object} instance
   * @returns {Object}
   */


  getGUID(instance) {
    return Application.getGUID(instance);
  }
  /**
   * Getting list of all GUID's
   * @method
   * @returns {String[]}
   */


  getGUIDList() {
    return Application.getGUIDList();
  }

  getPlugin(name, type = false) {
    return Application.getPlugin(name, type);
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

var _state$1 = /*#__PURE__*/new WeakMap();

var _storage$1 = /*#__PURE__*/new WeakMap();

var _logSystem$2 = /*#__PURE__*/new WeakMap();

var _setRecord$1 = /*#__PURE__*/new WeakSet();

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

    _classPrivateMethodInitSpec(this, _setRecord$1);

    _classPrivateFieldInitSpec(this, _state$1, {
      writable: true,
      value: new Map()
    });

    _classPrivateFieldInitSpec(this, _storage$1, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _logSystem$2, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _storage$1, storage);

    _classPrivateFieldSet(this, _logSystem$2, logSystem);

    _classPrivateFieldGet(this, _logSystem$2).debug(`${_classPrivateFieldGet(this, _storage$1)} --> new SessionModule()`);

    _classPrivateFieldGet(this, _logSystem$2).info(`${_classPrivateFieldGet(this, _storage$1)} session module: initialization complete`);
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
    const settedKey = _classPrivateMethodGet(this, _setRecord$1, _setRecord2$1).call(this, key, value, true);

    _classPrivateFieldGet(this, _logSystem$2).info(`${_classPrivateFieldGet(this, _storage$1)} session module: added "${settedKey}" record`);

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
    const settedKey = _classPrivateMethodGet(this, _setRecord$1, _setRecord2$1).call(this, key, value);

    _classPrivateFieldGet(this, _logSystem$2).info(`${_classPrivateFieldGet(this, _storage$1)} session module: putted "${settedKey}" record`);

    return this;
  }
  /**
   * Get record value by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {*} Record value.
   */


  getRecord(key) {
    _classPrivateFieldGet(this, _logSystem$2).debug(`${_classPrivateFieldGet(this, _storage$1)} SessionModule state --> get(${key})`);

    return _classPrivateFieldGet(this, _state$1).get(key);
  }
  /**
   * Check record existence by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {number} Record existence.
   */


  hasRecord(key) {
    _classPrivateFieldGet(this, _logSystem$2).debug(`${_classPrivateFieldGet(this, _storage$1)} SessionModule state --> has(${key})`);

    return _classPrivateFieldGet(this, _state$1).has(key);
  }
  /**
   * Delete record by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {boolean} Success of record deletion.
   */


  removeRecord(key) {
    _classPrivateFieldGet(this, _logSystem$2).debug(`${_classPrivateFieldGet(this, _storage$1)} SessionModule state --> delete(${key})`);

    return _classPrivateFieldGet(this, _state$1).delete(key);
  }
  /**
   * Delete all records.
   * @method @public @override
   * @returns {number} Number of deleted records.
   */


  clearModule() {
    _classPrivateFieldGet(this, _logSystem$2).debug(`${_classPrivateFieldGet(this, _storage$1)} SessionModule state --> clear()`);

    const countBeforeClear = this.recordCount;

    _classPrivateFieldGet(this, _state$1).clear();

    return countBeforeClear;
  }
  /**
   * Number of module records.
   * @property @public
   * @returns {number} Number of records.
   */


  get recordCount() {
    return _classPrivateFieldGet(this, _state$1).size;
  }
  /**
   * List of module records keys.
   * @property @public
   * @returns {string[]} Array of records keys.
   */


  get recordList() {
    return Array.from(_classPrivateFieldGet(this, _state$1).keys());
  }

}

function _setRecord2$1(key, value, checkUnique = false) {
  try {
    const addedKey = BaseModule.checkRecordKey(key);
    const addedValue = BaseModule.checkRecordValue(value);

    if (checkUnique && this.hasRecord(addedKey)) {
      throw new RecordDuplicateError(addedKey);
    }

    _classPrivateFieldGet(this, _state$1).set(addedKey, addedValue);

    _classPrivateFieldGet(this, _logSystem$2).debug(`${_classPrivateFieldGet(this, _storage$1)} SessionModule state: SET "${addedKey}" => ${addedValue}`);

    return addedKey;
  } catch (err) {
    _classPrivateFieldGet(this, _logSystem$2).debug(`${_classPrivateFieldGet(this, _storage$1)} SessionModule: ${err.stack}`);

    _classPrivateFieldGet(this, _logSystem$2).info(`${_classPrivateFieldGet(this, _storage$1)} session module ${err.message}`);

    throw err;
  }
}

/**
 * Storage system token module class.
 * @class @extends BaseModule
 */

var _state = /*#__PURE__*/new WeakMap();

var _storage = /*#__PURE__*/new WeakMap();

var _logSystem$1 = /*#__PURE__*/new WeakMap();

var _eventSystem$1 = /*#__PURE__*/new WeakMap();

var _setRecord = /*#__PURE__*/new WeakSet();

class TokenModule extends BaseModule {
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
   * Private instance of the EventSystemAdapter class.
   * @property @private
   */

  /**
   * Initialize TokenModule instance.
   * @constructor
   * @param {string} storage StorageSystem name.
   * @param {Object} logSystem StorageSystem`s LogSystemAdapter instance.
   * @param {Object} eventSystem StorageSystem`s EventSystemAdapter instance.
   */
  constructor(storage, logSystem, eventSystem) {
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

    _classPrivateFieldInitSpec(this, _eventSystem$1, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _storage, storage);

    _classPrivateFieldSet(this, _logSystem$1, logSystem);

    _classPrivateFieldSet(this, _eventSystem$1, eventSystem);

    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} --> new TokenModule()`);

    _classPrivateFieldGet(this, _logSystem$1).info(`${_classPrivateFieldGet(this, _storage)} token module: initialization complete`);
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
   * @returns {TokenModule} This TokenModule instance.
   */
  addRecord(key, value) {
    const settedKey = _classPrivateMethodGet(this, _setRecord, _setRecord2).call(this, key, value, true);

    _classPrivateFieldGet(this, _logSystem$1).info(`${_classPrivateFieldGet(this, _storage)} token module: added "${settedKey}" record`);

    _classPrivateFieldGet(this, _eventSystem$1).publishEvent('TokenUpdate', {
      token: key
    });

    return this;
  }
  /**
   * Replace record value by key or create a new record.
   * @method @public @override
   * @param {string} key Record key name.
   * @param {*} value Record value.
   * @returns {TokenModule} This TokenModule instance.
   */


  putRecord(key, value) {
    const settedKey = _classPrivateMethodGet(this, _setRecord, _setRecord2).call(this, key, value);

    _classPrivateFieldGet(this, _logSystem$1).info(`${_classPrivateFieldGet(this, _storage)} token module: putted "${settedKey}" record`);

    _classPrivateFieldGet(this, _eventSystem$1).publishEvent('TokenUpdate', {
      token: key
    });

    return this;
  }
  /**
   * Get record value by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {*} Record value.
   */


  getRecord(key) {
    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} TokenModule state --> get(${key})`);

    return _classPrivateFieldGet(this, _state).get(key);
  }
  /**
   * Check record existence by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {number} Record existence.
   */


  hasRecord(key) {
    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} TokenModule state --> has(${key})`);

    return _classPrivateFieldGet(this, _state).has(key);
  }
  /**
   * Delete record by key.
   * @method @public @override
   * @param {string} key Record key name.
   * @returns {boolean} Success of record deletion.
   */


  removeRecord(key) {
    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} TokenModule state --> delete(${key})`);

    return _classPrivateFieldGet(this, _state).delete(key);
  }
  /**
   * Delete all records.
   * @method @public @override
   * @returns {number} Number of deleted records.
   */


  clearModule() {
    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} TokenModule state --> clear()`);

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

  get state() {
    return Array.from(_classPrivateFieldGet(this, _state).entries());
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

    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} TokenModule state: SET "${addedKey}" => ${addedValue}`);

    return addedKey;
  } catch (err) {
    _classPrivateFieldGet(this, _logSystem$1).debug(`${_classPrivateFieldGet(this, _storage)} TokenModule: ${err.stack}`);

    _classPrivateFieldGet(this, _logSystem$1).info(`${_classPrivateFieldGet(this, _storage)} token module ${err.message}`);

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

var _tokenModule = /*#__PURE__*/new WeakMap();

var _logSystem = /*#__PURE__*/new WeakMap();

var _eventSystem = /*#__PURE__*/new WeakMap();

class StorageSystem extends SystemPlugin {
  /**
   * Private instance of the SessionModule class.
   * @property @private
   */

  /**
   * Private instance of the TokenModule class.
   * @property @private
   */

  /**
   * Private instance of the LogSystemAdapter class.
   * @property @private
   */

  /**
   * Private instance of the EventSystemAdapter class.
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

    _classPrivateFieldInitSpec(this, _tokenModule, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _logSystem, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _eventSystem, {
      writable: true,
      value: void 0
    });

    const systemName = `StorageSystem[${guid}]`;

    _classPrivateFieldSet(this, _logSystem, new LogSystemAdapter(guid, pluginMeta.name));

    _classPrivateFieldGet(this, _logSystem).debug(`Start of ${systemName} creation`);

    _classPrivateFieldSet(this, _eventSystem, new EventSystemAdapter(guid));

    _classPrivateFieldSet(this, _sessionModule, new SessionModule(systemName, _classPrivateFieldGet(this, _logSystem)));

    _classPrivateFieldSet(this, _tokenModule, new TokenModule(systemName, _classPrivateFieldGet(this, _logSystem), _classPrivateFieldGet(this, _eventSystem)));

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
   * Token module.
   * @property @public
   * @returns {TokenModule} TokenModule instance.
   */


  get tokenStorage() {
    return _classPrivateFieldGet(this, _tokenModule);
  }

  setPluginConfig(config = {}) {
    const {
      tokens
    } = config;

    for (const [key, value] of tokens) {
      if (!this.tokenStorage.hasRecord(key)) this.tokenStorage.addRecord(key, value);
    }
  }

  getPluginConfig() {
    const tokens = this.tokenStorage.state;
    return {
      tokens
    };
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
