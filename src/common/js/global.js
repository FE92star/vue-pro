//  版本 ：v.1.2016.05.27
(function() {
    window.Global = {
        init: function(argument) {
            var self = this;
            // this.log("Global init");
            this.baseSet();
            this.SetFont();
            return this;
        },
        SetFont(v){
            var v=v||750;
            var WH=this.WH();
            var f=WH.w/750*100;
            f=f<50?f:50;
            $("html").attr("style", "font-size:" + f + "px !important;");
            return this;
        },
        loadScript(url, callback) {
            var head = document.head || document.getElementsByTagName('head')[0] || document.documentElement,
                script,
                options;

            if (typeof url === 'object') {
                options = url;
                url = undefined;
            }
            var s = options || {};
            url = url || s.url;
            callback = callback || s.success;
            script = document.createElement('script');
            script.async = s.async || false;
            script.type = 'text/javascript';
            if (s.charset) {
                script.charset = s.charset;
            }
            if (s.cache === false) {
                url = url + (/\?/.test(url) ? ' & ' : ' ? ') + '_ = ' + (new Date()).getTime();
            }
            script.src = url;
            head.insertBefore(script, head.firstChild);
            if (callback) {
                document.addEventListener ? script.addEventListener('load', callback, false) : script.onreadystatechange = function() {
                    if (/loaded|complete/.test(script.readyState)) {
                        script.onreadystatechange = null
                        callback()
                    }
                }
            }
        },
        baseSet: function() {
            var _location = window.location,
                host = _location.host;
            this.baseUrl = window.location.origin;
            //本地测试
            if (/^\d+(\.\d+)*$/.test(window.location.hostname)) {
                try {
                    var hashArr = ["#kaifa_mode", "#test_mode", "#b_mode", "#none_mode"],
                        hashID = -1,
                        d_api = [{
                            b: "//kaifa.jianbing.com",
                            s: 3,
                        }, {
                            b: "//test.jianbing.com",
                            s: 2,
                        }, {
                            b: "//b.jianbing.com",
                            s: 1,
                        }, {
                            b: "",
                            s: 4,
                        }];
                    var _hash = _location.hash;
                    var api_hash = "";
                    if ($.inArray(_hash, hashArr) >= 0) {
                        api_hash = _hash
                        Global.storage.val("b_api_hash", _hash);
                    } else {
                        api_hash = Global.storage.val("b_api_hash") || "";
                    }
                    hashID = $.inArray(api_hash, hashArr);
                    if (hashID >= 0) {
                        this.baseUrl = d_api[hashID].b;
                        this.system = d_api[hashID].s;
                    }
                } catch (e) {}
            }
            return this;
        },
        Origin: function(e) {
            return this.baseUrl + (e || "")
        },
        Url: function() {
            var s = "";
            for (var i = 0; i < arguments.length; i++) {
                s += "/" + arguments[i];
            }
            return this.baseUrl + s.replace(/\/+/g, '/');
        },
        Mall: function(e) {
            var s = "";
            for (var i = 0; i < arguments.length; i++) {
                s += "/" + arguments[i];
            }
            return this.baseUrl+("/gjjmall/" + s).replace(/\/+/g, '/');
        },
        getUrlData: function(u) { //分解地址参数
            var url = u || window.location.href;
            url = url.split("?");
            if (url.length <= 1) {
                return {};
            }
            var search = url[1].split("#")[0];
            var params = {};
            if (!!search) {
                var tmp = search.split('&');
                for (var i = 0; i < tmp.length; i++) {
                    var kv = tmp[i].split('=');
                    if (kv.length == 2) {
                        params[kv[0]] = decodeURIComponent(kv[1]);
                    }
                }
            }
            return params;
        },
        jointUrl: function(p) {
            var str = "";
            for (let i in p) {
                str += "&" + i + "=" + p[i];
            }
            return str;
        },
        creatUrl: function(h, p) {
            var _h = h.split("#"),_hash = "";
            var d=Object.assign(this.getUrlData(h), p);
            if (_h.length == 2) _hash = '#' + _h[1];
            var u=h.split("?");
            return (u[0] +"?"+ this.jointUrl(d) + _hash).replace("?&", "?").replace(/\?*$/g,"")
        },
        toSring: function(s) {
            return JSON.stringify(s);
        },
        WH: function() {
            var a = {},
                obj = $('<div style="position: absolute;width: 100%;top: 0;bottom: 0;left: 0;z-index: -1;"></div>');
            $("body").append(obj);
            a.h = obj.height();
            a.w = obj.width();
            obj.remove();
            return a;
        },
        https: function(u) {
            if (u.indexOf("http") >= 0) {
                var h = ('https:' == document.location.protocol ? 'https://' : 'http://');
                return h + u.replace("http://", "").replace("https://", "");
            } else {
                return u;
            }
        },
        Cookie: function(a, b, t) {
            if (a && b) {
                var exp = new Date();
                exp.setTime(exp.getTime() + (t || 0) * 1000 * 60);
                document.cookie = a + "=" + escape(b) + ((t == null) ? "" : ";expires=" + exp.toGMTString()) + ";path=/";
            } else if (a) {
                var arr, reg = new RegExp("(^| )" + a + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return unescape(arr[2]);
                else
                    return null;
            } else {
                return '';
            }
        },
        storage: { //本地数据存储
            val: function(s, v) {
                if (window.localStorage) {
                    var local = window.localStorage;
                    if (typeof(v) == "undefined") {
                        if (!local.getItem(s)) local.setItem(s, "");
                        return local.getItem(s);
                    } else {
                        return local.setItem(s, v);
                    }
                } else {
                    return undefined;
                }
            },
            clear: function(s) {
                if (window.localStorage) {
                    var local = window.localStorage;
                    if (s) {
                        window.localStorage.removeItem(s)
                    } else {
                        window.localStorage.clear()
                    }
                }
            }
        },
        toArry: function(o) {
            if (o instanceof Array) {
                return o;
            } else if (o instanceof Object) {
                var _r = [];
                for (a in o) {
                    _r.push(o[a]);
                };
                return _r;
            }
            return o;
        },
        listenPage(p) {
            function run(opt){

                function getHiddenProp() {
                    var prefixes = ['webkit', 'moz', 'ms', 'o'];
                    if ('hidden' in document) return 'hidden';
                    for (var i = 0; i < prefixes.length; i++) {
                        if ((prefixes[i] + 'Hidden') in document)
                            return prefixes[i] + 'Hidden';
                    }
                    return null;
                }

                function getVisibilityState() {
                    var prefixes = ['webkit', 'moz', 'ms', 'o'];
                    if ('visibilityState' in document) return 'visibilityState';
                    for (var i = 0; i < prefixes.length; i++) {
                        if ((prefixes[i] + 'VisibilityState') in document)
                            return prefixes[i] + 'VisibilityState';
                    }
                    return null;
                }

                function isShow() {
                    var prop = getHiddenProp();
                    if (!prop) return true;
                    return !document[prop];
                }
                var visProp = getHiddenProp();
                var _self = this;
                window._listenPageOption=opt;
                window._pageReloadTimeSet =0;
                window._pageLeaveTimeSet =0;
                window.setTimeout(function() {
                    _self.outLoad = true;
                    _self.outClose = true;
                }, 3000)

                function result(m) {
                    console.log("pageChange",m);
                    var option=window._listenPageOption||{};
                    var time = option.time || 4;
                    if (m && option && option.onload) {
                        var _cg = ((new Date()).getTime() - window._pageReloadTimeSet) / 1000;
                        if (_cg < time) {
                            return false;
                        }
                        window._pageReloadTimeSet = (new Date()).getTime();
                        if (_self.outLoad) {
                            setTimeout(function() {
                                _self.outLoad = false;
                                option.onload();
                                setTimeout(function() {
                                    _self.outLoad = true
                                }, 200)
                            }, 1000)
                        }
                    } else if (!m && option && option.onclose) {
                        var _cg = ((new Date()).getTime() - window._pageLeaveTimeSet) / 1000;
                        if (_cg < time) {
                            return false;
                        }
                        window._pageLeaveTimeSet = (new Date()).getTime();
                        if (_self.outClose) {
                            _self.outClose = false;
                            option.onclose();
                            setTimeout(function() {
                                _self.outClose = true
                            }, 3000)
                        }
                    }
                }
                if (visProp) {
                    var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
                    window._pageListenFun=window._pageListenFun||null;
                    document.removeEventListener(evtname, window._pageListenFun, false);
                    window._pageListenFun=function() {
                        var r = document[getVisibilityState()] == "visible" || isShow();
                        result(r)
                    }
                   document.addEventListener(evtname, window._pageListenFun, false);
                }
                window.onfocus = function() {
                    result(true)
                };
                window.onblur = function() {
                    result(false)
                };
            }
            new run(p)
        },timeDown: function(p, c) {
            function run() {
                var m = p.t || 0,
                    move = true,
                    setT;
                function td(t) {
                    if (m <= 0) {
                        c.call(0,m);
                    } else if (move) {
                        setT = window.setTimeout(function() {
                            m--;
                            c.call(this,m);
                            td();
                        }, 1000)
                    }
                }
                this.stopT = function() {
                    clearTimeout(setT)
                    move = false;
                }
                td();
                c.call(this,m);
                return this;
            }
            return new run();
        },
        Crash: function(m, p) { //错误日志
            var self = this;
            if (!this.local && typeof _Log != "undefined") {
                _Log.Crash(encodeURIComponent(m.replace(/\s+/g, " ")), {
                    mark: encodeURIComponent(window.location.href)
                })
            }
        }

    }
    window.Crash = Global.Crash;
    Global.init();

})()
