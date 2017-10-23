'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/* 
    ## Handler

    处理数据模板。
    
    * Handler.gen( template, name?, context? )

        入口方法。

    * Data Template Definition, DTD
        
        处理数据模板定义。

        * Handler.array( options )
        * Handler.object( options )
        * Handler.number( options )
        * Handler.boolean( options )
        * Handler.string( options )
        * Handler.function( options )
        * Handler.regexp( options )
        
        处理路径（相对和绝对）。

        * Handler.getValueByKeyPath( key, options )

    * Data Placeholder Definition, DPD

        处理数据占位符定义

        * Handler.placeholder( placeholder, context, templateContext, options )

*/

var Constant = require('./constant.js');
var Util = require('./util.js');
var Parser = require('./parser.js');
var Random = require('./random/index.js');
var RE = require('./regexp/index.js');

var Handler = {
    extend: Util.extend

    /*
        template        属性值（即数据模板）
        name            属性名
        context         数据上下文，生成后的数据
        templateContext 模板上下文，
    
        Handle.gen(template, name, options)
        context
            currentContext, templateCurrentContext, 
            path, templatePath
            root, templateRoot
    */
};Handler.gen = function (template, name, context) {
    /* jshint -W041 */
    name = name == undefined ? '' : name + '';

    context = context || {};
    context = {
        // 当前访问路径，只有属性名，不包括生成规则
        path: context.path || [Constant.GUID],
        templatePath: context.templatePath || [Constant.GUID++],
        // 最终属性值的上下文
        currentContext: context.currentContext,
        // 属性值模板的上下文
        templateCurrentContext: context.templateCurrentContext || template,
        // 最终值的根
        root: context.root || context.currentContext,
        // 模板的根
        templateRoot: context.templateRoot || context.templateCurrentContext || template
        // console.log('path:', context.path.join('.'), template)

    };var rule = Parser.parse(name);
    var type = Util.type(template);
    var data;

    if (Handler[type]) {
        data = Handler[type]({
            // 属性值类型
            type: type,
            // 属性值模板
            template: template,
            // 属性名 + 生成规则
            name: name,
            // 属性名
            parsedName: name ? name.replace(Constant.RE_KEY, '$1') : name,

            // 解析后的生成规则
            rule: rule,
            // 相关上下文
            context: context
        });

        if (!context.root) context.root = data;
        return data;
    }

    return template;
};

Handler.extend({
    array: function array(options) {
        var result = [],
            i,
            ii;

        // 'name|1': []
        // 'name|count': []
        // 'name|min-max': []
        if (options.template.length === 0) return result;

        // 'arr': [{ 'email': '@EMAIL' }, { 'email': '@EMAIL' }]
        if (!options.rule.parameters) {
            for (i = 0; i < options.template.length; i++) {
                options.context.path.push(i);
                options.context.templatePath.push(i);
                result.push(Handler.gen(options.template[i], i, {
                    path: options.context.path,
                    templatePath: options.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options.template,
                    root: options.context.root || result,
                    templateRoot: options.context.templateRoot || options.template
                }));
                options.context.path.pop();
                options.context.templatePath.pop();
            }
        } else {
            // 'method|1': ['GET', 'POST', 'HEAD', 'DELETE']
            if (options.rule.min === 1 && options.rule.max === undefined) {
                // fix #17
                options.context.path.push(options.name);
                options.context.templatePath.push(options.name);
                result = Random.pick(Handler.gen(options.template, undefined, {
                    path: options.context.path,
                    templatePath: options.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options.template,
                    root: options.context.root || result,
                    templateRoot: options.context.templateRoot || options.template
                }));
                options.context.path.pop();
                options.context.templatePath.pop();
            } else {
                // 'data|+1': [{}, {}]
                if (options.rule.parameters[2]) {
                    options.template.__order_index = options.template.__order_index || 0;

                    options.context.path.push(options.name);
                    options.context.templatePath.push(options.name);
                    result = Handler.gen(options.template, undefined, {
                        path: options.context.path,
                        templatePath: options.context.templatePath,
                        currentContext: result,
                        templateCurrentContext: options.template,
                        root: options.context.root || result,
                        templateRoot: options.context.templateRoot || options.template
                    })[options.template.__order_index % options.template.length];

                    options.template.__order_index += +options.rule.parameters[2];

                    options.context.path.pop();
                    options.context.templatePath.pop();
                } else {
                    // 'data|1-10': [{}]
                    for (i = 0; i < options.rule.count; i++) {
                        // 'data|1-10': [{}, {}]
                        for (ii = 0; ii < options.template.length; ii++) {
                            options.context.path.push(result.length);
                            options.context.templatePath.push(ii);
                            result.push(Handler.gen(options.template[ii], result.length, {
                                path: options.context.path,
                                templatePath: options.context.templatePath,
                                currentContext: result,
                                templateCurrentContext: options.template,
                                root: options.context.root || result,
                                templateRoot: options.context.templateRoot || options.template
                            }));
                            options.context.path.pop();
                            options.context.templatePath.pop();
                        }
                    }
                }
            }
        }
        return result;
    },
    object: function object(options) {
        var result = {},
            keys,
            fnKeys,
            key,
            parsedKey,
            inc,
            i;

        // 'obj|min-max': {}
        /* jshint -W041 */
        if (options.rule.min != undefined) {
            keys = Util.keys(options.template);
            keys = Random.shuffle(keys);
            keys = keys.slice(0, options.rule.count);
            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                parsedKey = key.replace(Constant.RE_KEY, '$1');
                options.context.path.push(parsedKey);
                options.context.templatePath.push(key);
                result[parsedKey] = Handler.gen(options.template[key], key, {
                    path: options.context.path,
                    templatePath: options.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options.template,
                    root: options.context.root || result,
                    templateRoot: options.context.templateRoot || options.template
                });
                options.context.path.pop();
                options.context.templatePath.pop();
            }
        } else {
            // 'obj': {}
            keys = [];
            fnKeys = []; // #25 改变了非函数属性的顺序，查找起来不方便
            for (key in options.template) {
                (typeof options.template[key] === 'function' ? fnKeys : keys).push(key);
            }
            keys = keys.concat(fnKeys);

            /*
                会改变非函数属性的顺序
                keys = Util.keys(options.template)
                keys.sort(function(a, b) {
                    var afn = typeof options.template[a] === 'function'
                    var bfn = typeof options.template[b] === 'function'
                    if (afn === bfn) return 0
                    if (afn && !bfn) return 1
                    if (!afn && bfn) return -1
                })
            */

            for (i = 0; i < keys.length; i++) {
                key = keys[i];
                parsedKey = key.replace(Constant.RE_KEY, '$1');
                options.context.path.push(parsedKey);
                options.context.templatePath.push(key);
                result[parsedKey] = Handler.gen(options.template[key], key, {
                    path: options.context.path,
                    templatePath: options.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options.template,
                    root: options.context.root || result,
                    templateRoot: options.context.templateRoot || options.template
                });
                options.context.path.pop();
                options.context.templatePath.pop();
                // 'id|+1': 1
                inc = key.match(Constant.RE_KEY);
                if (inc && inc[2] && Util.type(options.template[key]) === 'number') {
                    options.template[key] += parseInt(inc[2], 10);
                }
            }
        }
        return result;
    },
    number: function number(options) {
        var result, parts;
        if (options.rule.decimal) {
            // float
            options.template += '';
            parts = options.template.split('.');
            // 'float1|.1-10': 10,
            // 'float2|1-100.1-10': 1,
            // 'float3|999.1-10': 1,
            // 'float4|.3-10': 123.123,
            parts[0] = options.rule.range ? options.rule.count : parts[0];
            parts[1] = (parts[1] || '').slice(0, options.rule.dcount);
            while (parts[1].length < options.rule.dcount) {
                parts[1] +=
                // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
                parts[1].length < options.rule.dcount - 1 ? Random.character('number') : Random.character('123456789');
            }
            result = parseFloat(parts.join('.'), 10);
        } else {
            // integer
            // 'grade1|1-100': 1,
            result = options.rule.range && !options.rule.parameters[2] ? options.rule.count : options.template;
        }
        return result;
    },
    boolean: function boolean(options) {
        var result;
        // 'prop|multiple': false, 当前值是相反值的概率倍数
        // 'prop|probability-probability': false, 当前值与相反值的概率
        result = options.rule.parameters ? Random.bool(options.rule.min, options.rule.max, options.template) : options.template;
        return result;
    },
    string: function string(options) {
        var result = '',
            i,
            placeholders,
            ph,
            phed;
        if (options.template.length) {

            //  'foo': '★',
            /* jshint -W041 */
            if (options.rule.count == undefined) {
                result += options.template;
            }

            // 'star|1-5': '★',
            for (i = 0; i < options.rule.count; i++) {
                result += options.template;
            }
            // 'email|1-10': '@EMAIL, ',
            placeholders = result.match(Constant.RE_PLACEHOLDER) || []; // A-Z_0-9 > \w_
            for (i = 0; i < placeholders.length; i++) {
                ph = placeholders[i];

                // 遇到转义斜杠，不需要解析占位符
                if (/^\\/.test(ph)) {
                    placeholders.splice(i--, 1);
                    continue;
                }

                phed = Handler.placeholder(ph, options.context.currentContext, options.context.templateCurrentContext, options);

                // 只有一个占位符，并且没有其他字符
                if (placeholders.length === 1 && ph === result && (typeof phed === 'undefined' ? 'undefined' : _typeof(phed)) !== (typeof result === 'undefined' ? 'undefined' : _typeof(result))) {
                    // 
                    result = phed;
                    break;

                    if (Util.isNumeric(phed)) {
                        result = parseFloat(phed, 10);
                        break;
                    }
                    if (/^(true|false)$/.test(phed)) {
                        result = phed === 'true' ? true : phed === 'false' ? false : phed; // 已经是布尔值
                        break;
                    }
                }
                result = result.replace(ph, phed);
            }
        } else {
            // 'ASCII|1-10': '',
            // 'ASCII': '',
            result = options.rule.range ? Random.string(options.rule.count) : options.template;
        }
        return result;
    },
    'function': function _function(options) {
        // ( context, options )
        return options.template.call(options.context.currentContext, options);
    },
    'regexp': function regexp(options) {
        var source = '';

        // 'name': /regexp/,
        /* jshint -W041 */
        if (options.rule.count == undefined) {
            source += options.template.source; // regexp.source
        }

        // 'name|1-5': /regexp/,
        for (var i = 0; i < options.rule.count; i++) {
            source += options.template.source;
        }

        return RE.Handler.gen(RE.Parser.parse(source));
    }
});

Handler.extend({
    _all: function _all() {
        var re = {};
        for (var key in Random) {
            re[key.toLowerCase()] = key;
        }return re;
    },
    // 处理占位符，转换为最终值
    placeholder: function placeholder(_placeholder, obj, templateContext, options) {
        // console.log(options.context.path)
        // 1 key, 2 params
        Constant.RE_PLACEHOLDER.exec('');
        var parts = Constant.RE_PLACEHOLDER.exec(_placeholder),
            key = parts && parts[1],
            lkey = key && key.toLowerCase(),
            okey = this._all()[lkey],
            params = parts && parts[2] || '';
        var pathParts = this.splitPathToArray(key);

        // 解析占位符的参数
        try {
            // 1. 尝试保持参数的类型
            /*
                #24 [Window Firefox 30.0 引用 占位符 抛错](https://github.com/nuysoft/Mock/issues/24)
                [BX9056: 各浏览器下 window.eval 方法的执行上下文存在差异](http://www.w3help.org/zh-cn/causes/BX9056)
                应该属于 Window Firefox 30.0 的 BUG
            */
            /* jshint -W061 */
            params = eval('(function(){ return [].splice.call(arguments, 0 ) })(' + params + ')');
        } catch (error) {
            // 2. 如果失败，只能解析为字符串
            // console.error(error)
            // if (error instanceof ReferenceError) params = parts[2].split(/,\s*/);
            // else throw error
            params = parts[2].split(/,\s*/);
        }

        // 占位符优先引用数据模板中的属性
        if (obj && key in obj) return obj[key];

        // @index @key
        // if (Constant.RE_INDEX.test(key)) return +options.name
        // if (Constant.RE_KEY.test(key)) return options.name

        // 绝对路径 or 相对路径
        if (key.charAt(0) === '/' || pathParts.length > 1) return this.getValueByKeyPath(key, options);

        // 递归引用数据模板中的属性
        if (templateContext && (typeof templateContext === 'undefined' ? 'undefined' : _typeof(templateContext)) === 'object' && key in templateContext && _placeholder !== templateContext[key] // fix #15 避免自己依赖自己
        ) {
                // 先计算被引用的属性值
                templateContext[key] = Handler.gen(templateContext[key], key, {
                    currentContext: obj,
                    templateCurrentContext: templateContext
                });
                return templateContext[key];
            }

        // 如果未找到，则原样返回
        if (!(key in Random) && !(lkey in Random) && !(okey in Random)) return _placeholder;

        // 递归解析参数中的占位符
        for (var i = 0; i < params.length; i++) {
            Constant.RE_PLACEHOLDER.exec('');
            if (Constant.RE_PLACEHOLDER.test(params[i])) {
                params[i] = Handler.placeholder(params[i], obj, templateContext, options);
            }
        }

        var handle = Random[key] || Random[lkey] || Random[okey];
        switch (Util.type(handle)) {
            case 'array':
                // 自动从数组中取一个，例如 @areas
                return Random.pick(handle);
            case 'function':
                // 执行占位符方法（大多数情况）
                handle.options = options;
                var re = handle.apply(Random, params);
                if (re === undefined) re = ''; // 因为是在字符串中，所以默认为空字符串。
                delete handle.options;
                return re;
        }
    },
    getValueByKeyPath: function getValueByKeyPath(key, options) {
        var originalKey = key;
        var keyPathParts = this.splitPathToArray(key);
        var absolutePathParts = [];

        // 绝对路径
        if (key.charAt(0) === '/') {
            absolutePathParts = [options.context.path[0]].concat(this.normalizePath(keyPathParts));
        } else {
            // 相对路径
            if (keyPathParts.length > 1) {
                absolutePathParts = options.context.path.slice(0);
                absolutePathParts.pop();
                absolutePathParts = this.normalizePath(absolutePathParts.concat(keyPathParts));
            }
        }

        key = keyPathParts[keyPathParts.length - 1];
        var currentContext = options.context.root;
        var templateCurrentContext = options.context.templateRoot;
        for (var i = 1; i < absolutePathParts.length - 1; i++) {
            currentContext = currentContext[absolutePathParts[i]];
            templateCurrentContext = templateCurrentContext[absolutePathParts[i]];
        }
        // 引用的值已经计算好
        if (currentContext && key in currentContext) return currentContext[key];

        // 尚未计算，递归引用数据模板中的属性
        if (templateCurrentContext && (typeof templateCurrentContext === 'undefined' ? 'undefined' : _typeof(templateCurrentContext)) === 'object' && key in templateCurrentContext && originalKey !== templateCurrentContext[key] // fix #15 避免自己依赖自己
        ) {
                // 先计算被引用的属性值
                templateCurrentContext[key] = Handler.gen(templateCurrentContext[key], key, {
                    currentContext: currentContext,
                    templateCurrentContext: templateCurrentContext
                });
                return templateCurrentContext[key];
            }
    },
    // https://github.com/kissyteam/kissy/blob/master/src/path/src/path.js
    normalizePath: function normalizePath(pathParts) {
        var newPathParts = [];
        for (var i = 0; i < pathParts.length; i++) {
            switch (pathParts[i]) {
                case '..':
                    newPathParts.pop();
                    break;
                case '.':
                    break;
                default:
                    newPathParts.push(pathParts[i]);
            }
        }
        return newPathParts;
    },
    splitPathToArray: function splitPathToArray(path) {
        var parts = path.split(/\/+/);
        if (!parts[parts.length - 1]) parts = parts.slice(0, -1);
        if (!parts[0]) parts = parts.slice(1);
        return parts;
    }
});

module.exports = Handler;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhbmRsZXIuanMiXSwibmFtZXMiOlsiQ29uc3RhbnQiLCJyZXF1aXJlIiwiVXRpbCIsIlBhcnNlciIsIlJhbmRvbSIsIlJFIiwiSGFuZGxlciIsImV4dGVuZCIsImdlbiIsInRlbXBsYXRlIiwibmFtZSIsImNvbnRleHQiLCJ1bmRlZmluZWQiLCJwYXRoIiwiR1VJRCIsInRlbXBsYXRlUGF0aCIsImN1cnJlbnRDb250ZXh0IiwidGVtcGxhdGVDdXJyZW50Q29udGV4dCIsInJvb3QiLCJ0ZW1wbGF0ZVJvb3QiLCJydWxlIiwicGFyc2UiLCJ0eXBlIiwiZGF0YSIsInBhcnNlZE5hbWUiLCJyZXBsYWNlIiwiUkVfS0VZIiwiYXJyYXkiLCJvcHRpb25zIiwicmVzdWx0IiwiaSIsImlpIiwibGVuZ3RoIiwicGFyYW1ldGVycyIsInB1c2giLCJwb3AiLCJtaW4iLCJtYXgiLCJwaWNrIiwiX19vcmRlcl9pbmRleCIsImNvdW50Iiwib2JqZWN0Iiwia2V5cyIsImZuS2V5cyIsImtleSIsInBhcnNlZEtleSIsImluYyIsInNodWZmbGUiLCJzbGljZSIsImNvbmNhdCIsIm1hdGNoIiwicGFyc2VJbnQiLCJudW1iZXIiLCJwYXJ0cyIsImRlY2ltYWwiLCJzcGxpdCIsInJhbmdlIiwiZGNvdW50IiwiY2hhcmFjdGVyIiwicGFyc2VGbG9hdCIsImpvaW4iLCJib29sZWFuIiwiYm9vbCIsInN0cmluZyIsInBsYWNlaG9sZGVycyIsInBoIiwicGhlZCIsIlJFX1BMQUNFSE9MREVSIiwidGVzdCIsInNwbGljZSIsInBsYWNlaG9sZGVyIiwiaXNOdW1lcmljIiwiY2FsbCIsInNvdXJjZSIsIl9hbGwiLCJyZSIsInRvTG93ZXJDYXNlIiwib2JqIiwidGVtcGxhdGVDb250ZXh0IiwiZXhlYyIsImxrZXkiLCJva2V5IiwicGFyYW1zIiwicGF0aFBhcnRzIiwic3BsaXRQYXRoVG9BcnJheSIsImV2YWwiLCJlcnJvciIsImNoYXJBdCIsImdldFZhbHVlQnlLZXlQYXRoIiwiaGFuZGxlIiwiYXBwbHkiLCJvcmlnaW5hbEtleSIsImtleVBhdGhQYXJ0cyIsImFic29sdXRlUGF0aFBhcnRzIiwibm9ybWFsaXplUGF0aCIsIm5ld1BhdGhQYXJ0cyIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBaUNBLElBQUlBLFdBQVdDLFFBQVEsWUFBUixDQUFmO0FBQ0EsSUFBSUMsT0FBT0QsUUFBUSxRQUFSLENBQVg7QUFDQSxJQUFJRSxTQUFTRixRQUFRLFVBQVIsQ0FBYjtBQUNBLElBQUlHLFNBQVNILFFBQVEsV0FBUixDQUFiO0FBQ0EsSUFBSUksS0FBS0osUUFBUSxVQUFSLENBQVQ7O0FBRUEsSUFBSUssVUFBVTtBQUNWQyxZQUFRTCxLQUFLSzs7QUFHakI7Ozs7Ozs7Ozs7OztBQUpjLENBQWQsQ0FnQkFELFFBQVFFLEdBQVIsR0FBYyxVQUFTQyxRQUFULEVBQW1CQyxJQUFuQixFQUF5QkMsT0FBekIsRUFBa0M7QUFDNUM7QUFDQUQsV0FBT0EsUUFBUUUsU0FBUixHQUFvQixFQUFwQixHQUEwQkYsT0FBTyxFQUF4Qzs7QUFFQUMsY0FBVUEsV0FBVyxFQUFyQjtBQUNBQSxjQUFVO0FBQ0Y7QUFDQUUsY0FBTUYsUUFBUUUsSUFBUixJQUFnQixDQUFDYixTQUFTYyxJQUFWLENBRnBCO0FBR0ZDLHNCQUFjSixRQUFRSSxZQUFSLElBQXdCLENBQUNmLFNBQVNjLElBQVQsRUFBRCxDQUhwQztBQUlGO0FBQ0FFLHdCQUFnQkwsUUFBUUssY0FMdEI7QUFNRjtBQUNBQyxnQ0FBd0JOLFFBQVFNLHNCQUFSLElBQWtDUixRQVB4RDtBQVFGO0FBQ0FTLGNBQU1QLFFBQVFPLElBQVIsSUFBZ0JQLFFBQVFLLGNBVDVCO0FBVUY7QUFDQUcsc0JBQWNSLFFBQVFRLFlBQVIsSUFBd0JSLFFBQVFNLHNCQUFoQyxJQUEwRFI7QUFFNUU7O0FBYk0sS0FBVixDQWVBLElBQUlXLE9BQU9qQixPQUFPa0IsS0FBUCxDQUFhWCxJQUFiLENBQVg7QUFDQSxRQUFJWSxPQUFPcEIsS0FBS29CLElBQUwsQ0FBVWIsUUFBVixDQUFYO0FBQ0EsUUFBSWMsSUFBSjs7QUFFQSxRQUFJakIsUUFBUWdCLElBQVIsQ0FBSixFQUFtQjtBQUNmQyxlQUFPakIsUUFBUWdCLElBQVIsRUFBYztBQUNqQjtBQUNBQSxrQkFBTUEsSUFGVztBQUdqQjtBQUNBYixzQkFBVUEsUUFKTztBQUtqQjtBQUNBQyxrQkFBTUEsSUFOVztBQU9qQjtBQUNBYyx3QkFBWWQsT0FBT0EsS0FBS2UsT0FBTCxDQUFhekIsU0FBUzBCLE1BQXRCLEVBQThCLElBQTlCLENBQVAsR0FBNkNoQixJQVJ4Qzs7QUFVakI7QUFDQVUsa0JBQU1BLElBWFc7QUFZakI7QUFDQVQscUJBQVNBO0FBYlEsU0FBZCxDQUFQOztBQWdCQSxZQUFJLENBQUNBLFFBQVFPLElBQWIsRUFBbUJQLFFBQVFPLElBQVIsR0FBZUssSUFBZjtBQUNuQixlQUFPQSxJQUFQO0FBQ0g7O0FBRUQsV0FBT2QsUUFBUDtBQUNILENBOUNEOztBQWdEQUgsUUFBUUMsTUFBUixDQUFlO0FBQ1hvQixXQUFPLGVBQVNDLE9BQVQsRUFBa0I7QUFDckIsWUFBSUMsU0FBUyxFQUFiO0FBQUEsWUFDSUMsQ0FESjtBQUFBLFlBQ09DLEVBRFA7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsWUFBSUgsUUFBUW5CLFFBQVIsQ0FBaUJ1QixNQUFqQixLQUE0QixDQUFoQyxFQUFtQyxPQUFPSCxNQUFQOztBQUVuQztBQUNBLFlBQUksQ0FBQ0QsUUFBUVIsSUFBUixDQUFhYSxVQUFsQixFQUE4QjtBQUMxQixpQkFBS0gsSUFBSSxDQUFULEVBQVlBLElBQUlGLFFBQVFuQixRQUFSLENBQWlCdUIsTUFBakMsRUFBeUNGLEdBQXpDLEVBQThDO0FBQzFDRix3QkFBUWpCLE9BQVIsQ0FBZ0JFLElBQWhCLENBQXFCcUIsSUFBckIsQ0FBMEJKLENBQTFCO0FBQ0FGLHdCQUFRakIsT0FBUixDQUFnQkksWUFBaEIsQ0FBNkJtQixJQUE3QixDQUFrQ0osQ0FBbEM7QUFDQUQsdUJBQU9LLElBQVAsQ0FDSTVCLFFBQVFFLEdBQVIsQ0FBWW9CLFFBQVFuQixRQUFSLENBQWlCcUIsQ0FBakIsQ0FBWixFQUFpQ0EsQ0FBakMsRUFBb0M7QUFDaENqQiwwQkFBTWUsUUFBUWpCLE9BQVIsQ0FBZ0JFLElBRFU7QUFFaENFLGtDQUFjYSxRQUFRakIsT0FBUixDQUFnQkksWUFGRTtBQUdoQ0Msb0NBQWdCYSxNQUhnQjtBQUloQ1osNENBQXdCVyxRQUFRbkIsUUFKQTtBQUtoQ1MsMEJBQU1VLFFBQVFqQixPQUFSLENBQWdCTyxJQUFoQixJQUF3QlcsTUFMRTtBQU1oQ1Ysa0NBQWNTLFFBQVFqQixPQUFSLENBQWdCUSxZQUFoQixJQUFnQ1MsUUFBUW5CO0FBTnRCLGlCQUFwQyxDQURKO0FBVUFtQix3QkFBUWpCLE9BQVIsQ0FBZ0JFLElBQWhCLENBQXFCc0IsR0FBckI7QUFDQVAsd0JBQVFqQixPQUFSLENBQWdCSSxZQUFoQixDQUE2Qm9CLEdBQTdCO0FBQ0g7QUFDSixTQWpCRCxNQWlCTztBQUNIO0FBQ0EsZ0JBQUlQLFFBQVFSLElBQVIsQ0FBYWdCLEdBQWIsS0FBcUIsQ0FBckIsSUFBMEJSLFFBQVFSLElBQVIsQ0FBYWlCLEdBQWIsS0FBcUJ6QixTQUFuRCxFQUE4RDtBQUMxRDtBQUNBZ0Isd0JBQVFqQixPQUFSLENBQWdCRSxJQUFoQixDQUFxQnFCLElBQXJCLENBQTBCTixRQUFRbEIsSUFBbEM7QUFDQWtCLHdCQUFRakIsT0FBUixDQUFnQkksWUFBaEIsQ0FBNkJtQixJQUE3QixDQUFrQ04sUUFBUWxCLElBQTFDO0FBQ0FtQix5QkFBU3pCLE9BQU9rQyxJQUFQLENBQ0xoQyxRQUFRRSxHQUFSLENBQVlvQixRQUFRbkIsUUFBcEIsRUFBOEJHLFNBQTlCLEVBQXlDO0FBQ3JDQywwQkFBTWUsUUFBUWpCLE9BQVIsQ0FBZ0JFLElBRGU7QUFFckNFLGtDQUFjYSxRQUFRakIsT0FBUixDQUFnQkksWUFGTztBQUdyQ0Msb0NBQWdCYSxNQUhxQjtBQUlyQ1osNENBQXdCVyxRQUFRbkIsUUFKSztBQUtyQ1MsMEJBQU1VLFFBQVFqQixPQUFSLENBQWdCTyxJQUFoQixJQUF3QlcsTUFMTztBQU1yQ1Ysa0NBQWNTLFFBQVFqQixPQUFSLENBQWdCUSxZQUFoQixJQUFnQ1MsUUFBUW5CO0FBTmpCLGlCQUF6QyxDQURLLENBQVQ7QUFVQW1CLHdCQUFRakIsT0FBUixDQUFnQkUsSUFBaEIsQ0FBcUJzQixHQUFyQjtBQUNBUCx3QkFBUWpCLE9BQVIsQ0FBZ0JJLFlBQWhCLENBQTZCb0IsR0FBN0I7QUFDSCxhQWhCRCxNQWdCTztBQUNIO0FBQ0Esb0JBQUlQLFFBQVFSLElBQVIsQ0FBYWEsVUFBYixDQUF3QixDQUF4QixDQUFKLEVBQWdDO0FBQzVCTCw0QkFBUW5CLFFBQVIsQ0FBaUI4QixhQUFqQixHQUFpQ1gsUUFBUW5CLFFBQVIsQ0FBaUI4QixhQUFqQixJQUFrQyxDQUFuRTs7QUFFQVgsNEJBQVFqQixPQUFSLENBQWdCRSxJQUFoQixDQUFxQnFCLElBQXJCLENBQTBCTixRQUFRbEIsSUFBbEM7QUFDQWtCLDRCQUFRakIsT0FBUixDQUFnQkksWUFBaEIsQ0FBNkJtQixJQUE3QixDQUFrQ04sUUFBUWxCLElBQTFDO0FBQ0FtQiw2QkFBU3ZCLFFBQVFFLEdBQVIsQ0FBWW9CLFFBQVFuQixRQUFwQixFQUE4QkcsU0FBOUIsRUFBeUM7QUFDOUNDLDhCQUFNZSxRQUFRakIsT0FBUixDQUFnQkUsSUFEd0I7QUFFOUNFLHNDQUFjYSxRQUFRakIsT0FBUixDQUFnQkksWUFGZ0I7QUFHOUNDLHdDQUFnQmEsTUFIOEI7QUFJOUNaLGdEQUF3QlcsUUFBUW5CLFFBSmM7QUFLOUNTLDhCQUFNVSxRQUFRakIsT0FBUixDQUFnQk8sSUFBaEIsSUFBd0JXLE1BTGdCO0FBTTlDVixzQ0FBY1MsUUFBUWpCLE9BQVIsQ0FBZ0JRLFlBQWhCLElBQWdDUyxRQUFRbkI7QUFOUixxQkFBekMsRUFRTG1CLFFBQVFuQixRQUFSLENBQWlCOEIsYUFBakIsR0FBaUNYLFFBQVFuQixRQUFSLENBQWlCdUIsTUFSN0MsQ0FBVDs7QUFXQUosNEJBQVFuQixRQUFSLENBQWlCOEIsYUFBakIsSUFBa0MsQ0FBQ1gsUUFBUVIsSUFBUixDQUFhYSxVQUFiLENBQXdCLENBQXhCLENBQW5DOztBQUVBTCw0QkFBUWpCLE9BQVIsQ0FBZ0JFLElBQWhCLENBQXFCc0IsR0FBckI7QUFDQVAsNEJBQVFqQixPQUFSLENBQWdCSSxZQUFoQixDQUE2Qm9CLEdBQTdCO0FBRUgsaUJBckJELE1BcUJPO0FBQ0g7QUFDQSx5QkFBS0wsSUFBSSxDQUFULEVBQVlBLElBQUlGLFFBQVFSLElBQVIsQ0FBYW9CLEtBQTdCLEVBQW9DVixHQUFwQyxFQUF5QztBQUNyQztBQUNBLDZCQUFLQyxLQUFLLENBQVYsRUFBYUEsS0FBS0gsUUFBUW5CLFFBQVIsQ0FBaUJ1QixNQUFuQyxFQUEyQ0QsSUFBM0MsRUFBaUQ7QUFDN0NILG9DQUFRakIsT0FBUixDQUFnQkUsSUFBaEIsQ0FBcUJxQixJQUFyQixDQUEwQkwsT0FBT0csTUFBakM7QUFDQUosb0NBQVFqQixPQUFSLENBQWdCSSxZQUFoQixDQUE2Qm1CLElBQTdCLENBQWtDSCxFQUFsQztBQUNBRixtQ0FBT0ssSUFBUCxDQUNJNUIsUUFBUUUsR0FBUixDQUFZb0IsUUFBUW5CLFFBQVIsQ0FBaUJzQixFQUFqQixDQUFaLEVBQWtDRixPQUFPRyxNQUF6QyxFQUFpRDtBQUM3Q25CLHNDQUFNZSxRQUFRakIsT0FBUixDQUFnQkUsSUFEdUI7QUFFN0NFLDhDQUFjYSxRQUFRakIsT0FBUixDQUFnQkksWUFGZTtBQUc3Q0MsZ0RBQWdCYSxNQUg2QjtBQUk3Q1osd0RBQXdCVyxRQUFRbkIsUUFKYTtBQUs3Q1Msc0NBQU1VLFFBQVFqQixPQUFSLENBQWdCTyxJQUFoQixJQUF3QlcsTUFMZTtBQU03Q1YsOENBQWNTLFFBQVFqQixPQUFSLENBQWdCUSxZQUFoQixJQUFnQ1MsUUFBUW5CO0FBTlQsNkJBQWpELENBREo7QUFVQW1CLG9DQUFRakIsT0FBUixDQUFnQkUsSUFBaEIsQ0FBcUJzQixHQUFyQjtBQUNBUCxvQ0FBUWpCLE9BQVIsQ0FBZ0JJLFlBQWhCLENBQTZCb0IsR0FBN0I7QUFDSDtBQUNKO0FBQ0o7QUFDSjtBQUNKO0FBQ0QsZUFBT04sTUFBUDtBQUNILEtBOUZVO0FBK0ZYWSxZQUFRLGdCQUFTYixPQUFULEVBQWtCO0FBQ3RCLFlBQUlDLFNBQVMsRUFBYjtBQUFBLFlBQ0lhLElBREo7QUFBQSxZQUNVQyxNQURWO0FBQUEsWUFDa0JDLEdBRGxCO0FBQUEsWUFDdUJDLFNBRHZCO0FBQUEsWUFDa0NDLEdBRGxDO0FBQUEsWUFDdUNoQixDQUR2Qzs7QUFHQTtBQUNBO0FBQ0EsWUFBSUYsUUFBUVIsSUFBUixDQUFhZ0IsR0FBYixJQUFvQnhCLFNBQXhCLEVBQW1DO0FBQy9COEIsbUJBQU94QyxLQUFLd0MsSUFBTCxDQUFVZCxRQUFRbkIsUUFBbEIsQ0FBUDtBQUNBaUMsbUJBQU90QyxPQUFPMkMsT0FBUCxDQUFlTCxJQUFmLENBQVA7QUFDQUEsbUJBQU9BLEtBQUtNLEtBQUwsQ0FBVyxDQUFYLEVBQWNwQixRQUFRUixJQUFSLENBQWFvQixLQUEzQixDQUFQO0FBQ0EsaUJBQUtWLElBQUksQ0FBVCxFQUFZQSxJQUFJWSxLQUFLVixNQUFyQixFQUE2QkYsR0FBN0IsRUFBa0M7QUFDOUJjLHNCQUFNRixLQUFLWixDQUFMLENBQU47QUFDQWUsNEJBQVlELElBQUluQixPQUFKLENBQVl6QixTQUFTMEIsTUFBckIsRUFBNkIsSUFBN0IsQ0FBWjtBQUNBRSx3QkFBUWpCLE9BQVIsQ0FBZ0JFLElBQWhCLENBQXFCcUIsSUFBckIsQ0FBMEJXLFNBQTFCO0FBQ0FqQix3QkFBUWpCLE9BQVIsQ0FBZ0JJLFlBQWhCLENBQTZCbUIsSUFBN0IsQ0FBa0NVLEdBQWxDO0FBQ0FmLHVCQUFPZ0IsU0FBUCxJQUFvQnZDLFFBQVFFLEdBQVIsQ0FBWW9CLFFBQVFuQixRQUFSLENBQWlCbUMsR0FBakIsQ0FBWixFQUFtQ0EsR0FBbkMsRUFBd0M7QUFDeEQvQiwwQkFBTWUsUUFBUWpCLE9BQVIsQ0FBZ0JFLElBRGtDO0FBRXhERSxrQ0FBY2EsUUFBUWpCLE9BQVIsQ0FBZ0JJLFlBRjBCO0FBR3hEQyxvQ0FBZ0JhLE1BSHdDO0FBSXhEWiw0Q0FBd0JXLFFBQVFuQixRQUp3QjtBQUt4RFMsMEJBQU1VLFFBQVFqQixPQUFSLENBQWdCTyxJQUFoQixJQUF3QlcsTUFMMEI7QUFNeERWLGtDQUFjUyxRQUFRakIsT0FBUixDQUFnQlEsWUFBaEIsSUFBZ0NTLFFBQVFuQjtBQU5FLGlCQUF4QyxDQUFwQjtBQVFBbUIsd0JBQVFqQixPQUFSLENBQWdCRSxJQUFoQixDQUFxQnNCLEdBQXJCO0FBQ0FQLHdCQUFRakIsT0FBUixDQUFnQkksWUFBaEIsQ0FBNkJvQixHQUE3QjtBQUNIO0FBRUosU0FyQkQsTUFxQk87QUFDSDtBQUNBTyxtQkFBTyxFQUFQO0FBQ0FDLHFCQUFTLEVBQVQsQ0FIRyxDQUdTO0FBQ1osaUJBQUtDLEdBQUwsSUFBWWhCLFFBQVFuQixRQUFwQixFQUE4QjtBQUMxQixpQkFBQyxPQUFPbUIsUUFBUW5CLFFBQVIsQ0FBaUJtQyxHQUFqQixDQUFQLEtBQWlDLFVBQWpDLEdBQThDRCxNQUE5QyxHQUF1REQsSUFBeEQsRUFBOERSLElBQTlELENBQW1FVSxHQUFuRTtBQUNIO0FBQ0RGLG1CQUFPQSxLQUFLTyxNQUFMLENBQVlOLE1BQVosQ0FBUDs7QUFFQTs7Ozs7Ozs7Ozs7O0FBWUEsaUJBQUtiLElBQUksQ0FBVCxFQUFZQSxJQUFJWSxLQUFLVixNQUFyQixFQUE2QkYsR0FBN0IsRUFBa0M7QUFDOUJjLHNCQUFNRixLQUFLWixDQUFMLENBQU47QUFDQWUsNEJBQVlELElBQUluQixPQUFKLENBQVl6QixTQUFTMEIsTUFBckIsRUFBNkIsSUFBN0IsQ0FBWjtBQUNBRSx3QkFBUWpCLE9BQVIsQ0FBZ0JFLElBQWhCLENBQXFCcUIsSUFBckIsQ0FBMEJXLFNBQTFCO0FBQ0FqQix3QkFBUWpCLE9BQVIsQ0FBZ0JJLFlBQWhCLENBQTZCbUIsSUFBN0IsQ0FBa0NVLEdBQWxDO0FBQ0FmLHVCQUFPZ0IsU0FBUCxJQUFvQnZDLFFBQVFFLEdBQVIsQ0FBWW9CLFFBQVFuQixRQUFSLENBQWlCbUMsR0FBakIsQ0FBWixFQUFtQ0EsR0FBbkMsRUFBd0M7QUFDeEQvQiwwQkFBTWUsUUFBUWpCLE9BQVIsQ0FBZ0JFLElBRGtDO0FBRXhERSxrQ0FBY2EsUUFBUWpCLE9BQVIsQ0FBZ0JJLFlBRjBCO0FBR3hEQyxvQ0FBZ0JhLE1BSHdDO0FBSXhEWiw0Q0FBd0JXLFFBQVFuQixRQUp3QjtBQUt4RFMsMEJBQU1VLFFBQVFqQixPQUFSLENBQWdCTyxJQUFoQixJQUF3QlcsTUFMMEI7QUFNeERWLGtDQUFjUyxRQUFRakIsT0FBUixDQUFnQlEsWUFBaEIsSUFBZ0NTLFFBQVFuQjtBQU5FLGlCQUF4QyxDQUFwQjtBQVFBbUIsd0JBQVFqQixPQUFSLENBQWdCRSxJQUFoQixDQUFxQnNCLEdBQXJCO0FBQ0FQLHdCQUFRakIsT0FBUixDQUFnQkksWUFBaEIsQ0FBNkJvQixHQUE3QjtBQUNJO0FBQ0pXLHNCQUFNRixJQUFJTSxLQUFKLENBQVVsRCxTQUFTMEIsTUFBbkIsQ0FBTjtBQUNBLG9CQUFJb0IsT0FBT0EsSUFBSSxDQUFKLENBQVAsSUFBaUI1QyxLQUFLb0IsSUFBTCxDQUFVTSxRQUFRbkIsUUFBUixDQUFpQm1DLEdBQWpCLENBQVYsTUFBcUMsUUFBMUQsRUFBb0U7QUFDaEVoQiw0QkFBUW5CLFFBQVIsQ0FBaUJtQyxHQUFqQixLQUF5Qk8sU0FBU0wsSUFBSSxDQUFKLENBQVQsRUFBaUIsRUFBakIsQ0FBekI7QUFDSDtBQUNKO0FBQ0o7QUFDRCxlQUFPakIsTUFBUDtBQUNILEtBdEtVO0FBdUtYdUIsWUFBUSxnQkFBU3hCLE9BQVQsRUFBa0I7QUFDdEIsWUFBSUMsTUFBSixFQUFZd0IsS0FBWjtBQUNBLFlBQUl6QixRQUFRUixJQUFSLENBQWFrQyxPQUFqQixFQUEwQjtBQUFFO0FBQ3hCMUIsb0JBQVFuQixRQUFSLElBQW9CLEVBQXBCO0FBQ0E0QyxvQkFBUXpCLFFBQVFuQixRQUFSLENBQWlCOEMsS0FBakIsQ0FBdUIsR0FBdkIsQ0FBUjtBQUNJO0FBQ0E7QUFDQTtBQUNBO0FBQ0pGLGtCQUFNLENBQU4sSUFBV3pCLFFBQVFSLElBQVIsQ0FBYW9DLEtBQWIsR0FBcUI1QixRQUFRUixJQUFSLENBQWFvQixLQUFsQyxHQUEwQ2EsTUFBTSxDQUFOLENBQXJEO0FBQ0FBLGtCQUFNLENBQU4sSUFBVyxDQUFDQSxNQUFNLENBQU4sS0FBWSxFQUFiLEVBQWlCTCxLQUFqQixDQUF1QixDQUF2QixFQUEwQnBCLFFBQVFSLElBQVIsQ0FBYXFDLE1BQXZDLENBQVg7QUFDQSxtQkFBT0osTUFBTSxDQUFOLEVBQVNyQixNQUFULEdBQWtCSixRQUFRUixJQUFSLENBQWFxQyxNQUF0QyxFQUE4QztBQUMxQ0osc0JBQU0sQ0FBTjtBQUNJO0FBQ0NBLHNCQUFNLENBQU4sRUFBU3JCLE1BQVQsR0FBa0JKLFFBQVFSLElBQVIsQ0FBYXFDLE1BQWIsR0FBc0IsQ0FBekMsR0FBOENyRCxPQUFPc0QsU0FBUCxDQUFpQixRQUFqQixDQUE5QyxHQUEyRXRELE9BQU9zRCxTQUFQLENBQWlCLFdBQWpCLENBRi9FO0FBSUg7QUFDRDdCLHFCQUFTOEIsV0FBV04sTUFBTU8sSUFBTixDQUFXLEdBQVgsQ0FBWCxFQUE0QixFQUE1QixDQUFUO0FBQ0gsU0FoQkQsTUFnQk87QUFBRTtBQUNMO0FBQ0EvQixxQkFBU0QsUUFBUVIsSUFBUixDQUFhb0MsS0FBYixJQUFzQixDQUFDNUIsUUFBUVIsSUFBUixDQUFhYSxVQUFiLENBQXdCLENBQXhCLENBQXZCLEdBQW9ETCxRQUFRUixJQUFSLENBQWFvQixLQUFqRSxHQUF5RVosUUFBUW5CLFFBQTFGO0FBQ0g7QUFDRCxlQUFPb0IsTUFBUDtBQUNILEtBOUxVO0FBK0xYZ0MsYUFBUyxpQkFBU2pDLE9BQVQsRUFBa0I7QUFDdkIsWUFBSUMsTUFBSjtBQUNBO0FBQ0E7QUFDQUEsaUJBQVNELFFBQVFSLElBQVIsQ0FBYWEsVUFBYixHQUEwQjdCLE9BQU8wRCxJQUFQLENBQVlsQyxRQUFRUixJQUFSLENBQWFnQixHQUF6QixFQUE4QlIsUUFBUVIsSUFBUixDQUFhaUIsR0FBM0MsRUFBZ0RULFFBQVFuQixRQUF4RCxDQUExQixHQUE4Rm1CLFFBQVFuQixRQUEvRztBQUNBLGVBQU9vQixNQUFQO0FBQ0gsS0FyTVU7QUFzTVhrQyxZQUFRLGdCQUFTbkMsT0FBVCxFQUFrQjtBQUN0QixZQUFJQyxTQUFTLEVBQWI7QUFBQSxZQUNJQyxDQURKO0FBQUEsWUFDT2tDLFlBRFA7QUFBQSxZQUNxQkMsRUFEckI7QUFBQSxZQUN5QkMsSUFEekI7QUFFQSxZQUFJdEMsUUFBUW5CLFFBQVIsQ0FBaUJ1QixNQUFyQixFQUE2Qjs7QUFFekI7QUFDQTtBQUNBLGdCQUFJSixRQUFRUixJQUFSLENBQWFvQixLQUFiLElBQXNCNUIsU0FBMUIsRUFBcUM7QUFDakNpQiwwQkFBVUQsUUFBUW5CLFFBQWxCO0FBQ0g7O0FBRUQ7QUFDQSxpQkFBS3FCLElBQUksQ0FBVCxFQUFZQSxJQUFJRixRQUFRUixJQUFSLENBQWFvQixLQUE3QixFQUFvQ1YsR0FBcEMsRUFBeUM7QUFDckNELDBCQUFVRCxRQUFRbkIsUUFBbEI7QUFDSDtBQUNEO0FBQ0F1RCwyQkFBZW5DLE9BQU9xQixLQUFQLENBQWFsRCxTQUFTbUUsY0FBdEIsS0FBeUMsRUFBeEQsQ0FieUIsQ0Fha0M7QUFDM0QsaUJBQUtyQyxJQUFJLENBQVQsRUFBWUEsSUFBSWtDLGFBQWFoQyxNQUE3QixFQUFxQ0YsR0FBckMsRUFBMEM7QUFDdENtQyxxQkFBS0QsYUFBYWxDLENBQWIsQ0FBTDs7QUFFQTtBQUNBLG9CQUFJLE1BQU1zQyxJQUFOLENBQVdILEVBQVgsQ0FBSixFQUFvQjtBQUNoQkQsaUNBQWFLLE1BQWIsQ0FBb0J2QyxHQUFwQixFQUF5QixDQUF6QjtBQUNBO0FBQ0g7O0FBRURvQyx1QkFBTzVELFFBQVFnRSxXQUFSLENBQW9CTCxFQUFwQixFQUF3QnJDLFFBQVFqQixPQUFSLENBQWdCSyxjQUF4QyxFQUF3RFksUUFBUWpCLE9BQVIsQ0FBZ0JNLHNCQUF4RSxFQUFnR1csT0FBaEcsQ0FBUDs7QUFFQTtBQUNBLG9CQUFJb0MsYUFBYWhDLE1BQWIsS0FBd0IsQ0FBeEIsSUFBNkJpQyxPQUFPcEMsTUFBcEMsSUFBOEMsUUFBT3FDLElBQVAseUNBQU9BLElBQVAsZUFBdUJyQyxNQUF2Qix5Q0FBdUJBLE1BQXZCLEVBQWxELEVBQWlGO0FBQUU7QUFDL0VBLDZCQUFTcUMsSUFBVDtBQUNBOztBQUVBLHdCQUFJaEUsS0FBS3FFLFNBQUwsQ0FBZUwsSUFBZixDQUFKLEVBQTBCO0FBQ3RCckMsaUNBQVM4QixXQUFXTyxJQUFYLEVBQWlCLEVBQWpCLENBQVQ7QUFDQTtBQUNIO0FBQ0Qsd0JBQUksaUJBQWlCRSxJQUFqQixDQUFzQkYsSUFBdEIsQ0FBSixFQUFpQztBQUM3QnJDLGlDQUFTcUMsU0FBUyxNQUFULEdBQWtCLElBQWxCLEdBQ0xBLFNBQVMsT0FBVCxHQUFtQixLQUFuQixHQUNBQSxJQUZKLENBRDZCLENBR3BCO0FBQ1Q7QUFDSDtBQUNKO0FBQ0RyQyx5QkFBU0EsT0FBT0osT0FBUCxDQUFld0MsRUFBZixFQUFtQkMsSUFBbkIsQ0FBVDtBQUNIO0FBRUosU0E1Q0QsTUE0Q087QUFDSDtBQUNBO0FBQ0FyQyxxQkFBU0QsUUFBUVIsSUFBUixDQUFhb0MsS0FBYixHQUFxQnBELE9BQU8yRCxNQUFQLENBQWNuQyxRQUFRUixJQUFSLENBQWFvQixLQUEzQixDQUFyQixHQUF5RFosUUFBUW5CLFFBQTFFO0FBQ0g7QUFDRCxlQUFPb0IsTUFBUDtBQUNILEtBM1BVO0FBNFBYLGdCQUFZLG1CQUFTRCxPQUFULEVBQWtCO0FBQzFCO0FBQ0EsZUFBT0EsUUFBUW5CLFFBQVIsQ0FBaUIrRCxJQUFqQixDQUFzQjVDLFFBQVFqQixPQUFSLENBQWdCSyxjQUF0QyxFQUFzRFksT0FBdEQsQ0FBUDtBQUNILEtBL1BVO0FBZ1FYLGNBQVUsZ0JBQVNBLE9BQVQsRUFBa0I7QUFDeEIsWUFBSTZDLFNBQVMsRUFBYjs7QUFFQTtBQUNBO0FBQ0EsWUFBSTdDLFFBQVFSLElBQVIsQ0FBYW9CLEtBQWIsSUFBc0I1QixTQUExQixFQUFxQztBQUNqQzZELHNCQUFVN0MsUUFBUW5CLFFBQVIsQ0FBaUJnRSxNQUEzQixDQURpQyxDQUNDO0FBQ3JDOztBQUVEO0FBQ0EsYUFBSyxJQUFJM0MsSUFBSSxDQUFiLEVBQWdCQSxJQUFJRixRQUFRUixJQUFSLENBQWFvQixLQUFqQyxFQUF3Q1YsR0FBeEMsRUFBNkM7QUFDekMyQyxzQkFBVTdDLFFBQVFuQixRQUFSLENBQWlCZ0UsTUFBM0I7QUFDSDs7QUFFRCxlQUFPcEUsR0FBR0MsT0FBSCxDQUFXRSxHQUFYLENBQ0hILEdBQUdGLE1BQUgsQ0FBVWtCLEtBQVYsQ0FDSW9ELE1BREosQ0FERyxDQUFQO0FBS0g7QUFuUlUsQ0FBZjs7QUFzUkFuRSxRQUFRQyxNQUFSLENBQWU7QUFDWG1FLFVBQU0sZ0JBQVc7QUFDYixZQUFJQyxLQUFLLEVBQVQ7QUFDQSxhQUFLLElBQUkvQixHQUFULElBQWdCeEMsTUFBaEI7QUFBd0J1RSxlQUFHL0IsSUFBSWdDLFdBQUosRUFBSCxJQUF3QmhDLEdBQXhCO0FBQXhCLFNBQ0EsT0FBTytCLEVBQVA7QUFDSCxLQUxVO0FBTVg7QUFDQUwsaUJBQWEscUJBQVNBLFlBQVQsRUFBc0JPLEdBQXRCLEVBQTJCQyxlQUEzQixFQUE0Q2xELE9BQTVDLEVBQXFEO0FBQzlEO0FBQ0E7QUFDQTVCLGlCQUFTbUUsY0FBVCxDQUF3QlksSUFBeEIsQ0FBNkIsRUFBN0I7QUFDQSxZQUFJMUIsUUFBUXJELFNBQVNtRSxjQUFULENBQXdCWSxJQUF4QixDQUE2QlQsWUFBN0IsQ0FBWjtBQUFBLFlBQ0kxQixNQUFNUyxTQUFTQSxNQUFNLENBQU4sQ0FEbkI7QUFBQSxZQUVJMkIsT0FBT3BDLE9BQU9BLElBQUlnQyxXQUFKLEVBRmxCO0FBQUEsWUFHSUssT0FBTyxLQUFLUCxJQUFMLEdBQVlNLElBQVosQ0FIWDtBQUFBLFlBSUlFLFNBQVM3QixTQUFTQSxNQUFNLENBQU4sQ0FBVCxJQUFxQixFQUpsQztBQUtBLFlBQUk4QixZQUFZLEtBQUtDLGdCQUFMLENBQXNCeEMsR0FBdEIsQ0FBaEI7O0FBRUE7QUFDQSxZQUFJO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBc0MscUJBQVNHLEtBQUssMERBQTBESCxNQUExRCxHQUFtRSxHQUF4RSxDQUFUO0FBQ0gsU0FURCxDQVNFLE9BQU9JLEtBQVAsRUFBYztBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0FKLHFCQUFTN0IsTUFBTSxDQUFOLEVBQVNFLEtBQVQsQ0FBZSxNQUFmLENBQVQ7QUFDSDs7QUFFRDtBQUNBLFlBQUlzQixPQUFRakMsT0FBT2lDLEdBQW5CLEVBQXlCLE9BQU9BLElBQUlqQyxHQUFKLENBQVA7O0FBRXpCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQ0lBLElBQUkyQyxNQUFKLENBQVcsQ0FBWCxNQUFrQixHQUFsQixJQUNBSixVQUFVbkQsTUFBVixHQUFtQixDQUZ2QixFQUdFLE9BQU8sS0FBS3dELGlCQUFMLENBQXVCNUMsR0FBdkIsRUFBNEJoQixPQUE1QixDQUFQOztBQUVGO0FBQ0EsWUFBSWtELG1CQUNDLFFBQU9BLGVBQVAseUNBQU9BLGVBQVAsT0FBMkIsUUFENUIsSUFFQ2xDLE9BQU9rQyxlQUZSLElBR0NSLGlCQUFnQlEsZ0JBQWdCbEMsR0FBaEIsQ0FIckIsQ0FHMkM7QUFIM0MsVUFJRTtBQUNFO0FBQ0FrQyxnQ0FBZ0JsQyxHQUFoQixJQUF1QnRDLFFBQVFFLEdBQVIsQ0FBWXNFLGdCQUFnQmxDLEdBQWhCLENBQVosRUFBa0NBLEdBQWxDLEVBQXVDO0FBQzFENUIsb0NBQWdCNkQsR0FEMEM7QUFFMUQ1RCw0Q0FBd0I2RDtBQUZrQyxpQkFBdkMsQ0FBdkI7QUFJQSx1QkFBT0EsZ0JBQWdCbEMsR0FBaEIsQ0FBUDtBQUNIOztBQUVEO0FBQ0EsWUFBSSxFQUFFQSxPQUFPeEMsTUFBVCxLQUFvQixFQUFFNEUsUUFBUTVFLE1BQVYsQ0FBcEIsSUFBeUMsRUFBRTZFLFFBQVE3RSxNQUFWLENBQTdDLEVBQWdFLE9BQU9rRSxZQUFQOztBQUVoRTtBQUNBLGFBQUssSUFBSXhDLElBQUksQ0FBYixFQUFnQkEsSUFBSW9ELE9BQU9sRCxNQUEzQixFQUFtQ0YsR0FBbkMsRUFBd0M7QUFDcEM5QixxQkFBU21FLGNBQVQsQ0FBd0JZLElBQXhCLENBQTZCLEVBQTdCO0FBQ0EsZ0JBQUkvRSxTQUFTbUUsY0FBVCxDQUF3QkMsSUFBeEIsQ0FBNkJjLE9BQU9wRCxDQUFQLENBQTdCLENBQUosRUFBNkM7QUFDekNvRCx1QkFBT3BELENBQVAsSUFBWXhCLFFBQVFnRSxXQUFSLENBQW9CWSxPQUFPcEQsQ0FBUCxDQUFwQixFQUErQitDLEdBQS9CLEVBQW9DQyxlQUFwQyxFQUFxRGxELE9BQXJELENBQVo7QUFDSDtBQUNKOztBQUVELFlBQUk2RCxTQUFTckYsT0FBT3dDLEdBQVAsS0FBZXhDLE9BQU80RSxJQUFQLENBQWYsSUFBK0I1RSxPQUFPNkUsSUFBUCxDQUE1QztBQUNBLGdCQUFRL0UsS0FBS29CLElBQUwsQ0FBVW1FLE1BQVYsQ0FBUjtBQUNJLGlCQUFLLE9BQUw7QUFDSTtBQUNBLHVCQUFPckYsT0FBT2tDLElBQVAsQ0FBWW1ELE1BQVosQ0FBUDtBQUNKLGlCQUFLLFVBQUw7QUFDSTtBQUNBQSx1QkFBTzdELE9BQVAsR0FBaUJBLE9BQWpCO0FBQ0Esb0JBQUkrQyxLQUFLYyxPQUFPQyxLQUFQLENBQWF0RixNQUFiLEVBQXFCOEUsTUFBckIsQ0FBVDtBQUNBLG9CQUFJUCxPQUFPL0QsU0FBWCxFQUFzQitELEtBQUssRUFBTCxDQUoxQixDQUlrQztBQUM5Qix1QkFBT2MsT0FBTzdELE9BQWQ7QUFDQSx1QkFBTytDLEVBQVA7QUFWUjtBQVlILEtBdkZVO0FBd0ZYYSx1QkFBbUIsMkJBQVM1QyxHQUFULEVBQWNoQixPQUFkLEVBQXVCO0FBQ3RDLFlBQUkrRCxjQUFjL0MsR0FBbEI7QUFDQSxZQUFJZ0QsZUFBZSxLQUFLUixnQkFBTCxDQUFzQnhDLEdBQXRCLENBQW5CO0FBQ0EsWUFBSWlELG9CQUFvQixFQUF4Qjs7QUFFQTtBQUNBLFlBQUlqRCxJQUFJMkMsTUFBSixDQUFXLENBQVgsTUFBa0IsR0FBdEIsRUFBMkI7QUFDdkJNLGdDQUFvQixDQUFDakUsUUFBUWpCLE9BQVIsQ0FBZ0JFLElBQWhCLENBQXFCLENBQXJCLENBQUQsRUFBMEJvQyxNQUExQixDQUNoQixLQUFLNkMsYUFBTCxDQUFtQkYsWUFBbkIsQ0FEZ0IsQ0FBcEI7QUFHSCxTQUpELE1BSU87QUFDSDtBQUNBLGdCQUFJQSxhQUFhNUQsTUFBYixHQUFzQixDQUExQixFQUE2QjtBQUN6QjZELG9DQUFvQmpFLFFBQVFqQixPQUFSLENBQWdCRSxJQUFoQixDQUFxQm1DLEtBQXJCLENBQTJCLENBQTNCLENBQXBCO0FBQ0E2QyxrQ0FBa0IxRCxHQUFsQjtBQUNBMEQsb0NBQW9CLEtBQUtDLGFBQUwsQ0FDaEJELGtCQUFrQjVDLE1BQWxCLENBQXlCMkMsWUFBekIsQ0FEZ0IsQ0FBcEI7QUFJSDtBQUNKOztBQUVEaEQsY0FBTWdELGFBQWFBLGFBQWE1RCxNQUFiLEdBQXNCLENBQW5DLENBQU47QUFDQSxZQUFJaEIsaUJBQWlCWSxRQUFRakIsT0FBUixDQUFnQk8sSUFBckM7QUFDQSxZQUFJRCx5QkFBeUJXLFFBQVFqQixPQUFSLENBQWdCUSxZQUE3QztBQUNBLGFBQUssSUFBSVcsSUFBSSxDQUFiLEVBQWdCQSxJQUFJK0Qsa0JBQWtCN0QsTUFBbEIsR0FBMkIsQ0FBL0MsRUFBa0RGLEdBQWxELEVBQXVEO0FBQ25EZCw2QkFBaUJBLGVBQWU2RSxrQkFBa0IvRCxDQUFsQixDQUFmLENBQWpCO0FBQ0FiLHFDQUF5QkEsdUJBQXVCNEUsa0JBQWtCL0QsQ0FBbEIsQ0FBdkIsQ0FBekI7QUFDSDtBQUNEO0FBQ0EsWUFBSWQsa0JBQW1CNEIsT0FBTzVCLGNBQTlCLEVBQStDLE9BQU9BLGVBQWU0QixHQUFmLENBQVA7O0FBRS9DO0FBQ0EsWUFBSTNCLDBCQUNDLFFBQU9BLHNCQUFQLHlDQUFPQSxzQkFBUCxPQUFrQyxRQURuQyxJQUVDMkIsT0FBTzNCLHNCQUZSLElBR0MwRSxnQkFBZ0IxRSx1QkFBdUIyQixHQUF2QixDQUhyQixDQUdrRDtBQUhsRCxVQUlFO0FBQ0U7QUFDQTNCLHVDQUF1QjJCLEdBQXZCLElBQThCdEMsUUFBUUUsR0FBUixDQUFZUyx1QkFBdUIyQixHQUF2QixDQUFaLEVBQXlDQSxHQUF6QyxFQUE4QztBQUN4RTVCLG9DQUFnQkEsY0FEd0Q7QUFFeEVDLDRDQUF3QkE7QUFGZ0QsaUJBQTlDLENBQTlCO0FBSUEsdUJBQU9BLHVCQUF1QjJCLEdBQXZCLENBQVA7QUFDSDtBQUNKLEtBcklVO0FBc0lYO0FBQ0FrRCxtQkFBZSx1QkFBU1gsU0FBVCxFQUFvQjtBQUMvQixZQUFJWSxlQUFlLEVBQW5CO0FBQ0EsYUFBSyxJQUFJakUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJcUQsVUFBVW5ELE1BQTlCLEVBQXNDRixHQUF0QyxFQUEyQztBQUN2QyxvQkFBUXFELFVBQVVyRCxDQUFWLENBQVI7QUFDSSxxQkFBSyxJQUFMO0FBQ0lpRSxpQ0FBYTVELEdBQWI7QUFDQTtBQUNKLHFCQUFLLEdBQUw7QUFDSTtBQUNKO0FBQ0k0RCxpQ0FBYTdELElBQWIsQ0FBa0JpRCxVQUFVckQsQ0FBVixDQUFsQjtBQVBSO0FBU0g7QUFDRCxlQUFPaUUsWUFBUDtBQUNILEtBckpVO0FBc0pYWCxzQkFBa0IsMEJBQVN2RSxJQUFULEVBQWU7QUFDN0IsWUFBSXdDLFFBQVF4QyxLQUFLMEMsS0FBTCxDQUFXLEtBQVgsQ0FBWjtBQUNBLFlBQUksQ0FBQ0YsTUFBTUEsTUFBTXJCLE1BQU4sR0FBZSxDQUFyQixDQUFMLEVBQThCcUIsUUFBUUEsTUFBTUwsS0FBTixDQUFZLENBQVosRUFBZSxDQUFDLENBQWhCLENBQVI7QUFDOUIsWUFBSSxDQUFDSyxNQUFNLENBQU4sQ0FBTCxFQUFlQSxRQUFRQSxNQUFNTCxLQUFOLENBQVksQ0FBWixDQUFSO0FBQ2YsZUFBT0ssS0FBUDtBQUNIO0FBM0pVLENBQWY7O0FBOEpBMkMsT0FBT0MsT0FBUCxHQUFpQjNGLE9BQWpCIiwiZmlsZSI6ImhhbmRsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBcbiAgICAjIyBIYW5kbGVyXG5cbiAgICDlpITnkIbmlbDmja7mqKHmnb/jgIJcbiAgICBcbiAgICAqIEhhbmRsZXIuZ2VuKCB0ZW1wbGF0ZSwgbmFtZT8sIGNvbnRleHQ/IClcblxuICAgICAgICDlhaXlj6Pmlrnms5XjgIJcblxuICAgICogRGF0YSBUZW1wbGF0ZSBEZWZpbml0aW9uLCBEVERcbiAgICAgICAgXG4gICAgICAgIOWkhOeQhuaVsOaNruaooeadv+WumuS5ieOAglxuXG4gICAgICAgICogSGFuZGxlci5hcnJheSggb3B0aW9ucyApXG4gICAgICAgICogSGFuZGxlci5vYmplY3QoIG9wdGlvbnMgKVxuICAgICAgICAqIEhhbmRsZXIubnVtYmVyKCBvcHRpb25zIClcbiAgICAgICAgKiBIYW5kbGVyLmJvb2xlYW4oIG9wdGlvbnMgKVxuICAgICAgICAqIEhhbmRsZXIuc3RyaW5nKCBvcHRpb25zIClcbiAgICAgICAgKiBIYW5kbGVyLmZ1bmN0aW9uKCBvcHRpb25zIClcbiAgICAgICAgKiBIYW5kbGVyLnJlZ2V4cCggb3B0aW9ucyApXG4gICAgICAgIFxuICAgICAgICDlpITnkIbot6/lvoTvvIjnm7jlr7nlkoznu53lr7nvvInjgIJcblxuICAgICAgICAqIEhhbmRsZXIuZ2V0VmFsdWVCeUtleVBhdGgoIGtleSwgb3B0aW9ucyApXG5cbiAgICAqIERhdGEgUGxhY2Vob2xkZXIgRGVmaW5pdGlvbiwgRFBEXG5cbiAgICAgICAg5aSE55CG5pWw5o2u5Y2g5L2N56ym5a6a5LmJXG5cbiAgICAgICAgKiBIYW5kbGVyLnBsYWNlaG9sZGVyKCBwbGFjZWhvbGRlciwgY29udGV4dCwgdGVtcGxhdGVDb250ZXh0LCBvcHRpb25zIClcblxuKi9cblxudmFyIENvbnN0YW50ID0gcmVxdWlyZSgnLi9jb25zdGFudCcpXG52YXIgVXRpbCA9IHJlcXVpcmUoJy4vdXRpbCcpXG52YXIgUGFyc2VyID0gcmVxdWlyZSgnLi9wYXJzZXInKVxudmFyIFJhbmRvbSA9IHJlcXVpcmUoJy4vcmFuZG9tLycpXG52YXIgUkUgPSByZXF1aXJlKCcuL3JlZ2V4cCcpXG5cbnZhciBIYW5kbGVyID0ge1xuICAgIGV4dGVuZDogVXRpbC5leHRlbmRcbn1cblxuLypcbiAgICB0ZW1wbGF0ZSAgICAgICAg5bGe5oCn5YC877yI5Y2z5pWw5o2u5qih5p2/77yJXG4gICAgbmFtZSAgICAgICAgICAgIOWxnuaAp+WQjVxuICAgIGNvbnRleHQgICAgICAgICDmlbDmja7kuIrkuIvmlofvvIznlJ/miJDlkI7nmoTmlbDmja5cbiAgICB0ZW1wbGF0ZUNvbnRleHQg5qih5p2/5LiK5LiL5paH77yMXG5cbiAgICBIYW5kbGUuZ2VuKHRlbXBsYXRlLCBuYW1lLCBvcHRpb25zKVxuICAgIGNvbnRleHRcbiAgICAgICAgY3VycmVudENvbnRleHQsIHRlbXBsYXRlQ3VycmVudENvbnRleHQsIFxuICAgICAgICBwYXRoLCB0ZW1wbGF0ZVBhdGhcbiAgICAgICAgcm9vdCwgdGVtcGxhdGVSb290XG4qL1xuSGFuZGxlci5nZW4gPSBmdW5jdGlvbih0ZW1wbGF0ZSwgbmFtZSwgY29udGV4dCkge1xuICAgIC8qIGpzaGludCAtVzA0MSAqL1xuICAgIG5hbWUgPSBuYW1lID09IHVuZGVmaW5lZCA/ICcnIDogKG5hbWUgKyAnJylcblxuICAgIGNvbnRleHQgPSBjb250ZXh0IHx8IHt9XG4gICAgY29udGV4dCA9IHtcbiAgICAgICAgICAgIC8vIOW9k+WJjeiuv+mXrui3r+W+hO+8jOWPquacieWxnuaAp+WQje+8jOS4jeWMheaLrOeUn+aIkOinhOWImVxuICAgICAgICAgICAgcGF0aDogY29udGV4dC5wYXRoIHx8IFtDb25zdGFudC5HVUlEXSxcbiAgICAgICAgICAgIHRlbXBsYXRlUGF0aDogY29udGV4dC50ZW1wbGF0ZVBhdGggfHwgW0NvbnN0YW50LkdVSUQrK10sXG4gICAgICAgICAgICAvLyDmnIDnu4jlsZ7mgKflgLznmoTkuIrkuIvmlodcbiAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiBjb250ZXh0LmN1cnJlbnRDb250ZXh0LFxuICAgICAgICAgICAgLy8g5bGe5oCn5YC85qih5p2/55qE5LiK5LiL5paHXG4gICAgICAgICAgICB0ZW1wbGF0ZUN1cnJlbnRDb250ZXh0OiBjb250ZXh0LnRlbXBsYXRlQ3VycmVudENvbnRleHQgfHwgdGVtcGxhdGUsXG4gICAgICAgICAgICAvLyDmnIDnu4jlgLznmoTmoLlcbiAgICAgICAgICAgIHJvb3Q6IGNvbnRleHQucm9vdCB8fCBjb250ZXh0LmN1cnJlbnRDb250ZXh0LFxuICAgICAgICAgICAgLy8g5qih5p2/55qE5qC5XG4gICAgICAgICAgICB0ZW1wbGF0ZVJvb3Q6IGNvbnRleHQudGVtcGxhdGVSb290IHx8IGNvbnRleHQudGVtcGxhdGVDdXJyZW50Q29udGV4dCB8fCB0ZW1wbGF0ZVxuICAgICAgICB9XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdwYXRoOicsIGNvbnRleHQucGF0aC5qb2luKCcuJyksIHRlbXBsYXRlKVxuXG4gICAgdmFyIHJ1bGUgPSBQYXJzZXIucGFyc2UobmFtZSlcbiAgICB2YXIgdHlwZSA9IFV0aWwudHlwZSh0ZW1wbGF0ZSlcbiAgICB2YXIgZGF0YVxuXG4gICAgaWYgKEhhbmRsZXJbdHlwZV0pIHtcbiAgICAgICAgZGF0YSA9IEhhbmRsZXJbdHlwZV0oe1xuICAgICAgICAgICAgLy8g5bGe5oCn5YC857G75Z6LXG4gICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgLy8g5bGe5oCn5YC85qih5p2/XG4gICAgICAgICAgICB0ZW1wbGF0ZTogdGVtcGxhdGUsXG4gICAgICAgICAgICAvLyDlsZ7mgKflkI0gKyDnlJ/miJDop4TliJlcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICAvLyDlsZ7mgKflkI1cbiAgICAgICAgICAgIHBhcnNlZE5hbWU6IG5hbWUgPyBuYW1lLnJlcGxhY2UoQ29uc3RhbnQuUkVfS0VZLCAnJDEnKSA6IG5hbWUsXG5cbiAgICAgICAgICAgIC8vIOino+aekOWQjueahOeUn+aIkOinhOWImVxuICAgICAgICAgICAgcnVsZTogcnVsZSxcbiAgICAgICAgICAgIC8vIOebuOWFs+S4iuS4i+aWh1xuICAgICAgICAgICAgY29udGV4dDogY29udGV4dFxuICAgICAgICB9KVxuXG4gICAgICAgIGlmICghY29udGV4dC5yb290KSBjb250ZXh0LnJvb3QgPSBkYXRhXG4gICAgICAgIHJldHVybiBkYXRhXG4gICAgfVxuXG4gICAgcmV0dXJuIHRlbXBsYXRlXG59XG5cbkhhbmRsZXIuZXh0ZW5kKHtcbiAgICBhcnJheTogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW10sXG4gICAgICAgICAgICBpLCBpaTtcblxuICAgICAgICAvLyAnbmFtZXwxJzogW11cbiAgICAgICAgLy8gJ25hbWV8Y291bnQnOiBbXVxuICAgICAgICAvLyAnbmFtZXxtaW4tbWF4JzogW11cbiAgICAgICAgaWYgKG9wdGlvbnMudGVtcGxhdGUubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzdWx0XG5cbiAgICAgICAgLy8gJ2Fycic6IFt7ICdlbWFpbCc6ICdARU1BSUwnIH0sIHsgJ2VtYWlsJzogJ0BFTUFJTCcgfV1cbiAgICAgICAgaWYgKCFvcHRpb25zLnJ1bGUucGFyYW1ldGVycykge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMudGVtcGxhdGUubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wdXNoKGkpXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgICAgIEhhbmRsZXIuZ2VuKG9wdGlvbnMudGVtcGxhdGVbaV0sIGksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVQYXRoOiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgICAgICByb290OiBvcHRpb25zLmNvbnRleHQucm9vdCB8fCByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVJvb3Q6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVJvb3QgfHwgb3B0aW9ucy50ZW1wbGF0ZVxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKVxuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucG9wKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICdtZXRob2R8MSc6IFsnR0VUJywgJ1BPU1QnLCAnSEVBRCcsICdERUxFVEUnXVxuICAgICAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5taW4gPT09IDEgJiYgb3B0aW9ucy5ydWxlLm1heCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gZml4ICMxN1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnB1c2gob3B0aW9ucy5uYW1lKVxuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucHVzaChvcHRpb25zLm5hbWUpXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gUmFuZG9tLnBpY2soXG4gICAgICAgICAgICAgICAgICAgIEhhbmRsZXIuZ2VuKG9wdGlvbnMudGVtcGxhdGUsIHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3Q6IG9wdGlvbnMuY29udGV4dC5yb290IHx8IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUm9vdDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUm9vdCB8fCBvcHRpb25zLnRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wb3AoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAnZGF0YXwrMSc6IFt7fSwge31dXG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5wYXJhbWV0ZXJzWzJdKSB7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGUuX19vcmRlcl9pbmRleCA9IG9wdGlvbnMudGVtcGxhdGUuX19vcmRlcl9pbmRleCB8fCAwXG5cbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChvcHRpb25zLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgucHVzaChvcHRpb25zLm5hbWUpXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IEhhbmRsZXIuZ2VuKG9wdGlvbnMudGVtcGxhdGUsIHVuZGVmaW5lZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvb3Q6IG9wdGlvbnMuY29udGV4dC5yb290IHx8IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUm9vdDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUm9vdCB8fCBvcHRpb25zLnRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgIH0pW1xuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZS5fX29yZGVyX2luZGV4ICUgb3B0aW9ucy50ZW1wbGF0ZS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgXVxuXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMudGVtcGxhdGUuX19vcmRlcl9pbmRleCArPSArb3B0aW9ucy5ydWxlLnBhcmFtZXRlcnNbMl1cblxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wb3AoKVxuICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVQYXRoLnBvcCgpXG5cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAnZGF0YXwxLTEwJzogW3t9XVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgb3B0aW9ucy5ydWxlLmNvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICdkYXRhfDEtMTAnOiBbe30sIHt9XVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpaSA9IDA7IGlpIDwgb3B0aW9ucy50ZW1wbGF0ZS5sZW5ndGg7IGlpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zLmNvbnRleHQucGF0aC5wdXNoKHJlc3VsdC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wdXNoKGlpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBIYW5kbGVyLmdlbihvcHRpb25zLnRlbXBsYXRlW2lpXSwgcmVzdWx0Lmxlbmd0aCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogb3B0aW9ucy5jb250ZXh0LnBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Q29udGV4dDogcmVzdWx0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogb3B0aW9ucy50ZW1wbGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvb3Q6IG9wdGlvbnMuY29udGV4dC5yb290IHx8IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUm9vdDogb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUm9vdCB8fCBvcHRpb25zLnRlbXBsYXRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wb3AoKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9LFxuICAgIG9iamVjdDogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge30sXG4gICAgICAgICAgICBrZXlzLCBmbktleXMsIGtleSwgcGFyc2VkS2V5LCBpbmMsIGk7XG5cbiAgICAgICAgLy8gJ29ianxtaW4tbWF4Jzoge31cbiAgICAgICAgLyoganNoaW50IC1XMDQxICovXG4gICAgICAgIGlmIChvcHRpb25zLnJ1bGUubWluICE9IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAga2V5cyA9IFV0aWwua2V5cyhvcHRpb25zLnRlbXBsYXRlKVxuICAgICAgICAgICAga2V5cyA9IFJhbmRvbS5zaHVmZmxlKGtleXMpXG4gICAgICAgICAgICBrZXlzID0ga2V5cy5zbGljZSgwLCBvcHRpb25zLnJ1bGUuY291bnQpXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGtleSA9IGtleXNbaV1cbiAgICAgICAgICAgICAgICBwYXJzZWRLZXkgPSBrZXkucmVwbGFjZShDb25zdGFudC5SRV9LRVksICckMScpXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChwYXJzZWRLZXkpXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wdXNoKGtleSlcbiAgICAgICAgICAgICAgICByZXN1bHRbcGFyc2VkS2V5XSA9IEhhbmRsZXIuZ2VuKG9wdGlvbnMudGVtcGxhdGVba2V5XSwga2V5LCB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgIHJvb3Q6IG9wdGlvbnMuY29udGV4dC5yb290IHx8IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSb290OiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVSb290IHx8IG9wdGlvbnMudGVtcGxhdGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wb3AoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAnb2JqJzoge31cbiAgICAgICAgICAgIGtleXMgPSBbXVxuICAgICAgICAgICAgZm5LZXlzID0gW10gLy8gIzI1IOaUueWPmOS6humdnuWHveaVsOWxnuaAp+eahOmhuuW6j++8jOafpeaJvui1t+adpeS4jeaWueS+v1xuICAgICAgICAgICAgZm9yIChrZXkgaW4gb3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgICh0eXBlb2Ygb3B0aW9ucy50ZW1wbGF0ZVtrZXldID09PSAnZnVuY3Rpb24nID8gZm5LZXlzIDoga2V5cykucHVzaChrZXkpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBrZXlzID0ga2V5cy5jb25jYXQoZm5LZXlzKVxuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIOS8muaUueWPmOmdnuWHveaVsOWxnuaAp+eahOmhuuW6j1xuICAgICAgICAgICAgICAgIGtleXMgPSBVdGlsLmtleXMob3B0aW9ucy50ZW1wbGF0ZSlcbiAgICAgICAgICAgICAgICBrZXlzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYWZuID0gdHlwZW9mIG9wdGlvbnMudGVtcGxhdGVbYV0gPT09ICdmdW5jdGlvbidcbiAgICAgICAgICAgICAgICAgICAgdmFyIGJmbiA9IHR5cGVvZiBvcHRpb25zLnRlbXBsYXRlW2JdID09PSAnZnVuY3Rpb24nXG4gICAgICAgICAgICAgICAgICAgIGlmIChhZm4gPT09IGJmbikgcmV0dXJuIDBcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFmbiAmJiAhYmZuKSByZXR1cm4gMVxuICAgICAgICAgICAgICAgICAgICBpZiAoIWFmbiAmJiBiZm4pIHJldHVybiAtMVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAqL1xuXG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGtleSA9IGtleXNbaV1cbiAgICAgICAgICAgICAgICBwYXJzZWRLZXkgPSBrZXkucmVwbGFjZShDb25zdGFudC5SRV9LRVksICckMScpXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnBhdGgucHVzaChwYXJzZWRLZXkpXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wdXNoKGtleSlcbiAgICAgICAgICAgICAgICByZXN1bHRbcGFyc2VkS2V5XSA9IEhhbmRsZXIuZ2VuKG9wdGlvbnMudGVtcGxhdGVba2V5XSwga2V5LCB7XG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IG9wdGlvbnMuY29udGV4dC5wYXRoLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVBhdGg6IG9wdGlvbnMuY29udGV4dC50ZW1wbGF0ZVBhdGgsXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiByZXN1bHQsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IG9wdGlvbnMudGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgIHJvb3Q6IG9wdGlvbnMuY29udGV4dC5yb290IHx8IHJlc3VsdCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVSb290OiBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVSb290IHx8IG9wdGlvbnMudGVtcGxhdGVcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIG9wdGlvbnMuY29udGV4dC5wYXRoLnBvcCgpXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlUGF0aC5wb3AoKVxuICAgICAgICAgICAgICAgICAgICAvLyAnaWR8KzEnOiAxXG4gICAgICAgICAgICAgICAgaW5jID0ga2V5Lm1hdGNoKENvbnN0YW50LlJFX0tFWSlcbiAgICAgICAgICAgICAgICBpZiAoaW5jICYmIGluY1syXSAmJiBVdGlsLnR5cGUob3B0aW9ucy50ZW1wbGF0ZVtrZXldKSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgb3B0aW9ucy50ZW1wbGF0ZVtrZXldICs9IHBhcnNlSW50KGluY1syXSwgMTApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9LFxuICAgIG51bWJlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICB2YXIgcmVzdWx0LCBwYXJ0cztcbiAgICAgICAgaWYgKG9wdGlvbnMucnVsZS5kZWNpbWFsKSB7IC8vIGZsb2F0XG4gICAgICAgICAgICBvcHRpb25zLnRlbXBsYXRlICs9ICcnXG4gICAgICAgICAgICBwYXJ0cyA9IG9wdGlvbnMudGVtcGxhdGUuc3BsaXQoJy4nKVxuICAgICAgICAgICAgICAgIC8vICdmbG9hdDF8LjEtMTAnOiAxMCxcbiAgICAgICAgICAgICAgICAvLyAnZmxvYXQyfDEtMTAwLjEtMTAnOiAxLFxuICAgICAgICAgICAgICAgIC8vICdmbG9hdDN8OTk5LjEtMTAnOiAxLFxuICAgICAgICAgICAgICAgIC8vICdmbG9hdDR8LjMtMTAnOiAxMjMuMTIzLFxuICAgICAgICAgICAgcGFydHNbMF0gPSBvcHRpb25zLnJ1bGUucmFuZ2UgPyBvcHRpb25zLnJ1bGUuY291bnQgOiBwYXJ0c1swXVxuICAgICAgICAgICAgcGFydHNbMV0gPSAocGFydHNbMV0gfHwgJycpLnNsaWNlKDAsIG9wdGlvbnMucnVsZS5kY291bnQpXG4gICAgICAgICAgICB3aGlsZSAocGFydHNbMV0ubGVuZ3RoIDwgb3B0aW9ucy5ydWxlLmRjb3VudCkge1xuICAgICAgICAgICAgICAgIHBhcnRzWzFdICs9IChcbiAgICAgICAgICAgICAgICAgICAgLy8g5pyA5ZCO5LiA5L2N5LiN6IO95Li6IDDvvJrlpoLmnpzmnIDlkI7kuIDkvY3kuLogMO+8jOS8muiiqyBKUyDlvJXmk47lv73nlaXmjonjgIJcbiAgICAgICAgICAgICAgICAgICAgKHBhcnRzWzFdLmxlbmd0aCA8IG9wdGlvbnMucnVsZS5kY291bnQgLSAxKSA/IFJhbmRvbS5jaGFyYWN0ZXIoJ251bWJlcicpIDogUmFuZG9tLmNoYXJhY3RlcignMTIzNDU2Nzg5JylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXN1bHQgPSBwYXJzZUZsb2F0KHBhcnRzLmpvaW4oJy4nKSwgMTApXG4gICAgICAgIH0gZWxzZSB7IC8vIGludGVnZXJcbiAgICAgICAgICAgIC8vICdncmFkZTF8MS0xMDAnOiAxLFxuICAgICAgICAgICAgcmVzdWx0ID0gb3B0aW9ucy5ydWxlLnJhbmdlICYmICFvcHRpb25zLnJ1bGUucGFyYW1ldGVyc1syXSA/IG9wdGlvbnMucnVsZS5jb3VudCA6IG9wdGlvbnMudGVtcGxhdGVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICBib29sZWFuOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgIC8vICdwcm9wfG11bHRpcGxlJzogZmFsc2UsIOW9k+WJjeWAvOaYr+ebuOWPjeWAvOeahOamgueOh+WAjeaVsFxuICAgICAgICAvLyAncHJvcHxwcm9iYWJpbGl0eS1wcm9iYWJpbGl0eSc6IGZhbHNlLCDlvZPliY3lgLzkuI7nm7jlj43lgLznmoTmpoLnjodcbiAgICAgICAgcmVzdWx0ID0gb3B0aW9ucy5ydWxlLnBhcmFtZXRlcnMgPyBSYW5kb20uYm9vbChvcHRpb25zLnJ1bGUubWluLCBvcHRpb25zLnJ1bGUubWF4LCBvcHRpb25zLnRlbXBsYXRlKSA6IG9wdGlvbnMudGVtcGxhdGVcbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sXG4gICAgc3RyaW5nOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSAnJyxcbiAgICAgICAgICAgIGksIHBsYWNlaG9sZGVycywgcGgsIHBoZWQ7XG4gICAgICAgIGlmIChvcHRpb25zLnRlbXBsYXRlLmxlbmd0aCkge1xuXG4gICAgICAgICAgICAvLyAgJ2Zvbyc6ICfimIUnLFxuICAgICAgICAgICAgLyoganNoaW50IC1XMDQxICovXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5ydWxlLmNvdW50ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBvcHRpb25zLnRlbXBsYXRlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vICdzdGFyfDEtNSc6ICfimIUnLFxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IG9wdGlvbnMucnVsZS5jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ICs9IG9wdGlvbnMudGVtcGxhdGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICdlbWFpbHwxLTEwJzogJ0BFTUFJTCwgJyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVycyA9IHJlc3VsdC5tYXRjaChDb25zdGFudC5SRV9QTEFDRUhPTERFUikgfHwgW10gLy8gQS1aXzAtOSA+IFxcd19cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwbGFjZWhvbGRlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBwaCA9IHBsYWNlaG9sZGVyc1tpXVxuXG4gICAgICAgICAgICAgICAgLy8g6YGH5Yiw6L2s5LmJ5pac5p2g77yM5LiN6ZyA6KaB6Kej5p6Q5Y2g5L2N56ymXG4gICAgICAgICAgICAgICAgaWYgKC9eXFxcXC8udGVzdChwaCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXJzLnNwbGljZShpLS0sIDEpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcGhlZCA9IEhhbmRsZXIucGxhY2Vob2xkZXIocGgsIG9wdGlvbnMuY29udGV4dC5jdXJyZW50Q29udGV4dCwgb3B0aW9ucy5jb250ZXh0LnRlbXBsYXRlQ3VycmVudENvbnRleHQsIG9wdGlvbnMpXG5cbiAgICAgICAgICAgICAgICAvLyDlj6rmnInkuIDkuKrljaDkvY3nrKbvvIzlubbkuJTmsqHmnInlhbbku5blrZfnrKZcbiAgICAgICAgICAgICAgICBpZiAocGxhY2Vob2xkZXJzLmxlbmd0aCA9PT0gMSAmJiBwaCA9PT0gcmVzdWx0ICYmIHR5cGVvZiBwaGVkICE9PSB0eXBlb2YgcmVzdWx0KSB7IC8vIFxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBwaGVkXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKFV0aWwuaXNOdW1lcmljKHBoZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBwYXJzZUZsb2F0KHBoZWQsIDEwKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoL14odHJ1ZXxmYWxzZSkkLy50ZXN0KHBoZWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBwaGVkID09PSAndHJ1ZScgPyB0cnVlIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaGVkID09PSAnZmFsc2UnID8gZmFsc2UgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBoZWQgLy8g5bey57uP5piv5biD5bCU5YC8XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKHBoLCBwaGVkKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAnQVNDSUl8MS0xMCc6ICcnLFxuICAgICAgICAgICAgLy8gJ0FTQ0lJJzogJycsXG4gICAgICAgICAgICByZXN1bHQgPSBvcHRpb25zLnJ1bGUucmFuZ2UgPyBSYW5kb20uc3RyaW5nKG9wdGlvbnMucnVsZS5jb3VudCkgOiBvcHRpb25zLnRlbXBsYXRlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH0sXG4gICAgJ2Z1bmN0aW9uJzogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAvLyAoIGNvbnRleHQsIG9wdGlvbnMgKVxuICAgICAgICByZXR1cm4gb3B0aW9ucy50ZW1wbGF0ZS5jYWxsKG9wdGlvbnMuY29udGV4dC5jdXJyZW50Q29udGV4dCwgb3B0aW9ucylcbiAgICB9LFxuICAgICdyZWdleHAnOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgIHZhciBzb3VyY2UgPSAnJ1xuXG4gICAgICAgIC8vICduYW1lJzogL3JlZ2V4cC8sXG4gICAgICAgIC8qIGpzaGludCAtVzA0MSAqL1xuICAgICAgICBpZiAob3B0aW9ucy5ydWxlLmNvdW50ID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc291cmNlICs9IG9wdGlvbnMudGVtcGxhdGUuc291cmNlIC8vIHJlZ2V4cC5zb3VyY2VcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICduYW1lfDEtNSc6IC9yZWdleHAvLFxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9wdGlvbnMucnVsZS5jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICBzb3VyY2UgKz0gb3B0aW9ucy50ZW1wbGF0ZS5zb3VyY2VcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSRS5IYW5kbGVyLmdlbihcbiAgICAgICAgICAgIFJFLlBhcnNlci5wYXJzZShcbiAgICAgICAgICAgICAgICBzb3VyY2VcbiAgICAgICAgICAgIClcbiAgICAgICAgKVxuICAgIH1cbn0pXG5cbkhhbmRsZXIuZXh0ZW5kKHtcbiAgICBfYWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlID0ge307XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBSYW5kb20pIHJlW2tleS50b0xvd2VyQ2FzZSgpXSA9IGtleVxuICAgICAgICByZXR1cm4gcmVcbiAgICB9LFxuICAgIC8vIOWkhOeQhuWNoOS9jeespu+8jOi9rOaNouS4uuacgOe7iOWAvFxuICAgIHBsYWNlaG9sZGVyOiBmdW5jdGlvbihwbGFjZWhvbGRlciwgb2JqLCB0ZW1wbGF0ZUNvbnRleHQsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2cob3B0aW9ucy5jb250ZXh0LnBhdGgpXG4gICAgICAgIC8vIDEga2V5LCAyIHBhcmFtc1xuICAgICAgICBDb25zdGFudC5SRV9QTEFDRUhPTERFUi5leGVjKCcnKVxuICAgICAgICB2YXIgcGFydHMgPSBDb25zdGFudC5SRV9QTEFDRUhPTERFUi5leGVjKHBsYWNlaG9sZGVyKSxcbiAgICAgICAgICAgIGtleSA9IHBhcnRzICYmIHBhcnRzWzFdLFxuICAgICAgICAgICAgbGtleSA9IGtleSAmJiBrZXkudG9Mb3dlckNhc2UoKSxcbiAgICAgICAgICAgIG9rZXkgPSB0aGlzLl9hbGwoKVtsa2V5XSxcbiAgICAgICAgICAgIHBhcmFtcyA9IHBhcnRzICYmIHBhcnRzWzJdIHx8ICcnXG4gICAgICAgIHZhciBwYXRoUGFydHMgPSB0aGlzLnNwbGl0UGF0aFRvQXJyYXkoa2V5KVxuXG4gICAgICAgIC8vIOino+aekOWNoOS9jeespueahOWPguaVsFxuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gMS4g5bCd6K+V5L+d5oyB5Y+C5pWw55qE57G75Z6LXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICMyNCBbV2luZG93IEZpcmVmb3ggMzAuMCDlvJXnlKgg5Y2g5L2N56ymIOaKm+mUmV0oaHR0cHM6Ly9naXRodWIuY29tL251eXNvZnQvTW9jay9pc3N1ZXMvMjQpXG4gICAgICAgICAgICAgICAgW0JYOTA1Njog5ZCE5rWP6KeI5Zmo5LiLIHdpbmRvdy5ldmFsIOaWueazleeahOaJp+ihjOS4iuS4i+aWh+WtmOWcqOW3ruW8gl0oaHR0cDovL3d3dy53M2hlbHAub3JnL3poLWNuL2NhdXNlcy9CWDkwNTYpXG4gICAgICAgICAgICAgICAg5bqU6K+l5bGe5LqOIFdpbmRvdyBGaXJlZm94IDMwLjAg55qEIEJVR1xuICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIC8qIGpzaGludCAtVzA2MSAqL1xuICAgICAgICAgICAgcGFyYW1zID0gZXZhbCgnKGZ1bmN0aW9uKCl7IHJldHVybiBbXS5zcGxpY2UuY2FsbChhcmd1bWVudHMsIDAgKSB9KSgnICsgcGFyYW1zICsgJyknKVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gMi4g5aaC5p6c5aSx6LSl77yM5Y+q6IO96Kej5p6Q5Li65a2X56ym5LiyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKGVycm9yKVxuICAgICAgICAgICAgLy8gaWYgKGVycm9yIGluc3RhbmNlb2YgUmVmZXJlbmNlRXJyb3IpIHBhcmFtcyA9IHBhcnRzWzJdLnNwbGl0KC8sXFxzKi8pO1xuICAgICAgICAgICAgLy8gZWxzZSB0aHJvdyBlcnJvclxuICAgICAgICAgICAgcGFyYW1zID0gcGFydHNbMl0uc3BsaXQoLyxcXHMqLylcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIOWNoOS9jeespuS8mOWFiOW8leeUqOaVsOaNruaooeadv+S4reeahOWxnuaAp1xuICAgICAgICBpZiAob2JqICYmIChrZXkgaW4gb2JqKSkgcmV0dXJuIG9ialtrZXldXG5cbiAgICAgICAgLy8gQGluZGV4IEBrZXlcbiAgICAgICAgLy8gaWYgKENvbnN0YW50LlJFX0lOREVYLnRlc3Qoa2V5KSkgcmV0dXJuICtvcHRpb25zLm5hbWVcbiAgICAgICAgLy8gaWYgKENvbnN0YW50LlJFX0tFWS50ZXN0KGtleSkpIHJldHVybiBvcHRpb25zLm5hbWVcblxuICAgICAgICAvLyDnu53lr7not6/lvoQgb3Ig55u45a+56Lev5b6EXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGtleS5jaGFyQXQoMCkgPT09ICcvJyB8fFxuICAgICAgICAgICAgcGF0aFBhcnRzLmxlbmd0aCA+IDFcbiAgICAgICAgKSByZXR1cm4gdGhpcy5nZXRWYWx1ZUJ5S2V5UGF0aChrZXksIG9wdGlvbnMpXG5cbiAgICAgICAgLy8g6YCS5b2S5byV55So5pWw5o2u5qih5p2/5Lit55qE5bGe5oCnXG4gICAgICAgIGlmICh0ZW1wbGF0ZUNvbnRleHQgJiZcbiAgICAgICAgICAgICh0eXBlb2YgdGVtcGxhdGVDb250ZXh0ID09PSAnb2JqZWN0JykgJiZcbiAgICAgICAgICAgIChrZXkgaW4gdGVtcGxhdGVDb250ZXh0KSAmJlxuICAgICAgICAgICAgKHBsYWNlaG9sZGVyICE9PSB0ZW1wbGF0ZUNvbnRleHRba2V5XSkgLy8gZml4ICMxNSDpgb/lhY3oh6rlt7Hkvp3otZboh6rlt7FcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyDlhYjorqHnrpfooqvlvJXnlKjnmoTlsZ7mgKflgLxcbiAgICAgICAgICAgIHRlbXBsYXRlQ29udGV4dFtrZXldID0gSGFuZGxlci5nZW4odGVtcGxhdGVDb250ZXh0W2tleV0sIGtleSwge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRDb250ZXh0OiBvYmosXG4gICAgICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dDogdGVtcGxhdGVDb250ZXh0XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgcmV0dXJuIHRlbXBsYXRlQ29udGV4dFtrZXldXG4gICAgICAgIH1cblxuICAgICAgICAvLyDlpoLmnpzmnKrmib7liLDvvIzliJnljp/moLfov5Tlm55cbiAgICAgICAgaWYgKCEoa2V5IGluIFJhbmRvbSkgJiYgIShsa2V5IGluIFJhbmRvbSkgJiYgIShva2V5IGluIFJhbmRvbSkpIHJldHVybiBwbGFjZWhvbGRlclxuXG4gICAgICAgIC8vIOmAkuW9kuino+aekOWPguaVsOS4reeahOWNoOS9jeesplxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcmFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgQ29uc3RhbnQuUkVfUExBQ0VIT0xERVIuZXhlYygnJylcbiAgICAgICAgICAgIGlmIChDb25zdGFudC5SRV9QTEFDRUhPTERFUi50ZXN0KHBhcmFtc1tpXSkpIHtcbiAgICAgICAgICAgICAgICBwYXJhbXNbaV0gPSBIYW5kbGVyLnBsYWNlaG9sZGVyKHBhcmFtc1tpXSwgb2JqLCB0ZW1wbGF0ZUNvbnRleHQsIG9wdGlvbnMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaGFuZGxlID0gUmFuZG9tW2tleV0gfHwgUmFuZG9tW2xrZXldIHx8IFJhbmRvbVtva2V5XVxuICAgICAgICBzd2l0Y2ggKFV0aWwudHlwZShoYW5kbGUpKSB7XG4gICAgICAgICAgICBjYXNlICdhcnJheSc6XG4gICAgICAgICAgICAgICAgLy8g6Ieq5Yqo5LuO5pWw57uE5Lit5Y+W5LiA5Liq77yM5L6L5aaCIEBhcmVhc1xuICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20ucGljayhoYW5kbGUpXG4gICAgICAgICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgICAgICAgICAgLy8g5omn6KGM5Y2g5L2N56ym5pa55rOV77yI5aSn5aSa5pWw5oOF5Ya177yJXG4gICAgICAgICAgICAgICAgaGFuZGxlLm9wdGlvbnMgPSBvcHRpb25zXG4gICAgICAgICAgICAgICAgdmFyIHJlID0gaGFuZGxlLmFwcGx5KFJhbmRvbSwgcGFyYW1zKVxuICAgICAgICAgICAgICAgIGlmIChyZSA9PT0gdW5kZWZpbmVkKSByZSA9ICcnIC8vIOWboOS4uuaYr+WcqOWtl+espuS4suS4re+8jOaJgOS7pem7mOiupOS4uuepuuWtl+espuS4suOAglxuICAgICAgICAgICAgICAgIGRlbGV0ZSBoYW5kbGUub3B0aW9uc1xuICAgICAgICAgICAgICAgIHJldHVybiByZVxuICAgICAgICB9XG4gICAgfSxcbiAgICBnZXRWYWx1ZUJ5S2V5UGF0aDogZnVuY3Rpb24oa2V5LCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBvcmlnaW5hbEtleSA9IGtleVxuICAgICAgICB2YXIga2V5UGF0aFBhcnRzID0gdGhpcy5zcGxpdFBhdGhUb0FycmF5KGtleSlcbiAgICAgICAgdmFyIGFic29sdXRlUGF0aFBhcnRzID0gW11cblxuICAgICAgICAvLyDnu53lr7not6/lvoRcbiAgICAgICAgaWYgKGtleS5jaGFyQXQoMCkgPT09ICcvJykge1xuICAgICAgICAgICAgYWJzb2x1dGVQYXRoUGFydHMgPSBbb3B0aW9ucy5jb250ZXh0LnBhdGhbMF1dLmNvbmNhdChcbiAgICAgICAgICAgICAgICB0aGlzLm5vcm1hbGl6ZVBhdGgoa2V5UGF0aFBhcnRzKVxuICAgICAgICAgICAgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8g55u45a+56Lev5b6EXG4gICAgICAgICAgICBpZiAoa2V5UGF0aFBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBhYnNvbHV0ZVBhdGhQYXJ0cyA9IG9wdGlvbnMuY29udGV4dC5wYXRoLnNsaWNlKDApXG4gICAgICAgICAgICAgICAgYWJzb2x1dGVQYXRoUGFydHMucG9wKClcbiAgICAgICAgICAgICAgICBhYnNvbHV0ZVBhdGhQYXJ0cyA9IHRoaXMubm9ybWFsaXplUGF0aChcbiAgICAgICAgICAgICAgICAgICAgYWJzb2x1dGVQYXRoUGFydHMuY29uY2F0KGtleVBhdGhQYXJ0cylcbiAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleSA9IGtleVBhdGhQYXJ0c1trZXlQYXRoUGFydHMubGVuZ3RoIC0gMV1cbiAgICAgICAgdmFyIGN1cnJlbnRDb250ZXh0ID0gb3B0aW9ucy5jb250ZXh0LnJvb3RcbiAgICAgICAgdmFyIHRlbXBsYXRlQ3VycmVudENvbnRleHQgPSBvcHRpb25zLmNvbnRleHQudGVtcGxhdGVSb290XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYWJzb2x1dGVQYXRoUGFydHMubGVuZ3RoIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICBjdXJyZW50Q29udGV4dCA9IGN1cnJlbnRDb250ZXh0W2Fic29sdXRlUGF0aFBhcnRzW2ldXVxuICAgICAgICAgICAgdGVtcGxhdGVDdXJyZW50Q29udGV4dCA9IHRlbXBsYXRlQ3VycmVudENvbnRleHRbYWJzb2x1dGVQYXRoUGFydHNbaV1dXG4gICAgICAgIH1cbiAgICAgICAgLy8g5byV55So55qE5YC85bey57uP6K6h566X5aW9XG4gICAgICAgIGlmIChjdXJyZW50Q29udGV4dCAmJiAoa2V5IGluIGN1cnJlbnRDb250ZXh0KSkgcmV0dXJuIGN1cnJlbnRDb250ZXh0W2tleV1cblxuICAgICAgICAvLyDlsJrmnKrorqHnrpfvvIzpgJLlvZLlvJXnlKjmlbDmja7mqKHmnb/kuK3nmoTlsZ7mgKdcbiAgICAgICAgaWYgKHRlbXBsYXRlQ3VycmVudENvbnRleHQgJiZcbiAgICAgICAgICAgICh0eXBlb2YgdGVtcGxhdGVDdXJyZW50Q29udGV4dCA9PT0gJ29iamVjdCcpICYmXG4gICAgICAgICAgICAoa2V5IGluIHRlbXBsYXRlQ3VycmVudENvbnRleHQpICYmXG4gICAgICAgICAgICAob3JpZ2luYWxLZXkgIT09IHRlbXBsYXRlQ3VycmVudENvbnRleHRba2V5XSkgLy8gZml4ICMxNSDpgb/lhY3oh6rlt7Hkvp3otZboh6rlt7FcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyDlhYjorqHnrpfooqvlvJXnlKjnmoTlsZ7mgKflgLxcbiAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHRba2V5XSA9IEhhbmRsZXIuZ2VuKHRlbXBsYXRlQ3VycmVudENvbnRleHRba2V5XSwga2V5LCB7XG4gICAgICAgICAgICAgICAgY3VycmVudENvbnRleHQ6IGN1cnJlbnRDb250ZXh0LFxuICAgICAgICAgICAgICAgIHRlbXBsYXRlQ3VycmVudENvbnRleHQ6IHRlbXBsYXRlQ3VycmVudENvbnRleHRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICByZXR1cm4gdGVtcGxhdGVDdXJyZW50Q29udGV4dFtrZXldXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9raXNzeXRlYW0va2lzc3kvYmxvYi9tYXN0ZXIvc3JjL3BhdGgvc3JjL3BhdGguanNcbiAgICBub3JtYWxpemVQYXRoOiBmdW5jdGlvbihwYXRoUGFydHMpIHtcbiAgICAgICAgdmFyIG5ld1BhdGhQYXJ0cyA9IFtdXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0aFBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKHBhdGhQYXJ0c1tpXSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJy4uJzpcbiAgICAgICAgICAgICAgICAgICAgbmV3UGF0aFBhcnRzLnBvcCgpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgY2FzZSAnLic6XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgbmV3UGF0aFBhcnRzLnB1c2gocGF0aFBhcnRzW2ldKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdQYXRoUGFydHNcbiAgICB9LFxuICAgIHNwbGl0UGF0aFRvQXJyYXk6IGZ1bmN0aW9uKHBhdGgpIHtcbiAgICAgICAgdmFyIHBhcnRzID0gcGF0aC5zcGxpdCgvXFwvKy8pO1xuICAgICAgICBpZiAoIXBhcnRzW3BhcnRzLmxlbmd0aCAtIDFdKSBwYXJ0cyA9IHBhcnRzLnNsaWNlKDAsIC0xKVxuICAgICAgICBpZiAoIXBhcnRzWzBdKSBwYXJ0cyA9IHBhcnRzLnNsaWNlKDEpXG4gICAgICAgIHJldHVybiBwYXJ0cztcbiAgICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhhbmRsZXIiXX0=