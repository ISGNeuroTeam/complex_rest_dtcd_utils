class CustomEvent {
  static generateID(guid, eventName) {
    return `${eventName}[${guid}]`;
  }
  constructor(guid, eventName, args = null) {
    this.guid = guid;
    this.name = eventName;
    this.args = args;
    this.id = CustomEvent.generateID(guid, eventName);
  }

  toString() {
    return this.id;
  }
}

class CustomAction {
  static generateID(guid, actionName) {
    return `${guid}[${actionName}]`;
  }

  constructor(guid, actionName, callback, args = null) {
    this.guid = guid;
    this.name = actionName;
    this.args = args;
    this.id = CustomAction.generateID(guid, actionName);
    this.callback = callback;
  }

  toString() {
    return this.id;
  }
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

class CustomError extends Error {
  constructor (msg) {
    super(msg);
    this.name = this.constructor.name;
  }
}

class AbstractMethodImplementError extends CustomError {
  constructor (methodName, className) {
    super(
      `The "${methodName}" method must be implemented in the ${className} class`
    );
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

  getGUIDList() {
    return Application.getGUIDList();
  }

  getPlugin(name, type = false) {
    return Application.getPlugin(name, type);
  }
}

class SystemPlugin extends AbstractPlugin {}

class EventSystem extends SystemPlugin {
  static getRegistrationMeta() {
    return {
      type: 'core',
      title: 'Система cобытий',
      name: 'EventSystem',
      priority: 6,
      version: '0.2.0',
    };
  }

  #guid;
  #logSystem;
  #actions;
  #events;
  #subscriptions;

  constructor(guid) {
    super();
    this.#guid = guid;
    this.#logSystem = new LogSystemAdapter(this.#guid, 'EventSystem');
    this.#actions = [];
    this.#events = [];
    this.#subscriptions = [];
  }

  #createEvent(guid, eventName, args = null) {
    this.#logSystem.debug(
      `Creating event '${eventName}' to instance id '${guid}' with args:${args} `
    );
    return new CustomEvent(guid, eventName, args);
  }

  #createAction(guid, actionName, cb) {
    this.#logSystem.debug(`Creating action:'${actionName}', guid:'${guid}'`);
    return new CustomAction(guid, actionName, cb);
  }

  // ---- FINDING ACTION/EVENT METHODS ----
  // ---- actions ----
  #findAction(guid, actionName) {
    this.#logSystem.debug(`Finding action with guid '${guid}' and name '${actionName}'`);
    const action = this.#actions.find(action => action.name == actionName && action.guid === guid);
    return action;
  }

  // ---- events ----
  #findEvent(guid, eventName, args) {
    this.#logSystem.debug(`Finding event with guid '${guid}' and name '${eventName}' `);
    const event = this.#events.find(evt => {
      const a1 = JSON.stringify(args);
      const a2 = JSON.stringify(evt.args);
      return evt.guid == guid && evt.name === eventName && a1 === a2;
    });
    return event;
  }

  resetSystem() {
    const systemGUIDs = this.getGUIDList().filter(
      guid => this.getInstance(guid).__proto__.constructor.getRegistrationMeta().type === 'core'
    );
    this.#subscriptions = this.#subscriptions.filter(
      subscription =>
        systemGUIDs.includes(subscription.event.guid) &&
        systemGUIDs.includes(subscription.action.guid)
    );
    this.#events = this.#events.filter(event => systemGUIDs.includes(event.guid));
    this.#actions = this.#actions.filter(action => systemGUIDs.includes(action.guid));
  }

  setPluginConfig(conf = {}) {
    const { subscriptions = [] } = conf;
    for (let subscription of subscriptions) {
      const {
        event: { guid: evtGUID, name: evtName },
        action: { guid: actGUID, name: actName },
      } = subscription;
      if (!subscription.event.args) subscription.event.args = [];
      this.subscribe(evtGUID, evtName, actGUID, actName, ...subscription.event.args);
    }
    return true;
  }

  getPluginConfig() {
    return { subscriptions: this.#subscriptions };
  }

  // ---- REGISTER METHODS ----
  registerPluginInstance(guid, object, eventList) {
    this.#logSystem.debug(`Register object in eventSystem.\nguid:${guid}\n eventList:${eventList}`);

    const methodNotActionList = ['init', 'constructor'];
    const methodList = Object.getOwnPropertyNames(Object.getPrototypeOf(object)).filter(
      propName => typeof object[propName] === 'function'
    );
    for (let methodName of methodList) {
      if (!methodNotActionList.includes(methodName))
        this.registerAction(guid, methodName, object[methodName].bind(object));
    }
    if (typeof eventList !== 'undefined')
      eventList.forEach(eventName => this.registerEvent(guid, eventName));
    return true;
  }

  registerEvent(guid, eventName, ...args) {
    this.#logSystem.debug(`Trying to register event with guid '${guid}' and name '${eventName}'.`);
    const customEvent = this.#createEvent(guid, eventName, args);
    this.#events.push(customEvent);
    this.#logSystem.debug(`Registered event '${customEvent.id}'`);
    return true;
  }

  registerAction(guid, actionName, cb) {
    const action = this.#createAction(guid, actionName, cb);
    this.#actions.push(action);
    this.#logSystem.debug(`Registered action '${action.id}'`);
    return true;
  }

  // ---- Pub/Sub METHODS ----
  // ---- PUB ----
  publishEvent(guid, eventName, ...args) {
    this.#logSystem.debug(`Trying to publish event with guid '${guid}' and name '${eventName}' `);
    const customEventID = CustomEvent.generateID(guid, eventName);
    this.#publish(customEventID, args);
    return true;
  }

  #publish(eventName, args) {
    const subscriptions = this.#subscriptions.filter(subscripton => {
      if (subscripton.event.args.length === 0) return subscripton.event.id === eventName;
      if (subscripton.event.id === eventName) {
        const a1 = JSON.stringify(args);
        const a2 = JSON.stringify(subscripton.event.args);
        return a1 === a2;
      }
      return false;
    });
    if (subscriptions.length > 0) {
      subscriptions.forEach(subscripton => subscripton.action.callback(...args));
    }
  }

  // ---- SUB ----
  subscribe(eventGUID, eventName, actionGUID, actionName, ...args) {
    this.#logSystem.debug(
      `Tryin to subscribe: ${eventGUID}, ${eventName}, to ${actionGUID}, ${actionName}`
    );
    let event = this.#findEvent(eventGUID, eventName, args);
    let action = this.#findAction(actionGUID, actionName);

    if (!event && !action) {
      this.#logSystem.error(
        `Event (${eventGUID}, ${eventName}) and action (${actionGUID}, ${actionName}) not found`
      );
      return false;
    }

    if (!action) {
      this.#logSystem.error(`Action (${actionGUID}, ${actionName}) not found!`);
      return false;
    }
    if (!event) {
      this.#logSystem.warn(`Event (${eventGUID}, ${eventName}) not found. Creating a new one.`);
      event = this.#createEvent(eventGUID, eventName, args);
      this.#events.push(event);
    }
    // a temporary decision
    if (this.#subscriptions.find(sub => sub.event === event && sub.action === action)) {
      this.#logSystem.warn(
        `Subscripion (${eventGUID}, ${eventName}) to (${actionGUID}, ${actionName}) already exists!`
      );
      return true;
    }
    this.#subscriptions.push({ event, action });
    this.#logSystem.debug(`Subscribed event '${event.id}' to action '${action.id}'`);
    return true;
  }

  unsubscribe(eventGUID, eventName, actionGUID, actionName, ...args) {
    this.#logSystem.debug(
      `Tryin to unsubscribe: ${eventGUID}, ${eventName}, to ${actionGUID}, ${actionName}`
    );

    const event = this.#findEvent(eventGUID, eventName, args);
    const action = this.#findAction(actionGUID, actionName);

    const index = this.#subscriptions.findIndex(
      sub => sub.event === event && sub.action === action
    );

    if (index !== -1) {
      this.#subscriptions.splice(index, 1);
    }
    return true;
  }

  // #findActionsByName(actionName) {
  //   this.#logSystem.debug(`Finding actions with the given event name: '${actionName}'`);
  //   const actions = this.#actions.filter(action => action.name == actionName);
  //   return actions;
  // }

  // #findEventsByName(eventName) {
  //   this.#logSystem.debug(`Finding events with the given event name: '${eventName}'`);
  //   const events = this.#events.filter(evt => evt.name == eventName);
  //   return events;
  // }
  // subscribeActionOnEventName(actionGUID, actionName, eventName) {
  //   this.#logSystem.debug(
  //     `Subscribe action with guid ${actionGUID} and name '${actionName}' on events with name '${eventName}'`
  //   );
  //   const events = this.#findEventsByName(eventName);
  //   const action = this.#findAction(actionGUID, actionName);
  //   events.forEach(evt => {
  //     this.#subscribe(evt, action);
  //   });
  //   return true;
  // }

  // subscribeEventOnActionName(eventGUID, eventName, actionName) {
  //   this.#logSystem.debug(
  //     `Subscribe event with guid '${eventGUID}' and name '${eventName}' to actions with name '${actionName}'`
  //   );
  //   const event = this.#findEvent(eventGUID, eventName);
  //   const actions = this.#findActionsByName(actionName);
  //   actions.forEach(action => {
  //     this.#subscribe(event, action);
  //   });
  // }

  // subscribeByNames(eventName, actionName) {
  //   this.#logSystem.debug(`Subscribing eventName '${eventName}' to actionName '${actionName}'`);
  //   const events = this.#findEventsByName(eventName);
  //   const actions = this.#findActionsByName(actionName);
  //   for (let evt of events) {
  //     for (let action of actions) {
  //       this.#subscribe(evt, action);
  //     }
  //   }
  //   return true;
  // }

  // ---- getters ----
  get events() {
    return this.#events;
  }

  get actions() {
    return this.#actions;
  }

  get subscriptions() {
    return this.#subscriptions;
  }
}

export { EventSystem };
