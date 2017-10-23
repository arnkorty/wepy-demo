'use strict';

/* global require, module, window */
var Handler = require('./mock/handler.js');
var Util = require('./mock/util.js');
var Random = require('./mock/random/index.js');
var RE = require('./mock/regexp/index.js');
var toJSONSchema = require('./mock/schema/index.js');
var valid = require('./mock/valid/index.js');

var XHR;
if (typeof window !== 'undefined') XHR = require('./mock/xhr/index.js');

/*!
    Mock - 模拟请求 & 模拟数据
    https://github.com/nuysoft/Mock
    墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
*/
var Mock = {
    Handler: Handler,
    Random: Random,
    Util: Util,
    XHR: XHR,
    RE: RE,
    toJSONSchema: toJSONSchema,
    valid: valid,
    heredoc: Util.heredoc,
    setup: function setup(settings) {
        return XHR.setup(settings);
    },
    _mocked: {}
};

Mock.version = '1.0.1-beta3';

// 避免循环依赖
if (XHR) XHR.Mock = Mock;

/*
    * Mock.mock( template )
    * Mock.mock( function() )
    * Mock.mock( rurl, template )
    * Mock.mock( rurl, function(options) )
    * Mock.mock( rurl, rtype, template )
    * Mock.mock( rurl, rtype, function(options) )

    根据数据模板生成模拟数据。
*/
Mock.mock = function (rurl, rtype, template) {
    // Mock.mock(template)
    if (arguments.length === 1) {
        return Handler.gen(rurl);
    }
    // Mock.mock(rurl, template)
    if (arguments.length === 2) {
        template = rtype;
        rtype = undefined;
    }
    // 拦截 XHR
    if (XHR) window.XMLHttpRequest = XHR;
    Mock._mocked[rurl + (rtype || '')] = {
        rurl: rurl,
        rtype: rtype,
        template: template
    };
    return Mock;
};

module.exports = Mock;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vY2suanMiXSwibmFtZXMiOlsiSGFuZGxlciIsInJlcXVpcmUiLCJVdGlsIiwiUmFuZG9tIiwiUkUiLCJ0b0pTT05TY2hlbWEiLCJ2YWxpZCIsIlhIUiIsIndpbmRvdyIsIk1vY2siLCJoZXJlZG9jIiwic2V0dXAiLCJzZXR0aW5ncyIsIl9tb2NrZWQiLCJ2ZXJzaW9uIiwibW9jayIsInJ1cmwiLCJydHlwZSIsInRlbXBsYXRlIiwiYXJndW1lbnRzIiwibGVuZ3RoIiwiZ2VuIiwidW5kZWZpbmVkIiwiWE1MSHR0cFJlcXVlc3QiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0EsSUFBSUEsVUFBVUMsUUFBUSxnQkFBUixDQUFkO0FBQ0EsSUFBSUMsT0FBT0QsUUFBUSxhQUFSLENBQVg7QUFDQSxJQUFJRSxTQUFTRixRQUFRLGVBQVIsQ0FBYjtBQUNBLElBQUlHLEtBQUtILFFBQVEsZUFBUixDQUFUO0FBQ0EsSUFBSUksZUFBZUosUUFBUSxlQUFSLENBQW5CO0FBQ0EsSUFBSUssUUFBUUwsUUFBUSxjQUFSLENBQVo7O0FBRUEsSUFBSU0sR0FBSjtBQUNBLElBQUksT0FBT0MsTUFBUCxLQUFrQixXQUF0QixFQUFtQ0QsTUFBTU4sUUFBUSxZQUFSLENBQU47O0FBRW5DOzs7OztBQUtBLElBQUlRLE9BQU87QUFDUFQsYUFBU0EsT0FERjtBQUVQRyxZQUFRQSxNQUZEO0FBR1BELFVBQU1BLElBSEM7QUFJUEssU0FBS0EsR0FKRTtBQUtQSCxRQUFJQSxFQUxHO0FBTVBDLGtCQUFjQSxZQU5QO0FBT1BDLFdBQU9BLEtBUEE7QUFRUEksYUFBU1IsS0FBS1EsT0FSUDtBQVNQQyxXQUFPLGVBQVNDLFFBQVQsRUFBbUI7QUFDdEIsZUFBT0wsSUFBSUksS0FBSixDQUFVQyxRQUFWLENBQVA7QUFDSCxLQVhNO0FBWVBDLGFBQVM7QUFaRixDQUFYOztBQWVBSixLQUFLSyxPQUFMLEdBQWUsYUFBZjs7QUFFQTtBQUNBLElBQUlQLEdBQUosRUFBU0EsSUFBSUUsSUFBSixHQUFXQSxJQUFYOztBQUVUOzs7Ozs7Ozs7O0FBVUFBLEtBQUtNLElBQUwsR0FBWSxVQUFTQyxJQUFULEVBQWVDLEtBQWYsRUFBc0JDLFFBQXRCLEVBQWdDO0FBQ3hDO0FBQ0EsUUFBSUMsVUFBVUMsTUFBVixLQUFxQixDQUF6QixFQUE0QjtBQUN4QixlQUFPcEIsUUFBUXFCLEdBQVIsQ0FBWUwsSUFBWixDQUFQO0FBQ0g7QUFDRDtBQUNBLFFBQUlHLFVBQVVDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDeEJGLG1CQUFXRCxLQUFYO0FBQ0FBLGdCQUFRSyxTQUFSO0FBQ0g7QUFDRDtBQUNBLFFBQUlmLEdBQUosRUFBU0MsT0FBT2UsY0FBUCxHQUF3QmhCLEdBQXhCO0FBQ1RFLFNBQUtJLE9BQUwsQ0FBYUcsUUFBUUMsU0FBUyxFQUFqQixDQUFiLElBQXFDO0FBQ2pDRCxjQUFNQSxJQUQyQjtBQUVqQ0MsZUFBT0EsS0FGMEI7QUFHakNDLGtCQUFVQTtBQUh1QixLQUFyQztBQUtBLFdBQU9ULElBQVA7QUFDSCxDQWxCRDs7QUFvQkFlLE9BQU9DLE9BQVAsR0FBaUJoQixJQUFqQiIsImZpbGUiOiJtb2NrLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHJlcXVpcmUsIG1vZHVsZSwgd2luZG93ICovXG52YXIgSGFuZGxlciA9IHJlcXVpcmUoJy4vbW9jay9oYW5kbGVyJylcbnZhciBVdGlsID0gcmVxdWlyZSgnLi9tb2NrL3V0aWwnKVxudmFyIFJhbmRvbSA9IHJlcXVpcmUoJy4vbW9jay9yYW5kb20nKVxudmFyIFJFID0gcmVxdWlyZSgnLi9tb2NrL3JlZ2V4cCcpXG52YXIgdG9KU09OU2NoZW1hID0gcmVxdWlyZSgnLi9tb2NrL3NjaGVtYScpXG52YXIgdmFsaWQgPSByZXF1aXJlKCcuL21vY2svdmFsaWQnKVxuXG52YXIgWEhSXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIFhIUiA9IHJlcXVpcmUoJy4vbW9jay94aHInKVxuXG4vKiFcbiAgICBNb2NrIC0g5qih5ouf6K+35rGCICYg5qih5ouf5pWw5o2uXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL251eXNvZnQvTW9ja1xuICAgIOWiqOaZuiBtb3poaS5neXlAdGFvYmFvLmNvbSBudXlzb2Z0QGdtYWlsLmNvbVxuKi9cbnZhciBNb2NrID0ge1xuICAgIEhhbmRsZXI6IEhhbmRsZXIsXG4gICAgUmFuZG9tOiBSYW5kb20sXG4gICAgVXRpbDogVXRpbCxcbiAgICBYSFI6IFhIUixcbiAgICBSRTogUkUsXG4gICAgdG9KU09OU2NoZW1hOiB0b0pTT05TY2hlbWEsXG4gICAgdmFsaWQ6IHZhbGlkLFxuICAgIGhlcmVkb2M6IFV0aWwuaGVyZWRvYyxcbiAgICBzZXR1cDogZnVuY3Rpb24oc2V0dGluZ3MpIHtcbiAgICAgICAgcmV0dXJuIFhIUi5zZXR1cChzZXR0aW5ncylcbiAgICB9LFxuICAgIF9tb2NrZWQ6IHt9XG59XG5cbk1vY2sudmVyc2lvbiA9ICcxLjAuMS1iZXRhMydcblxuLy8g6YG/5YWN5b6q546v5L6d6LWWXG5pZiAoWEhSKSBYSFIuTW9jayA9IE1vY2tcblxuLypcbiAgICAqIE1vY2subW9jayggdGVtcGxhdGUgKVxuICAgICogTW9jay5tb2NrKCBmdW5jdGlvbigpIClcbiAgICAqIE1vY2subW9jayggcnVybCwgdGVtcGxhdGUgKVxuICAgICogTW9jay5tb2NrKCBydXJsLCBmdW5jdGlvbihvcHRpb25zKSApXG4gICAgKiBNb2NrLm1vY2soIHJ1cmwsIHJ0eXBlLCB0ZW1wbGF0ZSApXG4gICAgKiBNb2NrLm1vY2soIHJ1cmwsIHJ0eXBlLCBmdW5jdGlvbihvcHRpb25zKSApXG5cbiAgICDmoLnmja7mlbDmja7mqKHmnb/nlJ/miJDmqKHmi5/mlbDmja7jgIJcbiovXG5Nb2NrLm1vY2sgPSBmdW5jdGlvbihydXJsLCBydHlwZSwgdGVtcGxhdGUpIHtcbiAgICAvLyBNb2NrLm1vY2sodGVtcGxhdGUpXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIEhhbmRsZXIuZ2VuKHJ1cmwpXG4gICAgfVxuICAgIC8vIE1vY2subW9jayhydXJsLCB0ZW1wbGF0ZSlcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICB0ZW1wbGF0ZSA9IHJ0eXBlXG4gICAgICAgIHJ0eXBlID0gdW5kZWZpbmVkXG4gICAgfVxuICAgIC8vIOaLpuaIqiBYSFJcbiAgICBpZiAoWEhSKSB3aW5kb3cuWE1MSHR0cFJlcXVlc3QgPSBYSFJcbiAgICBNb2NrLl9tb2NrZWRbcnVybCArIChydHlwZSB8fCAnJyldID0ge1xuICAgICAgICBydXJsOiBydXJsLFxuICAgICAgICBydHlwZTogcnR5cGUsXG4gICAgICAgIHRlbXBsYXRlOiB0ZW1wbGF0ZVxuICAgIH1cbiAgICByZXR1cm4gTW9ja1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vY2siXX0=