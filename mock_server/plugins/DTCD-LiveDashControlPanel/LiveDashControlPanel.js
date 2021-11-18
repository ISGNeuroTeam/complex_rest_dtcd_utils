var pluginMeta = {
  type: 'extension',
  target: 'LiveDashPanel',
  name: 'LiveDashControlPanel',
  title: 'Панель управления графом',
  version: '0.1.0',
  withDependencies: true,
};

var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

var css$1 = ".toolbar {\n  z-index: 1;\n  background-color: white;\n  position: absolute;\n  width: 100%;\n  height: auto;\n  padding: 10px;\n  justify-content: space-between;\n  display: flex;\n  border-bottom: 1px solid black;\n}\n.toolbar input {\n  display: block;\n  width: 10%;\n  font-size: 15px;\n  padding-left: 10px;\n  font-family: monospace;\n  border: none;\n  outline: none;\n}\n.toolbar input:hover {\n  cursor: pointer;\n  opacity: 0.6;\n}\n.toolbar input:focus {\n  cursor: text;\n  opacity: 1;\n}\n.toolbar button {\n  width: 30px;\n  height: 30px;\n  padding: 4px;\n}\n.toolbar .toolbar-separator {\n  height: 20px;\n  width: 1px;\n  background: #999;\n  display: inline-block;\n  vertical-align: middle;\n  margin: 0 2px;\n}";
n(css$1,{});

var css = "\n.btn-group {\n  min-width: 160px;\n  position: absolute;\n  margin: 20px -20px ;\n  display: inline-block;\n  vertical-align: middle;\n}\n\n.select-menu{\n  border: 1px solid black;\n  background-color: white;\n  list-style-type: none;\n}\n\n.btn-group li{\n  padding: 10px;\n}\n\n.btn-group .select-option:hover  {\n  border-bottom: 1px solid black;\n  cursor:pointer;\n}\n\n";
n(css,{});

var GraphListSelect = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"btn-group"},[_c('ul',{staticClass:"select-menu"},_vm._l((this.graphList),function(option,index){return _c('li',{key:index,style:(option.name === _vm.currentGraphName?{'background-color':'rgb(153, 204, 255, .2)'}:{})},[_c('div',{staticClass:"select-option",on:{"click":function($event){return _vm.$emit('updateOption', option)}}},[_vm._v("\n        "+_vm._s(option.name)+"\n      ")])])}),0)])},
staticRenderFns: [],
  name:"GraphListSelect",
  data() {
    return {}
  },
  props:["graphList", "currentGraphName"],
};

var LiveDashControlPanel = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('div',{staticClass:"toolbar"},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentGraphName),expression:"currentGraphName"}],ref:"graphNameField",attrs:{"placeholder":"Untitled","type":"text"},domProps:{"value":(_vm.currentGraphName)},on:{"input":function($event){if($event.target.composing){ return; }_vm.currentGraphName=$event.target.value;}}}),_vm._v(" "),_c('div',{staticClass:"file-operations"},[_c('button',{attrs:{"title":"Create new graph"},on:{"click":function($event){return _vm.publishEvent('ClearGraph')}}},[_c('i',{staticClass:"far fa-file"})]),_vm._v(" "),_c('button',{attrs:{"disabled":_vm.currentGraphID === null,"title":"Delete current graph"},on:{"click":_vm.deleteFromServer}},[_c('i',{staticClass:"fas fa-trash"})]),_vm._v(" "),_c('span',{staticClass:"toolbar-separator"}),_vm._v(" "),_c('button',{attrs:{"title":"Open a file using the HTML 5 FileReader API"},on:{"click":function($event){return _vm.publishEvent('OpenFromFile')}}},[_c('i',{staticClass:"fas fa-folder-open"})]),_vm._v(" "),(!_vm.graphListIsActive)?_c('button',{attrs:{"title":"Open a file using a server round-trip"},on:{"click":_vm.toSelectNewGraph}},[_c('i',{staticClass:"fas fa-cloud-download-alt"})]):_c('button',{attrs:{"title":"Close server round-trip observer"},on:{"click":function($event){_vm.graphListIsActive = false;}}},[_c('i',{staticClass:"fas fa-close"})]),_vm._v(" "),_c('graph-list-select',{directives:[{name:"show",rawName:"v-show",value:(_vm.graphListIsActive),expression:"graphListIsActive"}],ref:"graphListDropDown",attrs:{"currentGraphName":_vm.currentGraphName,"graphList":_vm.graphList},on:{"updateOption":_vm.openFromServer}}),_vm._v(" "),_c('button',{attrs:{"disabled":"","title":"Open the graph that was saved to the \"Storage\""},on:{"click":_vm.openFromStorage}},[_c('i',{staticClass:"fas fa-inbox"})]),_vm._v(" "),_c('span',{staticClass:"toolbar-separator"}),_vm._v(" "),_c('button',{attrs:{"title":"Save to the server"},on:{"click":_vm.saveToServer}},[_c('i',{staticClass:"fas fa-save"})]),_vm._v(" "),_c('button',{attrs:{"title":"Download using the HTML5 File API"},on:{"click":function($event){return _vm.publishEvent('SaveToFile', _vm.currentGraphName)}}},[_c('i',{staticClass:"fas fa-download"})]),_vm._v(" "),_c('button',{attrs:{"disabled":"","title":"Save to the \"Storage\""},on:{"click":function($event){return _vm.publishEvent('SaveToStorage')}}},[_c('i',{staticClass:"fas fa-database"})])],1),_vm._v(" "),_c('div',{staticClass:"graph-operations"},[_c('button',{attrs:{"title":"Calculate graph"},on:{"click":function($event){return _vm.publishEvent('StartCalculatingGraph')}}},[_c('i',{staticClass:"fas fa-play"})]),_vm._v(" "),_c('span',{staticClass:"toolbar-separator"}),_vm._v(" "),_c('button',{attrs:{"title":"Fit Content"},on:{"click":function($event){return _vm.publishEvent('FitContent')}}},[_c('i',{staticClass:"fas fa-cubes"})]),_vm._v(" "),_c('button',{attrs:{"title":"Zoom In"},on:{"click":function($event){return _vm.publishEvent('ZoomIn')}}},[_c('i',{staticClass:"fas fa-search-plus"})]),_vm._v(" "),_c('button',{attrs:{"title":"Zoom Out"},on:{"click":function($event){return _vm.publishEvent('ZoomOut')}}},[_c('i',{staticClass:"fas fa-search-minus"})]),_vm._v(" "),_c('button',{attrs:{"title":"Zoom to original size"},on:{"click":function($event){return _vm.publishEvent('ZoomOriginal')}}},[_vm._v("1:1")]),_vm._v(" "),_c('span',{staticClass:"toolbar-separator"}),_vm._v(" "),_c('button',{attrs:{"title":"Cut"},on:{"click":function($event){return _vm.publishEvent('CutItems')}}},[_c('i',{staticClass:"fas fa-cut"})]),_vm._v(" "),_c('button',{attrs:{"title":"Copy"},on:{"click":function($event){return _vm.publishEvent('CopyItems')}}},[_c('i',{staticClass:"fas fa-copy"})]),_vm._v(" "),_c('button',{attrs:{"title":"Paste"},on:{"click":function($event){return _vm.publishEvent('PasteItems')}}},[_c('i',{staticClass:"fas fa-paste"})]),_vm._v(" "),_c('button',{attrs:{"title":"Delete"},on:{"click":function($event){return _vm.publishEvent('DeleteItems')}}},[_c('i',{staticClass:"fas fa-trash"})]),_vm._v(" "),_c('span',{staticClass:"toolbar-separator"}),_vm._v(" "),_c('button',{attrs:{"title":"Undo"},on:{"click":function($event){return _vm.publishEvent('UndoGraph')}}},[_c('i',{staticClass:"fas fa-undo"})]),_vm._v(" "),_c('button',{attrs:{"title":"Redo"},on:{"click":function($event){return _vm.publishEvent('RedoGraph')}}},[_c('i',{staticClass:"fas fa-redo"})])])])])},
staticRenderFns: [],
  name: 'ControlPanel',
  components: { GraphListSelect },
  data() {
    return {
      graphListIsActive: false,
      graphList: [],
      currentGraphName: '',
      currentGraphID: null,
      inWait: false,
    };
  },
  mounted() {
    document.addEventListener('click', this.graphListIsActiveHandler);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.graphListIsActiveHandler);
  },
  methods: {
    publishEvent(eventName, args) {
      this.$root.eventSystem.publishEvent(eventName, args);
    },
    graphListIsActiveHandler(evt) {
      if (this.$refs.graphListDropDown && !this.$refs.graphListDropDown.$el.contains(evt.target))
        this.graphListIsActive = false;
    },
    closeSelectNewGraph() {
      this.graphListIsActive = false;
    },
    setNewGraphInfo(graphInfo) {
      if (graphInfo) {
        const { id = null, name = '' } = graphInfo;
        this.currentGraphID = id;
        this.currentGraphName = name;
      } else {
        alert('Params without graphID');
      }
    },

    deleteFromServer() {
      this.publishEvent('DeleteFromServer', { id: this.currentGraphID });
    },

    toSelectNewGraph() {
      this.$root.interactionSystem.GETRequest('/mock_server/v1/graphContent/object').then(resp => {
        this.graphList = resp.data;
        this.graphListIsActive = true;
      });
    },
    openFromServer(graph) {
      this.publishEvent('OpenFromServer', graph.id);
      this.graphListIsActive = false;
      this.currentGraphID = graph.id;
      this.currentGraphName = graph.name;
    },

    openFromStorage() {
      console.log('storageSystem not supported');
    },

    saveToServer() {
      if (!this.currentGraphName) alert('Please, enter name of new graph or select saved graph!');
      else
        this.publishEvent('SaveToServer', { name: this.currentGraphName, id: this.currentGraphID });
    },
  },
};

var PluginComponent = {
render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('live-dash-control-panel')},
staticRenderFns: [],
  name: 'PluginComponent',
  components: { LiveDashControlPanel },
};

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
  #guid;
  #instance;

  /**
   * @constructor
   * @param {String} guid guid of plugin, in which the adapter instance will be inited
   */
  constructor(guid) {
    super();
    this.#guid = guid;
    this.#instance = this.getSystem('EventSystem');
  }

  /**
   * Configure state of EventSystem by object
   * @method
   * @param {*} conf Config object
   * @returns {Boolean} true, if everything is ok
   */
  setPluginConfig(conf) {
    return this.#instance.setPluginConfig(conf);
  }

  /**
   * Getting state of EventSystem
   * @method
   * @returns {*} State of system by object
   */
  getPluginConfig() {
    return this.#instance.getPluginConfig();
  }

  // ---- getters ----
  get events() {
    return this.#instance.events;
  }

  get actions() {
    return this.#instance.actions;
  }

  get subscriptions() {
    return this.#instance.subscriptions;
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
    if (typeof customGUID === 'undefined')
      return this.#instance.registerPluginInstance(this.#guid, obj, eventList);
    else return this.#instance.registerPluginInstance(customGUID, obj, eventList);
  }

  /**
   * Adding event type to event list into eventSystem (register them)
   * @method
   * @param {String} eventName event name
   * @returns {Boolean} true, if everything is ok
   */
  registerEvent(eventName, args) {
    return this.#instance.registerEvent(this.#guid, eventName, args);
  }

  /**
   * Register new action
   * @method
   * @param {String} actionName action name
   * @param {Function} callback callback whitch invoked on event
   * @returns {Boolean} true, if everything is ok
   */
  registerAction(actionName, callback) {
    return this.#instance.createActionByCallback(this.#guid, actionName, callback);
  }

  /**
   * Publishes event from instance by name
   * @method
   * @param {String} eventName event name
   * @param {*} args ...
   * @returns {Boolean} true, if everything is ok
   */
  publishEvent(eventName, args) {
    return this.#instance.publishEvent(this.#guid, eventName, args);
  }

  /**
   * Subscribing
   * @method
   * @param {String} eventGUID instance guid of firing plugin
   * @param {String} eventName name of event
   * @param {String} actionsGUID instance guid of plugin whom invoke callback
   * @param {String} actionName name of action
   * @returns {String} token of subscription
   */
  subscribe(eventGUID, eventName, actionGUID, actionName) {
    return this.#instance.subscribe(eventGUID, eventName, actionGUID, actionName);
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
    return this.#instance.subscribeActionOnEventName(actionGUID, actionName, eventName);
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
    return this.#instance.subscribeEventOnActionName(eventGUID, eventName, actionName);
  }

  /**
   * Subsribe all actions with the given name on all events with name
   * @method
   * @param {String} eventName name of action
   * @param {String} actionName name of action
   * @returns {Boolean} true, if everything is ok
   */
  subscribeByNames(eventName, actionName) {
    return this.#instance.subscribeByNames(eventName, actionName);
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

/**
 * StorageSystem adapter class.
 * @class @extends BaseAdapter
 */
class StorageSystemAdapter extends BaseAdapter {

  /**
   * Initialize StorageSystemAdapter instance.
   * @constructor
   */
  constructor () {
    super();
    this.instance = this.getSystem('StorageSystem');
  }

  /**
   * Session module.
   * @property @public
   * @returns {SessionModule} SessionModule instance.
   */
  get session () {
    return this.instance.session;
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

class PanelPlugin extends AbstractPlugin {
  /**
   * This method will be executed after the style theme of the whole application has changed.
   */
  updateTheme() {
    throw new AbstractMethodImplementError(
      'Implement the updateTheme method for updating style properties of this panel'
    );
  }
}

class Plugin extends PanelPlugin {
  static getRegistrationMeta() {
    return pluginMeta;
  }

  constructor(guid, selector) {
    super();

    const eventSystem = new EventSystemAdapter(guid);
    const storageSystem = new StorageSystemAdapter();
    const interactionSystem = new InteractionSystemAdapter();

    const VueJS = this.getDependence('Vue');
    const data = { guid, eventSystem, storageSystem, interactionSystem };

    this.vue = new VueJS.default({
      data: () => data,
      render: h => h(PluginComponent),
    }).$mount(selector);
  }

  setNewGraphInfo(graphData) {
    const component = this.vue.$children[0].$children[0];
    return component.setNewGraphInfo(graphData);
  }
}

export { Plugin };
