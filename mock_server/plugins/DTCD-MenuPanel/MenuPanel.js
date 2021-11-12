var pluginMeta = {
  type: 'panel',
  name: 'MenuPanel',
  title: 'Панель меню',
  version: '0.1.0',
  withDependencies: true,
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

var script$1 = {
  name: 'MenuPanel',
  data: self => ({
    guid: self.$root.guid,
    eventSystem: self.$root.eventSystem,
    styleSystem: self.$root.styleSystem,
    themeList: [],
    isEditModeEnabled: false,
  }),
  computed: {
    editModeButtonTitle() {
      const mode = this.isEditModeEnabled ? 'просмотра' : 'редактирования';
      return `Включить режим ${mode}`;
    },
  },
  async mounted() {
    // this.eventSystem.createActionByCallback('updateTheme', this.guid, this.updateTheme.bind(this));
    // this.eventSystem.subscribeByNames('ThemeUpdate', 'updateTheme');
    // const themes = this.styleSystem.getThemes();
    // this.themeList.push(...themes);
  },
  methods: {
    addNewWorkspacePanel() {
      this.$root.workspaceSystem.createEmptyCell();
      // this.eventSystem.createAndPublish(this.guid, 'DefaultAddWorkspacePanel');
    },

    compactWorkspacePanels() {
      this.$root.workspaceSystem.compactAllPanels();
      // this.eventSystem.createAndPublish(this.guid, 'CompactWorkspacePanel');
    },

    changeEditMode() {
      this.isEditModeEnabled = !this.isEditModeEnabled;
      this.$root.workspaceSystem.changeMode();
      // this.eventSystem.createAndPublish(this.guid, 'ChangeWorkspaceEditMode');
    },
    backToWorkspaces() {
      this.$root.workspaceSystem.setDefaultConfiguration();
      // this.eventSystem.createAndPublish(this.guid, 'BackToWorkspaceSelection');
    },
    saveWorkspace() {
      this.$root.workspaceSystem.saveConfiguration();
      // this.eventSystem.createAndPublish(this.guid, 'SaveWorkspaceConfigration');
    },
    // changeTheme(name) {
    //   this.selectedTheme = name;
    //   this.styleSystem.setTheme(this.selectedTheme);
    //   this.eventSystem.createAndPublish(this.guid, 'ThemeUpdate');
    // },
    // updateTheme() {
    //   const theme = this.styleSystem.getCurrentTheme();
    //   this.styleSystem.setVariablesToElement(this.$el, theme);
    // },
  },
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
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
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "container" }, [
    _c(
      "div",
      { staticClass: "button-container" },
      [
        _c(
          "div",
          {
            staticClass: "btn",
            attrs: { id: "addNewPanelBtn", title: "Добавить панель" },
            on: { click: _vm.addNewWorkspacePanel },
          },
          [_vm._m(0)]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "btn edit-mode-btn",
            class: { active: _vm.isEditModeEnabled },
            attrs: { id: "changeModeBtn", title: _vm.editModeButtonTitle },
            on: { click: _vm.changeEditMode },
          },
          [
            _vm.isEditModeEnabled
              ? _c("div", { key: "view-mode", staticClass: "icon" }, [
                  _c("i", { staticClass: "far fa-eye" }),
                ])
              : _c("div", { key: "edit-mode", staticClass: "icon" }, [
                  _c("i", { staticClass: "fas fa-pencil-alt" }),
                ]),
          ]
        ),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "btn",
            attrs: { id: "saveWorkspace", title: "Сохранить рабочий стол" },
            on: { click: _vm.saveWorkspace },
          },
          [_vm._m(1)]
        ),
        _vm._v(" "),
        _c("transition", { attrs: { name: "fade", mode: "out-in" } }, [
          _vm.isEditModeEnabled
            ? _c(
                "div",
                {
                  staticClass: "btn",
                  attrs: {
                    id: "compactWorkspaceBtn",
                    title: "Выровнять сетку",
                  },
                  on: { click: _vm.compactWorkspacePanels },
                },
                [
                  _c("div", { staticClass: "icon" }, [
                    _c("i", { staticClass: "fas fa-outdent" }),
                  ]),
                ]
              )
            : _vm._e(),
        ]),
      ],
      1
    ),
    _vm._v(" "),
    _c("div", { staticClass: "button-container" }, [
      _c(
        "div",
        {
          staticClass: "btn",
          attrs: {
            id: "workspaceSelection",
            title: "Вернуться к выбору рабочего стола",
          },
          on: { click: _vm.backToWorkspaces },
        },
        [_vm._m(2)]
      ),
    ]),
  ])
};
var __vue_staticRenderFns__$1 = [
  function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "icon" }, [
      _c("i", { staticClass: "fas fa-plus" }),
    ])
  },
  function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "icon" }, [
      _c("i", { staticClass: "fas fa-save", staticStyle: { color: "grey" } }),
    ])
  },
  function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "icon" }, [
      _c("i", { staticClass: "fas fa-arrow-circle-left" }),
    ])
  },
];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-10b174a5_0", { source: "*[data-v-10b174a5] {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n}\n.fade-enter-active[data-v-10b174a5],\n.fade-leave-active[data-v-10b174a5] {\n  transition: opacity 0.3s;\n}\n.fade-enter[data-v-10b174a5],\n.fade-leave-to[data-v-10b174a5] {\n  opacity: 0;\n}\n.container[data-v-10b174a5] {\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  height: 100%;\n  background-color: transparent;\n  padding: 15px;\n}\n.container .button-container[data-v-10b174a5] {\n  display: flex;\n}\n.container .btn[data-v-10b174a5] {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 40px;\n  height: 40px;\n  border: thin solid rgba(0, 0, 0, 0.25);\n  border-radius: 3px;\n  cursor: pointer;\n  margin-left: 20px;\n  transition: 0.3s;\n}\n.container .btn[data-v-10b174a5]:first-child {\n  margin-left: 0;\n}\n.container .btn[data-v-10b174a5]:hover {\n  color: #2196f3;\n  border-color: #2196f3;\n}\n.container .btn:hover .icon[data-v-10b174a5] {\n  color: #2196f3;\n}\n.container .btn.edit-mode-btn.active[data-v-10b174a5] {\n  color: #4caf50;\n  border-color: #4caf50;\n}\n.container .btn.edit-mode-btn.active .icon[data-v-10b174a5] {\n  color: #4caf50;\n}\n.container .btn.edit-mode-btn[data-v-10b174a5]:hover {\n  border-color: #4caf50;\n}\n.container .btn.edit-mode-btn:hover .icon[data-v-10b174a5] {\n  color: #4caf50;\n}\n.container .btn .icon[data-v-10b174a5] {\n  color: #757575;\n  font-size: 16px;\n  transition: 0.3s;\n}\n.container .menu-panel-theme-container[data-v-10b174a5] {\n  padding: 5px;\n}\n.container .themes-container[data-v-10b174a5] {\n  display: flex;\n  flex-wrap: wrap;\n}\n.container .theme-btn[data-v-10b174a5] {\n  height: 2rem;\n  width: 2rem;\n  border-radius: 50%;\n  margin: 3px;\n  border: 3px solid transparent;\n  transition: 0.3s;\n}\n.container .selected[data-v-10b174a5] {\n  border-color: black;\n}\n.container #saveWorkspace[data-v-10b174a5]:hover {\n  color: none !important;\n  border-color: none !important;\n}\n\n/*# sourceMappingURL=MenuPanel.vue.map */", map: {"version":3,"sources":["MenuPanel.vue","/home/ilya/Desktop/DTCD-MenuPanel/DTCD-MenuPanel/src/components/MenuPanel.vue"],"names":[],"mappings":"AAAA;EACE,sBAAsB;EACtB,SAAS;EACT,UAAU;EACV,wIAAwI;AAC1I;AAEA;;EAEE,wBAAwB;AAC1B;AAEA;;EAEE,UAAU;AACZ;ACuHA;EACA,aAAA;EACA,8BAAA;EACA,eAAA;EACA,YAAA;EACA,6BAAA;EACA,aAAA;ADpHA;ACsHA;EACA,aAAA;ADpHA;ACuHA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,WAAA;EACA,YAAA;EACA,sCAAA;EACA,kBAAA;EACA,eAAA;EACA,iBAAA;EACA,gBAAA;ADrHA;ACuHA;EACA,cAAA;ADrHA;ACwHA;EACA,cAhCA;EAiCA,qBAjCA;ADrFA;ACwHA;EACA,cApCA;ADlFA;AC2HA;EACA,cAzCA;EA0CA,qBA1CA;AD/EA;AC2HA;EACA,cA7CA;AD5EA;AC6HA;EACA,qBAlDA;ADzEA;AC6HA;EACA,cArDA;ADtEA;ACgIA;EACA,cAAA;EACA,eAAA;EACA,gBAAA;AD9HA;ACiIA;EACA,YAAA;AD/HA;ACiIA;EACA,aAAA;EACA,eAAA;AD/HA;ACiIA;EACA,YAAA;EACA,WAAA;EACA,kBAAA;EACA,WAAA;EACA,6BAAA;EACA,gBAAA;AD/HA;ACiIA;EACA,mBAAA;AD/HA;ACkIA;EACA,sBAAA;EACA,6BAAA;ADhIA;;AAEA,wCAAwC","file":"MenuPanel.vue","sourcesContent":["* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen, Ubuntu, Cantarell, \"Open Sans\", \"Helvetica Neue\", sans-serif;\n}\n\n.fade-enter-active,\n.fade-leave-active {\n  transition: opacity 0.3s;\n}\n\n.fade-enter,\n.fade-leave-to {\n  opacity: 0;\n}\n\n.container {\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  height: 100%;\n  background-color: transparent;\n  padding: 15px;\n}\n.container .button-container {\n  display: flex;\n}\n.container .btn {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 40px;\n  height: 40px;\n  border: thin solid rgba(0, 0, 0, 0.25);\n  border-radius: 3px;\n  cursor: pointer;\n  margin-left: 20px;\n  transition: 0.3s;\n}\n.container .btn:first-child {\n  margin-left: 0;\n}\n.container .btn:hover {\n  color: #2196f3;\n  border-color: #2196f3;\n}\n.container .btn:hover .icon {\n  color: #2196f3;\n}\n.container .btn.edit-mode-btn.active {\n  color: #4caf50;\n  border-color: #4caf50;\n}\n.container .btn.edit-mode-btn.active .icon {\n  color: #4caf50;\n}\n.container .btn.edit-mode-btn:hover {\n  border-color: #4caf50;\n}\n.container .btn.edit-mode-btn:hover .icon {\n  color: #4caf50;\n}\n.container .btn .icon {\n  color: #757575;\n  font-size: 16px;\n  transition: 0.3s;\n}\n.container .menu-panel-theme-container {\n  padding: 5px;\n}\n.container .themes-container {\n  display: flex;\n  flex-wrap: wrap;\n}\n.container .theme-btn {\n  height: 2rem;\n  width: 2rem;\n  border-radius: 50%;\n  margin: 3px;\n  border: 3px solid transparent;\n  transition: 0.3s;\n}\n.container .selected {\n  border-color: black;\n}\n.container #saveWorkspace:hover {\n  color: none !important;\n  border-color: none !important;\n}\n\n/*# sourceMappingURL=MenuPanel.vue.map */","<template>\n  <div class=\"container\">\n    <div class=\"button-container\">\n      <div id=\"addNewPanelBtn\" class=\"btn\" title=\"Добавить панель\" @click=\"addNewWorkspacePanel\">\n        <div class=\"icon\">\n          <i class=\"fas fa-plus\" />\n        </div>\n      </div>\n      <div\n        id=\"changeModeBtn\"\n        class=\"btn edit-mode-btn\"\n        :class=\"{ active: isEditModeEnabled }\"\n        :title=\"editModeButtonTitle\"\n        @click=\"changeEditMode\"\n      >\n        <div v-if=\"isEditModeEnabled\" key=\"view-mode\" class=\"icon\">\n          <i class=\"far fa-eye\" />\n        </div>\n        <div v-else key=\"edit-mode\" class=\"icon\">\n          <i class=\"fas fa-pencil-alt\" />\n        </div>\n      </div>\n      <div id=\"saveWorkspace\" class=\"btn\" title=\"Сохранить рабочий стол\" @click=\"saveWorkspace\">\n        <div class=\"icon\">\n          <i style=\"color:grey;\" class=\"fas fa-save\" />\n        </div>\n      </div>\n      <transition name=\"fade\" mode=\"out-in\">\n        <div\n          v-if=\"isEditModeEnabled\"\n          id=\"compactWorkspaceBtn\"\n          class=\"btn\"\n          title=\"Выровнять сетку\"\n          @click=\"compactWorkspacePanels\"\n        >\n          <div class=\"icon\">\n            <i class=\"fas fa-outdent\" />\n          </div>\n        </div>\n      </transition>\n    </div>\n    <div class=\"button-container\">\n      <div\n        id=\"workspaceSelection\"\n        class=\"btn\"\n        title=\"Вернуться к выбору рабочего стола\"\n        @click=\"backToWorkspaces\"\n      >\n        <div class=\"icon\">\n          <i class=\"fas fa-arrow-circle-left\"></i>\n        </div>\n      </div>\n    </div>\n    <!-- <div v-if=\"isEditModeEnabled\" class=\"menu-panel-theme-container\">\n      <p>Выбрать тему:</p>\n      <div class=\"themes-container\">\n        <div\n          class=\"theme-btn\"\n          :class=\"{ selected: theme.name === selectedTheme }\"\n          v-for=\"theme in themeList\"\n          :key=\"theme.name\"\n          :style=\"{ background: theme.preview }\"\n          @click=\"changeTheme(theme.name)\"\n        ></div>\n      </div>\n    </div> -->\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'MenuPanel',\n  data: self => ({\n    guid: self.$root.guid,\n    eventSystem: self.$root.eventSystem,\n    styleSystem: self.$root.styleSystem,\n    themeList: [],\n    isEditModeEnabled: false,\n  }),\n  computed: {\n    editModeButtonTitle() {\n      const mode = this.isEditModeEnabled ? 'просмотра' : 'редактирования';\n      return `Включить режим ${mode}`;\n    },\n  },\n  async mounted() {\n    // this.eventSystem.createActionByCallback('updateTheme', this.guid, this.updateTheme.bind(this));\n    // this.eventSystem.subscribeByNames('ThemeUpdate', 'updateTheme');\n    // const themes = this.styleSystem.getThemes();\n    // this.themeList.push(...themes);\n  },\n  methods: {\n    addNewWorkspacePanel() {\n      this.$root.workspaceSystem.createEmptyCell();\n      // this.eventSystem.createAndPublish(this.guid, 'DefaultAddWorkspacePanel');\n    },\n\n    compactWorkspacePanels() {\n      this.$root.workspaceSystem.compactAllPanels();\n      // this.eventSystem.createAndPublish(this.guid, 'CompactWorkspacePanel');\n    },\n\n    changeEditMode() {\n      this.isEditModeEnabled = !this.isEditModeEnabled;\n      this.$root.workspaceSystem.changeMode();\n      // this.eventSystem.createAndPublish(this.guid, 'ChangeWorkspaceEditMode');\n    },\n    backToWorkspaces() {\n      this.$root.workspaceSystem.setDefaultConfiguration();\n      // this.eventSystem.createAndPublish(this.guid, 'BackToWorkspaceSelection');\n    },\n    saveWorkspace() {\n      this.$root.workspaceSystem.saveConfiguration();\n      // this.eventSystem.createAndPublish(this.guid, 'SaveWorkspaceConfigration');\n    },\n    // changeTheme(name) {\n    //   this.selectedTheme = name;\n    //   this.styleSystem.setTheme(this.selectedTheme);\n    //   this.eventSystem.createAndPublish(this.guid, 'ThemeUpdate');\n    // },\n    // updateTheme() {\n    //   const theme = this.styleSystem.getCurrentTheme();\n    //   this.styleSystem.setVariablesToElement(this.$el, theme);\n    // },\n  },\n};\n</script>\n\n<style lang=\"scss\" scoped>\n@import './../styles/base';\n\n$c-blue: #2196f3;\n$c-green: #4caf50;\n\n.container {\n  display: flex;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  height: 100%;\n  background-color: transparent;\n  padding: 15px;\n\n  .button-container {\n    display: flex;\n  }\n\n  .btn {\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    width: 40px;\n    height: 40px;\n    border: thin solid rgba(0, 0, 0, 0.25);\n    border-radius: 3px;\n    cursor: pointer;\n    margin-left: 20px;\n    transition: $transition-time;\n\n    &:first-child {\n      margin-left: 0;\n    }\n\n    &:hover {\n      color: $c-blue;\n      border-color: $c-blue;\n\n      & .icon {\n        color: $c-blue;\n      }\n    }\n\n    &.edit-mode-btn {\n      &.active {\n        color: $c-green;\n        border-color: $c-green;\n\n        & .icon {\n          color: $c-green;\n        }\n      }\n\n      &:hover {\n        border-color: $c-green;\n\n        .icon {\n          color: $c-green;\n        }\n      }\n    }\n\n    .icon {\n      color: #757575;\n      font-size: 16px;\n      transition: $transition-time;\n    }\n  }\n  .menu-panel-theme-container {\n    padding: 5px;\n  }\n  .themes-container {\n    display: flex;\n    flex-wrap: wrap;\n  }\n  .theme-btn {\n    height: 2rem;\n    width: 2rem;\n    border-radius: 50%;\n    margin: 3px;\n    border: 3px solid transparent;\n    transition: 0.3s;\n  }\n  .selected {\n    border-color: black;\n  }\n\n  #saveWorkspace:hover {\n    color: none !important;\n    border-color: none !important;\n  }\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-10b174a5";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    createInjector,
    undefined,
    undefined
  );

//

var script = {
  name: 'PluginComponent',
  components: { MenuPanel: __vue_component__$1 },
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("MenuPanel")
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
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
    undefined,
    undefined,
    undefined
  );

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

class StyleSystemAdapter extends BaseAdapter {
	/**
	 * Initialize StyleSystemAdapter instance.
	 * @constructor
	 */
	constructor() {
		super();
		this.instance = this.getSystem('StyleSystem');
	}

	/**
	 * Get object design system.
	 * @method
	 * @returns {object} current object design system.
	 */
	getCurrentTheme() {
		return this.instance.getCurrentTheme();
	}

	/**
	 * Setting new current theme
	 * @method
	 * @param {String} name name of new theme
	 * @returns {Boolean}
	 */
	setTheme(name) {
		this.instance.setTheme(name);
		return true;
	}

	/**
	 * Getting list of all available themes
	 * @async
	 * @method
	 * @returns {Object[]}
	 */
	async getThemes() {
		return await this.instance.getThemes();
	}

	/**
	 * Set CSS variable for DOM element
	 * @method
	 * @param {string} element DOM element.
	 * @param {object} obj Design object.
	 * @param {string} startPrefix Prefix for CSS variable.
	 */
	setVariablesToElement(element, obj, startPrefix = '-') {
		this.instance.setVariablesToElement(element, obj, startPrefix);
	}
}

class WorkspaceSystemAdapter extends BaseAdapter {
  /**
   * Initialize WorkspaceSystemAdapter instance.
   * @constructor
   */
  constructor() {
    super();
    this.instance = this.getSystem('WorkspaceSystem');
  }

  /**
   * Delete workspace configuration with the given id
   * @method
   * @param {number} id identifier of configuration
   */
  async deleteConfiguration(id) {
    await this.instance.deleteConfiguration(id);
  }

  /**
   * Return list of available configurations
   * @method
   * @returns {Array} array of configurations
   */
  async getConfigurationList() {
    return await this.instance.getConfigurationList();
  }

  /**
   * Changes title of configuration with given id
   * @method
   * @param {number} id identifier of configuration
   * @param {string} newTitle new title to set
   */
  async changeConfigurationTitle(id, newTitle) {
    await this.instance.changeConfigurationTitle(id, newTitle);
  }

  /**
   * Creates empty workspace configuration
   * @method
   * @param {string} configurationTitle title to set to new configuration
   */
  async createEmptyConfiguration(configurationTitle) {
    await this.instance.createEmptyConfiguration(configurationTitle);
  }

  /**
   * Saves current workspace configuration
   * @method
   */
  async saveConfiguration() {
    await this.instance.saveConfiguration();
  }

  /**
   * Sets new workspace configuration with given id
   * @method
   * @param {number} id identifier of configuration
   */
  setConfiguration(id) {
    this.instance.setConfiguration(id);
  }

  /**
   * Compacts panels to top left corner of screen
   * @method
   */
  compactAllPanels() {
    this.instance.compactAllPanels();
  }

  /**
   * Changes current workspace mode
   * @method
   */
  changeMode() {
    this.instance.changeMode();
  }

  /**
   * Sets defaults configuration of workspace
   * @method
   */
  setDefaultConfiguration() {
    this.instance.setDefaultConfiguration();
  }
  /**
   * Creates empty cell widget on workspace
   * @method
   */
  createEmptyCell() {
    this.instance.createEmptyCell();
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

    const eventSystem = new EventSystemAdapter();
    const styleSystem = new StyleSystemAdapter();
    const storageSystem = new StorageSystemAdapter();
    const workspaceSystem = new WorkspaceSystemAdapter();

    eventSystem.registerEvent(eventSystem.createEvent(guid, 'ThemeUpdate'));

    const VueJS = this.getDependence('Vue');
    const data = { guid, eventSystem, styleSystem, storageSystem, workspaceSystem };

    new VueJS.default({
      data: () => data,
      render: h => h(__vue_component__),
    }).$mount(selector);
  }
}

export { Plugin };
