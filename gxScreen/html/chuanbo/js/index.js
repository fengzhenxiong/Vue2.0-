/**
 * Created by zyl on 2019/3/26
 */
function App() {
    var self = this;
    // this.timer = null;
    // 所有数据列表
    this.$allList = {
        dom: $('#allList'),
        $liMarquee: null,
        data: {}
    };
    this.$appList = {
        dom: $('#appList'),
        $liMarquee: null,
        data: {}
    }
    this.$wzList = {
        dom: $('#wzList'),
        $liMarquee: null,
        data: {}
    }
    this.$wbList = {
        dom: $('#wbList'),
        $liMarquee: null,
        data: {}
    }
    this.$wxList = {
        dom: $('#wxList'),
        $liMarquee: null,
        data: {}
    }
    this.liMarqueeOption = {
        direction: 'up',
        drag: true,
        scrollamount: 10
    }
    this.jqmOption = {
        closeOnEsc: true
    }
    // echarts 配置项
    this.chartOption = {
        pie: {
            title: {
                show: false
            },
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)",
                confine: true,   //防止tooltip 超出
            },
            legend: {
                show: false
            },
            series: [
                {
                    name: '',
                    type: 'pie',
                    radius: ['20%', '40%'],
                    center: ['50%', '60%'],
                    label: {
                        normal: {
                            formatter: function formatter(v) {
                                var text = v.name;
                                return text.length < 3 ? text : text.slice(0, 3) + '\n' + text.slice(3);
                            }
                        }
                    },
                    data: [],
                }
            ]
        },
        colorList: ['#7fc6ff', '#ffa67f', '#c77fff', '#ffd97f', '#5dd4ea', '#ff827f', '#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'],
        categories: [
            {
                name: "移动端", // 7
                value: 7
            },
            {
                name: "网站",   // 1
                value: 1
            },
            {
                name: "微博",   // 4
                value: 4
            },
            {
                name: "微信",   // 8
                value: 8
            },
            {
                name: "电子报",   // 5
                value: 5
            },
            {
                name: "未知",   // undefined
                value: undefined
            },
            {
                name: "来源为空",   // null
                value: null
            },
        ],
    };
    this.charts = {
        leftPieChart: null,
        rightPieChart: null,
        graphChart: null,
    }

    /*  this.requestDataTask = new TimedTask(function () {
     self.getAlldocList();
     return (10 * 60 * 1000);   // 10 分钟
     }, 0);*/
    // this.requestDataTask.start();

    self.bindJQevent()
    self.render()
};
// 绑定JQ事件
App.prototype.bindJQevent = function () {
    var self = this;
    var echartDlgHide = function (hash) {
        // 默认判断，不可删
        if (hash.w.hide() && hash.o) {
            // 关闭echarts 弹窗时，清空echarts
            if (self.isEchartsInst('echartGraph')) {
                self.charts.graphChart.dispose();
                self.charts.graphChart = null;
            }
            if (self.isEchartsInst('echartLeftPie')) {
                self.charts.leftPieChart.dispose();
                self.charts.leftPieChart = null;
            }
            if (self.isEchartsInst('echartRightPie')) {
                self.charts.rightPieChart.dispose();
                self.charts.rightPieChart = null;
            }
            hash.o.remove();
        }
        return true;
    }
    var navList = function () {
        var val = $(this).data('val')
        $(this).addClass("check").siblings().removeClass("check");
        self.getAlldocList(val);
    }
    var clickMore = function () {
        var val = $(this).data('val');
        var data = [];
        var title = '';
        var $moreDlg = $('#moreDialog');
        var $ul = $moreDlg.find('.dlgbody ul');
        switch (val) {
            case 1:
                data = self.$wzList.data;
                title = '网站';
                break;
            case 4:
                data = self.$wbList.data;
                title = '微博';
                break;
            case 8:
                data = self.$wxList.data;
                title = '微信';
                break;
            default:
                data = self.$appList.data;
                title = '移动端';
        }
        console.log(val, "点击更多", data);

        console.log(self.$wxList.data, "********************")
        $moreDlg.find('.dlgTitle .logo img')[0].src = self.getLogo(val);
        $moreDlg.find('.dlgTitle .title').text(title);
        $ul.html('');
        self.renderMoreDlg(data).then(function (html) {
            $ul.html(html);
            $moreDlg.jqm(self.jqmOption).jqmShow();
        })
    }
    var wbOrwxList = function () {
        var $this = $(this);
        var id = $this.data('id');
        var type = $this.data('clicktype');
        console.log(id, type)
        var data = self.getItem(id, type)
        console.log(data, "点击 微博 微信文章详情")
        var imgSrc = '';
        var spaninterval = '';
        var $wbOrwxDlg = $('#wbOrwxDlg')
        var $dlgTitle = $wbOrwxDlg.find('.dlgTitle');
        var $dlgbody = $wbOrwxDlg.find('.dlgbody');
        if (data.type === 4) {  //微博
            spaninterval = '转发量';
            imgSrc = './images/weibo.png';
        } else {
            spaninterval = '阅读量';
            imgSrc = './images/weixin.png';
        }
        var title = self.htmlRestore(data.title)
        var str = '<span class="logo">' +
            '<img src="' + imgSrc + '" />' +
            '</span>' +
            '<span class="form omg">' + data.siteName + '</span>' +
            '<div class="info omg">' +
            '<span class="type">' + spaninterval + '</span>' +
            '<span class="count omg">' + data.count + "</span>" +
            '<span>发布时间</span>' +
            '<span>' + data.pubTime + '</span>' +
            '</div>' +
            '<span class="jqmClose"></span>' +
            '<p class="ptitle omg">' +
            '<a href="' + data.url + '" target="_blank">' + title + '</a>' +
            '</p>';
        $dlgTitle.html(str);
        $dlgbody.html('')
        self.getWbOrwxContent(data.docId).then(function (_html) {
            // console.log('处理后的html', _html)
            $dlgbody.html(_html)
            $wbOrwxDlg.jqm(self.jqmOption).jqmShow();
        })
    }
    var clickChart = function () {
        var $this = $(this);
        var id = $this.data('id');
        var type = $this.data('clicktype');
        var data = self.getItem(id, type);
        var leftPieUrl = serverDomain + '/datas/api/cas/docdetail/getMediaIndex';
        var rightPieUrl = serverDomain + '/datas/api/cas/docdetail/getMediaReprintTypeCount';
        console.log(data, "总版、移动端、网站")
        var $echartDlg = $('#echartDlg');
        var $echartDlgArticle = $echartDlg.find('#echartDlgArticle');
        // 先清空
        $echartDlgArticle.html('');

        $echartDlg.find('.ptitle.omg').html('<a href="' + data.url + '" target="_blank">' + data.title + '</a>')

        $echartDlg.jqm({
            closeOnEsc: true,
            onHide: echartDlgHide,
        }).jqmShow();

        self.getEchartListContent(data.docId).then(function (_html) {
            $echartDlgArticle.html(_html)
        })
        window.setTimeout(function () {
            var leftPieChart = self.charts.leftPieChart = echarts.init(document.getElementById('echartLeftPie'));
            var rightPieChart = self.charts.rightPieChart = echarts.init(document.getElementById('echartRightPie'));
            var graphChart = self.charts.graphChart = echarts.init(document.getElementById('echartGraph'));
            leftPieChart.showLoading();
            rightPieChart.showLoading();
            graphChart.showLoading();
            // 画左边饼图
            self.getPieData(data.docId, leftPieUrl).then(function (_data) {
                leftPieChart.hideLoading();
                self.drawPie(leftPieChart, _data);
            })
            // 画右边饼图
            self.getPieData(data.docId, rightPieUrl).then(function (_data) {
                rightPieChart.hideLoading();
                self.drawPie(rightPieChart, _data);
            })
            // 画关系图
            self.getGraphData(data.docId).then(function (_data) {
                graphChart.hideLoading();
                self.drawGraph(graphChart, _data)
            })
        }, 0)
    }

    // 切换本日/本周
    $('.navList').on('click', debounce(navList))
    // 绑定点击“更多”
    $('.clickMore').on('click', debounce(clickMore))
    // 点击 微博 微信文章详情
    $('.wbOrwxList').on('click', '.wbOrwxLi', debounce(wbOrwxList))
    // 点击 总版、移动端、网站
    $('.echartList').on('click', 'li', debounce(clickChart))

}

// 渲染
App.prototype.render = function () {
    this.getAlldocList('week');
    this.getAppdocList();
    this.getWzdocList();
    this.getWbdocList();
    this.getWxdocList();
}
// 获取总版
App.prototype.getAlldocList = function (dateType) {
    var self = this;
    var startTime = '';
    var endTime = '';
    // 一周
    if (dateType === 'week') {
        startTime = this.getDate(-7);
        endTime = this.getDate(-1);
    } else {
        startTime = this.getDate(-1);
        endTime = this.getDate(0);
    }
    console.log(startTime, endTime)
    this.loading(self.$allList.dom, true);
    if (self.$allList.$liMarquee) {
        self.$allList.$liMarquee.liMarquee('destroy');
    }
    self.$allList.data = {};
    var params = {
        startTime: startTime,
        endTime: endTime,
        pageNum: 0,
        pageSize: 10,
    }
    self.requestList1(params).done(function (res) {
        if (res.data !== '' && self.hasKey(res.data, 'content') && res.data.content.length > 0) {
            self.loading(self.$allList.dom, false)
            var content = res.data.content;
            console.log(content, "获取的总版数据")
            self.renderAllList(content).then(function () {
                // 滚动效果
                self.$allList.$liMarquee = self.$allList.dom.liMarquee(self.liMarqueeOption);
            })
        } else {
            console.log('获取总版出错')
            self.loading(self.$allList.dom, false)
        }
    }).fail(function (err) {
        console.log(err, "请求出错")
        self.loading(self.$allList.dom, false)
    })
};

// 获取app数据
App.prototype.getAppdocList = function () {
    var self = this;
    var startTime = this.getDate(-7);
    var endTime = this.getDate(0);
    this.loading(self.$appList.dom, true);
    if (self.$appList.$liMarquee) {
        self.$appList.$liMarquee.liMarquee('destroy');
    }
    self.$appList.data = {};
    var params = {
        startTime: startTime,
        endTime: endTime,
        pageNum: 0,
        pageSize: 10,
        infoType: 7,
    }
    self.requestList1(params).done(function (res) {
        if (res.data !== '' && self.hasKey(res.data, 'content') && res.data.content.length > 0) {
            self.loading(self.$appList.dom, false)
            var content = res.data.content;
            self.renderAppOrWebList(content, self.$appList).then(function () {
                // 滚动效果
                self.$appList.$liMarquee = self.$appList.dom.liMarquee(self.liMarqueeOption);
            })
        } else {
            self.loading(self.$appList.dom, false)
        }
    }).fail(function (err) {
        console.log(err, "请求出错")
        self.loading(self.$appList.dom, false)
    })
};

// 获取网站数据
App.prototype.getWzdocList = function () {
    var self = this;
    var startTime = this.getDate(-7);
    var endTime = this.getDate(0);
    this.loading(self.$wzList.dom, true);
    if (self.$wzList.$liMarquee) {
        self.$wzList.$liMarquee.liMarquee('destroy');
    }
    self.$wzList.data = {};
    var params = {
        startTime: startTime,
        endTime: endTime,
        pageNum: 0,
        pageSize: 10,
        infoType: 1,
    }
    self.requestList1(params).done(function (res) {
        if (res.data !== '' && self.hasKey(res.data, 'content') && res.data.content.length > 0) {
            self.loading(self.$wzList.dom, false)
            var content = res.data.content;
            self.renderAppOrWebList(content, self.$wzList).then(function () {
                // 滚动效果
                self.$wzList.$liMarquee = self.$wzList.dom.liMarquee(self.liMarqueeOption);
            })
        } else {
            self.loading(self.$wzList.dom, false)
        }
    }).fail(function (err) {
        console.log(err, "请求出错")
        self.loading(self.$wzList.dom, false)
    })
};

// 获取微博数据
App.prototype.getWbdocList = function () {
    var self = this;
    var startTime = this.getDate(-7);
    var endTime = this.getDate(0);
    this.loading(self.$wbList.dom, true);
    if (self.$wbList.$liMarquee) {
        self.$wbList.$liMarquee.liMarquee('destroy');
    }
    self.$wbList.data = {};
    var params = {
        startTime: startTime,
        endTime: endTime,
        pageNum: 0,
        pageSize: 10,
        infoType: 4,
    }
    self.requestList2(params).done(function (res) {
        // 获取微博数据
        console.log(res, '获取微博数据')
        if (res.data !== '' && self.hasKey(res.data, 'content') && res.data.content.length > 0) {
            self.loading(self.$wbList.dom, false)
            var content = res.data.content;
            self.renderWbOrWxList(content, self.$wbList, params.infoType).then(function () {
                // 滚动效果
                self.$wbList.$liMarquee = self.$wbList.dom.liMarquee(self.liMarqueeOption);
            })
        } else {
            self.loading(self.$wbList.dom, false)
        }
    }).fail(function (err) {
        console.log(err, "请求出错")
        self.loading(self.$wbList.dom, false)
    })
};

// 获取微信数据
App.prototype.getWxdocList = function () {
    var self = this;
    var startTime = this.getDate(-7);
    var endTime = this.getDate(0);
    this.loading(self.$wxList.dom, true);
    if (self.$wxList.$liMarquee) {
        self.$wxList.$liMarquee.liMarquee('destroy');
    }
    self.$wxList.data = {};
    var params = {
        startTime: startTime,
        endTime: endTime,
        pageNum: 0,
        pageSize: 10,
        infoType: 8,
    }
    self.requestList2(params).done(function (res) {
        // 获取微博数据
        console.log(res, '获取微信数据')
        if (res.data !== '' && self.hasKey(res.data, 'content') && res.data.content.length > 0) {
            self.loading(self.$wxList.dom, false)
            var content = res.data.content;
            self.renderWbOrWxList(content, self.$wxList, params.infoType).then(function () {
                // 滚动效果
                self.$wxList.$liMarquee = self.$wxList.dom.liMarquee(self.liMarqueeOption);
            })
        } else {
            self.loading(self.$wxList.dom, false)
        }
    }).fail(function (err) {
        console.log(err, "请求出错")
        self.loading(self.$wxList.dom, false)
    })
};

// 获取微信、微博详情数据
App.prototype.getWbOrwxContent = function (_id) {
    var deffer = $.Deferred();
    var self = this;
    var errorText = '暂无数据'
    var params = {
        docId: _id,
        access_token: window.access_token
    }
    $.ajax({
        url: serverDomain + '/datas/api/cas/commondetail/getInternetContent',
        contentType: 'application/json;charset=UTF-8',
        data: params,
        method: "get",
        success: function (res) {
            console.log(res, "获取微信微博详情数据")
            if (res.code == 200 && res.data !== '' && self.hasKey(res.data, 'content')) {
                var str = res.data.content;
                if (!!str) {
                    str = self.htmlRestore(str);
                    str = self.htmlBR(str);
                    // 删除后台识别错误的 音视频、标签
                    str = str.replace(/(<\/?AUDIO.*?>)|(<\/?audio.*?>)|(<\/?VIDEO.*?>)|(<\/?video.*?>)/g, '')
                    deffer.resolve(str);
                } else {
                    deffer.reject('');
                }
            } else {
                deffer.reject(errorText);
            }
        },
        error: function () {
            deffer.reject(errorText);
        }
    });
    return deffer.promise();
}

// 获取echarts 弹窗中 的文章内容
App.prototype.getEchartListContent = function (_id) {
    var deffer = $.Deferred();
    var self = this;
    var errorText = '暂无数据'
    var params = {
        docId: _id,
        access_token: window.access_token
    }
    $.ajax({
        url: serverDomain + '/datas/api/cas/commondetail/getOriginalContent',
        contentType: 'application/json;charset=UTF-8',
        data: params,
        method: "get",
        success: function (res) {
            if (res.code == 200 && res.data !== '' && self.hasKey(res.data, 'content')) {
                var str = res.data.content;
                if (!!str) {
                    str = self.htmlRestore(str);
                    str = self.htmlBR(str);
                    // 删除后台识别错误的 音视频、标签
                    str = str.replace(/(<\/?AUDIO.*?>)|(<\/?audio.*?>)|(<\/?VIDEO.*?>)|(<\/?video.*?>)/g, '')
                    deffer.resolve(str);
                } else {
                    deffer.reject('');
                }
            } else {
                deffer.reject(errorText);
            }
        },
        error: function () {
            deffer.reject(errorText);
        }
    });
    return deffer.promise();
}

// 获取饼图数据
App.prototype.getPieData = function (_id, url) {
    var deffer = $.Deferred();
    var params = {
        docId: _id,
        access_token: window.access_token
    }
    $.ajax({
        url: url,
        contentType: 'application/json;charset=UTF-8',
        data: params,
        method: "get",
        success: function (res) {
            if (res.code == 200 && $.isArray(res.data)) {
                deffer.resolve(res.data);
            } else {
                deffer.reject([]);
            }
        },
        error: function () {
            deffer.reject([]);
        }
    });
    return deffer.promise();
}

// 获取关系图数据
App.prototype.getGraphData = function (_id) {
    var deffer = $.Deferred();
    var errorObj = {
        nodes: [],
        links: []
    }
    var params = {
        docId: _id,
        mediaUnitName: '广西日报传媒集团',
        access_token: window.access_token
    }
    $.ajax({
        url: serverDomain + '/datas/api/cas/docdetail/getPropagationPath',
        contentType: 'application/json;charset=UTF-8',
        data: params,
        method: "get",
        success: function (res) {
            console.log(res, "获取关系图数据")
            if (res.code == 200 &&
                (!$.isEmptyObject(res.data)) &&
                $.isArray(res.data.nodes) &&
                $.isArray(res.data.links)
            ) {
                deffer.resolve(res.data);
            } else {
                deffer.reject(errorObj);
            }
        },
        error: function () {
            deffer.reject(errorObj);
        }
    });
    return deffer.promise();
}

App.prototype.requestList1 = function (params) {
    var deffer = $.Deferred();
    var para = {
        mediaUnitName: '广西日报传媒集团',
        sortOrder: 'DESC',
        sortField: 'ceiIndex',
        access_token: window.access_token
    };
    para = $.extend(false, para, params);
    $.ajax({
        url: serverDomain + '/datas/api/cas/transmission/searchList',
        contentType: 'application/json;charset=UTF-8',
        data: para,
        method: "get",
        success: function (res) {
            if (res.code == 200) {
                deffer.resolve(res);
            } else {
                deffer.reject();
            }
        },
        error: function (err) {
            deffer.reject(err);
        }
    });
    return deffer.promise();
}

App.prototype.requestList2 = function (params) {
    var deffer = $.Deferred();
    var para = {
        mediaUnitName: '广西日报传媒集团',
        sortOrder: 'DESC',
        sortField: 'IR_COUNT1',
        access_token: window.access_token
    };
    para = $.extend(false, para, params);
    $.ajax({
        url: serverDomain + '/datas/api/cas/groupdoc/searchList',
        contentType: 'application/json;charset=UTF-8',
        data: para,
        method: "get",
        success: function (res) {
            if (res.code == 200) {
                deffer.resolve(res);
            } else {
                deffer.reject();
            }
        },
        error: function (err) {
            deffer.reject(err);
        }
    });
    return deffer.promise();
}

// 渲染所有数据列表
App.prototype.renderAllList = function (data) {
    var deffer = $.Deferred();
    var self = this;
    var _html = '';
    self.$allList.dom.html('');
    $.each(data, function (index, item) {
        var id = item.sid;
        if (id) {
            var arr = self.getAllListHtml(item, index);
            self.$allList.data[id] = arr[0];
            _html += arr[1]
        }
    })
    self.$allList.dom.html(_html)
    deffer.resolve();
    return deffer.promise();
}
// 渲染客户端 或者 网站列表
App.prototype.renderAppOrWebList = function (data, obj) {
    var deffer = $.Deferred();
    var self = this;
    var _html = '';
    obj.dom.html('')
    $.each(data, function (index, item) {
        var id = item.sid;
        if (id) {
            var arr = self.getAppOrWebListHtml(item, index);
            obj.data[id] = arr[0]
            _html += arr[1]
        }
    })
    obj.dom.html(_html)
    _html = null;
    deffer.resolve();
    return deffer.promise();
}
// 渲染微信 或者 微博数据
App.prototype.renderWbOrWxList = function (data, obj, type) {
    var deffer = $.Deferred();
    var self = this;
    var _html = '';
    obj.dom.html('')
    $.each(data, function (index, item) {
        var id = item.docId;
        if (id) {
            var arr = self.getWbOrWxListHtml(item, index, type);
            obj.data[id] = arr[0]
            _html += arr[1]
        }
    })
    obj.dom.html(_html)
    _html = null;
    deffer.resolve();
    return deffer.promise();
}
// 渲染 更多弹窗 html
App.prototype.renderMoreDlg = function (obj) {
    var deffer = $.Deferred();
    var self = this;
    var _html = '';
    var index = 0
    if ($.isEmptyObject(obj)) {
        _html = '<li><span>暂无数据</span></li>>'
        deffer.resolve(_html);
        return deffer.promise();
    }
    $.each(obj, function (key, item) {
        _html += self.getMoreDlgHtml(item, index);
        index++;
    })
    deffer.resolve(_html);
    return deffer.promise();
}

App.prototype.getAllListHtml = function (item, index) {
    /*
     *  title	String	false	标题
     *  sid	String	false	稿件id
     *  authors	String	false	作者
     *  urlName	String	false	文章url链接
     *  siteName 	String	false	发布站点名称
     *  channel 	String	false	频道/版面
     *  pubTime	String	false	发布时间
     *  reprints	Integer	false	总转载数
     *  ceiIndex 	Double	false	总影响力指数
     *  appReptints	Integer	false	APP总转载数
     *  epaperReprints	Integer	false	电子报渠道总转载数
     *  websiteReprints	Integer	false	网站总转载数
     *  weiboReptints	Integer	false	微博总转载数
     *  weixinReprints	Integer	false	微信总转载数
     *  data.number	Integer	false	当前页码
     *  data.numberOfElements	Integer	false	当前页大小
     *  data.size	Integer	false	分页大小
     *  data.totalElements 	Long	false	总条数
     *  data.totalPages 	Integer	false	总页数
     *  infoType 文章类型
     * */
    var info = item.siteName + '-' + item.channel;
    var _data = {
        title: item.title,
        count: Math.floor(item.ceiIndex),
        siteName: item.siteName,
        channel: item.channel,
        time: this.handleTime(item.pubTime),
        logo: this.getLogo(item.infoType),
        url: this.handleUrl(item.urlName),
        docId: item.sid,
        picture: null
    }
    var _html = '<li data-id="' + _data.docId + '" data-id="' + _data.docId + '" data-clicktype="allList">' +
        '<div class="wDiv">' +
        '<span class="theImg">' +
        '<storng>' + (index + 1) + '</storng>' +
        '</span>' +
        '<span class="word">' +
        // '<a href="' + item.urlName + '" target="_blank">' + item.title + '</a>' +
        '<a href="javascript:void(0);" target="_blank">' + _data.title + '</a>' +
        '</span>' +
        '<span class="count">' + _data.count + '</span>' +
        '</div>' +
        '<div class="aDiv2">' +
        '<span class="logo">' +
        '<img src="' + _data.logo + '" />' +
        '</span>' +
        '<span class="form">' + info + '</span>' +
        '<span class="pubTime">' + _data.time + '</span>' +
        '</div></li>';
    return [_data, _html]
}

// 返回 app 或 移动端 html 样式
App.prototype.getAppOrWebListHtml = function (item, index) {
    var info = item.siteName + '-' + item.channel;
    var _data = {
        title: item.title,
        count: Math.floor(item.ceiIndex),
        siteName: item.siteName,
        channel: item.channel,
        time: this.handleTime(item.pubTime),
        logo: this.getLogo(item.infoType),
        url: this.handleUrl(item.urlName),
        docId: item.sid,
        picture: this.getPicture(item.pictures),
        type: item.infoType,
    }
    var clicktype = item.infoType == 7 ? 'appList' : 'wzList'
    var _html = '<li data-id="' + _data.docId + '" data-id="' + _data.docId + '" data-clicktype="' + clicktype + '">' +
        '<div class="imgcon">' +
        '<img src="' + _data.picture + '" />' +
        '<span class="theImg">' +
        '<storng>' + (index + 1) + '</storng>' +
        '</span>' +
        '</div>' +
        '<div class="contentbox">' +
        '<div class="nav1">' +
        '<span class="listspan2">' + _data.title + '</span>' +
        '<span class="listspan3">' + _data.count + '</span>' +
        '</div>' +
        '<div class="nav2">' +
        '<span class="logo">' +
        '<img src="' + _data.logo + '" />' +
        '</span>' +
        '<span class="listspan5">' + info + '</span>' +
        '<span class="listspan6">' + _data.time + '</span>' +
        '</div>' +
        '</div></li>'
    return [_data, _html];
}

App.prototype.getWbOrWxListHtml = function (item, index, type) {
    /* data.number	Integer	false	当前页码
     * data.numberOfElements	Integer	false	当前页大小
     * data.size	Integer	false	分页大小
     * data.totalElements 	Long	false	总条数
     * data.totalPages 	Integer	false	总页数
     * data.content			数据对象列表信息
     * title	String	false	标题
     * docId	String	false	稿件id
     * authors	String	false	作者
     * urlName	String	false	文章url链接
     * pubTime	String	false	发布时间
     * siteName	String	false	站点名称
     * srcName	String	false	来源
     * channel 	String	false	频道/版面
     * isoriginal	String	true	是否原创（1：原创，0或2为非原创）
     * count2	String	true	评论数
     * banmian	String	true	版面
     * banxu	String	true	版序
     * count3	String	true	点赞数
     * readcount	String	true	新闻的浏览量、论坛的点击数、微博的转发数、微信阅读数
     * count4	String	true	分享数
     * pictures                 图片地址（多个图片用“;”分割）
     * */
    var spaninterval = '';
    var clicktype = '';
    if (type === 4) {
        spaninterval = '转发';
        clicktype = 'wbList'
    } else {
        spaninterval = '阅读';
        clicktype = 'wxList'
    }
    spaninterval = spaninterval + ' ' + Math.floor(item.readcount)
    var _data = {
        title: !!item.title ? item.title.replace(/&nbsp;/ig, '') : '',
        count: Math.floor(item.readcount),
        siteName: item.siteName,
        channel: item.channel,
        time: this.handleTime2(item.loadTime),
        logo: this.getLogo(type),
        url: this.handleUrl(item.urlName),
        docId: item.docId,
        picture: this.getPicture(item.pictures),
        type: type,
        pubTime: item.pubTime
    }
    var _html = '<li class="wbOrwxLi" data-id="' + _data.docId + '" data-clicktype="' + clicktype + '"> ' +
        '<div class="imgcon">' +
        '<img src="' + _data.picture + '" />' +
        '<span class="theImg">' +
        '<storng>' + (index + 1) + '</storng>' +
        '</span>' +
        '</div>' +
        '<div class="contentbox">' +
        '<div class="nav1">' +
        '<span class="listsp2">' + _data.title + '</span>' +
        '</div>' +
        '<div class="nav2">' +
        '<span class="logo">' +
        '<img src="' + _data.logo + '" />' +
        '</span>' +
        '<span class="listsp5">' + _data.siteName + '</span>' +
        '<span class="spaninterval">' + spaninterval + '</span>' +
        '<span class="listspan6">' + _data.time + '</span>' +
        '</div>' +
        '</div></li>';
    return [_data, _html];
}

App.prototype.getMoreDlgHtml = function (item, index) {
    return '<li>' +
        '<div class="row">' +
        '<span class="theImg">' +
        '<storng>' + (index + 1) + '</storng>' +
        '</span>' +
        '<span class="word omg">' +
        '<a href="' + item.url + '" target="_blank">' + item.title + '</a>' +
        '</span>' +
        '</div></li>';
}

// 获取路由参数
App.prototype.getUrlParams = function (params) {
    var self = this;
    var reg = new RegExp("(^|&)" + params + "=([^&]*)(&|$)");
    var paramsData = window.location.search.substr(1).match(reg);
    return !!paramsData ? paramsData[2] : "0";
};

App.prototype.getDate = function (day) {
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
};

App.prototype.hasKey = function (parent, key) {
    return Object.prototype.hasOwnProperty.call(parent, key)
};

App.prototype.handleTime = function (t) {
    var time = ''
    if (!t && t.length !== 14) {
        // 20190325000000  年月日时分秒
        console.warn('时间格式传入出错')
        return time
    }
    var str = t.substring(0, 4) + '-' + t.substring(4, 6) + '-' + t.substring(6, 8) + ' ' + t.substring(8, 10) + ':' + t.substring(10, 12) + ':' + t.substring(12, 14) + ':000';
    var _t = new Date(str).getTime()
    time = this.getDateDiff(_t)
    time = !!time ? time : ''
    return time
}

App.prototype.handleTime2 = function (t) {
    var time = ''
    if (!t && t.length !== 19) {
        // 20190325000000  年月日时分秒
        console.warn('时间格式传入出错')
        return time
    }
    var _t = Date.parse(t.replace(/-/gi, "/"))
    time = this.getDateDiff(_t)
    time = !!time ? time : ''
    return time
}

App.prototype.getDateDiff = function (dateTimeStamp) {
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp;
    if (diffValue < 0) {
        return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    var result = ''
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    } else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    } else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    } else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    } else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}

App.prototype.loading = function ($dom, flag) {
    // 打开loading
    if (flag) {
        $dom.hide().siblings('.fn-s-load').show()
    } else {
        $dom.show().siblings('.fn-s-load').hide()
    }
}

App.prototype.getLogo = function (infoType) {
    var imgSrc = '';
    // 文章类型
    // 1：网站；4：微博；5：数字报刊；7：客户端；8：微信；15：特色资源）
    switch (infoType) {
        case 1:
            imgSrc = './images/wzbig.png'
            break;
        case 4:
            imgSrc = './images/wbbig.png'
            break;
        case 5:
            imgSrc = './images/appbig.png'
            break;
        case 7:
            imgSrc = './images/appbig.png'
            break;
        case 8:
            imgSrc = './images/wxbig.png'
            break;
        default:
            imgSrc = './images/rank.png'
    }
    return imgSrc;
}

App.prototype.getPicture = function (picList) {
    var picture = './images/default.png';
    if (!!picList) {
        var index = picList.indexOf(';');
        if (index > -1) {
            picture = picList.substring(0, picList.indexOf(';'))
        } else {
            picture = picList
        }
    }
    return picture
}

// 画饼
App.prototype.drawPie = function (chart, data) {
    var arr = [];
    var self = this;
    var option = $.extend(false, self.chartOption.pie);
    for (var i = 0, l = data.length; i < l; i++) {
        var item = data[i];
        var color = self.chartOption.colorList[i % self.chartOption.colorList.length];
        item.itemStyle = {
            normal: {color: color}
        }
        arr[i] = item;
    }
    option.series[0].data = arr;
    chart.setOption(option);
}

// 画关系图
App.prototype.drawGraph = function (chart, _data) {
    var self = this;
    var categories = this.chartOption.categories;
    // group 转 index
    var categoryMap = {}
    categories.map(function (item, i) {
        item.itemStyle = {
            color: self.chartOption.colorList[i % self.chartOption.colorList.length]
        }
        categoryMap[item.value] = i;
    })
    console.log(categoryMap, "categoryMap")
    var nodes = _data.nodes;
    var links = _data.links;

    nodes.map(function (node) {
        node.symbolSize = 30;
        node.x = node.y = null;
        node.draggable = true;
        // _category : int
        var _category = categoryMap[node.group]
        if (_category || _category == 0) {
            node.category = _category
        } else {
            node.category = categoryMap['null']
        }
    })
    var option = {
        title: {
            show: false
        },
        type: 'graph',
        tooltip: {
            trigger: 'item',
            formatter: "{b}",
            confine: true,   //防止tooltip 超出
        },
        legend: [{
            // selectedMode: 'single',
            data: categories.map(function (a) {
                return a.name;
            }),
            textStyle: {
                color: '#fff'
            },
            // 布局
            orient: 'vertical',
            left: 0,
            bottom: 10,
            icon: "circle",
        }],
        animation: false,
        series: [
            {
                name: '',
                type: 'graph',
                layout: 'force',
                data: nodes,
                links: links,
                categories: categories,
                roam: true,
                label: {
                    normal: {
                        position: 'right',
                        show: true,
                        color: '#fff'
                    }
                },
                force: {
                    repulsion: 400
                }
            }
        ]
    }
    chart.setOption(option);
    chart.on('click', function (item) {
        if (item.dataType === 'node') {
            var url = self.handleUrl(item.data.url)
            window.open(url, "_blank")
        }
    })
}

// 实体字符反转义
App.prototype.htmlRestore = function (str) {
    var s = "";
    if (str.length === 0) {
        return s;
    }
    s = str.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    return s;
}

App.prototype.htmlBR = function (str) {
    var s = '';
    if (!str) {
        return s
    }
    s = str.replace(/\r\n/g, "<br />");
    s = s.replace(/\n/g, "<br />");
    return s;
}

App.prototype.handleUrl = function (url) {
    if (!url) {
        return ''
    }
    // 链接首位无 http，或者 https
    if (url.indexOf('http') != 0 && url.indexOf('https') != 0) {
        return 'http://' + url;
    }
    return url;
}

App.prototype.getItem = function (id, clicktype) {
    var obj = [], item = null;
    switch (clicktype) {
        case 'wzList':
            obj = this.$wzList.data;
            break;
        case 'wbList':
            obj = this.$wbList.data;
            break;
        case 'wxList':
            obj = this.$wxList.data;
            break;
        case 'appList':
            obj = this.$appList.data;
            break;
        default:
            obj = this.$allList.data;
    }
    item = !!obj[id] ? obj[id] : null;
    return item
}

App.prototype.isEchartsInst = function (_id) {
    var flag = false
    if (echarts.getInstanceByDom(document.getElementById(_id))) {
        flag = true
    }
    return flag
}