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
		this.publishEvent(customEvent);
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

class StyleSystem extends SystemPlugin {
  static getRegistrationMeta() {
    return {
      name: 'StyleSystem',
      type: 'core',
      title: 'Дизайн система',
      version: '0.2.0',
      priority: 3,
      withDependencies: false,
    };
  }

  constructor(guid) {
    super();
    this.guid = guid;
    this.interactionSystem = new InteractionSystemAdapter();
    this.eventSystem = new EventSystemAdapter();
    this.logSystem = new LogSystemAdapter(guid, 'StyleSystem');
  }

  async init() {
    this.logSystem.info('Initializing system');
    try {
      this.logSystem.debug('Requesting design object from endpoint /get-design-objects');
      const { data } = await this.interactionSystem.GETRequest('/get-design-objects');
      this.logSystem.debug('Setting themes received from server in system');
      this.themes = data;
      this.logSystem.debug(`Setting ${this.themes[0].name} as default theme in system`);
      this.currentThemeName = this.themes[0].name;
      this.logSystem.info('System inited successfully');
    } catch (err) {
      this.logSystem.fatal(
        `'${err.name}' occured while fetching desing object.${err.message}, ${err.stack}`
      );
    }
  }

  setTheme(name) {
    this.logSystem.debug(`setTheme method called with argument ${name}`);
    if (typeof name === 'string') {
      const theme = this.themes.find(theme => theme.name === name);
      if (theme) {
        this.currentThemeName = name;
        this.logSystem.info(`New theme '${name}' set in system`);
        this.eventSystem.createAndPublish(this.guid, 'ThemeUpdate');
      } else {
        this.logSystem.warn(`Theme '${name}' doesn't exist in system!`);
        throw new Error('Theme not found!');
      }
    } else {
      this.logSystem.debug(`argument type of '${name}' is not string `);
      throw new Error('Wrong argument type!');
    }
  }

  getThemes() {
    this.logSystem.info(`Returning all themes stored in system`);
    return this.themes;
  }

  getCurrentTheme() {
    this.logSystem.info(`Returning current theme of application`);
    return this.themes.find(theme => theme.name === this.currentThemeName);
  }

  setVariablesToElement(element, obj, startPrefix = '-') {
    function setVariables(obj, prefix) {
      Object.keys(obj).forEach(key => {
        if (typeof obj[key] === 'object') {
          const newPrefix = `${prefix}-${key}`;
          setVariables(obj[key], newPrefix);
        } else {
          this.logSystem.debug(`setting '${prefix}-${key}' variable value to '${obj[key]}'`);
          element.style.setProperty(`${prefix}-${key}`, obj[key]);
        }
      });
    }
    setVariables(obj.styleVariables, startPrefix);
    this.logSystem.info(
      `CSS variables from theme '${this.currentThemeName}' are installed for element ${element}`
    );
  }
}

export { StyleSystem };
