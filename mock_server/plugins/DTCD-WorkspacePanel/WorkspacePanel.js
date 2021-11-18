var pluginMeta = {
  type: 'panel',
  name: 'WorkspacePanel',
  title: 'Панель рабочих столов',
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

var script$2 = {
  name: 'ModalWindow',
  data() {
    return {
      tempTitle: '',
      color: 'none',
    };
  },
  methods: {
    close() {
      this.$emit('close');
      this.clearTempValue();
    },
    save() {
      if (this.tempTitle === '') {
        this.color = 'red';
        return;
      }
      this.color = 'none';
      this.$emit('createWorkspace', this.tempTitle);
      this.close();
    },
    clearTempValue() {
      this.tempTitle = '';
    },
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
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("transition", { attrs: { name: "modal-fade" } }, [
    _c("div", { staticClass: "modal-backdrop" }, [
      _c("div", { staticClass: "modal" }, [
        _c(
          "header",
          { staticClass: "modal-header" },
          [
            _vm._t("header", [_vm._v(" Создание рабочего стола")]),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn-close",
                attrs: { type: "button" },
                on: { click: _vm.close },
              },
              [_vm._v("x")]
            ),
          ],
          2
        ),
        _vm._v(" "),
        _c("section", { staticClass: "modal-body" }, [
          _c("div", { staticClass: "form-field" }, [
            _c("div", { staticClass: "label-wrapper" }, [
              _c("label", { style: { color: _vm.color } }, [_vm._v("Title")]),
            ]),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.tempTitle,
                  expression: "tempTitle",
                },
              ],
              staticClass: "input",
              style: { borderColor: _vm.color },
              attrs: { id: "ttl", type: "text" },
              domProps: { value: _vm.tempTitle },
              on: {
                input: function ($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.tempTitle = $event.target.value;
                },
              },
            }),
          ]),
        ]),
        _vm._v(" "),
        _c("footer", { staticClass: "modal-footer" }, [
          _c(
            "button",
            {
              staticClass: "footer-btn",
              attrs: { type: "button" },
              on: { click: _vm.save },
            },
            [_vm._v("Save")]
          ),
          _vm._v(" "),
          _c(
            "button",
            {
              staticClass: "footer-btn",
              attrs: { type: "button" },
              on: { click: _vm.close },
            },
            [_vm._v("Close")]
          ),
        ]),
      ]),
    ]),
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-74a4d790_0", { source: "\n.modal-backdrop[data-v-74a4d790] {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 5;\n}\n.modal[data-v-74a4d790] {\n  background: #ffffff;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);\n  height: 25vh;\n  width: 50vh;\n  display: flex;\n  flex-direction: column;\n  z-index: 30;\n  position: relative;\n}\n.modal-header[data-v-74a4d790],\n.modal-footer[data-v-74a4d790] {\n  padding: 15px;\n  display: flex;\n}\n.modal-header[data-v-74a4d790] {\n  position: relative;\n  border-bottom: 1px solid #eeeeee;\n  justify-content: space-between;\n}\n.modal-footer[data-v-74a4d790] {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  border-top: 1px solid #eeeeee;\n  justify-content: flex-end;\n}\n.modal-body[data-v-74a4d790] {\n  position: relative;\n  padding: 20px;\n}\n.btn-close[data-v-74a4d790] {\n  position: absolute;\n  top: 0;\n  right: 5px;\n  border: none;\n  font-size: 20px;\n  padding: 10px;\n  cursor: pointer;\n  font-weight: bold;\n  color: #757575;\n  background: transparent;\n}\n.btn-close[data-v-74a4d790]:hover {\n  color: #2196f3;\n}\n.footer-btn[data-v-74a4d790] {\n  padding: 5px;\n  width: 80px;\n  margin: 2px 5px;\n}\n.input[data-v-74a4d790] {\n  padding: 0.5rem;\n  border: 1px solid rgb(199, 208, 217);\n  width: 100%;\n  max-width: 500px;\n}\n.label-wrapper[data-v-74a4d790] {\n  padding: 0.2rem;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 1.25;\n}\n.form-field[data-v-74a4d790] {\n  margin-bottom: 10px;\n}\n", map: {"version":3,"sources":["/home/ilya/Desktop/DTCD-WorkspacePanel/DTCD-WorkspacePanel/src/components/ModalWindow.vue"],"names":[],"mappings":";AA8DA;EACA,eAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;EACA,aAAA;EACA,uBAAA;EACA,mBAAA;EACA,UAAA;AACA;AAEA;EACA,mBAAA;EACA,uCAAA;EACA,YAAA;EACA,WAAA;EACA,aAAA;EACA,sBAAA;EACA,WAAA;EACA,kBAAA;AACA;AAEA;;EAEA,aAAA;EACA,aAAA;AACA;AAEA;EACA,kBAAA;EACA,gCAAA;EACA,8BAAA;AACA;AAEA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,WAAA;EACA,6BAAA;EACA,yBAAA;AACA;AAEA;EACA,kBAAA;EACA,aAAA;AACA;AAEA;EACA,kBAAA;EACA,MAAA;EACA,UAAA;EACA,YAAA;EACA,eAAA;EACA,aAAA;EACA,eAAA;EACA,iBAAA;EACA,cAAA;EACA,uBAAA;AACA;AACA;EACA,cAAA;AACA;AAEA;EACA,YAAA;EACA,WAAA;EACA,eAAA;AACA;AAEA;EACA,eAAA;EACA,oCAAA;EACA,WAAA;EACA,gBAAA;AACA;AACA;EACA,eAAA;EACA,eAAA;EACA,gBAAA;EACA,iBAAA;AACA;AACA;EACA,mBAAA;AACA","file":"ModalWindow.vue","sourcesContent":["<template>\n  <transition name=\"modal-fade\">\n    <div class=\"modal-backdrop\">\n      <div class=\"modal\">\n        <header class=\"modal-header\">\n          <slot name=\"header\"> Создание рабочего стола</slot>\n          <button type=\"button\" class=\"btn-close\" @click=\"close\">x</button>\n        </header>\n        <section class=\"modal-body\">\n          <div class=\"form-field\">\n            <div class=\"label-wrapper\">\n              <label :style=\"{ color: color }\">Title</label>\n            </div>\n            <input\n              id=\"ttl\"\n              type=\"text\"\n              class=\"input\"\n              v-model=\"tempTitle\"\n              :style=\"{ borderColor: color }\"\n            />\n          </div>\n        </section>\n        <footer class=\"modal-footer\">\n          <button type=\"button\" class=\"footer-btn\" @click=\"save\">Save</button>\n          <button type=\"button\" class=\"footer-btn\" @click=\"close\">Close</button>\n        </footer>\n      </div>\n    </div>\n  </transition>\n</template>\n\n<script>\nexport default {\n  name: 'ModalWindow',\n  data() {\n    return {\n      tempTitle: '',\n      color: 'none',\n    };\n  },\n  methods: {\n    close() {\n      this.$emit('close');\n      this.clearTempValue();\n    },\n    save() {\n      if (this.tempTitle === '') {\n        this.color = 'red';\n        return;\n      }\n      this.color = 'none';\n      this.$emit('createWorkspace', this.tempTitle);\n      this.close();\n    },\n    clearTempValue() {\n      this.tempTitle = '';\n    },\n  },\n};\n</script>\n\n<style scoped>\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 5;\n}\n\n.modal {\n  background: #ffffff;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);\n  height: 25vh;\n  width: 50vh;\n  display: flex;\n  flex-direction: column;\n  z-index: 30;\n  position: relative;\n}\n\n.modal-header,\n.modal-footer {\n  padding: 15px;\n  display: flex;\n}\n\n.modal-header {\n  position: relative;\n  border-bottom: 1px solid #eeeeee;\n  justify-content: space-between;\n}\n\n.modal-footer {\n  position: absolute;\n  bottom: 0;\n  right: 0;\n  width: 100%;\n  border-top: 1px solid #eeeeee;\n  justify-content: flex-end;\n}\n\n.modal-body {\n  position: relative;\n  padding: 20px;\n}\n\n.btn-close {\n  position: absolute;\n  top: 0;\n  right: 5px;\n  border: none;\n  font-size: 20px;\n  padding: 10px;\n  cursor: pointer;\n  font-weight: bold;\n  color: #757575;\n  background: transparent;\n}\n.btn-close:hover {\n  color: #2196f3;\n}\n\n.footer-btn {\n  padding: 5px;\n  width: 80px;\n  margin: 2px 5px;\n}\n\n.input {\n  padding: 0.5rem;\n  border: 1px solid rgb(199, 208, 217);\n  width: 100%;\n  max-width: 500px;\n}\n.label-wrapper {\n  padding: 0.2rem;\n  font-size: 14px;\n  font-weight: 500;\n  line-height: 1.25;\n}\n.form-field {\n  margin-bottom: 10px;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-74a4d790";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    createInjector,
    undefined,
    undefined
  );

//
var script$1 = {
  name: 'WorkspacePanel',
  components: { ModalWindow: __vue_component__$2 },
  data() {
    return {
      isModalVisible: false,
      configurationList: [],
      search: '',
      tempTitle: '',
      editTitleID: -1,
    };
  },
  async mounted() {
    await this.getConfigurationList();
  },
  computed: {
    configurationsToShow() {
      if (this.configurationList) {
        if (this.search)
          return this.configurationList.filter(conf =>
            conf.title.toLowerCase().includes(this.search.toLowerCase())
          );
        return this.configurationList;
      }
      return [];
    },
  },
  methods: {
    async getConfigurationList() {
      this.configurationList = await this.$root.workspaceSystem.getConfigurationList();
    },
    closeModal() {
      this.isModalVisible = false;
    },
    async createWorkspace(newTitle) {
      await this.$root.workspaceSystem.createEmptyConfiguration(newTitle);
      await this.getConfigurationList();
    },
    async saveTitle(configuration) {
      if (this.tempTitle != '') {
        try {
          await this.$root.workspaceSystem.changeConfigurationTitle(
            configuration.id,
            this.tempTitle
          );
          configuration.title = this.tempTitle;
          this.tempTitle = '';
          this.editTitleID = -1;
        } catch (err) {
          console.log(err);
        }
      }
    },
    selectWorkspace(id) {
      this.$root.workspaceSystem.setConfiguration(id);
    },
    createNewWorkspace() {
      this.isModalVisible = true;
    },
    changeTemplateTitle(configuration) {
      this.tempTitle = configuration.title;
      this.editTitleID = configuration.id;
    },
    async deleteConfiguration(id) {
      await this.$root.workspaceSystem.deleteConfiguration(id);
      this.configurationList = this.configurationList.filter(conf => conf.id != id);
    },
    async exportConfiguration(id) {
      const conf = await Application.getSystem('WorkspaceSystem').downloadConfiguration(id);
      const blobURL = URL.createObjectURL(
        new Blob([JSON.stringify(conf)], { type: 'application/text' })
      );
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blobURL, `${conf.title}.json`);
      } else {
        const aElement = document.createElement('a');
        aElement.setAttribute('href', blobURL);
        aElement.setAttribute('download', `${conf.title}.json`);
        aElement.style.display = 'none';
        document.body.appendChild(aElement);
        aElement.click();
        document.body.removeChild(aElement);
      }
    },
    async importConfiguration() {
      const fileInputElement = document.createElement('input');
      fileInputElement.setAttribute('type', 'file');
      fileInputElement.style.display = 'none';
      fileInputElement.addEventListener('change', () => {
        if (!fileInputElement.files || fileInputElement.files.length <= 0) {
          throw new Error('There is no file to open');
        }
        const reader = new FileReader();
        const onLoadEndCallback = async evt => {
          const fileReader = evt.target;
          if (fileReader.error === null) {
            const config = JSON.parse(fileReader.result);
            delete config.id;
            await Application.getSystem('WorkspaceSystem').importConfiguration(config);
            await this.getConfigurationList();
          } else {
            throw Error(fileReader.error);
          }
        };
        reader.fileName = fileInputElement.files[0].name;
        reader.onloadend = onLoadEndCallback;
        reader.readAsText(fileInputElement.files[0]);
        document.body.removeChild(fileInputElement);
      });
      document.body.appendChild(fileInputElement);
      fileInputElement.click();
    },
  },
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "panel-container" },
    [
      _vm.isModalVisible
        ? _c("ModalWindow", {
            on: { close: _vm.closeModal, createWorkspace: _vm.createWorkspace },
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "form-field" }, [
        _vm._m(1),
        _vm._v(" "),
        _c("input", {
          directives: [
            {
              name: "model",
              rawName: "v-model",
              value: _vm.search,
              expression: "search",
            },
          ],
          staticClass: "input",
          attrs: { type: "text" },
          domProps: { value: _vm.search },
          on: {
            input: function ($event) {
              if ($event.target.composing) {
                return
              }
              _vm.search = $event.target.value;
            },
          },
        }),
      ]),
      _vm._v(" "),
      _c(
        "button",
        { staticClass: "btn", on: { click: _vm.createNewWorkspace } },
        [_vm._v("Create new")]
      ),
      _vm._v(" "),
      _c(
        "button",
        { staticClass: "btn", on: { click: _vm.importConfiguration } },
        [_vm._v("Import")]
      ),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "configuration-list" },
        _vm._l(_vm.configurationsToShow, function (configuration) {
          return _c(
            "div",
            {
              key: configuration.id,
              staticClass: "list-item",
              attrs: { value: configuration.id },
              on: {
                click: function ($event) {
                  if ($event.target !== $event.currentTarget) {
                    return null
                  }
                  return _vm.selectWorkspace(configuration.id)
                },
              },
            },
            [
              _vm.editTitleID === configuration.id
                ? _c("input", {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.tempTitle,
                        expression: "tempTitle",
                      },
                    ],
                    attrs: { type: "text" },
                    domProps: { value: _vm.tempTitle },
                    on: {
                      input: function ($event) {
                        if ($event.target.composing) {
                          return
                        }
                        _vm.tempTitle = $event.target.value;
                      },
                    },
                  })
                : _c(
                    "div",
                    {
                      on: {
                        click: function ($event) {
                          if ($event.target !== $event.currentTarget) {
                            return null
                          }
                          return _vm.selectWorkspace(configuration.id)
                        },
                      },
                    },
                    [_vm._v(_vm._s(configuration.title))]
                  ),
              _vm._v(" "),
              _c("div", { staticClass: "list-item-button-container" }, [
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.editTitleID === configuration.id,
                        expression: "editTitleID === configuration.id",
                      },
                    ],
                    staticClass: "icon",
                    on: {
                      click: function ($event) {
                        return _vm.saveTitle(configuration)
                      },
                    },
                  },
                  [_c("i", { staticClass: "fas fa-save" })]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.editTitleID !== configuration.id,
                        expression: "editTitleID !== configuration.id",
                      },
                    ],
                    staticClass: "icon",
                    on: {
                      click: function ($event) {
                        return _vm.changeTemplateTitle(configuration)
                      },
                    },
                  },
                  [_c("i", { staticClass: "fas fa-edit" })]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.editTitleID !== configuration.id,
                        expression: "editTitleID !== configuration.id",
                      },
                    ],
                    staticClass: "icon",
                    on: {
                      click: function ($event) {
                        return _vm.exportConfiguration(configuration.id)
                      },
                    },
                  },
                  [_c("i", { staticClass: "fas fa-file-import" })]
                ),
                _vm._v(" "),
                _c(
                  "div",
                  {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: _vm.editTitleID !== configuration.id,
                        expression: "editTitleID !== configuration.id",
                      },
                    ],
                    staticClass: "icon",
                    on: {
                      click: function ($event) {
                        return _vm.deleteConfiguration(configuration.id)
                      },
                    },
                  },
                  [_c("i", { staticClass: "fas fa-trash-alt" })]
                ),
              ]),
            ]
          )
        }),
        0
      ),
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [
  function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "panel-header" }, [
      _c("h2", [_vm._v("Select workspace configuration")]),
    ])
  },
  function () {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("div", { staticClass: "label-wrapper" }, [
      _c("label", [_vm._v("Search")]),
    ])
  },
];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-ed0df6dc_0", { source: "\n.panel-container[data-v-ed0df6dc] {\n  padding: 15px;\n}\n.label-wrapper[data-v-ed0df6dc] {\n  padding: 0.4rem 0;\n  font-size: 16px;\n  font-weight: 500;\n  line-height: 1.25;\n}\n.form-field[data-v-ed0df6dc] {\n  margin-bottom: 10px;\n}\n.input[data-v-ed0df6dc] {\n  padding: 0.5rem;\n  border: 1px solid rgb(199, 208, 217);\n  width: 200px;\n}\n.btn[data-v-ed0df6dc] {\n  width: 80px;\n  height: 30px;\n}\n.configuration-list[data-v-ed0df6dc] {\n  display: flex;\n  flex-direction: column;\n}\n.list-item[data-v-ed0df6dc] {\n  cursor: pointer;\n  padding: 12px 8px;\n  background: #eee;\n  transition: 0.2s;\n  display: flex;\n  justify-content: space-between;\n}\n.list-item-button-container[data-v-ed0df6dc] {\n  display: flex;\n}\n.icon[data-v-ed0df6dc] {\n  margin-left: 5px;\n  /* color: grey; */\n}\n.list-item[data-v-ed0df6dc]:nth-child(odd) {\n  background: #f9f9f9;\n}\n.list-item[data-v-ed0df6dc]:hover {\n  background: #ddd;\n}\n", map: {"version":3,"sources":["/home/ilya/Desktop/DTCD-WorkspacePanel/DTCD-WorkspacePanel/src/components/WorkspacePanel.vue"],"names":[],"mappings":";AAkLA;EACA,aAAA;AACA;AAEA;EACA,iBAAA;EACA,eAAA;EACA,gBAAA;EACA,iBAAA;AACA;AAEA;EACA,mBAAA;AACA;AAEA;EACA,eAAA;EACA,oCAAA;EACA,YAAA;AACA;AACA;EACA,WAAA;EACA,YAAA;AACA;AACA;EACA,aAAA;EACA,sBAAA;AACA;AAEA;EACA,eAAA;EACA,iBAAA;EACA,gBAAA;EACA,gBAAA;EACA,aAAA;EACA,8BAAA;AACA;AACA;EACA,aAAA;AACA;AACA;EACA,gBAAA;EACA,iBAAA;AACA;AAEA;EACA,mBAAA;AACA;AAEA;EACA,gBAAA;AACA","file":"WorkspacePanel.vue","sourcesContent":["<template>\n  <div class=\"panel-container\">\n    <ModalWindow v-if=\"isModalVisible\" @close=\"closeModal\" @createWorkspace=\"createWorkspace\" />\n    <div class=\"panel-header\">\n      <h2>Select workspace configuration</h2>\n    </div>\n    <div class=\"form-field\">\n      <div class=\"label-wrapper\">\n        <label>Search</label>\n      </div>\n      <input type=\"text\" class=\"input\" v-model=\"search\" />\n    </div>\n    <button class=\"btn\" @click=\"createNewWorkspace\">Create new</button>\n    <button class=\"btn\" @click=\"importConfiguration\">Import</button>\n    <div class=\"configuration-list\">\n      <div\n        class=\"list-item\"\n        v-for=\"configuration in configurationsToShow\"\n        :value=\"configuration.id\"\n        :key=\"configuration.id\"\n        @click.self=\"selectWorkspace(configuration.id)\"\n      >\n        <input v-if=\"editTitleID === configuration.id\" type=\"text\" v-model=\"tempTitle\" />\n        <div v-else @click.self=\"selectWorkspace(configuration.id)\">{{ configuration.title }}</div>\n        <div class=\"list-item-button-container\">\n          <div\n            v-show=\"editTitleID === configuration.id\"\n            class=\"icon\"\n            @click=\"saveTitle(configuration)\"\n          >\n            <i class=\"fas fa-save\" />\n          </div>\n          <div\n            v-show=\"editTitleID !== configuration.id\"\n            class=\"icon\"\n            @click=\"changeTemplateTitle(configuration)\"\n          >\n            <i class=\"fas fa-edit\" />\n          </div>\n          <div\n            v-show=\"editTitleID !== configuration.id\"\n            class=\"icon\"\n            @click=\"exportConfiguration(configuration.id)\"\n          >\n            <i class=\"fas fa-file-import\"></i>\n          </div>\n          <div\n            v-show=\"editTitleID !== configuration.id\"\n            class=\"icon\"\n            @click=\"deleteConfiguration(configuration.id)\"\n          >\n            <i class=\"fas fa-trash-alt\" />\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script>\nimport ModalWindow from '@/components/ModalWindow';\nexport default {\n  name: 'WorkspacePanel',\n  components: { ModalWindow },\n  data() {\n    return {\n      isModalVisible: false,\n      configurationList: [],\n      search: '',\n      tempTitle: '',\n      editTitleID: -1,\n    };\n  },\n  async mounted() {\n    await this.getConfigurationList();\n  },\n  computed: {\n    configurationsToShow() {\n      if (this.configurationList) {\n        if (this.search)\n          return this.configurationList.filter(conf =>\n            conf.title.toLowerCase().includes(this.search.toLowerCase())\n          );\n        return this.configurationList;\n      }\n      return [];\n    },\n  },\n  methods: {\n    async getConfigurationList() {\n      this.configurationList = await this.$root.workspaceSystem.getConfigurationList();\n    },\n    closeModal() {\n      this.isModalVisible = false;\n    },\n    async createWorkspace(newTitle) {\n      await this.$root.workspaceSystem.createEmptyConfiguration(newTitle);\n      await this.getConfigurationList();\n    },\n    async saveTitle(configuration) {\n      if (this.tempTitle != '') {\n        try {\n          await this.$root.workspaceSystem.changeConfigurationTitle(\n            configuration.id,\n            this.tempTitle\n          );\n          configuration.title = this.tempTitle;\n          this.tempTitle = '';\n          this.editTitleID = -1;\n        } catch (err) {\n          console.log(err);\n        }\n      }\n    },\n    selectWorkspace(id) {\n      this.$root.workspaceSystem.setConfiguration(id);\n    },\n    createNewWorkspace() {\n      this.isModalVisible = true;\n    },\n    changeTemplateTitle(configuration) {\n      this.tempTitle = configuration.title;\n      this.editTitleID = configuration.id;\n    },\n    async deleteConfiguration(id) {\n      await this.$root.workspaceSystem.deleteConfiguration(id);\n      this.configurationList = this.configurationList.filter(conf => conf.id != id);\n    },\n    async exportConfiguration(id) {\n      const conf = await Application.getSystem('WorkspaceSystem').downloadConfiguration(id);\n      const blobURL = URL.createObjectURL(\n        new Blob([JSON.stringify(conf)], { type: 'application/text' })\n      );\n      if (window.navigator.msSaveOrOpenBlob) {\n        window.navigator.msSaveOrOpenBlob(blobURL, `${conf.title}.json`);\n      } else {\n        const aElement = document.createElement('a');\n        aElement.setAttribute('href', blobURL);\n        aElement.setAttribute('download', `${conf.title}.json`);\n        aElement.style.display = 'none';\n        document.body.appendChild(aElement);\n        aElement.click();\n        document.body.removeChild(aElement);\n      }\n    },\n    async importConfiguration() {\n      const fileInputElement = document.createElement('input');\n      fileInputElement.setAttribute('type', 'file');\n      fileInputElement.style.display = 'none';\n      fileInputElement.addEventListener('change', () => {\n        if (!fileInputElement.files || fileInputElement.files.length <= 0) {\n          throw new Error('There is no file to open');\n        }\n        const reader = new FileReader();\n        const onLoadEndCallback = async evt => {\n          const fileReader = evt.target;\n          if (fileReader.error === null) {\n            const config = JSON.parse(fileReader.result);\n            delete config.id;\n            await Application.getSystem('WorkspaceSystem').importConfiguration(config);\n            await this.getConfigurationList();\n          } else {\n            throw Error(fileReader.error);\n          }\n        };\n        reader.fileName = fileInputElement.files[0].name;\n        reader.onloadend = onLoadEndCallback;\n        reader.readAsText(fileInputElement.files[0]);\n        document.body.removeChild(fileInputElement);\n      });\n      document.body.appendChild(fileInputElement);\n      fileInputElement.click();\n    },\n  },\n};\n</script>\n\n<style scoped>\n.panel-container {\n  padding: 15px;\n}\n\n.label-wrapper {\n  padding: 0.4rem 0;\n  font-size: 16px;\n  font-weight: 500;\n  line-height: 1.25;\n}\n\n.form-field {\n  margin-bottom: 10px;\n}\n\n.input {\n  padding: 0.5rem;\n  border: 1px solid rgb(199, 208, 217);\n  width: 200px;\n}\n.btn {\n  width: 80px;\n  height: 30px;\n}\n.configuration-list {\n  display: flex;\n  flex-direction: column;\n}\n\n.list-item {\n  cursor: pointer;\n  padding: 12px 8px;\n  background: #eee;\n  transition: 0.2s;\n  display: flex;\n  justify-content: space-between;\n}\n.list-item-button-container {\n  display: flex;\n}\n.icon {\n  margin-left: 5px;\n  /* color: grey; */\n}\n\n.list-item:nth-child(odd) {\n  background: #f9f9f9;\n}\n\n.list-item:hover {\n  background: #ddd;\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-ed0df6dc";
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
  components: { WorkspacePanel: __vue_component__$1 },
};

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("WorkspacePanel")
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
    const interactionSystem = new InteractionSystemAdapter();
    const workspaceSystem = new WorkspaceSystemAdapter();

    const VueJS = this.getDependence('Vue');

    const data = { guid, interactionSystem, eventSystem, workspaceSystem };

    new VueJS.default({
      data: () => data,
      render: h => h(__vue_component__),
    }).$mount(selector);
  }

  beforeDelete() {
    console.log('Deleting extensions...');
  }
}

export { Plugin };
