(function () {
  'use strict';

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

  var _dependencies = /*#__PURE__*/new WeakMap();

  var _plugins = /*#__PURE__*/new WeakMap();

  var _extensions = /*#__PURE__*/new WeakMap();

  var _systems = /*#__PURE__*/new WeakMap();

  var _guids = /*#__PURE__*/new WeakMap();

  var _count = /*#__PURE__*/new WeakMap();

  var _autocomplete = /*#__PURE__*/new WeakMap();

  var _fillPlugins = /*#__PURE__*/new WeakSet();

  var _fillDependencies = /*#__PURE__*/new WeakSet();

  class Application {
    constructor() {
      _classPrivateMethodInitSpec(this, _fillDependencies);

      _classPrivateMethodInitSpec(this, _fillPlugins);

      _classPrivateFieldInitSpec(this, _dependencies, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _plugins, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _extensions, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _systems, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _guids, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _count, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldInitSpec(this, _autocomplete, {
        writable: true,
        value: void 0
      });

      _classPrivateFieldSet(this, _dependencies, {});

      _classPrivateFieldSet(this, _plugins, []);

      _classPrivateFieldSet(this, _extensions, {});

      _classPrivateFieldSet(this, _systems, {});

      _classPrivateFieldSet(this, _guids, {});

      _classPrivateFieldSet(this, _count, 0);

      _classPrivateFieldSet(this, _autocomplete, {});

      window.Application = this;
    }

    get autocomplete() {
      return _classPrivateFieldGet(this, _autocomplete);
    }

    async start() {
      await _classPrivateMethodGet(this, _fillPlugins, _fillPlugins2).call(this);
      await _classPrivateMethodGet(this, _fillDependencies, _fillDependencies2).call(this);

      let systems = _classPrivateFieldGet(this, _plugins).filter(plg => plg.type === 'core').sort((prevPlg, nextPlg) => nextPlg.priority - prevPlg.priority).map(plg => plg.name);

      for (let i = 0; i < systems.length; i++) {
        const instance = this.installPlugin(systems[i]);
        _classPrivateFieldGet(this, _systems)[systems[i]] = instance;

        if (instance.init) {
          await instance.init();
        }
      }
    }

    // ---- PUBLIC METHODS ----
    installPlugin(name, ...args) {

      const nextGUID = `guid${_classPrivateFieldGet(this, _count)}`;
      _classPrivateFieldSet(this, _count, (+_classPrivateFieldGet(this, _count)) + 1); // increment here because when installing the plugin, extensions with their guids can be installed

      const Plugin = this.getPlugin(name);
      const instance = new Plugin(nextGUID, ...args); // for autocomplete

      _classPrivateFieldGet(this, _autocomplete)[`${name}_${nextGUID}`] = instance;
      _classPrivateFieldGet(this, _guids)[nextGUID] = instance;
      return instance;
    }

    installExtension(target, pluginName, ...args) {

      const nextGUID = `guid${_classPrivateFieldGet(this, _count)}`;
      _classPrivateFieldSet(this, _count, (+_classPrivateFieldGet(this, _count)) + 1);

      const targetExtensionList = _classPrivateFieldGet(this, _extensions)[target];

      const {
        plugin: Plugin
      } = targetExtensionList.find(extPlg => extPlg.name === pluginName);
      const instance = new Plugin(nextGUID, ...args); // for autocomplete

      _classPrivateFieldGet(this, _autocomplete)[`${pluginName}_${nextGUID}`] = instance;
      _classPrivateFieldGet(this, _guids)[nextGUID] = instance;
      return instance;
    }

    uninstallPluginByGUID(guid) {
      // for autocomplete
      const key = Object.keys(_classPrivateFieldGet(this, _autocomplete)).find(instanceName => instanceName.endsWith(`_${guid}`));
      delete _classPrivateFieldGet(this, _autocomplete)[key];
      delete _classPrivateFieldGet(this, _guids)[guid];
      return true;
    }

    uninstallPluginByInstance(instance) {
      const guid = Object.keys(_classPrivateFieldGet(this, _guids)).find(key => _classPrivateFieldGet(this, _guids)[key] === instance); // for autocomplete

      const key = Object.keys(_classPrivateFieldGet(this, _autocomplete)).find(instanceName => instanceName.endsWith(`_${guid}`));
      delete _classPrivateFieldGet(this, _autocomplete)[key];
      delete _classPrivateFieldGet(this, _guids)[guid];
      return true;
    }

    getDependence(name, type, version) {
      let module;
      let autoVersion;
      let autoType;

      try {
        if (version) {
          module = _classPrivateFieldGet(this, _dependencies)[name][type][version];
        } else if (type) {
          autoVersion = Object.keys(_classPrivateFieldGet(this, _dependencies)[name][type])[0];
          module = _classPrivateFieldGet(this, _dependencies)[name][type][autoVersion];
        } else if (name) {
          autoType = 'esm';
          autoVersion = Object.keys(_classPrivateFieldGet(this, _dependencies)[name][autoType])[0];
          module = _classPrivateFieldGet(this, _dependencies)[name][autoType][autoVersion];
        } else {
          throw new Error('No name param in getDependence');
        }

        return module;
      } catch (e) {
        throw new Error(`Dependence ${name} not found!`);
      }
    }

    getSystem(systemName) {
      return _classPrivateFieldGet(this, _systems)[systemName];
    }

    getPanels() {
      return _classPrivateFieldGet(this, _plugins).filter(plg => plg.type === 'panel');
    }

    getPlugin(name, type = false) {
      try {
        let {
          plugin
        } = _classPrivateFieldGet(this, _plugins).find(plg => {
          return type ? plg.name === name && plg.type === type : plg.name === name;
        });

        return plugin;
      } catch (err) {
        console.error(`Plugin ${name} not found!`);
        throw new Error(err);
      }
    }

    getExtensions(targetName) {
      return _classPrivateFieldGet(this, _extensions)[targetName];
    }

    getInstance(guid) {
      return _classPrivateFieldGet(this, _guids)[guid];
    }

    getGUID(instance) {
      return Object.keys(_classPrivateFieldGet(this, _guids)).find(guid => _classPrivateFieldGet(this, _guids)[guid] === instance);
    }

    getGUIDList() {
      return Object.keys(_classPrivateFieldGet(this, _guids));
    }

  }

  async function _fillPlugins2() {
    // Getting list of all plugins
    const pluginList = await (await fetch('/mock_server/v1/plugins/plugins.json')).json(); // Getting each module from server as module

    const modules = await Promise.all(pluginList.map(pathToFile => import('/plugins/' + pathToFile))); // Plugin is what with the getRegistrationMeta method

    modules.forEach((module, index) => {
      let isPlugin = false;

      for (let key in module) {
        if (module[key].getRegistrationMeta) {
          // set flag isPlugin on module
          isPlugin = true;
          const plugin = module[key];
          const meta = plugin.getRegistrationMeta();

          switch (meta.type) {
            // If type of plugin is extension add it to private property #extensions of class.
            case 'extension':
              // Target property in meta of extensions may be Array for several plugins or String for single plugin.
              if (Array.isArray(meta.target)) {
                for (let target of meta.target) {
                  if (!_classPrivateFieldGet(this, _extensions)[target]) _classPrivateFieldGet(this, _extensions)[target] = [];

                  _classPrivateFieldGet(this, _extensions)[target].push({ ...meta,
                    plugin
                  });
                }
              } else {
                if (!_classPrivateFieldGet(this, _extensions)[meta.target]) _classPrivateFieldGet(this, _extensions)[meta.target] = [];

                _classPrivateFieldGet(this, _extensions)[meta.target].push({ ...meta,
                  plugin
                });
              }

            default:
              // In #plugins to add all plugins regardless of type
              _classPrivateFieldGet(this, _plugins).push({ ...meta,
                plugin,
                path: pluginList[index]
              });

              break;
          }
        }
      }

      if (!isPlugin) console.error(`Plugin ${pluginList[index]} without static method getRegistrationMeta`);
    });
  }

  async function _fillDependencies2() {
    // Getting dependencies from all plugins, that with "withDependencies" flag in meta
    for (let index = 0; index < _classPrivateFieldGet(this, _plugins).length; index++) {
      let pluginObject = _classPrivateFieldGet(this, _plugins)[index]; // Check flag


      if (pluginObject.withDependencies) {
        // Gettign path to directory wit plugin
        const splittedRelativePath = pluginObject.path.split('/');
        if (splittedRelativePath[0] === '.' || '') splittedRelativePath.shift(); // Getting splitted path with static directory of plugins

        const pathToPlgDir = ['/plugins', ...splittedRelativePath].slice(0, -1); // First we get manifest.json with description of dependencies

        let manifest = await (await fetch([...pathToPlgDir, 'manifest.json'].join('/'))).json();

        for (let dep of manifest) {
          /*
          Structure of #dependencies property of Application class:
          {
          <name of plugin>: {
          <type-of-module>:{
          <version>:<module>
          }
          }
          }*/
          if (!_classPrivateFieldGet(this, _dependencies)[dep.name]) _classPrivateFieldGet(this, _dependencies)[dep.name] = {};

          const dependence = _classPrivateFieldGet(this, _dependencies)[dep.name];

          const pathToDependence = [...pathToPlgDir, 'dependencies', dep.fileName].join('/');
          if (!dependence[dep.type]) dependence[dep.type] = {};
          if (!dependence[dep.type][dep.version]) dependence[dep.type][dep.version] = await import(pathToDependence);
        }
      }
    }
  }

  const app = new Application();
  app.start();

})();
