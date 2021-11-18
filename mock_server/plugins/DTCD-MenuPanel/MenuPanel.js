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

var script = {
  name: 'MenuPanelComponent',
  data() {
    return {
      editMode: false,
    };
  },
  computed: {
    workspaceTitle() {
      const config = this.$root.workspaceSystem.getPluginConfig();
      return config.title;
    },
  },
  methods: {
    addEmptyCell() {
      if (this.editMode) this.$root.workspaceSystem.createEmptyCell();
    },
    goToHomePage() {
      this.$root.workspaceSystem.setDefaultConfiguration();
    },
    toWorkspaceEditMode() {
      this.editMode = !this.editMode;
      this.$root.workspaceSystem.changeMode();
    },
    acceptWorkspaceChanges() {
      this.editMode = false;
      this.$root.workspaceSystem.changeMode();
      this.$root.workspaceSystem.saveConfiguration();
    },
    cancelWorkspaceChanges() {
      this.editMode = false;
      this.$root.workspaceSystem.changeMode();
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
const __vue_script__ = script;

/* template */
var __vue_render__ = function () {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "container" },
    [
      _c("div", { staticClass: "home-group" }, [
        _c(
          "button",
          { staticClass: "btn icon-btn", on: { click: _vm.goToHomePage } },
          [
            _c(
              "svg",
              {
                attrs: {
                  width: "14",
                  height: "17",
                  viewBox: "0 0 14 17",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
              },
              [
                _c("path", {
                  attrs: {
                    d: "M0.577663 6.92251L6.411 1.08917C6.73641 0.763855 7.26391 0.763855 7.58933 1.08917L13.4227 6.92251C13.579 7.07875 13.6668 7.29068 13.6668 7.51167V15.5C13.6668 15.9602 13.2937 16.3333 12.8335 16.3333H8.66683V10.5H5.3335V16.3333H1.16683C0.706592 16.3333 0.333496 15.9602 0.333496 15.5V7.51167C0.333496 7.29068 0.421372 7.07875 0.577663 6.92251Z",
                    fill: "#51515C",
                  },
                }),
              ]
            ),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("vl", { staticClass: "divider" }),
      _vm._v(" "),
      _c("div", { staticClass: "title-group" }, [
        _c("div", { staticClass: "title" }, [
          _vm._v(_vm._s(_vm.workspaceTitle)),
        ]),
      ]),
      _vm._v(" "),
      _c("vl", { staticClass: "divider" }),
      _vm._v(" "),
      _c("div", { staticClass: "panels-group" }, [
        _c(
          "button",
          { staticClass: "btn icon-btn", on: { click: _vm.addEmptyCell } },
          [
            _c(
              "svg",
              {
                attrs: {
                  width: "17",
                  height: "18",
                  viewBox: "0 0 17 18",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                },
              },
              [
                _c("path", {
                  attrs: {
                    d: "M15 6.15484H14.5232C14.5162 6.108 14.502 6.01768 14.4808 5.88387C14.3396 4.90036 13.9546 4.12425 13.326 3.55556C12.6691 2.9601 11.825 2.66237 10.7938 2.66237H10.2323V13.8222C10.2323 14.9462 10.8256 15.5283 12.0122 15.5685V16H4.99837V15.5685C6.185 15.5283 6.77832 14.9462 6.77832 13.8222V2.66237H6.21679C5.18555 2.66237 4.34148 2.9601 3.6846 3.55556C3.05596 4.12425 2.67101 4.90036 2.52975 5.88387C2.51562 5.95747 2.49796 6.04779 2.47677 6.15484H2V2H15V6.15484Z",
                    fill: "#51515C",
                  },
                }),
              ]
            ),
          ]
        ),
        _vm._v(" "),
        _c("button", { staticClass: "btn icon-btn" }, [
          _c(
            "svg",
            {
              attrs: {
                width: "18",
                height: "18",
                viewBox: "0 0 18 18",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
            },
            [
              _c("path", {
                attrs: {
                  "fill-rule": "evenodd",
                  "clip-rule": "evenodd",
                  d: "M14.25 9.75V5.25C14.25 4.8 13.95 4.5 13.5 4.5H12C12 3.225 11.025 2.25 9.75 2.25H8.25C6.975 2.25 6 3.225 6 4.5H4.5C4.05 4.5 3.75 4.8 3.75 5.25V7.875V9.75C2.475 9.75 1.5 10.725 1.5 12V13.5C1.5 14.775 2.475 15.75 3.75 15.75H5.25C6.525 15.75 7.5 14.775 7.5 13.5V12C7.5 10.725 6.525 9.75 5.25 9.75V6H6C6 7.275 6.975 8.25 8.25 8.25H9.75C11.025 8.25 12 7.275 12 6H12.75V9.75C11.475 9.75 10.5 10.725 10.5 12V13.5C10.5 14.775 11.475 15.75 12.75 15.75H14.25C15.525 15.75 16.5 14.775 16.5 13.5V12C16.5 10.725 15.525 9.75 14.25 9.75ZM6 12V13.5C6 13.95 5.7 14.25 5.25 14.25H3.75C3.3 14.25 3 13.95 3 13.5V12C3 11.55 3.3 11.25 3.75 11.25H5.25C5.7 11.25 6 11.55 6 12ZM10.5 6C10.5 6.45 10.2 6.75 9.75 6.75H8.25C7.8 6.75 7.5 6.45 7.5 6V4.5C7.5 4.05 7.8 3.75 8.25 3.75H9.75C10.2 3.75 10.5 4.05 10.5 4.5V6ZM15 13.5C15 13.95 14.7 14.25 14.25 14.25H12.75C12.3 14.25 12 13.95 12 13.5V12C12 11.55 12.3 11.25 12.75 11.25H14.25C14.7 11.25 15 11.55 15 12V13.5Z",
                  fill: "#51515C",
                },
              }),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("button", { staticClass: "btn icon-btn" }, [
          _c(
            "svg",
            {
              attrs: {
                width: "18",
                height: "18",
                viewBox: "0 0 18 18",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
            },
            [
              _c("path", {
                attrs: {
                  d: "M9.75 7.5V10.5H14.25V7.5H9.75ZM8.25 7.5H3.75V10.5H8.25V7.5ZM9.75 14.25H14.25V12H9.75V14.25ZM8.25 14.25V12H3.75V14.25H8.25ZM9.75 3.75V6H14.25V3.75H9.75ZM8.25 3.75H3.75V6H8.25V3.75ZM14.25 2.25C15.0784 2.25 15.75 2.92157 15.75 3.75V14.25C15.75 15.0784 15.0784 15.75 14.25 15.75H3.75C2.92157 15.75 2.25 15.0784 2.25 14.25V3.75C2.25 2.92157 2.92157 2.25 3.75 2.25H14.25Z",
                  fill: "#51515C",
                },
              }),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("button", { staticClass: "btn icon-btn" }, [
          _c(
            "svg",
            {
              attrs: {
                width: "18",
                height: "18",
                viewBox: "0 0 18 18",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
            },
            [
              _c("path", {
                attrs: {
                  d: "M12.7165 14.9319C14.0015 14.1268 14.9903 12.9262 15.5342 11.5108C16.0781 10.0953 16.1477 8.54153 15.7324 7.08314C15.3172 5.62475 14.4396 4.34062 13.2317 3.42393C12.0238 2.50725 10.5509 2.00758 9.03459 2.00009C7.51825 1.99259 6.04048 2.47769 4.82358 3.38239C3.60668 4.28709 2.71646 5.56249 2.28684 7.01671C1.85721 8.47092 1.91142 10.0253 2.44129 11.4461C2.97117 12.8669 3.94807 14.0771 5.22503 14.8949L6.0168 13.6585C5.00767 13.0122 4.23567 12.0558 3.81693 10.933C3.39819 9.81028 3.35535 8.58189 3.69487 7.43268C4.03438 6.28348 4.73789 5.27559 5.69955 4.56064C6.66122 3.84569 7.82904 3.46234 9.02733 3.46826C10.2256 3.47418 11.3896 3.86905 12.3442 4.59347C13.2987 5.31789 13.9922 6.33268 14.3204 7.48519C14.6485 8.63769 14.5935 9.86559 14.1637 10.9842C13.7339 12.1027 12.9525 13.0515 11.937 13.6877L12.7165 14.9319Z",
                  fill: "#51515C",
                },
              }),
              _vm._v(" "),
              _c("path", {
                attrs: {
                  d: "M11.8017 5.10616L8.00002 8.88022L9.0766 9.65414L11.8017 5.10616Z",
                  fill: "#51515C",
                },
              }),
            ]
          ),
        ]),
        _vm._v(" "),
        _c("button", { staticClass: "btn icon-btn" }, [
          _c(
            "svg",
            {
              attrs: {
                width: "18",
                height: "18",
                viewBox: "0 0 18 18",
                fill: "none",
                xmlns: "http://www.w3.org/2000/svg",
              },
            },
            [
              _c("rect", {
                attrs: {
                  x: "6",
                  y: "3",
                  width: "10",
                  height: "2",
                  fill: "#51515C",
                },
              }),
              _vm._v(" "),
              _c("rect", {
                attrs: {
                  x: "2",
                  y: "6",
                  width: "10",
                  height: "2",
                  fill: "#51515C",
                },
              }),
              _vm._v(" "),
              _c("rect", {
                attrs: {
                  x: "2",
                  y: "9",
                  width: "13",
                  height: "2",
                  fill: "#51515C",
                },
              }),
              _vm._v(" "),
              _c("rect", {
                attrs: {
                  x: "7",
                  y: "12",
                  width: "9",
                  height: "2",
                  fill: "#51515C",
                },
              }),
              _vm._v(" "),
              _c("rect", {
                attrs: {
                  x: "8",
                  y: "2",
                  width: "1",
                  height: "14",
                  fill: "#51515C",
                },
              }),
            ]
          ),
        ]),
      ]),
      _vm._v(" "),
      !_vm.editMode
        ? _c(
            "div",
            {
              staticClass: "settings-group",
              on: { click: _vm.toWorkspaceEditMode },
            },
            [
              _c("button", { staticClass: "btn icon-btn" }, [
                _c(
                  "svg",
                  {
                    attrs: {
                      width: "20",
                      height: "20",
                      viewBox: "0 0 20 20",
                      fill: "none",
                      xmlns: "http://www.w3.org/2000/svg",
                    },
                  },
                  [
                    _c("path", {
                      attrs: {
                        d: "M11.5167 18.3333H8.48335C8.09178 18.3333 7.75298 18.0608 7.66918 17.6783L7.33001 16.1083C6.87756 15.9101 6.44853 15.6622 6.05085 15.3692L4.52001 15.8567C4.14668 15.9757 3.74084 15.8186 3.54501 15.4792L2.02501 12.8533C1.83134 12.5138 1.89806 12.0854 2.18585 11.8208L3.37335 10.7375C3.31934 10.2467 3.31934 9.75156 3.37335 9.26082L2.18585 8.17999C1.89764 7.9153 1.83089 7.48642 2.02501 7.14666L3.54168 4.51916C3.7375 4.17974 4.14335 4.0226 4.51668 4.14166L6.04751 4.62916C6.2509 4.47845 6.46262 4.33934 6.68168 4.21249C6.89196 4.0939 7.10838 3.98653 7.33001 3.89082L7.67001 2.32249C7.7534 1.93996 8.09184 1.66707 8.48335 1.66666H11.5167C11.9082 1.66707 12.2466 1.93996 12.33 2.32249L12.6733 3.89166C12.9073 3.99459 13.1352 4.11089 13.3558 4.23999C13.5619 4.35897 13.7611 4.48945 13.9525 4.63082L15.4842 4.14332C15.8573 4.02471 16.2626 4.18179 16.4583 4.52082L17.975 7.14832C18.1687 7.48789 18.102 7.91625 17.8142 8.18082L16.6267 9.26416C16.6807 9.7549 16.6807 10.2501 16.6267 10.7408L17.8142 11.8242C18.102 12.0887 18.1687 12.5171 17.975 12.8567L16.4583 15.4842C16.2626 15.8232 15.8573 15.9803 15.4842 15.8617L13.9525 15.3742C13.7587 15.5169 13.5573 15.649 13.3492 15.77C13.1307 15.8966 12.9054 16.0109 12.6742 16.1125L12.33 17.6783C12.2463 18.0605 11.9079 18.333 11.5167 18.3333ZM9.99668 6.66666C8.15573 6.66666 6.66335 8.15904 6.66335 9.99999C6.66335 11.8409 8.15573 13.3333 9.99668 13.3333C11.8376 13.3333 13.33 11.8409 13.33 9.99999C13.33 8.15904 11.8376 6.66666 9.99668 6.66666Z",
                        fill: "#51515C",
                      },
                    }),
                  ]
                ),
              ]),
            ]
          )
        : _c("div", { staticClass: "settings-group settings-group_change" }, [
            _c(
              "button",
              {
                staticClass: "btn accept-btn",
                on: { click: _vm.acceptWorkspaceChanges },
              },
              [_vm._v("Сохранить")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn cancel-btn",
                on: { click: _vm.cancelWorkspaceChanges },
              },
              [_vm._v("Отменить")]
            ),
          ]),
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-41bf39e2_0", { source: ".btn[data-v-41bf39e2] {\n  border: none;\n  cursor: pointer;\n  background-color: transparent;\n  border-radius: 4.66px;\n}\n.btn[data-v-41bf39e2]:hover {\n  background: rgba(198, 198, 212, 0.2);\n}\n.divider[data-v-41bf39e2] {\n  border-left: 1px solid #C6C6D4;\n  height: 100%;\n}\n.icon-btn[data-v-41bf39e2] {\n  width: 40px;\n  height: 40px;\n}\n.container[data-v-41bf39e2] {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n}\n.container .title-group[data-v-41bf39e2] {\n  display: flex;\n  align-items: center;\n  padding: 0px 20px;\n  height: 40px;\n  font-family: Proxima Nova;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 17px;\n  line-height: 21px;\n  color: #51515C;\n}\n.container .settings-group[data-v-41bf39e2] {\n  margin-left: auto;\n  display: flex;\n  justify-content: flex-end;\n}\n.container .settings-group_change .cancel-btn[data-v-41bf39e2] {\n  color: #51515C;\n  padding: 4px 13px;\n  background: rgba(198, 198, 212, 0.12);\n}\n.container .settings-group_change .accept-btn[data-v-41bf39e2] {\n  color: #4CD964;\n  padding: 4px 13px;\n  background: rgba(76, 217, 100, 0.12);\n  margin-right: 20px;\n}\n\n/*# sourceMappingURL=MenuPanel.vue.map */", map: {"version":3,"sources":["/home/ilya/Desktop/DTCD-MenuPanel-FGK/DTCD-MenuPanel/src/MenuPanel.vue","MenuPanel.vue"],"names":[],"mappings":"AAqKA;EACA,YAAA;EACA,eAAA;EACA,6BAAA;EACA,qBAAA;ACpKA;ADsKA;EACA,oCAAA;ACpKA;ADuKA;EACA,8BAAA;EACA,YAAA;ACpKA;ADsKA;EACA,WAAA;EACA,YAAA;ACnKA;ADqKA;EACA,WAAA;EACA,YAAA;EACA,aAAA;EACA,mBAAA;AClKA;ADuKA;EACA,aAAA;EACA,mBAAA;EACA,iBAAA;EACA,YAAA;EACA,yBAAA;EACA,kBAAA;EACA,iBAAA;EACA,eAAA;EACA,iBAAA;EACA,cAAA;ACrKA;ADwKA;EACA,iBAAA;EACA,aAAA;EACA,yBAAA;ACtKA;ADyKA;EACA,cAAA;EACA,iBAAA;EACA,qCAAA;ACvKA;ADyKA;EACA,cAAA;EACA,iBAAA;EACA,oCAAA;EACA,kBAAA;ACvKA;;AAEA,wCAAwC","file":"MenuPanel.vue","sourcesContent":["<template>\n  <div class=\"container\">\n    <div class=\"home-group\">\n      <button class=\"btn icon-btn\" @click=\"goToHomePage\">\n        <svg\n          width=\"14\"\n          height=\"17\"\n          viewBox=\"0 0 14 17\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M0.577663 6.92251L6.411 1.08917C6.73641 0.763855 7.26391 0.763855 7.58933 1.08917L13.4227 6.92251C13.579 7.07875 13.6668 7.29068 13.6668 7.51167V15.5C13.6668 15.9602 13.2937 16.3333 12.8335 16.3333H8.66683V10.5H5.3335V16.3333H1.16683C0.706592 16.3333 0.333496 15.9602 0.333496 15.5V7.51167C0.333496 7.29068 0.421372 7.07875 0.577663 6.92251Z\"\n            fill=\"#51515C\"\n          />\n        </svg>\n      </button>\n    </div>\n    <vl class=\"divider\" />\n    <div class=\"title-group\">\n      <div class=\"title\">{{ workspaceTitle }}</div>\n    </div>\n    <vl class=\"divider\" />\n    <div class=\"panels-group\">\n      <button class=\"btn icon-btn\" @click=\"addEmptyCell\">\n        <svg\n          width=\"17\"\n          height=\"18\"\n          viewBox=\"0 0 17 18\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M15 6.15484H14.5232C14.5162 6.108 14.502 6.01768 14.4808 5.88387C14.3396 4.90036 13.9546 4.12425 13.326 3.55556C12.6691 2.9601 11.825 2.66237 10.7938 2.66237H10.2323V13.8222C10.2323 14.9462 10.8256 15.5283 12.0122 15.5685V16H4.99837V15.5685C6.185 15.5283 6.77832 14.9462 6.77832 13.8222V2.66237H6.21679C5.18555 2.66237 4.34148 2.9601 3.6846 3.55556C3.05596 4.12425 2.67101 4.90036 2.52975 5.88387C2.51562 5.95747 2.49796 6.04779 2.47677 6.15484H2V2H15V6.15484Z\"\n            fill=\"#51515C\"\n          />\n        </svg>\n      </button>\n      <button class=\"btn icon-btn\">\n        <svg\n          width=\"18\"\n          height=\"18\"\n          viewBox=\"0 0 18 18\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            fill-rule=\"evenodd\"\n            clip-rule=\"evenodd\"\n            d=\"M14.25 9.75V5.25C14.25 4.8 13.95 4.5 13.5 4.5H12C12 3.225 11.025 2.25 9.75 2.25H8.25C6.975 2.25 6 3.225 6 4.5H4.5C4.05 4.5 3.75 4.8 3.75 5.25V7.875V9.75C2.475 9.75 1.5 10.725 1.5 12V13.5C1.5 14.775 2.475 15.75 3.75 15.75H5.25C6.525 15.75 7.5 14.775 7.5 13.5V12C7.5 10.725 6.525 9.75 5.25 9.75V6H6C6 7.275 6.975 8.25 8.25 8.25H9.75C11.025 8.25 12 7.275 12 6H12.75V9.75C11.475 9.75 10.5 10.725 10.5 12V13.5C10.5 14.775 11.475 15.75 12.75 15.75H14.25C15.525 15.75 16.5 14.775 16.5 13.5V12C16.5 10.725 15.525 9.75 14.25 9.75ZM6 12V13.5C6 13.95 5.7 14.25 5.25 14.25H3.75C3.3 14.25 3 13.95 3 13.5V12C3 11.55 3.3 11.25 3.75 11.25H5.25C5.7 11.25 6 11.55 6 12ZM10.5 6C10.5 6.45 10.2 6.75 9.75 6.75H8.25C7.8 6.75 7.5 6.45 7.5 6V4.5C7.5 4.05 7.8 3.75 8.25 3.75H9.75C10.2 3.75 10.5 4.05 10.5 4.5V6ZM15 13.5C15 13.95 14.7 14.25 14.25 14.25H12.75C12.3 14.25 12 13.95 12 13.5V12C12 11.55 12.3 11.25 12.75 11.25H14.25C14.7 11.25 15 11.55 15 12V13.5Z\"\n            fill=\"#51515C\"\n          />\n        </svg>\n      </button>\n      <button class=\"btn icon-btn\">\n        <svg\n          width=\"18\"\n          height=\"18\"\n          viewBox=\"0 0 18 18\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M9.75 7.5V10.5H14.25V7.5H9.75ZM8.25 7.5H3.75V10.5H8.25V7.5ZM9.75 14.25H14.25V12H9.75V14.25ZM8.25 14.25V12H3.75V14.25H8.25ZM9.75 3.75V6H14.25V3.75H9.75ZM8.25 3.75H3.75V6H8.25V3.75ZM14.25 2.25C15.0784 2.25 15.75 2.92157 15.75 3.75V14.25C15.75 15.0784 15.0784 15.75 14.25 15.75H3.75C2.92157 15.75 2.25 15.0784 2.25 14.25V3.75C2.25 2.92157 2.92157 2.25 3.75 2.25H14.25Z\"\n            fill=\"#51515C\"\n          />\n        </svg>\n      </button>\n      <button class=\"btn icon-btn\">\n        <svg\n          width=\"18\"\n          height=\"18\"\n          viewBox=\"0 0 18 18\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M12.7165 14.9319C14.0015 14.1268 14.9903 12.9262 15.5342 11.5108C16.0781 10.0953 16.1477 8.54153 15.7324 7.08314C15.3172 5.62475 14.4396 4.34062 13.2317 3.42393C12.0238 2.50725 10.5509 2.00758 9.03459 2.00009C7.51825 1.99259 6.04048 2.47769 4.82358 3.38239C3.60668 4.28709 2.71646 5.56249 2.28684 7.01671C1.85721 8.47092 1.91142 10.0253 2.44129 11.4461C2.97117 12.8669 3.94807 14.0771 5.22503 14.8949L6.0168 13.6585C5.00767 13.0122 4.23567 12.0558 3.81693 10.933C3.39819 9.81028 3.35535 8.58189 3.69487 7.43268C4.03438 6.28348 4.73789 5.27559 5.69955 4.56064C6.66122 3.84569 7.82904 3.46234 9.02733 3.46826C10.2256 3.47418 11.3896 3.86905 12.3442 4.59347C13.2987 5.31789 13.9922 6.33268 14.3204 7.48519C14.6485 8.63769 14.5935 9.86559 14.1637 10.9842C13.7339 12.1027 12.9525 13.0515 11.937 13.6877L12.7165 14.9319Z\"\n            fill=\"#51515C\"\n          />\n          <path\n            d=\"M11.8017 5.10616L8.00002 8.88022L9.0766 9.65414L11.8017 5.10616Z\"\n            fill=\"#51515C\"\n          />\n        </svg>\n      </button>\n      <button class=\"btn icon-btn\">\n        <svg\n          width=\"18\"\n          height=\"18\"\n          viewBox=\"0 0 18 18\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <rect x=\"6\" y=\"3\" width=\"10\" height=\"2\" fill=\"#51515C\" />\n          <rect x=\"2\" y=\"6\" width=\"10\" height=\"2\" fill=\"#51515C\" />\n          <rect x=\"2\" y=\"9\" width=\"13\" height=\"2\" fill=\"#51515C\" />\n          <rect x=\"7\" y=\"12\" width=\"9\" height=\"2\" fill=\"#51515C\" />\n          <rect x=\"8\" y=\"2\" width=\"1\" height=\"14\" fill=\"#51515C\" />\n        </svg>\n      </button>\n    </div>\n    <div v-if=\"!editMode\" @click=\"toWorkspaceEditMode\" class=\"settings-group\">\n      <button class=\"btn icon-btn\">\n        <svg\n          width=\"20\"\n          height=\"20\"\n          viewBox=\"0 0 20 20\"\n          fill=\"none\"\n          xmlns=\"http://www.w3.org/2000/svg\"\n        >\n          <path\n            d=\"M11.5167 18.3333H8.48335C8.09178 18.3333 7.75298 18.0608 7.66918 17.6783L7.33001 16.1083C6.87756 15.9101 6.44853 15.6622 6.05085 15.3692L4.52001 15.8567C4.14668 15.9757 3.74084 15.8186 3.54501 15.4792L2.02501 12.8533C1.83134 12.5138 1.89806 12.0854 2.18585 11.8208L3.37335 10.7375C3.31934 10.2467 3.31934 9.75156 3.37335 9.26082L2.18585 8.17999C1.89764 7.9153 1.83089 7.48642 2.02501 7.14666L3.54168 4.51916C3.7375 4.17974 4.14335 4.0226 4.51668 4.14166L6.04751 4.62916C6.2509 4.47845 6.46262 4.33934 6.68168 4.21249C6.89196 4.0939 7.10838 3.98653 7.33001 3.89082L7.67001 2.32249C7.7534 1.93996 8.09184 1.66707 8.48335 1.66666H11.5167C11.9082 1.66707 12.2466 1.93996 12.33 2.32249L12.6733 3.89166C12.9073 3.99459 13.1352 4.11089 13.3558 4.23999C13.5619 4.35897 13.7611 4.48945 13.9525 4.63082L15.4842 4.14332C15.8573 4.02471 16.2626 4.18179 16.4583 4.52082L17.975 7.14832C18.1687 7.48789 18.102 7.91625 17.8142 8.18082L16.6267 9.26416C16.6807 9.7549 16.6807 10.2501 16.6267 10.7408L17.8142 11.8242C18.102 12.0887 18.1687 12.5171 17.975 12.8567L16.4583 15.4842C16.2626 15.8232 15.8573 15.9803 15.4842 15.8617L13.9525 15.3742C13.7587 15.5169 13.5573 15.649 13.3492 15.77C13.1307 15.8966 12.9054 16.0109 12.6742 16.1125L12.33 17.6783C12.2463 18.0605 11.9079 18.333 11.5167 18.3333ZM9.99668 6.66666C8.15573 6.66666 6.66335 8.15904 6.66335 9.99999C6.66335 11.8409 8.15573 13.3333 9.99668 13.3333C11.8376 13.3333 13.33 11.8409 13.33 9.99999C13.33 8.15904 11.8376 6.66666 9.99668 6.66666Z\"\n            fill=\"#51515C\"\n          />\n        </svg>\n      </button>\n    </div>\n    <div v-else class=\"settings-group settings-group_change\">\n      <button class=\"btn accept-btn\" @click=\"acceptWorkspaceChanges\">Сохранить</button>\n      <button class=\"btn cancel-btn\" @click=\"cancelWorkspaceChanges\">Отменить</button>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  name: 'MenuPanelComponent',\n  data() {\n    return {\n      editMode: false,\n    };\n  },\n  computed: {\n    workspaceTitle() {\n      const config = this.$root.workspaceSystem.getPluginConfig();\n      return config.title;\n    },\n  },\n  methods: {\n    addEmptyCell() {\n      if (this.editMode) this.$root.workspaceSystem.createEmptyCell();\n    },\n    goToHomePage() {\n      this.$root.workspaceSystem.setDefaultConfiguration();\n    },\n    toWorkspaceEditMode() {\n      this.editMode = !this.editMode;\n      this.$root.workspaceSystem.changeMode();\n    },\n    acceptWorkspaceChanges() {\n      this.editMode = false;\n      this.$root.workspaceSystem.changeMode();\n      this.$root.workspaceSystem.saveConfiguration();\n    },\n    cancelWorkspaceChanges() {\n      this.editMode = false;\n      this.$root.workspaceSystem.changeMode();\n    },\n  },\n};\n</script>\n\n<style lang=\"sass\" scoped>\n\n.btn\n  border: none\n  cursor: pointer\n  background-color: transparent\n  border-radius: 4.66px\n\n  &:hover\n    background: rgba(198, 198, 212, 0.2)\n\n\n.divider\n  border-left: 1px solid #C6C6D4\n  height: 100%\n\n.icon-btn\n  width: 40px\n  height: 40px\n\n.container\n  width: 100%\n  height: 100%\n  display: flex\n  align-items: center\n\n  .home-group\n    // border-right: 1px solid #C6C6D4\n\n  .title-group\n    display: flex\n    align-items: center\n    padding: 0px 20px\n    height: 40px\n    font-family: Proxima Nova\n    font-style: normal\n    font-weight: bold\n    font-size: 17px\n    line-height: 21px\n    color: #51515C\n    // border-right: 1px solid #C6C6D4\n\n  .settings-group\n    margin-left: auto\n    display: flex\n    justify-content: flex-end\n\n  .settings-group_change\n    .cancel-btn\n      color: #51515C\n      padding: 4px 13px\n      background: rgba(198, 198, 212, 0.12)\n\n    .accept-btn\n      color: #4CD964\n      padding: 4px 13px\n      background: rgba(76, 217, 100, 0.12)\n      margin-right:20px\n</style>\n",".btn {\n  border: none;\n  cursor: pointer;\n  background-color: transparent;\n  border-radius: 4.66px;\n}\n.btn:hover {\n  background: rgba(198, 198, 212, 0.2);\n}\n\n.divider {\n  border-left: 1px solid #C6C6D4;\n  height: 100%;\n}\n\n.icon-btn {\n  width: 40px;\n  height: 40px;\n}\n\n.container {\n  width: 100%;\n  height: 100%;\n  display: flex;\n  align-items: center;\n}\n.container .title-group {\n  display: flex;\n  align-items: center;\n  padding: 0px 20px;\n  height: 40px;\n  font-family: Proxima Nova;\n  font-style: normal;\n  font-weight: bold;\n  font-size: 17px;\n  line-height: 21px;\n  color: #51515C;\n}\n.container .settings-group {\n  margin-left: auto;\n  display: flex;\n  justify-content: flex-end;\n}\n.container .settings-group_change .cancel-btn {\n  color: #51515C;\n  padding: 4px 13px;\n  background: rgba(198, 198, 212, 0.12);\n}\n.container .settings-group_change .accept-btn {\n  color: #4CD964;\n  padding: 4px 13px;\n  background: rgba(76, 217, 100, 0.12);\n  margin-right: 20px;\n}\n\n/*# sourceMappingURL=MenuPanel.vue.map */"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-41bf39e2";
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
   * Setting new workspace state from config
   * @method
   * @returns {Boolean} true, if everything is ok
   */
  setPluginConfig(conf) {
    return this.instance.setPluginConfig(conf);
  }

  /**
   * Getting current workspace state
   * @method
   * @returns {*} workspace state
   */
  getPluginConfig() {
    return this.instance.getPluginConfig();
  }

  /**
   * Delete workspace configuration with the given id
   * @method
   * @param {number} id identifier of configuration
   * @returns {Boolean} true, if everything is ok
   */
  async deleteConfiguration(id) {
    return await this.instance.deleteConfiguration(id);
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
    return await this.instance.changeConfigurationTitle(id, newTitle);
  }

  /**
   * Creates empty workspace configuration
   * @method
   * @param {string} configurationTitle title to set to new configuration
   */
  async createEmptyConfiguration(configurationTitle) {
    return await this.instance.createEmptyConfiguration(configurationTitle);
  }

  /**
   * Saves current workspace configuration
   * @method
   */
  async saveConfiguration() {
    return await this.instance.saveConfiguration();
  }

  /**
   * Sets new workspace configuration with given id
   * @method
   * @param {number} id identifier of configuration
   */
  setConfiguration(id) {
    return this.instance.setConfiguration(id);
  }

  /**
   * Sets defaults configuration of workspace
   * @method
   */
  setDefaultConfiguration() {
    return this.instance.setDefaultConfiguration();
  }

  /**
   * Compacts panels to top left corner of screen
   * @method
   */
  compactAllPanels() {
    return this.instance.compactAllPanels();
  }

  /**
   * Changes current workspace mode
   * @method
   */
  changeMode() {
    return this.instance.changeMode();
  }

  /**
   * Creates empty cell widget on workspace
   * @method
   */
  createEmptyCell(...args) {
    return this.instance.createEmptyCell(...args);
  }

  /**
   * Settting new column count
   * @method
   * @param {Number} newColumn new count of column in grid
   */
  setColumn(newColumn) {
    return this.instance.setColumn(newColumn);
  }

  /**
   * Deleting cell of workspace
   * @method
   * @param {String} cellID id of cell in grid
   */
  deleteCell(cellID) {
    return this.instance.deleteCell(cellID);
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

class MenuPanel extends PanelPlugin {
  static getRegistrationMeta() {
    return {
      type: 'panel',
      name: 'MenuPanel',
      title: 'Панель меню',
      version: '0.1.0',
      withDependencies: true,
    };
  }

  constructor(guid, selector) {
    super();

    const eventSystem = new EventSystemAdapter(guid);
    const styleSystem = new StyleSystemAdapter();
    const workspaceSystem = new WorkspaceSystemAdapter();

    const VueJS = this.getDependence('Vue').default;
    new VueJS({
      data: () => {
        return {
          guid,
          eventSystem,
          styleSystem,
          workspaceSystem,
          plugin: this,
        };
      },
      render: h => h(__vue_component__),
    }).$mount(selector);
  }
}

export { MenuPanel };
