/**
 * Created by sq on 2017/2/4.
 * 自定义时间轴，舍弃别人的时间轴
 * 基于jquery，数据格式和timeline js3保持一致
 * 支持直接传入数据或者一个接口地址-目前只支持get请求
 * 初始数据可以为空数组，如果为空数组，默认将现在的时候显示在中间位置
 * 默认传过来的数据是按照时间排好的
 * 所有的month皆为getMonth() + 1后的值，年月日为必传，时分如果没有传的话，则全部置为0，不精确到秒
 * 以分钟为单位绘制
 * 把数据最终解析成[{timeStamp: ,start_date: {},data:[,,,]}]，因为一个时间点会有多条数据，导航区同一时间点绘制多条数据，内容区同理
 * 跳转的时候，从1开始
 * 所有的定时器均使用setTimeout，为了避免setInterval出现延时的问题
 */
'use strict';
$.fn.timeline = function(options, data) {
    var _default = {
        start: 2, //默认从1开始
        startType: 'news',
        replayDelay: 2000, //停留多久后重新播放
        autoplay: true, //改为只有一个控制轮播
        loop: true, //播放到最后一个后是否循环
        interval: 10000, //nav内的切换时长
        animateTime: 500, //nav内动画时长
        navAnimateTime: 1000, //nav间动画时长
        addToFirst: true, //添加后
        start_at_end: false, //是否从最后一个开始，如果为true，则start废弃
        range: [0.5, 1], //
        default_range: 0.5, //默认一屏显示半小时
        on_the_hour: true, //是否显示整点
        on_half_hour: false, //是否显示半点
        on_cur_hour: true, //是否显示现在时间
        width: null,
        height: null, //宽高,px值，不设置的话为默认获取的宽高。注意：width将作为内容区和导航区的一屏的宽度
        debug: true,
        maxLen: 100, //超出多少条之后，清空前面的数据
        degreeBase: "hot",
        showPos: "right", //当前导航所在位置，可取值left、center、right
        ext_html: '', //自定义的html
        info: true, //是否显示提示信息
        absoluteEqual: false, // 扩展下面的degree，正常情况是有大于小于操作的，在为true的时候，只判端是否相等
        degreeText: false, // 显示degree的值，还是显示text，默认显示值
        degree: [{
            cls: "tlLevelOne",
            range: [20]
        }, {
            cls: "tlLevelTwo",
            range: [20, 30]
        }, {
            cls: "tlLevelThree",
            range: [30, 40]
        }, {
            cls: "tlLevelFour",
            range: [40]
        }]
    };
    var msg = {
        data_err: '请传入正确的数据格式或者正确的请求地址。',
        request_err: '请求出错，请确认一下接口是否通过。',
        request_data_err: '接口返回数据不符合要求。',
        access_data_err: '传入的数据格式不符合要求。',
        data_null: '后台返回的数据的长度为空。'
    };
    var _this = this,
        $_this = $(_this);
    var $warnArea = null;
    !_default.width && (_default.width = $_this.outerWidth());
    !_default.height && (_default.height = $_this.outerHeight());
    options = $.extend({}, _default, options);

    function Timeline() {
        this.initTag = true; //是否是初次加载
    }
    Timeline.prototype.warn = function(msg) {
        if ($_this.children(".timeline_load").length == 0) {
            $_this.append("<div class='timeline_load'><div class='fn-s-lIOut'><div class='fn-s-lIc'><span class='fn-s-lIcL fn-fl'></span><span class='fn-s-lIcLR fn-fr'></span></div><div class='fn-s-lIName'>FANEWS</div></div><div class='timeline_msg'></div></div>");
        }
        $warnArea = $_this.children(".timeline_load").eq(0);
        var $warnTxt = $warnArea.children(".timeline_msg");
        if (msg) {
            $warnTxt.html("错误提示：" + msg);
        } else {
            $warnTxt.html("");
        }
    };
    //隐藏提示信息
    Timeline.prototype.hideWarn = function() {
        $warnArea.fadeOut(600);
    };
    //初次获取数据，可以传入一个url，也可以是符合格式的数据
    Timeline.prototype.checkData = function() {
        var self = this;
        this.warn();
        if (!data) {
            options.debug && console.warn(msg.data_err);
            this.warn(msg.data_err);
            return;
        }
        if (typeof data === "string") {
            $.ajax({
                url: data,
                type: "get",
                success: function(viewdata) {
                    (typeof viewdata === "string") && (viewdata = JSON.parse(viewdata));
                    if (viewdata.events && 　(viewdata.events instanceof Array)) {
                        self.initHandleData(viewdata.events);
                    } else {
                        self.warn(msg.request_data_err);
                        options.debug && console.warn(msg.request_data_err);
                    }
                },
                error: function() {
                    options.debug && console.warn(msg.request_err);
                    self.warn(msg.request_err);
                },
                complete: function() {

                }
            })
        } else {
            if (data.events && 　(data.events instanceof Array)) {
                self.initHandleData(data.events);
            } else {
                self.warn(msg.access_data_err);
                options.debug && console.warn(msg.access_data_err);
            }
        }
    };
    /*
     * 继续解析数据，获取时间跨度
     * 初始的时候深度解析数据
     * */
    Timeline.prototype.initHandleData = function(data) {
        var self = this;
        self.initData = data; //保存初始值，在页面大小发生变化时，会使用到
        //隐藏加载中
        this.hideWarn();
        if (data.length == 0) { //如果没有数据
            options.debug && console.warn(msg.data_null);
            self.initialize({
                tag: false
            });
        } else { //有数据
            var handledData = self.handleDataCommon(data);
            self.data = handledData; //将处理好的数据保存起来
            self.initialize({
                tag: true,
                data: handledData
            });
        }
    };
    /*
     * 解析数据的公共部分，初始时和添加时
     * */
    Timeline.prototype.handleDataCommon = function(data) {
        var self = this,
            handledData = [], //合并同一时间内的数据
            timeI, timeIStamp,
            timeArr = [],
            di = null; //用来存储所有存在的时间段
        var len = data.length;
        for (var i = 0; i < len; i++) {
            di = data[i];
            timeI = self.formatTime(di.start_date).parts;
            timeIStamp = Date.parse(new Date(timeI.year, timeI.month, timeI.day, timeI.hour, timeI.minute));
            if (timeArr.indexOf(timeIStamp) < 0) { //还未保存过
                timeArr.push(timeIStamp);
                var obj = {};
                obj.timeStamp = timeIStamp;
                obj.data = [di];
                //obj[timeI] = [di];
                obj["start_date"] = di.start_date;
                handledData.push(obj);
            } else { //已保存过
                handledData[handledData.length - 1].data.push(di);
            }
        }
        return handledData;
    };
    /*
     * 向timeline中添加数据，数据为长度超过0的数组
     * */
    Timeline.prototype.add = function(obj) {
        var self = this,
            len = obj.length;
        if (len == 0) {
            return false;
        }
        self.pausePlay();
        self.trigger("beforeAdd");
        var handleData = self.handleDataCommon(obj); //重新解析一下进来的数据
        self.initData = self.initData ? self.initData.concat(obj) : obj; //新增数据时，改变
        self.data = self.data ? self.data.concat(handleData) : handleData;
        self.endDate = self.formatTime(obj[len - 1].start_date).parts;
        self.disabledBtn(); //画完之后使各个按钮可点击
        self.defaultDraw(3);
        self.trigger("afterAdd", obj);
    };
    /*
     * 删除某条数据，返回要删除的那条数据以及数据的index
     * 优先假设传入了id（具体思路见印象笔记-思路整理-4）
     * next step找到处理过的数据对应的要删除的值    * */
    Timeline.prototype.removeData = function(id) {
        var self = this,
            data = self.initData,
            $contentPa = self.$content,
            $navs = self.$navPa.children(".tlnav"),
            $nav = null,
            navId = 0,
            totalLen = data.length,
            di = null,
            reserve = null,
            index = 0;
        for (var i = 0; i < totalLen; i++) {
            di = data[i];
            $nav = $navs.eq(0);
            navId = parseInt($nav.attr("id").replace("nav_id_", ""));
            if (navId == id) {
                reserve = di;
                index = i;
                break;
            }
        }
        /*
         * 确定要删除的经过处理后的对象，可以通过页面上的渲染的dom元素的index获取
         * 要想定位处理后数据的删除值，需要两个索引值
         * */
        var $contentLi = $contentPa.find(".timeline_inner_uls li").eq(index),
            handleIndexOne = $contentLi.parent().parent().parent().index(),
            handleIndexTwo = $contentLi.index();
        return {
            data: reserve,
            index: index,
            handleIndexOne: handleIndexOne,
            handleIndexTwo: handleIndexTwo
        };
    };

    /*
     * 从timeline中删除数据，一个id的数组，如果未定义id，则是以1为基数的数组
     * 更新当前的nav、内容的index
     * */
    Timeline.prototype.remove = function(obj) {
        var self = this,
            len = obj.length,
            id = '', //将要删除的id
            $delCon = null,
            $delOrder = null,
            $delNav = null,
            delData = null,
            delIndex = 0,
            handleIndexOne = 0,
            handleIndexTwo = 0; //即将删除的内部元素
        self.pausePlay();
        self.trigger("beforeRemove");
        for (var i = 0; i < len; i++) {
            id = obj[i];
            delData = self.removeData(id);
            delIndex = delData.index;
            handleIndexOne = delData.handleIndexOne;
            handleIndexTwo = delData.handleIndexTwo;
            $delCon = self.$contentPa.find("#content_id_" + id);
            $delOrder = self.$contentPa.find("#order_id_" + id);
            $delNav = self.$navPa.find("#nav_id_" + id);
            $delNav.remove();
            self.initData.splice(delIndex, 1); //更新数据
            self.data[handleIndexOne].data.splice(handleIndexTwo, 1);
            if ($delCon.parent().children().length === 1) { //如果仅有一个子元素，直接将轮播区域删除
                $delCon.parent().parent().parent().remove();
                self.data.splice(handleIndexOne, 1);
                self.navNum--;
                //更新内容的index
                if (delIndex < self.curIndex) {
                    self.curNavIndex--;
                }
            } else {
                $delCon.remove();
                $delOrder.remove();
            }
            if (delIndex == self.curIndex) { //删除当前的,首先移动到下一条数据，随后将此条数据删除
                self.goTo(delIndex + 1, 'news'); //nav的index会在goTo当中更新
            } else if (delIndex < self.curIndex) { //判断更新nav的index
                self.curIndex--;
            }

            self.totalNum--;
            self.restartPlay();
        }
        self.$totalNum.text(self.totalNum);
        self.$navNum.text(self.navNum);
        self.trigger("afterRemove");
    };
    /*
     * 初始绘制
     * tag  1：初始绘制  3：增加数据绘制
     * */
    Timeline.prototype.drawTime = function(oneMinutePx, counts, circleDate, factsDate, tag) {
        var self = this,
            html = "",
            total = 0,
            data = self.data;
        //时间轴
        for (var b = 0; b < counts; b++) {
            var left = 30 * b * oneMinutePx;
            var title = circleDate.getFullYear() + "-" + (circleDate.getMonth() + 1) + "-" + circleDate.getDate() + " " + circleDate.getHours() + ":" + circleDate.getMinutes() + ":" + circleDate.getSeconds();
            html += "<div title='" + title + "' style='left: " + left + "px;' class='tltime'><span>" + circleDate.getHours() + "点" + (circleDate.getMinutes() ? circleDate.getMinutes() : '') + "</span></div>";
            circleDate.setMinutes(circleDate.getMinutes() + 30);
        }
        self.$timePa.append(html);
        var childLen = self.$navPa.children(".tlnav").length,
            baseChildId = childLen > 0 ? parseInt(self.$navPa.children(".tlnav").last().attr("id").replace("nav_id_", "")) + 1 : 1; //用来计算每个面板和内容的id，因为有删除和增加操作，所以得根据子元素的id来决定
        //内容区域和导航轴
        if (self.data) { //如果有初始数据
            var dl = data.length,
                di = null,
                startI = null,
                startStamp = 0;
            var conTopHtml = '', //内容区域
                navHtml = ''; //导航区域
            var degreeBase = options.degreeBase;
            var degreeText = options.degreeText,
                absoluteEqual = options.absoluteEqual,
                globalDegree = options.degree,
                gLen = globalDegree.length,
                $totalNum = $_this.find(".timeline_total").eq(0),
                $navNum = $_this.find(".timeline_times").eq(0),
                $pageIpt = $_this.find("#timeline_page_num").eq(0),
                $navIpt = $_this.find("#timeline_nav_num").eq(0);
            var totalNum = self.totalNum ? self.totalNum : 0,
                times = self.navNum ? self.navNum : 0;
            for (var i = times; i < dl; i++) {
                di = data[i];
                startI = self.formatTime(di.start_date).parts;
                startStamp = di.timeStamp;
                //内容
                if (i == 0) {
                    conTopHtml += '<li class="timeline_one_content cur"><div class="timeline_inner_navs">';
                } else {
                    conTopHtml += '<li class="timeline_one_content"><div class="timeline_inner_navs">';
                }
                //导航
                var startI_date = new Date(startI.year, parseInt(startI.month) - 1, startI.day, startI.hour, startI.minute),
                    navMinute = self.timeDistance(factsDate, startI_date, 1).minute,
                    navLeft = navMinute * oneMinutePx;
                var dArr = di.data,
                    contentHtml = '<ul class="timeline_inner_uls">',
                    orderHtml = '<ol class="timeline_inner_orders">',
                    drLen = dArr.length,
                    drj = null;
                total += i * drLen;
                for (var j = 0; j < drLen; j++) {
                    //内容
                    var _cls = '',
                        degreetxt = '';
                    var zIndex = drLen - j;

                    drj = dArr[j];
                    var contentId = drj.id ? "content_id_" + drj.id : ("content_id_" + baseChildId),
                        orderId = drj.id ? "order_id_" + drj.id : "order_id_" + baseChildId,
                        navId = drj.id ? "nav_id_" + drj.id : "nav_id_" + baseChildId;
                    baseChildId++;
                    if (j == 0) {
                        _cls = "active";
                    }
                    totalNum++;
                    //判断是否有自定义内容
                    var reg = /\{(\w+)\}/g;
                    var extHtml = options.ext_html;
                    if (reg.test(extHtml)) {
                        extHtml = extHtml.replace(reg, function(match, m2) {
                            return drj.custom[m2];
                        });
                    }
                    contentHtml += '<li id="' + contentId + '" class="' + _cls + '"><div class="timeline_def_content"><div class="timeline_media"><img src="' + drj.media.url + '"></div><div class="timeline_text"><div class="timeline_text_inner"><h3 class="timeline_text_head">' + drj.text.headline + '</h3><div class="timeline_text_small">' + drj.text.text + '</div></div></div></div><div class="timeline_ext_content">' + extHtml + '</div></li>';
                    orderHtml += "<li id='" + orderId + "' class='timeline_inner_order " + _cls + "'></li>";
                    //导航
                    var degreeNav = drj.nav[degreeBase],
                        navCls = '';
                    //判断每个导航面板的class
                    for (var a = 0; a < gLen; a++) {
                        var degI = globalDegree[a];
                        degreetxt = degI.text;
                        if (absoluteEqual) {
                            if (degreeNav == degI.range) {
                                navCls = degI.cls;

                                break;
                            }
                        } else {
                            if (a == 0) { //第一个
                                if (degreeNav >= 0 && (degreeNav < degI.range[0])) {
                                    navCls = degI.cls;
                                    break;
                                }
                            } else if (a == (gLen - 1)) { //倒数第一个
                                if (degreeNav >= degI.range[0]) {
                                    navCls = degI.cls;
                                    break;
                                }
                            } else {
                                if (degreeNav >= degI.range[0] && (degreeNav < degI.range[1])) {
                                    navCls = degI.cls;
                                    break;
                                }
                            }
                        }

                    }
                    navHtml += '<div id="' + navId + '" style="left: ' + navLeft + 'px; z-index: ' + zIndex + '" class="tlnav ' + navCls + '"><div class="tlcontent"><div class="tlConInner fl"><div class="tlCITop"><img src="' + drj.nav.url + '"/><h3>' + drj.nav.title + '</h3></div><div class="tlCIBot"><div class="tlKey fl"><span class="tlKeyVal">' + drj.nav.keyword.split(",").slice(0, 2).join(" ") + '</span></div><div class="tlTimeTag fr"><span class="tlBadge tlBadgeS">' + drj.nav.tag[0] + '</span></div></div></div><div class="tlHotTop fr"><img src="../../images/icons/fire2.svg"/><span class="tlHotVal"><span class="tlHotValInner">' + (degreeText ? degreetxt : drj.nav.hot) + '</span></span></div><span class="tl_warn">' + (j + 1) + '</span></div><div class="tlline"></div><div class="tlCircle"><div class="tlHot"><span class="tlleft"><span class="tlInner tlLeftInner"></span></span><span class="tlright"><span class="tlInner tlRightInner"></span></span></div><div class="tlText">' + (startI.hour + ":" + startI.minute) + '</div></div></div>';
                }
                //导航面板
                times++;
                //内容
                contentHtml += "</ul>";
                orderHtml += "</ul>";
                conTopHtml += (contentHtml + orderHtml + '</div></li>');
                //导航
            }
            $totalNum.text(totalNum);
            $navNum.text(times);
            self.$totalNum = $totalNum;
            self.$navNum = $navNum;
            $pageIpt.attr("max", totalNum);
            $navIpt.attr("max", times);
            self.$navPa.append(navHtml);
            self.$contentPa.append(conTopHtml);
            //使按钮可点击
            self.enabledBtn();
            if (tag && (tag == 3)) { //增加数据时
                if (options.addToFirst) { //跳到加进来的第一条
                    var $addFirstNav = self.$navPa.children().eq(self.totalNum);
                    self.goTo($addFirstNav.index() + 1, 'news');
                }
            } else { //初始时
                //先移动到第一个
                var $firstNav = self.$navPa.children().eq(0),
                    initLeft = parseInt($firstNav.css("left")) - 200;
                self.$navPa.css({
                    left: -initLeft
                });
                self.$timePa.css({
                    left: -initLeft
                });
            }
            /*后面两行代码置于后面*/
            self.totalNum = totalNum;
            self.navNum = times;
        } else {
            self.totalNum = 0; //没有数据的情况下，给一个初始值
            self.navNum = 0;
        }
    };
    /*
     * 当窗口发生变化时，面板轴内容的位置
     * */
    Timeline.prototype.reDrawTime = function(oneMinutePx, counts, circleDate, factsDate) {
        var self = this,
            $navs = self.$navPa.children(".tlnav"),
            data = self.initData, //取的初始值
            di = null;
        //self.pausePlay(); //窗口变化时，暂停轮播
        $navs.each(function(index, dom) {
            di = data[index];
            var $dom = $(dom);
            var startI = self.formatTime(di.start_date).parts,
                startI_date = new Date(startI.year, parseInt(startI.month) - 1, startI.day, startI.hour, startI.minute),
                navMinute = self.timeDistance(factsDate, startI_date, 1).minute,
                navLeft = navMinute * oneMinutePx;
            $dom.css("left", navLeft);
        });
        self.setTimelinePos();
    };
    /*
     * 初始绘制以及窗口变化的绘制都经过此方法
     * tag --- 1初次绘制，2窗口变化绘制, 3增加数据绘制
     * */
    Timeline.prototype.defaultDraw = function(tag) {
        var self = this;
        var width = $_this.outerWidth(),
            defaultRange = options.default_range,
            startDate = self.startDate,
            endDate = self.endDate;
        //每分钟占用多少像素
        var oneMinutePx = width / (defaultRange * 60);
        var $timePa = $_this.find(".timeline_time").eq(0),
            $navPa = $_this.find(".timeline_abstract").eq(0),
            $contentPa = $_this.find(".timeline_inner_content").eq(0);
        self.$timePa = $timePa;
        self.$navPa = $navPa;
        self.$contentPa = $contentPa;
        var factsDate = new Date(startDate.year, startDate.month - 1, startDate.day, parseInt(startDate.hour) - Math.ceil(defaultRange)),
            circleDate = new Date(startDate.year, startDate.month - 1, startDate.day, parseInt(startDate.hour) - Math.ceil(defaultRange)),
            facteDate = new Date(endDate.year, endDate.month - 1, endDate.day, parseInt(endDate.hour) + 1 + Math.ceil(defaultRange));
        //计算开始时间和结束时间相距几个半小时
        var counts = self.timeDistance(factsDate, facteDate, 30).minute;
        var pWidth = 30 * counts * oneMinutePx;
        $timePa.width(pWidth);
        $navPa.width(pWidth);
        switch (tag) {
            case 1:
                self.drawTime(oneMinutePx, counts, circleDate, factsDate);
                break;
            case 2:
                self.reDrawTime(oneMinutePx, counts, circleDate, factsDate);
                break;
            case 3:
                self.drawTime(oneMinutePx, counts, circleDate, factsDate, tag);
                break;
        }
    };
    /*
     * 设置时间轴和nav轴的位置
     * */
    Timeline.prototype.setTimelinePos = function(fun) {
        var self = this,
            $nav = self.$curNews;
        self.pausePlay();
        var left = 0,
            strLeft = $nav.css("left").replace("px", ""); //当宽度过长的时候，left值会出现1.0147e+06px这种情况
        if (strLeft.indexOf("e+") >= 0) {
            var arrLeft = strLeft.split("e+");
            left = parseFloat(arrLeft[0]) * (Math.pow(10, parseInt(arrLeft[1])));
        } else {
            left = parseInt(strLeft);
        }

        var initDis = 30,
            showPos = options.showPos,
            ww = $(window).width(),
            navPos = self.calculateSize($nav.get(0)), //导航所占据的位置
            navSelfPos = self.getDomPos($nav.get(0)), //导航本身的位置
            navWidth = navPos.left2 - navPos.left, //计算面板宽度
            navHeight = navPos.top2 - navPos.top; //计算面板的高度
        var navToInnerLeft = 0; //
        switch (showPos) {
            case "left":
                navToInnerLeft = navSelfPos.left > navPos.left ? (navPos.left - navSelfPos.left) : 0;
                break;
            case "center":
                navToInnerLeft = (ww - (navPos.left2 - navPos.left)) / 2;
                break;
            case "right":
            default:
                navToInnerLeft = ww - (navPos.left2 - navPos.left + initDis);
                break;
        }
        var finalLeft = -(left - (navSelfPos.left - navPos.left) - navToInnerLeft);
        //设置高亮所在位置以及大小
        self.$hightlight.animate({
            "top": navPos.top,
            "left": navToInnerLeft,
            "width": navWidth,
            "height": navHeight
        }, options.animateTime);
        //面板轴
        self.$navPa.animate({
            "left": finalLeft + "px"
        }, options.animateTime, fun);
        //时间轴
        self.$timePa.animate({
            "left": finalLeft + "px"
        }, options.animateTime, function() {});
    };
    /*所有按钮不可点击*/
    Timeline.prototype.disabledBtn = function() {
        var self = this;
        self.$start.addClass("disabled");
        self.$pause.addClass("disabled");
        self.$replay.addClass("disabled");
        self.$goBtnPage.addClass("disabled");
        self.$goBtnNav.addClass("disabled");
        self.$prev.addClass("disabled");
        self.$next.addClass("disabled");
    };
    /*移除那些不可点击按钮的disabled*/
    Timeline.prototype.enabledBtn = function() {
        var self = this;
        self.$start.removeClass("disabled");
        self.$pause.removeClass("disabled");
        self.$replay.removeClass("disabled");
        self.$goBtnPage.removeClass("disabled");
        self.$goBtnNav.removeClass("disabled");
        self.$prev.removeClass("disabled");
        self.$next.removeClass("disabled");
    };
    //计算一个元素相对于窗口的位置
    Timeline.prototype.getDomPos = function(dom) {
        var top = 0,
            left = 0,
            left2 = 0,
            top2 = 0,
            dw = dom.offsetWidth,
            dh = dom.offsetHeight,
            // ww = window.innerWidth ? window.innerWidth : (document.body ? document.body.clientWidth : document.documentElement.clientWidth),
            // wh = window.innerHeight ? window.innerHeight : (document.body ? document.body.clientHeight : document.documentElement.clientHeight),
            offsetParent = dom;
        while (offsetParent) {
            top += offsetParent.offsetTop;
            left += offsetParent.offsetLeft;
            offsetParent = offsetParent.offsetParent;
        }
        left2 = left + dw;
        top2 = top + dh;
        return {
            "top": top,
            "left": left,
            "top2": top2,
            "left2": left2
        };
    };
    /*
     * 计算一个dom元素所占用的宽高
     * 首先查看本身所在的位置，依次查看内层元素所在位置，如果内层元素所在位置比本身大，则置为内层元素所在位置
     * */
    Timeline.prototype.calculateSize = function(dom) {
        var $dom = $(dom),
            self = this;
        var initPos = self.getDomPos(dom),
            $child = $dom.children();

        function calInner($child) {
            $child.each(function(index, ch) {
                var $ch = $(ch);
                if ($ch.css("position") != "static") {
                    var chPos = self.getDomPos(ch);
                    chPos.left < initPos.left && (initPos.left = chPos.left);
                    chPos.top < initPos.top && (initPos.top = chPos.top);
                    chPos.left2 > initPos.left2 && (initPos.left2 = chPos.left2);
                    chPos.top2 > initPos.top2 && (initPos.top2 = chPos.top2);
                    if ($ch.children().length > 0) {
                        calInner($ch.children());
                    }
                }
            });
        }
        if ($child.length > 0) {
            calInner($child);
        }
        return initPos;
    };
    /*
     * 鼠标拖动效果
     * 当鼠标往左拖动或者往右拖动超出屏幕的一般的时候，不能继续拖动
     * */
    Timeline.prototype.dragTimeline = function(dom, event, initPageX, curLeft) {
        var self = this,
            evt = event || window.event,
            $dom = $(dom),
            pageX = evt.pageX,
            $timer = $_this.find(".timeline_time"),
            $nav = $_this.find(".timeline_abstract"),
            halfWw = $(window).width() / 2,
            navW = $nav.width();
        self.pausePlay();
        self.dragPause = true;
        if (pageX != initPageX) {
            var finalLeft = 0;
            /* if(pageX - initPageX > 0) {  //鼠标向右滑，查看过去的时间轴
                finalLeft = curLeft + (pageX - initPageX);
            } else {  //鼠标向左滑，查看未来的时间轴
                finalLeft = curLeft + (pageX - initPageX);
            }*/
            finalLeft = curLeft + (pageX - initPageX);
            if (finalLeft > halfWw) { //超出左边的一半
                finalLeft = halfWw;
            }
            if (-finalLeft > (navW + halfWw)) { //超出右边的一半
                finalLeft = -(navW + halfWw);
            }
            $timer.css("left", finalLeft + "px");
            $nav.css("left", finalLeft + "px");
            //重置一下高亮区域的位置
            var navPos = self.calculateSize(self.$curNews.get(0));
            self.$hightlight.css("left", navPos.left);
        }
    };
    //计算
    //计算两个时间的相距的分钟数 参数为 Date 格式，第三个参数为几分钟
    Timeline.prototype.timeDistance = function(startDate, endDate, num) {
        var sStamp = Date.parse(startDate),
            eStamp = Date.parse(endDate);
        var sToE = eStamp - sStamp,
            sToEMinute = (sToE / (num * 60 * 1000));
        return {
            stamp: sToE,
            minute: sToEMinute
        }
    };
    /*
     * 跳转到第一条
     * */
    Timeline.prototype.goToFirst = function() {
        this.goTo(1, 'news');
    };
    /*
     * 跳转到最后一条
     * */
    Timeline.prototype.goToLast = function() {
        this.goTo(this.navNum, 'nav');
    };
    /*
     * 跳转到特定的nav面板/新闻，传过来的index是以1为基数的
     * tag=news跳到第几条新闻，=nav跳到第几个面板
     * */
    Timeline.prototype.goTo = function(index, tag) {
        var self = this,
            $navs = self.$navPa.children(".tlnav"),
            $contents = self.$contentPa,
            $contentLi = $contents.children(".timeline_one_content"),
            $nav = null,
            $content = null;
        //暂停其他动画效果
        self.pausePlay();
        self.trigger("beforeLunbo");
        var actualIndex = 0;
        if (index > 0) {
            actualIndex = index - 1;
        } else if (tag == 'news') { //从后面开始计算并且为news的情况
            actualIndex = self.totalNum + index;
        } else { //从后面开始计算并且为nav的情况
            actualIndex = self.navNum + index;
        }
        var data = self.data,
            len = self.navNum;
        var newsIndex = 0,
            newsInnerIndex = 0; //新闻在内容区的序号
        if (tag == 'news') { //第几条新闻就是实际的第几个nav，需要将新闻所在面板的序列号记录下来
            $nav = $navs.eq(actualIndex);
            $content = $contents.find(".timeline_inner_uls li").eq(actualIndex).parent().parent().parent();
            for (var j = 0; j < len; j++) {
                newsIndex += data[j].data.length;
                if (actualIndex < newsIndex) {
                    newsInnerIndex = data[j].data.length - (newsIndex - actualIndex);
                    break;
                }
            }
        } else {
            //根据数据判断出当前处于哪个新闻上
            for (var i = 0; i < len; i++) {
                if (i == actualIndex) {
                    break;
                }
                newsIndex += data[i].data.length;
            }
            //将actualIndex置为数据的索引
            $nav = (newsIndex == 0) ? $navs.eq(0) : $navs.eq(newsIndex);
            $content = $contents.find(".timeline_inner_uls li").eq(newsIndex).parent().parent().parent();
        }
        self.$an_hide_contentli = $contentLi.filter(".cur");
        self.$an_show_content = $content;
        $nav.is(":hidden") && $nav.show();
        //将前面的

        //保存初始的当前数据和当前时间点
        self.$curContent = $content;
        self.curNavIndex = $content.index();
        self.$curNews = $nav;
        self.curIndex = $nav.index();
        //将$nav置为所在时间点的最高z-index
        self.setNavZIndex($nav);
        //设置时间轴和面板轴的位置
        self.setTimelinePos();
        //内容区域
        if (!$content.hasClass("cur")) {
            //判断一下是下一个时间点还是上一个是时间点
            var contentCurIndex = $contentLi.filter(".cur").index(),
                showIndex = $content.index(),
                curLeft = "-100%";
            if ((contentCurIndex > showIndex && (showIndex != 0)) || (contentCurIndex == 0 && (showIndex == (self.navNum - 1)))) { //上一张
                $content.css("left", "-100%");
                curLeft = "100%";
            }
            self.$an_hide_contentli.animate({
                "left": curLeft
            }, options.animateTime, function() {
                $(this).css("left", "100%").removeClass("cur");
                //将上一个内容区域的li置为初始状态（第一条显示，其余的不显示）
                self.resetHidingCon();
                self.resetNavs();
            });
            self.showIndexData($content, newsInnerIndex);
            $content.animate({
                "left": 0
            }, options.animateTime, function() {
                $(this).addClass("cur");
                self.startLunbo();
                self.trigger("afterLunbo");
            });
        } else {
            if ($content.find(".timeline_inner_uls li.active").index() != newsIndex) { //处于当前时间点，但是不是想要的内容时
                var idNo = $content.find(".timeline_inner_uls li.active").attr("id").replace("content_id_", "");
                self.$an_hide_nav = self.$navPa.find("#nav_id_" + idNo);
                self.innerCarousel();
            }
        }
    };
    /*
     * 显示某个面板下的第index条数据
     */
    Timeline.prototype.showIndexData = function($content, index) {
        var $childs = $content.find(".timeline_inner_uls li"),
            $orders = $content.find(".timeline_inner_orders li"),
            $cur = $childs.filter(".active"),
            curIndex = $cur.index();
        if (curIndex != index) {
            $cur.css("top", "-100%").removeClass("active");
            $childs.eq(index).addClass("active").css("top", "0");
            $orders.removeClass("active").eq(index).addClass("active");
        }
    };
    /*
     * 重置刚刚隐藏的的内容区域子元素的位置
     * */
    Timeline.prototype.resetHidingCon = function() {
        var self = this,
            $hidingCon = self.$an_hide_contentli,
            $chs = $hidingCon.find(".timeline_inner_uls li"),
            $chActive = $chs.filter(".active"),
            activeIndex = $chActive.index(),
            chLen = $chs.length;
        if (!(chLen === 1 || (activeIndex == 0))) {
            $chActive.removeClass("active").css("top", "-100%");
            $chs.eq(0).addClass("active").css("top", 0);
            $hidingCon.find(".timeline_inner_orders li").filter(".active").removeClass("active").end().eq(0).addClass("active");
        }
    };
    /*
     * 给timeline添加自定义事件
     * */
    Timeline.prototype.on = function(type, fun) {
        var self = this;
        self["on" + type] = fun;
    };
    /*
     * 触发某一事件
     * */
    Timeline.prototype.trigger = function(type, args) {
        var self = this;
        self["on" + type] && (self["on" + type] instanceof Function) && self["on" + type](args);
    };
    /*
     * 设置nav的z-index值，置为全部的nav的最大值
     * */
    Timeline.prototype.setNavZIndex = function($nav) {
        var self = this,
            $navs = self.$navPa.children(".tlnav"),
            navLen = $navs.length,
            // navInnerLen = self.$curContent.find(".timeline_inner_uls li").length,
            maxIndex = 1;
        //,actualIndex = $nav.index()
        for (var a = 0; a < navLen; a++) {
            var $navI = $navs.eq(a); //actualIndex + a - newsInnerIndex内部的
            var indexI = parseInt($navI.css("z-index"));
            maxIndex < indexI && (maxIndex = indexI);
        }
        $nav.css("z-index", maxIndex + 1);
    };

    /*
     * 设置高亮区域的大小，在nav区域内切换的时候，只改变了高度和top值
     * */
    Timeline.prototype.setHighlightSize = function() {
        var self = this,
            $nav = self.$curNews,
            navPos = self.calculateSize($nav.get(0)),
            curH = parseInt(self.$hightlight.outerWidth());
        if (curH == (navPos.top2 - navPos.top)) {
            return false;
        }
        self.$hightlight.animate({
            "height": navPos.top2 - navPos.top,
            "top": navPos.top
        }, options.animateTime / 8);
    };
    /*
     * 恢复移位过的面板
     * */
    Timeline.prototype.resetNavs = function() {
        var self = this,
            $nav = self.$curNews;
        $nav.siblings(".moved").each(function(index, dom) {
            var $dom = $(dom);
            self.resetNav($dom);
            $dom.show();
        });
    };
    /*
     * 单个nav复位
     * */
    Timeline.prototype.resetNav = function($dom) {
        $dom.css({
            "z-index": 1,
            "top": 0,
            "opacity": 1,
            "left": parseInt($dom.css("left")) + 100 + "px"
        }).removeClass("moved");
    };
    /*
     * 开始下一个面板的播放
     * */
    Timeline.prototype.nextNav = function() {
        var self = this,
            $content = self.$curContent;
        if ($content.next().length == 1) { //如果有下一个的话
            self.goTo(self.curNavIndex + 2, 'nav'); //goTo以1位基数
        } else if (options.loop) { //到达最后，如果允许循环的话
            self.goTo(1, 'nav');
        }
    };

    /*
     * 跳到上一个面板
     * */
    Timeline.prototype.prevNav = function() {
        var self = this,
            $content = self.$curContent;
        if ($content.prev().length == 1) { //如果有下一个的话
            $content.prev().css("left", "-100%");
            self.goTo(self.curNavIndex, 'nav'); //goTo以1位基数
        } else if (options.loop) { //到达最后，如果允许循环的话
            $content.eq(self.navNum - 1).css("left", "-100%");
            self.goTo(self.navNum, 'nav');
        }
    };

    /*
     * 播放下一条数据
     * */
    Timeline.prototype.nextData = function() {
        var self = this,
            $curNav = self.$curNews,
            index = $curNav.index();
        if (index + 1 == self.totalNum) {
            self.goToFirst();
        } else {
            self.goTo(index + 2, 'news');
        }
    };

    /*
     * 播放上一条数据
     * */
    Timeline.prototype.prevData = function() {
        var self = this,
            $curNav = self.$curNews,
            index = $curNav.index();
        if (index == 0) {
            self.goTo(self.totalNum, 'news');
        } else {
            self.goTo(index, 'news');
        }
    };

    /*
     * 内部的轮播动画
     * */
    Timeline.prototype.innerCarousel = function() {
        var self = this,
            $nav = self.$curNews,
            navIndex = $nav.index(),
            $curContentCh = self.$curContent,
            $calCon = $curContentCh.find(".timeline_inner_uls"),
            $calChs = $calCon.children("li"),
            $orderCon = $curContentCh.find(".timeline_inner_orders"),
            $orderChs = $orderCon.children("li");
        var innerIndex = self.$content.find(".timeline_inner_uls li").eq(navIndex).index();
        var animateTime = options.animateTime;
        //内容的轮播
        self.$an_hide_contentCh = $calChs.filter(".active");
        self.$an_show_contentCh = $calChs.eq(innerIndex);
        self.$an_hide_contentCh.animate({
            "top": "-100%"
        }, animateTime, function() {
            $(this).removeClass("active");
        });
        self.$an_show_contentCh.animate({
            "top": "0"
        }, animateTime, function() {
            $(this).addClass("active");
            $orderChs.removeClass("active").eq(innerIndex).addClass("active");
        });
        //面板的操作
        self.navAnimate();
    };

    /*
     * 面板轴的动画
     * */
    Timeline.prototype.navAnimate = function() {
        var self = this,
            $dom = self.$an_hide_nav,
            animateTime = options.animateTime;
        $dom.show().addClass("moved").css("z-index", 1003).animate({
            "top": "100px"
        }, animateTime / 2, function() {
            $(this).animate({
                "left": parseInt($(this).css("left")) - 100 + "px",
                "opacity": 0.3
            }, animateTime / 2, function() {
                $(this).hide();
                self.resetNav($dom);
                self.setHighlightSize();
                //重置当前数据
                self.setNavZIndex(self.$curNews);
                self.startLunbo();
                self.trigger("afterLunbo");
            });
        });
    };

    /*
     * 开始轮播
     * */
    Timeline.prototype.startLunbo = function() {
        var self = this;
        if (options.autoplay) {
            self.timer = setTimeout(function() {
                self.nextData();
            }, options.interval);
        }
    };

    /*
     * 暂停播放，包括内部和整体
     * */
    Timeline.prototype.pausePlay = function() {
        var self = this;
        self.rePlayTimer && clearTimeout(self.rePlayTimer);
        self.timer && clearTimeout(self.timer);
        //停止动画效果，立刻执行到最后
        self.$an_hide_contentli && self.$an_hide_contentli.stop(true, true);
        self.$an_show_content && self.$an_show_content.stop(true, true);
        self.$an_hide_contentCh && self.$an_hide_contentCh.stop(true, true);
        self.$an_show_contentCh && self.$an_show_contentCh.stop(true, true);
        self.$an_hide_nav && self.$an_hide_nav.stop(true, true);
    };
    /*
     * 重新开始播放
     * */
    Timeline.prototype.restartPlay = function() {
        var self = this;
        if (!options.autoplay) { //如果没有开启自动播放，直接不执行下面的方法
            return false;
        }
        self.pausePlay();
        self.rePlayTimer = setTimeout(function() {
            self.goTo(self.curIndex + 2, 'news');
        }, options.replayDelay);
    };

    /*
     * 获取时间值格式为
     * {total: "YYYY-MM-dd HH:mm:ss", hour: h, minute: m, s:0}
     * */
    Timeline.prototype.formatTime = function(dateObj) {
        var fYear = dateObj.year,
            fMonth = dateObj.month,
            fDay = dateObj.day,
            fHour = dateObj.hour ? dateObj.hour : "0",
            fMinute = dateObj.minute ? dateObj.minute : "0",
            fSecond = '0';
        return {
            total: fYear + "-" + fMonth + "-" + fDay + " " + fHour + ":" + fMinute + ":" + fSecond,
            parts: {
                year: fYear,
                month: fMonth,
                day: fDay,
                hour: fHour,
                minute: fMinute,
                second: fSecond
            }
        }
    };
    /*
     * 解析完数据后开始添加dom节点
     * */
    Timeline.prototype.initialize = function(opts) {
        var self = this;
        if ($_this.children(".timeline_content").length === 0) {
            $_this.append("<div class='timeline_content'><ul class='timeline_inner_content'></ul></div>");
        }
        if ($_this.children(".timeline_highlight").length === 0) {
            $_this.append('<div class="timeline_highlight"></div>');
        }
        if ($_this.children(".timeline").length === 0) {
            $_this.append('<div class="timeline"><div class="timeline_page"><p>一共有<span class="timeline_total">...</span>条数据</p><p>一共<span class="timeline_times">...</span>个时间点有数据</p><div class="timeline_start timeline_control disabled">开始</div><div class="timeline_pause timeline_control disabled">暂停</div><div class="timeline_replay timeline_control disabled">结束</div><div class="timeline_second_control">跳到<input type="number" class="timeline_page_num" min="1" value="1">条<button class="timeline_page_btn disabled">确定</button></div><div class="timeline_third_control">跳到                <input type="number" id="timeline_nav_num" class="timeline_page_num" min="1" value="1">条面板<button id="timeline_nav_btn" class="timeline_page_btn disabled">确定</button></div></div><div class="timeline_nav"><div class="timeline_time"></div><div class="timeline_abstract"></div></div><div class="timeline_modal"></div></div>');
        }
        // 添加说明面板
        if (options.info && $_this.children(".timeline_info").length === 0) {
            $_this.append('<div class="timeline_info"><div class="timeline_close">×</div><div class="timeline_degreeout"><span class="timeline_degree_one timeline_degree"></span><label>一级</label></div><div class="timeline_degreeout"><span class="timeline_degree_two timeline_degree"></span><label>二级</label></div><div class="timeline_degreeout"><span class="timeline_degree_three timeline_degree"></span><label>三级</label></div><div class="timeline_degreeout"><span class="timeline_degree_four timeline_degree"></span><label>四级</label></div></div>');
        }
        self.$start = $_this.find(".timeline_start").eq(0);
        self.$replay = $_this.find(".timeline_replay").eq(0);
        self.$pause = $_this.find(".timeline_pause").eq(0);
        self.$goBtnPage = $_this.find("#timeline_page_btn").eq(0);
        self.$iptPage = $_this.find("#timeline_page_num").eq(0);
        self.$goBtnNav = $_this.find("#timeline_nav_btn").eq(0);
        self.$iptNav = $_this.find("#timeline_nav_num").eq(0);
        self.$content = $_this.find(".timeline_inner_content").eq(0);
        self.$prev = $_this.find(".timeline_prev").eq(0);
        self.$next = $_this.find(".timeline_next").eq(0);
        self.$hightlight = $_this.find(".timeline_highlight").eq(0);
        var now = new Date(),
            nYear = now.getFullYear(),
            nMonth = now.getMonth() + 1,
            nDay = now.getDate();
        if (opts.tag) {
            var data = opts.data,
                first = data[0].start_date,
                last = data[data.length - 1].start_date;
            self.startDate = self.formatTime(first).parts;
            self.endDate = self.formatTime(last).parts;
        } else {
            self.startDate = {
                year: nYear,
                fMonth: nMonth,
                fDay: nDay,
                hour: "0",
                minute: "0",
                second: "0"
            };
            self.endDate = {
                year: nYear,
                fMonth: nMonth,
                fDay: nDay,
                hour: "23",
                minute: "59",
                second: "59"
            };
        }
        self.defaultDraw(1);
    };

    /*
     * 判断一个按钮是否可点击
     * */
    Timeline.prototype.btnClick = function($btn, fun) {
        if ($btn.hasClass("disabled")) {
            return false;
        } else {
            fun && fun();
        }
    };
    Timeline.prototype.closeInfo = function() {
        var $info = $_this.find(".timeline_info"),
            w = $info.outerWidth();
        $info.animate({
            left: -w + "px"
        }, 300, function() {
            $info.remove();
        });
    };
    //开始时间轴
    Timeline.prototype.init = function() {
        var self = this;
        var $ipt = $_this.find("#timeline_page_num").eq(0);
        var $ipt2 = $_this.find("#timeline_nav_num").eq(0);
        self.checkData();
        self.goTo(options.start, options.startType);
        //绑定拖拽事件
        $_this.delegate(".timeline_modal", "mousedown", function(event) {
            var evt = event || window.event,
                initPageX = evt.pageX;
            var curLeft = parseInt($_this.find(".timeline_time").css("left"));
            $(this).bind("mousemove", function(event) {
                self.dragTimeline(this, event, initPageX, curLeft);
            });
        });
        $(document).bind("mouseup", function() {
            $_this.find(".timeline_modal").unbind("mousemove");
            //如果开启了自动播放功能，则开始
            if (self.dragPause) {
                self.restartPlay();
                self.dragPause = false;
            }
        });
        //当窗口发现变化时，重置一下时间轴和面板轴的位置
        $(window).bind("resize", function() {
            self.defaultDraw(2);
        });
        //绑定跳转事件
        $_this.delegate(".timeline_start", "click", function() { //开始
            self.btnClick($(this), function() {
                self.goTo(1);
            });
        });
        $_this.delegate(".timeline_end", "click", function() { //结束
            self.btnClick($(this), function() {
                self.goTo(self.navNum);
            });
        });
        $_this.delegate("#timeline_page_btn", "click", function() { //特殊特定页面
            self.btnClick($(this), function() {
                var index = parseInt($ipt.val());
                if (index < -self.totalNum || (index > self.totalNum) || (index == 0)) {
                    alert("请输入合适的页码！");
                } else {
                    self.goTo(index, 'news');
                }
            });
        });
        $_this.delegate("#timeline_nav_btn", "click", function() { //特殊特定页面
            self.btnClick($(this), function() {
                var index = parseInt($ipt2.val());
                if (index < -self.navNum || (index > self.navNum) || (index == 0)) {
                    alert("请输入合适的页码！");
                } else {
                    self.goTo(index, 'nav');
                }
            });
        });
        // 关闭说明图层
        $_this.delegate(".timeline_close", "click", function() {
            self.closeInfo();
        });
        //开始轮播
        $_this.delegate(".timeline_start", "click", function() {
            self.goToFirst(); //从第一条数据开始播放
        });
        //暂停轮播
        $_this.delegate(".timeline_pause", "click", function() {
            self.pausePlay();
        });
        //重启轮播
        $_this.delegate(".timeline_replay", "click", function() {
            self.restartPlay();
        });
        /*上一时间点*/
        $_this.delegate(".timeline_prev", "click", function() {
            self.btnClick($(this), function() {
                self.prevNav();
            });
        });
        /*下一时间点*/
        $_this.delegate(".timeline_next", "click", function() {
            self.btnClick($(this), function() {
                self.nextNav('nav');
            });
        });
        /*同一时间点的轮播*/
        $_this.delegate(".timeline_inner_order", "mouseover", function() {
            var $this = $(this),
                selfIndex = $this.index();
            self.pausePlay();
            if ($this.hasClass("active")) {
                return false;
            }
            var paIndex = $this.parent().parent().parent().index(),
                data = self.data,
                actualIndex = 0;
            for (var i = 0; i < paIndex; i++) {
                actualIndex += (data[i].data.length);
            }
            self.goTo(actualIndex + selfIndex + 1, 'news');
        });
        $_this.delegate(".timeline_inner_order", "mouseleave", function() {
            self.restartPlay();
        });
        /*点击面板显示相应的数据*/
        $_this.delegate(".tlnav", "click", function() {
            var $this = $(this),
                index = $this.index() + 1;
            self.pausePlay();
            self.goTo(index, 'news');
        });
    };
    var timeline = new Timeline();
    timeline.init();
    return timeline;
};