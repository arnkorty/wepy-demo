'use strict';

/*
    ## Date
*/
var patternLetters = {
    yyyy: 'getFullYear',
    yy: function yy(date) {
        return ('' + date.getFullYear()).slice(2);
    },
    y: 'yy',

    MM: function MM(date) {
        var m = date.getMonth() + 1;
        return m < 10 ? '0' + m : m;
    },
    M: function M(date) {
        return date.getMonth() + 1;
    },

    dd: function dd(date) {
        var d = date.getDate();
        return d < 10 ? '0' + d : d;
    },
    d: 'getDate',

    HH: function HH(date) {
        var h = date.getHours();
        return h < 10 ? '0' + h : h;
    },
    H: 'getHours',
    hh: function hh(date) {
        var h = date.getHours() % 12;
        return h < 10 ? '0' + h : h;
    },
    h: function h(date) {
        return date.getHours() % 12;
    },

    mm: function mm(date) {
        var m = date.getMinutes();
        return m < 10 ? '0' + m : m;
    },
    m: 'getMinutes',

    ss: function ss(date) {
        var s = date.getSeconds();
        return s < 10 ? '0' + s : s;
    },
    s: 'getSeconds',

    SS: function SS(date) {
        var ms = date.getMilliseconds();
        return ms < 10 && '00' + ms || ms < 100 && '0' + ms || ms;
    },
    S: 'getMilliseconds',

    A: function A(date) {
        return date.getHours() < 12 ? 'AM' : 'PM';
    },
    a: function a(date) {
        return date.getHours() < 12 ? 'am' : 'pm';
    },
    T: 'getTime'
};
module.exports = {
    // 日期占位符集合。
    _patternLetters: patternLetters,
    // 日期占位符正则。
    _rformat: new RegExp(function () {
        var re = [];
        for (var i in patternLetters) {
            re.push(i);
        }return '(' + re.join('|') + ')';
    }(), 'g'),
    // 格式化日期。
    _formatDate: function _formatDate(date, format) {
        return format.replace(this._rformat, function creatNewSubString($0, flag) {
            return typeof patternLetters[flag] === 'function' ? patternLetters[flag](date) : patternLetters[flag] in patternLetters ? creatNewSubString($0, patternLetters[flag]) : date[patternLetters[flag]]();
        });
    },
    // 生成一个随机的 Date 对象。
    _randomDate: function _randomDate(min, max) {
        // min, max
        min = min === undefined ? new Date(0) : min;
        max = max === undefined ? new Date() : max;
        return new Date(Math.random() * (max.getTime() - min.getTime()));
    },
    // 返回一个随机的日期字符串。
    date: function date(format) {
        format = format || 'yyyy-MM-dd';
        return this._formatDate(this._randomDate(), format);
    },
    // 返回一个随机的时间字符串。
    time: function time(format) {
        format = format || 'HH:mm:ss';
        return this._formatDate(this._randomDate(), format);
    },
    // 返回一个随机的日期和时间字符串。
    datetime: function datetime(format) {
        format = format || 'yyyy-MM-dd HH:mm:ss';
        return this._formatDate(this._randomDate(), format);
    },
    // 返回当前的日期和时间字符串。
    now: function now(unit, format) {
        // now(unit) now(format)
        if (arguments.length === 1) {
            // now(format)
            if (!/year|month|day|hour|minute|second|week/.test(unit)) {
                format = unit;
                unit = '';
            }
        }
        unit = (unit || '').toLowerCase();
        format = format || 'yyyy-MM-dd HH:mm:ss';

        var date = new Date();

        /* jshint -W086 */
        // 参考自 http://momentjs.cn/docs/#/manipulating/start-of/
        switch (unit) {
            case 'year':
                date.setMonth(0);
            case 'month':
                date.setDate(1);
            case 'week':
            case 'day':
                date.setHours(0);
            case 'hour':
                date.setMinutes(0);
            case 'minute':
                date.setSeconds(0);
            case 'second':
                date.setMilliseconds(0);
        }
        switch (unit) {
            case 'week':
                date.setDate(date.getDate() - date.getDay());
        }

        return this._formatDate(date, format);
    }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRhdGUuanMiXSwibmFtZXMiOlsicGF0dGVybkxldHRlcnMiLCJ5eXl5IiwieXkiLCJkYXRlIiwiZ2V0RnVsbFllYXIiLCJzbGljZSIsInkiLCJNTSIsIm0iLCJnZXRNb250aCIsIk0iLCJkZCIsImQiLCJnZXREYXRlIiwiSEgiLCJoIiwiZ2V0SG91cnMiLCJIIiwiaGgiLCJtbSIsImdldE1pbnV0ZXMiLCJzcyIsInMiLCJnZXRTZWNvbmRzIiwiU1MiLCJtcyIsImdldE1pbGxpc2Vjb25kcyIsIlMiLCJBIiwiYSIsIlQiLCJtb2R1bGUiLCJleHBvcnRzIiwiX3BhdHRlcm5MZXR0ZXJzIiwiX3Jmb3JtYXQiLCJSZWdFeHAiLCJyZSIsImkiLCJwdXNoIiwiam9pbiIsIl9mb3JtYXREYXRlIiwiZm9ybWF0IiwicmVwbGFjZSIsImNyZWF0TmV3U3ViU3RyaW5nIiwiJDAiLCJmbGFnIiwiX3JhbmRvbURhdGUiLCJtaW4iLCJtYXgiLCJ1bmRlZmluZWQiLCJEYXRlIiwiTWF0aCIsInJhbmRvbSIsImdldFRpbWUiLCJ0aW1lIiwiZGF0ZXRpbWUiLCJub3ciLCJ1bml0IiwiYXJndW1lbnRzIiwibGVuZ3RoIiwidGVzdCIsInRvTG93ZXJDYXNlIiwic2V0TW9udGgiLCJzZXREYXRlIiwic2V0SG91cnMiLCJzZXRNaW51dGVzIiwic2V0U2Vjb25kcyIsInNldE1pbGxpc2Vjb25kcyIsImdldERheSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7O0FBR0EsSUFBSUEsaUJBQWlCO0FBQ2pCQyxVQUFNLGFBRFc7QUFFakJDLFFBQUksWUFBU0MsSUFBVCxFQUFlO0FBQ2YsZUFBTyxDQUFDLEtBQUtBLEtBQUtDLFdBQUwsRUFBTixFQUEwQkMsS0FBMUIsQ0FBZ0MsQ0FBaEMsQ0FBUDtBQUNILEtBSmdCO0FBS2pCQyxPQUFHLElBTGM7O0FBT2pCQyxRQUFJLFlBQVNKLElBQVQsRUFBZTtBQUNmLFlBQUlLLElBQUlMLEtBQUtNLFFBQUwsS0FBa0IsQ0FBMUI7QUFDQSxlQUFPRCxJQUFJ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QVVDLE1BQVYsS0FBcUIsQ0FBekIsRUFBNEI7QUFDeEI7QUFDQSxnQkFBSSxDQUFDLHlDQUF5Q0MsSUFBekMsQ0FBOENILElBQTlDLENBQUwsRUFBMEQ7QUFDdERoQix5QkFBU2dCLElBQVQ7QUFDQUEsdUJBQU8sRUFBUDtBQUNIO0FBQ0o7QUFDREEsZUFBTyxDQUFDQSxRQUFRLEVBQVQsRUFBYUksV0FBYixFQUFQO0FBQ0FwQixpQkFBU0EsVUFBVSxxQkFBbkI7O0FBRUEsWUFBSXRDLE9BQU8sSUFBSStDLElBQUosRUFBWDs7QUFFQTtBQUNBO0FBQ0EsZ0JBQVFPLElBQVI7QUFDSSxpQkFBSyxNQUFMO0FBQ0l0RCxxQkFBSzJELFFBQUwsQ0FBYyxDQUFkO0FBQ0osaUJBQUssT0FBTDtBQUNJM0QscUJBQUs0RCxPQUFMLENBQWEsQ0FBYjtBQUNKLGlCQUFLLE1BQUw7QUFDQSxpQkFBSyxLQUFMO0FBQ0k1RCxxQkFBSzZELFFBQUwsQ0FBYyxDQUFkO0FBQ0osaUJBQUssTUFBTDtBQUNJN0QscUJBQUs4RCxVQUFMLENBQWdCLENBQWhCO0FBQ0osaUJBQUssUUFBTDtBQUNJOUQscUJBQUsrRCxVQUFMLENBQWdCLENBQWhCO0FBQ0osaUJBQUssUUFBTDtBQUNJL0QscUJBQUtnRSxlQUFMLENBQXFCLENBQXJCO0FBYlI7QUFlQSxnQkFBUVYsSUFBUjtBQUNJLGlCQUFLLE1BQUw7QUFDSXRELHFCQUFLNEQsT0FBTCxDQUFhNUQsS0FBS1UsT0FBTCxLQUFpQlYsS0FBS2lFLE1BQUwsRUFBOUI7QUFGUjs7QUFLQSxlQUFPLEtBQUs1QixXQUFMLENBQWlCckMsSUFBakIsRUFBdUJzQyxNQUF2QixDQUFQO0FBQ0g7QUE1RVksQ0FBakIiLCJmaWxlIjoiZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgIyMgRGF0ZVxuKi9cbnZhciBwYXR0ZXJuTGV0dGVycyA9IHtcbiAgICB5eXl5OiAnZ2V0RnVsbFllYXInLFxuICAgIHl5OiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIHJldHVybiAoJycgKyBkYXRlLmdldEZ1bGxZZWFyKCkpLnNsaWNlKDIpXG4gICAgfSxcbiAgICB5OiAneXknLFxuXG4gICAgTU06IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgdmFyIG0gPSBkYXRlLmdldE1vbnRoKCkgKyAxXG4gICAgICAgIHJldHVybiBtIDwgMTAgPyAnMCcgKyBtIDogbVxuICAgIH0sXG4gICAgTTogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICByZXR1cm4gZGF0ZS5nZXRNb250aCgpICsgMVxuICAgIH0sXG5cbiAgICBkZDogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICB2YXIgZCA9IGRhdGUuZ2V0RGF0ZSgpXG4gICAgICAgIHJldHVybiBkIDwgMTAgPyAnMCcgKyBkIDogZFxuICAgIH0sXG4gICAgZDogJ2dldERhdGUnLFxuXG4gICAgSEg6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgdmFyIGggPSBkYXRlLmdldEhvdXJzKClcbiAgICAgICAgcmV0dXJuIGggPCAxMCA/ICcwJyArIGggOiBoXG4gICAgfSxcbiAgICBIOiAnZ2V0SG91cnMnLFxuICAgIGhoOiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIHZhciBoID0gZGF0ZS5nZXRIb3VycygpICUgMTJcbiAgICAgICAgcmV0dXJuIGggPCAxMCA/ICcwJyArIGggOiBoXG4gICAgfSxcbiAgICBoOiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIHJldHVybiBkYXRlLmdldEhvdXJzKCkgJSAxMlxuICAgIH0sXG5cbiAgICBtbTogZnVuY3Rpb24oZGF0ZSkge1xuICAgICAgICB2YXIgbSA9IGRhdGUuZ2V0TWludXRlcygpXG4gICAgICAgIHJldHVybiBtIDwgMTAgPyAnMCcgKyBtIDogbVxuICAgIH0sXG4gICAgbTogJ2dldE1pbnV0ZXMnLFxuXG4gICAgc3M6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgdmFyIHMgPSBkYXRlLmdldFNlY29uZHMoKVxuICAgICAgICByZXR1cm4gcyA8IDEwID8gJzAnICsgcyA6IHNcbiAgICB9LFxuICAgIHM6ICdnZXRTZWNvbmRzJyxcblxuICAgIFNTOiBmdW5jdGlvbihkYXRlKSB7XG4gICAgICAgIHZhciBtcyA9IGRhdGUuZ2V0TWlsbGlzZWNvbmRzKClcbiAgICAgICAgcmV0dXJuIG1zIDwgMTAgJiYgJzAwJyArIG1zIHx8IG1zIDwgMTAwICYmICcwJyArIG1zIHx8IG1zXG4gICAgfSxcbiAgICBTOiAnZ2V0TWlsbGlzZWNvbmRzJyxcblxuICAgIEE6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKSA8IDEyID8gJ0FNJyA6ICdQTSdcbiAgICB9LFxuICAgIGE6IGZ1bmN0aW9uKGRhdGUpIHtcbiAgICAgICAgcmV0dXJuIGRhdGUuZ2V0SG91cnMoKSA8IDEyID8gJ2FtJyA6ICdwbSdcbiAgICB9LFxuICAgIFQ6ICdnZXRUaW1lJ1xufVxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8g5pel5pyf5Y2g5L2N56ym6ZuG5ZCI44CCXG4gICAgX3BhdHRlcm5MZXR0ZXJzOiBwYXR0ZXJuTGV0dGVycyxcbiAgICAvLyDml6XmnJ/ljaDkvY3nrKbmraPliJnjgIJcbiAgICBfcmZvcm1hdDogbmV3IFJlZ0V4cCgoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZSA9IFtdXG4gICAgICAgIGZvciAodmFyIGkgaW4gcGF0dGVybkxldHRlcnMpIHJlLnB1c2goaSlcbiAgICAgICAgcmV0dXJuICcoJyArIHJlLmpvaW4oJ3wnKSArICcpJ1xuICAgIH0pKCksICdnJyksXG4gICAgLy8g5qC85byP5YyW5pel5pyf44CCXG4gICAgX2Zvcm1hdERhdGU6IGZ1bmN0aW9uKGRhdGUsIGZvcm1hdCkge1xuICAgICAgICByZXR1cm4gZm9ybWF0LnJlcGxhY2UodGhpcy5fcmZvcm1hdCwgZnVuY3Rpb24gY3JlYXROZXdTdWJTdHJpbmcoJDAsIGZsYWcpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgcGF0dGVybkxldHRlcnNbZmxhZ10gPT09ICdmdW5jdGlvbicgPyBwYXR0ZXJuTGV0dGVyc1tmbGFnXShkYXRlKSA6XG4gICAgICAgICAgICAgICAgcGF0dGVybkxldHRlcnNbZmxhZ10gaW4gcGF0dGVybkxldHRlcnMgPyBjcmVhdE5ld1N1YlN0cmluZygkMCwgcGF0dGVybkxldHRlcnNbZmxhZ10pIDpcbiAgICAgICAgICAgICAgICBkYXRlW3BhdHRlcm5MZXR0ZXJzW2ZsYWddXSgpXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICAvLyDnlJ/miJDkuIDkuKrpmo/mnLrnmoQgRGF0ZSDlr7nosaHjgIJcbiAgICBfcmFuZG9tRGF0ZTogZnVuY3Rpb24obWluLCBtYXgpIHsgLy8gbWluLCBtYXhcbiAgICAgICAgbWluID0gbWluID09PSB1bmRlZmluZWQgPyBuZXcgRGF0ZSgwKSA6IG1pblxuICAgICAgICBtYXggPSBtYXggPT09IHVuZGVmaW5lZCA/IG5ldyBEYXRlKCkgOiBtYXhcbiAgICAgICAgcmV0dXJuIG5ldyBEYXRlKE1hdGgucmFuZG9tKCkgKiAobWF4LmdldFRpbWUoKSAtIG1pbi5nZXRUaW1lKCkpKVxuICAgIH0sXG4gICAgLy8g6L+U5Zue5LiA5Liq6ZqP5py655qE5pel5pyf5a2X56ym5Liy44CCXG4gICAgZGF0ZTogZnVuY3Rpb24oZm9ybWF0KSB7XG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAneXl5eS1NTS1kZCdcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdERhdGUodGhpcy5fcmFuZG9tRGF0ZSgpLCBmb3JtYXQpXG4gICAgfSxcbiAgICAvLyDov5Tlm57kuIDkuKrpmo/mnLrnmoTml7bpl7TlrZfnrKbkuLLjgIJcbiAgICB0aW1lOiBmdW5jdGlvbihmb3JtYXQpIHtcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICdISDptbTpzcydcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdERhdGUodGhpcy5fcmFuZG9tRGF0ZSgpLCBmb3JtYXQpXG4gICAgfSxcbiAgICAvLyDov5Tlm57kuIDkuKrpmo/mnLrnmoTml6XmnJ/lkozml7bpl7TlrZfnrKbkuLLjgIJcbiAgICBkYXRldGltZTogZnVuY3Rpb24oZm9ybWF0KSB7XG4gICAgICAgIGZvcm1hdCA9IGZvcm1hdCB8fCAneXl5eS1NTS1kZCBISDptbTpzcydcbiAgICAgICAgcmV0dXJuIHRoaXMuX2Zvcm1hdERhdGUodGhpcy5fcmFuZG9tRGF0ZSgpLCBmb3JtYXQpXG4gICAgfSxcbiAgICAvLyDov5Tlm57lvZPliY3nmoTml6XmnJ/lkozml7bpl7TlrZfnrKbkuLLjgIJcbiAgICBub3c6IGZ1bmN0aW9uKHVuaXQsIGZvcm1hdCkge1xuICAgICAgICAvLyBub3codW5pdCkgbm93KGZvcm1hdClcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgIC8vIG5vdyhmb3JtYXQpXG4gICAgICAgICAgICBpZiAoIS95ZWFyfG1vbnRofGRheXxob3VyfG1pbnV0ZXxzZWNvbmR8d2Vlay8udGVzdCh1bml0KSkge1xuICAgICAgICAgICAgICAgIGZvcm1hdCA9IHVuaXRcbiAgICAgICAgICAgICAgICB1bml0ID0gJydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1bml0ID0gKHVuaXQgfHwgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgZm9ybWF0ID0gZm9ybWF0IHx8ICd5eXl5LU1NLWRkIEhIOm1tOnNzJ1xuXG4gICAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxuXG4gICAgICAgIC8qIGpzaGludCAtVzA4NiAqL1xuICAgICAgICAvLyDlj4LogIPoh6ogaHR0cDovL21vbWVudGpzLmNuL2RvY3MvIy9tYW5pcHVsYXRpbmcvc3RhcnQtb2YvXG4gICAgICAgIHN3aXRjaCAodW5pdCkge1xuICAgICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRNb250aCgwKVxuICAgICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgICAgIGRhdGUuc2V0RGF0ZSgxKVxuICAgICAgICAgICAgY2FzZSAnd2Vlayc6XG4gICAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgICAgIGRhdGUuc2V0SG91cnMoMClcbiAgICAgICAgICAgIGNhc2UgJ2hvdXInOlxuICAgICAgICAgICAgICAgIGRhdGUuc2V0TWludXRlcygwKVxuICAgICAgICAgICAgY2FzZSAnbWludXRlJzpcbiAgICAgICAgICAgICAgICBkYXRlLnNldFNlY29uZHMoMClcbiAgICAgICAgICAgIGNhc2UgJ3NlY29uZCc6XG4gICAgICAgICAgICAgICAgZGF0ZS5zZXRNaWxsaXNlY29uZHMoMClcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHVuaXQpIHtcbiAgICAgICAgICAgIGNhc2UgJ3dlZWsnOlxuICAgICAgICAgICAgICAgIGRhdGUuc2V0RGF0ZShkYXRlLmdldERhdGUoKSAtIGRhdGUuZ2V0RGF5KCkpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5fZm9ybWF0RGF0ZShkYXRlLCBmb3JtYXQpXG4gICAgfVxufSJdfQ==