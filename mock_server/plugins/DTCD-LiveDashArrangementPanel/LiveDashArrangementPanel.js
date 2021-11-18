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

class EventSystemAdapter extends BaseAdapter {
  /**
   * @constructor
   */
  constructor() {
    super();
    this.instance = this.getSystem('EventSystem');
  }
  /**
   * Adding CustomEvent object to events array
   * @param {Object} customEvent
   */


  registerEvent(customEvent) {
    this.instance.registerEvent(customEvent);
    return true;
  }
  /**
   * Creates and publishes a new event to EventSystem
   * @param {Number} guid identifier of plugin instance
   * @param {String} eventName event name
   * @param {*} args additional data in event for action
   */


  createAndPublish(guid, eventName, args) {
    this.instance.createAndPublish(guid, eventName, args);
  }
  /**
   * Publishes event from CustomEvent instance
   * @param {CustomEvent} customEvent instance of CustomEvent
   */


  publishEvent(customEvent) {
    this.instance.publishEvent(customEvent);
  }
  /**
   * Creates new instance of CustomEvent
   * @param {Number} guid identifier of plugin instance
   * @param {String} eventName event name
   * @param {*} args additional data in event for action
   * @returns {CustomEvent} created instance of CustomEvent
   */


  createEvent(guid, eventName, args = null) {
    return this.instance.createEvent(guid, eventName, args);
  }
  /**
   * Creates new instance of CustomAction
   * @param {String} actionName action name
   * @param {Number} guid identifier of plugin instance
   * @param {*} args ...
   * @returns {CustomAction} created instance of CustomAction
   */


  createAction(actionName, guid, args = null) {
    return this.instance.createAction(actionName, guid, args);
  }
  /**
   * Creates instance of CustomAction from the given callback and pushes it to action list
   * @param {String} actionName action name
   * @param {Number} guid identifier of plugin instance
   * @param {Function} callback callback whitch invoked on event
   * @param {*} args ...
   * @returns {CustomAction} created instance of CustomAction
   */


  createActionByCallback(actionName, guid, callback, args = null) {
    return this.instance.createActionByCallback(actionName, guid, callback, args);
  }
  /**
   * Subsribes all events with the given name to action with the given actionID
   * @param {String} eventName event name
   * @param {String} actionID action id
   * @returns {Boolean} true, if everything is ok
   */


  subscribeEventsByName(eventName, actionID) {
    return this.instance.subscribeEventsByName(eventName, actionID);
  }
  /**
   * Subsribes all events with the given eventName to all action with the given actionName
   * @param {String} eventName event name
   * @param {String} actionName action name
   * @returns {Boolean} true, if everything is ok
   */


  subscribeByNames(eventName, actionName) {
    return this.instance.subscribeByNames(eventName, actionName);
  }
  /**
   * Subscribes the given instance of event to the given instace of action
   * @param {CustomEvent} event instance of CustomEvent
   * @param {CustomAction} action instance of CustomAction
   * @returns {Boolean} true, if everything is ok
   */


  subscribe(event, action) {
    return this.instance.subscribe(event, action);
  }
  /**
   * Subscribes to all events with the given event name and sets the given callback
   * @param {String} eventName
   * @param {Function} callback
   */


  subscribeEventNameByCallback(eventName, callback) {
    this.instance.subscribeEventNameByCallback(eventName, callback);
  }
  /**
   * Returns instace of action stored in EventSystem from the given actionID
   * @param {String} actionID actionID of the action
   * @returns {CustomAction} instance of CustomAction stored in EventSystem
   */


  findActionById(actionID) {
    return this.instance.findAction(actionID);
  }
  /**
   * Returns instace of event stored in EventSystem from the given eventID
   * @param {String} eventID eventID of the event
   * @returns {CustomEvent} instance of CustomEvent stored in EventSystem
   */


  findEventById(eventID) {
    return this.instance.findEventById(eventID);
  }
  /**
   * Returns instaces of events stored in EventSystem from the given event name
   * @param {String} eventName event name
   * @returns {Array} instaces of events stored in EventSystem
   */


  findEventsByName(eventName) {
    return this.instance.findEventsByName(eventName);
  }
  /**
   * Returns instaces of actions stored in EventSystem from the given action name
   * @param {String} actionName
   * @returns {Array} instaces of actions stored in EventSystem
   */


  findActionsByName(actionName) {
    return this.instance.findActionsByName(actionName);
  }
  /**
   * Return list of available event instances stored in EventSystem
   * @returns {Array} instaces of events stored in EventSystem
   */


  showAvailableEvents() {
    return this.instance.showAvailableEvents();
  }
  /**
   * Return list of available action instances stored in EventSystem
   * @returns {Array} instaces of actions stored in EventSystem
   */


  showAvailableActions() {
    return this.instance.showAvailableActions();
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

}

/**
 * @typedef {Object} ExtensionInfo
 * @property {String} plugin
 * @property {*} data
 */

class ExtensionPlugin extends AbstractPlugin {
  /**
   * @static
   * @return {ExtensionInfo} information about extension
   */
  static getExtensionInfo() {
    throw new AbstractMethodImplementError('Implement the getExtensionInfo static method!');
  }

}

var pluginMeta = {
  type: 'extension',
  target: 'LiveDashPanel',
  name: 'LiveDashArrangementPanel',
  title: 'Панель расположений графа',
  version: '0.1.0',
  withDependencies: true
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  name: 'PluginComponent',
  data: self => ({
    // root
    guid: self.$root.guid,
    logSystem: self.$root.logSystem,
    layoutList: self.$root.layoutList,
    eventSystem: self.$root.eventSystem,
    //component
    isError: false,
    isExpanded: false,
    isMorphing: false,
    errorText: '',
    selectedLayout: 'hierarchic',
  }),
  computed: {
    sortedLayoutList() {
      return this.layoutList.sort();
    },
  },
  methods: {
    applyArrangement() {
      this.logSystem.debug(`Trying to apply ${this.selectedLayout} layout`);
      this.isError = false;
      this.isMorphing = true;
      this.eventSystem.publishEvent('ApplyArrangement', {
        layoutType: this.selectedLayout,
      });
    },

    applyFinishHandler(event) {
      const { status, layoutType, message } = event.args;
      if (status === 'failed') {
        this.isError = true;
        this.errorText = `Cannot apply ${layoutType} layout: ${message}`;
      }
      this.isMorphing = false;
    },
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  const options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  let hook;

  if (moduleIdentifier) {
    // server build
    hook = function (context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function (context) {
      style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      const originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      const existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

const isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());

function createInjector(context) {
  return (id, style) => addStyle(id, style);
}

let HEAD;
const styles = {};

function addStyle(id, css) {
  const group = isOldIE ? css.media || 'default' : id;
  const style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    let code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      const index = style.ids.size - 1;
      const textNode = document.createTextNode(code);
      const nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "container" }, [
    _c(
      "button",
      {
        staticClass: "expand",
        on: {
          click: function ($event) {
            _vm.isExpanded = !_vm.isExpanded;
          },
        },
      },
      [
        _vm.isExpanded
          ? _c("span", { key: "expanded" }, [
              _c("i", { staticClass: "fas fa-chevron-right" }),
            ])
          : _c("span", { key: "notExpanded" }, [
              _c("i", { staticClass: "fas fa-chevron-left" }),
            ]),
      ]
    ),
    _vm._v(" "),
    _vm.isExpanded
      ? _c("div", { staticClass: "content" }, [
          _c(
            "select",
            {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.selectedLayout,
                  expression: "selectedLayout",
                },
              ],
              on: {
                change: function ($event) {
                  var $$selectedVal = Array.prototype.filter
                    .call($event.target.options, function (o) {
                      return o.selected
                    })
                    .map(function (o) {
                      var val = "_value" in o ? o._value : o.value;
                      return val
                    });
                  _vm.selectedLayout = $event.target.multiple
                    ? $$selectedVal
                    : $$selectedVal[0];
                },
              },
            },
            _vm._l(_vm.sortedLayoutList, function (layout) {
              return _c("option", {
                key: layout,
                domProps: {
                  value: layout,
                  textContent: _vm._s(layout.toUpperCase()),
                },
              })
            }),
            0
          ),
          _vm._v(" "),
          _vm.isError
            ? _c(
                "div",
                { staticClass: "error", attrs: { title: _vm.errorText } },
                [_c("i", { staticClass: "fas fa-exclamation-circle" })]
              )
            : _vm._e(),
          _vm._v(" "),
          _c("button", {
            staticClass: "apply",
            attrs: { disabled: _vm.isMorphing },
            domProps: { textContent: _vm._s("Apply") },
            on: { click: _vm.applyArrangement },
          }),
        ])
      : _vm._e(),
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-22221866_0", { source: "*[data-v-22221866] {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n}\n.container[data-v-22221866] {\n  display: flex;\n  background-color: #fff;\n  border: thin solid rgba(0, 0, 0, 0.5);\n  padding: 10px;\n  position: absolute;\n  right: 20px;\n  bottom: 20px;\n  z-index: 1;\n  transition: 0.3s;\n}\n.container .expand[data-v-22221866] {\n  width: 30px;\n  height: 30px;\n}\n.container .content[data-v-22221866] {\n  flex: 1 0;\n  display: flex;\n  justify-content: space-between;\n  margin-left: 15px;\n}\n.container .content .error[data-v-22221866] {\n  display: flex;\n  align-items: center;\n  padding: 0 10px;\n  color: red;\n}\n.container .content .apply[data-v-22221866] {\n  padding: 4px;\n}\n\n/*# sourceMappingURL=PluginComponent.vue.map */", map: {"version":3,"sources":["PluginComponent.vue","/home/ilya/Desktop/DTCD-LiveDashArrangementPanel/DTCD-LiveDashArrangementPanel/src/PluginComponent.vue"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,SAAS;EACT,UAAU;EACV,wIAAwI;AAC1I;ACkEA;EACA,aAAA;EACA,sBAAA;EACA,qCAAA;EACA,aAAA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,UAAA;EACA,gBAAA;AD/DA;ACiEA;EACA,WAAA;EACA,YAAA;AD/DA;ACkEA;EACA,SAAA;EACA,aAAA;EACA,8BAAA;EACA,iBAAA;ADhEA;ACkEA;EACA,aAAA;EACA,mBAAA;EACA,eAAA;EACA,UAAA;ADhEA;ACmEA;EACA,YAAA;ADjEA;;AAEA,8CAA8C","file":"PluginComponent.vue","sourcesContent":["* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n}\n\n.container {\n  display: flex;\n  background-color: #fff;\n  border: thin solid rgba(0, 0, 0, 0.5);\n  padding: 10px;\n  position: absolute;\n  right: 20px;\n  bottom: 20px;\n  z-index: 1;\n  transition: 0.3s;\n}\n.container .expand {\n  width: 30px;\n  height: 30px;\n}\n.container .content {\n  flex: 1 0;\n  display: flex;\n  justify-content: space-between;\n  margin-left: 15px;\n}\n.container .content .error {\n  display: flex;\n  align-items: center;\n  padding: 0 10px;\n  color: red;\n}\n.container .content .apply {\n  padding: 4px;\n}\n\n/*# sourceMappingURL=PluginComponent.vue.map */","<template>\n  <div class=\"container\">\n    <button class=\"expand\" @click=\"isExpanded = !isExpanded\">\n      <span v-if=\"isExpanded\" :key=\"'expanded'\">\n        <i class=\"fas fa-chevron-right\" />\n      </span>\n      <span v-else :key=\"'notExpanded'\">\n        <i class=\"fas fa-chevron-left\" />\n      </span>\n    </button>\n    <div v-if=\"isExpanded\" class=\"content\">\n      <select v-model=\"selectedLayout\">\n        <option\n          v-for=\"layout in sortedLayoutList\"\n          :key=\"layout\"\n          :value=\"layout\"\n          v-text=\"layout.toUpperCase()\"\n        />\n      </select>\n      <div v-if=\"isError\" class=\"error\" :title=\"errorText\">\n        <i class=\"fas fa-exclamation-circle\" />\n      </div>\n      <button class=\"apply\" :disabled=\"isMorphing\" @click=\"applyArrangement\" v-text=\"'Apply'\" />\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'PluginComponent',\n  data: self => ({\n    // root\n    guid: self.$root.guid,\n    logSystem: self.$root.logSystem,\n    layoutList: self.$root.layoutList,\n    eventSystem: self.$root.eventSystem,\n    //component\n    isError: false,\n    isExpanded: false,\n    isMorphing: false,\n    errorText: '',\n    selectedLayout: 'hierarchic',\n  }),\n  computed: {\n    sortedLayoutList() {\n      return this.layoutList.sort();\n    },\n  },\n  methods: {\n    applyArrangement() {\n      this.logSystem.debug(`Trying to apply ${this.selectedLayout} layout`);\n      this.isError = false;\n      this.isMorphing = true;\n      this.eventSystem.publishEvent('ApplyArrangement', {\n        layoutType: this.selectedLayout,\n      });\n    },\n\n    applyFinishHandler(event) {\n      const { status, layoutType, message } = event.args;\n      if (status === 'failed') {\n        this.isError = true;\n        this.errorText = `Cannot apply ${layoutType} layout: ${message}`;\n      }\n      this.isMorphing = false;\n    },\n  },\n};\n</script>\n\n<style lang=\"scss\" scoped>\n.container {\n  display: flex;\n  background-color: #fff;\n  border: thin solid rgba(0, 0, 0, 0.5);\n  padding: 10px;\n  position: absolute;\n  right: 20px;\n  bottom: 20px;\n  z-index: 1;\n  transition: 0.3s;\n\n  .expand {\n    width: 30px;\n    height: 30px;\n  }\n\n  .content {\n    flex: 1 0;\n    display: flex;\n    justify-content: space-between;\n    margin-left: 15px;\n\n    .error {\n      display: flex;\n      align-items: center;\n      padding: 0 10px;\n      color: red;\n    }\n\n    .apply {\n      padding: 4px;\n    }\n  }\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-22221866";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    createInjector,
    undefined,
    undefined
  );

class LiveDashArrangementPanel extends ExtensionPlugin {
  static getRegistrationMeta() {
    return pluginMeta;
  }

  static getExtensionInfo() {
    return {
      type: 'panel'
    };
  }

  constructor(guid, selector, layoutList) {
    super();
    const logSystem = new LogSystemAdapter(guid, pluginMeta.name);
    logSystem.debug(`Start of ${pluginMeta.name} creation`);
    const eventSystem = new EventSystemAdapter(guid);
    const {
      default: VueJS
    } = this.getDependence('Vue');
    const data = {
      guid,
      layoutList,
      logSystem,
      eventSystem
    };
    this.vue = new VueJS({
      data: () => data,
      render: h => h(__vue_component__)
    }).$mount(selector);
    logSystem.debug(`End of ${pluginMeta.name} creation`);
    logSystem.info(`${pluginMeta.name} initialization complete`);
  }

  applyFinishHandler(event) {
    const component = this.vue.$children[0];
    return component.applyFinishHandler(event);
  }

}

export { LiveDashArrangementPanel };
