"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

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
        var finaleUrl = url ? url : "/api/screen_api.ashx";
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
    handleDataNew: function handleDataNew(data, sucFun, errFun) {
        typeof data == "string" && (data = JSON.parse(data));
        if (data.Succeed != undefined) {
            if (data.Succeed) {
                sucFun(data.obj ? data.obj : data.Msg);
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
                toMin: year + "-" + month + "-" + day + " " + hour + ":" + minute,
                today: month + '月' + day + '日' + hour + '时'
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
    },
    //要截取多少长度，min最短截取多少长度
    cutoutStr: function cutoutStr(str, len, min) {
        var reg = /。$/;
        var altStr = str.substring(0, len);
        if (reg.test(altStr)) {
            //截取后以。结尾
            return altStr;
        } else {
            if (altStr.indexOf("。") >= 0) {
                //包含句号
                var lastIndex = altStr.lastIndexOf("。") + 1;
                if (lastIndex < min) {
                    altStr = altStr.substring(0, min) + "...";
                } else {
                    altStr = altStr.substring(0, lastIndex);
                }
                return altStr;
            } else {
                return altStr + "...";
            }
        }
    },
    // 检验是否是ie浏览器，兼容到ie11
    checkie: function checkie() {
        return !!window.ActiveXObject || "ActiveXObject" in window;
    },
    // 给一个数组添加对象类型的值，先判断是否已经存在这个值(首先判断是否指向同一个指针，)，其中只要有一个值和obj相等，就不添加；
    // 假设没有
    pushArr: function pushArr(arr, obj) {
        var tag = false;
        if (arr.length == 0) {
            tag = true;
        } else {
            for (var i = 0; i < arr.length; i++) {
                var ai = arr[i];
                tag = !this.checkobjhas(ai, obj);

                if (!tag) {
                    console.log(i);
                    break;
                }
            }
        }

        if (tag) {
            arr.push(obj);
        }
        return arr;
    },

    // 判断两个对象是否键值对相等, 只判断obj1含有的key值是否obj2是否都有，并且是否相等（有点类似包含）
    // 包含返回true，不包含返回false
    checkobjhas: function checkobjhas(obj1, obj2) {
        var tag = true;
        for (var j in obj1) {
            var oj = obj1[j],
                oj2 = obj2[j];
            if ((typeof oj === "undefined" ? "undefined" : _typeof(oj)) === "object" && (typeof oj2 === "undefined" ? "undefined" : _typeof(oj2)) === "object") {
                tag = this.checkobjhas(oj, oj2);
            } else if (typeof oj === "function" && typeof oj2 === "function") {
                tag = false;
            } else {
                if (oj != oj2) {
                    tag = false;
                }
            }
            if (!tag) {
                break;
            }
        }
        return tag;
    },

    // 复制某个对象的值，并添加到一个数组
    copyobjtoarr: function copyobjtoarr(obj, arr) {
        var copy = this.copyobj(obj);
        arr.push(copy);
    },

    // 仅仅返回一个复制的对象
    copyobj: function copyobj(obj) {
        var copy = {};
        for (var j in obj) {
            var oj = obj[j];
            if ((typeof oj === "undefined" ? "undefined" : _typeof(oj)) === "object") {
                copy[j] = this.copyobj(oj);
            } else if (typeof oj != "function") {
                copy[j] = oj;
            }
        }
        return copy;
    },

    // set转array
    setToArray: function setToArray(set) {
        return Array.from(set);
    }
};
tools.resetFont();
tools.refresh();