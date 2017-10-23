'use strict';

/*
    ## Address
*/

var DICT = require('./address_dict.js');
var REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北'];

module.exports = {
    // 随机生成一个大区。
    region: function region() {
        return this.pick(REGION);
    },
    // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
    province: function province() {
        return this.pick(DICT).name;
    },
    // 随机生成一个（中国）市。
    city: function city(prefix) {
        var province = this.pick(DICT);
        var city = this.pick(province.children);
        return prefix ? [province.name, city.name].join(' ') : city.name;
    },
    // 随机生成一个（中国）县。
    county: function county(prefix) {
        var province = this.pick(DICT);
        var city = this.pick(province.children);
        var county = this.pick(city.children) || {
            name: '-'
        };
        return prefix ? [province.name, city.name, county.name].join(' ') : county.name;
    },
    // 随机生成一个邮政编码（六位数字）。
    zip: function zip(len) {
        var zip = '';
        for (var i = 0; i < (len || 6); i++) {
            zip += this.natural(0, 9);
        }return zip;
    }

    // address: function() {},
    // phone: function() {},
    // areacode: function() {},
    // street: function() {},
    // street_suffixes: function() {},
    // street_suffix: function() {},
    // states: function() {},
    // state: function() {},
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFkZHJlc3MuanMiXSwibmFtZXMiOlsiRElDVCIsInJlcXVpcmUiLCJSRUdJT04iLCJtb2R1bGUiLCJleHBvcnRzIiwicmVnaW9uIiwicGljayIsInByb3ZpbmNlIiwibmFtZSIsImNpdHkiLCJwcmVmaXgiLCJjaGlsZHJlbiIsImpvaW4iLCJjb3VudHkiLCJ6aXAiLCJsZW4iLCJpIiwibmF0dXJhbCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUlBLElBQUlBLE9BQU9DLFFBQVEsZ0JBQVIsQ0FBWDtBQUNBLElBQUlDLFNBQVMsQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsSUFBL0IsRUFBcUMsSUFBckMsQ0FBYjs7QUFFQUMsT0FBT0MsT0FBUCxHQUFpQjtBQUNiO0FBQ0FDLFlBQVEsa0JBQVc7QUFDZixlQUFPLEtBQUtDLElBQUwsQ0FBVUosTUFBVixDQUFQO0FBQ0gsS0FKWTtBQUtiO0FBQ0FLLGNBQVUsb0JBQVc7QUFDakIsZUFBTyxLQUFLRCxJQUFMLENBQVVOLElBQVYsRUFBZ0JRLElBQXZCO0FBQ0gsS0FSWTtBQVNiO0FBQ0FDLFVBQU0sY0FBU0MsTUFBVCxFQUFpQjtBQUNuQixZQUFJSCxXQUFXLEtBQUtELElBQUwsQ0FBVU4sSUFBVixDQUFmO0FBQ0EsWUFBSVMsT0FBTyxLQUFLSCxJQUFMLENBQVVDLFNBQVNJLFFBQW5CLENBQVg7QUFDQSxlQUFPRCxTQUFTLENBQUNILFNBQVNDLElBQVYsRUFBZ0JDLEtBQUtELElBQXJCLEVBQTJCSSxJQUEzQixDQUFnQyxHQUFoQyxDQUFULEdBQWdESCxLQUFLRCxJQUE1RDtBQUNILEtBZFk7QUFlYjtBQUNBSyxZQUFRLGdCQUFTSCxNQUFULEVBQWlCO0FBQ3JCLFlBQUlILFdBQVcsS0FBS0QsSUFBTCxDQUFVTixJQUFWLENBQWY7QUFDQSxZQUFJUyxPQUFPLEtBQUtILElBQUwsQ0FBVUMsU0FBU0ksUUFBbkIsQ0FBWDtBQUNBLFlBQUlFLFNBQVMsS0FBS1AsSUFBTCxDQUFVRyxLQUFLRSxRQUFmLEtBQTRCO0FBQ3JDSCxrQkFBTTtBQUQrQixTQUF6QztBQUdBLGVBQU9FLFNBQVMsQ0FBQ0gsU0FBU0MsSUFBVixFQUFnQkMsS0FBS0QsSUFBckIsRUFBMkJLLE9BQU9MLElBQWxDLEVBQXdDSSxJQUF4QyxDQUE2QyxHQUE3QyxDQUFULEdBQTZEQyxPQUFPTCxJQUEzRTtBQUNILEtBdkJZO0FBd0JiO0FBQ0FNLFNBQUssYUFBU0MsR0FBVCxFQUFjO0FBQ2YsWUFBSUQsTUFBTSxFQUFWO0FBQ0EsYUFBSyxJQUFJRSxJQUFJLENBQWIsRUFBZ0JBLEtBQUtELE9BQU8sQ0FBWixDQUFoQixFQUFnQ0MsR0FBaEM7QUFBcUNGLG1CQUFPLEtBQUtHLE9BQUwsQ0FBYSxDQUFiLEVBQWdCLENBQWhCLENBQVA7QUFBckMsU0FDQSxPQUFPSCxHQUFQO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQXRDYSxDQUFqQiIsImZpbGUiOiJhZGRyZXNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLypcbiAgICAjIyBBZGRyZXNzXG4qL1xuXG52YXIgRElDVCA9IHJlcXVpcmUoJy4vYWRkcmVzc19kaWN0JylcbnZhciBSRUdJT04gPSBbJ+S4nOWMlycsICfljY7ljJcnLCAn5Y2O5LicJywgJ+WNjuS4rScsICfljY7ljZcnLCAn6KW/5Y2XJywgJ+ilv+WMlyddXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8vIOmaj+acuueUn+aIkOS4gOS4quWkp+WMuuOAglxuICAgIHJlZ2lvbjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBpY2soUkVHSU9OKVxuICAgIH0sXG4gICAgLy8g6ZqP5py655Sf5oiQ5LiA5Liq77yI5Lit5Zu977yJ55yB77yI5oiW55u06L6W5biC44CB6Ieq5rK75Yy644CB54m55Yir6KGM5pS/5Yy677yJ44CCXG4gICAgcHJvdmluY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5waWNrKERJQ1QpLm5hbWVcbiAgICB9LFxuICAgIC8vIOmaj+acuueUn+aIkOS4gOS4qu+8iOS4reWbve+8ieW4guOAglxuICAgIGNpdHk6IGZ1bmN0aW9uKHByZWZpeCkge1xuICAgICAgICB2YXIgcHJvdmluY2UgPSB0aGlzLnBpY2soRElDVClcbiAgICAgICAgdmFyIGNpdHkgPSB0aGlzLnBpY2socHJvdmluY2UuY2hpbGRyZW4pXG4gICAgICAgIHJldHVybiBwcmVmaXggPyBbcHJvdmluY2UubmFtZSwgY2l0eS5uYW1lXS5qb2luKCcgJykgOiBjaXR5Lm5hbWVcbiAgICB9LFxuICAgIC8vIOmaj+acuueUn+aIkOS4gOS4qu+8iOS4reWbve+8ieWOv+OAglxuICAgIGNvdW50eTogZnVuY3Rpb24ocHJlZml4KSB7XG4gICAgICAgIHZhciBwcm92aW5jZSA9IHRoaXMucGljayhESUNUKVxuICAgICAgICB2YXIgY2l0eSA9IHRoaXMucGljayhwcm92aW5jZS5jaGlsZHJlbilcbiAgICAgICAgdmFyIGNvdW50eSA9IHRoaXMucGljayhjaXR5LmNoaWxkcmVuKSB8fCB7XG4gICAgICAgICAgICBuYW1lOiAnLSdcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcHJlZml4ID8gW3Byb3ZpbmNlLm5hbWUsIGNpdHkubmFtZSwgY291bnR5Lm5hbWVdLmpvaW4oJyAnKSA6IGNvdW50eS5uYW1lXG4gICAgfSxcbiAgICAvLyDpmo/mnLrnlJ/miJDkuIDkuKrpgq7mlL/nvJbnoIHvvIjlha3kvY3mlbDlrZfvvInjgIJcbiAgICB6aXA6IGZ1bmN0aW9uKGxlbikge1xuICAgICAgICB2YXIgemlwID0gJydcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAobGVuIHx8IDYpOyBpKyspIHppcCArPSB0aGlzLm5hdHVyYWwoMCwgOSlcbiAgICAgICAgcmV0dXJuIHppcFxuICAgIH1cblxuICAgIC8vIGFkZHJlc3M6IGZ1bmN0aW9uKCkge30sXG4gICAgLy8gcGhvbmU6IGZ1bmN0aW9uKCkge30sXG4gICAgLy8gYXJlYWNvZGU6IGZ1bmN0aW9uKCkge30sXG4gICAgLy8gc3RyZWV0OiBmdW5jdGlvbigpIHt9LFxuICAgIC8vIHN0cmVldF9zdWZmaXhlczogZnVuY3Rpb24oKSB7fSxcbiAgICAvLyBzdHJlZXRfc3VmZml4OiBmdW5jdGlvbigpIHt9LFxuICAgIC8vIHN0YXRlczogZnVuY3Rpb24oKSB7fSxcbiAgICAvLyBzdGF0ZTogZnVuY3Rpb24oKSB7fSxcbn0iXX0=