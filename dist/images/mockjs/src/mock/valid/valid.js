'use strict';

/*
    ## valid(template, data)

    校验真实数据 data 是否与数据模板 template 匹配。
    
    实现思路：
    1. 解析规则。
        先把数据模板 template 解析为更方便机器解析的 JSON-Schame
        name               属性名 
        type               属性值类型
        template           属性值模板
        properties         对象属性数组
        items              数组元素数组
        rule               属性值生成规则
    2. 递归验证规则。
        然后用 JSON-Schema 校验真实数据，校验项包括属性名、值类型、值、值生成规则。

    提示信息 
    https://github.com/fge/json-schema-validator/blob/master/src/main/resources/com/github/fge/jsonschema/validator/validation.properties
    [JSON-Schama validator](http://json-schema-validator.herokuapp.com/)
    [Regexp Demo](http://demos.forbeslindesay.co.uk/regexp/)
*/
var Constant = require('./../constant.js');
var Util = require('./../util.js');
var toJSONSchema = require('./../schema/index.js');

function valid(template, data) {
    var schema = toJSONSchema(template);
    var result = Diff.diff(schema, data);
    for (var i = 0; i < result.length; i++) {
        // console.log(template, data)
        // console.warn(Assert.message(result[i]))
    }
    return result;
}

/*
    ## name
        有生成规则：比较解析后的 name
        无生成规则：直接比较
    ## type
        无类型转换：直接比较
        有类型转换：先试着解析 template，然后再检查？
    ## value vs. template
        基本类型
            无生成规则：直接比较
            有生成规则：
                number
                    min-max.dmin-dmax
                    min-max.dcount
                    count.dmin-dmax
                    count.dcount
                    +step
                    整数部分
                    小数部分
                boolean 
                string  
                    min-max
                    count
    ## properties
        对象
            有生成规则：检测期望的属性个数，继续递归
            无生成规则：检测全部的属性个数，继续递归
    ## items
        数组
            有生成规则：
                `'name|1': [{}, {} ...]`            其中之一，继续递归
                `'name|+1': [{}, {} ...]`           顺序检测，继续递归
                `'name|min-max': [{}, {} ...]`      检测个数，继续递归
                `'name|count': [{}, {} ...]`        检测个数，继续递归
            无生成规则：检测全部的元素个数，继续递归
*/
var Diff = {
    diff: function diff(schema, data, name /* Internal Use Only */) {
        var result = [];

        // 先检测名称 name 和类型 type，如果匹配，才有必要继续检测
        if (this.name(schema, data, name, result) && this.type(schema, data, name, result)) {
            this.value(schema, data, name, result);
            this.properties(schema, data, name, result);
            this.items(schema, data, name, result);
        }

        return result;
    },
    /* jshint unused:false */
    name: function name(schema, data, _name, result) {
        var length = result.length;

        Assert.equal('name', schema.path, _name + '', schema.name + '', result);

        return result.length === length;
    },
    type: function type(schema, data, name, result) {
        var length = result.length;

        switch (schema.type) {
            case 'string':
                // 跳过含有『占位符』的属性值，因为『占位符』返回值的类型可能和模板不一致，例如 '@int' 会返回一个整形值
                if (schema.template.match(Constant.RE_PLACEHOLDER)) return true;
                break;
            case 'array':
                if (schema.rule.parameters) {
                    // name|count: array
                    if (schema.rule.min !== undefined && schema.rule.max === undefined) {
                        // 跳过 name|1: array，因为最终值的类型（很可能）不是数组，也不一定与 `array` 中的类型一致
                        if (schema.rule.count === 1) return true;
                    }
                    // 跳过 name|+inc: array
                    if (schema.rule.parameters[2]) return true;
                }
                break;
            case 'function':
                // 跳过 `'name': function`，因为函数可以返回任何类型的值。
                return true;
        }

        Assert.equal('type', schema.path, Util.type(data), schema.type, result);

        return result.length === length;
    },
    value: function value(schema, data, name, result) {
        var length = result.length;

        var rule = schema.rule;
        var templateType = schema.type;
        if (templateType === 'object' || templateType === 'array' || templateType === 'function') return true;

        // 无生成规则
        if (!rule.parameters) {
            switch (templateType) {
                case 'regexp':
                    Assert.match('value', schema.path, data, schema.template, result);
                    return result.length === length;
                case 'string':
                    // 同样跳过含有『占位符』的属性值，因为『占位符』的返回值会通常会与模板不一致
                    if (schema.template.match(Constant.RE_PLACEHOLDER)) return result.length === length;
                    break;
            }
            Assert.equal('value', schema.path, data, schema.template, result);
            return result.length === length;
        }

        // 有生成规则
        var actualRepeatCount;
        switch (templateType) {
            case 'number':
                var parts = (data + '').split('.');
                parts[0] = +parts[0];

                // 整数部分
                // |min-max
                if (rule.min !== undefined && rule.max !== undefined) {
                    Assert.greaterThanOrEqualTo('value', schema.path, parts[0], Math.min(rule.min, rule.max), result);
                    // , 'numeric instance is lower than the required minimum (minimum: {expected}, found: {actual})')
                    Assert.lessThanOrEqualTo('value', schema.path, parts[0], Math.max(rule.min, rule.max), result);
                }
                // |count
                if (rule.min !== undefined && rule.max === undefined) {
                    Assert.equal('value', schema.path, parts[0], rule.min, result, '[value] ' + name);
                }

                // 小数部分
                if (rule.decimal) {
                    // |dmin-dmax
                    if (rule.dmin !== undefined && rule.dmax !== undefined) {
                        Assert.greaterThanOrEqualTo('value', schema.path, parts[1].length, rule.dmin, result);
                        Assert.lessThanOrEqualTo('value', schema.path, parts[1].length, rule.dmax, result);
                    }
                    // |dcount
                    if (rule.dmin !== undefined && rule.dmax === undefined) {
                        Assert.equal('value', schema.path, parts[1].length, rule.dmin, result);
                    }
                }

                break;

            case 'boolean':
                break;

            case 'string':
                // 'aaa'.match(/a/g)
                actualRepeatCount = data.match(new RegExp(schema.template, 'g'));
                actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;

                // |min-max
                if (rule.min !== undefined && rule.max !== undefined) {
                    Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.min, result);
                    Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.max, result);
                }
                // |count
                if (rule.min !== undefined && rule.max === undefined) {
                    Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result);
                }

                break;

            case 'regexp':
                actualRepeatCount = data.match(new RegExp(schema.template.source.replace(/^\^|\$$/g, ''), 'g'));
                actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;

                // |min-max
                if (rule.min !== undefined && rule.max !== undefined) {
                    Assert.greaterThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.min, result);
                    Assert.lessThanOrEqualTo('repeat count', schema.path, actualRepeatCount, rule.max, result);
                }
                // |count
                if (rule.min !== undefined && rule.max === undefined) {
                    Assert.equal('repeat count', schema.path, actualRepeatCount, rule.min, result);
                }
                break;
        }

        return result.length === length;
    },
    properties: function properties(schema, data, name, result) {
        var length = result.length;

        var rule = schema.rule;
        var keys = Util.keys(data);
        if (!schema.properties) return;

        // 无生成规则
        if (!schema.rule.parameters) {
            Assert.equal('properties length', schema.path, keys.length, schema.properties.length, result);
        } else {
            // 有生成规则
            // |min-max
            if (rule.min !== undefined && rule.max !== undefined) {
                Assert.greaterThanOrEqualTo('properties length', schema.path, keys.length, Math.min(rule.min, rule.max), result);
                Assert.lessThanOrEqualTo('properties length', schema.path, keys.length, Math.max(rule.min, rule.max), result);
            }
            // |count
            if (rule.min !== undefined && rule.max === undefined) {
                // |1, |>1
                if (rule.count !== 1) Assert.equal('properties length', schema.path, keys.length, rule.min, result);
            }
        }

        if (result.length !== length) return false;

        for (var i = 0; i < keys.length; i++) {
            result.push.apply(result, this.diff(function () {
                var property;
                Util.each(schema.properties, function (item /*, index*/) {
                    if (item.name === keys[i]) property = item;
                });
                return property || schema.properties[i];
            }(), data[keys[i]], keys[i]));
        }

        return result.length === length;
    },
    items: function items(schema, data, name, result) {
        var length = result.length;

        if (!schema.items) return;

        var rule = schema.rule;

        // 无生成规则
        if (!schema.rule.parameters) {
            Assert.equal('items length', schema.path, data.length, schema.items.length, result);
        } else {
            // 有生成规则
            // |min-max
            if (rule.min !== undefined && rule.max !== undefined) {
                Assert.greaterThanOrEqualTo('items', schema.path, data.length, Math.min(rule.min, rule.max) * schema.items.length, result, '[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements');
                Assert.lessThanOrEqualTo('items', schema.path, data.length, Math.max(rule.min, rule.max) * schema.items.length, result, '[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements');
            }
            // |count
            if (rule.min !== undefined && rule.max === undefined) {
                // |1, |>1
                if (rule.count === 1) return result.length === length;else Assert.equal('items length', schema.path, data.length, rule.min * schema.items.length, result);
            }
            // |+inc
            if (rule.parameters[2]) return result.length === length;
        }

        if (result.length !== length) return false;

        for (var i = 0; i < data.length; i++) {
            result.push.apply(result, this.diff(schema.items[i % schema.items.length], data[i], i % schema.items.length));
        }

        return result.length === length;
    }

    /*
        完善、友好的提示信息
        
        Equal, not equal to, greater than, less than, greater than or equal to, less than or equal to
        路径 验证类型 描述 
    
        Expect path.name is less than or equal to expected, but path.name is actual.
    
        Expect path.name is less than or equal to expected, but path.name is actual.
        Expect path.name is greater than or equal to expected, but path.name is actual.
    
    */
};var Assert = {
    message: function message(item) {
        return (item.message || '[{utype}] Expect {path}\'{ltype} {action} {expected}, but is {actual}').replace('{utype}', item.type.toUpperCase()).replace('{ltype}', item.type.toLowerCase()).replace('{path}', Util.isArray(item.path) && item.path.join('.') || item.path).replace('{action}', item.action).replace('{expected}', item.expected).replace('{actual}', item.actual);
    },
    equal: function equal(type, path, actual, expected, result, message) {
        if (actual === expected) return true;
        switch (type) {
            case 'type':
                // 正则模板 === 字符串最终值
                if (expected === 'regexp' && actual === 'string') return true;
                break;
        }

        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is equal to',
            message: message
        };
        item.message = Assert.message(item);
        result.push(item);
        return false;
    },
    // actual matches expected
    match: function match(type, path, actual, expected, result, message) {
        if (expected.test(actual)) return true;

        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'matches',
            message: message
        };
        item.message = Assert.message(item);
        result.push(item);
        return false;
    },
    notEqual: function notEqual(type, path, actual, expected, result, message) {
        if (actual !== expected) return true;
        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is not equal to',
            message: message
        };
        item.message = Assert.message(item);
        result.push(item);
        return false;
    },
    greaterThan: function greaterThan(type, path, actual, expected, result, message) {
        if (actual > expected) return true;
        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is greater than',
            message: message
        };
        item.message = Assert.message(item);
        result.push(item);
        return false;
    },
    lessThan: function lessThan(type, path, actual, expected, result, message) {
        if (actual < expected) return true;
        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is less to',
            message: message
        };
        item.message = Assert.message(item);
        result.push(item);
        return false;
    },
    greaterThanOrEqualTo: function greaterThanOrEqualTo(type, path, actual, expected, result, message) {
        if (actual >= expected) return true;
        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is greater than or equal to',
            message: message
        };
        item.message = Assert.message(item);
        result.push(item);
        return false;
    },
    lessThanOrEqualTo: function lessThanOrEqualTo(type, path, actual, expected, result, message) {
        if (actual <= expected) return true;
        var item = {
            path: path,
            type: type,
            actual: actual,
            expected: expected,
            action: 'is less than or equal to',
            message: message
        };
        item.message = Assert.message(item);
        result.push(item);
        return false;
    }
};

valid.Diff = Diff;
valid.Assert = Assert;

module.exports = valid;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkLmpzIl0sIm5hbWVzIjpbIkNvbnN0YW50IiwicmVxdWlyZSIsIlV0aWwiLCJ0b0pTT05TY2hlbWEiLCJ2YWxpZCIsInRlbXBsYXRlIiwiZGF0YSIsInNjaGVtYSIsInJlc3VsdCIsIkRpZmYiLCJkaWZmIiwiaSIsImxlbmd0aCIsIm5hbWUiLCJ0eXBlIiwidmFsdWUiLCJwcm9wZXJ0aWVzIiwiaXRlbXMiLCJBc3NlcnQiLCJlcXVhbCIsInBhdGgiLCJtYXRjaCIsIlJFX1BMQUNFSE9MREVSIiwicnVsZSIsInBhcmFtZXRlcnMiLCJtaW4iLCJ1bmRlZmluZWQiLCJtYXgiLCJjb3VudCIsInRlbXBsYXRlVHlwZSIsImFjdHVhbFJlcGVhdENvdW50IiwicGFydHMiLCJzcGxpdCIsImdyZWF0ZXJUaGFuT3JFcXVhbFRvIiwiTWF0aCIsImxlc3NUaGFuT3JFcXVhbFRvIiwiZGVjaW1hbCIsImRtaW4iLCJkbWF4IiwiUmVnRXhwIiwic291cmNlIiwicmVwbGFjZSIsImtleXMiLCJwdXNoIiwiYXBwbHkiLCJwcm9wZXJ0eSIsImVhY2giLCJpdGVtIiwibWVzc2FnZSIsInRvVXBwZXJDYXNlIiwidG9Mb3dlckNhc2UiLCJpc0FycmF5Iiwiam9pbiIsImFjdGlvbiIsImV4cGVjdGVkIiwiYWN0dWFsIiwidGVzdCIsIm5vdEVxdWFsIiwiZ3JlYXRlclRoYW4iLCJsZXNzVGhhbiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsSUFBSUEsV0FBV0MsUUFBUSxhQUFSLENBQWY7QUFDQSxJQUFJQyxPQUFPRCxRQUFRLFNBQVIsQ0FBWDtBQUNBLElBQUlFLGVBQWVGLFFBQVEsV0FBUixDQUFuQjs7QUFFQSxTQUFTRyxLQUFULENBQWVDLFFBQWYsRUFBeUJDLElBQXpCLEVBQStCO0FBQzNCLFFBQUlDLFNBQVNKLGFBQWFFLFFBQWIsQ0FBYjtBQUNBLFFBQUlHLFNBQVNDLEtBQUtDLElBQUwsQ0FB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O0FBRVBOLGtCQUFNQSxJQUZDO0FBR1B5QyxvQkFBUUEsTUFIRDtBQUlQRCxzQkFBVUEsUUFKSDtBQUtQRCxvQkFBUSw2QkFMRDtBQU1QTCxxQkFBU0E7QUFORixTQUFYO0FBUUFELGFBQUtDLE9BQUwsR0FBZTlCLE9BQU84QixPQUFQLENBQWVELElBQWYsQ0FBZjtBQUNBdkMsZUFBT21DLElBQVAsQ0FBWUksSUFBWjtBQUNBLGVBQU8sS0FBUDtBQUNILEtBdkdRO0FBd0dUWix1QkFBbUIsMkJBQVNyQixJQUFULEVBQWVNLElBQWYsRUFBcUJtQyxNQUFyQixFQUE2QkQsUUFBN0IsRUFBdUM5QyxNQUF2QyxFQUErQ3dDLE9BQS9DLEVBQXdEO0FBQ3ZFLFlBQUlPLFVBQVVELFFBQWQsRUFBd0IsT0FBTyxJQUFQO0FBQ3hCLFlBQUlQLE9BQU87QUFDUDNCLGtCQUFNQSxJQURDO0FBRVBOLGtCQUFNQSxJQUZDO0FBR1B5QyxvQkFBUUEsTUFIRDtBQUlQRCxzQkFBVUEsUUFKSDtBQUtQRCxvQkFBUSwwQkFMRDtBQU1QTCxxQkFBU0E7QUFORixTQUFYO0FBUUFELGFBQUtDLE9BQUwsR0FBZTlCLE9BQU84QixPQUFQLENBQWVELElBQWYsQ0FBZjtBQUNBdkMsZUFBT21DLElBQVAsQ0FBWUksSUFBWjtBQUNBLGVBQU8sS0FBUDtBQUNIO0FBckhRLENBQWI7O0FBd0hBM0MsTUFBTUssSUFBTixHQUFhQSxJQUFiO0FBQ0FMLE1BQU1jLE1BQU4sR0FBZUEsTUFBZjs7QUFFQTBDLE9BQU9DLE9BQVAsR0FBaUJ6RCxLQUFqQiIsImZpbGUiOiJ2YWxpZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgIyMgdmFsaWQodGVtcGxhdGUsIGRhdGEpXG5cbiAgICDmoKHpqoznnJ/lrp7mlbDmja4gZGF0YSDmmK/lkKbkuI7mlbDmja7mqKHmnb8gdGVtcGxhdGUg5Yy56YWN44CCXG4gICAgXG4gICAg5a6e546w5oCd6Lev77yaXG4gICAgMS4g6Kej5p6Q6KeE5YiZ44CCXG4gICAgICAgIOWFiOaKiuaVsOaNruaooeadvyB0ZW1wbGF0ZSDop6PmnpDkuLrmm7Tmlrnkvr/mnLrlmajop6PmnpDnmoQgSlNPTi1TY2hhbWVcbiAgICAgICAgbmFtZSAgICAgICAgICAgICAgIOWxnuaAp+WQjSBcbiAgICAgICAgdHlwZSAgICAgICAgICAgICAgIOWxnuaAp+WAvOexu+Wei1xuICAgICAgICB0ZW1wbGF0ZSAgICAgICAgICAg5bGe5oCn5YC85qih5p2/XG4gICAgICAgIHByb3BlcnRpZXMgICAgICAgICDlr7nosaHlsZ7mgKfmlbDnu4RcbiAgICAgICAgaXRlbXMgICAgICAgICAgICAgIOaVsOe7hOWFg+e0oOaVsOe7hFxuICAgICAgICBydWxlICAgICAgICAgICAgICAg5bGe5oCn5YC855Sf5oiQ6KeE5YiZXG4gICAgMi4g6YCS5b2S6aqM6K+B6KeE5YiZ44CCXG4gICAgICAgIOeEtuWQjueUqCBKU09OLVNjaGVtYSDmoKHpqoznnJ/lrp7mlbDmja7vvIzmoKHpqozpobnljIXmi6zlsZ7mgKflkI3jgIHlgLznsbvlnovjgIHlgLzjgIHlgLznlJ/miJDop4TliJnjgIJcblxuICAgIOaPkOekuuS/oeaBryBcbiAgICBodHRwczovL2dpdGh1Yi5jb20vZmdlL2pzb24tc2NoZW1hLXZhbGlkYXRvci9ibG9iL21hc3Rlci9zcmMvbWFpbi9yZXNvdXJjZXMvY29tL2dpdGh1Yi9mZ2UvanNvbnNjaGVtYS92YWxpZGF0b3IvdmFsaWRhdGlvbi5wcm9wZXJ0aWVzXG4gICAgW0pTT04tU2NoYW1hIHZhbGlkYXRvcl0oaHR0cDovL2pzb24tc2NoZW1hLXZhbGlkYXRvci5oZXJva3VhcHAuY29tLylcbiAgICBbUmVnZXhwIERlbW9dKGh0dHA6Ly9kZW1vcy5mb3JiZXNsaW5kZXNheS5jby51ay9yZWdleHAvKVxuKi9cbnZhciBDb25zdGFudCA9IHJlcXVpcmUoJy4uL2NvbnN0YW50JylcbnZhciBVdGlsID0gcmVxdWlyZSgnLi4vdXRpbCcpXG52YXIgdG9KU09OU2NoZW1hID0gcmVxdWlyZSgnLi4vc2NoZW1hJylcblxuZnVuY3Rpb24gdmFsaWQodGVtcGxhdGUsIGRhdGEpIHtcbiAgICB2YXIgc2NoZW1hID0gdG9KU09OU2NoZW1hKHRlbXBsYXRlKVxuICAgIHZhciByZXN1bHQgPSBEaWZmLmRpZmYoc2NoZW1hLCBkYXRhKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHRlbXBsYXRlLCBkYXRhKVxuICAgICAgICAvLyBjb25zb2xlLndhcm4oQXNzZXJ0Lm1lc3NhZ2UocmVzdWx0W2ldKSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxufVxuXG4vKlxuICAgICMjIG5hbWVcbiAgICAgICAg5pyJ55Sf5oiQ6KeE5YiZ77ya5q+U6L6D6Kej5p6Q5ZCO55qEIG5hbWVcbiAgICAgICAg5peg55Sf5oiQ6KeE5YiZ77ya55u05o6l5q+U6L6DXG4gICAgIyMgdHlwZVxuICAgICAgICDml6DnsbvlnovovazmjaLvvJrnm7TmjqXmr5TovoNcbiAgICAgICAg5pyJ57G75Z6L6L2s5o2i77ya5YWI6K+V552A6Kej5p6QIHRlbXBsYXRl77yM54S25ZCO5YaN5qOA5p+l77yfXG4gICAgIyMgdmFsdWUgdnMuIHRlbXBsYXRlXG4gICAgICAgIOWfuuacrOexu+Wei1xuICAgICAgICAgICAg5peg55Sf5oiQ6KeE5YiZ77ya55u05o6l5q+U6L6DXG4gICAgICAgICAgICDmnInnlJ/miJDop4TliJnvvJpcbiAgICAgICAgICAgICAgICBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgbWluLW1heC5kbWluLWRtYXhcbiAgICAgICAgICAgICAgICAgICAgbWluLW1heC5kY291bnRcbiAgICAgICAgICAgICAgICAgICAgY291bnQuZG1pbi1kbWF4XG4gICAgICAgICAgICAgICAgICAgIGNvdW50LmRjb3VudFxuICAgICAgICAgICAgICAgICAgICArc3RlcFxuICAgICAgICAgICAgICAgICAgICDmlbTmlbDpg6jliIZcbiAgICAgICAgICAgICAgICAgICAg5bCP5pWw6YOo5YiGXG4gICAgICAgICAgICAgICAgYm9vbGVhbiBcbiAgICAgICAgICAgICAgICBzdHJpbmcgIFxuICAgICAgICAgICAgICAgICAgICBtaW4tbWF4XG4gICAgICAgICAgICAgICAgICAgIGNvdW50XG4gICAgIyMgcHJvcGVydGllc1xuICAgICAgICDlr7nosaFcbiAgICAgICAgICAgIOacieeUn+aIkOinhOWIme+8muajgOa1i+acn+acm+eahOWxnuaAp+S4quaVsO+8jOe7p+e7remAkuW9klxuICAgICAgICAgICAg5peg55Sf5oiQ6KeE5YiZ77ya5qOA5rWL5YWo6YOo55qE5bGe5oCn5Liq5pWw77yM57un57ut6YCS5b2SXG4gICAgIyMgaXRlbXNcbiAgICAgICAg5pWw57uEXG4gICAgICAgICAgICDmnInnlJ/miJDop4TliJnvvJpcbiAgICAgICAgICAgICAgICBgJ25hbWV8MSc6IFt7fSwge30gLi4uXWAgICAgICAgICAgICDlhbbkuK3kuYvkuIDvvIznu6fnu63pgJLlvZJcbiAgICAgICAgICAgICAgICBgJ25hbWV8KzEnOiBbe30sIHt9IC4uLl1gICAgICAgICAgICDpobrluo/mo4DmtYvvvIznu6fnu63pgJLlvZJcbiAgICAgICAgICAgICAgICBgJ25hbWV8bWluLW1heCc6IFt7fSwge30gLi4uXWAgICAgICDmo4DmtYvkuKrmlbDvvIznu6fnu63pgJLlvZJcbiAgICAgICAgICAgICAgICBgJ25hbWV8Y291bnQnOiBbe30sIHt9IC4uLl1gICAgICAgICDmo4DmtYvkuKrmlbDvvIznu6fnu63pgJLlvZJcbiAgICAgICAgICAgIOaXoOeUn+aIkOinhOWIme+8muajgOa1i+WFqOmDqOeahOWFg+e0oOS4quaVsO+8jOe7p+e7remAkuW9klxuKi9cbnZhciBEaWZmID0ge1xuICAgIGRpZmY6IGZ1bmN0aW9uIGRpZmYoc2NoZW1hLCBkYXRhLCBuYW1lIC8qIEludGVybmFsIFVzZSBPbmx5ICovICkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW11cblxuICAgICAgICAvLyDlhYjmo4DmtYvlkI3np7AgbmFtZSDlkoznsbvlnosgdHlwZe+8jOWmguaenOWMuemFje+8jOaJjeacieW/heimgee7p+e7reajgOa1i1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLm5hbWUoc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpICYmXG4gICAgICAgICAgICB0aGlzLnR5cGUoc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy52YWx1ZShzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdClcbiAgICAgICAgICAgIHRoaXMucHJvcGVydGllcyhzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdClcbiAgICAgICAgICAgIHRoaXMuaXRlbXMoc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICAvKiBqc2hpbnQgdW51c2VkOmZhbHNlICovXG4gICAgbmFtZTogZnVuY3Rpb24oc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGhcblxuICAgICAgICBBc3NlcnQuZXF1YWwoJ25hbWUnLCBzY2hlbWEucGF0aCwgbmFtZSArICcnLCBzY2hlbWEubmFtZSArICcnLCByZXN1bHQpXG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuICAgIH0sXG4gICAgdHlwZTogZnVuY3Rpb24oc2NoZW1hLCBkYXRhLCBuYW1lLCByZXN1bHQpIHtcbiAgICAgICAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGhcblxuICAgICAgICBzd2l0Y2ggKHNjaGVtYS50eXBlKSB7XG4gICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgIC8vIOi3s+i/h+WQq+acieOAjuWNoOS9jeespuOAj+eahOWxnuaAp+WAvO+8jOWboOS4uuOAjuWNoOS9jeespuOAj+i/lOWbnuWAvOeahOexu+Wei+WPr+iDveWSjOaooeadv+S4jeS4gOiHtO+8jOS+i+WmgiAnQGludCcg5Lya6L+U5Zue5LiA5Liq5pW05b2i5YC8XG4gICAgICAgICAgICAgICAgaWYgKHNjaGVtYS50ZW1wbGF0ZS5tYXRjaChDb25zdGFudC5SRV9QTEFDRUhPTERFUikpIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ2FycmF5JzpcbiAgICAgICAgICAgICAgICBpZiAoc2NoZW1hLnJ1bGUucGFyYW1ldGVycykge1xuICAgICAgICAgICAgICAgICAgICAvLyBuYW1lfGNvdW50OiBhcnJheVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hLnJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgc2NoZW1hLnJ1bGUubWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIOi3s+i/hyBuYW1lfDE6IGFycmF577yM5Zug5Li65pyA57uI5YC855qE57G75Z6L77yI5b6I5Y+v6IO977yJ5LiN5piv5pWw57uE77yM5Lmf5LiN5LiA5a6a5LiOIGBhcnJheWAg5Lit55qE57G75Z6L5LiA6Ie0XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc2NoZW1hLnJ1bGUuY291bnQgPT09IDEpIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8g6Lez6L+HIG5hbWV8K2luYzogYXJyYXlcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjaGVtYS5ydWxlLnBhcmFtZXRlcnNbMl0pIHJldHVybiB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgLy8g6Lez6L+HIGAnbmFtZSc6IGZ1bmN0aW9uYO+8jOWboOS4uuWHveaVsOWPr+S7pei/lOWbnuS7u+S9leexu+Wei+eahOWAvOOAglxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBBc3NlcnQuZXF1YWwoJ3R5cGUnLCBzY2hlbWEucGF0aCwgVXRpbC50eXBlKGRhdGEpLCBzY2hlbWEudHlwZSwgcmVzdWx0KVxuXG4gICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcbiAgICB9LFxuICAgIHZhbHVlOiBmdW5jdGlvbihzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdCkge1xuICAgICAgICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aFxuXG4gICAgICAgIHZhciBydWxlID0gc2NoZW1hLnJ1bGVcbiAgICAgICAgdmFyIHRlbXBsYXRlVHlwZSA9IHNjaGVtYS50eXBlXG4gICAgICAgIGlmICh0ZW1wbGF0ZVR5cGUgPT09ICdvYmplY3QnIHx8IHRlbXBsYXRlVHlwZSA9PT0gJ2FycmF5JyB8fCB0ZW1wbGF0ZVR5cGUgPT09ICdmdW5jdGlvbicpIHJldHVybiB0cnVlXG5cbiAgICAgICAgLy8g5peg55Sf5oiQ6KeE5YiZXG4gICAgICAgIGlmICghcnVsZS5wYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHRlbXBsYXRlVHlwZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JlZ2V4cCc6XG4gICAgICAgICAgICAgICAgICAgIEFzc2VydC5tYXRjaCgndmFsdWUnLCBzY2hlbWEucGF0aCwgZGF0YSwgc2NoZW1hLnRlbXBsYXRlLCByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcbiAgICAgICAgICAgICAgICBjYXNlICdzdHJpbmcnOlxuICAgICAgICAgICAgICAgICAgICAvLyDlkIzmoLfot7Pov4flkKvmnInjgI7ljaDkvY3nrKbjgI/nmoTlsZ7mgKflgLzvvIzlm6DkuLrjgI7ljaDkvY3nrKbjgI/nmoTov5Tlm57lgLzkvJrpgJrluLjkvJrkuI7mqKHmnb/kuI3kuIDoh7RcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjaGVtYS50ZW1wbGF0ZS5tYXRjaChDb25zdGFudC5SRV9QTEFDRUhPTERFUikpIHJldHVybiByZXN1bHQubGVuZ3RoID09PSBsZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIEFzc2VydC5lcXVhbCgndmFsdWUnLCBzY2hlbWEucGF0aCwgZGF0YSwgc2NoZW1hLnRlbXBsYXRlLCByZXN1bHQpXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG4gICAgICAgIH1cblxuICAgICAgICAvLyDmnInnlJ/miJDop4TliJlcbiAgICAgICAgdmFyIGFjdHVhbFJlcGVhdENvdW50XG4gICAgICAgIHN3aXRjaCAodGVtcGxhdGVUeXBlKSB7XG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IChkYXRhICsgJycpLnNwbGl0KCcuJylcbiAgICAgICAgICAgICAgICBwYXJ0c1swXSA9ICtwYXJ0c1swXVxuXG4gICAgICAgICAgICAgICAgLy8g5pW05pWw6YOo5YiGXG4gICAgICAgICAgICAgICAgLy8gfG1pbi1tYXhcbiAgICAgICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIEFzc2VydC5ncmVhdGVyVGhhbk9yRXF1YWxUbygndmFsdWUnLCBzY2hlbWEucGF0aCwgcGFydHNbMF0sIE1hdGgubWluKHJ1bGUubWluLCBydWxlLm1heCksIHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICwgJ251bWVyaWMgaW5zdGFuY2UgaXMgbG93ZXIgdGhhbiB0aGUgcmVxdWlyZWQgbWluaW11bSAobWluaW11bToge2V4cGVjdGVkfSwgZm91bmQ6IHthY3R1YWx9KScpXG4gICAgICAgICAgICAgICAgICAgIEFzc2VydC5sZXNzVGhhbk9yRXF1YWxUbygndmFsdWUnLCBzY2hlbWEucGF0aCwgcGFydHNbMF0sIE1hdGgubWF4KHJ1bGUubWluLCBydWxlLm1heCksIHJlc3VsdClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gfGNvdW50XG4gICAgICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBBc3NlcnQuZXF1YWwoJ3ZhbHVlJywgc2NoZW1hLnBhdGgsIHBhcnRzWzBdLCBydWxlLm1pbiwgcmVzdWx0LCAnW3ZhbHVlXSAnICsgbmFtZSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyDlsI/mlbDpg6jliIZcbiAgICAgICAgICAgICAgICBpZiAocnVsZS5kZWNpbWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHxkbWluLWRtYXhcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJ1bGUuZG1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUuZG1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBc3NlcnQuZ3JlYXRlclRoYW5PckVxdWFsVG8oJ3ZhbHVlJywgc2NoZW1hLnBhdGgsIHBhcnRzWzFdLmxlbmd0aCwgcnVsZS5kbWluLCByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICBBc3NlcnQubGVzc1RoYW5PckVxdWFsVG8oJ3ZhbHVlJywgc2NoZW1hLnBhdGgsIHBhcnRzWzFdLmxlbmd0aCwgcnVsZS5kbWF4LCByZXN1bHQpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgLy8gfGRjb3VudFxuICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS5kbWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5kbWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIEFzc2VydC5lcXVhbCgndmFsdWUnLCBzY2hlbWEucGF0aCwgcGFydHNbMV0ubGVuZ3RoLCBydWxlLmRtaW4sIHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgICAgICAgICAgLy8gJ2FhYScubWF0Y2goL2EvZylcbiAgICAgICAgICAgICAgICBhY3R1YWxSZXBlYXRDb3VudCA9IGRhdGEubWF0Y2gobmV3IFJlZ0V4cChzY2hlbWEudGVtcGxhdGUsICdnJykpXG4gICAgICAgICAgICAgICAgYWN0dWFsUmVwZWF0Q291bnQgPSBhY3R1YWxSZXBlYXRDb3VudCA/IGFjdHVhbFJlcGVhdENvdW50Lmxlbmd0aCA6IDBcblxuICAgICAgICAgICAgICAgIC8vIHxtaW4tbWF4XG4gICAgICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBBc3NlcnQuZ3JlYXRlclRoYW5PckVxdWFsVG8oJ3JlcGVhdCBjb3VudCcsIHNjaGVtYS5wYXRoLCBhY3R1YWxSZXBlYXRDb3VudCwgcnVsZS5taW4sIHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgQXNzZXJ0Lmxlc3NUaGFuT3JFcXVhbFRvKCdyZXBlYXQgY291bnQnLCBzY2hlbWEucGF0aCwgYWN0dWFsUmVwZWF0Q291bnQsIHJ1bGUubWF4LCByZXN1bHQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHxjb3VudFxuICAgICAgICAgICAgICAgIGlmIChydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUubWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgQXNzZXJ0LmVxdWFsKCdyZXBlYXQgY291bnQnLCBzY2hlbWEucGF0aCwgYWN0dWFsUmVwZWF0Q291bnQsIHJ1bGUubWluLCByZXN1bHQpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgICAgY2FzZSAncmVnZXhwJzpcbiAgICAgICAgICAgICAgICBhY3R1YWxSZXBlYXRDb3VudCA9IGRhdGEubWF0Y2gobmV3IFJlZ0V4cChzY2hlbWEudGVtcGxhdGUuc291cmNlLnJlcGxhY2UoL15cXF58XFwkJC9nLCAnJyksICdnJykpXG4gICAgICAgICAgICAgICAgYWN0dWFsUmVwZWF0Q291bnQgPSBhY3R1YWxSZXBlYXRDb3VudCA/IGFjdHVhbFJlcGVhdENvdW50Lmxlbmd0aCA6IDBcblxuICAgICAgICAgICAgICAgIC8vIHxtaW4tbWF4XG4gICAgICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBBc3NlcnQuZ3JlYXRlclRoYW5PckVxdWFsVG8oJ3JlcGVhdCBjb3VudCcsIHNjaGVtYS5wYXRoLCBhY3R1YWxSZXBlYXRDb3VudCwgcnVsZS5taW4sIHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgQXNzZXJ0Lmxlc3NUaGFuT3JFcXVhbFRvKCdyZXBlYXQgY291bnQnLCBzY2hlbWEucGF0aCwgYWN0dWFsUmVwZWF0Q291bnQsIHJ1bGUubWF4LCByZXN1bHQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHxjb3VudFxuICAgICAgICAgICAgICAgIGlmIChydWxlLm1pbiAhPT0gdW5kZWZpbmVkICYmIHJ1bGUubWF4ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgQXNzZXJ0LmVxdWFsKCdyZXBlYXQgY291bnQnLCBzY2hlbWEucGF0aCwgYWN0dWFsUmVwZWF0Q291bnQsIHJ1bGUubWluLCByZXN1bHQpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG4gICAgfSxcbiAgICBwcm9wZXJ0aWVzOiBmdW5jdGlvbihzY2hlbWEsIGRhdGEsIG5hbWUsIHJlc3VsdCkge1xuICAgICAgICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aFxuXG4gICAgICAgIHZhciBydWxlID0gc2NoZW1hLnJ1bGVcbiAgICAgICAgdmFyIGtleXMgPSBVdGlsLmtleXMoZGF0YSlcbiAgICAgICAgaWYgKCFzY2hlbWEucHJvcGVydGllcykgcmV0dXJuXG5cbiAgICAgICAgLy8g5peg55Sf5oiQ6KeE5YiZXG4gICAgICAgIGlmICghc2NoZW1hLnJ1bGUucGFyYW1ldGVycykge1xuICAgICAgICAgICAgQXNzZXJ0LmVxdWFsKCdwcm9wZXJ0aWVzIGxlbmd0aCcsIHNjaGVtYS5wYXRoLCBrZXlzLmxlbmd0aCwgc2NoZW1hLnByb3BlcnRpZXMubGVuZ3RoLCByZXN1bHQpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyDmnInnlJ/miJDop4TliJlcbiAgICAgICAgICAgIC8vIHxtaW4tbWF4XG4gICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgQXNzZXJ0LmdyZWF0ZXJUaGFuT3JFcXVhbFRvKCdwcm9wZXJ0aWVzIGxlbmd0aCcsIHNjaGVtYS5wYXRoLCBrZXlzLmxlbmd0aCwgTWF0aC5taW4ocnVsZS5taW4sIHJ1bGUubWF4KSwgcmVzdWx0KVxuICAgICAgICAgICAgICAgIEFzc2VydC5sZXNzVGhhbk9yRXF1YWxUbygncHJvcGVydGllcyBsZW5ndGgnLCBzY2hlbWEucGF0aCwga2V5cy5sZW5ndGgsIE1hdGgubWF4KHJ1bGUubWluLCBydWxlLm1heCksIHJlc3VsdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHxjb3VudFxuICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIC8vIHwxLCB8PjFcbiAgICAgICAgICAgICAgICBpZiAocnVsZS5jb3VudCAhPT0gMSkgQXNzZXJ0LmVxdWFsKCdwcm9wZXJ0aWVzIGxlbmd0aCcsIHNjaGVtYS5wYXRoLCBrZXlzLmxlbmd0aCwgcnVsZS5taW4sIHJlc3VsdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoICE9PSBsZW5ndGgpIHJldHVybiBmYWxzZVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2guYXBwbHkoXG4gICAgICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgICAgIHRoaXMuZGlmZihcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlcbiAgICAgICAgICAgICAgICAgICAgICAgIFV0aWwuZWFjaChzY2hlbWEucHJvcGVydGllcywgZnVuY3Rpb24oaXRlbSAvKiwgaW5kZXgqLyApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5uYW1lID09PSBrZXlzW2ldKSBwcm9wZXJ0eSA9IGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvcGVydHkgfHwgc2NoZW1hLnByb3BlcnRpZXNbaV1cbiAgICAgICAgICAgICAgICAgICAgfSgpLFxuICAgICAgICAgICAgICAgICAgICBkYXRhW2tleXNbaV1dLFxuICAgICAgICAgICAgICAgICAgICBrZXlzW2ldXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuICAgIH0sXG4gICAgaXRlbXM6IGZ1bmN0aW9uKHNjaGVtYSwgZGF0YSwgbmFtZSwgcmVzdWx0KSB7XG4gICAgICAgIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoXG5cbiAgICAgICAgaWYgKCFzY2hlbWEuaXRlbXMpIHJldHVyblxuXG4gICAgICAgIHZhciBydWxlID0gc2NoZW1hLnJ1bGVcblxuICAgICAgICAvLyDml6DnlJ/miJDop4TliJlcbiAgICAgICAgaWYgKCFzY2hlbWEucnVsZS5wYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICBBc3NlcnQuZXF1YWwoJ2l0ZW1zIGxlbmd0aCcsIHNjaGVtYS5wYXRoLCBkYXRhLmxlbmd0aCwgc2NoZW1hLml0ZW1zLmxlbmd0aCwgcmVzdWx0KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g5pyJ55Sf5oiQ6KeE5YiZXG4gICAgICAgICAgICAvLyB8bWluLW1heFxuICAgICAgICAgICAgaWYgKHJ1bGUubWluICE9PSB1bmRlZmluZWQgJiYgcnVsZS5tYXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIEFzc2VydC5ncmVhdGVyVGhhbk9yRXF1YWxUbygnaXRlbXMnLCBzY2hlbWEucGF0aCwgZGF0YS5sZW5ndGgsIChNYXRoLm1pbihydWxlLm1pbiwgcnVsZS5tYXgpICogc2NoZW1hLml0ZW1zLmxlbmd0aCksIHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgJ1t7dXR5cGV9XSBhcnJheSBpcyB0b28gc2hvcnQ6IHtwYXRofSBtdXN0IGhhdmUgYXQgbGVhc3Qge2V4cGVjdGVkfSBlbGVtZW50cyBidXQgaW5zdGFuY2UgaGFzIHthY3R1YWx9IGVsZW1lbnRzJylcbiAgICAgICAgICAgICAgICBBc3NlcnQubGVzc1RoYW5PckVxdWFsVG8oJ2l0ZW1zJywgc2NoZW1hLnBhdGgsIGRhdGEubGVuZ3RoLCAoTWF0aC5tYXgocnVsZS5taW4sIHJ1bGUubWF4KSAqIHNjaGVtYS5pdGVtcy5sZW5ndGgpLCByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgICdbe3V0eXBlfV0gYXJyYXkgaXMgdG9vIGxvbmc6IHtwYXRofSBtdXN0IGhhdmUgYXQgbW9zdCB7ZXhwZWN0ZWR9IGVsZW1lbnRzIGJ1dCBpbnN0YW5jZSBoYXMge2FjdHVhbH0gZWxlbWVudHMnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gfGNvdW50XG4gICAgICAgICAgICBpZiAocnVsZS5taW4gIT09IHVuZGVmaW5lZCAmJiBydWxlLm1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gfDEsIHw+MVxuICAgICAgICAgICAgICAgIGlmIChydWxlLmNvdW50ID09PSAxKSByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG4gICAgICAgICAgICAgICAgZWxzZSBBc3NlcnQuZXF1YWwoJ2l0ZW1zIGxlbmd0aCcsIHNjaGVtYS5wYXRoLCBkYXRhLmxlbmd0aCwgKHJ1bGUubWluICogc2NoZW1hLml0ZW1zLmxlbmd0aCksIHJlc3VsdClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHwraW5jXG4gICAgICAgICAgICBpZiAocnVsZS5wYXJhbWV0ZXJzWzJdKSByZXR1cm4gcmVzdWx0Lmxlbmd0aCA9PT0gbGVuZ3RoXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0Lmxlbmd0aCAhPT0gbGVuZ3RoKSByZXR1cm4gZmFsc2VcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoLmFwcGx5KFxuICAgICAgICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICAgICAgICB0aGlzLmRpZmYoXG4gICAgICAgICAgICAgICAgICAgIHNjaGVtYS5pdGVtc1tpICUgc2NoZW1hLml0ZW1zLmxlbmd0aF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGFbaV0sXG4gICAgICAgICAgICAgICAgICAgIGkgJSBzY2hlbWEuaXRlbXMubGVuZ3RoXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdC5sZW5ndGggPT09IGxlbmd0aFxuICAgIH1cbn1cblxuLypcbiAgICDlrozlloTjgIHlj4vlpb3nmoTmj5DnpLrkv6Hmga9cbiAgICBcbiAgICBFcXVhbCwgbm90IGVxdWFsIHRvLCBncmVhdGVyIHRoYW4sIGxlc3MgdGhhbiwgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvLCBsZXNzIHRoYW4gb3IgZXF1YWwgdG9cbiAgICDot6/lvoQg6aqM6K+B57G75Z6LIOaPj+i/sCBcblxuICAgIEV4cGVjdCBwYXRoLm5hbWUgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGV4cGVjdGVkLCBidXQgcGF0aC5uYW1lIGlzIGFjdHVhbC5cblxuICAgIEV4cGVjdCBwYXRoLm5hbWUgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGV4cGVjdGVkLCBidXQgcGF0aC5uYW1lIGlzIGFjdHVhbC5cbiAgICBFeHBlY3QgcGF0aC5uYW1lIGlzIGdyZWF0ZXIgdGhhbiBvciBlcXVhbCB0byBleHBlY3RlZCwgYnV0IHBhdGgubmFtZSBpcyBhY3R1YWwuXG5cbiovXG52YXIgQXNzZXJ0ID0ge1xuICAgIG1lc3NhZ2U6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIChpdGVtLm1lc3NhZ2UgfHxcbiAgICAgICAgICAgICAgICAnW3t1dHlwZX1dIEV4cGVjdCB7cGF0aH1cXCd7bHR5cGV9IHthY3Rpb259IHtleHBlY3RlZH0sIGJ1dCBpcyB7YWN0dWFsfScpXG4gICAgICAgICAgICAucmVwbGFjZSgne3V0eXBlfScsIGl0ZW0udHlwZS50b1VwcGVyQ2FzZSgpKVxuICAgICAgICAgICAgLnJlcGxhY2UoJ3tsdHlwZX0nLCBpdGVtLnR5cGUudG9Mb3dlckNhc2UoKSlcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7cGF0aH0nLCBVdGlsLmlzQXJyYXkoaXRlbS5wYXRoKSAmJiBpdGVtLnBhdGguam9pbignLicpIHx8IGl0ZW0ucGF0aClcbiAgICAgICAgICAgIC5yZXBsYWNlKCd7YWN0aW9ufScsIGl0ZW0uYWN0aW9uKVxuICAgICAgICAgICAgLnJlcGxhY2UoJ3tleHBlY3RlZH0nLCBpdGVtLmV4cGVjdGVkKVxuICAgICAgICAgICAgLnJlcGxhY2UoJ3thY3R1YWx9JywgaXRlbS5hY3R1YWwpXG4gICAgfSxcbiAgICBlcXVhbDogZnVuY3Rpb24odHlwZSwgcGF0aCwgYWN0dWFsLCBleHBlY3RlZCwgcmVzdWx0LCBtZXNzYWdlKSB7XG4gICAgICAgIGlmIChhY3R1YWwgPT09IGV4cGVjdGVkKSByZXR1cm4gdHJ1ZVxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3R5cGUnOlxuICAgICAgICAgICAgICAgIC8vIOato+WImeaooeadvyA9PT0g5a2X56ym5Liy5pyA57uI5YC8XG4gICAgICAgICAgICAgICAgaWYgKGV4cGVjdGVkID09PSAncmVnZXhwJyAmJiBhY3R1YWwgPT09ICdzdHJpbmcnKSByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICAgICAgICBhY3Rpb246ICdpcyBlcXVhbCB0bycsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5tZXNzYWdlID0gQXNzZXJ0Lm1lc3NhZ2UoaXRlbSlcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlbSlcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcbiAgICAvLyBhY3R1YWwgbWF0Y2hlcyBleHBlY3RlZFxuICAgIG1hdGNoOiBmdW5jdGlvbih0eXBlLCBwYXRoLCBhY3R1YWwsIGV4cGVjdGVkLCByZXN1bHQsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGV4cGVjdGVkLnRlc3QoYWN0dWFsKSkgcmV0dXJuIHRydWVcblxuICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICAgICAgICBhY3Rpb246ICdtYXRjaGVzJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfVxuICAgICAgICBpdGVtLm1lc3NhZ2UgPSBBc3NlcnQubWVzc2FnZShpdGVtKVxuICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuICAgIG5vdEVxdWFsOiBmdW5jdGlvbih0eXBlLCBwYXRoLCBhY3R1YWwsIGV4cGVjdGVkLCByZXN1bHQsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGFjdHVhbCAhPT0gZXhwZWN0ZWQpIHJldHVybiB0cnVlXG4gICAgICAgIHZhciBpdGVtID0ge1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICBhY3R1YWw6IGFjdHVhbCxcbiAgICAgICAgICAgIGV4cGVjdGVkOiBleHBlY3RlZCxcbiAgICAgICAgICAgIGFjdGlvbjogJ2lzIG5vdCBlcXVhbCB0bycsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgIH1cbiAgICAgICAgaXRlbS5tZXNzYWdlID0gQXNzZXJ0Lm1lc3NhZ2UoaXRlbSlcbiAgICAgICAgcmVzdWx0LnB1c2goaXRlbSlcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcbiAgICBncmVhdGVyVGhhbjogZnVuY3Rpb24odHlwZSwgcGF0aCwgYWN0dWFsLCBleHBlY3RlZCwgcmVzdWx0LCBtZXNzYWdlKSB7XG4gICAgICAgIGlmIChhY3R1YWwgPiBleHBlY3RlZCkgcmV0dXJuIHRydWVcbiAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgICAgICAgYWN0aW9uOiAnaXMgZ3JlYXRlciB0aGFuJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfVxuICAgICAgICBpdGVtLm1lc3NhZ2UgPSBBc3NlcnQubWVzc2FnZShpdGVtKVxuICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuICAgIGxlc3NUaGFuOiBmdW5jdGlvbih0eXBlLCBwYXRoLCBhY3R1YWwsIGV4cGVjdGVkLCByZXN1bHQsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGFjdHVhbCA8IGV4cGVjdGVkKSByZXR1cm4gdHJ1ZVxuICAgICAgICB2YXIgaXRlbSA9IHtcbiAgICAgICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgYWN0dWFsOiBhY3R1YWwsXG4gICAgICAgICAgICBleHBlY3RlZDogZXhwZWN0ZWQsXG4gICAgICAgICAgICBhY3Rpb246ICdpcyBsZXNzIHRvJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfVxuICAgICAgICBpdGVtLm1lc3NhZ2UgPSBBc3NlcnQubWVzc2FnZShpdGVtKVxuICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuICAgIGdyZWF0ZXJUaGFuT3JFcXVhbFRvOiBmdW5jdGlvbih0eXBlLCBwYXRoLCBhY3R1YWwsIGV4cGVjdGVkLCByZXN1bHQsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGFjdHVhbCA+PSBleHBlY3RlZCkgcmV0dXJuIHRydWVcbiAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgICAgICAgYWN0aW9uOiAnaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfVxuICAgICAgICBpdGVtLm1lc3NhZ2UgPSBBc3NlcnQubWVzc2FnZShpdGVtKVxuICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuICAgIGxlc3NUaGFuT3JFcXVhbFRvOiBmdW5jdGlvbih0eXBlLCBwYXRoLCBhY3R1YWwsIGV4cGVjdGVkLCByZXN1bHQsIG1lc3NhZ2UpIHtcbiAgICAgICAgaWYgKGFjdHVhbCA8PSBleHBlY3RlZCkgcmV0dXJuIHRydWVcbiAgICAgICAgdmFyIGl0ZW0gPSB7XG4gICAgICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGFjdHVhbDogYWN0dWFsLFxuICAgICAgICAgICAgZXhwZWN0ZWQ6IGV4cGVjdGVkLFxuICAgICAgICAgICAgYWN0aW9uOiAnaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvJyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VcbiAgICAgICAgfVxuICAgICAgICBpdGVtLm1lc3NhZ2UgPSBBc3NlcnQubWVzc2FnZShpdGVtKVxuICAgICAgICByZXN1bHQucHVzaChpdGVtKVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG59XG5cbnZhbGlkLkRpZmYgPSBEaWZmXG52YWxpZC5Bc3NlcnQgPSBBc3NlcnRcblxubW9kdWxlLmV4cG9ydHMgPSB2YWxpZCJdfQ==