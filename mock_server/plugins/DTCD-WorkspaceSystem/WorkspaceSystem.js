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

var e = [],
    t = [];

function n(n, r) {
  if (n && "undefined" != typeof document) {
    var a,
        s = !0 === r.prepend ? "prepend" : "append",
        d = !0 === r.singleTag,
        i = "string" == typeof r.container ? document.querySelector(r.container) : document.getElementsByTagName("head")[0];

    if (d) {
      var u = e.indexOf(i);
      -1 === u && (u = e.push(i) - 1, t[u] = {}), a = t[u] && t[u][s] ? t[u][s] : t[u][s] = c();
    } else a = c();

    65279 === n.charCodeAt(0) && (n = n.substring(1)), a.styleSheet ? a.styleSheet.cssText += n : a.appendChild(document.createTextNode(n));
  }

  function c() {
    var e = document.createElement("style");
    if (e.setAttribute("type", "text/css"), r.attributes) for (var t = Object.keys(r.attributes), n = 0; n < t.length; n++) e.setAttribute(t[n], r.attributes[t[n]]);
    var a = "prepend" === s ? "afterbegin" : "beforeend";
    return i.insertAdjacentElement(a, e), e;
  }
}

var css$3 = "body {\n  margin: 0;\n  background-color: #f4f4fa;\n}\n\n.grid-stack {\n  margin-bottom: 30px;\n}\n\n.grid-stack-item-content {\n  position: relative;\n  border: 2px solid #f4f4fa;\n  transition: 0.3s;\n  background-color: #fefefe;\n}\n.gridstack-content-container {\n  height: 100%;\n}\n\n.gridstack-panel-overlay:before {\n  content: '';\n  display: block;\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n  z-index: 1500;\n  background-color: #3c1c7836;\n}\n\n.gridstack-panel-header {\n  display: flex;\n  justify-content: flex-end;\n  align-items: center;\n  position: absolute;\n  z-index: 2000;\n  width: 100%;\n  height: 2em;\n  background-color: rgb(102, 102, 102);\n}\n\n.default-select-panel {\n  border: none;\n  outline: none;\n  background: transparent;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n  appearance: none;\n  border-radius: 0;\n  margin: 0;\n  display: block;\n  width: 100%;\n  padding: 12px 55px 15px 15px;\n  font-size: 14px;\n  background-color: hsla(212, 44%, 51%, 0.418);\n}\n.default-select-panel:after {\n  position: absolute;\n  right: 0;\n  top: 0;\n  width: 50px;\n  height: 100%;\n  line-height: 38px;\n  content: '∨';\n  text-align: center;\n  color: #714bb9;\n  font-size: 24px;\n  border-left: 1px solid #3c1c78;\n  z-index: -1;\n}\n\n.close-panel-button {\n  background-color: none;\n  width: 10px;\n  margin-right: 0.5em;\n}\n\n.handle-drag-of-panel {\n  /* cursor: grab; */\n}\n.handle-drag-of-panel > * {\n  /* cursor: pointer; */\n}\n.ui-resizable-handle {\n  z-index: 15000 !important;\n}\n";
n(css$3,{});

var css$2 = ".workspace-header {\n  height: 30px;\n  width: 100%;\n  background-color: #272A3A;\n  color: #FFF;\n}\n\n.workspace-header-wrapper {\n  height: 30px;\n  display: flex;\n  justify-content: space-between;\n  margin: 0 15px;\n}\n\n.workspace-header-menu {\n  height: 30px;\n  display: flex;\n  align-items: center;\n  column-gap: 40px;\n}\n\n.workspace-header-logo {\n  font-size: 18px;\n  font-weight: 800;\n}\n\n.workspace-header-item {\n  font-size: 13px;\n  /* cursor: pointer; */\n}\n\n.workspace-header-right-menu { \n  height: 30px;\n  display: flex;\n  align-items: center;\n}\n\n.user-icon {\n  height: 18px;\n  width: 18px;\n  background-color: #AF52DE;\n  border-radius: 50%;\n  margin-left: 29px;\n}\n\n.username {\n  font-size: 13px;\n  font-weight: 600;\n  margin-left: 6px;\n  margin-right: 9px;\n}";
n(css$2,{});

var css$1 = ".workspace-footer {\n  width: 100%;\n  height: 30px;\n  position: fixed;\n  bottom: 0;\n  left: 0;\n  background-color: #FEFEFE;\n  display: flex;\n  line-height: 30px;\n}\n.workspace-footer-item {\n  font-size: 15px;\n  font-style: normal;\n  font-weight: normal;\n  color: #51515C;\n  padding: 0 16px;\n  background-color: rgba(198, 198, 212, 0.12);\n  cursor: pointer;\n}\n.active-tab {\n  background: rgba(5, 121, 247, 0.12);\n  color: #0579F7;\n}";
n(css$1,{});

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

var _guid$1 = /*#__PURE__*/new WeakMap();

var _instance = /*#__PURE__*/new WeakMap();

class EventSystemAdapter extends BaseAdapter {
  /**
   * @constructor
   * @param {String} guid guid of plugin, in which the adapter instance will be inited
   */
  constructor(guid) {
    super();

    _classPrivateFieldInitSpec(this, _guid$1, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _instance, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _guid$1, guid);

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
    if (typeof customGUID === 'undefined') return _classPrivateFieldGet(this, _instance).registerPluginInstance(_classPrivateFieldGet(this, _guid$1), obj, eventList);else return _classPrivateFieldGet(this, _instance).registerPluginInstance(customGUID, obj, eventList);
  }
  /**
   * Adding event type to event list into eventSystem (register them)
   * @method
   * @param {String} eventName event name
   * @returns {Boolean} true, if everything is ok
   */


  registerEvent(eventName, args) {
    return _classPrivateFieldGet(this, _instance).registerEvent(_classPrivateFieldGet(this, _guid$1), eventName, args);
  }
  /**
   * Register new action
   * @method
   * @param {String} actionName action name
   * @param {Function} callback callback whitch invoked on event
   * @returns {Boolean} true, if everything is ok
   */


  registerAction(actionName, callback) {
    return _classPrivateFieldGet(this, _instance).createActionByCallback(_classPrivateFieldGet(this, _guid$1), actionName, callback);
  }
  /**
   * Publishes event from instance by name
   * @method
   * @param {String} eventName event name
   * @param {*} args ...
   * @returns {Boolean} true, if everything is ok
   */


  publishEvent(eventName, args) {
    return _classPrivateFieldGet(this, _instance).publishEvent(_classPrivateFieldGet(this, _guid$1), eventName, args);
  }
  /**
   * Subscribing
   * @method
   * @param {String} eventGUID instance guid of firing plugin
   * @param {String} eventName name of event
   * @param {String} actionsGUID instance guid of plugin whom invoke callback
   * @param {String} actionName name of action
   * @returns {Boolean} true, if everything is ok
   */


  subscribe(eventGUID, eventName, actionGUID, actionName) {
    return _classPrivateFieldGet(this, _instance).subscribe(eventGUID, eventName, actionGUID, actionName);
  }
  /**
   * Subsribes all events with the given name to the action
   * @method
   * @param {String} actionsGUID instance guid of plugin who invokes callback
   * @param {String} actionName name of action
   * @param {String} eventName name of event
   * @returns {Boolean} true, if everything is ok
   */


  subscribeActionOnEventName(actionGUID, actionName, eventName) {
    return _classPrivateFieldGet(this, _instance).subscribeActionOnEventName(actionGUID, actionName, eventName);
  }
  /**
   * Subsribes all events with the given name to the action
   * @method
   * @param {String} eventGUID instance guid of plugin who publishes the event
   * @param {String} eventName name of action
   * @param {String} actionName name of action
   * @returns {Boolean} true, if everything is ok
   */


  subscribeEventOnActionName(eventGUID, eventName, actionName) {
    return _classPrivateFieldGet(this, _instance).subscribeEventOnActionName(eventGUID, eventName, actionName);
  }
  /**
   * Subsribe all actions with the given name on all events with name
   * @method
   * @param {String} eventName name of action
   * @param {String} actionName name of action
   * @returns {Boolean} true, if everything is ok
   */


  subscribeByNames(eventName, actionName) {
    return _classPrivateFieldGet(this, _instance).subscribeByNames(eventName, actionName);
  }

}

class InteractionSystemAdapter extends BaseAdapter {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.instance = this.getSystem('InteractionSystem');
  }
  /**
   * Sends GET request to the given url with config
   * @param {String} url url of API endpoint
   * @param {Object} config axios request config
   * @returns {Object} response object
   */


  GETRequest(url, config = {}) {
    return this.instance.GETRequest(url, config);
  }
  /**
   * Sends POST request to the given url with the given data and config
   * @param {String} url url of API endpoint
   * @param {Object} data body data object
   * @param {Object} config axios request config
   * @returns {Promise<any>} response object
   */


  POSTRequest(url, data, config = {}) {
    return this.instance.POSTRequest(url, data, config);
  }
  /**
   * Sends PUT request to the given url with the given data and config
   * @param {String} url url of API endpoint
   * @param {Object} data body data object
   * @param {Object} config axios request config
   * @returns {Promise<any>} response object
   */


  PUTRequest(url, data, config = {}) {
    return this.instance.PUTRequest(url, data, config);
  }
  /**
   * Sends DELETE request to the given url with the given data and config
   * @param {String} url url of API endpoint
   * @param {Object} data body data object
   * @param {Object} config axios request config
   * @returns {Promise<any>} response object
   */


  DELETERequest(url, data, config = {}) {
    return this.instance.DELETERequest(url, data, config);
  }

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

function createCommonjsModule(fn) {
  var module = { exports: {} };
	return fn(module, module.exports), module.exports;
}

/**
 * utils.ts 4.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */

/** checks for obsolete method names */
// eslint-disable-next-line

function obsolete(self, f, oldName, newName, rev) {
  let wrapper = (...args) => {
    console.warn('gridstack.js: Function `' + oldName + '` is deprecated in ' + rev + ' and has been replaced ' + 'with `' + newName + '`. It will be **completely** removed in v1.0');
    return f.apply(self, args);
  };

  wrapper.prototype = f.prototype;
  return wrapper;
}

var obsolete_1 = obsolete;
/** checks for obsolete grid options (can be used for any fields, but msg is about options) */

function obsoleteOpts(opts, oldName, newName, rev) {
  if (opts[oldName] !== undefined) {
    opts[newName] = opts[oldName];
    console.warn('gridstack.js: Option `' + oldName + '` is deprecated in ' + rev + ' and has been replaced with `' + newName + '`. It will be **completely** removed in v1.0');
  }
}

var obsoleteOpts_1 = obsoleteOpts;
/** checks for obsolete grid options which are gone */

function obsoleteOptsDel(opts, oldName, rev, info) {
  if (opts[oldName] !== undefined) {
    console.warn('gridstack.js: Option `' + oldName + '` is deprecated in ' + rev + info);
  }
}

var obsoleteOptsDel_1 = obsoleteOptsDel;
/** checks for obsolete Jquery element attributes */

function obsoleteAttr(el, oldName, newName, rev) {
  let oldAttr = el.getAttribute(oldName);

  if (oldAttr !== null) {
    el.setAttribute(newName, oldAttr);
    console.warn('gridstack.js: attribute `' + oldName + '`=' + oldAttr + ' is deprecated on this object in ' + rev + ' and has been replaced with `' + newName + '`. It will be **completely** removed in v1.0');
  }
}

var obsoleteAttr_1 = obsoleteAttr;
/**
 * Utility methods
 */

class Utils {
  /** convert a potential selector into actual list of html elements */
  static getElements(els) {
    if (typeof els === 'string') {
      let list = document.querySelectorAll(els);

      if (!list.length && els[0] !== '.' && els[0] !== '#') {
        list = document.querySelectorAll('.' + els);

        if (!list.length) {
          list = document.querySelectorAll('#' + els);
        }
      }

      return Array.from(list);
    }

    return [els];
  }
  /** convert a potential selector into actual single element */


  static getElement(els) {
    if (typeof els === 'string') {
      if (!els.length) return null;

      if (els[0] === '#') {
        return document.getElementById(els.substring(1));
      }

      if (els[0] === '.' || els[0] === '[') {
        return document.querySelector(els);
      } // if we start with a digit, assume it's an id (error calling querySelector('#1')) as class are not valid CSS


      if (!isNaN(+els[0])) {
        // start with digit
        return document.getElementById(els);
      } // finally try string, then id then class


      let el = document.querySelector(els);

      if (!el) {
        el = document.getElementById(els);
      }

      if (!el) {
        el = document.querySelector('.' + els);
      }

      return el;
    }

    return els;
  }
  /** returns true if a and b overlap */


  static isIntercepted(a, b) {
    return !(a.y >= b.y + b.h || a.y + a.h <= b.y || a.x + a.w <= b.x || a.x >= b.x + b.w);
  }
  /** returns true if a and b touch edges or corners */


  static isTouching(a, b) {
    return Utils.isIntercepted(a, {
      x: b.x - 0.5,
      y: b.y - 0.5,
      w: b.w + 1,
      h: b.h + 1
    });
  }
  /**
   * Sorts array of nodes
   * @param nodes array to sort
   * @param dir 1 for asc, -1 for desc (optional)
   * @param width width of the grid. If undefined the width will be calculated automatically (optional).
   **/


  static sort(nodes, dir, column) {
    column = column || nodes.reduce((col, n) => Math.max(n.x + n.w, col), 0) || 12;
    if (dir === -1) return nodes.sort((a, b) => b.x + b.y * column - (a.x + a.y * column));else return nodes.sort((b, a) => b.x + b.y * column - (a.x + a.y * column));
  }
  /**
   * creates a style sheet with style id under given parent
   * @param id will set the 'gs-style-id' attribute to that id
   * @param parent to insert the stylesheet as first child,
   * if none supplied it will be appended to the document head instead.
   */


  static createStylesheet(id, parent) {
    let style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.setAttribute('gs-style-id', id); // eslint-disable-next-line @typescript-eslint/no-explicit-any

    if (style.styleSheet) {
      // TODO: only CSSImportRule have that and different beast ??
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      style.styleSheet.cssText = '';
    } else {
      style.appendChild(document.createTextNode('')); // WebKit hack
    }

    if (!parent) {
      // default to head
      parent = document.getElementsByTagName('head')[0];
      parent.appendChild(style);
    } else {
      parent.insertBefore(style, parent.firstChild);
    }

    return style.sheet;
  }
  /** removed the given stylesheet id */


  static removeStylesheet(id) {
    let el = document.querySelector('STYLE[gs-style-id=' + id + ']');
    if (el && el.parentNode) el.remove();
  }
  /** inserts a CSS rule */


  static addCSSRule(sheet, selector, rules) {
    if (typeof sheet.addRule === 'function') {
      sheet.addRule(selector, rules);
    } else if (typeof sheet.insertRule === 'function') {
      sheet.insertRule(`${selector}{${rules}}`);
    }
  } // eslint-disable-next-line @typescript-eslint/no-explicit-any


  static toBool(v) {
    if (typeof v === 'boolean') {
      return v;
    }

    if (typeof v === 'string') {
      v = v.toLowerCase();
      return !(v === '' || v === 'no' || v === 'false' || v === '0');
    }

    return Boolean(v);
  }

  static toNumber(value) {
    return value === null || value.length === 0 ? undefined : Number(value);
  }

  static parseHeight(val) {
    let h;
    let unit = 'px';

    if (typeof val === 'string') {
      let match = val.match(/^(-[0-9]+\.[0-9]+|[0-9]*\.[0-9]+|-[0-9]+|[0-9]+)(px|em|rem|vh|vw|%)?$/);

      if (!match) {
        throw new Error('Invalid height');
      }

      unit = match[2] || 'px';
      h = parseFloat(match[1]);
    } else {
      h = val;
    }

    return {
      h,
      unit
    };
  }
  /** copies unset fields in target to use the given default sources values */
  // eslint-disable-next-line


  static defaults(target, ...sources) {
    sources.forEach(source => {
      for (const key in source) {
        if (!source.hasOwnProperty(key)) return;

        if (target[key] === null || target[key] === undefined) {
          target[key] = source[key];
        } else if (typeof source[key] === 'object' && typeof target[key] === 'object') {
          // property is an object, recursively add it's field over... #1373
          this.defaults(target[key], source[key]);
        }
      }
    });
    return target;
  }
  /** given 2 objects return true if they have the same values. Checks for Object {} having same fields and values (just 1 level down) */


  static same(a, b) {
    if (typeof a !== 'object') return a == b;
    if (typeof a !== typeof b) return false; // else we have object, check just 1 level deep for being same things...

    if (Object.keys(a).length !== Object.keys(b).length) return false;

    for (const key in a) {
      if (a[key] !== b[key]) return false;
    }

    return true;
  }
  /* copies over b size & position (GridStackPosition), and possibly min/max as well */


  static copyPos(a, b, minMax = false) {
    a.x = b.x;
    a.y = b.y;
    a.w = b.w;
    a.h = b.h;
    if (!minMax) return a;
    if (b.minW) a.minW = b.minW;
    if (b.minH) a.minH = b.minH;
    if (b.maxW) a.maxW = b.maxW;
    if (b.maxH) a.maxH = b.maxH;
    return a;
  }
  /* true if a and b has same size & position */


  static samePos(a, b) {
    return a && b && a.x === b.x && a.y === b.y && a.w === b.w && a.h === b.h;
  }
  /** removes field from the first object if same as the second objects (like diffing) and internal '_' for saving */


  static removeInternalAndSame(a, b) {
    if (typeof a !== 'object' || typeof b !== 'object') return;

    for (let key in a) {
      let val = a[key];

      if (val && typeof val === 'object' && b[key] !== undefined) {
        for (let i in val) {
          if (val[i] === b[key][i] || i[0] === '_') {
            delete val[i];
          }
        }

        if (!Object.keys(val).length) {
          delete a[key];
        }
      } else if (val === b[key] || key[0] === '_') {
        delete a[key];
      }
    }
  }
  /** return the closest parent matching the given class */


  static closestByClass(el, name) {
    while (el = el.parentElement) {
      if (el.classList.contains(name)) return el;
    }

    return null;
  }
  /** delay calling the given function for given delay, preventing new calls from happening while waiting */


  static throttle(func, delay) {
    let isWaiting = false;
    return (...args) => {
      if (!isWaiting) {
        isWaiting = true;
        setTimeout(() => {
          func(...args);
          isWaiting = false;
        }, delay);
      }
    };
  }

  static removePositioningStyles(el) {
    let style = el.style;

    if (style.position) {
      style.removeProperty('position');
    }

    if (style.left) {
      style.removeProperty('left');
    }

    if (style.top) {
      style.removeProperty('top');
    }

    if (style.width) {
      style.removeProperty('width');
    }

    if (style.height) {
      style.removeProperty('height');
    }
  }
  /** @internal returns the passed element if scrollable, else the closest parent that will, up to the entire document scrolling element */


  static getScrollElement(el) {
    if (!el) return document.scrollingElement;
    const style = getComputedStyle(el);
    const overflowRegex = /(auto|scroll)/;

    if (overflowRegex.test(style.overflow + style.overflowY)) {
      return el;
    } else {
      return this.getScrollElement(el.parentElement);
    }
  }
  /** @internal */


  static updateScrollPosition(el, position, distance) {
    // is widget in view?
    let rect = el.getBoundingClientRect();
    let innerHeightOrClientHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top < 0 || rect.bottom > innerHeightOrClientHeight) {
      // set scrollTop of first parent that scrolls
      // if parent is larger than el, set as low as possible
      // to get entire widget on screen
      let offsetDiffDown = rect.bottom - innerHeightOrClientHeight;
      let offsetDiffUp = rect.top;
      let scrollEl = this.getScrollElement(el);

      if (scrollEl !== null) {
        let prevScroll = scrollEl.scrollTop;

        if (rect.top < 0 && distance < 0) {
          // moving up
          if (el.offsetHeight > innerHeightOrClientHeight) {
            scrollEl.scrollTop += distance;
          } else {
            scrollEl.scrollTop += Math.abs(offsetDiffUp) > Math.abs(distance) ? distance : offsetDiffUp;
          }
        } else if (distance > 0) {
          // moving down
          if (el.offsetHeight > innerHeightOrClientHeight) {
            scrollEl.scrollTop += distance;
          } else {
            scrollEl.scrollTop += offsetDiffDown > distance ? distance : offsetDiffDown;
          }
        } // move widget y by amount scrolled


        position.top += scrollEl.scrollTop - prevScroll;
      }
    }
  }
  /**
   * @internal Function used to scroll the page.
   *
   * @param event `MouseEvent` that triggers the resize
   * @param el `HTMLElement` that's being resized
   * @param distance Distance from the V edges to start scrolling
   */


  static updateScrollResize(event, el, distance) {
    const scrollEl = this.getScrollElement(el);
    const height = scrollEl.clientHeight; // #1727 event.clientY is relative to viewport, so must compare this against position of scrollEl getBoundingClientRect().top
    // #1745 Special situation if scrollEl is document 'html': here browser spec states that
    // clientHeight is height of viewport, but getBoundingClientRect() is rectangle of html element;
    // this discrepancy arises because in reality scrollbar is attached to viewport, not html element itself.

    const offsetTop = scrollEl === this.getScrollElement() ? 0 : scrollEl.getBoundingClientRect().top;
    const pointerPosY = event.clientY - offsetTop;
    const top = pointerPosY < distance;
    const bottom = pointerPosY > height - distance;

    if (top) {
      // This also can be done with a timeout to keep scrolling while the mouse is
      // in the scrolling zone. (will have smoother behavior)
      scrollEl.scrollBy({
        behavior: 'smooth',
        top: pointerPosY - distance
      });
    } else if (bottom) {
      scrollEl.scrollBy({
        behavior: 'smooth',
        top: distance - (height - pointerPosY)
      });
    }
  }

}

var Utils_1 = Utils;
var utils = /*#__PURE__*/Object.defineProperty({
  obsolete: obsolete_1,
  obsoleteOpts: obsoleteOpts_1,
  obsoleteOptsDel: obsoleteOptsDel_1,
  obsoleteAttr: obsoleteAttr_1,
  Utils: Utils_1
}, '__esModule', {
  value: true
});

/**
 * gridstack-engine.ts 4.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */

/**
 * Defines the GridStack engine that does most no DOM grid manipulation.
 * See GridStack methods and vars for descriptions.
 *
 * NOTE: values should not be modified directly - call the main GridStack API instead
 */


class GridStackEngine {
  constructor(opts = {}) {
    this.addedNodes = [];
    this.removedNodes = [];
    this.column = opts.column || 12;
    this.onChange = opts.onChange;
    this._float = opts.float;
    this.maxRow = opts.maxRow;
    this.nodes = opts.nodes || [];
  }

  batchUpdate() {
    if (this.batchMode) return this;
    this.batchMode = true;
    this._prevFloat = this._float;
    this._float = true; // let things go anywhere for now... commit() will restore and possibly reposition

    this.saveInitial(); // since begin update (which is called multiple times) won't do this

    return this;
  }

  commit() {
    if (!this.batchMode) return this;
    this.batchMode = false;
    this._float = this._prevFloat;
    delete this._prevFloat;
    return this._packNodes()._notify();
  } // use entire row for hitting area (will use bottom reverse sorted first) if we not actively moving DOWN and didn't already skip


  _useEntireRowArea(node, nn) {
    return !this.float && !this._hasLocked && (!node._moving || node._skipDown || nn.y <= node.y);
  }
  /** @internal fix collision on given 'node', going to given new location 'nn', with optional 'collide' node already found.
   * return true if we moved. */


  _fixCollisions(node, nn = node, collide, opt = {}) {
    this._sortNodes(-1); // from last to first, so recursive collision move items in the right order


    collide = collide || this.collide(node, nn); // REAL area collide for swap and skip if none...

    if (!collide) return false; // swap check: if we're actively moving in gravity mode, see if we collide with an object the same size

    if (node._moving && !opt.nested && !this.float) {
      if (this.swap(node, collide)) return true;
    } // during while() collisions MAKE SURE to check entire row so larger items don't leap frog small ones (push them all down starting last in grid)


    let area = nn;

    if (this._useEntireRowArea(node, nn)) {
      area = {
        x: 0,
        w: this.column,
        y: nn.y,
        h: nn.h
      };
      collide = this.collide(node, area, opt.skip); // force new hit
    }

    let didMove = false;
    let newOpt = {
      nested: true,
      pack: false
    };

    while (collide = collide || this.collide(node, area, opt.skip)) {
      // could collide with more than 1 item... so repeat for each
      let moved; // if colliding with a locked item OR moving down with top gravity (and collide could move up) -> skip past the collide,
      // but remember that skip down so we only do this once (and push others otherwise).

      if (collide.locked || node._moving && !node._skipDown && nn.y > node.y && !this.float && ( // can take space we had, or before where we're going
      !this.collide(collide, Object.assign(Object.assign({}, collide), {
        y: node.y
      }), node) || !this.collide(collide, Object.assign(Object.assign({}, collide), {
        y: nn.y - collide.h
      }), node))) {
        node._skipDown = node._skipDown || nn.y > node.y;
        moved = this.moveNode(node, Object.assign(Object.assign(Object.assign({}, nn), {
          y: collide.y + collide.h
        }), newOpt));

        if (collide.locked && moved) {
          utils.Utils.copyPos(nn, node); // moving after lock become our new desired location
        } else if (!collide.locked && moved && opt.pack) {
          // we moved after and will pack: do it now and keep the original drop location, but past the old collide to see what else we might push way
          this._packNodes();

          nn.y = collide.y + collide.h;
          utils.Utils.copyPos(node, nn);
        }

        didMove = didMove || moved;
      } else {
        // move collide down *after* where we will be, ignoring where we are now (don't collide with us)
        moved = this.moveNode(collide, Object.assign(Object.assign(Object.assign({}, collide), {
          y: nn.y + nn.h,
          skip: node
        }), newOpt));
      }

      if (!moved) {
        return didMove;
      } // break inf loop if we couldn't move after all (ex: maxRow, fixed)


      collide = undefined;
    }

    return didMove;
  }
  /** return the nodes that intercept the given node. Optionally a different area can be used, as well as a second node to skip */


  collide(skip, area = skip, skip2) {
    return this.nodes.find(n => n !== skip && n !== skip2 && utils.Utils.isIntercepted(n, area));
  }

  collideAll(skip, area = skip, skip2) {
    return this.nodes.filter(n => n !== skip && n !== skip2 && utils.Utils.isIntercepted(n, area));
  }
  /** does a pixel coverage collision, returning the node that has the most coverage that is >50% mid line */


  collideCoverage(node, o, collides) {
    if (!o.rect || !node._rect) return;
    let r0 = node._rect; // where started

    let r = Object.assign({}, o.rect); // where we are
    // update dragged rect to show where it's coming from (above or below, etc...)

    if (r.y > r0.y) {
      r.h += r.y - r0.y;
      r.y = r0.y;
    } else {
      r.h += r0.y - r.y;
    }

    if (r.x > r0.x) {
      r.w += r.x - r0.x;
      r.x = r0.x;
    } else {
      r.w += r0.x - r.x;
    }

    let collide;
    collides.forEach(n => {
      if (n.locked || !n._rect) return;
      let r2 = n._rect; // overlapping target

      let yOver = Number.MAX_VALUE,
          xOver = Number.MAX_VALUE,
          overMax = 0.5; // need >50%
      // depending on which side we started from, compute the overlap % of coverage
      // (ex: from above/below we only compute the max horizontal line coverage)

      if (r0.y < r2.y) {
        // from above
        yOver = (r.y + r.h - r2.y) / r2.h;
      } else if (r0.y + r0.h > r2.y + r2.h) {
        // from below
        yOver = (r2.y + r2.h - r.y) / r2.h;
      }

      if (r0.x < r2.x) {
        // from the left
        xOver = (r.x + r.w - r2.x) / r2.w;
      } else if (r0.x + r0.w > r2.x + r2.w) {
        // from the right
        xOver = (r2.x + r2.w - r.x) / r2.w;
      }

      let over = Math.min(xOver, yOver);

      if (over > overMax) {
        overMax = over;
        collide = n;
      }
    });
    return collide;
  }
  /** called to cache the nodes pixel rectangles used for collision detection during drag */


  cacheRects(w, h, top, right, bottom, left) {
    this.nodes.forEach(n => n._rect = {
      y: n.y * h + top,
      x: n.x * w + left,
      w: n.w * w - left - right,
      h: n.h * h - top - bottom
    });
    return this;
  }
  /** called to possibly swap between 2 nodes (same size or column, not locked, touching), returning true if successful */


  swap(a, b) {
    if (!b || b.locked || !a || a.locked) return false;

    function _doSwap() {
      let x = b.x,
          y = b.y;
      b.x = a.x;
      b.y = a.y; // b -> a position

      if (a.h != b.h) {
        a.x = x;
        a.y = b.y + b.h; // a -> goes after b
      } else {
        a.x = x;
        a.y = y; // a -> old b position
      }

      a._dirty = b._dirty = true;
      return true;
    }

    let touching; // remember if we called it (vs undefined)
    // same size and same row or column, and touching

    if (a.w === b.w && a.h === b.h && (a.x === b.x || a.y === b.y) && (touching = utils.Utils.isTouching(a, b))) return _doSwap();
    if (touching === false) return; // ran test and fail, bail out
    // check for taking same columns (but different height) and touching

    if (a.w === b.w && a.x === b.x && (touching || utils.Utils.isTouching(a, b))) {
      if (b.y < a.y) {
        let t = a;
        a = b;
        b = t;
      } // swap a <-> b vars so a is first


      return _doSwap();
    }
    /* different X will be weird (expect vertical swap) and different height overlap, so too complex. user regular layout instead
    // else check if swapping would not collide with anything else (requiring a re-layout)
    if (!this.collide(a, {x: a.x, y: a.y, w: b.w, h: b.h}, b) &&
        !this.collide(a, {x: b.x, y: b.y, w: a.w, h: a.h}, b))
      return _doSwap(); */


    return false;
  }

  isAreaEmpty(x, y, w, h) {
    let nn = {
      x: x || 0,
      y: y || 0,
      w: w || 1,
      h: h || 1
    };
    return !this.collide(nn);
  }
  /** re-layout grid items to reclaim any empty space */


  compact() {
    if (this.nodes.length === 0) return this;

    this.batchUpdate()._sortNodes();

    let copyNodes = this.nodes;
    this.nodes = []; // pretend we have no nodes to conflict layout to start with...

    copyNodes.forEach(node => {
      if (!node.locked) {
        node.autoPosition = true;
      }

      this.addNode(node, false); // 'false' for add event trigger

      node._dirty = true; // will force attr update
    });
    return this.commit();
  }
  /** enable/disable floating widgets (default: `false`) See [example](http://gridstackjs.com/demo/float.html) */


  set float(val) {
    if (this._float === val) return;
    this._float = val || false;

    if (!val) {
      this._packNodes()._notify();
    }
  }
  /** float getter method */


  get float() {
    return this._float || false;
  }
  /** @internal */


  _sortNodes(dir) {
    this.nodes = utils.Utils.sort(this.nodes, dir, this.column);
    return this;
  }
  /** @internal called to top gravity pack the items back OR revert back to original Y positions when floating */


  _packNodes() {
    this._sortNodes(); // first to last


    if (this.float) {
      // restore original Y pos
      this.nodes.forEach(n => {
        if (n._updating || n._orig === undefined || n.y === n._orig.y) return;
        let newY = n.y;

        while (newY > n._orig.y) {
          --newY;
          let collide = this.collide(n, {
            x: n.x,
            y: newY,
            w: n.w,
            h: n.h
          });

          if (!collide) {
            n._dirty = true;
            n.y = newY;
          }
        }
      });
    } else {
      // top gravity pack
      this.nodes.forEach((n, i) => {
        if (n.locked) return;

        while (n.y > 0) {
          let newY = i === 0 ? 0 : n.y - 1;
          let canBeMoved = i === 0 || !this.collide(n, {
            x: n.x,
            y: newY,
            w: n.w,
            h: n.h
          });
          if (!canBeMoved) break; // Note: must be dirty (from last position) for GridStack::OnChange CB to update positions
          // and move items back. The user 'change' CB should detect changes from the original
          // starting position instead.

          n._dirty = n.y !== newY;
          n.y = newY;
        }
      });
    }

    return this;
  }
  /**
   * given a random node, makes sure it's coordinates/values are valid in the current grid
   * @param node to adjust
   * @param resizing if out of bound, resize down or move into the grid to fit ?
   */


  prepareNode(node, resizing) {
    node = node || {};
    node._id = node._id || GridStackEngine._idSeq++; // if we're missing position, have the grid position us automatically (before we set them to 0,0)

    if (node.x === undefined || node.y === undefined || node.x === null || node.y === null) {
      node.autoPosition = true;
    } // assign defaults for missing required fields


    let defaults = {
      x: 0,
      y: 0,
      w: 1,
      h: 1
    };
    utils.Utils.defaults(node, defaults);

    if (!node.autoPosition) {
      delete node.autoPosition;
    }

    if (!node.noResize) {
      delete node.noResize;
    }

    if (!node.noMove) {
      delete node.noMove;
    } // check for NaN (in case messed up strings were passed. can't do parseInt() || defaults.x above as 0 is valid #)


    if (typeof node.x == 'string') {
      node.x = Number(node.x);
    }

    if (typeof node.y == 'string') {
      node.y = Number(node.y);
    }

    if (typeof node.w == 'string') {
      node.w = Number(node.w);
    }

    if (typeof node.h == 'string') {
      node.h = Number(node.h);
    }

    if (isNaN(node.x)) {
      node.x = defaults.x;
      node.autoPosition = true;
    }

    if (isNaN(node.y)) {
      node.y = defaults.y;
      node.autoPosition = true;
    }

    if (isNaN(node.w)) {
      node.w = defaults.w;
    }

    if (isNaN(node.h)) {
      node.h = defaults.h;
    }

    return this.nodeBoundFix(node, resizing);
  }
  /** part2 of preparing a node to fit inside our grid - checks  for x,y from grid dimensions */


  nodeBoundFix(node, resizing) {
    if (node.maxW) {
      node.w = Math.min(node.w, node.maxW);
    }

    if (node.maxH) {
      node.h = Math.min(node.h, node.maxH);
    }

    if (node.minW) {
      node.w = Math.max(node.w, node.minW);
    }

    if (node.minH) {
      node.h = Math.max(node.h, node.minH);
    }

    if (node.w > this.column) {
      // if user loaded a larger than allowed widget for current # of columns,
      // remember it's full width so we can restore back (1 -> 12 column) #1655
      if (this.column < 12) {
        node.w = Math.min(12, node.w);
        this.cacheOneLayout(node, 12);
      }

      node.w = this.column;
    } else if (node.w < 1) {
      node.w = 1;
    }

    if (this.maxRow && node.h > this.maxRow) {
      node.h = this.maxRow;
    } else if (node.h < 1) {
      node.h = 1;
    }

    if (node.x < 0) {
      node.x = 0;
    }

    if (node.y < 0) {
      node.y = 0;
    }

    if (node.x + node.w > this.column) {
      if (resizing) {
        node.w = this.column - node.x;
      } else {
        node.x = this.column - node.w;
      }
    }

    if (this.maxRow && node.y + node.h > this.maxRow) {
      if (resizing) {
        node.h = this.maxRow - node.y;
      } else {
        node.y = this.maxRow - node.h;
      }
    }

    return node;
  }

  getDirtyNodes(verify) {
    // compare original x,y,w,h instead as _dirty can be a temporary state
    if (verify) {
      return this.nodes.filter(n => n._dirty && !utils.Utils.samePos(n, n._orig));
    }

    return this.nodes.filter(n => n._dirty);
  }
  /** @internal call this to call onChange CB with dirty nodes */


  _notify(nodes, removeDOM = true) {
    if (this.batchMode) return this;
    nodes = nodes === undefined ? [] : Array.isArray(nodes) ? nodes : [nodes];
    let dirtyNodes = nodes.concat(this.getDirtyNodes());
    this.onChange && this.onChange(dirtyNodes, removeDOM);
    return this;
  }
  /** @internal remove dirty and last tried info */


  cleanNodes() {
    if (this.batchMode) return this;
    this.nodes.forEach(n => {
      delete n._dirty;
      delete n._lastTried;
    });
    return this;
  }
  /** @internal called to save initial position/size to track real dirty state.
   * Note: should be called right after we call change event (so next API is can detect changes)
   * as well as right before we start move/resize/enter (so we can restore items to prev values) */


  saveInitial() {
    this.nodes.forEach(n => {
      n._orig = utils.Utils.copyPos({}, n);
      delete n._dirty;
    });
    this._hasLocked = this.nodes.some(n => n.locked);
    return this;
  }
  /** @internal restore all the nodes back to initial values (called when we leave) */


  restoreInitial() {
    this.nodes.forEach(n => {
      if (utils.Utils.samePos(n, n._orig)) return;
      utils.Utils.copyPos(n, n._orig);
      n._dirty = true;
    });

    this._notify();

    return this;
  }
  /** call to add the given node to our list, fixing collision and re-packing */


  addNode(node, triggerAddEvent = false) {
    let dup;
    if (dup = this.nodes.find(n => n._id === node._id)) return dup; // prevent inserting twice! return it instead.

    node = this.prepareNode(node);
    delete node._temporaryRemoved;
    delete node._removeDOM;

    if (node.autoPosition) {
      this._sortNodes();

      for (let i = 0;; ++i) {
        let x = i % this.column;
        let y = Math.floor(i / this.column);

        if (x + node.w > this.column) {
          continue;
        }

        let box = {
          x,
          y,
          w: node.w,
          h: node.h
        };

        if (!this.nodes.find(n => utils.Utils.isIntercepted(box, n))) {
          node.x = x;
          node.y = y;
          delete node.autoPosition; // found our slot

          break;
        }
      }
    }

    this.nodes.push(node);
    triggerAddEvent && this.addedNodes.push(node);

    this._fixCollisions(node);

    this._packNodes()._notify();

    return node;
  }

  removeNode(node, removeDOM = true, triggerEvent = false) {
    if (!this.nodes.find(n => n === node)) {
      // TEST console.log(`Error: GridStackEngine.removeNode() node._id=${node._id} not found!`)
      return this;
    }

    if (triggerEvent) {
      // we wait until final drop to manually track removed items (rather than during drag)
      this.removedNodes.push(node);
    }

    if (removeDOM) node._removeDOM = true; // let CB remove actual HTML (used to set _id to null, but then we loose layout info)
    // don't use 'faster' .splice(findIndex(),1) in case node isn't in our list, or in multiple times.

    this.nodes = this.nodes.filter(n => n !== node);
    return this._packNodes()._notify(node);
  }

  removeAll(removeDOM = true) {
    delete this._layouts;
    if (this.nodes.length === 0) return this;
    removeDOM && this.nodes.forEach(n => n._removeDOM = true); // let CB remove actual HTML (used to set _id to null, but then we loose layout info)

    this.removedNodes = this.nodes;
    this.nodes = [];
    return this._notify(this.removedNodes);
  }
  /** checks if item can be moved (layout constrain) vs moveNode(), returning true if was able to move.
   * In more complicated cases (maxRow) it will attempt at moving the item and fixing
   * others in a clone first, then apply those changes if still within specs. */


  moveNodeCheck(node, o) {
    if (node.locked) return false;
    if (!this.changedPosConstrain(node, o)) return false;
    o.pack = true; // simpler case: move item directly...

    if (!this.maxRow
    /* && !this._hasLocked*/
    ) {
      return this.moveNode(node, o);
    } // complex case: create a clone with NO maxRow (will check for out of bounds at the end)


    let clonedNode;
    let clone = new GridStackEngine({
      column: this.column,
      float: this.float,
      nodes: this.nodes.map(n => {
        if (n === node) {
          clonedNode = Object.assign({}, n);
          return clonedNode;
        }

        return Object.assign({}, n);
      })
    });
    if (!clonedNode) return false;
    let canMove = clone.moveNode(clonedNode, o); // if maxRow make sure we are still valid size

    if (this.maxRow && canMove) {
      canMove = clone.getRow() <= this.maxRow; // turns out we can't grow, then see if we can swap instead (ex: full grid)

      if (!canMove) {
        let collide = this.collide(node, o);

        if (collide && this.swap(node, collide)) {
          this._notify();

          return true;
        }
      }
    }

    if (!canMove) return false; // if clone was able to move, copy those mods over to us now instead of caller trying to do this all over!
    // Note: we can't use the list directly as elements and other parts point to actual node, so copy content

    clone.nodes.filter(n => n._dirty).forEach(c => {
      let n = this.nodes.find(a => a._id === c._id);
      if (!n) return;
      utils.Utils.copyPos(n, c);
      n._dirty = true;
    });

    this._notify();

    return true;
  }
  /** return true if can fit in grid height constrain only (always true if no maxRow) */


  willItFit(node) {
    delete node._willFitPos;
    if (!this.maxRow) return true; // create a clone with NO maxRow and check if still within size

    let clone = new GridStackEngine({
      column: this.column,
      float: this.float,
      nodes: this.nodes.map(n => {
        return Object.assign({}, n);
      })
    });
    let n = Object.assign({}, node); // clone node so we don't mod any settings on it but have full autoPosition and min/max as well! #1687

    this.cleanupNode(n);
    delete n.el;
    delete n._id;
    delete n.content;
    delete n.grid;
    clone.addNode(n);

    if (clone.getRow() <= this.maxRow) {
      node._willFitPos = utils.Utils.copyPos({}, n);
      return true;
    }

    return false;
  }
  /** true if x,y or w,h are different after clamping to min/max */


  changedPosConstrain(node, p) {
    // make sure w,h are set
    p.w = p.w || node.w;
    p.h = p.h || node.h;
    if (node.x !== p.x || node.y !== p.y) return true; // check constrained w,h

    if (node.maxW) {
      p.w = Math.min(p.w, node.maxW);
    }

    if (node.maxH) {
      p.h = Math.min(p.h, node.maxH);
    }

    if (node.minW) {
      p.w = Math.max(p.w, node.minW);
    }

    if (node.minH) {
      p.h = Math.max(p.h, node.minH);
    }

    return node.w !== p.w || node.h !== p.h;
  }
  /** return true if the passed in node was actually moved (checks for no-op and locked) */


  moveNode(node, o) {
    if (!node || node.locked || !o) return false;
    if (o.pack === undefined) o.pack = true; // constrain the passed in values and check if we're still changing our node

    if (typeof o.x !== 'number') {
      o.x = node.x;
    }

    if (typeof o.y !== 'number') {
      o.y = node.y;
    }

    if (typeof o.w !== 'number') {
      o.w = node.w;
    }

    if (typeof o.h !== 'number') {
      o.h = node.h;
    }

    let resizing = node.w !== o.w || node.h !== o.h;
    let nn = utils.Utils.copyPos({}, node, true); // get min/max out first, then opt positions next

    utils.Utils.copyPos(nn, o);
    nn = this.nodeBoundFix(nn, resizing);
    utils.Utils.copyPos(o, nn);
    if (utils.Utils.samePos(node, o)) return false;
    let prevPos = utils.Utils.copyPos({}, node); // during while() collisions make sure to check entire row so larger items don't leap frog small ones (push them all down)

    let area = nn; // if (this._useEntireRowArea(node, nn)) {
    //   area = {x: 0, w: this.column, y: nn.y, h: nn.h};
    // }
    // check if we will need to fix collision at our new location

    let collides = this.collideAll(node, area, o.skip);
    let needToMove = true;

    if (collides.length) {
      // now check to make sure we actually collided over 50% surface area while dragging
      let collide = node._moving && !o.nested ? this.collideCoverage(node, o, collides) : collides[0];

      if (collide) {
        needToMove = !this._fixCollisions(node, nn, collide, o); // check if already moved...
      } else {
        needToMove = false; // we didn't cover >50% for a move, skip...
      }
    } // now move (to the original ask vs the collision version which might differ) and repack things


    if (needToMove) {
      node._dirty = true;
      utils.Utils.copyPos(node, nn);
    }

    if (o.pack) {
      this._packNodes()._notify();
    }

    return !utils.Utils.samePos(node, prevPos); // pack might have moved things back
  }

  getRow() {
    return this.nodes.reduce((row, n) => Math.max(row, n.y + n.h), 0);
  }

  beginUpdate(node) {
    if (!node._updating) {
      node._updating = true;
      delete node._skipDown;
      if (!this.batchMode) this.saveInitial();
    }

    return this;
  }

  endUpdate() {
    let n = this.nodes.find(n => n._updating);

    if (n) {
      delete n._updating;
      delete n._skipDown;
    }

    return this;
  }
  /** saves the current layout returning a list of widgets for serialization */


  save(saveElement = true) {
    let widgets = [];

    this._sortNodes();

    this.nodes.forEach(n => {
      let w = {};

      for (let key in n) {
        if (key[0] !== '_' && n[key] !== null && n[key] !== undefined) w[key] = n[key];
      } // delete other internals


      if (!saveElement) delete w.el;
      delete w.grid; // delete default values (will be re-created on read)

      if (!w.autoPosition) delete w.autoPosition;
      if (!w.noResize) delete w.noResize;
      if (!w.noMove) delete w.noMove;
      if (!w.locked) delete w.locked;
      widgets.push(w);
    });
    return widgets;
  }
  /** @internal called whenever a node is added or moved - updates the cached layouts */


  layoutsNodesChange(nodes) {
    if (!this._layouts || this._ignoreLayoutsNodeChange) return this; // remove smaller layouts - we will re-generate those on the fly... larger ones need to update

    this._layouts.forEach((layout, column) => {
      if (!layout || column === this.column) return this;

      if (column < this.column) {
        this._layouts[column] = undefined;
      } else {
        // we save the original x,y,w (h isn't cached) to see what actually changed to propagate better.
        // Note: we don't need to check against out of bound scaling/moving as that will be done when using those cache values.
        nodes.forEach(node => {
          if (!node._orig) return; // didn't change (newly added ?)

          let n = layout.find(l => l._id === node._id);
          if (!n) return; // no cache for new nodes. Will use those values.

          let ratio = column / this.column; // Y changed, push down same amount
          // TODO: detect doing item 'swaps' will help instead of move (especially in 1 column mode)

          if (node.y !== node._orig.y) {
            n.y += node.y - node._orig.y;
          } // X changed, scale from new position


          if (node.x !== node._orig.x) {
            n.x = Math.round(node.x * ratio);
          } // width changed, scale from new width


          if (node.w !== node._orig.w) {
            n.w = Math.round(node.w * ratio);
          } // ...height always carries over from cache

        });
      }
    });

    return this;
  }
  /**
   * @internal Called to scale the widget width & position up/down based on the column change.
   * Note we store previous layouts (especially original ones) to make it possible to go
   * from say 12 -> 1 -> 12 and get back to where we were.
   *
   * @param oldColumn previous number of columns
   * @param column  new column number
   * @param nodes different sorted list (ex: DOM order) instead of current list
   * @param layout specify the type of re-layout that will happen (position, size, etc...).
   * Note: items will never be outside of the current column boundaries. default (moveScale). Ignored for 1 column
   */


  updateNodeWidths(oldColumn, column, nodes, layout = 'moveScale') {
    if (!this.nodes.length || oldColumn === column) return this; // cache the current layout in case they want to go back (like 12 -> 1 -> 12) as it requires original data

    this.cacheLayout(this.nodes, oldColumn); // if we're going to 1 column and using DOM order rather than default sorting, then generate that layout

    if (column === 1 && nodes && nodes.length) {
      let top = 0;
      nodes.forEach(n => {
        n.x = 0;
        n.w = 1;
        n.y = Math.max(n.y, top);
        top = n.y + n.h;
      });
    } else {
      nodes = utils.Utils.sort(this.nodes, -1, oldColumn); // current column reverse sorting so we can insert last to front (limit collision)
    } // see if we have cached previous layout.


    let cacheNodes = this._layouts[column] || []; // if not AND we are going up in size start with the largest layout as down-scaling is more accurate

    let lastIndex = this._layouts.length - 1;

    if (cacheNodes.length === 0 && column > oldColumn && column < lastIndex) {
      cacheNodes = this._layouts[lastIndex] || [];

      if (cacheNodes.length) {
        // pretend we came from that larger column by assigning those values as starting point
        oldColumn = lastIndex;
        cacheNodes.forEach(cacheNode => {
          let j = nodes.findIndex(n => n._id === cacheNode._id);

          if (j !== -1) {
            // still current, use cache info positions
            nodes[j].x = cacheNode.x;
            nodes[j].y = cacheNode.y;
            nodes[j].w = cacheNode.w;
          }
        });
        cacheNodes = []; // we still don't have new column cached data... will generate from larger one.
      }
    } // if we found cache re-use those nodes that are still current


    let newNodes = [];
    cacheNodes.forEach(cacheNode => {
      let j = nodes.findIndex(n => n._id === cacheNode._id);

      if (j !== -1) {
        // still current, use cache info positions
        nodes[j].x = cacheNode.x;
        nodes[j].y = cacheNode.y;
        nodes[j].w = cacheNode.w;
        newNodes.push(nodes[j]);
        nodes.splice(j, 1);
      }
    }); // ...and add any extra non-cached ones

    if (nodes.length) {
      if (typeof layout === 'function') {
        layout(column, oldColumn, newNodes, nodes);
      } else {
        let ratio = column / oldColumn;
        let move = layout === 'move' || layout === 'moveScale';
        let scale = layout === 'scale' || layout === 'moveScale';
        nodes.forEach(node => {
          node.x = column === 1 ? 0 : move ? Math.round(node.x * ratio) : Math.min(node.x, column - 1);
          node.w = column === 1 || oldColumn === 1 ? 1 : scale ? Math.round(node.w * ratio) || 1 : Math.min(node.w, column);
          newNodes.push(node);
        });
        nodes = [];
      }
    } // finally re-layout them in reverse order (to get correct placement)


    newNodes = utils.Utils.sort(newNodes, -1, column);
    this._ignoreLayoutsNodeChange = true;
    this.batchUpdate();
    this.nodes = []; // pretend we have no nodes to start with (we use same structures) to simplify layout

    newNodes.forEach(node => {
      this.addNode(node, false); // 'false' for add event trigger

      node._dirty = true; // force attr update
    }, this);
    this.commit();
    delete this._ignoreLayoutsNodeChange;
    return this;
  }
  /**
   * call to cache the given layout internally to the given location so we can restore back when column changes size
   * @param nodes list of nodes
   * @param column corresponding column index to save it under
   * @param clear if true, will force other caches to be removed (default false)
   */


  cacheLayout(nodes, column, clear = false) {
    let copy = [];
    nodes.forEach((n, i) => {
      n._id = n._id || GridStackEngine._idSeq++; // make sure we have an id in case this is new layout, else re-use id already set

      copy[i] = {
        x: n.x,
        y: n.y,
        w: n.w,
        _id: n._id
      }; // only thing we change is x,y,w and id to find it back
    });
    this._layouts = clear ? [] : this._layouts || []; // use array to find larger quick

    this._layouts[column] = copy;
    return this;
  }
  /**
   * call to cache the given node layout internally to the given location so we can restore back when column changes size
   * @param node single node to cache
   * @param column corresponding column index to save it under
   */


  cacheOneLayout(n, column) {
    n._id = n._id || GridStackEngine._idSeq++;
    let layout = {
      x: n.x,
      y: n.y,
      w: n.w,
      _id: n._id
    };
    this._layouts = this._layouts || [];
    this._layouts[column] = this._layouts[column] || [];

    let index = this._layouts[column].findIndex(l => l._id === n._id);

    index === -1 ? this._layouts[column].push(layout) : this._layouts[column][index] = layout;
    return this;
  }
  /** called to remove all internal values but the _id */


  cleanupNode(node) {
    for (let prop in node) {
      if (prop[0] === '_' && prop !== '_id') delete node[prop];
    }

    return this;
  }

}

var GridStackEngine_1 = GridStackEngine;
/** @internal unique global internal _id counter NOT starting at 0 */

GridStackEngine._idSeq = 1;
var gridstackEngine = /*#__PURE__*/Object.defineProperty({
  GridStackEngine: GridStackEngine_1
}, '__esModule', {
  value: true
});

/**
 * gridstack-ddi.ts 4.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */

/**
 * Abstract Partial Interface API for drag'n'drop plugin - look at GridStackDD and HTML5 / Jquery implementation versions
 */

class GridStackDDI {
  /** call this method to register your plugin instead of the default no-op one */
  static registerPlugin(pluginClass) {
    GridStackDDI.ddi = new pluginClass();
    return GridStackDDI.ddi;
  }
  /** get the current registered plugin to use */


  static get() {
    return GridStackDDI.ddi || GridStackDDI.registerPlugin(GridStackDDI);
  }
  /** removes any drag&drop present (called during destroy) */

  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */


  remove(el) {
    return this; // no-op for static grids
  }

}

var GridStackDDI_1 = GridStackDDI;
var gridstackDdi = /*#__PURE__*/Object.defineProperty({
  GridStackDDI: GridStackDDI_1
}, '__esModule', {
  value: true
});

var gridstack = createCommonjsModule(function (module, exports) {
  /*!
   * GridStack 4.2.3
   * https://gridstackjs.com/
   *
   * Copyright (c) 2021 Alain Dumesny
   * see root license https://github.com/gridstack/gridstack.js/tree/master/LICENSE
   */

  function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  __export(utils);

  __export(gridstackEngine);

  __export(gridstackDdi); // default values for grid options - used during init and when saving out


  const GridDefaults = {
    column: 12,
    minRow: 0,
    maxRow: 0,
    itemClass: 'grid-stack-item',
    placeholderClass: 'grid-stack-placeholder',
    placeholderText: '',
    handle: '.grid-stack-item-content',
    handleClass: null,
    styleInHead: false,
    cellHeight: 'auto',
    cellHeightThrottle: 100,
    margin: 10,
    auto: true,
    minWidth: 768,
    float: false,
    staticGrid: false,
    animate: true,
    alwaysShowResizeHandle: false,
    resizable: {
      autoHide: true,
      handles: 'se'
    },
    draggable: {
      handle: '.grid-stack-item-content',
      scroll: false,
      appendTo: 'body'
    },
    disableDrag: false,
    disableResize: false,
    rtl: 'auto',
    removable: false,
    removableOptions: {
      accept: '.grid-stack-item'
    },
    marginUnit: 'px',
    cellHeightUnit: 'px',
    disableOneColumnMode: false,
    oneColumnModeDomSort: false
  };
  /**
   * Main gridstack class - you will need to call `GridStack.init()` first to initialize your grid.
   * Note: your grid elements MUST have the following classes for the CSS layout to work:
   * @example
   * <div class="grid-stack">
   *   <div class="grid-stack-item">
   *     <div class="grid-stack-item-content">Item 1</div>
   *   </div>
   * </div>
   */

  class GridStack {
    /**
     * Construct a grid item from the given element and options
     * @param el
     * @param opts
     */
    constructor(el, opts = {}) {
      /** @internal */
      this._gsEventHandler = {};
      /** @internal extra row added when dragging at the bottom of the grid */

      this._extraDragRow = 0;
      this.el = el; // exposed HTML element to the user

      opts = opts || {}; // handles null/undefined/0
      // if row property exists, replace minRow and maxRow instead

      if (opts.row) {
        opts.minRow = opts.maxRow = opts.row;
        delete opts.row;
      }

      let rowAttr = utils.Utils.toNumber(el.getAttribute('gs-row')); // elements attributes override any passed options (like CSS style) - merge the two together

      let defaults = Object.assign(Object.assign({}, GridDefaults), {
        column: utils.Utils.toNumber(el.getAttribute('gs-column')) || 12,
        minRow: rowAttr ? rowAttr : utils.Utils.toNumber(el.getAttribute('gs-min-row')) || 0,
        maxRow: rowAttr ? rowAttr : utils.Utils.toNumber(el.getAttribute('gs-max-row')) || 0,
        staticGrid: utils.Utils.toBool(el.getAttribute('gs-static')) || false,
        _styleSheetClass: 'grid-stack-instance-' + (Math.random() * 10000).toFixed(0),
        alwaysShowResizeHandle: opts.alwaysShowResizeHandle || false,
        resizable: {
          autoHide: !(opts.alwaysShowResizeHandle || false),
          handles: 'se'
        },
        draggable: {
          handle: (opts.handleClass ? '.' + opts.handleClass : opts.handle ? opts.handle : '') || '.grid-stack-item-content',
          scroll: false,
          appendTo: 'body'
        },
        removableOptions: {
          accept: '.' + (opts.itemClass || 'grid-stack-item')
        }
      });

      if (el.getAttribute('gs-animate')) {
        // default to true, but if set to false use that instead
        defaults.animate = utils.Utils.toBool(el.getAttribute('gs-animate'));
      }

      this.opts = utils.Utils.defaults(opts, defaults);
      opts = null; // make sure we use this.opts instead

      this.initMargin(); // part of settings defaults...
      // Now check if we're loading into 1 column mode FIRST so we don't do un-necessary work (like cellHeight = width / 12 then go 1 column)

      if (this.opts.column !== 1 && !this.opts.disableOneColumnMode && this._widthOrContainer() <= this.opts.minWidth) {
        this._prevColumn = this.opts.column;
        this.opts.column = 1;
      }

      if (this.opts.rtl === 'auto') {
        this.opts.rtl = el.style.direction === 'rtl';
      }

      if (this.opts.rtl) {
        this.el.classList.add('grid-stack-rtl');
      } // check if we're been nested, and if so update our style and keep pointer around (used during save)


      let parentGridItemEl = utils.Utils.closestByClass(this.el, GridDefaults.itemClass);

      if (parentGridItemEl && parentGridItemEl.gridstackNode) {
        this.opts._isNested = parentGridItemEl.gridstackNode;
        this.opts._isNested.subGrid = this;
        this.el.classList.add('grid-stack-nested');
      }

      this._isAutoCellHeight = this.opts.cellHeight === 'auto';

      if (this._isAutoCellHeight || this.opts.cellHeight === 'initial') {
        // make the cell content square initially (will use resize/column event to keep it square)
        this.cellHeight(undefined, false);
      } else {
        this.cellHeight(this.opts.cellHeight, false);
      }

      this.el.classList.add(this.opts._styleSheetClass);

      this._setStaticClass();

      this.engine = new gridstackEngine.GridStackEngine({
        column: this.opts.column,
        float: this.opts.float,
        maxRow: this.opts.maxRow,
        onChange: cbNodes => {
          let maxH = 0;
          this.engine.nodes.forEach(n => {
            maxH = Math.max(maxH, n.y + n.h);
          });
          cbNodes.forEach(n => {
            let el = n.el;

            if (n._removeDOM) {
              if (el) el.remove();
              delete n._removeDOM;
            } else {
              this._writePosAttr(el, n);
            }
          });

          this._updateStyles(false, maxH); // false = don't recreate, just append if need be

        }
      });

      if (this.opts.auto) {
        this.batchUpdate(); // prevent in between re-layout #1535 TODO: this only set float=true, need to prevent collision check...

        let elements = [];
        this.getGridItems().forEach(el => {
          let x = parseInt(el.getAttribute('gs-x'));
          let y = parseInt(el.getAttribute('gs-y'));
          elements.push({
            el,
            // if x,y are missing (autoPosition) add them to end of list - but keep their respective DOM order
            i: (Number.isNaN(x) ? 1000 : x) + (Number.isNaN(y) ? 1000 : y) * this.opts.column
          });
        });
        elements.sort((a, b) => a.i - b.i).forEach(e => this._prepareElement(e.el));
        this.commit();
      }

      this.setAnimation(this.opts.animate);

      this._updateStyles();

      if (this.opts.column != 12) {
        this.el.classList.add('grid-stack-' + this.opts.column);
      } // legacy support to appear 'per grid` options when really global.


      if (this.opts.dragIn) GridStack.setupDragIn(this.opts.dragIn, this.opts.dragInOptions);
      delete this.opts.dragIn;
      delete this.opts.dragInOptions;

      this._setupRemoveDrop();

      this._setupAcceptWidget();

      this._updateWindowResizeEvent();
    }
    /**
     * initializing the HTML element, or selector string, into a grid will return the grid. Calling it again will
     * simply return the existing instance (ignore any passed options). There is also an initAll() version that support
     * multiple grids initialization at once. Or you can use addGrid() to create the entire grid from JSON.
     * @param options grid options (optional)
     * @param elOrString element or CSS selector (first one used) to convert to a grid (default to '.grid-stack' class selector)
     *
     * @example
     * let grid = GridStack.init();
     *
     * Note: the HTMLElement (of type GridHTMLElement) will store a `gridstack: GridStack` value that can be retrieve later
     * let grid = document.querySelector('.grid-stack').gridstack;
     */


    static init(options = {}, elOrString = '.grid-stack') {
      let el = GridStack.getGridElement(elOrString);

      if (!el) {
        if (typeof elOrString === 'string') {
          console.error('GridStack.initAll() no grid was found with selector "' + elOrString + '" - element missing or wrong selector ?' + '\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.');
        } else {
          console.error('GridStack.init() no grid element was passed.');
        }

        return null;
      }

      if (!el.gridstack) {
        el.gridstack = new GridStack(el, Object.assign({}, options));
      }

      return el.gridstack;
    }
    /**
     * Will initialize a list of elements (given a selector) and return an array of grids.
     * @param options grid options (optional)
     * @param selector elements selector to convert to grids (default to '.grid-stack' class selector)
     *
     * @example
     * let grids = GridStack.initAll();
     * grids.forEach(...)
     */


    static initAll(options = {}, selector = '.grid-stack') {
      let grids = [];
      GridStack.getGridElements(selector).forEach(el => {
        if (!el.gridstack) {
          el.gridstack = new GridStack(el, Object.assign({}, options));
          delete options.dragIn;
          delete options.dragInOptions; // only need to be done once (really a static global thing, not per grid)
        }

        grids.push(el.gridstack);
      });

      if (grids.length === 0) {
        console.error('GridStack.initAll() no grid was found with selector "' + selector + '" - element missing or wrong selector ?' + '\nNote: ".grid-stack" is required for proper CSS styling and drag/drop, and is the default selector.');
      }

      return grids;
    }
    /**
     * call to create a grid with the given options, including loading any children from JSON structure. This will call GridStack.init(), then
     * grid.load() on any passed children (recursively). Great alternative to calling init() if you want entire grid to come from
     * JSON serialized data, including options.
     * @param parent HTML element parent to the grid
     * @param opt grids options used to initialize the grid, and list of children
     */


    static addGrid(parent, opt = {}) {
      if (!parent) return null; // create the grid element, but check if the passed 'parent' already has grid styling and should be used instead

      let el = parent;

      if (!parent.classList.contains('grid-stack')) {
        let doc = document.implementation.createHTMLDocument();
        doc.body.innerHTML = `<div class="grid-stack ${opt.class || ''}"></div>`;
        el = doc.body.children[0];
        parent.appendChild(el);
      } // create grid class and load any children


      let grid = GridStack.init(opt, el);

      if (grid.opts.children) {
        let children = grid.opts.children;
        delete grid.opts.children;
        grid.load(children);
      }

      return grid;
    }
    /** @internal create placeholder DIV as needed */


    get placeholder() {
      if (!this._placeholder) {
        let placeholderChild = document.createElement('div'); // child so padding match item-content

        placeholderChild.className = 'placeholder-content';

        if (this.opts.placeholderText) {
          placeholderChild.innerHTML = this.opts.placeholderText;
        }

        this._placeholder = document.createElement('div');

        this._placeholder.classList.add(this.opts.placeholderClass, GridDefaults.itemClass, this.opts.itemClass);

        this.placeholder.appendChild(placeholderChild);
      }

      return this._placeholder;
    }
    /**
     * add a new widget and returns it.
     *
     * Widget will be always placed even if result height is more than actual grid height.
     * You need to use `willItFit()` before calling addWidget for additional check.
     * See also `makeWidget()`.
     *
     * @example
     * let grid = GridStack.init();
     * grid.addWidget({w: 3, content: 'hello'});
     * grid.addWidget('<div class="grid-stack-item"><div class="grid-stack-item-content">hello</div></div>', {w: 3});
     *
     * @param el  GridStackWidget (which can have content string as well), html element, or string definition to add
     * @param options widget position/size options (optional, and ignore if first param is already option) - see GridStackWidget
     */


    addWidget(els, options) {
      // support legacy call for now ?
      if (arguments.length > 2) {
        console.warn('gridstack.ts: `addWidget(el, x, y, width...)` is deprecated. Use `addWidget({x, y, w, content, ...})`. It will be removed soon'); // eslint-disable-next-line prefer-rest-params

        let a = arguments,
            i = 1,
            opt = {
          x: a[i++],
          y: a[i++],
          w: a[i++],
          h: a[i++],
          autoPosition: a[i++],
          minW: a[i++],
          maxW: a[i++],
          minH: a[i++],
          maxH: a[i++],
          id: a[i++]
        };
        return this.addWidget(els, opt);
      }

      function isGridStackWidget(w) {
        return w.x !== undefined || w.y !== undefined || w.w !== undefined || w.h !== undefined || w.content !== undefined ? true : false;
      }

      let el;

      if (typeof els === 'string') {
        let doc = document.implementation.createHTMLDocument();
        doc.body.innerHTML = els;
        el = doc.body.children[0];
      } else if (arguments.length === 0 || arguments.length === 1 && isGridStackWidget(els)) {
        let content = els ? els.content || '' : '';
        options = els;
        let doc = document.implementation.createHTMLDocument();
        doc.body.innerHTML = `<div class="grid-stack-item ${this.opts.itemClass || ''}"><div class="grid-stack-item-content">${content}</div></div>`;
        el = doc.body.children[0];
      } else {
        el = els;
      } // Tempting to initialize the passed in opt with default and valid values, but this break knockout demos
      // as the actual value are filled in when _prepareElement() calls el.getAttribute('gs-xyz) before adding the node.
      // So make sure we load any DOM attributes that are not specified in passed in options (which override)


      let domAttr = this._readAttr(el);

      options = Object.assign({}, options || {}); // make a copy before we modify in case caller re-uses it

      utils.Utils.defaults(options, domAttr);
      let node = this.engine.prepareNode(options);

      this._writeAttr(el, options);

      if (this._insertNotAppend) {
        this.el.prepend(el);
      } else {
        this.el.appendChild(el);
      } // similar to makeWidget() that doesn't read attr again and worse re-create a new node and loose any _id


      this._prepareElement(el, true, options);

      this._updateContainerHeight(); // check if nested grid definition is present


      if (node.subGrid && !node.subGrid.el) {
        // see if there is a sub-grid to create too
        let content = node.el.querySelector('.grid-stack-item-content');
        node.subGrid = GridStack.addGrid(content, node.subGrid);
      }

      this._triggerAddEvent();

      this._triggerChangeEvent();

      return el;
    }
    /**
     * saves the current layout returning a list of widgets for serialization (with default to save content), which might include any nested grids.
     * Optionally you can also save the grid with options itself, so you can call the new GridStack.addGrid()
     * to recreate everything from scratch. GridStackOptions.children would then contain the widget list.
     */


    save(saveContent = true, saveGridOpt = false) {
      // return copied nodes we can modify at will...
      let list = this.engine.save(saveContent); // check for HTML content as well

      if (saveContent) {
        list.forEach(n => {
          if (n.el && !n.subGrid) {
            // sub-grid are saved differently, not plain content
            let sub = n.el.querySelector('.grid-stack-item-content');
            n.content = sub ? sub.innerHTML : undefined;
            if (!n.content) delete n.content;
            delete n.el;
          }
        });
      } // check if save entire grid options (needed for recursive) + children...


      if (saveGridOpt) {
        // check for nested grid
        list.forEach(n => {
          if (n.subGrid) {
            n.subGrid = n.subGrid.save(saveContent, saveGridOpt);
          }
        });
        let o = Object.assign({}, this.opts); // delete default values that will be recreated on launch

        if (o.marginBottom === o.marginTop && o.marginRight === o.marginLeft && o.marginTop === o.marginRight) {
          o.margin = o.marginTop;
          delete o.marginTop;
          delete o.marginRight;
          delete o.marginBottom;
          delete o.marginLeft;
        }

        if (o.rtl === (this.el.style.direction === 'rtl')) {
          o.rtl = 'auto';
        }

        if (this._isAutoCellHeight) {
          o.cellHeight = 'auto';
        }

        utils.Utils.removeInternalAndSame(o, GridDefaults);
        o.children = list;
        return o;
      }

      return list;
    }
    /**
     * load the widgets from a list. This will call update() on each (matching by id) or add/remove widgets that are not there.
     *
     * @param layout list of widgets definition to update/create
     * @param addAndRemove boolean (default true) or callback method can be passed to control if and how missing widgets can be added/removed, giving
     * the user control of insertion.
     *
     * @example
     * see http://gridstackjs.com/demo/serialization.html
     **/


    load(layout, addAndRemove = true) {
      let items = GridStack.Utils.sort([...layout], -1, this._prevColumn || this.opts.column); // make copy before we mod/sort

      this._insertNotAppend = true; // since create in reverse order...
      // if we're loading a layout into 1 column (_prevColumn is set only when going to 1) and items don't fit, make sure to save
      // the original wanted layout so we can scale back up correctly #1471

      if (this._prevColumn && this._prevColumn !== this.opts.column && items.some(n => n.x + n.w > this.opts.column)) {
        this._ignoreLayoutsNodeChange = true; // skip layout update

        this.engine.cacheLayout(items, this._prevColumn, true);
      }

      let removed = [];
      this.batchUpdate(); // see if any items are missing from new layout and need to be removed first

      if (addAndRemove) {
        let copyNodes = [...this.engine.nodes]; // don't loop through array you modify

        copyNodes.forEach(n => {
          let item = items.find(w => n.id === w.id);

          if (!item) {
            if (typeof addAndRemove === 'function') {
              addAndRemove(this, n, false);
            } else {
              removed.push(n); // batch keep track

              this.removeWidget(n.el, true, false);
            }
          }
        });
      } // now add/update the widgets


      items.forEach(w => {
        let item = w.id || w.id === 0 ? this.engine.nodes.find(n => n.id === w.id) : undefined;

        if (item) {
          this.update(item.el, w);

          if (w.subGrid && w.subGrid.children) {
            // update any sub grid as well
            let sub = item.el.querySelector('.grid-stack');

            if (sub && sub.gridstack) {
              sub.gridstack.load(w.subGrid.children); // TODO: support updating grid options ?

              this._insertNotAppend = true; // got reset by above call
            }
          }
        } else if (addAndRemove) {
          if (typeof addAndRemove === 'function') {
            w = addAndRemove(this, w, true).gridstackNode;
          } else {
            w = this.addWidget(w).gridstackNode;
          }
        }
      });
      this.engine.removedNodes = removed;
      this.commit(); // after commit, clear that flag

      delete this._ignoreLayoutsNodeChange;
      delete this._insertNotAppend;
      return this;
    }
    /**
     * Initializes batch updates. You will see no changes until `commit()` method is called.
     */


    batchUpdate() {
      this.engine.batchUpdate();
      return this;
    }
    /**
     * Gets current cell height.
     */


    getCellHeight(forcePixel = false) {
      if (this.opts.cellHeight && this.opts.cellHeight !== 'auto' && (!forcePixel || !this.opts.cellHeightUnit || this.opts.cellHeightUnit === 'px')) {
        return this.opts.cellHeight;
      } // else do entire grid and # of rows
      // or get first cell height ?
      // let el = this.el.querySelector('.' + this.opts.itemClass) as HTMLElement;
      // let height = Utils.toNumber(el.getAttribute('gs-h'));
      // return Math.round(el.offsetHeight / height);


      return Math.round(this.el.getBoundingClientRect().height) / parseInt(this.el.getAttribute('gs-current-row'));
    }
    /**
     * Update current cell height - see `GridStackOptions.cellHeight` for format.
     * This method rebuilds an internal CSS style sheet.
     * Note: You can expect performance issues if call this method too often.
     *
     * @param val the cell height. If not passed (undefined), cells content will be made square (match width minus margin),
     * if pass 0 the CSS will be generated by the application instead.
     * @param update (Optional) if false, styles will not be updated
     *
     * @example
     * grid.cellHeight(100); // same as 100px
     * grid.cellHeight('70px');
     * grid.cellHeight(grid.cellWidth() * 1.2);
     */


    cellHeight(val, update = true) {
      // if not called internally, check if we're changing mode
      if (update && val !== undefined) {
        if (this._isAutoCellHeight !== (val === 'auto')) {
          this._isAutoCellHeight = val === 'auto';

          this._updateWindowResizeEvent();
        }
      }

      if (val === 'initial' || val === 'auto') {
        val = undefined;
      } // make item content be square


      if (val === undefined) {
        let marginDiff = -this.opts.marginRight - this.opts.marginLeft + this.opts.marginTop + this.opts.marginBottom;
        val = this.cellWidth() + marginDiff;
      }

      let data = utils.Utils.parseHeight(val);

      if (this.opts.cellHeightUnit === data.unit && this.opts.cellHeight === data.h) {
        return this;
      }

      this.opts.cellHeightUnit = data.unit;
      this.opts.cellHeight = data.h;

      if (update) {
        this._updateStyles(true, this.getRow()); // true = force re-create, for that # of rows

      }

      return this;
    }
    /** Gets current cell width. */


    cellWidth() {
      return this._widthOrContainer() / this.opts.column;
    }
    /** return our expected width (or parent) for 1 column check */


    _widthOrContainer() {
      // use `offsetWidth` or `clientWidth` (no scrollbar) ?
      // https://stackoverflow.com/questions/21064101/understanding-offsetwidth-clientwidth-scrollwidth-and-height-respectively
      return this.el.clientWidth || this.el.parentElement.clientWidth || window.innerWidth;
    }
    /**
     * Finishes batch updates. Updates DOM nodes. You must call it after batchUpdate.
     */


    commit() {
      this.engine.commit();

      this._triggerRemoveEvent();

      this._triggerAddEvent();

      this._triggerChangeEvent();

      return this;
    }
    /** re-layout grid items to reclaim any empty space */


    compact() {
      this.engine.compact();

      this._triggerChangeEvent();

      return this;
    }
    /**
     * set the number of columns in the grid. Will update existing widgets to conform to new number of columns,
     * as well as cache the original layout so you can revert back to previous positions without loss.
     * Requires `gridstack-extra.css` or `gridstack-extra.min.css` for [2-11],
     * else you will need to generate correct CSS (see https://github.com/gridstack/gridstack.js#change-grid-columns)
     * @param column - Integer > 0 (default 12).
     * @param layout specify the type of re-layout that will happen (position, size, etc...).
     * Note: items will never be outside of the current column boundaries. default (moveScale). Ignored for 1 column
     */


    column(column, layout = 'moveScale') {
      if (this.opts.column === column) return this;
      let oldColumn = this.opts.column; // if we go into 1 column mode (which happens if we're sized less than minW unless disableOneColumnMode is on)
      // then remember the original columns so we can restore.

      if (column === 1) {
        this._prevColumn = oldColumn;
      } else {
        delete this._prevColumn;
      }

      this.el.classList.remove('grid-stack-' + oldColumn);
      this.el.classList.add('grid-stack-' + column);
      this.opts.column = this.engine.column = column; // update the items now - see if the dom order nodes should be passed instead (else default to current list)

      let domNodes;

      if (column === 1 && this.opts.oneColumnModeDomSort) {
        domNodes = [];
        this.getGridItems().forEach(el => {
          if (el.gridstackNode) {
            domNodes.push(el.gridstackNode);
          }
        });

        if (!domNodes.length) {
          domNodes = undefined;
        }
      }

      this.engine.updateNodeWidths(oldColumn, column, domNodes, layout);
      if (this._isAutoCellHeight) this.cellHeight(); // and trigger our event last...

      this._ignoreLayoutsNodeChange = true; // skip layout update

      this._triggerChangeEvent();

      delete this._ignoreLayoutsNodeChange;
      return this;
    }
    /**
     * get the number of columns in the grid (default 12)
     */


    getColumn() {
      return this.opts.column;
    }
    /** returns an array of grid HTML elements (no placeholder) - used to iterate through our children in DOM order */


    getGridItems() {
      return Array.from(this.el.children).filter(el => el.matches('.' + this.opts.itemClass) && !el.matches('.' + this.opts.placeholderClass));
    }
    /**
     * Destroys a grid instance. DO NOT CALL any methods or access any vars after this as it will free up members.
     * @param removeDOM if `false` grid and items HTML elements will not be removed from the DOM (Optional. Default `true`).
     */


    destroy(removeDOM = true) {
      if (!this.el) return; // prevent multiple calls

      this._updateWindowResizeEvent(true);

      this.setStatic(true); // permanently removes DD

      if (!removeDOM) {
        this.removeAll(removeDOM);
        this.el.classList.remove(this.opts._styleSheetClass);
      } else {
        this.el.parentNode.removeChild(this.el);
      }

      this._removeStylesheet();

      delete this.opts._isNested;
      delete this.opts;
      delete this._placeholder;
      delete this.engine;
      delete this.el.gridstack; // remove circular dependency that would prevent a freeing

      delete this.el;
      return this;
    }
    /**
     * enable/disable floating widgets (default: `false`) See [example](http://gridstackjs.com/demo/float.html)
     */


    float(val) {
      this.engine.float = val;

      this._triggerChangeEvent();

      return this;
    }
    /**
     * get the current float mode
     */


    getFloat() {
      return this.engine.float;
    }
    /**
     * Get the position of the cell under a pixel on screen.
     * @param position the position of the pixel to resolve in
     * absolute coordinates, as an object with top and left properties
     * @param useDocRelative if true, value will be based on document position vs parent position (Optional. Default false).
     * Useful when grid is within `position: relative` element
     *
     * Returns an object with properties `x` and `y` i.e. the column and row in the grid.
     */


    getCellFromPixel(position, useDocRelative = false) {
      let box = this.el.getBoundingClientRect(); // console.log(`getBoundingClientRect left: ${box.left} top: ${box.top} w: ${box.w} h: ${box.h}`)

      let containerPos;

      if (useDocRelative) {
        containerPos = {
          top: box.top + document.documentElement.scrollTop,
          left: box.left
        }; // console.log(`getCellFromPixel scrollTop: ${document.documentElement.scrollTop}`)
      } else {
        containerPos = {
          top: this.el.offsetTop,
          left: this.el.offsetLeft
        }; // console.log(`getCellFromPixel offsetTop: ${containerPos.left} offsetLeft: ${containerPos.top}`)
      }

      let relativeLeft = position.left - containerPos.left;
      let relativeTop = position.top - containerPos.top;
      let columnWidth = box.width / this.opts.column;
      let rowHeight = box.height / parseInt(this.el.getAttribute('gs-current-row'));
      return {
        x: Math.floor(relativeLeft / columnWidth),
        y: Math.floor(relativeTop / rowHeight)
      };
    }
    /** returns the current number of rows, which will be at least `minRow` if set */


    getRow() {
      return Math.max(this.engine.getRow(), this.opts.minRow);
    }
    /**
     * Checks if specified area is empty.
     * @param x the position x.
     * @param y the position y.
     * @param w the width of to check
     * @param h the height of to check
     */


    isAreaEmpty(x, y, w, h) {
      return this.engine.isAreaEmpty(x, y, w, h);
    }
    /**
     * If you add elements to your grid by hand, you have to tell gridstack afterwards to make them widgets.
     * If you want gridstack to add the elements for you, use `addWidget()` instead.
     * Makes the given element a widget and returns it.
     * @param els widget or single selector to convert.
     *
     * @example
     * let grid = GridStack.init();
     * grid.el.appendChild('<div id="gsi-1" gs-w="3"></div>');
     * grid.makeWidget('#gsi-1');
     */


    makeWidget(els) {
      let el = GridStack.getElement(els);

      this._prepareElement(el, true);

      this._updateContainerHeight();

      this._triggerAddEvent();

      this._triggerChangeEvent();

      return el;
    }
    /**
     * Event handler that extracts our CustomEvent data out automatically for receiving custom
     * notifications (see doc for supported events)
     * @param name of the event (see possible values) or list of names space separated
     * @param callback function called with event and optional second/third param
     * (see README documentation for each signature).
     *
     * @example
     * grid.on('added', function(e, items) { log('added ', items)} );
     * or
     * grid.on('added removed change', function(e, items) { log(e.type, items)} );
     *
     * Note: in some cases it is the same as calling native handler and parsing the event.
     * grid.el.addEventListener('added', function(event) { log('added ', event.detail)} );
     *
     */


    on(name, callback) {
      // check for array of names being passed instead
      if (name.indexOf(' ') !== -1) {
        let names = name.split(' ');
        names.forEach(name => this.on(name, callback));
        return this;
      }

      if (name === 'change' || name === 'added' || name === 'removed' || name === 'enable' || name === 'disable') {
        // native CustomEvent handlers - cash the generic handlers so we can easily remove
        let noData = name === 'enable' || name === 'disable';

        if (noData) {
          this._gsEventHandler[name] = event => callback(event);
        } else {
          this._gsEventHandler[name] = event => callback(event, event.detail);
        }

        this.el.addEventListener(name, this._gsEventHandler[name]);
      } else if (name === 'drag' || name === 'dragstart' || name === 'dragstop' || name === 'resizestart' || name === 'resize' || name === 'resizestop' || name === 'dropped') {
        // drag&drop stop events NEED to be call them AFTER we update node attributes so handle them ourself.
        // do same for start event to make it easier...
        this._gsEventHandler[name] = callback;
      } else {
        console.log('GridStack.on(' + name + ') event not supported, but you can still use $(".grid-stack").on(...) while jquery-ui is still used internally.');
      }

      return this;
    }
    /**
     * unsubscribe from the 'on' event below
     * @param name of the event (see possible values)
     */


    off(name) {
      // check for array of names being passed instead
      if (name.indexOf(' ') !== -1) {
        let names = name.split(' ');
        names.forEach(name => this.off(name));
        return this;
      }

      if (name === 'change' || name === 'added' || name === 'removed' || name === 'enable' || name === 'disable') {
        // remove native CustomEvent handlers
        if (this._gsEventHandler[name]) {
          this.el.removeEventListener(name, this._gsEventHandler[name]);
        }
      }

      delete this._gsEventHandler[name];
      return this;
    }
    /**
     * Removes widget from the grid.
     * @param el  widget or selector to modify
     * @param removeDOM if `false` DOM element won't be removed from the tree (Default? true).
     * @param triggerEvent if `false` (quiet mode) element will not be added to removed list and no 'removed' callbacks will be called (Default? true).
     */


    removeWidget(els, removeDOM = true, triggerEvent = true) {
      GridStack.getElements(els).forEach(el => {
        if (el.parentElement !== this.el) return; // not our child!

        let node = el.gridstackNode; // For Meteor support: https://github.com/gridstack/gridstack.js/pull/272

        if (!node) {
          node = this.engine.nodes.find(n => el === n.el);
        }

        if (!node) return; // remove our DOM data (circular link) and drag&drop permanently

        delete el.gridstackNode;
        gridstackDdi.GridStackDDI.get().remove(el);
        this.engine.removeNode(node, removeDOM, triggerEvent);

        if (removeDOM && el.parentElement) {
          el.remove(); // in batch mode engine.removeNode doesn't call back to remove DOM
        }
      });

      if (triggerEvent) {
        this._triggerRemoveEvent();

        this._triggerChangeEvent();
      }

      return this;
    }
    /**
     * Removes all widgets from the grid.
     * @param removeDOM if `false` DOM elements won't be removed from the tree (Default? `true`).
     */


    removeAll(removeDOM = true) {
      // always remove our DOM data (circular link) before list gets emptied and drag&drop permanently
      this.engine.nodes.forEach(n => {
        delete n.el.gridstackNode;
        gridstackDdi.GridStackDDI.get().remove(n.el);
      });
      this.engine.removeAll(removeDOM);

      this._triggerRemoveEvent();

      return this;
    }
    /**
     * Toggle the grid animation state.  Toggles the `grid-stack-animate` class.
     * @param doAnimate if true the grid will animate.
     */


    setAnimation(doAnimate) {
      if (doAnimate) {
        this.el.classList.add('grid-stack-animate');
      } else {
        this.el.classList.remove('grid-stack-animate');
      }

      return this;
    }
    /**
     * Toggle the grid static state, which permanently removes/add Drag&Drop support, unlike disable()/enable() that just turns it off/on.
     * Also toggle the grid-stack-static class.
     * @param val if true the grid become static.
     */


    setStatic(val) {
      if (this.opts.staticGrid === val) return this;
      this.opts.staticGrid = val;
      this.engine.nodes.forEach(n => this._prepareDragDropByNode(n)); // either delete Drag&drop or initialize it

      this._setStaticClass();

      return this;
    }
    /**
     * Updates widget position/size and other info. Note: if you need to call this on all nodes, use load() instead which will update what changed.
     * @param els  widget or selector of objects to modify (note: setting the same x,y for multiple items will be indeterministic and likely unwanted)
     * @param opt new widget options (x,y,w,h, etc..). Only those set will be updated.
     */


    update(els, opt) {
      // support legacy call for now ?
      if (arguments.length > 2) {
        console.warn('gridstack.ts: `update(el, x, y, w, h)` is deprecated. Use `update({x, w, content, ...})`. It will be removed soon'); // eslint-disable-next-line prefer-rest-params

        let a = arguments,
            i = 1;
        opt = {
          x: a[i++],
          y: a[i++],
          w: a[i++],
          h: a[i++]
        };
        return this.update(els, opt);
      }

      GridStack.getElements(els).forEach(el => {
        if (!el || !el.gridstackNode) return;
        let n = el.gridstackNode;
        let w = Object.assign({}, opt); // make a copy we can modify in case they re-use it or multiple items

        delete w.autoPosition; // move/resize widget if anything changed

        let keys = ['x', 'y', 'w', 'h'];
        let m;

        if (keys.some(k => w[k] !== undefined && w[k] !== n[k])) {
          m = {};
          keys.forEach(k => {
            m[k] = w[k] !== undefined ? w[k] : n[k];
            delete w[k];
          });
        } // for a move as well IFF there is any min/max fields set


        if (!m && (w.minW || w.minH || w.maxW || w.maxH)) {
          m = {}; // will use node position but validate values
        } // check for content changing


        if (w.content) {
          let sub = el.querySelector('.grid-stack-item-content');

          if (sub && sub.innerHTML !== w.content) {
            sub.innerHTML = w.content;
          }

          delete w.content;
        } // any remaining fields are assigned, but check for dragging changes, resize constrain


        let changed = false;
        let ddChanged = false;

        for (const key in w) {
          if (key[0] !== '_' && n[key] !== w[key]) {
            n[key] = w[key];
            changed = true;
            ddChanged = ddChanged || !this.opts.staticGrid && (key === 'noResize' || key === 'noMove' || key === 'locked');
          }
        } // finally move the widget


        if (m) {
          this.engine.cleanNodes().beginUpdate(n).moveNode(n, m);

          this._updateContainerHeight();

          this._triggerChangeEvent();

          this.engine.endUpdate();
        }

        if (changed) {
          // move will only update x,y,w,h so update the rest too
          this._writeAttr(el, n);
        }

        if (ddChanged) {
          this._prepareDragDropByNode(n);
        }
      });
      return this;
    }
    /**
     * Updates the margins which will set all 4 sides at once - see `GridStackOptions.margin` for format options (CSS string format of 1,2,4 values or single number).
     * @param value margin value
     */


    margin(value) {
      let isMultiValue = typeof value === 'string' && value.split(' ').length > 1; // check if we can skip re-creating our CSS file... won't check if multi values (too much hassle)

      if (!isMultiValue) {
        let data = utils.Utils.parseHeight(value);
        if (this.opts.marginUnit === data.unit && this.opts.margin === data.h) return;
      } // re-use existing margin handling


      this.opts.margin = value;
      this.opts.marginTop = this.opts.marginBottom = this.opts.marginLeft = this.opts.marginRight = undefined;
      this.initMargin();

      this._updateStyles(true); // true = force re-create


      return this;
    }
    /** returns current margin number value (undefined if 4 sides don't match) */


    getMargin() {
      return this.opts.margin;
    }
    /**
     * Returns true if the height of the grid will be less than the vertical
     * constraint. Always returns true if grid doesn't have height constraint.
     * @param node contains x,y,w,h,auto-position options
     *
     * @example
     * if (grid.willItFit(newWidget)) {
     *   grid.addWidget(newWidget);
     * } else {
     *   alert('Not enough free space to place the widget');
     * }
     */


    willItFit(node) {
      // support legacy call for now
      if (arguments.length > 1) {
        console.warn('gridstack.ts: `willItFit(x,y,w,h,autoPosition)` is deprecated. Use `willItFit({x, y,...})`. It will be removed soon'); // eslint-disable-next-line prefer-rest-params

        let a = arguments,
            i = 0,
            w = {
          x: a[i++],
          y: a[i++],
          w: a[i++],
          h: a[i++],
          autoPosition: a[i++]
        };
        return this.willItFit(w);
      }

      return this.engine.willItFit(node);
    }
    /** @internal */


    _triggerChangeEvent() {
      if (this.engine.batchMode) return this;
      let elements = this.engine.getDirtyNodes(true); // verify they really changed

      if (elements && elements.length) {
        if (!this._ignoreLayoutsNodeChange) {
          this.engine.layoutsNodesChange(elements);
        }

        this._triggerEvent('change', elements);
      }

      this.engine.saveInitial(); // we called, now reset initial values & dirty flags

      return this;
    }
    /** @internal */


    _triggerAddEvent() {
      if (this.engine.batchMode) return this;

      if (this.engine.addedNodes && this.engine.addedNodes.length > 0) {
        if (!this._ignoreLayoutsNodeChange) {
          this.engine.layoutsNodesChange(this.engine.addedNodes);
        } // prevent added nodes from also triggering 'change' event (which is called next)


        this.engine.addedNodes.forEach(n => {
          delete n._dirty;
        });

        this._triggerEvent('added', this.engine.addedNodes);

        this.engine.addedNodes = [];
      }

      return this;
    }
    /** @internal */


    _triggerRemoveEvent() {
      if (this.engine.batchMode) return this;

      if (this.engine.removedNodes && this.engine.removedNodes.length > 0) {
        this._triggerEvent('removed', this.engine.removedNodes);

        this.engine.removedNodes = [];
      }

      return this;
    }
    /** @internal */


    _triggerEvent(name, data) {
      let event = data ? new CustomEvent(name, {
        bubbles: false,
        detail: data
      }) : new Event(name);
      this.el.dispatchEvent(event);
      return this;
    }
    /** @internal called to delete the current dynamic style sheet used for our layout */


    _removeStylesheet() {
      if (this._styles) {
        utils.Utils.removeStylesheet(this._styles._id);
        delete this._styles;
      }

      return this;
    }
    /** @internal updated/create the CSS styles for row based layout and initial margin setting */


    _updateStyles(forceUpdate = false, maxH) {
      // call to delete existing one if we change cellHeight / margin
      if (forceUpdate) {
        this._removeStylesheet();
      }

      this._updateContainerHeight(); // if user is telling us they will handle the CSS themselves by setting heights to 0. Do we need this opts really ??


      if (this.opts.cellHeight === 0) {
        return this;
      }

      let cellHeight = this.opts.cellHeight;
      let cellHeightUnit = this.opts.cellHeightUnit;
      let prefix = `.${this.opts._styleSheetClass} > .${this.opts.itemClass}`; // create one as needed

      if (!this._styles) {
        let id = 'gridstack-style-' + (Math.random() * 100000).toFixed(); // insert style to parent (instead of 'head' by default) to support WebComponent

        let styleLocation = this.opts.styleInHead ? undefined : this.el.parentNode;
        this._styles = utils.Utils.createStylesheet(id, styleLocation);
        if (!this._styles) return this;
        this._styles._id = id;
        this._styles._max = 0; // these are done once only

        utils.Utils.addCSSRule(this._styles, prefix, `min-height: ${cellHeight}${cellHeightUnit}`); // content margins

        let top = this.opts.marginTop + this.opts.marginUnit;
        let bottom = this.opts.marginBottom + this.opts.marginUnit;
        let right = this.opts.marginRight + this.opts.marginUnit;
        let left = this.opts.marginLeft + this.opts.marginUnit;
        let content = `${prefix} > .grid-stack-item-content`;
        let placeholder = `.${this.opts._styleSheetClass} > .grid-stack-placeholder > .placeholder-content`;
        utils.Utils.addCSSRule(this._styles, content, `top: ${top}; right: ${right}; bottom: ${bottom}; left: ${left};`);
        utils.Utils.addCSSRule(this._styles, placeholder, `top: ${top}; right: ${right}; bottom: ${bottom}; left: ${left};`); // resize handles offset (to match margin)

        utils.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-ne`, `right: ${right}`);
        utils.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-e`, `right: ${right}`);
        utils.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-se`, `right: ${right}; bottom: ${bottom}`);
        utils.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-nw`, `left: ${left}`);
        utils.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-w`, `left: ${left}`);
        utils.Utils.addCSSRule(this._styles, `${prefix} > .ui-resizable-sw`, `left: ${left}; bottom: ${bottom}`);
      } // now update the height specific fields


      maxH = maxH || this._styles._max;

      if (maxH > this._styles._max) {
        let getHeight = rows => cellHeight * rows + cellHeightUnit;

        for (let i = this._styles._max + 1; i <= maxH; i++) {
          // start at 1
          let h = getHeight(i);
          utils.Utils.addCSSRule(this._styles, `${prefix}[gs-y="${i - 1}"]`, `top: ${getHeight(i - 1)}`); // start at 0

          utils.Utils.addCSSRule(this._styles, `${prefix}[gs-h="${i}"]`, `height: ${h}`);
          utils.Utils.addCSSRule(this._styles, `${prefix}[gs-min-h="${i}"]`, `min-height: ${h}`);
          utils.Utils.addCSSRule(this._styles, `${prefix}[gs-max-h="${i}"]`, `max-height: ${h}`);
        }

        this._styles._max = maxH;
      }

      return this;
    }
    /** @internal */


    _updateContainerHeight() {
      if (!this.engine || this.engine.batchMode) return this;

      let row = this.getRow() + this._extraDragRow; // checks for minRow already
      // check for css min height


      let cssMinHeight = parseInt(getComputedStyle(this.el)['min-height']);

      if (cssMinHeight > 0) {
        let minRow = Math.round(cssMinHeight / this.getCellHeight(true));

        if (row < minRow) {
          row = minRow;
        }
      }

      this.el.setAttribute('gs-current-row', String(row));

      if (row === 0) {
        this.el.style.removeProperty('height');
        return this;
      }

      let cellHeight = this.opts.cellHeight;
      let unit = this.opts.cellHeightUnit;
      if (!cellHeight) return this;
      this.el.style.height = row * cellHeight + unit;
      return this;
    }
    /** @internal */


    _prepareElement(el, triggerAddEvent = false, node) {
      if (!node) {
        el.classList.add(this.opts.itemClass);
        node = this._readAttr(el);
      }

      el.gridstackNode = node;
      node.el = el;
      node.grid = this;
      let copy = Object.assign({}, node);
      node = this.engine.addNode(node, triggerAddEvent); // write node attr back in case there was collision or we have to fix bad values during addNode()

      if (!utils.Utils.same(node, copy)) {
        this._writeAttr(el, node);
      }

      this._prepareDragDropByNode(node);

      return this;
    }
    /** @internal call to write position x,y,w,h attributes back to element */


    _writePosAttr(el, n) {
      if (n.x !== undefined && n.x !== null) {
        el.setAttribute('gs-x', String(n.x));
      }

      if (n.y !== undefined && n.y !== null) {
        el.setAttribute('gs-y', String(n.y));
      }

      if (n.w) {
        el.setAttribute('gs-w', String(n.w));
      }

      if (n.h) {
        el.setAttribute('gs-h', String(n.h));
      }

      return this;
    }
    /** @internal call to write any default attributes back to element */


    _writeAttr(el, node) {
      if (!node) return this;

      this._writePosAttr(el, node);

      let attrs
      /*: GridStackWidget but strings */
      = {
        autoPosition: 'gs-auto-position',
        minW: 'gs-min-w',
        minH: 'gs-min-h',
        maxW: 'gs-max-w',
        maxH: 'gs-max-h',
        noResize: 'gs-no-resize',
        noMove: 'gs-no-move',
        locked: 'gs-locked',
        id: 'gs-id',
        resizeHandles: 'gs-resize-handles'
      };

      for (const key in attrs) {
        if (node[key]) {
          // 0 is valid for x,y only but done above already and not in list anyway
          el.setAttribute(attrs[key], String(node[key]));
        } else {
          el.removeAttribute(attrs[key]);
        }
      }

      return this;
    }
    /** @internal call to read any default attributes from element */


    _readAttr(el) {
      let node = {};
      node.x = utils.Utils.toNumber(el.getAttribute('gs-x'));
      node.y = utils.Utils.toNumber(el.getAttribute('gs-y'));
      node.w = utils.Utils.toNumber(el.getAttribute('gs-w'));
      node.h = utils.Utils.toNumber(el.getAttribute('gs-h'));
      node.maxW = utils.Utils.toNumber(el.getAttribute('gs-max-w'));
      node.minW = utils.Utils.toNumber(el.getAttribute('gs-min-w'));
      node.maxH = utils.Utils.toNumber(el.getAttribute('gs-max-h'));
      node.minH = utils.Utils.toNumber(el.getAttribute('gs-min-h'));
      node.autoPosition = utils.Utils.toBool(el.getAttribute('gs-auto-position'));
      node.noResize = utils.Utils.toBool(el.getAttribute('gs-no-resize'));
      node.noMove = utils.Utils.toBool(el.getAttribute('gs-no-move'));
      node.locked = utils.Utils.toBool(el.getAttribute('gs-locked'));
      node.resizeHandles = el.getAttribute('gs-resize-handles');
      node.id = el.getAttribute('gs-id'); // remove any key not found (null or false which is default)

      for (const key in node) {
        if (!node.hasOwnProperty(key)) return;

        if (!node[key] && node[key] !== 0) {
          // 0 can be valid value (x,y only really)
          delete node[key];
        }
      }

      return node;
    }
    /** @internal */


    _setStaticClass() {
      let classes = ['grid-stack-static'];

      if (this.opts.staticGrid) {
        this.el.classList.add(...classes);
        this.el.setAttribute('gs-static', 'true');
      } else {
        this.el.classList.remove(...classes);
        this.el.removeAttribute('gs-static');
      }

      return this;
    }
    /**
     * called when we are being resized by the window - check if the one Column Mode needs to be turned on/off
     * and remember the prev columns we used, as well as check for auto cell height (square)
     */


    onParentResize() {
      if (!this.el || !this.el.clientWidth) return; // return if we're gone or no size yet (will get called again)

      let oneColumn = !this.opts.disableOneColumnMode && this.el.clientWidth <= this.opts.minWidth;
      let changedOneColumn = false;

      if (this.opts.column === 1 !== oneColumn) {
        changedOneColumn = true;

        if (this.opts.animate) {
          this.setAnimation(false);
        } // 1 <-> 12 is too radical, turn off animation


        this.column(oneColumn ? 1 : this._prevColumn);

        if (this.opts.animate) {
          this.setAnimation(true);
        }
      } // make the cells content square again


      if (this._isAutoCellHeight) {
        if (!changedOneColumn && this.opts.cellHeightThrottle) {
          if (!this._cellHeightThrottle) {
            this._cellHeightThrottle = utils.Utils.throttle(() => this.cellHeight(), this.opts.cellHeightThrottle);
          }

          this._cellHeightThrottle();
        } else {
          // immediate update if we've changed to/from oneColumn or have no threshold
          this.cellHeight();
        }
      } // finally update any nested grids


      this.engine.nodes.forEach(n => {
        if (n.subGrid) {
          n.subGrid.onParentResize();
        }
      });
      return this;
    }
    /** add or remove the window size event handler */


    _updateWindowResizeEvent(forceRemove = false) {
      // only add event if we're not nested (parent will call us) and we're auto sizing cells or supporting oneColumn (i.e. doing work)
      const workTodo = (this._isAutoCellHeight || !this.opts.disableOneColumnMode) && !this.opts._isNested;

      if (!forceRemove && workTodo && !this._windowResizeBind) {
        this._windowResizeBind = this.onParentResize.bind(this); // so we can properly remove later

        window.addEventListener('resize', this._windowResizeBind);
      } else if ((forceRemove || !workTodo) && this._windowResizeBind) {
        window.removeEventListener('resize', this._windowResizeBind);
        delete this._windowResizeBind; // remove link to us so we can free
      }

      return this;
    }
    /** @internal convert a potential selector into actual element */


    static getElement(els = '.grid-stack-item') {
      return utils.Utils.getElement(els);
    }
    /** @internal */


    static getElements(els = '.grid-stack-item') {
      return utils.Utils.getElements(els);
    }
    /** @internal */


    static getGridElement(els) {
      return GridStack.getElement(els);
    }
    /** @internal */


    static getGridElements(els) {
      return utils.Utils.getElements(els);
    }
    /** @internal initialize margin top/bottom/left/right and units */


    initMargin() {
      let data;
      let margin = 0; // support passing multiple values like CSS (ex: '5px 10px 0 20px')

      let margins = [];

      if (typeof this.opts.margin === 'string') {
        margins = this.opts.margin.split(' ');
      }

      if (margins.length === 2) {
        // top/bot, left/right like CSS
        this.opts.marginTop = this.opts.marginBottom = margins[0];
        this.opts.marginLeft = this.opts.marginRight = margins[1];
      } else if (margins.length === 4) {
        // Clockwise like CSS
        this.opts.marginTop = margins[0];
        this.opts.marginRight = margins[1];
        this.opts.marginBottom = margins[2];
        this.opts.marginLeft = margins[3];
      } else {
        data = utils.Utils.parseHeight(this.opts.margin);
        this.opts.marginUnit = data.unit;
        margin = this.opts.margin = data.h;
      } // see if top/bottom/left/right need to be set as well


      if (this.opts.marginTop === undefined) {
        this.opts.marginTop = margin;
      } else {
        data = utils.Utils.parseHeight(this.opts.marginTop);
        this.opts.marginTop = data.h;
        delete this.opts.margin;
      }

      if (this.opts.marginBottom === undefined) {
        this.opts.marginBottom = margin;
      } else {
        data = utils.Utils.parseHeight(this.opts.marginBottom);
        this.opts.marginBottom = data.h;
        delete this.opts.margin;
      }

      if (this.opts.marginRight === undefined) {
        this.opts.marginRight = margin;
      } else {
        data = utils.Utils.parseHeight(this.opts.marginRight);
        this.opts.marginRight = data.h;
        delete this.opts.margin;
      }

      if (this.opts.marginLeft === undefined) {
        this.opts.marginLeft = margin;
      } else {
        data = utils.Utils.parseHeight(this.opts.marginLeft);
        this.opts.marginLeft = data.h;
        delete this.opts.margin;
      }

      this.opts.marginUnit = data.unit; // in case side were spelled out, use those units instead...

      if (this.opts.marginTop === this.opts.marginBottom && this.opts.marginLeft === this.opts.marginRight && this.opts.marginTop === this.opts.marginRight) {
        this.opts.margin = this.opts.marginTop; // makes it easier to check for no-ops in setMargin()
      }

      return this;
    }
    /*
     * drag&drop empty stubs that will be implemented in gridstack-dd.ts for non static grid
     * so we don't incur the load unless needed.
     * NOTE: had to make those methods public in order to define them else as
     *   GridStack.prototype._setupAcceptWidget = function()
     * maybe there is a better way ????
     */

    /* eslint-disable @typescript-eslint/no-unused-vars */

    /**
     * call to setup dragging in from the outside (say toolbar), by specifying the class selection and options.
     * Called during GridStack.init() as options, but can also be called directly (last param are cached) in case the toolbar
     * is dynamically create and needs to change later.
     * @param dragIn string selector (ex: '.sidebar .grid-stack-item')
     * @param dragInOptions options - see DDDragInOpt. (default: {revert: 'invalid', handle: '.grid-stack-item-content', scroll: false, appendTo: 'body'}
     **/


    static setupDragIn(dragIn, dragInOptions) {}
    /**
     * Enables/Disables dragging by the user of specific grid element. If you want all items, and have it affect future items, use enableMove() instead. No-op for static grids.
     * IF you are looking to prevent an item from moving (due to being pushed around by another during collision) use locked property instead.
     * @param els widget or selector to modify.
     * @param val if true widget will be draggable.
     */


    movable(els, val) {
      return this;
    }
    /**
     * Enables/Disables user resizing of specific grid element. If you want all items, and have it affect future items, use enableResize() instead. No-op for static grids.
     * @param els  widget or selector to modify
     * @param val  if true widget will be resizable.
     */


    resizable(els, val) {
      return this;
    }
    /**
     * Temporarily disables widgets moving/resizing.
     * If you want a more permanent way (which freezes up resources) use `setStatic(true)` instead.
     * Note: no-op for static grid
     * This is a shortcut for:
     * @example
     *  grid.enableMove(false);
     *  grid.enableResize(false);
     */


    disable() {
      return this;
    }
    /**
     * Re-enables widgets moving/resizing - see disable().
     * Note: no-op for static grid.
     * This is a shortcut for:
     * @example
     *  grid.enableMove(true);
     *  grid.enableResize(true);
     */


    enable() {
      return this;
    }
    /**
     * Enables/disables widget moving. No-op for static grids.
     */


    enableMove(doEnable) {
      return this;
    }
    /**
     * Enables/disables widget resizing. No-op for static grids.
     */


    enableResize(doEnable) {
      return this;
    }
    /** @internal called to add drag over support to support widgets */


    _setupAcceptWidget() {
      return this;
    }
    /** @internal called to setup a trash drop zone if the user specifies it */


    _setupRemoveDrop() {
      return this;
    }
    /** @internal prepares the element for drag&drop **/


    _prepareDragDropByNode(node) {
      return this;
    }
    /** @internal handles actual drag/resize start **/


    _onStartMoving(el, event, ui, node, cellWidth, cellHeight) {
      return;
    }
    /** @internal handles actual drag/resize **/


    _dragOrResize(el, event, ui, node, cellWidth, cellHeight) {
      return;
    }
    /** @internal called when a node leaves our area (mouse out or shape outside) **/


    _leave(node, el, helper, dropoutEvent = false) {
      return;
    }

  }

  exports.GridStack = GridStack;
  /** scoping so users can call GridStack.Utils.sort() for example */

  GridStack.Utils = utils.Utils;
  /** scoping so users can call new GridStack.Engine(12) for example */

  GridStack.Engine = gridstackEngine.GridStackEngine;
});

var css = ":root .grid-stack-item>.ui-resizable-handle{filter:none}.grid-stack{position:relative}.grid-stack.grid-stack-rtl{direction:ltr}.grid-stack.grid-stack-rtl>.grid-stack-item{direction:rtl}.grid-stack .grid-stack-placeholder>.placeholder-content{border:1px dashed #d3d3d3;margin:0;position:absolute;width:auto;z-index:0!important;text-align:center}.grid-stack>.grid-stack-item{min-width:8.3333333333%;position:absolute;padding:0}.grid-stack>.grid-stack-item>.grid-stack-item-content{margin:0;position:absolute;width:auto;overflow-x:hidden;overflow-y:auto}.grid-stack>.grid-stack-item>.ui-resizable-handle{position:absolute;font-size:.1px;display:block;-ms-touch-action:none;touch-action:none}.grid-stack>.grid-stack-item.ui-resizable-autohide>.ui-resizable-handle,.grid-stack>.grid-stack-item.ui-resizable-disabled>.ui-resizable-handle{display:none}.grid-stack>.grid-stack-item.ui-draggable-dragging,.grid-stack>.grid-stack-item.ui-resizable-resizing{z-index:100}.grid-stack>.grid-stack-item.ui-draggable-dragging>.grid-stack-item-content,.grid-stack>.grid-stack-item.ui-resizable-resizing>.grid-stack-item-content{box-shadow:1px 4px 6px rgba(0,0,0,.2);opacity:.8}.grid-stack>.grid-stack-item>.ui-resizable-se,.grid-stack>.grid-stack-item>.ui-resizable-sw{background-image:url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDUxMS42MjYgNTExLjYyNyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTExLjYyNiA1MTEuNjI3OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPHBhdGggZD0iTTMyOC45MDYsNDAxLjk5NGgtMzYuNTUzVjEwOS42MzZoMzYuNTUzYzQuOTQ4LDAsOS4yMzYtMS44MDksMTIuODQ3LTUuNDI2YzMuNjEzLTMuNjE1LDUuNDIxLTcuODk4LDUuNDIxLTEyLjg0NSAgIGMwLTQuOTQ5LTEuODAxLTkuMjMxLTUuNDI4LTEyLjg1MWwtNzMuMDg3LTczLjA5QzI2NS4wNDQsMS44MDksMjYwLjc2LDAsMjU1LjgxMywwYy00Ljk0OCwwLTkuMjI5LDEuODA5LTEyLjg0Nyw1LjQyNCAgIGwtNzMuMDg4LDczLjA5Yy0zLjYxOCwzLjYxOS01LjQyNCw3LjkwMi01LjQyNCwxMi44NTFjMCw0Ljk0NiwxLjgwNyw5LjIyOSw1LjQyNCwxMi44NDVjMy42MTksMy42MTcsNy45MDEsNS40MjYsMTIuODUsNS40MjYgICBoMzYuNTQ1djI5Mi4zNThoLTM2LjU0MmMtNC45NTIsMC05LjIzNSwxLjgwOC0xMi44NSw1LjQyMWMtMy42MTcsMy42MjEtNS40MjQsNy45MDUtNS40MjQsMTIuODU0ICAgYzAsNC45NDUsMS44MDcsOS4yMjcsNS40MjQsMTIuODQ3bDczLjA4OSw3My4wODhjMy42MTcsMy42MTcsNy44OTgsNS40MjQsMTIuODQ3LDUuNDI0YzQuOTUsMCw5LjIzNC0xLjgwNywxMi44NDktNS40MjQgICBsNzMuMDg3LTczLjA4OGMzLjYxMy0zLjYyLDUuNDIxLTcuOTAxLDUuNDIxLTEyLjg0N2MwLTQuOTQ4LTEuODA4LTkuMjMyLTUuNDIxLTEyLjg1NCAgIEMzMzguMTQyLDQwMy44MDIsMzMzLjg1Nyw0MDEuOTk0LDMyOC45MDYsNDAxLjk5NHoiIGZpbGw9IiM2NjY2NjYiLz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K);background-repeat:no-repeat;background-position:center;-webkit-transform:rotate(45deg);-moz-transform:rotate(45deg);-ms-transform:rotate(45deg);-o-transform:rotate(45deg);transform:rotate(45deg)}.grid-stack>.grid-stack-item>.ui-resizable-se{-webkit-transform:rotate(-45deg);-moz-transform:rotate(-45deg);-ms-transform:rotate(-45deg);-o-transform:rotate(-45deg);transform:rotate(-45deg)}.grid-stack>.grid-stack-item>.ui-resizable-nw{cursor:nw-resize;width:20px;height:20px;top:0}.grid-stack>.grid-stack-item>.ui-resizable-n{cursor:n-resize;height:10px;top:0;left:25px;right:25px}.grid-stack>.grid-stack-item>.ui-resizable-ne{cursor:ne-resize;width:20px;height:20px;top:0}.grid-stack>.grid-stack-item>.ui-resizable-e{cursor:e-resize;width:10px;top:15px;bottom:15px}.grid-stack>.grid-stack-item>.ui-resizable-se{cursor:se-resize;width:20px;height:20px}.grid-stack>.grid-stack-item>.ui-resizable-s{cursor:s-resize;height:10px;left:25px;bottom:0;right:25px}.grid-stack>.grid-stack-item>.ui-resizable-sw{cursor:sw-resize;width:20px;height:20px;bottom:0}.grid-stack>.grid-stack-item>.ui-resizable-w{cursor:w-resize;width:10px;top:15px;bottom:15px}.grid-stack>.grid-stack-item.ui-draggable-dragging>.ui-resizable-handle{display:none!important}.grid-stack>.grid-stack-item[gs-w='0']{width:0%}.grid-stack>.grid-stack-item[gs-x='0']{left:0}.grid-stack>.grid-stack-item[gs-min-w='0']{min-width:0}.grid-stack>.grid-stack-item[gs-max-w='0']{max-width:0%}.grid-stack>.grid-stack-item[gs-w='1']{width:8.3333333333%}.grid-stack>.grid-stack-item[gs-x='1']{left:8.3333333333%}.grid-stack>.grid-stack-item[gs-min-w='1']{min-width:8.3333333333%}.grid-stack>.grid-stack-item[gs-max-w='1']{max-width:8.3333333333%}.grid-stack>.grid-stack-item[gs-w='2']{width:16.6666666667%}.grid-stack>.grid-stack-item[gs-x='2']{left:16.6666666667%}.grid-stack>.grid-stack-item[gs-min-w='2']{min-width:16.6666666667%}.grid-stack>.grid-stack-item[gs-max-w='2']{max-width:16.6666666667%}.grid-stack>.grid-stack-item[gs-w='3']{width:25%}.grid-stack>.grid-stack-item[gs-x='3']{left:25%}.grid-stack>.grid-stack-item[gs-min-w='3']{min-width:25%}.grid-stack>.grid-stack-item[gs-max-w='3']{max-width:25%}.grid-stack>.grid-stack-item[gs-w='4']{width:33.3333333333%}.grid-stack>.grid-stack-item[gs-x='4']{left:33.3333333333%}.grid-stack>.grid-stack-item[gs-min-w='4']{min-width:33.3333333333%}.grid-stack>.grid-stack-item[gs-max-w='4']{max-width:33.3333333333%}.grid-stack>.grid-stack-item[gs-w='5']{width:41.6666666667%}.grid-stack>.grid-stack-item[gs-x='5']{left:41.6666666667%}.grid-stack>.grid-stack-item[gs-min-w='5']{min-width:41.6666666667%}.grid-stack>.grid-stack-item[gs-max-w='5']{max-width:41.6666666667%}.grid-stack>.grid-stack-item[gs-w='6']{width:50%}.grid-stack>.grid-stack-item[gs-x='6']{left:50%}.grid-stack>.grid-stack-item[gs-min-w='6']{min-width:50%}.grid-stack>.grid-stack-item[gs-max-w='6']{max-width:50%}.grid-stack>.grid-stack-item[gs-w='7']{width:58.3333333333%}.grid-stack>.grid-stack-item[gs-x='7']{left:58.3333333333%}.grid-stack>.grid-stack-item[gs-min-w='7']{min-width:58.3333333333%}.grid-stack>.grid-stack-item[gs-max-w='7']{max-width:58.3333333333%}.grid-stack>.grid-stack-item[gs-w='8']{width:66.6666666667%}.grid-stack>.grid-stack-item[gs-x='8']{left:66.6666666667%}.grid-stack>.grid-stack-item[gs-min-w='8']{min-width:66.6666666667%}.grid-stack>.grid-stack-item[gs-max-w='8']{max-width:66.6666666667%}.grid-stack>.grid-stack-item[gs-w='9']{width:75%}.grid-stack>.grid-stack-item[gs-x='9']{left:75%}.grid-stack>.grid-stack-item[gs-min-w='9']{min-width:75%}.grid-stack>.grid-stack-item[gs-max-w='9']{max-width:75%}.grid-stack>.grid-stack-item[gs-w='10']{width:83.3333333333%}.grid-stack>.grid-stack-item[gs-x='10']{left:83.3333333333%}.grid-stack>.grid-stack-item[gs-min-w='10']{min-width:83.3333333333%}.grid-stack>.grid-stack-item[gs-max-w='10']{max-width:83.3333333333%}.grid-stack>.grid-stack-item[gs-w='11']{width:91.6666666667%}.grid-stack>.grid-stack-item[gs-x='11']{left:91.6666666667%}.grid-stack>.grid-stack-item[gs-min-w='11']{min-width:91.6666666667%}.grid-stack>.grid-stack-item[gs-max-w='11']{max-width:91.6666666667%}.grid-stack>.grid-stack-item[gs-w='12']{width:100%}.grid-stack>.grid-stack-item[gs-x='12']{left:100%}.grid-stack>.grid-stack-item[gs-min-w='12']{min-width:100%}.grid-stack>.grid-stack-item[gs-max-w='12']{max-width:100%}.grid-stack.grid-stack-1>.grid-stack-item{min-width:100%}.grid-stack.grid-stack-1>.grid-stack-item[gs-w='1']{width:100%}.grid-stack.grid-stack-1>.grid-stack-item[gs-x='1']{left:100%}.grid-stack.grid-stack-1>.grid-stack-item[gs-min-w='1']{min-width:100%}.grid-stack.grid-stack-1>.grid-stack-item[gs-max-w='1']{max-width:100%}.grid-stack.grid-stack-animate,.grid-stack.grid-stack-animate .grid-stack-item{-webkit-transition:left .3s,top .3s,height .3s,width .3s;-moz-transition:left .3s,top .3s,height .3s,width .3s;-ms-transition:left .3s,top .3s,height .3s,width .3s;-o-transition:left .3s,top .3s,height .3s,width .3s;transition:left .3s,top .3s,height .3s,width .3s}.grid-stack.grid-stack-animate .grid-stack-item.grid-stack-placeholder,.grid-stack.grid-stack-animate .grid-stack-item.ui-draggable-dragging,.grid-stack.grid-stack-animate .grid-stack-item.ui-resizable-resizing{-webkit-transition:left 0s,top 0s,height 0s,width 0s;-moz-transition:left 0s,top 0s,height 0s,width 0s;-ms-transition:left 0s,top 0s,height 0s,width 0s;-o-transition:left 0s,top 0s,height 0s,width 0s;transition:left 0s,top 0s,height 0s,width 0s}.grid-stack.ui-droppable.ui-droppable-over>:not(.ui-droppable){pointer-events:none}";
n(css,{});

/**
 * dd-manager.ts 4.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */

class DDManager {}

var DDManager_1 = DDManager;
var ddManager = /*#__PURE__*/Object.defineProperty({
  DDManager: DDManager_1
}, '__esModule', {
  value: true
});

/**
 * dd-resizable-handle.ts 4.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */

class DDResizableHandle {
  constructor(host, direction, option) {
    /** @internal true after we've moved enough pixels to start a resize */
    this.moving = false;
    this.host = host;
    this.dir = direction;
    this.option = option; // create var event binding so we can easily remove and still look like TS methods (unlike anonymous functions)

    this._mouseDown = this._mouseDown.bind(this);
    this._mouseMove = this._mouseMove.bind(this);
    this._mouseUp = this._mouseUp.bind(this);

    this._init();
  }
  /** @internal */


  _init() {
    const el = document.createElement('div');
    el.classList.add('ui-resizable-handle');
    el.classList.add(`${DDResizableHandle.prefix}${this.dir}`);
    el.style.zIndex = '100';
    el.style.userSelect = 'none';
    this.el = el;
    this.host.appendChild(this.el);
    this.el.addEventListener('mousedown', this._mouseDown);
    return this;
  }
  /** call this when resize handle needs to be removed and cleaned up */


  destroy() {
    if (this.moving) this._mouseUp(this.mouseDownEvent);
    this.el.removeEventListener('mousedown', this._mouseDown);
    this.host.removeChild(this.el);
    delete this.el;
    delete this.host;
    return this;
  }
  /** @internal called on mouse down on us: capture move on the entire document (mouse might not stay on us) until we release the mouse */


  _mouseDown(e) {
    e.preventDefault();
    this.mouseDownEvent = e;
    document.addEventListener('mousemove', this._mouseMove, true); // capture, not bubble

    document.addEventListener('mouseup', this._mouseUp);
  }
  /** @internal */


  _mouseMove(e) {
    let s = this.mouseDownEvent; // don't start unless we've moved at least 3 pixels

    if (!this.moving && Math.abs(e.x - s.x) + Math.abs(e.y - s.y) > 2) {
      this.moving = true;

      this._triggerEvent('start', this.mouseDownEvent);
    } else if (this.moving) {
      this._triggerEvent('move', e);
    }
  }
  /** @internal */


  _mouseUp(e) {
    if (this.moving) {
      this._triggerEvent('stop', e);
    }

    document.removeEventListener('mousemove', this._mouseMove, true);
    document.removeEventListener('mouseup', this._mouseUp);
    delete this.moving;
    delete this.mouseDownEvent;
  }
  /** @internal */


  _triggerEvent(name, event) {
    if (this.option[name]) this.option[name](event);
    return this;
  }

}

var DDResizableHandle_1 = DDResizableHandle;
/** @internal */

DDResizableHandle.prefix = 'ui-resizable-';
var ddResizableHandle = /*#__PURE__*/Object.defineProperty({
  DDResizableHandle: DDResizableHandle_1
}, '__esModule', {
  value: true
});

/**
 * dd-base-impl.ts 4.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */

class DDBaseImplement {
  constructor() {
    /** @internal */
    this._disabled = false;
    /** @internal */

    this._eventRegister = {};
  }
  /** returns the enable state, but you have to call enable()/disable() to change (as other things need to happen) */


  get disabled() {
    return this._disabled;
  }

  on(event, callback) {
    this._eventRegister[event] = callback;
  }

  off(event) {
    delete this._eventRegister[event];
  }

  enable() {
    this._disabled = false;
  }

  disable() {
    this._disabled = true;
  }

  destroy() {
    delete this._eventRegister;
  }

  triggerEvent(eventName, event) {
    if (!this.disabled && this._eventRegister && this._eventRegister[eventName]) return this._eventRegister[eventName](event);
  }

}

var DDBaseImplement_1 = DDBaseImplement;
var ddBaseImpl = /*#__PURE__*/Object.defineProperty({
  DDBaseImplement: DDBaseImplement_1
}, '__esModule', {
  value: true
});

/**
 * dd-utils.ts 4.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */

class DDUtils {
  static clone(el) {
    const node = el.cloneNode(true);
    node.removeAttribute('id');
    return node;
  }

  static appendTo(el, parent) {
    let parentNode;

    if (typeof parent === 'string') {
      parentNode = document.querySelector(parent);
    } else {
      parentNode = parent;
    }

    if (parentNode) {
      parentNode.appendChild(el);
    }
  }

  static setPositionRelative(el) {
    if (!/^(?:r|a|f)/.test(window.getComputedStyle(el).position)) {
      el.style.position = "relative";
    }
  }

  static addElStyles(el, styles) {
    if (styles instanceof Object) {
      for (const s in styles) {
        if (styles.hasOwnProperty(s)) {
          if (Array.isArray(styles[s])) {
            // support fallback value
            styles[s].forEach(val => {
              el.style[s] = val;
            });
          } else {
            el.style[s] = styles[s];
          }
        }
      }
    }
  }

  static initEvent(e, info) {
    const evt = {
      type: info.type
    };
    const obj = {
      button: 0,
      which: 0,
      buttons: 1,
      bubbles: true,
      cancelable: true,
      target: info.target ? info.target : e.target
    }; // don't check for `instanceof DragEvent` as Safari use MouseEvent #1540

    if (e.dataTransfer) {
      evt['dataTransfer'] = e.dataTransfer; // workaround 'readonly' field.
    }

    ['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].forEach(p => evt[p] = e[p]); // keys

    ['pageX', 'pageY', 'clientX', 'clientY', 'screenX', 'screenY'].forEach(p => evt[p] = e[p]); // point info

    return Object.assign(Object.assign({}, evt), obj);
  }

}

var DDUtils_1 = DDUtils;

DDUtils.isEventSupportPassiveOption = (() => {
  let supportsPassive = false;

  let passiveTest = () => {// do nothing
  };

  document.addEventListener('test', passiveTest, {
    get passive() {
      supportsPassive = true;
      return true;
    }

  });
  document.removeEventListener('test', passiveTest);
  return supportsPassive;
})();

var ddUtils = /*#__PURE__*/Object.defineProperty({
  DDUtils: DDUtils_1
}, '__esModule', {
  value: true
});

/**
 * dd-resizable.ts 4.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */


class DDResizable extends ddBaseImpl.DDBaseImplement {
  constructor(el, opts = {}) {
    super();
    /** @internal */

    this._showHandlers = () => {
      this.el.classList.remove('ui-resizable-autohide');
    };
    /** @internal */


    this._hideHandlers = () => {
      this.el.classList.add('ui-resizable-autohide');
    };
    /** @internal */


    this._ui = () => {
      const containmentEl = this.el.parentElement;
      const containmentRect = containmentEl.getBoundingClientRect();
      const newRect = {
        width: this.originalRect.width,
        height: this.originalRect.height + this.scrolled,
        left: this.originalRect.left,
        top: this.originalRect.top - this.scrolled
      };
      const rect = this.temporalRect || newRect;
      return {
        position: {
          left: rect.left - containmentRect.left,
          top: rect.top - containmentRect.top
        },
        size: {
          width: rect.width,
          height: rect.height
        }
        /* Gridstack ONLY needs position set above... keep around in case.
        element: [this.el], // The object representing the element to be resized
        helper: [], // TODO: not support yet - The object representing the helper that's being resized
        originalElement: [this.el],// we don't wrap here, so simplify as this.el //The object representing the original element before it is wrapped
        originalPosition: { // The position represented as { left, top } before the resizable is resized
          left: this.originalRect.left - containmentRect.left,
          top: this.originalRect.top - containmentRect.top
        },
        originalSize: { // The size represented as { width, height } before the resizable is resized
          width: this.originalRect.width,
          height: this.originalRect.height
        }
        */

      };
    };

    this.el = el;
    this.option = opts;
    this.enable();

    this._setupAutoHide();

    this._setupHandlers();
  }

  on(event, callback) {
    super.on(event, callback);
  }

  off(event) {
    super.off(event);
  }

  enable() {
    super.enable();
    this.el.classList.add('ui-resizable');
    this.el.classList.remove('ui-resizable-disabled');
  }

  disable() {
    super.disable();
    this.el.classList.add('ui-resizable-disabled');
    this.el.classList.remove('ui-resizable');
  }

  destroy() {
    this._removeHandlers();

    if (this.option.autoHide) {
      this.el.removeEventListener('mouseover', this._showHandlers);
      this.el.removeEventListener('mouseout', this._hideHandlers);
    }

    this.el.classList.remove('ui-resizable');
    delete this.el;
    super.destroy();
  }

  updateOption(opts) {
    let updateHandles = opts.handles && opts.handles !== this.option.handles;
    let updateAutoHide = opts.autoHide && opts.autoHide !== this.option.autoHide;
    Object.keys(opts).forEach(key => this.option[key] = opts[key]);

    if (updateHandles) {
      this._removeHandlers();

      this._setupHandlers();
    }

    if (updateAutoHide) {
      this._setupAutoHide();
    }

    return this;
  }
  /** @internal */


  _setupAutoHide() {
    if (this.option.autoHide) {
      this.el.classList.add('ui-resizable-autohide'); // use mouseover/mouseout instead of mouseenter/mouseleave to get better performance;

      this.el.addEventListener('mouseover', this._showHandlers);
      this.el.addEventListener('mouseout', this._hideHandlers);
    } else {
      this.el.classList.remove('ui-resizable-autohide');
      this.el.removeEventListener('mouseover', this._showHandlers);
      this.el.removeEventListener('mouseout', this._hideHandlers);
    }

    return this;
  }
  /** @internal */


  _setupHandlers() {
    let handlerDirection = this.option.handles || 'e,s,se';

    if (handlerDirection === 'all') {
      handlerDirection = 'n,e,s,w,se,sw,ne,nw';
    }

    this.handlers = handlerDirection.split(',').map(dir => dir.trim()).map(dir => new ddResizableHandle.DDResizableHandle(this.el, dir, {
      start: event => {
        this._resizeStart(event);
      },
      stop: event => {
        this._resizeStop(event);
      },
      move: event => {
        this._resizing(event, dir);
      }
    }));
    return this;
  }
  /** @internal */


  _resizeStart(event) {
    this.originalRect = this.el.getBoundingClientRect();
    this.scrollEl = utils.Utils.getScrollElement(this.el);
    this.scrollY = this.scrollEl.scrollTop;
    this.startEvent = event;

    this._setupHelper();

    this._applyChange();

    const ev = ddUtils.DDUtils.initEvent(event, {
      type: 'resizestart',
      target: this.el
    });

    if (this.option.start) {
      this.option.start(ev, this._ui());
    }

    this.el.classList.add('ui-resizable-resizing');
    this.triggerEvent('resizestart', ev);
    return this;
  }
  /** @internal */


  _resizing(event, dir) {
    this.scrolled = this.scrollEl.scrollTop - this.scrollY;
    this.temporalRect = this._getChange(event, dir);

    this._applyChange();

    const ev = ddUtils.DDUtils.initEvent(event, {
      type: 'resize',
      target: this.el
    });

    if (this.option.resize) {
      this.option.resize(ev, this._ui());
    }

    this.triggerEvent('resize', ev);
    return this;
  }
  /** @internal */


  _resizeStop(event) {
    const ev = ddUtils.DDUtils.initEvent(event, {
      type: 'resizestop',
      target: this.el
    });

    if (this.option.stop) {
      this.option.stop(ev); // Note: ui() not used by gridstack so don't pass
    }

    this.el.classList.remove('ui-resizable-resizing');
    this.triggerEvent('resizestop', ev);

    this._cleanHelper();

    delete this.startEvent;
    delete this.originalRect;
    delete this.temporalRect;
    delete this.scrollY;
    delete this.scrolled;
    return this;
  }
  /** @internal */


  _setupHelper() {
    this.elOriginStyleVal = DDResizable._originStyleProp.map(prop => this.el.style[prop]);
    this.parentOriginStylePosition = this.el.parentElement.style.position;

    if (window.getComputedStyle(this.el.parentElement).position.match(/static/)) {
      this.el.parentElement.style.position = 'relative';
    }

    this.el.style.position = this.option.basePosition || 'absolute'; // or 'fixed'

    this.el.style.opacity = '0.8';
    this.el.style.zIndex = '1000';
    return this;
  }
  /** @internal */


  _cleanHelper() {
    DDResizable._originStyleProp.forEach((prop, i) => {
      this.el.style[prop] = this.elOriginStyleVal[i] || null;
    });

    this.el.parentElement.style.position = this.parentOriginStylePosition || null;
    return this;
  }
  /** @internal */


  _getChange(event, dir) {
    const oEvent = this.startEvent;
    const newRect = {
      width: this.originalRect.width,
      height: this.originalRect.height + this.scrolled,
      left: this.originalRect.left,
      top: this.originalRect.top - this.scrolled
    };
    const offsetX = event.clientX - oEvent.clientX;
    const offsetY = event.clientY - oEvent.clientY;

    if (dir.indexOf('e') > -1) {
      newRect.width += offsetX;
    } else if (dir.indexOf('w') > -1) {
      newRect.width -= offsetX;
      newRect.left += offsetX;
    }

    if (dir.indexOf('s') > -1) {
      newRect.height += offsetY;
    } else if (dir.indexOf('n') > -1) {
      newRect.height -= offsetY;
      newRect.top += offsetY;
    }

    const constrain = this._constrainSize(newRect.width, newRect.height);

    if (Math.round(newRect.width) !== Math.round(constrain.width)) {
      // round to ignore slight round-off errors
      if (dir.indexOf('w') > -1) {
        newRect.left += newRect.width - constrain.width;
      }

      newRect.width = constrain.width;
    }

    if (Math.round(newRect.height) !== Math.round(constrain.height)) {
      if (dir.indexOf('n') > -1) {
        newRect.top += newRect.height - constrain.height;
      }

      newRect.height = constrain.height;
    }

    return newRect;
  }
  /** @internal constrain the size to the set min/max values */


  _constrainSize(oWidth, oHeight) {
    const maxWidth = this.option.maxWidth || Number.MAX_SAFE_INTEGER;
    const minWidth = this.option.minWidth || oWidth;
    const maxHeight = this.option.maxHeight || Number.MAX_SAFE_INTEGER;
    const minHeight = this.option.minHeight || oHeight;
    const width = Math.min(maxWidth, Math.max(minWidth, oWidth));
    const height = Math.min(maxHeight, Math.max(minHeight, oHeight));
    return {
      width,
      height
    };
  }
  /** @internal */


  _applyChange() {
    let containmentRect = {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    };

    if (this.el.style.position === 'absolute') {
      const containmentEl = this.el.parentElement;
      const {
        left,
        top
      } = containmentEl.getBoundingClientRect();
      containmentRect = {
        left,
        top,
        width: 0,
        height: 0
      };
    }

    if (!this.temporalRect) return this;
    Object.keys(this.temporalRect).forEach(key => {
      const value = this.temporalRect[key];
      this.el.style[key] = value - containmentRect[key] + 'px';
    });
    return this;
  }
  /** @internal */


  _removeHandlers() {
    this.handlers.forEach(handle => handle.destroy());
    delete this.handlers;
    return this;
  }

}

var DDResizable_1 = DDResizable;
/** @internal */

DDResizable._originStyleProp = ['width', 'height', 'position', 'left', 'top', 'opacity', 'zIndex'];
var ddResizable = /*#__PURE__*/Object.defineProperty({
  DDResizable: DDResizable_1
}, '__esModule', {
  value: true
});

/**
 * dd-draggable.ts 4.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */


class DDDraggable extends ddBaseImpl.DDBaseImplement {
  constructor(el, option = {}) {
    super();
    /** @internal */

    this.dragging = false;
    /** @internal TODO: set to public as called by DDDroppable! */

    this.ui = () => {
      const containmentEl = this.el.parentElement;
      const containmentRect = containmentEl.getBoundingClientRect();
      const offset = this.helper.getBoundingClientRect();
      return {
        position: {
          top: offset.top - containmentRect.top,
          left: offset.left - containmentRect.left
        }
        /* not used by GridStack for now...
        helper: [this.helper], //The object arr representing the helper that's being dragged.
        offset: { top: offset.top, left: offset.left } // Current offset position of the helper as { top, left } object.
        */

      };
    };

    this.el = el;
    this.option = option; // get the element that is actually supposed to be dragged by

    let className = option.handle.substring(1);
    this.dragEl = el.classList.contains(className) ? el : el.querySelector(option.handle) || el; // create var event binding so we can easily remove and still look like TS methods (unlike anonymous functions)

    this._dragStart = this._dragStart.bind(this);
    this._drag = this._drag.bind(this);
    this._dragEnd = this._dragEnd.bind(this);
    this.enable();
  }

  on(event, callback) {
    super.on(event, callback);
  }

  off(event) {
    super.off(event);
  }

  enable() {
    super.enable();
    this.dragEl.draggable = true;
    this.dragEl.addEventListener('dragstart', this._dragStart);
    this.el.classList.remove('ui-draggable-disabled');
    this.el.classList.add('ui-draggable');
  }

  disable(forDestroy = false) {
    super.disable();
    this.dragEl.removeAttribute('draggable');
    this.dragEl.removeEventListener('dragstart', this._dragStart);
    this.el.classList.remove('ui-draggable');
    if (!forDestroy) this.el.classList.add('ui-draggable-disabled');
  }

  destroy() {
    if (this.dragging) {
      // Destroy while dragging should remove dragend listener and manually trigger
      // dragend, otherwise dragEnd can't perform dragstop because eventRegistry is
      // destroyed.
      this._dragEnd({});
    }

    this.disable(true);
    delete this.el;
    delete this.helper;
    delete this.option;
    super.destroy();
  }

  updateOption(opts) {
    Object.keys(opts).forEach(key => this.option[key] = opts[key]);
    return this;
  }
  /** @internal */


  _dragStart(event) {
    ddManager.DDManager.dragElement = this;
    this.helper = this._createHelper(event);

    this._setupHelperContainmentStyle();

    this.dragOffset = this._getDragOffset(event, this.el, this.helperContainment);
    const ev = ddUtils.DDUtils.initEvent(event, {
      target: this.el,
      type: 'dragstart'
    });

    if (this.helper !== this.el) {
      this._setupDragFollowNodeNotifyStart(ev);
    } else {
      this.dragFollowTimer = window.setTimeout(() => {
        delete this.dragFollowTimer;

        this._setupDragFollowNodeNotifyStart(ev);
      }, 0);
    }

    this._cancelDragGhost(event);
  }
  /** @internal */


  _setupDragFollowNodeNotifyStart(ev) {
    this._setupHelperStyle();

    document.addEventListener('dragover', this._drag, DDDraggable.dragEventListenerOption);
    this.dragEl.addEventListener('dragend', this._dragEnd);

    if (this.option.start) {
      this.option.start(ev, this.ui());
    }

    this.dragging = true;
    this.helper.classList.add('ui-draggable-dragging');
    this.triggerEvent('dragstart', ev);
    return this;
  }
  /** @internal */


  _drag(event) {
    // Safari: prevent default to allow drop to happen instead of reverting back (with animation) and delaying dragend #1541
    // https://stackoverflow.com/questions/61760755/how-to-fire-dragend-event-immediately
    event.preventDefault();

    this._dragFollow(event);

    const ev = ddUtils.DDUtils.initEvent(event, {
      target: this.el,
      type: 'drag'
    });

    if (this.option.drag) {
      this.option.drag(ev, this.ui());
    }

    this.triggerEvent('drag', ev);
  }
  /** @internal */


  _dragEnd(event) {
    if (this.dragFollowTimer) {
      clearTimeout(this.dragFollowTimer);
      delete this.dragFollowTimer;
      return;
    } else {
      if (this.paintTimer) {
        cancelAnimationFrame(this.paintTimer);
      }

      document.removeEventListener('dragover', this._drag, DDDraggable.dragEventListenerOption);
      this.dragEl.removeEventListener('dragend', this._dragEnd);
    }

    this.dragging = false;
    this.helper.classList.remove('ui-draggable-dragging');
    this.helperContainment.style.position = this.parentOriginStylePosition || null;

    if (this.helper === this.el) {
      this._removeHelperStyle();
    } else {
      this.helper.remove();
    }

    const ev = ddUtils.DDUtils.initEvent(event, {
      target: this.el,
      type: 'dragstop'
    });

    if (this.option.stop) {
      this.option.stop(ev); // Note: ui() not used by gridstack so don't pass
    }

    this.triggerEvent('dragstop', ev);
    delete ddManager.DDManager.dragElement;
    delete this.helper;
  }
  /** @internal create a clone copy (or user defined method) of the original drag item if set */


  _createHelper(event) {
    let helper = this.el;

    if (typeof this.option.helper === 'function') {
      helper = this.option.helper(event);
    } else if (this.option.helper === 'clone') {
      helper = ddUtils.DDUtils.clone(this.el);
    }

    if (!document.body.contains(helper)) {
      ddUtils.DDUtils.appendTo(helper, this.option.appendTo === 'parent' ? this.el.parentNode : this.option.appendTo);
    }

    if (helper === this.el) {
      this.dragElementOriginStyle = DDDraggable.originStyleProp.map(prop => this.el.style[prop]);
    }

    return helper;
  }
  /** @internal */


  _setupHelperStyle() {
    this.helper.style.pointerEvents = 'none';
    this.helper.style.width = this.dragOffset.width + 'px';
    this.helper.style.height = this.dragOffset.height + 'px';
    this.helper.style.willChange = 'left, top';
    this.helper.style.transition = 'none'; // show up instantly

    this.helper.style.position = this.option.basePosition || DDDraggable.basePosition;
    this.helper.style.zIndex = '1000';
    setTimeout(() => {
      if (this.helper) {
        this.helper.style.transition = null; // recover animation
      }
    }, 0);
    return this;
  }
  /** @internal */


  _removeHelperStyle() {
    // don't bother restoring styles if we're gonna remove anyway...
    let node = this.helper ? this.helper.gridstackNode : undefined;

    if (!node || !node._isAboutToRemove) {
      DDDraggable.originStyleProp.forEach(prop => {
        this.helper.style[prop] = this.dragElementOriginStyle[prop] || null;
      });
    }

    delete this.dragElementOriginStyle;
    return this;
  }
  /** @internal */


  _dragFollow(event) {
    if (this.paintTimer) {
      cancelAnimationFrame(this.paintTimer);
    }

    this.paintTimer = requestAnimationFrame(() => {
      delete this.paintTimer;
      const offset = this.dragOffset;
      let containmentRect = {
        left: 0,
        top: 0
      };

      if (this.helper.style.position === 'absolute') {
        const {
          left,
          top
        } = this.helperContainment.getBoundingClientRect();
        containmentRect = {
          left,
          top
        };
      }

      this.helper.style.left = event.clientX + offset.offsetLeft - containmentRect.left + 'px';
      this.helper.style.top = event.clientY + offset.offsetTop - containmentRect.top + 'px';
    });
  }
  /** @internal */


  _setupHelperContainmentStyle() {
    this.helperContainment = this.helper.parentElement;

    if (this.option.basePosition !== 'fixed') {
      this.parentOriginStylePosition = this.helperContainment.style.position;

      if (window.getComputedStyle(this.helperContainment).position.match(/static/)) {
        this.helperContainment.style.position = 'relative';
      }
    }

    return this;
  }
  /** @internal prevent the default gost image to be created (which has wrongas we move the helper/element instead
   * (legacy jquery UI code updates the top/left of the item).
   * TODO: maybe use mouse event instead of HTML5 drag as we have to work around it anyway, or change code to not update
   * the actual grid-item but move the gost image around (and special case jq version) ?
   **/


  _cancelDragGhost(e) {
    /* doesn't seem to do anything...
    let t = e.dataTransfer;
    t.effectAllowed = 'none';
    t.dropEffect = 'none';
    t.setData('text', '');
    */
    // NOTE: according to spec (and required by Safari see #1540) the image has to be visible in the browser (in dom and not hidden) so make it a 1px div
    let img = document.createElement('div');
    img.style.width = '1px';
    img.style.height = '1px';
    document.body.appendChild(img);
    e.dataTransfer.setDragImage(img, 0, 0);
    setTimeout(() => document.body.removeChild(img)); // nuke once drag had a chance to grab this 'image'

    e.stopPropagation();
    return this;
  }
  /** @internal */


  _getDragOffset(event, el, parent) {
    // in case ancestor has transform/perspective css properties that change the viewpoint
    let xformOffsetX = 0;
    let xformOffsetY = 0;

    if (parent) {
      const testEl = document.createElement('div');
      ddUtils.DDUtils.addElStyles(testEl, {
        opacity: '0',
        position: 'fixed',
        top: 0 + 'px',
        left: 0 + 'px',
        width: '1px',
        height: '1px',
        zIndex: '-999999'
      });
      parent.appendChild(testEl);
      const testElPosition = testEl.getBoundingClientRect();
      parent.removeChild(testEl);
      xformOffsetX = testElPosition.left;
      xformOffsetY = testElPosition.top; // TODO: scale ?
    }

    const targetOffset = el.getBoundingClientRect();
    return {
      left: targetOffset.left,
      top: targetOffset.top,
      offsetLeft: -event.clientX + targetOffset.left - xformOffsetX,
      offsetTop: -event.clientY + targetOffset.top - xformOffsetY,
      width: targetOffset.width,
      height: targetOffset.height
    };
  }

}

var DDDraggable_1 = DDDraggable;
/** @internal */

DDDraggable.basePosition = 'absolute';
/** @internal #1541 can't have {passive: true} on Safari as otherwise it reverts animate back to old location on drop */

DDDraggable.dragEventListenerOption = true; // DDUtils.isEventSupportPassiveOption ? { capture: true, passive: true } : true;

/** @internal */

DDDraggable.originStyleProp = ['transition', 'pointerEvents', 'position', 'left', 'top', 'opacity', 'zIndex', 'width', 'height', 'willChange'];
var ddDraggable = /*#__PURE__*/Object.defineProperty({
  DDDraggable: DDDraggable_1
}, '__esModule', {
  value: true
});

/**
 * dd-droppable.ts 4.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */


class DDDroppable extends ddBaseImpl.DDBaseImplement {
  constructor(el, opts = {}) {
    super();
    this.el = el;
    this.option = opts; // create var event binding so we can easily remove and still look like TS methods (unlike anonymous functions)

    this._dragEnter = this._dragEnter.bind(this);
    this._dragOver = this._dragOver.bind(this);
    this._dragLeave = this._dragLeave.bind(this);
    this._drop = this._drop.bind(this);
    this.el.classList.add('ui-droppable');
    this.el.addEventListener('dragenter', this._dragEnter);

    this._setupAccept();
  }

  on(event, callback) {
    super.on(event, callback);
  }

  off(event) {
    super.off(event);
  }

  enable() {
    if (!this.disabled) return;
    super.enable();
    this.el.classList.remove('ui-droppable-disabled');
    this.el.addEventListener('dragenter', this._dragEnter);
  }

  disable(forDestroy = false) {
    if (this.disabled) return;
    super.disable();
    if (!forDestroy) this.el.classList.add('ui-droppable-disabled');
    this.el.removeEventListener('dragenter', this._dragEnter);
  }

  destroy() {
    if (this.moving) {
      this._removeLeaveCallbacks();
    }

    this.disable(true);
    this.el.classList.remove('ui-droppable');
    this.el.classList.remove('ui-droppable-disabled');
    delete this.moving;
    super.destroy();
  }

  updateOption(opts) {
    Object.keys(opts).forEach(key => this.option[key] = opts[key]);

    this._setupAccept();

    return this;
  }
  /** @internal called when the cursor enters our area - prepare for a possible drop and track leaving */


  _dragEnter(event) {
    if (!this._canDrop()) return;
    event.preventDefault();
    if (this.moving) return; // ignore multiple 'dragenter' as we go over existing items

    this.moving = true;
    const ev = ddUtils.DDUtils.initEvent(event, {
      target: this.el,
      type: 'dropover'
    });

    if (this.option.over) {
      this.option.over(ev, this._ui(ddManager.DDManager.dragElement));
    }

    this.triggerEvent('dropover', ev);
    this.el.addEventListener('dragover', this._dragOver);
    this.el.addEventListener('drop', this._drop);
    this.el.addEventListener('dragleave', this._dragLeave);
    this.el.classList.add('ui-droppable-over');
  }
  /** @internal called when an moving to drop item is being dragged over - do nothing but eat the event */


  _dragOver(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  /** @internal called when the item is leaving our area, stop tracking if we had moving item */


  _dragLeave(event) {
    // ignore leave events on our children (get when starting to drag our items)
    // Note: Safari Mac has null relatedTarget which causes #1684 so check if DragEvent is inside the grid instead
    if (!event.relatedTarget) {
      const {
        bottom,
        left,
        right,
        top
      } = this.el.getBoundingClientRect();
      if (event.x < right && event.x > left && event.y < bottom && event.y > top) return;
    } else if (this.el.contains(event.relatedTarget)) return;

    this._removeLeaveCallbacks();

    if (this.moving) {
      event.preventDefault();
      const ev = ddUtils.DDUtils.initEvent(event, {
        target: this.el,
        type: 'dropout'
      });

      if (this.option.out) {
        this.option.out(ev, this._ui(ddManager.DDManager.dragElement));
      }

      this.triggerEvent('dropout', ev);
    }

    delete this.moving;
  }
  /** @internal item is being dropped on us - call the client drop event */


  _drop(event) {
    if (!this.moving) return; // should not have received event...

    event.preventDefault();
    const ev = ddUtils.DDUtils.initEvent(event, {
      target: this.el,
      type: 'drop'
    });

    if (this.option.drop) {
      this.option.drop(ev, this._ui(ddManager.DDManager.dragElement));
    }

    this.triggerEvent('drop', ev);

    this._removeLeaveCallbacks();

    delete this.moving;
  }
  /** @internal called to remove callbacks when leaving or dropping */


  _removeLeaveCallbacks() {
    this.el.removeEventListener('dragleave', this._dragLeave);
    this.el.classList.remove('ui-droppable-over');

    if (this.moving) {
      this.el.removeEventListener('dragover', this._dragOver);
      this.el.removeEventListener('drop', this._drop);
    } // Note: this.moving is reset by callee of this routine to control the flow

  }
  /** @internal */


  _canDrop() {
    return ddManager.DDManager.dragElement && (!this.accept || this.accept(ddManager.DDManager.dragElement.el));
  }
  /** @internal */


  _setupAccept() {
    if (this.option.accept && typeof this.option.accept === 'string') {
      this.accept = el => {
        return el.matches(this.option.accept);
      };
    } else {
      this.accept = this.option.accept;
    }

    return this;
  }
  /** @internal */


  _ui(drag) {
    return Object.assign({
      draggable: drag.el
    }, drag.ui());
  }

}

var DDDroppable_1 = DDDroppable;
var ddDroppable = /*#__PURE__*/Object.defineProperty({
  DDDroppable: DDDroppable_1
}, '__esModule', {
  value: true
});

/**
 * dd-elements.ts 4.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */


class DDElement {
  constructor(el) {
    this.el = el;
  }

  static init(el) {
    if (!el.ddElement) {
      el.ddElement = new DDElement(el);
    }

    return el.ddElement;
  }

  on(eventName, callback) {
    if (this.ddDraggable && ['drag', 'dragstart', 'dragstop'].indexOf(eventName) > -1) {
      this.ddDraggable.on(eventName, callback);
    } else if (this.ddDroppable && ['drop', 'dropover', 'dropout'].indexOf(eventName) > -1) {
      this.ddDroppable.on(eventName, callback);
    } else if (this.ddResizable && ['resizestart', 'resize', 'resizestop'].indexOf(eventName) > -1) {
      this.ddResizable.on(eventName, callback);
    }

    return this;
  }

  off(eventName) {
    if (this.ddDraggable && ['drag', 'dragstart', 'dragstop'].indexOf(eventName) > -1) {
      this.ddDraggable.off(eventName);
    } else if (this.ddDroppable && ['drop', 'dropover', 'dropout'].indexOf(eventName) > -1) {
      this.ddDroppable.off(eventName);
    } else if (this.ddResizable && ['resizestart', 'resize', 'resizestop'].indexOf(eventName) > -1) {
      this.ddResizable.off(eventName);
    }

    return this;
  }

  setupDraggable(opts) {
    if (!this.ddDraggable) {
      this.ddDraggable = new ddDraggable.DDDraggable(this.el, opts);
    } else {
      this.ddDraggable.updateOption(opts);
    }

    return this;
  }

  cleanDraggable() {
    if (this.ddDraggable) {
      this.ddDraggable.destroy();
      delete this.ddDraggable;
    }

    return this;
  }

  setupResizable(opts) {
    if (!this.ddResizable) {
      this.ddResizable = new ddResizable.DDResizable(this.el, opts);
    } else {
      this.ddResizable.updateOption(opts);
    }

    return this;
  }

  cleanResizable() {
    if (this.ddResizable) {
      this.ddResizable.destroy();
      delete this.ddResizable;
    }

    return this;
  }

  setupDroppable(opts) {
    if (!this.ddDroppable) {
      this.ddDroppable = new ddDroppable.DDDroppable(this.el, opts);
    } else {
      this.ddDroppable.updateOption(opts);
    }

    return this;
  }

  cleanDroppable() {
    if (this.ddDroppable) {
      this.ddDroppable.destroy();
      delete this.ddDroppable;
    }

    return this;
  }

}

var DDElement_1 = DDElement;
var ddElement = /*#__PURE__*/Object.defineProperty({
  DDElement: DDElement_1
}, '__esModule', {
  value: true
});

/**
 * gridstack-dd.ts 4.2.3
 * Copyright (c) 2021 Alain Dumesny - see GridStack root license
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * Base class implementing common Grid drag'n'drop functionality, with domain specific subclass (h5 vs jq subclasses)
 */


class GridStackDD extends gridstackDdi.GridStackDDI {
  /** override to cast to correct type */
  static get() {
    return gridstackDdi.GridStackDDI.get();
  }
  /** removes any drag&drop present (called during destroy) */


  remove(el) {
    this.draggable(el, 'destroy').resizable(el, 'destroy');

    if (el.gridstackNode) {
      delete el.gridstackNode._initDD; // reset our DD init flag
    }

    return this;
  }

}

var GridStackDD_1 = GridStackDD;
/********************************************************************************
 * GridStack code that is doing drag&drop extracted here so main class is smaller
 * for static grid that don't do any of this work anyway. Saves about 10k.
 * TODO: no code hint in code below as this is <any> so look at alternatives ?
 * https://www.typescriptlang.org/docs/handbook/declaration-merging.html
 * https://www.typescriptlang.org/docs/handbook/mixins.html
 ********************************************************************************/

/** @internal called to add drag over to support widgets being added externally */

gridstack.GridStack.prototype._setupAcceptWidget = function () {
  if (this.opts.staticGrid) return this; // vars shared across all methods

  let gridPos;
  let cellHeight, cellWidth;

  let onDrag = (event, el, helper) => {
    let node = el.gridstackNode;
    if (!node) return;
    helper = helper || el;
    let rec = helper.getBoundingClientRect();
    let left = rec.left - gridPos.left;
    let top = rec.top - gridPos.top;
    let ui = {
      position: {
        top,
        left
      }
    };

    if (node._temporaryRemoved) {
      node.x = Math.max(0, Math.round(left / cellWidth));
      node.y = Math.max(0, Math.round(top / cellHeight));
      delete node.autoPosition;
      this.engine.nodeBoundFix(node); // don't accept *initial* location if doesn't fit #1419 (locked drop region, or can't grow), but maybe try if it will go somewhere

      if (!this.engine.willItFit(node)) {
        node.autoPosition = true; // ignore x,y and try for any slot...

        if (!this.engine.willItFit(node)) {
          GridStackDD.get().off(el, 'drag'); // stop calling us

          return; // full grid or can't grow
        }

        if (node._willFitPos) {
          // use the auto position instead #1687
          utils.Utils.copyPos(node, node._willFitPos);
          delete node._willFitPos;
        }
      } // re-use the existing node dragging method


      this._onStartMoving(helper, event, ui, node, cellWidth, cellHeight);
    } else {
      // re-use the existing node dragging that does so much of the collision detection
      this._dragOrResize(helper, event, ui, node, cellWidth, cellHeight);
    }
  };

  GridStackDD.get().droppable(this.el, {
    accept: el => {
      let node = el.gridstackNode; // set accept drop to true on ourself (which we ignore) so we don't get "can't drop" icon in HTML5 mode while moving

      if (node && node.grid === this) return true;
      if (!this.opts.acceptWidgets) return false; // check for accept method or class matching

      let canAccept = true;

      if (typeof this.opts.acceptWidgets === 'function') {
        canAccept = this.opts.acceptWidgets(el);
      } else {
        let selector = this.opts.acceptWidgets === true ? '.grid-stack-item' : this.opts.acceptWidgets;
        canAccept = el.matches(selector);
      } // finally check to make sure we actually have space left #1571


      if (canAccept && node && this.opts.maxRow) {
        let n = {
          w: node.w,
          h: node.h,
          minW: node.minW,
          minH: node.minH
        }; // only width/height matters and autoPosition

        canAccept = this.engine.willItFit(n);
      }

      return canAccept;
    }
  })
  /**
   * entering our grid area
   */
  .on(this.el, 'dropover', (event, el, helper) => {
    let node = el.gridstackNode; // ignore drop enter on ourself (unless we temporarily removed) which happens on a simple drag of our item

    if (node && node.grid === this && !node._temporaryRemoved) {
      // delete node._added; // reset this to track placeholder again in case we were over other grid #1484 (dropout doesn't always clear)
      return false; // prevent parent from receiving msg (which may be a grid as well)
    } // fix #1578 when dragging fast, we may not get a leave on the previous grid so force one now


    if (node && node.grid && node.grid !== this && !node._temporaryRemoved) {
      // TEST console.log('dropover without leave');
      let otherGrid = node.grid;

      otherGrid._leave(el.gridstackNode, el, helper, true); // MATCH line 222

    } // get grid screen coordinates and cell dimensions


    let box = this.el.getBoundingClientRect();
    gridPos = {
      top: box.top,
      left: box.left
    };
    cellWidth = this.cellWidth();
    cellHeight = this.getCellHeight(true); // load any element attributes if we don't have a node

    if (!node) {
      node = this._readAttr(el);
    }

    if (!node.grid) {
      node._isExternal = true;
      el.gridstackNode = node;
    } // calculate the grid size based on element outer size


    helper = helper || el;
    let w = node.w || Math.round(helper.offsetWidth / cellWidth) || 1;
    let h = node.h || Math.round(helper.offsetHeight / cellHeight) || 1; // if the item came from another grid, make a copy and save the original info in case we go back there

    if (node.grid && node.grid !== this) {
      // copy the node original values (min/max/id/etc...) but override width/height/other flags which are this grid specific
      // TEST console.log('dropover cloning node');
      if (!el._gridstackNodeOrig) el._gridstackNodeOrig = node; // shouldn't have multiple nested!

      el.gridstackNode = node = Object.assign(Object.assign({}, node), {
        w,
        h,
        grid: this
      });
      this.engine.cleanupNode(node).nodeBoundFix(node); // restore some internal fields we need after clearing them all

      node._initDD = node._isExternal = // DOM needs to be re-parented on a drop
      node._temporaryRemoved = true; // so it can be inserted onDrag below
    } else {
      node.w = w;
      node.h = h;
      node._temporaryRemoved = true; // so we can insert it
    }

    GridStackDD.get().on(el, 'drag', onDrag); // make sure this is called at least once when going fast #1578

    onDrag(event, el, helper);
    return false; // prevent parent from receiving msg (which may be a grid as well)
  })
  /**
   * Leaving our grid area...
   */
  .on(this.el, 'dropout', (event, el, helper) => {
    let node = el.gridstackNode; // fix #1578 when dragging fast, we might get leave after other grid gets enter (which calls us to clean)
    // so skip this one if we're not the active grid really..

    if (!node.grid || node.grid === this) {
      this._leave(node, el, helper, true); // MATCH line 166

    }

    return false; // prevent parent from receiving msg (which may be grid as well)
  })
  /**
   * end - releasing the mouse
   */
  .on(this.el, 'drop', (event, el, helper) => {
    let node = el.gridstackNode; // ignore drop on ourself from ourself that didn't come from the outside - dragend will handle the simple move instead

    if (node && node.grid === this && !node._isExternal) return false;
    let wasAdded = !!this.placeholder.parentElement; // skip items not actually added to us because of constrains, but do cleanup #1419

    this.placeholder.remove(); // notify previous grid of removal
    // TEST console.log('drop delete _gridstackNodeOrig')

    let origNode = el._gridstackNodeOrig;
    delete el._gridstackNodeOrig;

    if (wasAdded && origNode && origNode.grid && origNode.grid !== this) {
      let oGrid = origNode.grid;
      oGrid.engine.removedNodes.push(origNode);

      oGrid._triggerRemoveEvent();
    }

    if (!node) return false; // use existing placeholder node as it's already in our list with drop location

    if (wasAdded) {
      this.engine.cleanupNode(node); // removes all internal _xyz values

      node.grid = this;
    }

    GridStackDD.get().off(el, 'drag'); // if we made a copy ('helper' which is temp) of the original node then insert a copy, else we move the original node (#1102)
    // as the helper will be nuked by jquery-ui otherwise

    if (helper !== el) {
      helper.remove();
      el.gridstackNode = origNode; // original item (left behind) is re-stored to pre dragging as the node now has drop info

      if (wasAdded) {
        el = el.cloneNode(true);
      }
    } else {
      el.remove(); // reduce flicker as we change depth here, and size further down

      GridStackDD.get().remove(el);
    }

    if (!wasAdded) return false;
    el.gridstackNode = node;
    node.el = el;
    utils.Utils.copyPos(node, this._readAttr(this.placeholder)); // placeholder values as moving VERY fast can throw things off #1578

    utils.Utils.removePositioningStyles(el);

    this._writeAttr(el, node);

    this.el.appendChild(el);

    this._updateContainerHeight();

    this.engine.addedNodes.push(node);

    this._triggerAddEvent();

    this._triggerChangeEvent();

    this.engine.endUpdate();

    if (this._gsEventHandler['dropped']) {
      this._gsEventHandler['dropped']({
        type: 'dropped'
      }, origNode && origNode.grid ? origNode : undefined, node);
    } // wait till we return out of the drag callback to set the new drag&resize handler or they may get messed up


    window.setTimeout(() => {
      // IFF we are still there (some application will use as placeholder and insert their real widget instead and better call makeWidget())
      if (node.el && node.el.parentElement) {
        this._prepareDragDropByNode(node);
      } else {
        this.engine.removeNode(node);
      }
    });
    return false; // prevent parent from receiving msg (which may be grid as well)
  });
  return this;
};
/** @internal called to setup a trash drop zone if the user specifies it */


gridstack.GridStack.prototype._setupRemoveDrop = function () {
  if (!this.opts.staticGrid && typeof this.opts.removable === 'string') {
    let trashEl = document.querySelector(this.opts.removable);
    if (!trashEl) return this; // only register ONE drop-over/dropout callback for the 'trash', and it will
    // update the passed in item and parent grid because the 'trash' is a shared resource anyway,
    // and Native DD only has 1 event CB (having a list and technically a per grid removableOptions complicates things greatly)

    if (!GridStackDD.get().isDroppable(trashEl)) {
      GridStackDD.get().droppable(trashEl, this.opts.removableOptions).on(trashEl, 'dropover', function (event, el) {
        let node = el.gridstackNode;
        if (!node || !node.grid) return;
        node._isAboutToRemove = true;
        el.classList.add('grid-stack-item-removing');
      }).on(trashEl, 'dropout', function (event, el) {
        let node = el.gridstackNode;
        if (!node || !node.grid) return;
        delete node._isAboutToRemove;
        el.classList.remove('grid-stack-item-removing');
      });
    }
  }

  return this;
};
/**
 * call to setup dragging in from the outside (say toolbar), by specifying the class selection and options.
 * Called during GridStack.init() as options, but can also be called directly (last param are cached) in case the toolbar
 * is dynamically create and needs to change later.
 **/


gridstack.GridStack.setupDragIn = function (_dragIn, _dragInOptions) {
  let dragIn;
  let dragInOptions;
  const dragInDefaultOptions = {
    revert: 'invalid',
    handle: '.grid-stack-item-content',
    scroll: false,
    appendTo: 'body'
  }; // cache in the passed in values (form grid init?) so they don't have to resend them each time

  if (_dragIn) {
    dragIn = _dragIn;
    dragInOptions = Object.assign(Object.assign({}, dragInDefaultOptions), _dragInOptions || {});
  }

  if (typeof dragIn !== 'string') return;
  let dd = GridStackDD.get();
  utils.Utils.getElements(dragIn).forEach(el => {
    if (!dd.isDraggable(el)) dd.dragIn(el, dragInOptions);
  });
};
/** @internal prepares the element for drag&drop **/


gridstack.GridStack.prototype._prepareDragDropByNode = function (node) {
  let el = node.el;
  let dd = GridStackDD.get(); // check for disabled grid first

  if (this.opts.staticGrid || node.locked || (node.noMove || this.opts.disableDrag) && (node.noResize || this.opts.disableResize)) {
    if (node._initDD) {
      dd.remove(el); // nukes everything instead of just disable, will add some styles back next

      delete node._initDD;
    }

    el.classList.add('ui-draggable-disabled', 'ui-resizable-disabled'); // add styles one might depend on #1435

    return this;
  }

  if (!node._initDD) {
    // variables used/cashed between the 3 start/move/end methods, in addition to node passed above
    let cellWidth;
    let cellHeight;
    /** called when item starts moving/resizing */

    let onStartMoving = (event, ui) => {
      // trigger any 'dragstart' / 'resizestart' manually
      if (this._gsEventHandler[event.type]) {
        this._gsEventHandler[event.type](event, event.target);
      }

      cellWidth = this.cellWidth();
      cellHeight = this.getCellHeight(true); // force pixels for calculations

      this._onStartMoving(el, event, ui, node, cellWidth, cellHeight);
    };
    /** called when item is being dragged/resized */


    let dragOrResize = (event, ui) => {
      this._dragOrResize(el, event, ui, node, cellWidth, cellHeight);
    };
    /** called when the item stops moving/resizing */


    let onEndMoving = event => {
      this.placeholder.remove();
      delete node._moving;
      delete node._lastTried; // if the item has moved to another grid, we're done here

      let target = event.target;
      if (!target.gridstackNode || target.gridstackNode.grid !== this) return;
      node.el = target;

      if (node._isAboutToRemove) {
        let gridToNotify = el.gridstackNode.grid;

        if (gridToNotify._gsEventHandler[event.type]) {
          gridToNotify._gsEventHandler[event.type](event, target);
        }

        dd.remove(el);
        gridToNotify.engine.removedNodes.push(node);

        gridToNotify._triggerRemoveEvent(); // break circular links and remove DOM


        delete el.gridstackNode;
        delete node.el;
        el.remove();
      } else {
        if (!node._temporaryRemoved) {
          // move to new placeholder location
          utils.Utils.removePositioningStyles(target);

          this._writePosAttr(target, node);
        } else {
          // got removed - restore item back to before dragging position
          utils.Utils.removePositioningStyles(target);
          utils.Utils.copyPos(node, node._orig);

          this._writePosAttr(target, node);

          this.engine.addNode(node);
        }

        if (this._gsEventHandler[event.type]) {
          this._gsEventHandler[event.type](event, target);
        }
      }

      this._extraDragRow = 0;

      this._updateContainerHeight();

      this._triggerChangeEvent();

      this.engine.endUpdate();
    };

    dd.draggable(el, {
      start: onStartMoving,
      stop: onEndMoving,
      drag: dragOrResize
    }).resizable(el, {
      start: onStartMoving,
      stop: onEndMoving,
      resize: dragOrResize
    });
    node._initDD = true; // we've set DD support now
  } // finally fine tune move vs resize by disabling any part...


  if (node.noMove || this.opts.disableDrag) {
    dd.draggable(el, 'disable');
    el.classList.add('ui-draggable-disabled');
  } else {
    dd.draggable(el, 'enable');
    el.classList.remove('ui-draggable-disabled');
  }

  if (node.noResize || this.opts.disableResize) {
    dd.resizable(el, 'disable');
    el.classList.add('ui-resizable-disabled');
  } else {
    dd.resizable(el, 'enable');
    el.classList.remove('ui-resizable-disabled');
  }

  return this;
};
/** @internal called when item is starting a drag/resize */


gridstack.GridStack.prototype._onStartMoving = function (el, event, ui, node, cellWidth, cellHeight) {
  this.engine.cleanNodes().beginUpdate(node);

  this._writePosAttr(this.placeholder, node);

  this.el.appendChild(this.placeholder); // TEST console.log('_onStartMoving placeholder')

  node.el = this.placeholder;
  node._lastUiPosition = ui.position;
  node._prevYPix = ui.position.top;
  node._moving = event.type === 'dragstart'; // 'dropover' are not initially moving so they can go exactly where they enter (will push stuff out of the way)

  delete node._lastTried;

  if (event.type === 'dropover' && node._temporaryRemoved) {
    // TEST console.log('engine.addNode x=' + node.x);
    this.engine.addNode(node); // will add, fix collisions, update attr and clear _temporaryRemoved

    node._moving = true; // AFTER, mark as moving object (wanted fix location before)
  } // set the min/max resize info


  this.engine.cacheRects(cellWidth, cellHeight, this.opts.marginTop, this.opts.marginRight, this.opts.marginBottom, this.opts.marginLeft);

  if (event.type === 'resizestart') {
    let dd = GridStackDD.get().resizable(el, 'option', 'minWidth', cellWidth * (node.minW || 1)).resizable(el, 'option', 'minHeight', cellHeight * (node.minH || 1));

    if (node.maxW) {
      dd.resizable(el, 'option', 'maxWidth', cellWidth * node.maxW);
    }

    if (node.maxH) {
      dd.resizable(el, 'option', 'maxHeight', cellHeight * node.maxH);
    }
  }
};
/** @internal called when item leaving our area by either cursor dropout event
 * or shape is outside our boundaries. remove it from us, and mark temporary if this was
 * our item to start with else restore prev node values from prev grid it came from.
 **/


gridstack.GridStack.prototype._leave = function (node, el, helper, dropoutEvent = false) {
  if (!node) return;

  if (dropoutEvent) {
    GridStackDD.get().off(el, 'drag'); // no need to track while being outside
  } // this gets called when cursor leaves and shape is outside, so only do this once


  if (node._temporaryRemoved) return;
  node._temporaryRemoved = true;
  this.engine.removeNode(node); // remove placeholder as well, otherwise it's a sign node is not in our list, which is a bigger issue

  node.el = node._isExternal && helper ? helper : el; // point back to real item being dragged
  // finally if item originally came from another grid, but left us, restore things back to prev info

  if (el._gridstackNodeOrig) {
    // TEST console.log('leave delete _gridstackNodeOrig')
    el.gridstackNode = el._gridstackNodeOrig;
    delete el._gridstackNodeOrig;
  } else if (node._isExternal) {
    // item came from outside (like a toolbar) so nuke any node info
    delete node.el;
    delete el.gridstackNode; // and restore all nodes back to original

    this.engine.restoreInitial();
  }
};
/** @internal called when item is being dragged/resized */


gridstack.GridStack.prototype._dragOrResize = function (el, event, ui, node, cellWidth, cellHeight) {
  let p = Object.assign({}, node._orig); // could be undefined (_isExternal) which is ok (drag only set x,y and w,h will default to node value)

  let resizing;

  if (event.type === 'drag') {
    if (node._temporaryRemoved) return; // handled by dropover

    let distance = ui.position.top - node._prevYPix;
    node._prevYPix = ui.position.top;
    utils.Utils.updateScrollPosition(el, ui.position, distance); // get new position taking into account the margin in the direction we are moving! (need to pass mid point by margin)

    let left = ui.position.left + (ui.position.left > node._lastUiPosition.left ? -this.opts.marginRight : this.opts.marginLeft);
    let top = ui.position.top + (ui.position.top > node._lastUiPosition.top ? -this.opts.marginBottom : this.opts.marginTop);
    p.x = Math.round(left / cellWidth);
    p.y = Math.round(top / cellHeight); // if we're at the bottom hitting something else, grow the grid so cursor doesn't leave when trying to place below others

    let prev = this._extraDragRow;

    if (this.engine.collide(node, p)) {
      let row = this.getRow();
      let extra = Math.max(0, p.y + node.h - row);

      if (this.opts.maxRow && row + extra > this.opts.maxRow) {
        extra = Math.max(0, this.opts.maxRow - row);
      }

      this._extraDragRow = extra;
    } else this._extraDragRow = 0;

    if (this._extraDragRow !== prev) this._updateContainerHeight();
    if (node.x === p.x && node.y === p.y) return; // skip same
    // DON'T skip one we tried as we might have failed because of coverage <50% before
    // if (node._lastTried && node._lastTried.x === x && node._lastTried.y === y) return;
  } else if (event.type === 'resize') {
    if (p.x < 0) return; // Scrolling page if needed

    utils.Utils.updateScrollResize(event, el, cellHeight); // get new size

    p.w = Math.round((ui.size.width - this.opts.marginLeft) / cellWidth);
    p.h = Math.round((ui.size.height - this.opts.marginTop) / cellHeight);
    if (node.w === p.w && node.h === p.h) return;
    if (node._lastTried && node._lastTried.w === p.w && node._lastTried.h === p.h) return; // skip one we tried (but failed)
    // if we size on left/top side this might move us, so get possible new position as well

    let left = ui.position.left + this.opts.marginLeft;
    let top = ui.position.top + this.opts.marginTop;
    p.x = Math.round(left / cellWidth);
    p.y = Math.round(top / cellHeight);
    resizing = true;
  }

  node._lastTried = p; // set as last tried (will nuke if we go there)

  let rect = {
    x: ui.position.left + this.opts.marginLeft,
    y: ui.position.top + this.opts.marginTop,
    w: (ui.size ? ui.size.width : node.w * cellWidth) - this.opts.marginLeft - this.opts.marginRight,
    h: (ui.size ? ui.size.height : node.h * cellHeight) - this.opts.marginTop - this.opts.marginBottom
  };

  if (this.engine.moveNodeCheck(node, Object.assign(Object.assign({}, p), {
    cellWidth,
    cellHeight,
    rect
  }))) {
    node._lastUiPosition = ui.position;
    this.engine.cacheRects(cellWidth, cellHeight, this.opts.marginTop, this.opts.marginRight, this.opts.marginBottom, this.opts.marginLeft);
    delete node._skipDown;

    if (resizing && node.subGrid) {
      node.subGrid.onParentResize();
    }

    this._extraDragRow = 0;

    this._updateContainerHeight();

    let target = event.target;

    this._writePosAttr(target, node);

    if (this._gsEventHandler[event.type]) {
      this._gsEventHandler[event.type](event, target);
    }
  }
};
/**
 * Enables/Disables moving.
 * @param els widget or selector to modify.
 * @param val if true widget will be draggable.
 */


gridstack.GridStack.prototype.movable = function (els, val) {
  if (this.opts.staticGrid) return this; // can't move a static grid!

  gridstack.GridStack.getElements(els).forEach(el => {
    let node = el.gridstackNode;
    if (!node || node.locked) return;
    if (val) delete node.noMove;else node.noMove = true;

    this._prepareDragDropByNode(node); // init DD if need be, and adjust

  });
  return this;
};
/**
 * Enables/Disables resizing.
 * @param els  widget or selector to modify
 * @param val  if true widget will be resizable.
 */


gridstack.GridStack.prototype.resizable = function (els, val) {
  if (this.opts.staticGrid) return this; // can't resize a static grid!

  gridstack.GridStack.getElements(els).forEach(el => {
    let node = el.gridstackNode;
    if (!node || node.locked) return;
    if (val) delete node.noResize;else node.noResize = true;

    this._prepareDragDropByNode(node); // init DD if need be, and adjust

  });
  return this;
};
/**
  * Temporarily disables widgets moving/resizing.
  * If you want a more permanent way (which freezes up resources) use `setStatic(true)` instead.
  * Note: no-op for static grid
  * This is a shortcut for:
  * @example
  *  grid.enableMove(false);
  *  grid.enableResize(false);
  */


gridstack.GridStack.prototype.disable = function () {
  if (this.opts.staticGrid) return;
  this.enableMove(false);
  this.enableResize(false);

  this._triggerEvent('disable');

  return this;
};
/**
  * Re-enables widgets moving/resizing - see disable().
  * Note: no-op for static grid.
  * This is a shortcut for:
  * @example
  *  grid.enableMove(true);
  *  grid.enableResize(true);
  */


gridstack.GridStack.prototype.enable = function () {
  if (this.opts.staticGrid) return;
  this.enableMove(true);
  this.enableResize(true);

  this._triggerEvent('enable');

  return this;
};
/** Enables/disables widget moving. No-op for static grids. */


gridstack.GridStack.prototype.enableMove = function (doEnable) {
  if (this.opts.staticGrid) return this; // can't move a static grid!

  this.opts.disableDrag = !doEnable; // FIRST before we update children as grid overrides #1658

  this.engine.nodes.forEach(n => this.movable(n.el, doEnable));
  return this;
};
/** Enables/disables widget resizing. No-op for static grids. */


gridstack.GridStack.prototype.enableResize = function (doEnable) {
  if (this.opts.staticGrid) return this; // can't size a static grid!

  this.opts.disableResize = !doEnable; // FIRST before we update children as grid overrides #1658

  this.engine.nodes.forEach(n => this.resizable(n.el, doEnable));
  return this;
};

var gridstackDd = /*#__PURE__*/Object.defineProperty({
  GridStackDD: GridStackDD_1
}, '__esModule', {
  value: true
});

createCommonjsModule(function (module, exports) {
  /**
   * gridstack-dd-native.ts 4.2.3
   * Copyright (c) 2021 Alain Dumesny - see GridStack root license
   */

  function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
  }

  Object.defineProperty(exports, "__esModule", {
    value: true
  }); // export our base class (what user should use) and all associated types

  __export(gridstackDd);
  /**
   * HTML 5 Native DragDrop based drag'n'drop plugin.
   */


  class GridStackDDNative extends gridstackDd.GridStackDD {
    resizable(el, opts, key, value) {
      this._getDDElements(el).forEach(dEl => {
        if (opts === 'disable' || opts === 'enable') {
          dEl.ddResizable && dEl.ddResizable[opts](); // can't create DD as it requires options for setupResizable()
        } else if (opts === 'destroy') {
          dEl.ddResizable && dEl.cleanResizable();
        } else if (opts === 'option') {
          dEl.setupResizable({
            [key]: value
          });
        } else {
          const grid = dEl.el.gridstackNode.grid;
          let handles = dEl.el.getAttribute('gs-resize-handles') ? dEl.el.getAttribute('gs-resize-handles') : grid.opts.resizable.handles;
          dEl.setupResizable(Object.assign(Object.assign(Object.assign({}, grid.opts.resizable), {
            handles: handles
          }), {
            start: opts.start,
            stop: opts.stop,
            resize: opts.resize
          }));
        }
      });

      return this;
    }

    draggable(el, opts, key, value) {
      this._getDDElements(el).forEach(dEl => {
        if (opts === 'disable' || opts === 'enable') {
          dEl.ddDraggable && dEl.ddDraggable[opts](); // can't create DD as it requires options for setupDraggable()
        } else if (opts === 'destroy') {
          dEl.ddDraggable && dEl.cleanDraggable();
        } else if (opts === 'option') {
          dEl.setupDraggable({
            [key]: value
          });
        } else {
          const grid = dEl.el.gridstackNode.grid;
          dEl.setupDraggable(Object.assign(Object.assign({}, grid.opts.draggable), {
            containment: grid.opts._isNested && !grid.opts.dragOut ? grid.el.parentElement : grid.opts.draggable.containment || null,
            start: opts.start,
            stop: opts.stop,
            drag: opts.drag
          }));
        }
      });

      return this;
    }

    dragIn(el, opts) {
      this._getDDElements(el).forEach(dEl => dEl.setupDraggable(opts));

      return this;
    }

    droppable(el, opts, key, value) {
      if (typeof opts.accept === 'function' && !opts._accept) {
        opts._accept = opts.accept;

        opts.accept = el => opts._accept(el);
      }

      this._getDDElements(el).forEach(dEl => {
        if (opts === 'disable' || opts === 'enable') {
          dEl.ddDroppable && dEl.ddDroppable[opts]();
        } else if (opts === 'destroy') {
          if (dEl.ddDroppable) {
            // error to call destroy if not there
            dEl.cleanDroppable();
          }
        } else if (opts === 'option') {
          dEl.setupDroppable({
            [key]: value
          });
        } else {
          dEl.setupDroppable(opts);
        }
      });

      return this;
    }
    /** true if element is droppable */


    isDroppable(el) {
      return !!(el && el.ddElement && el.ddElement.ddDroppable && !el.ddElement.ddDroppable.disabled);
    }
    /** true if element is draggable */


    isDraggable(el) {
      return !!(el && el.ddElement && el.ddElement.ddDraggable && !el.ddElement.ddDraggable.disabled);
    }
    /** true if element is draggable */


    isResizable(el) {
      return !!(el && el.ddElement && el.ddElement.ddResizable && !el.ddElement.ddResizable.disabled);
    }

    on(el, name, callback) {
      this._getDDElements(el).forEach(dEl => dEl.on(name, event => {
        callback(event, ddManager.DDManager.dragElement ? ddManager.DDManager.dragElement.el : event.target, ddManager.DDManager.dragElement ? ddManager.DDManager.dragElement.helper : null);
      }));

      return this;
    }

    off(el, name) {
      this._getDDElements(el).forEach(dEl => dEl.off(name));

      return this;
    }
    /** @internal returns a list of DD elements, creating them on the fly by default */


    _getDDElements(els, create = true) {
      let hosts = utils.Utils.getElements(els);
      if (!hosts.length) return [];
      let list = hosts.map(e => e.ddElement || (create ? ddElement.DDElement.init(e) : null));

      if (!create) {
        list.filter(d => d);
      } // remove nulls


      return list;
    }

  }

  exports.GridStackDDNative = GridStackDDNative; // finally register ourself

  gridstackDd.GridStackDD.registerPlugin(GridStackDDNative);
});

var headerTemplate = "<div class=\"workspace-header-wrapper\">\n  <div class=\"workspace-header-menu\">\n    <div class=\"workspace-header-logo\">LOGO</div>\n    <div class=\"workspace-header-item\">DataCAD</div>\n    <div class=\"workspace-header-item\">Работа с данными</div>\n    <div class=\"workspace-header-item\">Дашборды</div>\n    <div class=\"workspace-header-item\">Приложения</div>\n    <div class=\"workspace-header-item\">Помощь</div>\n  </div>\n  <div class=\"workspace-header-right-menu\">\n    <svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M9 16.5C8.17204 16.4959 7.50069 15.8279 7.4925 15H10.4925C10.4941 15.2005 10.4558 15.3994 10.38 15.585C10.1832 16.0365 9.78136 16.3658 9.3 16.47H9.29625H9.285H9.2715H9.26475C9.17761 16.4881 9.08899 16.4982 9 16.5ZM15 14.25H3V12.75L4.5 12V7.875C4.46049 6.81684 4.69945 5.76684 5.193 4.83C5.68428 3.96113 6.52402 3.34416 7.5 3.135V1.5H10.5V3.135C12.4342 3.5955 13.5 5.2785 13.5 7.875V12L15 12.75V14.25Z\" fill=\"white\"/>\n    </svg>\n    <div class=\"user-icon\"></div>\n    <div class=\"username\">Username</div>\n    <svg width=\"18\" height=\"18\" viewBox=\"0 0 18 18\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M8.99993 11.7848L13.5074 7.27725L12.4477 6.216L8.99993 9.666L5.55293 6.216L4.49243 7.2765L8.99993 11.7848Z\" fill=\"white\"/>\n    </svg>\n  </div>\n</div>\n";

var footerTemplate = "<div onclick=\"selectTab(0)\" class=\"workspace-footer-item active-tab\">Чистая прибыль EBITDA</div>\n<div onclick=\"selectTab(1)\" class=\"workspace-footer-item\">Дашборд ГД</div>\n<div onclick=\"selectTab(2)\" class=\"workspace-footer-item\">Дашборд ЗГД</div>\n";

function toMountTemplates() {
  const header = document.createElement('div');
  header.innerHTML = headerTemplate;
  header.classList.add('workspace-header');
  document.body.appendChild(header);
  const gridBody = document.createElement('div');
  gridBody.setAttribute('class', 'grid-stack');
  gridBody.style = 'width:100%;height:100%';
  document.body.appendChild(gridBody);
  const footer = document.createElement('div');
  footer.innerHTML = footerTemplate;
  footer.classList.add('workspace-footer');
  document.body.appendChild(footer);
}

var column$1 = 12;
var plugins$1 = [
	{
		meta: {
			type: "panel",
			name: "MenuPanel",
			title: "Панель меню",
			version: "0.1.0"
		},
		position: {
			w: 12
		},
		undeletable: true
	}
];
var emptyConfiguration = {
	column: column$1,
	plugins: plugins$1
};

var column = 12;
var id = -1;
var title = "Default workspace configuration";
var plugins = [
	{
		meta: {
			name: "WorkspaceSystem",
			version: "0.2.0",
			type: "core"
		},
		guid: "guid1"
	},
	{
		guid: "guid2",
		undeletable: true,
		position: {
			x: 3,
			y: 1,
			w: 5,
			h: 5
		},
		meta: {
			name: "WorkspacePanel",
			version: "0.1.0",
			type: "panel"
		}
	}
];
var defaultConfiguration = {
	column: column,
	id: id,
	title: title,
	plugins: plugins
};

document.selectTab = async function (tabNumber) {
  const list = await Application.getSystem('WorkspaceSystem').getConfigurationList();

  if (list[tabNumber]) {
    await Application.getSystem('WorkspaceSystem').setConfiguration(list[tabNumber].id);
    document.querySelectorAll('.workspace-footer-item').forEach(tab => tab.classList.remove('active-tab'));
    document.querySelectorAll('.workspace-footer-item')[tabNumber].classList.add('active-tab');
  } else console.warn('There is no workspace for that tab!');
};

var _guid = /*#__PURE__*/new WeakMap();

var _eventSystem = /*#__PURE__*/new WeakMap();

var _interactionSystem = /*#__PURE__*/new WeakMap();

var _logSystem = /*#__PURE__*/new WeakMap();

var _emptyConfiguration = /*#__PURE__*/new WeakMap();

var _defaultConfiguration = /*#__PURE__*/new WeakMap();

var _panels = /*#__PURE__*/new WeakMap();

var _currentTitle = /*#__PURE__*/new WeakMap();

var _currentID = /*#__PURE__*/new WeakMap();

var _column = /*#__PURE__*/new WeakMap();

var _grid = /*#__PURE__*/new WeakMap();

var _editMode = /*#__PURE__*/new WeakMap();

var _numberPanelIncrement = /*#__PURE__*/new WeakMap();

var _createUndeletableCell = /*#__PURE__*/new WeakSet();

class WorkspaceSystem extends SystemPlugin {
  // ---- PLUGIN PROPS ----
  // ---- STATE ----
  // ---- INTERNAL'S ----
  static getRegistrationMeta() {
    return {
      name: 'WorkspaceSystem',
      type: 'core',
      title: 'Система рабочего стола',
      version: '0.2.0',
      withDependencies: true,
      priority: 2
    };
  }

  constructor(_guid2) {
    super();

    _classPrivateMethodInitSpec(this, _createUndeletableCell);

    _classPrivateFieldInitSpec(this, _guid, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _eventSystem, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _interactionSystem, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _logSystem, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _emptyConfiguration, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _defaultConfiguration, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _panels, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _currentTitle, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _currentID, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _column, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _grid, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _editMode, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldInitSpec(this, _numberPanelIncrement, {
      writable: true,
      value: void 0
    });

    _classPrivateFieldSet(this, _guid, _guid2);

    _classPrivateFieldSet(this, _eventSystem, new EventSystemAdapter(_guid2));

    _classPrivateFieldSet(this, _interactionSystem, new InteractionSystemAdapter());

    _classPrivateFieldSet(this, _logSystem, new LogSystemAdapter(_classPrivateFieldGet(this, _guid), 'WorkspaceSystem'));

    _classPrivateFieldSet(this, _defaultConfiguration, defaultConfiguration);

    _classPrivateFieldSet(this, _emptyConfiguration, emptyConfiguration);

    _classPrivateFieldSet(this, _panels, []);

    _classPrivateFieldSet(this, _editMode, false);

    toMountTemplates(); // GRIDSTACK INSTANCE OPTIONS

    _classPrivateFieldSet(this, _grid, gridstack.GridStack.init({
      styleInHead: true,
      float: true,
      draggable: {
        handle: '.handle-drag-of-panel'
      },
      resizable: {
        handles: 'e, se, s, sw, w, nw, n, ne'
      },
      margin: 0,
      staticGrid: true
    }));

    _classPrivateFieldSet(this, _numberPanelIncrement, 0);
  }

  get currentWorkspaceTitle() {
    return _classPrivateFieldGet(this, _currentTitle);
  }

  get currentWorkspaceID() {
    return _classPrivateFieldGet(this, _currentID);
  }

  get panels() {
    return _classPrivateFieldGet(this, _panels);
  }

  async init() {
    const parsedURL = new URLSearchParams(window.location.search);

    if (!parsedURL.has('workspace')) {
      _classPrivateFieldGet(this, _logSystem).debug('Initializing default workspace configuration');

      await this.setPluginConfig(_classPrivateFieldGet(this, _defaultConfiguration));
      return;
    }

    const id = parsedURL.get('workspace');

    _classPrivateFieldGet(this, _logSystem).debug(`Initializing configuration from url param with id:${id}`);

    await this.setConfiguration(id);
  }

  getPluginConfig() {
    const plugins = [];
    this.getGUIDList().map(this.getInstance).forEach(instance => {
      // ---- pluginInfo {guid, meta, config, position, undeletable}
      const guid = this.getGUID(instance);
      const meta = instance.constructor.getRegistrationMeta();
      const config = typeof instance.getPluginConfig === 'function' && instance !== this ? instance.getPluginConfig() : null;
      let position;
      let undeletable;

      const panel = _classPrivateFieldGet(this, _panels).find(panel => panel.instance === instance);

      if (panel) {
        position = panel === null || panel === void 0 ? void 0 : panel.widget.gridstackNode._orig;
        undeletable = panel.undeletable;
      }

      plugins.push({
        guid,
        meta,
        config,
        position,
        undeletable
      });
    });
    return {
      id: _classPrivateFieldGet(this, _currentID),
      title: _classPrivateFieldGet(this, _currentTitle),
      column: _classPrivateFieldGet(this, _column),
      plugins
    };
  }

  async setPluginConfig(config = {}) {
    this.getSystem('EventSystem').resetSystem();
    this.resetWorkspace();

    _classPrivateFieldGet(this, _logSystem).info(`Setting workspace configuration (id:${config === null || config === void 0 ? void 0 : config.id}, title:${config === null || config === void 0 ? void 0 : config.title})`); // ---- COLUMN ----


    if (typeof config.column != 'undefined') this.setColumn(config.column);

    _classPrivateFieldSet(this, _currentTitle, config.title);

    _classPrivateFieldSet(this, _currentID, config.id); // ---- PLUGINS ----


    let subscriptions; // From workspace config for eventSystem process only subscriptions
    // ---- installing-plugins-from-config ----

    const GUIDMap = {};

    pluginsLoop: for (let plugin of config.plugins) {
      let {
        meta,
        config,
        undeletable,
        position = {},
        guid
      } = plugin;

      switch (meta === null || meta === void 0 ? void 0 : meta.type) {
        case 'panel':
          const {
            w,
            h,
            x,
            y
          } = position;
          let widget;

          if (typeof meta.name !== 'undefined') {
            const pluginExists = this.getPlugin(meta.name);

            if (pluginExists) {
              _classPrivateFieldGet(this, _logSystem).debug('Creating empty cell');

              if (undeletable) widget = _classPrivateMethodGet(this, _createUndeletableCell, _createUndeletableCell2).call(this, meta.name, w, h, x, y, false);else widget = this.createCell(meta.name, w, h, x, y, false);
            }

            const plugin = _classPrivateFieldGet(this, _panels).find(panel => panel.widget === widget).instance;

            const pluginGUID = this.getGUID(plugin);

            _classPrivateFieldGet(this, _logSystem).debug(`Mapping guid of ${meta.name} from ${guid} to ${pluginGUID}`);

            GUIDMap[guid] = pluginGUID;
          } else {
            this.createEmptyCell(w, h, x, y, false);
          }

          break;

        case 'core':
          const systemInstance = this.getSystem(meta.name);
          const systemGUID = this.getGUID(systemInstance);

          _classPrivateFieldGet(this, _logSystem).debug(`Mapped guid of ${meta.name} from ${guid} to ${systemGUID}`);

          GUIDMap[guid] = systemGUID;

          if (meta.name === 'EventSystem') {
            subscriptions = config.subscriptions;
            continue pluginsLoop;
          }

          if (meta.name === 'WorkspaceSystem') continue pluginsLoop;
          break;
      }

      const instance = this.getInstance(GUIDMap[guid]);
      if (instance && instance !== this && instance.setPluginConfig && config) await instance.setPluginConfig(config);
    } // EVENT-SYSTEM-MAPPING


    if (subscriptions) for (let sub of subscriptions) {
      const {
        event,
        action
      } = sub;
      event.guid = GUIDMap[event.guid];
      action.guid = GUIDMap[action.guid];
    }
    await this.getSystem('EventSystem').setPluginConfig({
      subscriptions
    });
    return true;
  }

  async downloadConfiguration(id) {
    _classPrivateFieldGet(this, _logSystem).debug(`Trying to download configuration with id:${id}`);

    try {
      const {
        data
      } = await _classPrivateFieldGet(this, _interactionSystem).GETRequest(`/mock_server/v1/workspace/object?id=${id}`);

      _classPrivateFieldGet(this, _logSystem).debug(`Parsing configuration from response`);

      const content = data.content;
      content['id'] = data.id;
      content['title'] = data.title;
      return content;
    } catch (err) {
      _classPrivateFieldGet(this, _logSystem).error(`Error occured while downloading workspace configuration: ${err.message}`);
    }
  }

  resetWorkspace() {
    _classPrivateFieldGet(this, _logSystem).debug('Resetting current workspace configuration');

    _classPrivateFieldGet(this, _panels).forEach((plugin, idx) => {
      const {
        meta,
        widget,
        instance
      } = plugin;

      if ((meta === null || meta === void 0 ? void 0 : meta.type) !== 'core') {
        if (widget) _classPrivateFieldGet(this, _grid).removeWidget(widget);
        if (instance) this.uninstallPluginByInstance(instance);
      }
    });

    _classPrivateFieldSet(this, _panels, []);

    _classPrivateFieldGet(this, _logSystem).debug(`Clearing panels array`);

    this.setColumn();
  }

  async deleteConfiguration(id) {
    try {
      _classPrivateFieldGet(this, _logSystem).debug(`Trying to delete workspace configuration with id:${id}`);

      await _classPrivateFieldGet(this, _interactionSystem).DELETERequest('/mock_server/v1/workspace/object', {
        data: [id]
      });

      _classPrivateFieldGet(this, _logSystem).info(`Deleted workspace configuration with id:${id}`);
    } catch (err) {
      _classPrivateFieldGet(this, _logSystem).error(`Error occured while deleting workspace configuration: ${err.message}`);
    }
  }

  async createEmptyConfiguration(title) {
    _classPrivateFieldGet(this, _logSystem).debug(`Trying to create new empty configuration with title:'${title}`);

    let tempConf = JSON.parse(JSON.stringify(_classPrivateFieldGet(this, _emptyConfiguration)));
    tempConf.title = title;

    try {
      _classPrivateFieldGet(this, _logSystem).debug(`Sending request to create configurations`);

      await _classPrivateFieldGet(this, _interactionSystem).POSTRequest('/mock_server/v1/workspace/object', [{
        title: title,
        content: tempConf
      }]);

      _classPrivateFieldGet(this, _logSystem).info(`Successfully created new configuration with title:'${title}'`);
    } catch (err) {
      _classPrivateFieldGet(this, _logSystem).error(`Error occured while downloading workspace configuration: ${err.message}`);
    }
  }

  async importConfiguration(configuration) {
    _classPrivateFieldGet(this, _logSystem).debug(`Trying to import configuration with title:'${configuration.title}`);

    try {
      _classPrivateFieldGet(this, _logSystem).debug(`Sending request to import configurations`);

      await _classPrivateFieldGet(this, _interactionSystem).POSTRequest('/mock_server/v1/workspace/object', [{
        title: configuration.title,
        content: configuration
      }]);

      _classPrivateFieldGet(this, _logSystem).info(`Successfully imported configuration with title:'${configuration.title}'`);
    } catch (err) {
      _classPrivateFieldGet(this, _logSystem).error(`Error occured while importing workspace configuration: ${err.message}`);
    }
  }

  async changeConfigurationTitle(id, newTitle) {
    _classPrivateFieldGet(this, _logSystem).debug(`Trying to change configuration title with id:${id} to value:'${newTitle}'`);

    try {
      await _classPrivateFieldGet(this, _interactionSystem).PUTRequest('/mock_server/v1/workspace/object', [{
        id,
        title: newTitle
      }]);

      _classPrivateFieldGet(this, _logSystem).info(`New title:'${newTitle}' was set to configuration with id:${id}`);
    } catch (err) {
      _classPrivateFieldGet(this, _logSystem).error(`Error occured while downloading workspace configuration: ${err.message}`);
    }
  }

  createEmptyCell(w = 4, h = 4, x = 0, y = 0, autoPosition = true) {

    //TODO: Prettify next assignments
    w = Number.isInteger(w) ? w : 4;
    h = Number.isInteger(h) ? h : 4;
    x = Number.isInteger(x) ? x : 0;
    y = Number.isInteger(y) ? y : 0;
    autoPosition = Boolean(autoPosition);

    const panelID = _classPrivateFieldGet(this, _numberPanelIncrement); // TODO: Replace on WEB-COMPONENT with style!


    const widget = _classPrivateFieldGet(this, _grid).addWidget(`
      <div class="grid-stack-item">
        <div class="grid-stack-item-content">
          <div class="handle-drag-of-panel gridstack-panel-header" style="display:${_classPrivateFieldGet(this, _editMode) ? 'flex' : 'none'}">
            <div id="closePanelBtn-${panelID}" class="close-panel-button">
              <i  class="fas fa-lg fa-times"></i>
            </div>
          </div>
          <div class="gridstack-content-container${_classPrivateFieldGet(this, _editMode) ? ' gridstack-panel-overlay' : ''}">
            <div id="panel-${panelID}">
            </div>
          </div>
        </div>
      </div>
    `, {
      x,
      y,
      w,
      h,
      autoPosition,
      id: panelID
    });

    _classPrivateFieldGet(this, _panels).push({
      widget,
      meta: {
        type: 'panel'
      }
    }); // Panel select


    const selectEl = document.createElement('select');
    selectEl.classList = 'default-select-panel';
    selectEl.options[0] = new Option('Выбрать панель ↓');
    let nextOptionIndex = 1;
    this.getPanels().forEach(plug => {
      const {
        type,
        title,
        name
      } = plug;

      if (type === 'panel' && name !== 'MenuPanel' && name !== 'WorkspacePanel') {
        selectEl.options[nextOptionIndex] = new Option(title, name);
        nextOptionIndex++;
      }
    }); // Creating instance of panel handler

    let instance;

    selectEl.onchange = evt => {
      _classPrivateFieldGet(this, _logSystem).info(`Selected plugin '${selectEl.value}' in empty cell with id ${panelID}`);

      const idCell = evt.target.parentElement.getAttribute('id');
      const workspaceCellID = idCell.split('-').pop();
      const meta = this.getPlugin(selectEl.value).getRegistrationMeta();
      instance = this.installPlugin(meta.name, `#panel-${workspaceCellID}`);

      let pluginInfo = _classPrivateFieldGet(this, _panels).find(panel => panel.widget === widget);

      Object.assign(pluginInfo, {
        instance,
        meta,
        undeletable: false
      });
    };

    document.getElementById(`panel-${panelID}`).appendChild(selectEl); // closePanelBtn

    document.getElementById(`closePanelBtn-${panelID}`).addEventListener('click', evt => {
      _classPrivateFieldGet(this, _panels).splice(_classPrivateFieldGet(this, _panels).findIndex(plg => plg.widget === widget), 1);

      _classPrivateFieldGet(this, _grid).removeWidget(widget);

      if (instance) this.uninstallPluginByInstance(instance);

      _classPrivateFieldGet(this, _logSystem).info(`Widget with id ${panelID} was removed from workspace`);
    });
    _classPrivateFieldSet(this, _numberPanelIncrement, (+_classPrivateFieldGet(this, _numberPanelIncrement)) + 1);

    _classPrivateFieldGet(this, _logSystem).info('Added empty widget');

    return widget;
  }

  createCell(panelName, w = 4, h = 4, x = 0, y = 0, autoPosition = true) {
    _classPrivateFieldGet(this, _logSystem).debug(`Adding panel-plugin widget with name:'${panelName}', w:${w},h:${h},x:${x},y:${y}, autoPosition:${autoPosition}`);

    _classPrivateFieldGet(this, _logSystem).info(`Adding panel widget with name:'${panelName}'`);

    const widget = this.createEmptyCell(w, h, x, y, autoPosition);
    const selectElement = widget.querySelector('select');
    const optionElements = selectElement.options;
    let options = [];

    for (let i = 0; i < optionElements.length; i++) {
      options.push(optionElements[i].value);
    }

    const tempArr = options.slice(1, options.length).toString();

    _classPrivateFieldGet(this, _logSystem).debug(`Available plugin list for widget: [${tempArr}]`);

    const panelIndex = options.indexOf(panelName);

    _classPrivateFieldGet(this, _logSystem).debug(`Setting select selected option index to '${panelIndex}`);

    selectElement.selectedIndex = panelIndex;

    _classPrivateFieldGet(this, _logSystem).debug(`Dispatching select event 'change' to trigger callback`);

    const changeEvent = new Event('change');
    selectElement.dispatchEvent(changeEvent);
    return widget;
  }

  deleteCell(cellID) {
    _classPrivateFieldGet(this, _logSystem).debug(`Trying to delete cell from workspace with id: ${cellID}`);

    const cellCloseBtn = document.querySelector(`#closePanelBtn-${cellID}`);

    if (!cellCloseBtn) {
      _classPrivateFieldGet(this, _logSystem).debug(`No cell element found on workspace with given id: ${cellID}`);

      return;
    }

    const event = new Event('click');

    _classPrivateFieldGet(this, _logSystem).debug(`Dispatching click event on cell's close button`);

    cellCloseBtn.dispatchEvent(event);

    _classPrivateFieldGet(this, _logSystem).info(`Deleted cell from workspace with id: ${cellID}`);
  }

  compactAllPanels() {
    _classPrivateFieldGet(this, _logSystem).info(`Compacting cells on workspace`);

    _classPrivateFieldGet(this, _grid).compact();
  }

  changeMode() {
    const panelHeaders = document.querySelectorAll('.gridstack-panel-header');
    panelHeaders.forEach(header => {
      header.style.display = _classPrivateFieldGet(this, _editMode) ? 'none' : 'flex';
    });
    const panelContents = document.querySelectorAll('.gridstack-content-container');
    const overlayClass = 'gridstack-panel-overlay';
    panelContents.forEach(content => {
      _classPrivateFieldGet(this, _editMode) ? content.classList.remove(overlayClass) : content.classList.add(overlayClass);
    });
    const margin = _classPrivateFieldGet(this, _editMode) ? '0px' : '10px';

    _classPrivateFieldGet(this, _grid).batchUpdate();

    _classPrivateFieldGet(this, _grid).margin(margin);

    _classPrivateFieldGet(this, _grid).commit();

    _classPrivateFieldGet(this, _grid).setStatic(_classPrivateFieldGet(this, _editMode));

    _classPrivateFieldSet(this, _editMode, !_classPrivateFieldGet(this, _editMode));

    _classPrivateFieldGet(this, _logSystem).info(`Workspace edit mode turned ${_classPrivateFieldGet(this, _editMode) ? 'on' : 'off'}`);
  }

  async getConfigurationList() {
    const response = await _classPrivateFieldGet(this, _interactionSystem).GETRequest('/mock_server/v1/workspace/object');
    return response.data;
  }

  async setConfiguration(id) {
    const config = await this.downloadConfiguration(id);
    return this.setPluginConfig(config);
  }

  async saveConfiguration() {
    _classPrivateFieldGet(this, _logSystem).info('Saving current configuration');

    _classPrivateFieldGet(this, _interactionSystem).PUTRequest('/mock_server/v1/workspace/object', [{
      id: _classPrivateFieldGet(this, _currentID),
      title: _classPrivateFieldGet(this, _currentTitle),
      content: this.getPluginConfig()
    }]);
  }

  setDefaultConfiguration() {
    if (_classPrivateFieldGet(this, _editMode)) this.changeMode();
    this.setPluginConfig(_classPrivateFieldGet(this, _defaultConfiguration));
  }

  setColumn(newColumn) {
    const column = typeof newColumn !== 'undefined' ? newColumn : 12;
    const head = document.head || document.getElementsByTagName('head')[0];
    let styleEl = head.querySelector('style#gridstack-custom-style');
    if (styleEl) head.removeChild(styleEl);

    _classPrivateFieldGet(this, _grid).column(column);

    _classPrivateFieldGet(this, _grid).el.querySelectorAll('.grid-stack-item').forEach(itemEl => {
      itemEl.style.minWidth = `${100 / column}%`;
    });

    styleEl = document.createElement('style');
    styleEl.setAttribute('id', 'gridstack-custom-style');
    styleEl.setAttribute('type', 'text/css');
    let style = '';

    for (let i = 0; i < column + 1; i++) {
      style += `
      .grid-stack > .grid-stack-item[gs-w='${i}']{width:${100 / column * i}%}
      .grid-stack > .grid-stack-item[gs-x='${i}']{left:${100 / column * i}%}
      .grid-stack > .grid-stack-item[gs-min-w='${i}']{min-width:${100 / column * i}%}
      .grid-stack > .grid-stack-item[gs-max-w='${i}']{max-width:${100 / column * i}%}
      `;
    }

    styleEl.innerHTML = style;
    head.appendChild(styleEl);

    _classPrivateFieldSet(this, _column, column);
  }

}

function _createUndeletableCell2(name, w, h, x, y, autoposition) {
  const widget = _classPrivateFieldGet(this, _grid).addWidget(`<div class="grid-stack-item">
      <div class="grid-stack-item-content handle-drag-of-panel">
        <div id="panel-${name}"></div>
      </div>
    </div>`, {
    x,
    y,
    w,
    h,
    autoposition
  });

  const instance = this.installPlugin(name, `#panel-${name}`);
  const guid = this.getGUID(instance);
  const meta = this.getPlugin(name, 'panel').getRegistrationMeta();

  _classPrivateFieldGet(this, _panels).push({
    meta,
    widget,
    instance,
    guid,
    undeletable: true
  });

  return widget;
}

export { WorkspaceSystem };
