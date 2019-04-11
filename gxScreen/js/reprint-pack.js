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
/******/ 	return __webpack_require__(__webpack_require__.s = 90);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
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

/***/ 1:
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

/***/ 122:
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

exports.default = {
    name: "detail",
    props: ['detail'],
    data: function data() {
        return {};
    }
};

/***/ }),

/***/ 124:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toolsvue = __webpack_require__(85);

var _toolsvue2 = _interopRequireDefault(_toolsvue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    name: "treetimeline",
    props: ['interval', 'inverse', 'url', 'num'],
    data: function data() {
        return {
            id: "fn-s-treetimeline" + Math.round(Math.random() * 1e6),
            curindex: 0,
            timer: null, // 滚动的定时器
            newslist: [],
            $out: null,
            onescreenh: 0,
            $nodes: null,
            totalh: 0,
            $nodesli: null,
            nodeslen: 0,
            onefacth: 0,
            perh: 0,
            maxtop: 0,
            topStyle: {
                top: 0
            },
            load: true,
            error: false
        };
    },

    computed: {
        totallen: function totallen() {
            return this.newslist.length;
        },
        inter: function inter() {
            return this.interval ? this.interval : 5000;
        },
        reverse: function reverse() {
            return this.inverse ? true : false;
        }
    },
    mounted: function mounted() {
        var self = this;
        if (this.reverse) {
            this.topStyle.top = "auto";
            this.topStyle.bottom = "0px";
        }
        this.getdata();
        setTimeout(function () {
            if (self.newslist.length > 0) {
                self.init();
            }
        }, 1000);
    },

    methods: {
		getDate: function (day) {
			function doHandleMonth(month) {
				var m = month;
				if (month.toString().length == 1) {
					m = "0" + month;
				}
				return m;
			}

			var today = new Date();
			var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
			today.setTime(targetday_milliseconds);
			var tYear = today.getFullYear();
			var tMonth = today.getMonth();
			var tDate = today.getDate() + '';
			tMonth = doHandleMonth(tMonth + 1) + '';
			tDate = doHandleMonth(tDate) + '';
			return tYear + tMonth + tDate;
		},
        isImageLoad: function isImageLoad(src) {
            if(src == ''){
                src =  '../image/default.png'
            }
            var img = new Image();
            img.src = src;
            img.onload = function(){

            };
            img.error = function() {
                src =   '../image/default.png'
            };
            return src;
        },
        getdata: function getdata() {
            var self = this;
            var params = {
                pageNum: 0,
                sortOrder: 'DESC',
                sortField: 'ceiIndex',
                categories: this.num,
				//startTime: this.getDate(-7),
				//endTime: this.getDate(0),
				//mediaAreaCode: '001014'
            };
            $.ajax({
                type : 'get',
                url : '/datas/api/cas/transmission/searchList',
                data : params,
                async : false,
                success : function(response){
                    var data = response.data.content;
                    if (data.length > 0) {
                        self.load = false;
                        self.newslist = [];
                        var rows = data,
                            len = rows.length;
                        for (var i = 0; i < len; i++) {
                            var ri = rows[i];
                            var obj = {
                                id: ri.sid,
                                title: ri.title,
                                papername: ri.mediaUnitName,
                                stime: ri.pubTime.substr(8,2) + ':' + ri.pubTime.substr(10,2),
                                time: ri.pubTime.substr(4,2) + '-' + ri.pubTime.substr(6,2) + ' ' + ri.pubTime.substr(8,2) + ':' + ri.pubTime.substr(10,2),
                                img: self.isImageLoad(ri.pictures.split(';')[0])
                            };
                            self.newslist.push(obj);
                        }
                        // 是否有回调函数
                        self.$emit("callback", 0, self.newslist[0]);
                        self.$nextTick(function () {
                            self.init();
                        });
                    }
                }
            });
            // var self = this,
            //     url = this.url,
            //     params = this.params ? this.params : {};
            // if (!url) {
            //     return false;
            // }
            // _toolsvue2.default.requestNewdata(this, params, function (data) {
            //
            //     self.load = false;
            //     self.newslist = [];
            //     var rows = data.rows,
            //         len = rows.length;
            //     for (var i = 0; i < len; i++) {
            //         var ri = rows[i];
            //         var obj = {
            //             id: ri.articlesequenceid,
            //             title: ri.title,
            //             papername: ri.papername,
            //             stime: moment(ri.updatetime).format("HH:mm"),
            //             time: moment(ri.updatetime).format("MM-DD HH:mm"),
            //             img: _toolsvue2.default.handleImg(ri.imagesource, 3, ri.paperid, ri.paperdate, ri.revision),
            //             type: _toolsvue2.default.articleType(ri.articletype, ri.articlesequenceid)
            //         };
            //         self.newslist.push(obj);
            //     }
            //     // 是否有回调函数
            //     self.$emit("callback", 0, self.newslist[0]);
            //     self.$nextTick(function () {
            //         self.init();
            //     });
            // }, function () {
            //     self.load = false;
            //     self.error = true;
            //     alert("请求出错");
            // }, url);
        },

        // 初始化，设置值
        init: function init() {
            this.$out = _toolsvue2.default.$(this.id);
            this.onescreenh = this.$out.querySelector(".fn-s-treetimeinner").clientHeight;
            this.$nodes = this.$out.querySelector('.time-nodes');
            this.totalh = this.$nodes.offsetHeight;
            this.$nodesli = this.$out.getElementsByClassName("time-node");
            this.nodeslen = this.$nodesli.length;
            this.onefacth = this.$nodesli[0].clientHeight;
            this.perh = (this.totalh - this.onefacth) / (this.nodeslen - 1);
            this.maxtop = this.totalh - this.onescreenh;
            if (this.reverse) {
                this.curindex = this.totallen - 1;
            }
            this.scroll();
        },
        scroll: function scroll() {
            var self = this;
            this.stop();
            this.timer = setInterval(function () {
                self.tonext();
            }, this.inter);
        },
        tonext: function tonext() {
            if (this.reverse) {
                this.curindex <= 0 ? this.curindex = this.totallen - 1 : this.curindex--;
                var toBot = (this.totallen - 1 - this.curindex) * this.perh;
                toBot > this.maxtop && (toBot = this.maxtop);
                this.topStyle.bottom = -toBot + "px";
            } else {
                this.curindex >= this.totallen - 1 ? this.curindex = 0 : this.curindex++;
                var toTop = this.curindex * this.perh;
                toTop > this.maxtop && (toTop = this.maxtop);
                this.topStyle.top = -toTop + "px";
            }
        },

        // 清空定时器
        stop: function stop() {
            this.timer && clearInterval(this.timer);
        }
    },
    watch: {
        curindex: function curindex(newval) {
            this.$emit("callback", newval, this.newslist[newval]);
        }
    }
}; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/***/ }),

/***/ 149:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@charset \"UTF-8\";\n.fn-s-treetimeline {\n  height: 100%;\n  position: relative;\n  width: 100%;\n  margin: auto;\n  overflow: hidden;\n}\n.time-nodes {\n  position: absolute;\n  top: 0.2rem;\n  left: 50%;\n  margin-left: -0.05rem;\n  transition: all linear 0.5s;\n}\n.fn-s-treetimeinner {\n  width: 0.1rem;\n  margin: auto;\n  height: 100%;\n}\n.time-line {\n  width: 0.1rem;\n  border-radius: 0.05rem;\n  background: #ffffff;\n  min-height: 100%;\n}\n.time-circle {\n  margin-left: -0.25rem;\n  width: 0.6rem;\n  height: 0.6rem;\n  border-radius: 50%;\n  line-height: 0.6rem;\n  position: relative;\n  z-index: 2;\n  font-family: \"\\9ED1\\4F53\";\n  cursor: pointer;\n  background:#31b1e8 ;\n box-sizing:border-box ;\n border:2px solid #fff;}\n.time-circle .fn-s-icon {\n    position: absolute;\n}\n.time-circle .time-hour {\n    text-align: center;\n}\n.weibo-node .time-news {\n  background-image: url(\"../image/weibo.png\");\n}\n.weibo-node .fn-s-circle {\n  background: #f84040;\n  box-shadow: 0rem 0.02rem 0.05rem #f84040;\n}\n.weibo-node .time-circle {\n  background-position: -0.3rem -0.01rem;\n}\n.weixin-node .time-news {\n  background-image: url(\"../image/weixin.png\");\n}\n.weixin-node .fn-s-circle {\n  background: #2bae29;\n  box-shadow: 0.02rem 0.02rem 0.05rem #2bae29;\n}\n.weixin-node .time-circle {\n  background-position: -0.3rem -0.72rem;\n}\n.web-node .time-news {\n  background-image: url(\"../image/web.png\");\n}\n.web-node .fn-s-circle {\n  background: #3eb4ff;\n  box-shadow: 0.02rem 0.02rem 0.05rem #3eb4ff;\n}\n.web-node .time-circle {\n  background-position: -0.3rem -1.42rem;\n}\n.app-node .time-news {\n  background-image: url(\"../image/app.png\");\n}\n.app-node .fn-s-circle {\n  background: #d239e0;\n  box-shadow: 0.02rem 0.02rem 0.05rem #d239e0;\n}\n.app-node .time-circle {\n  background-position: -0.3rem -2.145rem;\n}\n.news-node .time-news {\n  background-image: url(\"../image/news.png\");\n}\n.news-node .fn-s-circle {\n  background: #e99528;\n  box-shadow: 0.02rem 0.02rem 0.05rem #e99528;\n}\n.news-node .time-circle {\n  background-position: -0.3rem -2.85rem;\n}\n.time-ndetail {\n  height: 0.64rem;\n  display: -webkit-box;\n  display: -moz-box;\n  display: -webkit-flex;\n  display: -moz-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n.fn-s-ntime {\n  margin-right: 0.04rem;\n}\n.fn-s-ntime > * {\n    vertical-align: middle;\n}\n.fn-s-rsource {\n  vertical-align: middle;\n}\n.time-mimg {\n  width: 0.64rem;\n  height: 100%;\n  border: 0.01rem solid #cccccc;\n  flex: 0 0 0.64rem;\n  margin-right: 0.1rem;\n}\n.time-mimg img {\n    width: 100%;\n    height: 100%;\n}\n.fn-s-circle {\n  display: inline-block;\n  width: 0.08rem;\n  height: 0.08rem;\n  border-radius: 50%;\n  margin-right: 0.04rem;\n}\n.time-node {\n  width: 6rem;\n  font-size: 0;\n  margin-bottom: 0.5rem;\n}\n.time-node:last-child {\n    margin-bottom: 0;\n}\n.time-node.active .time-news {\n    color: #fff;\n    background-color: #31b1e8;\n    box-shadow: 0.05rem 0 0.05rem #31b1e8;\n}\n.time-node.active .time-news .time-ntitle {\n      color: #fff;\n}\n.time-node > * {\n    font-size: 0.18rem;\n    display: inline-block;\n    vertical-align: middle;\n}\n.time-wiring {\n  z-index: 1;\n  width: 1.2rem;\n  height: 0.04rem;\n  border-radius: 0.02rem;\n  background: #ffffff;\n  margin-left: -0.8rem;\n  position: relative;\n}\n.time-wiring:after {\n    content: \"\";\n    width: 0.08rem;\n    height: 0.08rem;\n    border-radius: 50%;\n    background: #ffffff;\n    position: absolute;\n    top: -0.02rem;\n    left: -0.02rem;\n}\n.time-news {\n  width: 3.2rem;\n  background-color: #e9e9e9;\n  background-position: right bottom;\n  background-repeat: no-repeat;\n  background-size: auto 50%;\n  border-radius: 0.05rem;\n  color: #2a2a2a;\n  padding: 0.04rem 0.08rem 0.1rem;\n  position: relative;\n  z-index: 3;\n  cursor: pointer;\n  box-shadow: 0.02rem 0 0.1rem #999 inset, 0 0.02rem 0.1rem #999 inset, -0.02rem 0 0.1rem #999 inset, 0 -0.02rem 0.1rem #999 inset;\n}\n.time-ntitle {\n  font-size: 0.18rem;\n  line-height: 1.6;\n  padding-bottom: 0.08rem;\n  margin-bottom: 0.08rem;\n  font-family: \"\\9ED1\\4F53\";\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  color: #404040;\n  border-bottom: 0.01rem solid #cecece;\n}\n.fn-s-nsource {\n  max-width: 1.2rem;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n}\n.fn-s-nsource > * {\n    vertical-align: middle;\n    line-height: 1;\n}\n.time-ntimes {\n  margin-bottom: 0.12rem;\n  font-size: 0.14rem;\n}\n.time-ntimes > * {\n    vertical-align: middle;\n}\n.time-nmarkinfo {\n  font-size: 0.2rem;\n  line-height: 1.8;\n  flex: 1 0 1.5rem;\n  height: 100%;\n  overflow: hidden;\n}\n.time-right .time-wiring {\n  margin-left: -0.9rem;\n  left: auto;\n}\n.time-right .time-wiring:after {\n    left: auto;\n    right: -0.02rem;\n}\n.time-right .time-news {\n  margin-left: -4.4rem;\n}\n.time-failure, .time-load {\n  position: absolute;\n  top: 0.4rem;\n  left: 50%;\n  margin-left: -32px;\n}\n@keyframes loadone {\nfrom {\n    transform: rotate(0deg);\n}\nto {\n    transform: rotate(360deg);\n}\n}\n.time-load img {\n  width: 0.32rem;\n  height: 0.32rem;\n  animation: loadone 2s linear infinite;\n}\n", ""]);

// exports


/***/ }),

/***/ 160:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.fn-s-newsdetails {\n  height: 100%;\n  width: 100%;\n  padding: 0  0.2  0 0.2rem;\n}\n.fn-s-newsdetail {\n  color: #f5f5f5;\n  font-size: 0.16rem;\n  color: #dbdbdb;\n}\n.fn-s-newstop {\n  width: 6.8rem;\n  height: 1.2rem;\n}\n.fn-s-newstitle {\n  width: 6.8;\n  height: 0.3rem;\n  line-height: 0.3rem;\n  font-size: 0.3rem;\n  color: #fff;\n  margin-bottom: 0.12rem;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.fn-s-newscontent {\n  font-size: 0.18rem;\n  line-height: 1.8;\n  overflow-y: auto;\n  height: 7.2rem;\n}\n.fn-s-newscontent p,\n  .fn-s-newscontent img {\n    margin-bottom: 0.2rem;\n}\n.fn-s-newscontent img {\n    max-width: 100% !important;\n    padding: 0 0.1rem;\n    display: block;\n    margin: auto auto 0.2rem;\n}\n.fn-s-nsourceimg, .fn-s-ntimeicon {\n  width: 0.3rem;\n  height: 0.3rem;\n}\n.fn-s-ntimeicon {\n  display: inline-block;\n  background: url(\"../image/time.svg\") no-repeat center;\n  background-size: 100%;\n}\n.fn-s-newssource {\n  margin-bottom: 0.15rem;\n}\n.fn-s-newstime, .fn-s-newssource {\n  display: inline-block;\n  width: 100%;\n  height: 0.22rem;\n  font-size: 0.22rem;\n  line-height: 0.22rem;\n  color: #3eb9ff;\n}\n.fn-s-newstime > *, .fn-s-newssource > * {\n    vertical-align: middle;\n}\n", ""]);

// exports


/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fn-s-treetimeline",
    attrs: {
      "id": _vm.id
    }
  }, [_c('div', {
    staticClass: "fn-s-treetimeinner"
  }, [_c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.newslist.length),
      expression: "newslist.length"
    }],
    staticClass: "time-line"
  }), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.newslist.length),
      expression: "newslist.length"
    }],
    staticClass: "time-nodes",
    style: (_vm.topStyle)
  }, _vm._l((_vm.newslist), function(nl, i) {
    return _c('div', {
      staticClass: "time-node",
      class: [{
        'time-right': (i % 2 == 0),
        'time-left': (i % 2 == 1)
      }, nl.type + '-node', {
        active: _vm.curindex == i
      }]
    }, [_c('div', {
      staticClass: "time-circle"
    }, [_c('p', {
      staticClass: "time-hour"
    }, [_vm._v(_vm._s(nl.stime))])]), _vm._v(" "), _c('div', {
      staticClass: "time-wiring"
    }), _vm._v(" "), _c('div', {
      staticClass: "time-news"
    }, [_c('h3', {
      staticClass: "time-ntitle"
    }, [_c('span', {
      staticClass: "fn-s-ntime left"
    }, [_c('span', {
      staticClass: "fn-s-icon fn-s-timeicon"
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(nl.time))])]), _vm._v(" "), _c('span', {
      staticClass: "fn-s-nsource right"
    }, [_c('span', {
      staticClass: "fn-s-circle"
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(nl.papername))])])]), _vm._v(" "), _c('div', {
      staticClass: "time-ndetail"
    }, [_c('div', {
      staticClass: "time-mimg"
    }, [(nl.img != '') ? _c('img', {
      attrs: {
        "src": nl.img
      }
    }) : _vm._e(), _vm._v(" "), (nl.img == '') ? _c('img', {
      attrs: {
        "src": "../image/default.png"
      }
    }) : _vm._e()]), _vm._v(" "), _c('p', {
      staticClass: "time-nmarkinfo"
    }, [_vm._v(_vm._s(nl.title))])])])])
  })), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.load),
      expression: "load"
    }],
    staticClass: "time-load"
  }, [_c('img', {
    attrs: {
      "src": "../image/loading.svg"
    }
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.load && _vm.error),
      expression: "!load && error"
    }],
    staticClass: "time-failure"
  }, [_c('img', {
    attrs: {
      "src": "../image/failure.png"
    }
  })])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-55d89241", module.exports)
  }
}

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "fn-s-newsdetails"
  }, [_c('div', {
    staticClass: "fn-s-newstop"
  }, [_c('h3', {
    staticClass: "fn-s-newstitle",
    domProps: {
      "innerHTML": _vm._s(_vm.detail.title)
    }
  }), _vm._v(" "), _c('div', {
    staticClass: "fn-s-newsdetail"
  }, [_c('span', {
    staticClass: "fn-s-newssource"
  }, [(_vm.detail.img) ? _c('img', {
    staticClass: "fn-s-nsourceimg",
    attrs: {
      "src": _vm.detail.img
    }
  }) : _vm._e(), _vm._v(" "), _c('b', [_vm._v("来源：" + _vm._s(_vm.detail.papername))])]), _vm._v(" "), _c('span', {
    staticClass: "fn-s-newstime"
  }, [_c('b', {
    staticClass: "fn-s-timetxt"
  }, [_vm._v("\n                    " + _vm._s(_vm.detail.timetxt ? _vm.detail.timetxt : '时间：') + "\n                    " + _vm._s(_vm.detail.time) + "\n                ")])])])]), _vm._v(" "), _c('div', {
    staticClass: "fn-s-newscontent",
    domProps: {
      "innerHTML": _vm._s(_vm.detail.content)
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-d4a5af5e", module.exports)
  }
}

/***/ }),

/***/ 253:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(149);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("78f68426", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.25.0@css-loader/index.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-55d89241\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_sass-loader@5.0.1@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./timeline.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.25.0@css-loader/index.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-55d89241\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_sass-loader@5.0.1@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./timeline.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 256:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(160);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(4)("08b6eb8e", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/_css-loader@0.25.0@css-loader/index.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-d4a5af5e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_sass-loader@5.0.1@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./detail.vue", function() {
     var newContent = require("!!../../../../node_modules/_css-loader@0.25.0@css-loader/index.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-d4a5af5e\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/_sass-loader@5.0.1@sass-loader/lib/loader.js!../../../../node_modules/_vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./detail.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 4:
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

var listToStyles = __webpack_require__(6)

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

/***/ 6:
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


/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(256)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(122),
  /* template */
  __webpack_require__(246),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\work\\MY-PROJECT\\DW.News.App.Screen\\dist\\js\\guangxidaily\\component\\detail.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] detail.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d4a5af5e", Component.options)
  } else {
    hotAPI.reload("data-v-d4a5af5e", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(253)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(124),
  /* template */
  __webpack_require__(231),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "D:\\work\\MY-PROJECT\\DW.News.App.Screen\\dist\\js\\guangxidaily\\component\\timeline.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] timeline.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-55d89241", Component.options)
  } else {
    hotAPI.reload("data-v-55d89241", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var tools = {
    refreshTime: 30 * 60 * 1000,
    addEvent: function addEvent(dom, type, fun, params) {
        var fn = fun;
        if (params) {
            fn = function fn() {
                fun.call(this, params);
            };
        }
        if (dom.addEventListener) {
            dom.addEventListener(type, fn, false);
        } else if (dom.attachEvent) {
            dom.attachEvent("on" + type, fn);
        } else {
            dom["on" + type] = fn;
        }
    },
    removeEvent: function removeEvent(dom, type, fun) {
        if (dom.removeEventListener) {
            dom.removeEventListener(type, fun, false);
        } else if (dom.detachEvent()) {
            dom.detachEvent(type, fun);
        } else {
            dom["on" + type] = null;
        }
    },
    setFont: function setFont() {
        var ww = window.innerWidth;
        var fontSize = ww * 62.5 / 192;
        document.getElementsByTagName("html")[0].style.fontSize = fontSize + "%";
    },
    resetFont: function resetFont() {
        this.setFont();
        this.addEvent(window, "resize", this.setFont);
    },
    refresh: function (_refresh) {
        function refresh(_x) {
            return _refresh.apply(this, arguments);
        }

        refresh.toString = function () {
            return _refresh.toString();
        };

        return refresh;
    }(function (time) {
        setTimeout(function () {
            if (navigator.onLine) {
                //判断是否有网
                window.location.reload();
            } else {
                alert("请检查网络设置！");
                refresh(5 * 60000);
            }
        }, time ? time : this.refreshTime);
    }),
    requestNewdata: function requestNewdata(that, whatDo, sucFun, errFun, url) {
        var finaleUrl = url ? url : "/datas/api/screen_api.ashx";
        var params = null;
        var self = this;
        if (typeof whatDo == "string") {
            params = {
                channelid: that.channelid,
                whatDo: whatDo
            };
        } else {
            params = whatDo;
        }
        that.$http.get(finaleUrl, {
            params: params,
            before: function before(request) {
                // this.previousRequest && this.previousRequest.abort();
                this.previousRequest = request;
            }
        }).then(function (res) {
            if (res.data) {
                self.handleDataNew(res.data, sucFun, errFun);
            } else {
                console.log("数据接口很可能有特殊字符，请在浏览器上检查接口返回数据！");
            }
        }, function (res) {
            console.log("请求失败！");
        });
    },
    queryData: function queryData(method,params,url) {
        return new Promise(function(resolve,reject){
            $.ajax({
                type : method,
                url : url,
                data : params,
                async : false,
                success : function(response){
                    resolve(response)
                },
                error : function(){
                    console.log('数据获取失败，请检查参数、访问地址、方法')
                }
            });
        })
    },
    handleDataNew: function handleDataNew(data, sucFun, errFun) {
        typeof data == "string" && (data = JSON.parse(data));
        if (data.Succeed != undefined) {
            if (data.Succeed) {
                sucFun(data.obj ? data.obj : data.Msg, data.Msg2);
            } else {
                var state = data.state;
                switch (state) {
                    case 0:
                        //普通错误
                        errFun && errFun(data.Msg, data);
                        break;
                    case 104:
                    case 200:
                        //未登陆状态
                        console.log("请先登录");
                        window.location.href = "/UserManage/UserLogin/Login.aspx?url=" + encodeURIComponent(window.location.href);
                        break;
                    case 201:
                        alert("您当前没有权限进行此操作！");
                        break;
                }
            }
        } else {
            sucFun(data);
        }
    },
    handleImg: function handleImg(imagesource, type, paperID, paperDate, reversion) {
        var imageDomain = "http://fwimage.cnfanews.com";
        var imgBit = 1000;
        if (imagesource != "") {
            var images = new Array();
            images = imagesource.split("%D%W"); //多图片分隔
            var imageOpts = new Array();
            imageOpts = images[0].split(",");
            if (images[0].indexOf("http://") >= 0) {
                if (imageOpts[0].toLowerCase().indexOf(".jpg") > -1 || imageOpts[0].toLowerCase().indexOf(".gif") > -1 || imageOpts[0].toLowerCase().indexOf(".png") > -1 || imageOpts[0].toLowerCase().indexOf(".jpeg") > -1 || imageOpts[0].toLowerCase().indexOf(".bmp") > -1) {
                    return imageOpts[0].replace("#", "%23");
                } else return imageOpts[0].replace("#", "%23");
            } else {
                var firstPath = "error";
                switch (type) {
                    case 1:
                        firstPath = "jpg";
                        break;
                    case 2:
                        firstPath = "pdf";
                        break;
                    case 3:
                        firstPath = "img";
                        break;
                }
                var key = firstPath + "/" + paperDate.toString().substr(0, 4) + "/" + paperDate + "/" + paperID + "/" + reversion + "/" + imageOpts[0];
                return imageDomain + "/" + key.toLowerCase();
            }
        }
        return "";
    },
    addPrefix: function addPrefix(num) {
        num = String(num);
        if (num.length == 1) {
            num = "0" + num;
        }
        return num;
    },
    handleTime: function handleTime(str) {
        if (str.indexOf("\/Date") >= 0) {
            var reg = /\/Date\((-?\d+|-?\d+\+\d+)\)\//g,
                match = reg.exec(str),
                stamp = parseInt(match[1]);
            var date = new Date(stamp),
                year = date.getFullYear(),
                month = this.addPrefix(date.getMonth() + 1),
                day = this.addPrefix(date.getDate()),
                hour = this.addPrefix(date.getHours()),
                minute = this.addPrefix(date.getMinutes()),
                second = this.addPrefix(date.getSeconds());
            return {
                year: year,
                month: month,
                day: day,
                hour: hour,
                minute: minute,
                second: second,
                total: year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second,
                toMin: year + "-" + month + "-" + day + " " + hour + ":" + minute
            };
        }

        return {
            total: str
        };
    },
    articleType: function articleType(at, aid) {
        var t = '';
        if (at.indexOf("weixin") >= 0) {
            t = "weixin";
        } else if (at.indexOf("web") >= 0) {
            t = "web";
        } else if (at.indexOf("bbs") >= 0) {
            t = "web";
        } else if (at.indexOf("app") >= 0) {
            t = "app";
        } else if (at.indexOf("news") == 0) {
            t = "news";
        } else if (at.indexOf("weibo") >= 0) {
            t = "weibo";
        }
        if (t === "") {
            if (aid > 1800010100000000000 && aid < 2500000000000000000) {
                t = "news";
            } else if (aid >= 2500000000000000000 && aid < 3500000000000000000 || aid.toString().length == 17) {
                t = "weibo";
            } else if (aid >= 3500000000000000000 && aid < 4400000000000000000) {
                t = "weixin";
            } else {
                t = "website";
            }
        }
        return t;
    },
    random: function random(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    },
    $: function $(str) {
        return document.getElementById(str);
    }
};
exports.default = tools;

tools.resetFont();
tools.refresh();

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _timeline = __webpack_require__(83);

var _timeline2 = _interopRequireDefault(_timeline);

var _detail = __webpack_require__(81);

var _detail2 = _interopRequireDefault(_detail);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var vm = new Vue({
    el: "#reprintbox",
    data: {
        ynum: '',
        snum: '',
        num: 1,
        url: {
            roll: "/api/screen_api.ashx?whatDo=getMediaFocusArticle&start=0&limit=50&keyWords=&rd=0.9388796881123753&createtime_index=&channelid=67275",
            roll2: "/api/screen_api.ashx?whatDo=getMediaFocusArticle&start=0&limit=50&keyWords=&rd=0.9388796881123753&createtime_index=&channelid=67279"
        },
        detail: {
            title: "...",
            time: "...",
            timetxt: "",
            img: "",
            papername: "",
            content: "..."
        },
        detail2: {
            title: "...",
            time: "...",
            timetxt: "",
            img: "",
            papername: "",
            content: "..."
        }
    },
    mounted: function mounted() {
        var _this = this;

        setTimeout(function () {
            _this.getcount();
            _this.getcount2();
        }, 50);
        var refreshTime = 60 * 60 * 1000; //每一个小时刷新一次页面
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

    components: {
        timeline: _timeline2.default,
        detail: _detail2.default
    },
    methods: {
        ym: function ym() {
            var self = this;
            $(".yym").addClass("active");
            $(".ssm").removeClass("active");
            self.num = 1;
        },
        sm: function sm() {
            var self = this;
            $(".yym").removeClass("active");
            $(".ssm").addClass("active");
            self.num = 2;
        },
        getcount: function getcount() {
            var self = this;
            var params = {
                pageNum: 0,
                sortOrder: 'DESC',
                sortField: 'ceiIndex',
                categories: 1
            };
            $.ajax({
                type : 'get',
                url : '/datas/api/cas/transmission/searchList',
                data : params,
                async : false,
                success : function(response){
                    var data = response.data;
                    if (data && data.size > 0) {
                        self.ynum = data.size;
                        // self.detail = data.content;
                        $(".ySpan").html("(" + self.ynum + ")");
                    }
                }
            });
        },
        getcount2: function getcount2() {
            var self = this;
            var params = {
                pageNum: 0,
                sortOrder: 'DESC',
                sortField: 'ceiIndex',
                categories: 0
            };
            $.ajax({
                type : 'get',
                url : '/datas/api/cas/transmission/searchList',
                data : params,
                async : false,
                success : function(response){
                    var data = response.data;
                    if (data && data.size > 0) {
                        self.snum = data.size;
                        // self.detail = data.content;
                        $(".sSpan").html("(" + self.snum + ")");
                    }
                }
            });
        },
        getArticleDetail: function(index, obj){
            return new Promise(function(resolve,reject){
                $.ajax({
                    type: 'get',
                    url: '/datas/api/cas/docdetail/getDetail?docId=' + obj.id,
                    async: false,
                    success: function (response) {
                        if(response.msg == '成功'){
                            resolve(response.data)
                        }
                    }
                });
            });
        },
        // 获取文章详情（央媒）
        getDetail: function getDetail(index, obj) {
            var self = this;
            this.getArticleDetail(index,obj).then(function(data){
                $.ajax({
                    type: 'get',
                    url: '/datas/api/cas/commondetail/getOriginalContent?docId=' + obj.id,
                    async: false,
                    success: function (response) {
                        if(response.msg == '成功'){
                            data.content = response.data.content;
                            data.content = data.content.replace(/&lt;/g,'<').replace(/&nbsp;/g,' ').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&quot;/g,'"').replace(/&nbsp;/g,' ').replace(/\r/g,'<br>');
                            self.detail.time = data.pubTime.substr(0,4) + '-' + data.pubTime.substr(4,2) + '-' + data.pubTime.substr(6,2);
                            self.detail.title = data.title;
                            self.detail.content = data.content;
                            self.detail.papername = data.siteName;
                        }
                    }
                });
            });
        },
        // 获取文章详情（省媒）
        getDetail2: function getDetail2(index, obj) {
            var self = this;
            this.getArticleDetail(index,obj).then(function(data){
                $.ajax({
                    type: 'get',
                    url: '/datas/api/cas/commondetail/getOriginalContent?docId=' + obj.id,
                    async: false,
                    success: function (response) {
                        if(response.msg == '成功'){

                            data.content = response.data.content;
                            data.content = data.content.replace(/&lt;/g,'<').replace(/&nbsp;/g,' ').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&quot;/g,'"').replace(/&nbsp;/g,' ').replace(/\r/g,'<br>');


                            self.detail2.time = data.pubTime.substr(0,4) + '-' + data.pubTime.substr(4,2) + '-' + data.pubTime.substr(6,2);
                            self.detail2.title = data.title;
                            self.detail2.content = data.content;
                            self.detail2.papername = data.siteName;
                        }
                    }
                });
            });
        }
    }
});

/***/ })

/******/ });