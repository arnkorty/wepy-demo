'use strict';

/* global window, document, location, Event, setTimeout */
/*
    ## MockXMLHttpRequest

    期望的功能：
    1. 完整地覆盖原生 XHR 的行为
    2. 完整地模拟原生 XHR 的行为
    3. 在发起请求时，自动检测是否需要拦截
    4. 如果不必拦截，则执行原生 XHR 的行为
    5. 如果需要拦截，则执行虚拟 XHR 的行为
    6. 兼容 XMLHttpRequest 和 ActiveXObject
        new window.XMLHttpRequest()
        new window.ActiveXObject("Microsoft.XMLHTTP")

    关键方法的逻辑：
    * new   此时尚无法确定是否需要拦截，所以创建原生 XHR 对象是必须的。
    * open  此时可以取到 URL，可以决定是否进行拦截。
    * send  此时已经确定了请求方式。

    规范：
    http://xhr.spec.whatwg.org/
    http://www.w3.org/TR/XMLHttpRequest2/

    参考实现：
    https://github.com/philikon/MockHttpRequest/blob/master/lib/mock.js
    https://github.com/trek/FakeXMLHttpRequest/blob/master/fake_xml_http_request.js
    https://github.com/ilinsky/xmlhttprequest/blob/master/XMLHttpRequest.js
    https://github.com/firebug/firebug-lite/blob/master/content/lite/xhr.js
    https://github.com/thx/RAP/blob/master/lab/rap.plugin.xinglie.js

    **需不需要全面重写 XMLHttpRequest？**
        http://xhr.spec.whatwg.org/#interface-xmlhttprequest
        关键属性 readyState、status、statusText、response、responseText、responseXML 是 readonly，所以，试图通过修改这些状态，来模拟响应是不可行的。
        因此，唯一的办法是模拟整个 XMLHttpRequest，就像 jQuery 对事件模型的封装。

    // Event handlers
    onloadstart         loadstart
    onprogress          progress
    onabort             abort
    onerror             error
    onload              load
    ontimeout           timeout
    onloadend           loadend
    onreadystatechange  readystatechange
 */

var Util = require('./../util.js');

// 备份原生 XMLHttpRequest
window._XMLHttpRequest = window.XMLHttpRequest;
window._ActiveXObject = window.ActiveXObject;

/*
    PhantomJS
    TypeError: '[object EventConstructor]' is not a constructor (evaluating 'new Event("readystatechange")')

    https://github.com/bluerail/twitter-bootstrap-rails-confirm/issues/18
    https://github.com/ariya/phantomjs/issues/11289
*/
try {
    new window.Event('custom');
} catch (exception) {
    window.Event = function (type, bubbles, cancelable, detail) {
        var event = document.createEvent('CustomEvent'); // MUST be 'CustomEvent'
        event.initCustomEvent(type, bubbles, cancelable, detail);
        return event;
    };
}

var XHR_STATES = {
    // The object has been constructed.
    UNSENT: 0,
    // The open() method has been successfully invoked.
    OPENED: 1,
    // All redirects (if any) have been followed and all HTTP headers of the response have been received.
    HEADERS_RECEIVED: 2,
    // The response's body is being received.
    LOADING: 3,
    // The data transfer has been completed or something went wrong during the transfer (e.g. infinite redirects).
    DONE: 4
};

var XHR_EVENTS = 'readystatechange loadstart progress abort error load timeout loadend'.split(' ');
var XHR_REQUEST_PROPERTIES = 'timeout withCredentials'.split(' ');
var XHR_RESPONSE_PROPERTIES = 'readyState responseURL status statusText responseType response responseText responseXML'.split(' ');

// https://github.com/trek/FakeXMLHttpRequest/blob/master/fake_xml_http_request.js#L32
var HTTP_STATUS_CODES = {
    100: "Continue",
    101: "Switching Protocols",
    200: "OK",
    201: "Created",
    202: "Accepted",
    203: "Non-Authoritative Information",
    204: "No Content",
    205: "Reset Content",
    206: "Partial Content",
    300: "Multiple Choice",
    301: "Moved Permanently",
    302: "Found",
    303: "See Other",
    304: "Not Modified",
    305: "Use Proxy",
    307: "Temporary Redirect",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    409: "Conflict",
    410: "Gone",
    411: "Length Required",
    412: "Precondition Failed",
    413: "Request Entity Too Large",
    414: "Request-URI Too Long",
    415: "Unsupported Media Type",
    416: "Requested Range Not Satisfiable",
    417: "Expectation Failed",
    422: "Unprocessable Entity",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Gateway Timeout",
    505: "HTTP Version Not Supported"

    /*
        MockXMLHttpRequest
    */

};function MockXMLHttpRequest() {
    // 初始化 custom 对象，用于存储自定义属性
    this.custom = {
        events: {},
        requestHeaders: {},
        responseHeaders: {}
    };
}

MockXMLHttpRequest._settings = {
    timeout: '10-100'
    /*
        timeout: 50,
        timeout: '10-100',
     */
};

MockXMLHttpRequest.setup = function (settings) {
    Util.extend(MockXMLHttpRequest._settings, settings);
    return MockXMLHttpRequest._settings;
};

Util.extend(MockXMLHttpRequest, XHR_STATES);
Util.extend(MockXMLHttpRequest.prototype, XHR_STATES);

// 标记当前对象为 MockXMLHttpRequest
MockXMLHttpRequest.prototype.mock = true;

// 是否拦截 Ajax 请求
MockXMLHttpRequest.prototype.match = false;

// 初始化 Request 相关的属性和方法
Util.extend(MockXMLHttpRequest.prototype, {
    // https://xhr.spec.whatwg.org/#the-open()-method
    // Sets the request method, request URL, and synchronous flag.
    open: function open(method, url, async, username, password) {
        var that = this;

        Util.extend(this.custom, {
            method: method,
            url: url,
            async: typeof async === 'boolean' ? async : true,
            username: username,
            password: password,
            options: {
                url: url,
                type: method
            }
        });

        this.custom.timeout = function (timeout) {
            if (typeof timeout === 'number') return timeout;
            if (typeof timeout === 'string' && !~timeout.indexOf('-')) return parseInt(timeout, 10);
            if (typeof timeout === 'string' && ~timeout.indexOf('-')) {
                var tmp = timeout.split('-');
                var min = parseInt(tmp[0], 10);
                var max = parseInt(tmp[1], 10);
                return Math.round(Math.random() * (max - min)) + min;
            }
        }(MockXMLHttpRequest._settings.timeout);

        // 查找与请求参数匹配的数据模板
        var item = find(this.custom.options);

        function handle(event) {
            // 同步属性 NativeXMLHttpRequest => MockXMLHttpRequest
            for (var i = 0; i < XHR_RESPONSE_PROPERTIES.length; i++) {
                try {
                    that[XHR_RESPONSE_PROPERTIES[i]] = xhr[XHR_RESPONSE_PROPERTIES[i]];
                } catch (e) {}
            }
            // 触发 MockXMLHttpRequest 上的同名事件
            that.dispatchEvent(new Event(event.type /*, false, false, that*/));
        }

        // 如果未找到匹配的数据模板，则采用原生 XHR 发送请求。
        if (!item) {
            // 创建原生 XHR 对象，调用原生 open()，监听所有原生事件
            var xhr = createNativeXMLHttpRequest();
            this.custom.xhr = xhr;

            // 初始化所有事件，用于监听原生 XHR 对象的事件
            for (var i = 0; i < XHR_EVENTS.length; i++) {
                xhr.addEventListener(XHR_EVENTS[i], handle);
            }

            // xhr.open()
            if (username) xhr.open(method, url, async, username, password);else xhr.open(method, url, async);

            // 同步属性 MockXMLHttpRequest => NativeXMLHttpRequest
            for (var j = 0; j < XHR_REQUEST_PROPERTIES.length; j++) {
                try {
                    xhr[XHR_REQUEST_PROPERTIES[j]] = that[XHR_REQUEST_PROPERTIES[j]];
                } catch (e) {}
            }

            return;
        }

        // 找到了匹配的数据模板，开始拦截 XHR 请求
        this.match = true;
        this.custom.template = item;
        this.readyState = MockXMLHttpRequest.OPENED;
        this.dispatchEvent(new Event('readystatechange' /*, false, false, this*/));
    },
    // https://xhr.spec.whatwg.org/#the-setrequestheader()-method
    // Combines a header in author request headers.
    setRequestHeader: function setRequestHeader(name, value) {
        // 原生 XHR
        if (!this.match) {
            this.custom.xhr.setRequestHeader(name, value);
            return;
        }

        // 拦截 XHR
        var requestHeaders = this.custom.requestHeaders;
        if (requestHeaders[name]) requestHeaders[name] += ',' + value;else requestHeaders[name] = value;
    },
    timeout: 0,
    withCredentials: false,
    upload: {},
    // https://xhr.spec.whatwg.org/#the-send()-method
    // Initiates the request.
    send: function send(data) {
        var that = this;
        this.custom.options.body = data;

        // 原生 XHR
        if (!this.match) {
            this.custom.xhr.send(data);
            return;
        }

        // 拦截 XHR

        // X-Requested-With header
        this.setRequestHeader('X-Requested-With', 'MockXMLHttpRequest');

        // loadstart The fetch initiates.
        this.dispatchEvent(new Event('loadstart' /*, false, false, this*/));

        if (this.custom.async) setTimeout(done, this.custom.timeout); // 异步
        else done(); // 同步

        function done() {
            that.readyState = MockXMLHttpRequest.HEADERS_RECEIVED;
            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/));
            that.readyState = MockXMLHttpRequest.LOADING;
            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/));

            that.status = 200;
            that.statusText = HTTP_STATUS_CODES[200];

            // fix #92 #93 by @qddegtya
            that.response = that.responseText = JSON.stringify(convert(that.custom.template, that.custom.options), null, 4);

            that.readyState = MockXMLHttpRequest.DONE;
            that.dispatchEvent(new Event('readystatechange' /*, false, false, that*/));
            that.dispatchEvent(new Event('load' /*, false, false, that*/));
            that.dispatchEvent(new Event('loadend' /*, false, false, that*/));
        }
    },
    // https://xhr.spec.whatwg.org/#the-abort()-method
    // Cancels any network activity.
    abort: function abort() {
        // 原生 XHR
        if (!this.match) {
            this.custom.xhr.abort();
            return;
        }

        // 拦截 XHR
        this.readyState = MockXMLHttpRequest.UNSENT;
        this.dispatchEvent(new Event('abort', false, false, this));
        this.dispatchEvent(new Event('error', false, false, this));
    }
});

// 初始化 Response 相关的属性和方法
Util.extend(MockXMLHttpRequest.prototype, {
    responseURL: '',
    status: MockXMLHttpRequest.UNSENT,
    statusText: '',
    // https://xhr.spec.whatwg.org/#the-getresponseheader()-method
    getResponseHeader: function getResponseHeader(name) {
        // 原生 XHR
        if (!this.match) {
            return this.custom.xhr.getResponseHeader(name);
        }

        // 拦截 XHR
        return this.custom.responseHeaders[name.toLowerCase()];
    },
    // https://xhr.spec.whatwg.org/#the-getallresponseheaders()-method
    // http://www.utf8-chartable.de/
    getAllResponseHeaders: function getAllResponseHeaders() {
        // 原生 XHR
        if (!this.match) {
            return this.custom.xhr.getAllResponseHeaders();
        }

        // 拦截 XHR
        var responseHeaders = this.custom.responseHeaders;
        var headers = '';
        for (var h in responseHeaders) {
            if (!responseHeaders.hasOwnProperty(h)) continue;
            headers += h + ': ' + responseHeaders[h] + '\r\n';
        }
        return headers;
    },
    overrideMimeType: function overrideMimeType() /*mime*/{},
    responseType: '', // '', 'text', 'arraybuffer', 'blob', 'document', 'json'
    response: null,
    responseText: '',
    responseXML: null
});

// EventTarget
Util.extend(MockXMLHttpRequest.prototype, {
    addEventListener: function addEventListener(type, handle) {
        var events = this.custom.events;
        if (!events[type]) events[type] = [];
        events[type].push(handle);
    },
    removeEventListener: function removeEventListener(type, handle) {
        var handles = this.custom.events[type] || [];
        for (var i = 0; i < handles.length; i++) {
            if (handles[i] === handle) {
                handles.splice(i--, 1);
            }
        }
    },
    dispatchEvent: function dispatchEvent(event) {
        var handles = this.custom.events[event.type] || [];
        for (var i = 0; i < handles.length; i++) {
            handles[i].call(this, event);
        }

        var ontype = 'on' + event.type;
        if (this[ontype]) this[ontype](event);
    }
});

// Inspired by jQuery
function createNativeXMLHttpRequest() {
    var isLocal = function () {
        var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
        var rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
        var ajaxLocation = location.href;
        var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
        return rlocalProtocol.test(ajaxLocParts[1]);
    }();

    return window.ActiveXObject ? !isLocal && createStandardXHR() || createActiveXHR() : createStandardXHR();

    function createStandardXHR() {
        try {
            return new window._XMLHttpRequest();
        } catch (e) {}
    }

    function createActiveXHR() {
        try {
            return new window._ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
    }
}

// 查找与请求参数匹配的数据模板：URL，Type
function find(options) {

    for (var sUrlType in MockXMLHttpRequest.Mock._mocked) {
        var item = MockXMLHttpRequest.Mock._mocked[sUrlType];
        if ((!item.rurl || match(item.rurl, options.url)) && (!item.rtype || match(item.rtype, options.type.toLowerCase()))) {
            // console.log('[mock]', options.url, '>', item.rurl)
            return item;
        }
    }

    function match(expected, actual) {
        if (Util.type(expected) === 'string') {
            return expected === actual;
        }
        if (Util.type(expected) === 'regexp') {
            return expected.test(actual);
        }
    }
}

// 数据模板 ＝> 响应数据
function convert(item, options) {
    return Util.isFunction(item.template) ? item.template(options) : MockXMLHttpRequest.Mock.mock(item.template);
}

module.exports = MockXMLHttpRequest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInhoci5qcyJdLCJuYW1lcyI6WyJVdGlsIiwicmVxdWlyZSIsIndpbmRvdyIsIl9YTUxIdHRwUmVxdWVzdCIsIlhNTEh0dHBSZXF1ZXN0IiwiX0FjdGl2ZVhPYmplY3QiLCJBY3RpdmVYT2JqZWN0IiwiRXZlbnQiLCJleGNlcHRpb24iLCJ0eXBlIiwiYnViYmxlcyIsImNhbmNlbGFibGUiLCJkZXRhaWwiLCJldmVudCIsImRvY3VtZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJYSFJfU1RBVEVTIiwiVU5TRU5UIiwiT1BFTkVEIiwiSEVBREVSU19SRUNFSVZFRCIsIkxPQURJTkciLCJET05FIiwiWEhSX0VWRU5UUyIsInNwbGl0IiwiWEhSX1JFUVVFU1RfUFJPUEVSVElFUyIsIlhIUl9SRVNQT05TRV9QUk9QRVJUSUVTIiwiSFRUUF9TVEFUVVNfQ09ERVMiLCJNb2NrWE1MSHR0cFJlcXVlc3QiLCJjdXN0b20iLCJldmVudHMiLCJyZXF1ZXN0SGVhZGVycyIsInJlc3BvbnNlSGVhZGVycyIsIl9zZXR0aW5ncyIsInRpbWVvdXQiLCJzZXR1cCIsInNldHRpbmdzIiwiZXh0ZW5kIiwicHJvdG90eXBlIiwibW9jayIsIm1hdGNoIiwib3BlbiIsIm1ldGhvZCIsInVybCIsImFzeW5jIiwidXNlcm5hbWUiLCJwYXNzd29yZCIsInRoYXQiLCJvcHRpb25zIiwiaW5kZXhPZiIsInBhcnNlSW50IiwidG1wIiwibWluIiwibWF4IiwiTWF0aCIsInJvdW5kIiwicmFuZG9tIiwiaXRlbSIsImZpbmQiLCJoYW5kbGUiLCJpIiwibGVuZ3RoIiwieGhyIiwiZSIsImRpc3BhdGNoRXZlbnQiLCJjcmVhdGVOYXRpdmVYTUxIdHRwUmVxdWVzdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJqIiwidGVtcGxhdGUiLCJyZWFkeVN0YXRlIiwic2V0UmVxdWVzdEhlYWRlciIsIm5hbWUiLCJ2YWx1ZSIsIndpdGhDcmVkZW50aWFscyIsInVwbG9hZCIsInNlbmQiLCJkYXRhIiwiYm9keSIsInNldFRpbWVvdXQiLCJkb25lIiwic3RhdHVzIiwic3RhdHVzVGV4dCIsInJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwiSlNPTiIsInN0cmluZ2lmeSIsImNvbnZlcnQiLCJhYm9ydCIsInJlc3BvbnNlVVJMIiwiZ2V0UmVzcG9uc2VIZWFkZXIiLCJ0b0xvd2VyQ2FzZSIsImdldEFsbFJlc3BvbnNlSGVhZGVycyIsImhlYWRlcnMiLCJoIiwiaGFzT3duUHJvcGVydHkiLCJvdmVycmlkZU1pbWVUeXBlIiwicmVzcG9uc2VUeXBlIiwicmVzcG9uc2VYTUwiLCJwdXNoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImhhbmRsZXMiLCJzcGxpY2UiLCJjYWxsIiwib250eXBlIiwiaXNMb2NhbCIsInJsb2NhbFByb3RvY29sIiwicnVybCIsImFqYXhMb2NhdGlvbiIsImxvY2F0aW9uIiwiaHJlZiIsImFqYXhMb2NQYXJ0cyIsImV4ZWMiLCJ0ZXN0IiwiY3JlYXRlU3RhbmRhcmRYSFIiLCJjcmVhdGVBY3RpdmVYSFIiLCJzVXJsVHlwZSIsIk1vY2siLCJfbW9ja2VkIiwicnR5cGUiLCJleHBlY3RlZCIsImFjdHVhbCIsImlzRnVuY3Rpb24iLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTZDQSxJQUFJQSxPQUFPQyxRQUFRLFNBQVIsQ0FBWDs7QUFFQTtBQUNBQyxPQUFPQyxlQUFQLEdBQXlCRCxPQUFPRSxjQUFoQztBQUNBRixPQUFPRyxjQUFQLEdBQXdCSCxPQUFPSSxhQUEvQjs7QUFFQTs7Ozs7OztBQU9BLElBQUk7QUFDQSxRQUFJSixPQUFPSyxLQUFYLENBQWlCLFFBQWpCO0FBQ0gsQ0FGRCxDQUVFLE9BQU9DLFNBQVAsRUFBa0I7QUFDaEJOLFdBQU9LLEtBQVAsR0FBZSxVQUFTRSxJQUFULEVBQWVDLE9BQWYsRUFBd0JDLFVBQXhCLEVBQW9DQyxNQUFwQyxFQUE0QztBQUN2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QUFpQjdCLElBQWpCLEVBQXVCVCxPQUF2QixFQUFnQztBQUM1QixXQUFPaEQsS0FBS3lILFVBQUwsQ0FBZ0JoRSxLQUFLVyxRQUFyQixJQUNIWCxLQUFLVyxRQUFMLENBQWNwQixPQUFkLENBREcsR0FDc0JwQixtQkFBbUJ3RixJQUFuQixDQUF3QjdFLElBQXhCLENBQTZCa0IsS0FBS1csUUFBbEMsQ0FEN0I7QUFFSDs7QUFFRHNELE9BQU9DLE9BQVAsR0FBaUIvRixrQkFBakIiLCJmaWxlIjoieGhyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHdpbmRvdywgZG9jdW1lbnQsIGxvY2F0aW9uLCBFdmVudCwgc2V0VGltZW91dCAqL1xuLypcbiAgICAjIyBNb2NrWE1MSHR0cFJlcXVlc3RcblxuICAgIOacn+acm+eahOWKn+iDve+8mlxuICAgIDEuIOWujOaVtOWcsOimhuebluWOn+eUnyBYSFIg55qE6KGM5Li6XG4gICAgMi4g5a6M5pW05Zyw5qih5ouf5Y6f55SfIFhIUiDnmoTooYzkuLpcbiAgICAzLiDlnKjlj5Hotbfor7fmsYLml7bvvIzoh6rliqjmo4DmtYvmmK/lkKbpnIDopoHmi6bmiKpcbiAgICA0LiDlpoLmnpzkuI3lv4Xmi6bmiKrvvIzliJnmiafooYzljp/nlJ8gWEhSIOeahOihjOS4ulxuICAgIDUuIOWmguaenOmcgOimgeaLpuaIqu+8jOWImeaJp+ihjOiZmuaLnyBYSFIg55qE6KGM5Li6XG4gICAgNi4g5YW85a65IFhNTEh0dHBSZXF1ZXN0IOWSjCBBY3RpdmVYT2JqZWN0XG4gICAgICAgIG5ldyB3aW5kb3cuWE1MSHR0cFJlcXVlc3QoKVxuICAgICAgICBuZXcgd2luZG93LkFjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKVxuXG4gICAg5YWz6ZSu5pa55rOV55qE6YC76L6R77yaXG4gICAgKiBuZXcgICDmraTml7blsJrml6Dms5Xnoa7lrprmmK/lkKbpnIDopoHmi6bmiKrvvIzmiYDku6XliJvlu7rljp/nlJ8gWEhSIOWvueixoeaYr+W/hemhu+eahOOAglxuICAgICogb3BlbiAg5q2k5pe25Y+v5Lul5Y+W5YiwIFVSTO+8jOWPr+S7peWGs+WumuaYr+WQpui/m+ihjOaLpuaIquOAglxuICAgICogc2VuZCAg5q2k5pe25bey57uP56Gu5a6a5LqG6K+35rGC5pa55byP44CCXG5cbiAgICDop4TojIPvvJpcbiAgICBodHRwOi8veGhyLnNwZWMud2hhdHdnLm9yZy9cbiAgICBodHRwOi8vd3d3LnczLm9yZy9UUi9YTUxIdHRwUmVxdWVzdDIvXG5cbiAgICDlj4LogIPlrp7njrDvvJpcbiAgICBodHRwczovL2dpdGh1Yi5jb20vcGhpbGlrb24vTW9ja0h0dHBSZXF1ZXN0L2Jsb2IvbWFzdGVyL2xpYi9tb2NrLmpzXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL3RyZWsvRmFrZVhNTEh0dHBSZXF1ZXN0L2Jsb2IvbWFzdGVyL2Zha2VfeG1sX2h0dHBfcmVxdWVzdC5qc1xuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9pbGluc2t5L3htbGh0dHByZXF1ZXN0L2Jsb2IvbWFzdGVyL1hNTEh0dHBSZXF1ZXN0LmpzXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL2ZpcmVidWcvZmlyZWJ1Zy1saXRlL2Jsb2IvbWFzdGVyL2NvbnRlbnQvbGl0ZS94aHIuanNcbiAgICBodHRwczovL2dpdGh1Yi5jb20vdGh4L1JBUC9ibG9iL21hc3Rlci9sYWIvcmFwLnBsdWdpbi54aW5nbGllLmpzXG5cbiAgICAqKumcgOS4jemcgOimgeWFqOmdoumHjeWGmSBYTUxIdHRwUmVxdWVzdO+8nyoqXG4gICAgICAgIGh0dHA6Ly94aHIuc3BlYy53aGF0d2cub3JnLyNpbnRlcmZhY2UteG1saHR0cHJlcXVlc3RcbiAgICAgICAg5YWz6ZSu5bGe5oCnIHJlYWR5U3RhdGXjgIFzdGF0dXPjgIFzdGF0dXNUZXh044CBcmVzcG9uc2XjgIFyZXNwb25zZVRleHTjgIFyZXNwb25zZVhNTCDmmK8gcmVhZG9ubHnvvIzmiYDku6XvvIzor5Xlm77pgJrov4fkv67mlLnov5nkupvnirbmgIHvvIzmnaXmqKHmi5/lk43lupTmmK/kuI3lj6/ooYznmoTjgIJcbiAgICAgICAg5Zug5q2k77yM5ZSv5LiA55qE5Yqe5rOV5piv5qih5ouf5pW05LiqIFhNTEh0dHBSZXF1ZXN077yM5bCx5YOPIGpRdWVyeSDlr7nkuovku7bmqKHlnovnmoTlsIHoo4XjgIJcblxuICAgIC8vIEV2ZW50IGhhbmRsZXJzXG4gICAgb25sb2Fkc3RhcnQgICAgICAgICBsb2Fkc3RhcnRcbiAgICBvbnByb2dyZXNzICAgICAgICAgIHByb2dyZXNzXG4gICAgb25hYm9ydCAgICAgICAgICAgICBhYm9ydFxuICAgIG9uZXJyb3IgICAgICAgICAgICAgZXJyb3JcbiAgICBvbmxvYWQgICAgICAgICAgICAgIGxvYWRcbiAgICBvbnRpbWVvdXQgICAgICAgICAgIHRpbWVvdXRcbiAgICBvbmxvYWRlbmQgICAgICAgICAgIGxvYWRlbmRcbiAgICBvbnJlYWR5c3RhdGVjaGFuZ2UgIHJlYWR5c3RhdGVjaGFuZ2VcbiAqL1xuXG52YXIgVXRpbCA9IHJlcXVpcmUoJy4uL3V0aWwnKVxuXG4vLyDlpIfku73ljp/nlJ8gWE1MSHR0cFJlcXVlc3RcbndpbmRvdy5fWE1MSHR0cFJlcXVlc3QgPSB3aW5kb3cuWE1MSHR0cFJlcXVlc3RcbndpbmRvdy5fQWN0aXZlWE9iamVjdCA9IHdpbmRvdy5BY3RpdmVYT2JqZWN0XG5cbi8qXG4gICAgUGhhbnRvbUpTXG4gICAgVHlwZUVycm9yOiAnW29iamVjdCBFdmVudENvbnN0cnVjdG9yXScgaXMgbm90IGEgY29uc3RydWN0b3IgKGV2YWx1YXRpbmcgJ25ldyBFdmVudChcInJlYWR5c3RhdGVjaGFuZ2VcIiknKVxuXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL2JsdWVyYWlsL3R3aXR0ZXItYm9vdHN0cmFwLXJhaWxzLWNvbmZpcm0vaXNzdWVzLzE4XG4gICAgaHR0cHM6Ly9naXRodWIuY29tL2FyaXlhL3BoYW50b21qcy9pc3N1ZXMvMTEyODlcbiovXG50cnkge1xuICAgIG5ldyB3aW5kb3cuRXZlbnQoJ2N1c3RvbScpXG59IGNhdGNoIChleGNlcHRpb24pIHtcbiAgICB3aW5kb3cuRXZlbnQgPSBmdW5jdGlvbih0eXBlLCBidWJibGVzLCBjYW5jZWxhYmxlLCBkZXRhaWwpIHtcbiAgICAgICAgdmFyIGV2ZW50ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50JykgLy8gTVVTVCBiZSAnQ3VzdG9tRXZlbnQnXG4gICAgICAgIGV2ZW50LmluaXRDdXN0b21FdmVudCh0eXBlLCBidWJibGVzLCBjYW5jZWxhYmxlLCBkZXRhaWwpXG4gICAgICAgIHJldHVybiBldmVudFxuICAgIH1cbn1cblxudmFyIFhIUl9TVEFURVMgPSB7XG4gICAgLy8gVGhlIG9iamVjdCBoYXMgYmVlbiBjb25zdHJ1Y3RlZC5cbiAgICBVTlNFTlQ6IDAsXG4gICAgLy8gVGhlIG9wZW4oKSBtZXRob2QgaGFzIGJlZW4gc3VjY2Vzc2Z1bGx5IGludm9rZWQuXG4gICAgT1BFTkVEOiAxLFxuICAgIC8vIEFsbCByZWRpcmVjdHMgKGlmIGFueSkgaGF2ZSBiZWVuIGZvbGxvd2VkIGFuZCBhbGwgSFRUUCBoZWFkZXJzIG9mIHRoZSByZXNwb25zZSBoYXZlIGJlZW4gcmVjZWl2ZWQuXG4gICAgSEVBREVSU19SRUNFSVZFRDogMixcbiAgICAvLyBUaGUgcmVzcG9uc2UncyBib2R5IGlzIGJlaW5nIHJlY2VpdmVkLlxuICAgIExPQURJTkc6IDMsXG4gICAgLy8gVGhlIGRhdGEgdHJhbnNmZXIgaGFzIGJlZW4gY29tcGxldGVkIG9yIHNvbWV0aGluZyB3ZW50IHdyb25nIGR1cmluZyB0aGUgdHJhbnNmZXIgKGUuZy4gaW5maW5pdGUgcmVkaXJlY3RzKS5cbiAgICBET05FOiA0XG59XG5cbnZhciBYSFJfRVZFTlRTID0gJ3JlYWR5c3RhdGVjaGFuZ2UgbG9hZHN0YXJ0IHByb2dyZXNzIGFib3J0IGVycm9yIGxvYWQgdGltZW91dCBsb2FkZW5kJy5zcGxpdCgnICcpXG52YXIgWEhSX1JFUVVFU1RfUFJPUEVSVElFUyA9ICd0aW1lb3V0IHdpdGhDcmVkZW50aWFscycuc3BsaXQoJyAnKVxudmFyIFhIUl9SRVNQT05TRV9QUk9QRVJUSUVTID0gJ3JlYWR5U3RhdGUgcmVzcG9uc2VVUkwgc3RhdHVzIHN0YXR1c1RleHQgcmVzcG9uc2VUeXBlIHJlc3BvbnNlIHJlc3BvbnNlVGV4dCByZXNwb25zZVhNTCcuc3BsaXQoJyAnKVxuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vdHJlay9GYWtlWE1MSHR0cFJlcXVlc3QvYmxvYi9tYXN0ZXIvZmFrZV94bWxfaHR0cF9yZXF1ZXN0LmpzI0wzMlxudmFyIEhUVFBfU1RBVFVTX0NPREVTID0ge1xuICAgIDEwMDogXCJDb250aW51ZVwiLFxuICAgIDEwMTogXCJTd2l0Y2hpbmcgUHJvdG9jb2xzXCIsXG4gICAgMjAwOiBcIk9LXCIsXG4gICAgMjAxOiBcIkNyZWF0ZWRcIixcbiAgICAyMDI6IFwiQWNjZXB0ZWRcIixcbiAgICAyMDM6IFwiTm9uLUF1dGhvcml0YXRpdmUgSW5mb3JtYXRpb25cIixcbiAgICAyMDQ6IFwiTm8gQ29udGVudFwiLFxuICAgIDIwNTogXCJSZXNldCBDb250ZW50XCIsXG4gICAgMjA2OiBcIlBhcnRpYWwgQ29udGVudFwiLFxuICAgIDMwMDogXCJNdWx0aXBsZSBDaG9pY2VcIixcbiAgICAzMDE6IFwiTW92ZWQgUGVybWFuZW50bHlcIixcbiAgICAzMDI6IFwiRm91bmRcIixcbiAgICAzMDM6IFwiU2VlIE90aGVyXCIsXG4gICAgMzA0OiBcIk5vdCBNb2RpZmllZFwiLFxuICAgIDMwNTogXCJVc2UgUHJveHlcIixcbiAgICAzMDc6IFwiVGVtcG9yYXJ5IFJlZGlyZWN0XCIsXG4gICAgNDAwOiBcIkJhZCBSZXF1ZXN0XCIsXG4gICAgNDAxOiBcIlVuYXV0aG9yaXplZFwiLFxuICAgIDQwMjogXCJQYXltZW50IFJlcXVpcmVkXCIsXG4gICAgNDAzOiBcIkZvcmJpZGRlblwiLFxuICAgIDQwNDogXCJOb3QgRm91bmRcIixcbiAgICA0MDU6IFwiTWV0aG9kIE5vdCBBbGxvd2VkXCIsXG4gICAgNDA2OiBcIk5vdCBBY2NlcHRhYmxlXCIsXG4gICAgNDA3OiBcIlByb3h5IEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCIsXG4gICAgNDA4OiBcIlJlcXVlc3QgVGltZW91dFwiLFxuICAgIDQwOTogXCJDb25mbGljdFwiLFxuICAgIDQxMDogXCJHb25lXCIsXG4gICAgNDExOiBcIkxlbmd0aCBSZXF1aXJlZFwiLFxuICAgIDQxMjogXCJQcmVjb25kaXRpb24gRmFpbGVkXCIsXG4gICAgNDEzOiBcIlJlcXVlc3QgRW50aXR5IFRvbyBMYXJnZVwiLFxuICAgIDQxNDogXCJSZXF1ZXN0LVVSSSBUb28gTG9uZ1wiLFxuICAgIDQxNTogXCJVbnN1cHBvcnRlZCBNZWRpYSBUeXBlXCIsXG4gICAgNDE2OiBcIlJlcXVlc3RlZCBSYW5nZSBOb3QgU2F0aXNmaWFibGVcIixcbiAgICA0MTc6IFwiRXhwZWN0YXRpb24gRmFpbGVkXCIsXG4gICAgNDIyOiBcIlVucHJvY2Vzc2FibGUgRW50aXR5XCIsXG4gICAgNTAwOiBcIkludGVybmFsIFNlcnZlciBFcnJvclwiLFxuICAgIDUwMTogXCJOb3QgSW1wbGVtZW50ZWRcIixcbiAgICA1MDI6IFwiQmFkIEdhdGV3YXlcIixcbiAgICA1MDM6IFwiU2VydmljZSBVbmF2YWlsYWJsZVwiLFxuICAgIDUwNDogXCJHYXRld2F5IFRpbWVvdXRcIixcbiAgICA1MDU6IFwiSFRUUCBWZXJzaW9uIE5vdCBTdXBwb3J0ZWRcIlxufVxuXG4vKlxuICAgIE1vY2tYTUxIdHRwUmVxdWVzdFxuKi9cblxuZnVuY3Rpb24gTW9ja1hNTEh0dHBSZXF1ZXN0KCkge1xuICAgIC8vIOWIneWni+WMliBjdXN0b20g5a+56LGh77yM55So5LqO5a2Y5YKo6Ieq5a6a5LmJ5bGe5oCnXG4gICAgdGhpcy5jdXN0b20gPSB7XG4gICAgICAgIGV2ZW50czoge30sXG4gICAgICAgIHJlcXVlc3RIZWFkZXJzOiB7fSxcbiAgICAgICAgcmVzcG9uc2VIZWFkZXJzOiB7fVxuICAgIH1cbn1cblxuTW9ja1hNTEh0dHBSZXF1ZXN0Ll9zZXR0aW5ncyA9IHtcbiAgICB0aW1lb3V0OiAnMTAtMTAwJyxcbiAgICAvKlxuICAgICAgICB0aW1lb3V0OiA1MCxcbiAgICAgICAgdGltZW91dDogJzEwLTEwMCcsXG4gICAgICovXG59XG5cbk1vY2tYTUxIdHRwUmVxdWVzdC5zZXR1cCA9IGZ1bmN0aW9uKHNldHRpbmdzKSB7XG4gICAgVXRpbC5leHRlbmQoTW9ja1hNTEh0dHBSZXF1ZXN0Ll9zZXR0aW5ncywgc2V0dGluZ3MpXG4gICAgcmV0dXJuIE1vY2tYTUxIdHRwUmVxdWVzdC5fc2V0dGluZ3Ncbn1cblxuVXRpbC5leHRlbmQoTW9ja1hNTEh0dHBSZXF1ZXN0LCBYSFJfU1RBVEVTKVxuVXRpbC5leHRlbmQoTW9ja1hNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwgWEhSX1NUQVRFUylcblxuLy8g5qCH6K6w5b2T5YmN5a+56LGh5Li6IE1vY2tYTUxIdHRwUmVxdWVzdFxuTW9ja1hNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZS5tb2NrID0gdHJ1ZVxuXG4vLyDmmK/lkKbmi6bmiKogQWpheCDor7fmsYJcbk1vY2tYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUubWF0Y2ggPSBmYWxzZVxuXG4vLyDliJ3lp4vljJYgUmVxdWVzdCDnm7jlhbPnmoTlsZ7mgKflkozmlrnms5VcblV0aWwuZXh0ZW5kKE1vY2tYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsIHtcbiAgICAvLyBodHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvI3RoZS1vcGVuKCktbWV0aG9kXG4gICAgLy8gU2V0cyB0aGUgcmVxdWVzdCBtZXRob2QsIHJlcXVlc3QgVVJMLCBhbmQgc3luY2hyb25vdXMgZmxhZy5cbiAgICBvcGVuOiBmdW5jdGlvbihtZXRob2QsIHVybCwgYXN5bmMsIHVzZXJuYW1lLCBwYXNzd29yZCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcblxuICAgICAgICBVdGlsLmV4dGVuZCh0aGlzLmN1c3RvbSwge1xuICAgICAgICAgICAgbWV0aG9kOiBtZXRob2QsXG4gICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgIGFzeW5jOiB0eXBlb2YgYXN5bmMgPT09ICdib29sZWFuJyA/IGFzeW5jIDogdHJ1ZSxcbiAgICAgICAgICAgIHVzZXJuYW1lOiB1c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBwYXNzd29yZCxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICB0eXBlOiBtZXRob2RcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICB0aGlzLmN1c3RvbS50aW1lb3V0ID0gZnVuY3Rpb24odGltZW91dCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aW1lb3V0ID09PSAnbnVtYmVyJykgcmV0dXJuIHRpbWVvdXRcbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGltZW91dCA9PT0gJ3N0cmluZycgJiYgIX50aW1lb3V0LmluZGV4T2YoJy0nKSkgcmV0dXJuIHBhcnNlSW50KHRpbWVvdXQsIDEwKVxuICAgICAgICAgICAgaWYgKHR5cGVvZiB0aW1lb3V0ID09PSAnc3RyaW5nJyAmJiB+dGltZW91dC5pbmRleE9mKCctJykpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG1wID0gdGltZW91dC5zcGxpdCgnLScpXG4gICAgICAgICAgICAgICAgdmFyIG1pbiA9IHBhcnNlSW50KHRtcFswXSwgMTApXG4gICAgICAgICAgICAgICAgdmFyIG1heCA9IHBhcnNlSW50KHRtcFsxXSwgMTApXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pblxuICAgICAgICAgICAgfVxuICAgICAgICB9KE1vY2tYTUxIdHRwUmVxdWVzdC5fc2V0dGluZ3MudGltZW91dClcblxuICAgICAgICAvLyDmn6Xmib7kuI7or7fmsYLlj4LmlbDljLnphY3nmoTmlbDmja7mqKHmnb9cbiAgICAgICAgdmFyIGl0ZW0gPSBmaW5kKHRoaXMuY3VzdG9tLm9wdGlvbnMpXG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlKGV2ZW50KSB7XG4gICAgICAgICAgICAvLyDlkIzmraXlsZ7mgKcgTmF0aXZlWE1MSHR0cFJlcXVlc3QgPT4gTW9ja1hNTEh0dHBSZXF1ZXN0XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IFhIUl9SRVNQT05TRV9QUk9QRVJUSUVTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdGhhdFtYSFJfUkVTUE9OU0VfUFJPUEVSVElFU1tpXV0gPSB4aHJbWEhSX1JFU1BPTlNFX1BST1BFUlRJRVNbaV1dXG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIOinpuWPkSBNb2NrWE1MSHR0cFJlcXVlc3Qg5LiK55qE5ZCM5ZCN5LqL5Lu2XG4gICAgICAgICAgICB0aGF0LmRpc3BhdGNoRXZlbnQobmV3IEV2ZW50KGV2ZW50LnR5cGUgLyosIGZhbHNlLCBmYWxzZSwgdGhhdCovICkpXG4gICAgICAgIH1cblxuICAgICAgICAvLyDlpoLmnpzmnKrmib7liLDljLnphY3nmoTmlbDmja7mqKHmnb/vvIzliJnph4fnlKjljp/nlJ8gWEhSIOWPkemAgeivt+axguOAglxuICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgIC8vIOWIm+W7uuWOn+eUnyBYSFIg5a+56LGh77yM6LCD55So5Y6f55SfIG9wZW4oKe+8jOebkeWQrOaJgOacieWOn+eUn+S6i+S7tlxuICAgICAgICAgICAgdmFyIHhociA9IGNyZWF0ZU5hdGl2ZVhNTEh0dHBSZXF1ZXN0KClcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tLnhociA9IHhoclxuXG4gICAgICAgICAgICAvLyDliJ3lp4vljJbmiYDmnInkuovku7bvvIznlKjkuo7nm5HlkKzljp/nlJ8gWEhSIOWvueixoeeahOS6i+S7tlxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBYSFJfRVZFTlRTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgeGhyLmFkZEV2ZW50TGlzdGVuZXIoWEhSX0VWRU5UU1tpXSwgaGFuZGxlKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB4aHIub3BlbigpXG4gICAgICAgICAgICBpZiAodXNlcm5hbWUpIHhoci5vcGVuKG1ldGhvZCwgdXJsLCBhc3luYywgdXNlcm5hbWUsIHBhc3N3b3JkKVxuICAgICAgICAgICAgZWxzZSB4aHIub3BlbihtZXRob2QsIHVybCwgYXN5bmMpXG5cbiAgICAgICAgICAgIC8vIOWQjOatpeWxnuaApyBNb2NrWE1MSHR0cFJlcXVlc3QgPT4gTmF0aXZlWE1MSHR0cFJlcXVlc3RcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgWEhSX1JFUVVFU1RfUFJPUEVSVElFUy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHhocltYSFJfUkVRVUVTVF9QUk9QRVJUSUVTW2pdXSA9IHRoYXRbWEhSX1JFUVVFU1RfUFJPUEVSVElFU1tqXV1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7fVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOaJvuWIsOS6huWMuemFjeeahOaVsOaNruaooeadv++8jOW8gOWni+aLpuaIqiBYSFIg6K+35rGCXG4gICAgICAgIHRoaXMubWF0Y2ggPSB0cnVlXG4gICAgICAgIHRoaXMuY3VzdG9tLnRlbXBsYXRlID0gaXRlbVxuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBNb2NrWE1MSHR0cFJlcXVlc3QuT1BFTkVEXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3JlYWR5c3RhdGVjaGFuZ2UnIC8qLCBmYWxzZSwgZmFsc2UsIHRoaXMqLyApKVxuICAgIH0sXG4gICAgLy8gaHR0cHM6Ly94aHIuc3BlYy53aGF0d2cub3JnLyN0aGUtc2V0cmVxdWVzdGhlYWRlcigpLW1ldGhvZFxuICAgIC8vIENvbWJpbmVzIGEgaGVhZGVyIGluIGF1dGhvciByZXF1ZXN0IGhlYWRlcnMuXG4gICAgc2V0UmVxdWVzdEhlYWRlcjogZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICAgICAgLy8g5Y6f55SfIFhIUlxuICAgICAgICBpZiAoIXRoaXMubWF0Y2gpIHtcbiAgICAgICAgICAgIHRoaXMuY3VzdG9tLnhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyDmi6bmiKogWEhSXG4gICAgICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IHRoaXMuY3VzdG9tLnJlcXVlc3RIZWFkZXJzXG4gICAgICAgIGlmIChyZXF1ZXN0SGVhZGVyc1tuYW1lXSkgcmVxdWVzdEhlYWRlcnNbbmFtZV0gKz0gJywnICsgdmFsdWVcbiAgICAgICAgZWxzZSByZXF1ZXN0SGVhZGVyc1tuYW1lXSA9IHZhbHVlXG4gICAgfSxcbiAgICB0aW1lb3V0OiAwLFxuICAgIHdpdGhDcmVkZW50aWFsczogZmFsc2UsXG4gICAgdXBsb2FkOiB7fSxcbiAgICAvLyBodHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvI3RoZS1zZW5kKCktbWV0aG9kXG4gICAgLy8gSW5pdGlhdGVzIHRoZSByZXF1ZXN0LlxuICAgIHNlbmQ6IGZ1bmN0aW9uIHNlbmQoZGF0YSkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgdGhpcy5jdXN0b20ub3B0aW9ucy5ib2R5ID0gZGF0YVxuXG4gICAgICAgIC8vIOWOn+eUnyBYSFJcbiAgICAgICAgaWYgKCF0aGlzLm1hdGNoKSB7XG4gICAgICAgICAgICB0aGlzLmN1c3RvbS54aHIuc2VuZChkYXRhKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICAvLyDmi6bmiKogWEhSXG5cbiAgICAgICAgLy8gWC1SZXF1ZXN0ZWQtV2l0aCBoZWFkZXJcbiAgICAgICAgdGhpcy5zZXRSZXF1ZXN0SGVhZGVyKCdYLVJlcXVlc3RlZC1XaXRoJywgJ01vY2tYTUxIdHRwUmVxdWVzdCcpXG5cbiAgICAgICAgLy8gbG9hZHN0YXJ0IFRoZSBmZXRjaCBpbml0aWF0ZXMuXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2xvYWRzdGFydCcgLyosIGZhbHNlLCBmYWxzZSwgdGhpcyovICkpXG5cbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tLmFzeW5jKSBzZXRUaW1lb3V0KGRvbmUsIHRoaXMuY3VzdG9tLnRpbWVvdXQpIC8vIOW8guatpVxuICAgICAgICBlbHNlIGRvbmUoKSAvLyDlkIzmraVcblxuICAgICAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICAgICAgdGhhdC5yZWFkeVN0YXRlID0gTW9ja1hNTEh0dHBSZXF1ZXN0LkhFQURFUlNfUkVDRUlWRURcbiAgICAgICAgICAgIHRoYXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3JlYWR5c3RhdGVjaGFuZ2UnIC8qLCBmYWxzZSwgZmFsc2UsIHRoYXQqLyApKVxuICAgICAgICAgICAgdGhhdC5yZWFkeVN0YXRlID0gTW9ja1hNTEh0dHBSZXF1ZXN0LkxPQURJTkdcbiAgICAgICAgICAgIHRoYXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3JlYWR5c3RhdGVjaGFuZ2UnIC8qLCBmYWxzZSwgZmFsc2UsIHRoYXQqLyApKVxuXG4gICAgICAgICAgICB0aGF0LnN0YXR1cyA9IDIwMFxuICAgICAgICAgICAgdGhhdC5zdGF0dXNUZXh0ID0gSFRUUF9TVEFUVVNfQ09ERVNbMjAwXVxuXG4gICAgICAgICAgICAvLyBmaXggIzkyICM5MyBieSBAcWRkZWd0eWFcbiAgICAgICAgICAgIHRoYXQucmVzcG9uc2UgPSB0aGF0LnJlc3BvbnNlVGV4dCA9IEpTT04uc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIGNvbnZlcnQodGhhdC5jdXN0b20udGVtcGxhdGUsIHRoYXQuY3VzdG9tLm9wdGlvbnMpLFxuICAgICAgICAgICAgICAgIG51bGwsIDRcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgdGhhdC5yZWFkeVN0YXRlID0gTW9ja1hNTEh0dHBSZXF1ZXN0LkRPTkVcbiAgICAgICAgICAgIHRoYXQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3JlYWR5c3RhdGVjaGFuZ2UnIC8qLCBmYWxzZSwgZmFsc2UsIHRoYXQqLyApKVxuICAgICAgICAgICAgdGhhdC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9hZCcgLyosIGZhbHNlLCBmYWxzZSwgdGhhdCovICkpO1xuICAgICAgICAgICAgdGhhdC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnbG9hZGVuZCcgLyosIGZhbHNlLCBmYWxzZSwgdGhhdCovICkpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyBodHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvI3RoZS1hYm9ydCgpLW1ldGhvZFxuICAgIC8vIENhbmNlbHMgYW55IG5ldHdvcmsgYWN0aXZpdHkuXG4gICAgYWJvcnQ6IGZ1bmN0aW9uIGFib3J0KCkge1xuICAgICAgICAvLyDljp/nlJ8gWEhSXG4gICAgICAgIGlmICghdGhpcy5tYXRjaCkge1xuICAgICAgICAgICAgdGhpcy5jdXN0b20ueGhyLmFib3J0KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgLy8g5oum5oiqIFhIUlxuICAgICAgICB0aGlzLnJlYWR5U3RhdGUgPSBNb2NrWE1MSHR0cFJlcXVlc3QuVU5TRU5UXG4gICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ2Fib3J0JywgZmFsc2UsIGZhbHNlLCB0aGlzKSlcbiAgICAgICAgdGhpcy5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudCgnZXJyb3InLCBmYWxzZSwgZmFsc2UsIHRoaXMpKVxuICAgIH1cbn0pXG5cbi8vIOWIneWni+WMliBSZXNwb25zZSDnm7jlhbPnmoTlsZ7mgKflkozmlrnms5VcblV0aWwuZXh0ZW5kKE1vY2tYTUxIdHRwUmVxdWVzdC5wcm90b3R5cGUsIHtcbiAgICByZXNwb25zZVVSTDogJycsXG4gICAgc3RhdHVzOiBNb2NrWE1MSHR0cFJlcXVlc3QuVU5TRU5ULFxuICAgIHN0YXR1c1RleHQ6ICcnLFxuICAgIC8vIGh0dHBzOi8veGhyLnNwZWMud2hhdHdnLm9yZy8jdGhlLWdldHJlc3BvbnNlaGVhZGVyKCktbWV0aG9kXG4gICAgZ2V0UmVzcG9uc2VIZWFkZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgLy8g5Y6f55SfIFhIUlxuICAgICAgICBpZiAoIXRoaXMubWF0Y2gpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1c3RvbS54aHIuZ2V0UmVzcG9uc2VIZWFkZXIobmFtZSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOaLpuaIqiBYSFJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VzdG9tLnJlc3BvbnNlSGVhZGVyc1tuYW1lLnRvTG93ZXJDYXNlKCldXG4gICAgfSxcbiAgICAvLyBodHRwczovL3hoci5zcGVjLndoYXR3Zy5vcmcvI3RoZS1nZXRhbGxyZXNwb25zZWhlYWRlcnMoKS1tZXRob2RcbiAgICAvLyBodHRwOi8vd3d3LnV0ZjgtY2hhcnRhYmxlLmRlL1xuICAgIGdldEFsbFJlc3BvbnNlSGVhZGVyczogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIOWOn+eUnyBYSFJcbiAgICAgICAgaWYgKCF0aGlzLm1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jdXN0b20ueGhyLmdldEFsbFJlc3BvbnNlSGVhZGVycygpXG4gICAgICAgIH1cblxuICAgICAgICAvLyDmi6bmiKogWEhSXG4gICAgICAgIHZhciByZXNwb25zZUhlYWRlcnMgPSB0aGlzLmN1c3RvbS5yZXNwb25zZUhlYWRlcnNcbiAgICAgICAgdmFyIGhlYWRlcnMgPSAnJ1xuICAgICAgICBmb3IgKHZhciBoIGluIHJlc3BvbnNlSGVhZGVycykge1xuICAgICAgICAgICAgaWYgKCFyZXNwb25zZUhlYWRlcnMuaGFzT3duUHJvcGVydHkoaCkpIGNvbnRpbnVlXG4gICAgICAgICAgICBoZWFkZXJzICs9IGggKyAnOiAnICsgcmVzcG9uc2VIZWFkZXJzW2hdICsgJ1xcclxcbidcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaGVhZGVyc1xuICAgIH0sXG4gICAgb3ZlcnJpZGVNaW1lVHlwZTogZnVuY3Rpb24oIC8qbWltZSovICkge30sXG4gICAgcmVzcG9uc2VUeXBlOiAnJywgLy8gJycsICd0ZXh0JywgJ2FycmF5YnVmZmVyJywgJ2Jsb2InLCAnZG9jdW1lbnQnLCAnanNvbidcbiAgICByZXNwb25zZTogbnVsbCxcbiAgICByZXNwb25zZVRleHQ6ICcnLFxuICAgIHJlc3BvbnNlWE1MOiBudWxsXG59KVxuXG4vLyBFdmVudFRhcmdldFxuVXRpbC5leHRlbmQoTW9ja1hNTEh0dHBSZXF1ZXN0LnByb3RvdHlwZSwge1xuICAgIGFkZEV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIGFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlKSB7XG4gICAgICAgIHZhciBldmVudHMgPSB0aGlzLmN1c3RvbS5ldmVudHNcbiAgICAgICAgaWYgKCFldmVudHNbdHlwZV0pIGV2ZW50c1t0eXBlXSA9IFtdXG4gICAgICAgIGV2ZW50c1t0eXBlXS5wdXNoKGhhbmRsZSlcbiAgICB9LFxuICAgIHJlbW92ZUV2ZW50TGlzdGVuZXI6IGZ1bmN0aW9uIHJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlKSB7XG4gICAgICAgIHZhciBoYW5kbGVzID0gdGhpcy5jdXN0b20uZXZlbnRzW3R5cGVdIHx8IFtdXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGFuZGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGhhbmRsZXNbaV0gPT09IGhhbmRsZSkge1xuICAgICAgICAgICAgICAgIGhhbmRsZXMuc3BsaWNlKGktLSwgMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgZGlzcGF0Y2hFdmVudDogZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChldmVudCkge1xuICAgICAgICB2YXIgaGFuZGxlcyA9IHRoaXMuY3VzdG9tLmV2ZW50c1tldmVudC50eXBlXSB8fCBbXVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhhbmRsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGhhbmRsZXNbaV0uY2FsbCh0aGlzLCBldmVudClcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvbnR5cGUgPSAnb24nICsgZXZlbnQudHlwZVxuICAgICAgICBpZiAodGhpc1tvbnR5cGVdKSB0aGlzW29udHlwZV0oZXZlbnQpXG4gICAgfVxufSlcblxuLy8gSW5zcGlyZWQgYnkgalF1ZXJ5XG5mdW5jdGlvbiBjcmVhdGVOYXRpdmVYTUxIdHRwUmVxdWVzdCgpIHtcbiAgICB2YXIgaXNMb2NhbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmxvY2FsUHJvdG9jb2wgPSAvXig/OmFib3V0fGFwcHxhcHAtc3RvcmFnZXwuKy1leHRlbnNpb258ZmlsZXxyZXN8d2lkZ2V0KTokL1xuICAgICAgICB2YXIgcnVybCA9IC9eKFtcXHcuKy1dKzopKD86XFwvXFwvKFteXFwvPyM6XSopKD86OihcXGQrKXwpfCkvXG4gICAgICAgIHZhciBhamF4TG9jYXRpb24gPSBsb2NhdGlvbi5ocmVmXG4gICAgICAgIHZhciBhamF4TG9jUGFydHMgPSBydXJsLmV4ZWMoYWpheExvY2F0aW9uLnRvTG93ZXJDYXNlKCkpIHx8IFtdXG4gICAgICAgIHJldHVybiBybG9jYWxQcm90b2NvbC50ZXN0KGFqYXhMb2NQYXJ0c1sxXSlcbiAgICB9KClcblxuICAgIHJldHVybiB3aW5kb3cuQWN0aXZlWE9iamVjdCA/XG4gICAgICAgICghaXNMb2NhbCAmJiBjcmVhdGVTdGFuZGFyZFhIUigpIHx8IGNyZWF0ZUFjdGl2ZVhIUigpKSA6IGNyZWF0ZVN0YW5kYXJkWEhSKClcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVN0YW5kYXJkWEhSKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuX1hNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQWN0aXZlWEhSKCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyB3aW5kb3cuX0FjdGl2ZVhPYmplY3QoXCJNaWNyb3NvZnQuWE1MSFRUUFwiKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge31cbiAgICB9XG59XG5cblxuLy8g5p+l5om+5LiO6K+35rGC5Y+C5pWw5Yy56YWN55qE5pWw5o2u5qih5p2/77yaVVJM77yMVHlwZVxuZnVuY3Rpb24gZmluZChvcHRpb25zKSB7XG5cbiAgICBmb3IgKHZhciBzVXJsVHlwZSBpbiBNb2NrWE1MSHR0cFJlcXVlc3QuTW9jay5fbW9ja2VkKSB7XG4gICAgICAgIHZhciBpdGVtID0gTW9ja1hNTEh0dHBSZXF1ZXN0Lk1vY2suX21vY2tlZFtzVXJsVHlwZV1cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKCFpdGVtLnJ1cmwgfHwgbWF0Y2goaXRlbS5ydXJsLCBvcHRpb25zLnVybCkpICYmXG4gICAgICAgICAgICAoIWl0ZW0ucnR5cGUgfHwgbWF0Y2goaXRlbS5ydHlwZSwgb3B0aW9ucy50eXBlLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdbbW9ja10nLCBvcHRpb25zLnVybCwgJz4nLCBpdGVtLnJ1cmwpXG4gICAgICAgICAgICByZXR1cm4gaXRlbVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWF0Y2goZXhwZWN0ZWQsIGFjdHVhbCkge1xuICAgICAgICBpZiAoVXRpbC50eXBlKGV4cGVjdGVkKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiBleHBlY3RlZCA9PT0gYWN0dWFsXG4gICAgICAgIH1cbiAgICAgICAgaWYgKFV0aWwudHlwZShleHBlY3RlZCkgPT09ICdyZWdleHAnKSB7XG4gICAgICAgICAgICByZXR1cm4gZXhwZWN0ZWQudGVzdChhY3R1YWwpXG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuLy8g5pWw5o2u5qih5p2/IO+8nT4g5ZON5bqU5pWw5o2uXG5mdW5jdGlvbiBjb252ZXJ0KGl0ZW0sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gVXRpbC5pc0Z1bmN0aW9uKGl0ZW0udGVtcGxhdGUpID9cbiAgICAgICAgaXRlbS50ZW1wbGF0ZShvcHRpb25zKSA6IE1vY2tYTUxIdHRwUmVxdWVzdC5Nb2NrLm1vY2soaXRlbS50ZW1wbGF0ZSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBNb2NrWE1MSHR0cFJlcXVlc3QiXX0=