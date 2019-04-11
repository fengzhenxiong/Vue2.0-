/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(7)

var Component = __webpack_require__(5)(
  /* script */
  __webpack_require__(2),
  /* template */
  __webpack_require__(6),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\work\\MY-PROJECT\\DW.News.App.Screen\\dist\\js\\guangxidaily\\component\\classifiedNews.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] classifiedNews.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-486a45f4", Component.options)
  } else {
    hotAPI.reload("data-v-486a45f4", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _classifiedNews = __webpack_require__(0);

var _classifiedNews2 = _interopRequireDefault(_classifiedNews);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vm = new Vue({
    el: "#newsbox",
    data: {
        dataone: [],
        num: 0
    },
    components: {
        news: _classifiedNews2.default
    },
    computed: {},
    methods: {
        //由于获取到的数据不能保证是20个，但是必须要20个方块，所以只能把结构写死
        politicalNews: function politicalNews(_param) {
            var self = this;
            tools.requestNewdata(this, _param, function (data) {
                self.dataone = JSON.parse(data.list);
                self.dataone.forEach(function (element) {});
            }, function () {
                console.log("获取热词失败！");
            }, "/api/thirdclientapi.ashx");
        },
        getdata: function getdata(num) {
            if (num == 0) {
                this.num = 0;
                $(".btnlist li").removeClass("active").eq(num).addClass("active");
                this.politicalNews({
                    whatDo: "GetTRSdashid_threeNewsList",
                    gadid: "ffe70fa1-4d958113-0c5d-03c1-e4b0183f"
                });
            } else if (num == 1) {
                this.num = 1;
                $(".btnlist li").removeClass("active").eq(num).addClass("active");
                this.politicalNews({
                    whatDo: "GetTRSdashid_threeNewsList",
                    gadid: "ffe70fc6-4d958118-0c5d-03c1-e4b0183f"
                });
            } else if (num == 2) {
                this.num = 2;
                $(".btnlist li").removeClass("active").eq(num).addClass("active");
                this.politicalNews({
                    whatDo: "GetTRSdashid_threeNewsList",
                    gadid: "ffe70ff6-4d95811a-0c5d-03c1-e4b0183f"
                });
            } else if (num == 3) {
                this.num = 3;
                $(".btnlist li").removeClass("active").eq(num).addClass("active");
                this.politicalNews({
                    whatDo: "GetTRSdashid_threeNewsList",
                    gadid: "ffe71038-4d958122-0c5d-03c1-e4b0183f"
                });
            } else if (num == 4) {
                this.num = 4;
                $(".btnlist li").removeClass("active").eq(num).addClass("active");
                this.politicalNews({
                    whatDo: "GetTRSdashid_threeNewsList",
                    gadid: "ffe7106c-4d958124-0c5d-03c1-e4b0183f"
                });
            }
        }
    },
    mounted: function mounted() {
        var self = this;
        this.getdata(this.num);
        this.timer = setInterval(function () {
            self.num++;
            if (self.num == 5) {
                self.num = 0;
            }
            self.getdata(self.num);
        }, 15000);
        //半小时刷新一次页面   
        var refreshTime = 30 * 60 * 1000; //每个半个小时刷新一次页面  
        refresh();
        function refresh(time) {
            setTimeout(function () {
                if (navigator.onLine) {
                    //判断是否有网
                    window.location.reload();
                } else {
                    if (!$("body").find(".fn-s-offline").length) {
                        $("body").append("<div class='fn-s-offline'>请检查网络设置！</div>");
                    }
                    refresh(5 * 60000);
                }
            }, time ? time : refreshTime);
        }
    },
    destroyed: function destroyed() {
        clearInterval(this.timer);
    }
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
     value: true
});
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

exports.default = {
     props: ["list"],
     data: function data() {
          return {
               data0: "",
               data1: "",
               data2: "",
               data3: "",
               data4: "",
               data5: "",
               data6: "",
               data7: "",
               data8: "",
               data9: "",
               data10: "",
               data11: "",
               data12: "",
               data13: "",
               data14: "",
               data15: "",
               data16: "",
               data17: "",
               data18: "",
               data19: ""
          };
     },

     methods: {
          handfont: function handfont(str) {
               if (str != undefined) {
                    var test = str.replace(/<\/?font[^>]*>/gi, "");
                    var test2 = test.replace(/[ ]|[&nbsp;]/g, '');
                    var test3 = test2.replace(/[ ]|[quot;]/g, '');
                    return test3;
               }
          }
     },
     watch: {
          'list': function list(n, o) {
               this.data0 = [];
               this.data1 = [];
               this.data2 = [];
               this.data3 = [];
               this.data4 = [];
               this.data5 = [];
               this.data6 = [];
               this.data7 = [];
               this.data8 = [];
               this.data9 = [];
               this.data10 = [];
               this.data11 = [];
               this.data12 = [];
               this.data13 = [];
               this.data14 = [];
               this.data15 = [];
               this.data16 = [];
               this.data17 = [];
               this.data18 = [];
               this.data19 = [];

               this.data0 = n[0];
               this.data1 = n[1];
               this.data2 = n[2];
               this.data3 = n[3];
               this.data4 = n[4];

               if (n[5] != undefined) {
                    this.data5 = n[5];
               }
               if (n[6] != undefined) {
                    this.data6 = n[6];
               }
               if (n[7] != undefined) {
                    this.data7 = n[7];
               }
               if (n[8] != undefined) {
                    this.data8 = n[8];
               }
               if (n[9] != undefined) {
                    this.data9 = n[9];
               }
               if (n[10] != undefined) {
                    this.data10 = n[10];
               }
               if (n[11] != undefined) {
                    this.data11 = n[11];
               }
               if (n[12] != undefined) {
                    this.data12 = n[12];
               }
               if (n[13] != undefined) {
                    this.data13 = n[13];
               }
               if (n[14] != undefined) {
                    this.data14 = n[14];
               }
               if (n[15] != undefined) {
                    this.data15 = n[15];
               }
               if (n[16] != undefined) {
                    this.data16 = n[16];
               }
               if (n[17] != undefined) {
                    this.data17 = n[17];
               }
               if (n[18] != undefined) {
                    this.data18 = n[18];
               }
               if (n[19] != undefined) {
                    this.data19 = n[19];
               }
               // if(n[11]!=undefined || n[12]!=undefined || n[13]!=undefined || n[14]!=undefined || n[15]!=undefined || n[16]!=undefined || n[17]!=undefined || n[18]!=undefined || n[19]!=undefined){
               //     this.data11 = n[11];
               //     this.data12 = n[12];
               //     this.data13 = n[13];
               //     this.data14 = n[14];
               //     this.data15 = n[15];
               //     this.data16 = n[16];
               //     this.data17 = n[17];
               //     this.data18 = n[18]; 
               //     this.data19 = n[19];  
               // }
          }
     }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(4)();
// imports


// module
exports.push([module.i, "\n.innerbox {\n  width: 100%;\n  height: 100%;\n}\n.infotop {\n  width: 100%;\n  height: 4.3rem;\n  margin-bottom: 0.1rem;\n}\n.tlist {\n  width: 100%;\n  height: 100%;\n}\n.tlist li {\n  width: 4.4rem;\n  height: 4.3rem;\n  float: left;\n  margin-right: 0.1rem;\n  color: white;\n  font-family: PingFang-SC-Bold;\n  overflow: hidden;\n}\n.tlist li:nth-of-type(1) .tlone-left {\n  width: 2.15rem;\n  height: 100%;\n  margin-right: 0.1rem;\n  float: left;\n  font-size: 0.24rem;\n  line-height: 0.36rem;\n}\n.tlone-left-top {\n  width: 1.91rem;\n  height: 1.9rem;\n  margin-bottom: 0.1rem;\n  background: #125ccb;\n  padding: 0.2rem 0.12rem 0 0.12rem;\n}\n.tlone-left-top span, .tlone-left-bottom span {\n  width: 100%;\n  display: inline-block;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 4;\n  overflow: hidden;\n}\n.tlone-left-bottom {\n  width: 1.91rem;\n  height: 1.9rem;\n  background: #17a2b7;\n  padding: 0.2rem 0.12rem 0 0.12rem;\n}\n.tlist li:nth-of-type(1) .tlone-right {\n  width: 1.67rem;\n  height: 4.1rem;\n  background: #3c90f3;\n  float: left;\n  font-size: 0.28rem;\n  line-height: 0.42rem;\n  padding: 0.2rem 0.24rem 0 0.24rem;\n}\n.tlone-right span {\n  width: 100%;\n  display: inline-block;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 9;\n  overflow: hidden;\n}\n.tlist li:nth-of-type(2) {\n  background: #c6395f;\n}\n.tlist li:nth-of-type(2) span {\n  display: inline-block;\n  font-size: 0.4rem;\n  line-height: 0.6rem;\n  padding: 0.2rem 0.21rem 0 0.21rem;\n  width: 3.98rem;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 6;\n  overflow: hidden;\n}\n.tlist li:nth-of-type(3) .tlthree-left {\n  width: 2.15rem;\n  height: 100%;\n  margin-right: 0.1rem;\n  float: left;\n  font-size: 0.24rem;\n  line-height: 0.36rem;\n}\n.tlthree-left-top {\n  width: 1.91rem;\n  height: 1.9rem;\n  margin-bottom: 0.1rem;\n  background: #17a2b7;\n  padding: 0.2rem 0.12rem 0 0.12rem;\n}\n.tlthree-left-bottom {\n  width: 1.91rem;\n  height: 1.9rem;\n  background: #c6395f;\n  padding: 0.2rem 0.12rem 0 0.12rem;\n}\n.tlthree-left-bottom span, .tlthree-left-top span {\n  width: 100%;\n  display: inline-block;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 4;\n  overflow: hidden;\n}\n.tlist li:nth-of-type(3) .tlthree-right {\n  width: 1.73rem;\n  height: 4.1rem;\n  background: #125ccb;\n  float: left;\n  padding: 0.2rem 0.24rem 0 0.18rem;\n  font-size: 0.28rem;\n  line-height: 0.42rem;\n}\n.tlthree-right span {\n  width: 100%;\n  display: inline-block;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 9;\n  overflow: hidden;\n}\n.tlist li:nth-of-type(4) .tlfour-top {\n  width: 3.91rem;\n  height: 1.9rem;\n  margin-bottom: 0.1rem;\n  background: #3c90f3;\n  padding: 0.2rem 0.24rem 0 0.25rem;\n  font-size: 0.28rem;\n  line-height: 0.42rem;\n}\n.tlfour-top span {\n  width: 100%;\n  display: inline-block;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 4;\n  overflow: hidden;\n}\n.tlist li:nth-of-type(4) .tlfour-bottom {\n  width: 4.4rem;\n  height: 2.1rem;\n  font-size: 0.24rem;\n  line-height: 0.36rem;\n}\n.tlfour-bottom-left {\n  width: 1.91rem;\n  height: 1.9rem;\n  margin-right: 0.1rem;\n  background: #125ccb;\n  float: left;\n  padding: 0.2rem 0.12rem 0 0.12rem;\n}\n.tlfour-bottom-right {\n  width: 1.91rem;\n  height: 1.9rem;\n  background: #17a2b7;\n  float: left;\n  padding: 0.2rem 0.12rem 0 0.12rem;\n}\n.tlfour-bottom-right span, .tlfour-bottom-left span {\n  width: 100%;\n  display: inline-block;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 4;\n  overflow: hidden;\n}\n.infobottom {\n  width: 100%;\n  height: 4.4rem;\n}\n.blist {\n  width: 100%;\n  height: 100%;\n}\n.blist li {\n  width: 4.4rem;\n  height: 4.4rem;\n  float: left;\n  margin-right: 0.1rem;\n  color: white;\n  font-family: PingFang-SC-Bold;\n  overflow: hidden;\n}\n.blist li:nth-of-type(1) {\n  background: #3c90f3;\n}\n.blist li:nth-of-type(1) span {\n  display: inline-block;\n  padding: 0.2rem 0.21rem 0 0.21rem;\n  font-size: 0.4rem;\n  line-height: 0.6rem;\n  width: 3.98rem;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 6;\n  overflow: hidden;\n}\n.blist li:nth-of-type(2) .bltwo-top {\n  width: 4.4rem;\n  height: 2.1rem;\n  margin-bottom: 0.1rem;\n  font-size: 0.24rem;\n  line-height: 0.36rem;\n}\n.bltwo-top-left {\n  width: 1.91rem;\n  height: 1.9rem;\n  background: #17a2b7;\n  float: left;\n  margin-right: 0.1rem;\n  padding: 0.2rem 0.12rem 0 0.12rem;\n}\n.bltwo-top-right {\n  width: 1.91rem;\n  height: 1.9rem;\n  background: #3c90f3;\n  float: left;\n  padding: 0.2rem 0.12rem 0 0.12rem;\n}\n.blist li:nth-of-type(2) .bltwo-bottom {\n  width: 4.4rem;\n  height: 2.2rem;\n  font-size: 0.24rem;\n  line-height: 0.36rem;\n}\n.bltwo-bottom-left {\n  width: 1.91rem;\n  height: 2rem;\n  background: #125ccb;\n  float: left;\n  margin-right: 0.1rem;\n  padding: 0.2rem 0.12rem 0 0.12rem;\n}\n.bltwo-bottom-right {\n  width: 1.91rem;\n  height: 2rem;\n  background: #c6395f;\n  float: left;\n  padding: 0.2rem 0.12rem 0 0.12rem;\n}\n.bltwo-top-left span, .bltwo-top-right span, .bltwo-bottom-left span, .bltwo-bottom-right span {\n  width: 100%;\n  display: inline-block;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 4;\n  overflow: hidden;\n}\n.blist li:nth-of-type(3) .blthree-top {\n  width: 4.4rem;\n  height: 2.1rem;\n  margin-bottom: 0.1rem;\n  font-size: 0.24rem;\n  line-height: 0.36rem;\n}\n.blthree-top-left {\n  background: #17a2b7;\n  float: left;\n  margin-right: 0.1rem;\n  padding: 0.2rem 0.12rem 0 0.12rem;\n}\n.blthree-top-right {\n  background: #c6395f;\n  float: left;\n  padding: 0.2rem 0.12rem 0 0.12rem;\n}\n.blist li:nth-of-type(3) .blthree-bottom {\n  width: 3.92rem;\n  height: 2rem;\n  background: #125ccb;\n  font-size: 0.28rem;\n  line-height: 0.42rem;\n  padding: 0.2rem 0.24rem 0 0.24rem;\n}\n.blthree-top-left, .blthree-top-right {\n  width: 1.91rem;\n  height: 1.9rem;\n}\n.blthree-bottom span {\n  width: 100%;\n  display: inline-block;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 4;\n  overflow: hidden;\n}\n.blthree-top-left span, .blthree-top-right span {\n  width: 100%;\n  display: inline-block;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 4;\n  overflow: hidden;\n}\n.blfour-left {\n  width: 1.67rem;\n  height: 4.2rem;\n  background: #c6395f;\n  float: left;\n  font-size: 0.28rem;\n  line-height: 0.42rem;\n  margin-right: 0.1rem;\n  padding: 0.2rem 0.24rem 0 0.24rem;\n}\n.blfour-right {\n  width: 1.67rem;\n  height: 4.2rem;\n  font-size: 0.28rem;\n  line-height: 0.42rem;\n  background: #3c90f3;\n  float: left;\n  padding: 0.2rem 0.24rem 0 0.24rem;\n}\n.blfour-left span, .blfour-right span {\n  width: 100%;\n  display: inline-block;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n  -webkit-line-clamp: 9;\n  overflow: hidden;\n}\n", ""]);

// exports


/***/ }),
/* 4 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "innerbox"
  }, [_c('div', {
    staticClass: "infotop"
  }, [_c('ul', {
    staticClass: "tlist"
  }, [_c('li', [_c('div', {
    staticClass: "tlone-left"
  }, [_c('div', {
    staticClass: "tlone-left-top"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data8.urltitle))
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "tlone-left-bottom"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data9.urltitle))
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "tlone-right"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data2.urltitle))
    }
  })])]), _vm._v(" "), _c('li', [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data0.urltitle))
    }
  })]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "tlthree-left"
  }, [_c('div', {
    staticClass: "tlthree-left-top"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data10.urltitle))
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "tlthree-left-bottom"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data11.urltitle))
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "tlthree-right"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data3.urltitle))
    }
  })])]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "tlfour-top"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data4.urltitle))
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "tlfour-bottom"
  }, [_c('div', {
    staticClass: "tlfour-bottom-left"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data12.urltitle))
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "tlfour-bottom-right"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data13.urltitle))
    }
  })])])])])]), _vm._v(" "), _c('div', {
    staticClass: "infobottom"
  }, [_c('ul', {
    staticClass: "blist"
  }, [_c('li', [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data1.urltitle))
    }
  })]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "bltwo-top"
  }, [_c('div', {
    staticClass: "bltwo-top-left"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data14.urltitle))
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "bltwo-top-right"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data15.urltitle))
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "bltwo-bottom"
  }, [_c('div', {
    staticClass: "bltwo-bottom-left"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data16.urltitle))
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "bltwo-bottom-right"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data17.urltitle))
    }
  })])])]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "blthree-top"
  }, [_c('div', {
    staticClass: "blthree-top-left"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data18.urltitle))
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "blthree-top-right"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data19.urltitle))
    }
  })])]), _vm._v(" "), _c('div', {
    staticClass: "blthree-bottom"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data5.urltitle))
    }
  })])]), _vm._v(" "), _c('li', [_c('div', {
    staticClass: "blfour-left"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data6.urltitle))
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "blfour-right"
  }, [_c('span', {
    domProps: {
      "innerHTML": _vm._s(_vm.handfont(_vm.data7.urltitle))
    }
  })])])])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-486a45f4", module.exports)
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(3);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(8)("31473bd4", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.25.0@css-loader/index.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-486a45f4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_sass-loader@5.0.1@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./classifiedNews.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.25.0@css-loader/index.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-486a45f4\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_sass-loader@5.0.1@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./classifiedNews.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(9)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);