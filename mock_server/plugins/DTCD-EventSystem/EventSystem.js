class CustomEvent {
  constructor(guid, eventName, args = null) {
    this.guid = guid;
    this.name = eventName;
    this.args = args;
    this.id = `${this.name}[${this.guid}]`;
  }

  toString() {
    return this.id;
  }
}

class CustomAction {
  constructor(actionName, guid, callback, args = null) {
    this.guid = guid;
    this.name = actionName;
    this.args = args;
    this.id = `${guid}[${actionName}]`;
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
    return Application.getInstance(guid);
  }
}

class SystemPlugin extends AbstractPlugin {}

class EventSystem extends SystemPlugin {
  static getRegistrationMeta() {
    return {
      type: 'core',
      title: 'Система cобытий',
      name: 'EventSystem',
      withDependencies: true,
      priority: 6,
      version: '0.2.0',
    };
  }

  constructor(guid) {
    super();
    // systemGUID needed for getting callback (function) of instances by guid
    this.guid = guid;
    this.logSystem = new LogSystemAdapter(this.guid, 'EventSystem');
    this.actions = [];
    this.events = [];
  }

  registerEvent(customEvent) {
    this.logSystem.debug(`Trying to register event '${customEvent.id}`);
    if (customEvent instanceof CustomEvent) {
      this.events.push(customEvent);
      this.logSystem.debug(`Registered event '${customEvent.id}'`);
      return true;
    } else {
      this.logSystem.debug(`Given event isn't istance of CustomEvent class`);
      return false;
    }
  }

  registerAction(action) {
    if (action instanceof CustomAction) {
      this.actions.push(action);
      this.logSystem.debug(`Registered action '${action.id}'`);
      return true;
    } else return false;
  }

  // Events methods
  createAndPublish(guid, eventName, args) {
    const customEvent = this.createEvent(guid, eventName, args);
    this.logSystem.debug(`Created event '${customEvent.id}'`);
    this.publishEvent(customEvent);
  }

  publishEvent(customEvent) {
    this.logSystem.debug(`Trying to publish event '${customEvent.id}`);
    if (customEvent instanceof CustomEvent) {
      PubSub.publish(customEvent, customEvent.id);
      this.logSystem.debug(`Published event '${customEvent.id}'`);
      return true;
    } else return false;
  }

  createEvent(guid, eventName, args = null) {
    this.logSystem.debug(
      `Creating event '${eventName}' to instance id '${guid}' with args:${args} `
    );
    return new CustomEvent(guid, eventName, args);
  }

  // Actions methods

  createAction(actionName, guid, args = null) {
    this.logSystem.debug(`Creating action:'${actionName}', guid:'${guid}', args:'${args}'`);
    const instance = this.getInstance(guid);
    // Warning!: nextline is very important. It's bind "this" of instance to callback
    this.logSystem.debug(`Binding callback '${actionName}' to plugin instance`);
    const callback = instance[actionName].bind(instance);
    const action = new CustomAction(actionName, guid, callback, args);
    this.logSystem.debug(`Created action '${action.id}'`);
    return action;
  }

  // Some API for comfortable action publishing
  createActionByCallback(actionName, guid, callback, args = null) {
    this.logSystem.debug(
      `Creating action:'${actionName}' by callback with 
			guid:'${guid}', callback:'${callback.name}', args:'${args}'`
    );
    const customAction = new CustomAction(actionName, guid, callback, args);
    this.actions.push(customAction);
    this.logSystem.debug(`Created action '${customAction.id}' by callback '${callback.name}'`);
    return customAction;
  }

  // Subscribing
  subscribeEventsByName(eventName, actionID) {
    this.logSystem.debug(`Subscribing eventName '${eventName}' to actionID '${actionID}'`);
    const events = this.findEventsByName(eventName);
    const action = this.findActionById(actionID);
    if (events?.length != 0 && action) {
      events.forEach(evt => {
        this.subscribe(evt, action);
        this.logSystem.debug(`Subscribed event '${evt.id}' to action '${action.id}'`);
      });
      return true;
    } else {
      return false;
    }
  }

  subscribeByNames(eventName, actionName) {
    this.logSystem.debug(`Subscribing eventName '${eventName}' to actionName '${actionName}'`);
    const events = this.findEventsByName(eventName);
    const actions = this.findActionsByName(actionName);
    for (let evt of events) {
      for (let action of actions) {
        this.subscribe(evt.id, action.id);
        this.logSystem.debug(`Subscribed event '${evt.id}' to action '${action.id}'`);
      }
    }
    return true;
  }

  subscribe(eventID, actionID) {
    this.logSystem.debug(`Subscribing event '${eventID}' to action '${actionID}'`);
    const customAction = this.findActionById(actionID);
    if (customAction) {
      PubSub.subscribe(eventID, customAction.callback);
      this.logSystem.debug(`Subscribed event '${eventID}' to action '${customAction.id}'`);
      return true;
    } else {
      return false;
    }
  }

  subscribeEventNameByCallback(eventName, callback) {
    this.logSystem.debug(`Subscribing event '${eventName}' to callback '${callback.name}'`);
    const events = this.findEventsByName(eventName);
    for (let evt of events) {
      PubSub.subscribe(evt, callback);
      this.logSystem.debug(`Subscribed event '${evt.id}' to callback:${callback.name}`);
    }
  }

  // Searching in actions/events
  findActionById(actionID) {
    this.logSystem.debug(`Finding action with the given actionID: '${actionID}'`);
    const action = this.actions.find(action => action.id == actionID);
    if (action) {
      this.logSystem.debug(`Successfully found actions with id: '${actionID}'`);
      return action;
    } else {
      this.logSystem.debug(`No action found with the given id: '${actionID}'`);
      return;
    }
  }

  findEventById(eventID) {
    this.logSystem.debug(`Finding event with the given eventID: '${eventID}'`);
    const event = this.events.find(evt => evt.id == eventID);
    if (event) {
      this.logSystem.debug(`Successfully found event with id: '${eventID}'`);
      return event;
    } else {
      this.logSystem.debug(`No event found with the given id: '${eventID}'`);
      return;
    }
  }

  findEventsByName(eventName) {
    this.logSystem.debug(`Finding events with the given event name: '${eventName}'`);
    const events = this.events.filter(evt => evt.name == eventName);
    if (events?.length != 0) {
      this.logSystem.debug(`Successfully found events with name: '${eventName}'`);
      return events;
    } else {
      this.logSystem.debug(`No events found with the given name: '${eventName}'`);
      return [];
    }
  }

  findActionsByName(actionName) {
    this.logSystem.debug(`Finding actions with the given event name: '${actionName}'`);
    const actions = this.actions.filter(action => action.name == actionName);
    if (actions?.length != 0) {
      this.logSystem.debug(`Successfully found actions with name: '${actionName}'`);
      return actions;
    } else {
      this.logSystem.debug(`No actions found with the given name: '${actionName}'`);
      return [];
    }
  }

  showAvailableEvents() {
    //TODO: prettify returned object (grouping etc)
    return this.events;
  }

  showAvailableActions() {
    //TODO: prettify returned object (grouping etc)
    return this.actions;
  }
}

export { EventSystem };
