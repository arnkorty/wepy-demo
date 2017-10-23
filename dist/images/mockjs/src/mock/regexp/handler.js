'use strict';

/*
    ## RegExp Handler

    https://github.com/ForbesLindesay/regexp
    https://github.com/dmajda/pegjs
    http://www.regexper.com/

    每个节点的结构
        {
            type: '',
            offset: number,
            text: '',
            body: {},
            escaped: true/false
        }

    type 可选值
        alternate             |         选择
        match                 匹配
        capture-group         ()        捕获组
        non-capture-group     (?:...)   非捕获组
        positive-lookahead    (?=p)     零宽正向先行断言
        negative-lookahead    (?!p)     零宽负向先行断言
        quantified            a*        重复节点
        quantifier            *         量词
        charset               []        字符集
        range                 {m, n}    范围
        literal               a         直接量字符
        unicode               \uxxxx    Unicode
        hex                   \x        十六进制
        octal                 八进制
        back-reference        \n        反向引用
        control-character     \cX       控制字符

        // Token
        start               ^       开头
        end                 $       结尾
        any-character       .       任意字符
        backspace           [\b]    退格直接量
        word-boundary       \b      单词边界
        non-word-boundary   \B      非单词边界
        digit               \d      ASCII 数字，[0-9]
        non-digit           \D      非 ASCII 数字，[^0-9]
        form-feed           \f      换页符
        line-feed           \n      换行符
        carriage-return     \r      回车符
        white-space         \s      空白符
        non-white-space     \S      非空白符
        tab                 \t      制表符
        vertical-tab        \v      垂直制表符
        word                \w      ASCII 字符，[a-zA-Z0-9]
        non-word            \W      非 ASCII 字符，[^a-zA-Z0-9]
        null-character      \o      NUL 字符
 */

var Util = require('./../util.js');
var Random = require('./../random/index.js');
/*
    
*/
var Handler = {
    extend: Util.extend

    // http://en.wikipedia.org/wiki/ASCII#ASCII_printable_code_chart
    /*var ASCII_CONTROL_CODE_CHART = {
        '@': ['\u0000'],
        A: ['\u0001'],
        B: ['\u0002'],
        C: ['\u0003'],
        D: ['\u0004'],
        E: ['\u0005'],
        F: ['\u0006'],
        G: ['\u0007', '\a'],
        H: ['\u0008', '\b'],
        I: ['\u0009', '\t'],
        J: ['\u000A', '\n'],
        K: ['\u000B', '\v'],
        L: ['\u000C', '\f'],
        M: ['\u000D', '\r'],
        N: ['\u000E'],
        O: ['\u000F'],
        P: ['\u0010'],
        Q: ['\u0011'],
        R: ['\u0012'],
        S: ['\u0013'],
        T: ['\u0014'],
        U: ['\u0015'],
        V: ['\u0016'],
        W: ['\u0017'],
        X: ['\u0018'],
        Y: ['\u0019'],
        Z: ['\u001A'],
        '[': ['\u001B', '\e'],
        '\\': ['\u001C'],
        ']': ['\u001D'],
        '^': ['\u001E'],
        '_': ['\u001F']
    }*/

    // ASCII printable code chart
    // var LOWER = 'abcdefghijklmnopqrstuvwxyz'
    // var UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    // var NUMBER = '0123456789'
    // var SYMBOL = ' !"#$%&\'()*+,-./' + ':;<=>?@' + '[\\]^_`' + '{|}~'
};var LOWER = ascii(97, 122);
var UPPER = ascii(65, 90);
var NUMBER = ascii(48, 57);
var OTHER = ascii(32, 47) + ascii(58, 64) + ascii(91, 96) + ascii(123, 126); // 排除 95 _ ascii(91, 94) + ascii(96, 96)
var PRINTABLE = ascii(32, 126);
var SPACE = ' \f\n\r\t\x0B\xA0\u2028\u2029';
var CHARACTER_CLASSES = {
    '\\w': LOWER + UPPER + NUMBER + '_', // ascii(95, 95)
    '\\W': OTHER.replace('_', ''),
    '\\s': SPACE,
    '\\S': function () {
        var result = PRINTABLE;
        for (var i = 0; i < SPACE.length; i++) {
            result = result.replace(SPACE[i], '');
        }
        return result;
    }(),
    '\\d': NUMBER,
    '\\D': LOWER + UPPER + OTHER
};

function ascii(from, to) {
    var result = '';
    for (var i = from; i <= to; i++) {
        result += String.fromCharCode(i);
    }
    return result;
}

// var ast = RegExpParser.parse(regexp.source)
Handler.gen = function (node, result, cache) {
    cache = cache || {
        guid: 1
    };
    return Handler[node.type] ? Handler[node.type](node, result, cache) : Handler.token(node, result, cache);
};

Handler.extend({
    /* jshint unused:false */
    token: function token(node, result, cache) {
        switch (node.type) {
            case 'start':
            case 'end':
                return '';
            case 'any-character':
                return Random.character();
            case 'backspace':
                return '';
            case 'word-boundary':
                // TODO
                return '';
            case 'non-word-boundary':
                // TODO
                break;
            case 'digit':
                return Random.pick(NUMBER.split(''));
            case 'non-digit':
                return Random.pick((LOWER + UPPER + OTHER).split(''));
            case 'form-feed':
                break;
            case 'line-feed':
                return node.body || node.text;
            case 'carriage-return':
                break;
            case 'white-space':
                return Random.pick(SPACE.split(''));
            case 'non-white-space':
                return Random.pick((LOWER + UPPER + NUMBER).split(''));
            case 'tab':
                break;
            case 'vertical-tab':
                break;
            case 'word':
                // \w [a-zA-Z0-9]
                return Random.pick((LOWER + UPPER + NUMBER).split(''));
            case 'non-word':
                // \W [^a-zA-Z0-9]
                return Random.pick(OTHER.replace('_', '').split(''));
            case 'null-character':
                break;
        }
        return node.body || node.text;
    },
    /*
        {
            type: 'alternate',
            offset: 0,
            text: '',
            left: {
                boyd: []
            },
            right: {
                boyd: []
            }
        }
    */
    alternate: function alternate(node, result, cache) {
        // node.left/right {}
        return this.gen(Random.boolean() ? node.left : node.right, result, cache);
    },
    /*
        {
            type: 'match',
            offset: 0,
            text: '',
            body: []
        }
    */
    match: function match(node, result, cache) {
        result = '';
        // node.body []
        for (var i = 0; i < node.body.length; i++) {
            result += this.gen(node.body[i], result, cache);
        }
        return result;
    },
    // ()
    'capture-group': function captureGroup(node, result, cache) {
        // node.body {}
        result = this.gen(node.body, result, cache);
        cache[cache.guid++] = result;
        return result;
    },
    // (?:...)
    'non-capture-group': function nonCaptureGroup(node, result, cache) {
        // node.body {}
        return this.gen(node.body, result, cache);
    },
    // (?=p)
    'positive-lookahead': function positiveLookahead(node, result, cache) {
        // node.body
        return this.gen(node.body, result, cache);
    },
    // (?!p)
    'negative-lookahead': function negativeLookahead(node, result, cache) {
        // node.body
        return '';
    },
    /*
        {
            type: 'quantified',
            offset: 3,
            text: 'c*',
            body: {
                type: 'literal',
                offset: 3,
                text: 'c',
                body: 'c',
                escaped: false
            },
            quantifier: {
                type: 'quantifier',
                offset: 4,
                text: '*',
                min: 0,
                max: Infinity,
                greedy: true
            }
        }
    */
    quantified: function quantified(node, result, cache) {
        result = '';
        // node.quantifier {}
        var count = this.quantifier(node.quantifier);
        // node.body {}
        for (var i = 0; i < count; i++) {
            result += this.gen(node.body, result, cache);
        }
        return result;
    },
    /*
        quantifier: {
            type: 'quantifier',
            offset: 4,
            text: '*',
            min: 0,
            max: Infinity,
            greedy: true
        }
    */
    quantifier: function quantifier(node, result, cache) {
        var min = Math.max(node.min, 0);
        var max = isFinite(node.max) ? node.max : min + Random.integer(3, 7);
        return Random.integer(min, max);
    },
    /*
        
    */
    charset: function charset(node, result, cache) {
        // node.invert
        if (node.invert) return this['invert-charset'](node, result, cache);

        // node.body []
        var literal = Random.pick(node.body);
        return this.gen(literal, result, cache);
    },
    'invert-charset': function invertCharset(node, result, cache) {
        var pool = PRINTABLE;
        for (var i = 0, item; i < node.body.length; i++) {
            item = node.body[i];
            switch (item.type) {
                case 'literal':
                    pool = pool.replace(item.body, '');
                    break;
                case 'range':
                    var min = this.gen(item.start, result, cache).charCodeAt();
                    var max = this.gen(item.end, result, cache).charCodeAt();
                    for (var ii = min; ii <= max; ii++) {
                        pool = pool.replace(String.fromCharCode(ii), '');
                    }
                /* falls through */
                default:
                    var characters = CHARACTER_CLASSES[item.text];
                    if (characters) {
                        for (var iii = 0; iii <= characters.length; iii++) {
                            pool = pool.replace(characters[iii], '');
                        }
                    }
            }
        }
        return Random.pick(pool.split(''));
    },
    range: function range(node, result, cache) {
        // node.start, node.end
        var min = this.gen(node.start, result, cache).charCodeAt();
        var max = this.gen(node.end, result, cache).charCodeAt();
        return String.fromCharCode(Random.integer(min, max));
    },
    literal: function literal(node, result, cache) {
        return node.escaped ? node.body : node.text;
    },
    // Unicode \u
    unicode: function unicode(node, result, cache) {
        return String.fromCharCode(parseInt(node.code, 16));
    },
    // 十六进制 \xFF
    hex: function hex(node, result, cache) {
        return String.fromCharCode(parseInt(node.code, 16));
    },
    // 八进制 \0
    octal: function octal(node, result, cache) {
        return String.fromCharCode(parseInt(node.code, 8));
    },
    // 反向引用
    'back-reference': function backReference(node, result, cache) {
        return cache[node.code] || '';
    },
    /*
        http://en.wikipedia.org/wiki/C0_and_C1_control_codes
    */
    CONTROL_CHARACTER_MAP: function () {
        var CONTROL_CHARACTER = '@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _'.split(' ');
        var CONTROL_CHARACTER_UNICODE = '\0 \x01 \x02 \x03 \x04 \x05 \x06 \x07 \b \t \n \x0B \f \r \x0E \x0F \x10 \x11 \x12 \x13 \x14 \x15 \x16 \x17 \x18 \x19 \x1A \x1B \x1C \x1D \x1E \x1F'.split(' ');
        var map = {};
        for (var i = 0; i < CONTROL_CHARACTER.length; i++) {
            map[CONTROL_CHARACTER[i]] = CONTROL_CHARACTER_UNICODE[i];
        }
        return map;
    }(),
    'control-character': function controlCharacter(node, result, cache) {
        return this.CONTROL_CHARACTER_MAP[node.code];
    }
});

module.exports = Handler;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhhbmRsZXIuanMiXSwibmFtZXMiOlsiVXRpbCIsInJlcXVpcmUiLCJSYW5kb20iLCJIYW5kbGVyIiwiZXh0ZW5kIiwiTE9XRVIiLCJhc2NpaSIsIlVQUEVSIiwiTlVNQkVSIiwiT1RIRVIiLCJQUklOVEFCTEUiLCJTUEFDRSIsIkNIQVJBQ1RFUl9DTEFTU0VTIiwicmVwbGFjZSIsInJlc3VsdCIsImkiLCJsZW5ndGgiLCJmcm9tIiwidG8iLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJnZW4iLCJub2RlIiwiY2FjaGUiLCJndWlkIiwidHlwZSIsInRva2VuIiwiY2hhcmFjdGVyIiwicGljayIsInNwbGl0IiwiYm9keSIsInRleHQiLCJhbHRlcm5hdGUiLCJib29sZWFuIiwibGVmdCIsInJpZ2h0IiwibWF0Y2giLCJxdWFudGlmaWVkIiwiY291bnQiLCJxdWFudGlmaWVyIiwibWluIiwiTWF0aCIsIm1heCIsImlzRmluaXRlIiwiaW50ZWdlciIsImNoYXJzZXQiLCJpbnZlcnQiLCJsaXRlcmFsIiwicG9vbCIsIml0ZW0iLCJzdGFydCIsImNoYXJDb2RlQXQiLCJlbmQiLCJpaSIsImNoYXJhY3RlcnMiLCJpaWkiLCJyYW5nZSIsImVzY2FwZWQiLCJ1bmljb2RlIiwicGFyc2VJbnQiLCJjb2RlIiwiaGV4Iiwib2N0YWwiLCJDT05UUk9MX0NIQVJBQ1RFUl9NQVAiLCJDT05UUk9MX0NIQVJBQ1RFUiIsIkNPTlRST0xfQ0hBUkFDVEVSX1VOSUNPREUiLCJtYXAiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdURBLElBQUlBLE9BQU9DLFFBQVEsU0FBUixDQUFYO0FBQ0EsSUFBSUMsU0FBU0QsUUFBUSxZQUFSLENBQWI7QUFDSTs7O0FBR0osSUFBSUUsVUFBVTtBQUNWQyxZQUFRSixLQUFLSTs7QUFHakI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7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QW9CLENBQXBCLENBREcsQ0FBUDtBQUdILEtBbE9VO0FBbU9YO0FBQ0Esc0JBQWtCLHVCQUFTdEMsSUFBVCxFQUFlUixNQUFmLEVBQXVCUyxLQUF2QixFQUE4QjtBQUM1QyxlQUFPQSxNQUFNRCxLQUFLc0MsSUFBWCxLQUFvQixFQUEzQjtBQUNILEtBdE9VO0FBdU9YOzs7QUFHQUcsMkJBQXVCLFlBQVc7QUFDOUIsWUFBSUMsb0JBQW9CLG1FQUFtRW5DLEtBQW5FLENBQXlFLEdBQXpFLENBQXhCO0FBQ0EsWUFBSW9DLDRCQUE0QixzSkFBa09wQyxLQUFsTyxDQUF3TyxHQUF4TyxDQUFoQztBQUNBLFlBQUlxQyxNQUFNLEVBQVY7QUFDQSxhQUFLLElBQUluRCxJQUFJLENBQWIsRUFBZ0JBLElBQUlpRCxrQkFBa0JoRCxNQUF0QyxFQUE4Q0QsR0FBOUMsRUFBbUQ7QUFDL0NtRCxnQkFBSUYsa0JBQWtCakQsQ0FBbEIsQ0FBSixJQUE0QmtELDBCQUEwQmxELENBQTFCLENBQTVCO0FBQ0g7QUFDRCxlQUFPbUQsR0FBUDtBQUNILEtBUnNCLEVBMU9aO0FBbVBYLHlCQUFxQiwwQkFBUzVDLElBQVQsRUFBZVIsTUFBZixFQUF1QlMsS0FBdkIsRUFBOEI7QUFDL0MsZUFBTyxLQUFLd0MscUJBQUwsQ0FBMkJ6QyxLQUFLc0MsSUFBaEMsQ0FBUDtBQUNIO0FBclBVLENBQWY7O0FBd1BBTyxPQUFPQyxPQUFQLEdBQWlCakUsT0FBakIiLCJmaWxlIjoiaGFuZGxlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgIyMgUmVnRXhwIEhhbmRsZXJcblxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9Gb3JiZXNMaW5kZXNheS9yZWdleHBcbiAgICBodHRwczovL2dpdGh1Yi5jb20vZG1hamRhL3BlZ2pzXG4gICAgaHR0cDovL3d3dy5yZWdleHBlci5jb20vXG5cbiAgICDmr4/kuKroioLngrnnmoTnu5PmnoRcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJycsXG4gICAgICAgICAgICBvZmZzZXQ6IG51bWJlcixcbiAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgYm9keToge30sXG4gICAgICAgICAgICBlc2NhcGVkOiB0cnVlL2ZhbHNlXG4gICAgICAgIH1cblxuICAgIHR5cGUg5Y+v6YCJ5YC8XG4gICAgICAgIGFsdGVybmF0ZSAgICAgICAgICAgICB8ICAgICAgICAg6YCJ5oupXG4gICAgICAgIG1hdGNoICAgICAgICAgICAgICAgICDljLnphY1cbiAgICAgICAgY2FwdHVyZS1ncm91cCAgICAgICAgICgpICAgICAgICDmjZXojrfnu4RcbiAgICAgICAgbm9uLWNhcHR1cmUtZ3JvdXAgICAgICg/Oi4uLikgICDpnZ7mjZXojrfnu4RcbiAgICAgICAgcG9zaXRpdmUtbG9va2FoZWFkICAgICg/PXApICAgICDpm7blrr3mraPlkJHlhYjooYzmlq3oqIBcbiAgICAgICAgbmVnYXRpdmUtbG9va2FoZWFkICAgICg/IXApICAgICDpm7blrr3otJ/lkJHlhYjooYzmlq3oqIBcbiAgICAgICAgcXVhbnRpZmllZCAgICAgICAgICAgIGEqICAgICAgICDph43lpI3oioLngrlcbiAgICAgICAgcXVhbnRpZmllciAgICAgICAgICAgICogICAgICAgICDph4/or41cbiAgICAgICAgY2hhcnNldCAgICAgICAgICAgICAgIFtdICAgICAgICDlrZfnrKbpm4ZcbiAgICAgICAgcmFuZ2UgICAgICAgICAgICAgICAgIHttLCBufSAgICDojIPlm7RcbiAgICAgICAgbGl0ZXJhbCAgICAgICAgICAgICAgIGEgICAgICAgICDnm7TmjqXph4/lrZfnrKZcbiAgICAgICAgdW5pY29kZSAgICAgICAgICAgICAgIFxcdXh4eHggICAgVW5pY29kZVxuICAgICAgICBoZXggICAgICAgICAgICAgICAgICAgXFx4ICAgICAgICDljYHlha3ov5vliLZcbiAgICAgICAgb2N0YWwgICAgICAgICAgICAgICAgIOWFq+i/m+WItlxuICAgICAgICBiYWNrLXJlZmVyZW5jZSAgICAgICAgXFxuICAgICAgICDlj43lkJHlvJXnlKhcbiAgICAgICAgY29udHJvbC1jaGFyYWN0ZXIgICAgIFxcY1ggICAgICAg5o6n5Yi25a2X56ymXG5cbiAgICAgICAgLy8gVG9rZW5cbiAgICAgICAgc3RhcnQgICAgICAgICAgICAgICBeICAgICAgIOW8gOWktFxuICAgICAgICBlbmQgICAgICAgICAgICAgICAgICQgICAgICAg57uT5bC+XG4gICAgICAgIGFueS1jaGFyYWN0ZXIgICAgICAgLiAgICAgICDku7vmhI/lrZfnrKZcbiAgICAgICAgYmFja3NwYWNlICAgICAgICAgICBbXFxiXSAgICDpgIDmoLznm7TmjqXph49cbiAgICAgICAgd29yZC1ib3VuZGFyeSAgICAgICBcXGIgICAgICDljZXor43ovrnnlYxcbiAgICAgICAgbm9uLXdvcmQtYm91bmRhcnkgICBcXEIgICAgICDpnZ7ljZXor43ovrnnlYxcbiAgICAgICAgZGlnaXQgICAgICAgICAgICAgICBcXGQgICAgICBBU0NJSSDmlbDlrZfvvIxbMC05XVxuICAgICAgICBub24tZGlnaXQgICAgICAgICAgIFxcRCAgICAgIOmdniBBU0NJSSDmlbDlrZfvvIxbXjAtOV1cbiAgICAgICAgZm9ybS1mZWVkICAgICAgICAgICBcXGYgICAgICDmjaLpobXnrKZcbiAgICAgICAgbGluZS1mZWVkICAgICAgICAgICBcXG4gICAgICDmjaLooYznrKZcbiAgICAgICAgY2FycmlhZ2UtcmV0dXJuICAgICBcXHIgICAgICDlm57ovabnrKZcbiAgICAgICAgd2hpdGUtc3BhY2UgICAgICAgICBcXHMgICAgICDnqbrnmb3nrKZcbiAgICAgICAgbm9uLXdoaXRlLXNwYWNlICAgICBcXFMgICAgICDpnZ7nqbrnmb3nrKZcbiAgICAgICAgdGFiICAgICAgICAgICAgICAgICBcXHQgICAgICDliLbooajnrKZcbiAgICAgICAgdmVydGljYWwtdGFiICAgICAgICBcXHYgICAgICDlnoLnm7TliLbooajnrKZcbiAgICAgICAgd29yZCAgICAgICAgICAgICAgICBcXHcgICAgICBBU0NJSSDlrZfnrKbvvIxbYS16QS1aMC05XVxuICAgICAgICBub24td29yZCAgICAgICAgICAgIFxcVyAgICAgIOmdniBBU0NJSSDlrZfnrKbvvIxbXmEtekEtWjAtOV1cbiAgICAgICAgbnVsbC1jaGFyYWN0ZXIgICAgICBcXG8gICAgICBOVUwg5a2X56ymXG4gKi9cblxudmFyIFV0aWwgPSByZXF1aXJlKCcuLi91dGlsJylcbnZhciBSYW5kb20gPSByZXF1aXJlKCcuLi9yYW5kb20vJylcbiAgICAvKlxuICAgICAgICBcbiAgICAqL1xudmFyIEhhbmRsZXIgPSB7XG4gICAgZXh0ZW5kOiBVdGlsLmV4dGVuZFxufVxuXG4vLyBodHRwOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0FTQ0lJI0FTQ0lJX3ByaW50YWJsZV9jb2RlX2NoYXJ0XG4vKnZhciBBU0NJSV9DT05UUk9MX0NPREVfQ0hBUlQgPSB7XG4gICAgJ0AnOiBbJ1xcdTAwMDAnXSxcbiAgICBBOiBbJ1xcdTAwMDEnXSxcbiAgICBCOiBbJ1xcdTAwMDInXSxcbiAgICBDOiBbJ1xcdTAwMDMnXSxcbiAgICBEOiBbJ1xcdTAwMDQnXSxcbiAgICBFOiBbJ1xcdTAwMDUnXSxcbiAgICBGOiBbJ1xcdTAwMDYnXSxcbiAgICBHOiBbJ1xcdTAwMDcnLCAnXFxhJ10sXG4gICAgSDogWydcXHUwMDA4JywgJ1xcYiddLFxuICAgIEk6IFsnXFx1MDAwOScsICdcXHQnXSxcbiAgICBKOiBbJ1xcdTAwMEEnLCAnXFxuJ10sXG4gICAgSzogWydcXHUwMDBCJywgJ1xcdiddLFxuICAgIEw6IFsnXFx1MDAwQycsICdcXGYnXSxcbiAgICBNOiBbJ1xcdTAwMEQnLCAnXFxyJ10sXG4gICAgTjogWydcXHUwMDBFJ10sXG4gICAgTzogWydcXHUwMDBGJ10sXG4gICAgUDogWydcXHUwMDEwJ10sXG4gICAgUTogWydcXHUwMDExJ10sXG4gICAgUjogWydcXHUwMDEyJ10sXG4gICAgUzogWydcXHUwMDEzJ10sXG4gICAgVDogWydcXHUwMDE0J10sXG4gICAgVTogWydcXHUwMDE1J10sXG4gICAgVjogWydcXHUwMDE2J10sXG4gICAgVzogWydcXHUwMDE3J10sXG4gICAgWDogWydcXHUwMDE4J10sXG4gICAgWTogWydcXHUwMDE5J10sXG4gICAgWjogWydcXHUwMDFBJ10sXG4gICAgJ1snOiBbJ1xcdTAwMUInLCAnXFxlJ10sXG4gICAgJ1xcXFwnOiBbJ1xcdTAwMUMnXSxcbiAgICAnXSc6IFsnXFx1MDAxRCddLFxuICAgICdeJzogWydcXHUwMDFFJ10sXG4gICAgJ18nOiBbJ1xcdTAwMUYnXVxufSovXG5cbi8vIEFTQ0lJIHByaW50YWJsZSBjb2RlIGNoYXJ0XG4vLyB2YXIgTE9XRVIgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonXG4vLyB2YXIgVVBQRVIgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonXG4vLyB2YXIgTlVNQkVSID0gJzAxMjM0NTY3ODknXG4vLyB2YXIgU1lNQk9MID0gJyAhXCIjJCUmXFwnKCkqKywtLi8nICsgJzo7PD0+P0AnICsgJ1tcXFxcXV5fYCcgKyAne3x9fidcbnZhciBMT1dFUiA9IGFzY2lpKDk3LCAxMjIpXG52YXIgVVBQRVIgPSBhc2NpaSg2NSwgOTApXG52YXIgTlVNQkVSID0gYXNjaWkoNDgsIDU3KVxudmFyIE9USEVSID0gYXNjaWkoMzIsIDQ3KSArIGFzY2lpKDU4LCA2NCkgKyBhc2NpaSg5MSwgOTYpICsgYXNjaWkoMTIzLCAxMjYpIC8vIOaOkumZpCA5NSBfIGFzY2lpKDkxLCA5NCkgKyBhc2NpaSg5NiwgOTYpXG52YXIgUFJJTlRBQkxFID0gYXNjaWkoMzIsIDEyNilcbnZhciBTUEFDRSA9ICcgXFxmXFxuXFxyXFx0XFx2XFx1MDBBMFxcdTIwMjhcXHUyMDI5J1xudmFyIENIQVJBQ1RFUl9DTEFTU0VTID0ge1xuICAgICdcXFxcdyc6IExPV0VSICsgVVBQRVIgKyBOVU1CRVIgKyAnXycsIC8vIGFzY2lpKDk1LCA5NSlcbiAgICAnXFxcXFcnOiBPVEhFUi5yZXBsYWNlKCdfJywgJycpLFxuICAgICdcXFxccyc6IFNQQUNFLFxuICAgICdcXFxcUyc6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gUFJJTlRBQkxFXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgU1BBQ0UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKFNQQUNFW2ldLCAnJylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSgpLFxuICAgICdcXFxcZCc6IE5VTUJFUixcbiAgICAnXFxcXEQnOiBMT1dFUiArIFVQUEVSICsgT1RIRVJcbn1cblxuZnVuY3Rpb24gYXNjaWkoZnJvbSwgdG8pIHtcbiAgICB2YXIgcmVzdWx0ID0gJydcbiAgICBmb3IgKHZhciBpID0gZnJvbTsgaSA8PSB0bzsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGkpXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbn1cblxuLy8gdmFyIGFzdCA9IFJlZ0V4cFBhcnNlci5wYXJzZShyZWdleHAuc291cmNlKVxuSGFuZGxlci5nZW4gPSBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG4gICAgY2FjaGUgPSBjYWNoZSB8fCB7XG4gICAgICAgIGd1aWQ6IDFcbiAgICB9XG4gICAgcmV0dXJuIEhhbmRsZXJbbm9kZS50eXBlXSA/IEhhbmRsZXJbbm9kZS50eXBlXShub2RlLCByZXN1bHQsIGNhY2hlKSA6XG4gICAgICAgIEhhbmRsZXIudG9rZW4obm9kZSwgcmVzdWx0LCBjYWNoZSlcbn1cblxuSGFuZGxlci5leHRlbmQoe1xuICAgIC8qIGpzaGludCB1bnVzZWQ6ZmFsc2UgKi9cbiAgICB0b2tlbjogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuICAgICAgICBzd2l0Y2ggKG5vZGUudHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnc3RhcnQnOlxuICAgICAgICAgICAgY2FzZSAnZW5kJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gJydcbiAgICAgICAgICAgIGNhc2UgJ2FueS1jaGFyYWN0ZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20uY2hhcmFjdGVyKClcbiAgICAgICAgICAgIGNhc2UgJ2JhY2tzcGFjZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnXG4gICAgICAgICAgICBjYXNlICd3b3JkLWJvdW5kYXJ5JzogLy8gVE9ET1xuICAgICAgICAgICAgICAgIHJldHVybiAnJ1xuICAgICAgICAgICAgY2FzZSAnbm9uLXdvcmQtYm91bmRhcnknOiAvLyBUT0RPXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgIGNhc2UgJ2RpZ2l0JzpcbiAgICAgICAgICAgICAgICByZXR1cm4gUmFuZG9tLnBpY2soXG4gICAgICAgICAgICAgICAgICAgIE5VTUJFUi5zcGxpdCgnJylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICBjYXNlICdub24tZGlnaXQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20ucGljayhcbiAgICAgICAgICAgICAgICAgICAgKExPV0VSICsgVVBQRVIgKyBPVEhFUikuc3BsaXQoJycpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgY2FzZSAnZm9ybS1mZWVkJzpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnbGluZS1mZWVkJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZS5ib2R5IHx8IG5vZGUudGV4dFxuICAgICAgICAgICAgY2FzZSAnY2FycmlhZ2UtcmV0dXJuJzpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgY2FzZSAnd2hpdGUtc3BhY2UnOlxuICAgICAgICAgICAgICAgIHJldHVybiBSYW5kb20ucGljayhcbiAgICAgICAgICAgICAgICAgICAgU1BBQ0Uuc3BsaXQoJycpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgY2FzZSAnbm9uLXdoaXRlLXNwYWNlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gUmFuZG9tLnBpY2soXG4gICAgICAgICAgICAgICAgICAgIChMT1dFUiArIFVQUEVSICsgTlVNQkVSKS5zcGxpdCgnJylcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICBjYXNlICd0YWInOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICd2ZXJ0aWNhbC10YWInOlxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICBjYXNlICd3b3JkJzogLy8gXFx3IFthLXpBLVowLTldXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKFxuICAgICAgICAgICAgICAgICAgICAoTE9XRVIgKyBVUFBFUiArIE5VTUJFUikuc3BsaXQoJycpXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgY2FzZSAnbm9uLXdvcmQnOiAvLyBcXFcgW15hLXpBLVowLTldXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKFxuICAgICAgICAgICAgICAgICAgICBPVEhFUi5yZXBsYWNlKCdfJywgJycpLnNwbGl0KCcnKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIGNhc2UgJ251bGwtY2hhcmFjdGVyJzpcbiAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub2RlLmJvZHkgfHwgbm9kZS50ZXh0XG4gICAgfSxcbiAgICAvKlxuICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnYWx0ZXJuYXRlJyxcbiAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgbGVmdDoge1xuICAgICAgICAgICAgICAgIGJveWQ6IFtdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmlnaHQ6IHtcbiAgICAgICAgICAgICAgICBib3lkOiBbXVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgKi9cbiAgICBhbHRlcm5hdGU6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcbiAgICAgICAgLy8gbm9kZS5sZWZ0L3JpZ2h0IHt9XG4gICAgICAgIHJldHVybiB0aGlzLmdlbihcbiAgICAgICAgICAgIFJhbmRvbS5ib29sZWFuKCkgPyBub2RlLmxlZnQgOiBub2RlLnJpZ2h0LFxuICAgICAgICAgICAgcmVzdWx0LFxuICAgICAgICAgICAgY2FjaGVcbiAgICAgICAgKVxuICAgIH0sXG4gICAgLypcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ21hdGNoJyxcbiAgICAgICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgYm9keTogW11cbiAgICAgICAgfVxuICAgICovXG4gICAgbWF0Y2g6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcbiAgICAgICAgcmVzdWx0ID0gJydcbiAgICAgICAgICAgIC8vIG5vZGUuYm9keSBbXVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMuZ2VuKG5vZGUuYm9keVtpXSwgcmVzdWx0LCBjYWNoZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICAvLyAoKVxuICAgICdjYXB0dXJlLWdyb3VwJzogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuICAgICAgICAvLyBub2RlLmJvZHkge31cbiAgICAgICAgcmVzdWx0ID0gdGhpcy5nZW4obm9kZS5ib2R5LCByZXN1bHQsIGNhY2hlKVxuICAgICAgICBjYWNoZVtjYWNoZS5ndWlkKytdID0gcmVzdWx0XG4gICAgICAgIHJldHVybiByZXN1bHRcbiAgICB9LFxuICAgIC8vICg/Oi4uLilcbiAgICAnbm9uLWNhcHR1cmUtZ3JvdXAnOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG4gICAgICAgIC8vIG5vZGUuYm9keSB7fVxuICAgICAgICByZXR1cm4gdGhpcy5nZW4obm9kZS5ib2R5LCByZXN1bHQsIGNhY2hlKVxuICAgIH0sXG4gICAgLy8gKD89cClcbiAgICAncG9zaXRpdmUtbG9va2FoZWFkJzogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuICAgICAgICAvLyBub2RlLmJvZHlcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2VuKG5vZGUuYm9keSwgcmVzdWx0LCBjYWNoZSlcbiAgICB9LFxuICAgIC8vICg/IXApXG4gICAgJ25lZ2F0aXZlLWxvb2thaGVhZCc6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcbiAgICAgICAgLy8gbm9kZS5ib2R5XG4gICAgICAgIHJldHVybiAnJ1xuICAgIH0sXG4gICAgLypcbiAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3F1YW50aWZpZWQnLFxuICAgICAgICAgICAgb2Zmc2V0OiAzLFxuICAgICAgICAgICAgdGV4dDogJ2MqJyxcbiAgICAgICAgICAgIGJvZHk6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnbGl0ZXJhbCcsXG4gICAgICAgICAgICAgICAgb2Zmc2V0OiAzLFxuICAgICAgICAgICAgICAgIHRleHQ6ICdjJyxcbiAgICAgICAgICAgICAgICBib2R5OiAnYycsXG4gICAgICAgICAgICAgICAgZXNjYXBlZDogZmFsc2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBxdWFudGlmaWVyOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ3F1YW50aWZpZXInLFxuICAgICAgICAgICAgICAgIG9mZnNldDogNCxcbiAgICAgICAgICAgICAgICB0ZXh0OiAnKicsXG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIG1heDogSW5maW5pdHksXG4gICAgICAgICAgICAgICAgZ3JlZWR5OiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAqL1xuICAgIHF1YW50aWZpZWQ6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcbiAgICAgICAgcmVzdWx0ID0gJydcbiAgICAgICAgICAgIC8vIG5vZGUucXVhbnRpZmllciB7fVxuICAgICAgICB2YXIgY291bnQgPSB0aGlzLnF1YW50aWZpZXIobm9kZS5xdWFudGlmaWVyKTtcbiAgICAgICAgLy8gbm9kZS5ib2R5IHt9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHRoaXMuZ2VuKG5vZGUuYm9keSwgcmVzdWx0LCBjYWNoZSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0XG4gICAgfSxcbiAgICAvKlxuICAgICAgICBxdWFudGlmaWVyOiB7XG4gICAgICAgICAgICB0eXBlOiAncXVhbnRpZmllcicsXG4gICAgICAgICAgICBvZmZzZXQ6IDQsXG4gICAgICAgICAgICB0ZXh0OiAnKicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IEluZmluaXR5LFxuICAgICAgICAgICAgZ3JlZWR5OiB0cnVlXG4gICAgICAgIH1cbiAgICAqL1xuICAgIHF1YW50aWZpZXI6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcbiAgICAgICAgdmFyIG1pbiA9IE1hdGgubWF4KG5vZGUubWluLCAwKVxuICAgICAgICB2YXIgbWF4ID0gaXNGaW5pdGUobm9kZS5tYXgpID8gbm9kZS5tYXggOlxuICAgICAgICAgICAgbWluICsgUmFuZG9tLmludGVnZXIoMywgNylcbiAgICAgICAgcmV0dXJuIFJhbmRvbS5pbnRlZ2VyKG1pbiwgbWF4KVxuICAgIH0sXG4gICAgLypcbiAgICAgICAgXG4gICAgKi9cbiAgICBjaGFyc2V0OiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG4gICAgICAgIC8vIG5vZGUuaW52ZXJ0XG4gICAgICAgIGlmIChub2RlLmludmVydCkgcmV0dXJuIHRoaXNbJ2ludmVydC1jaGFyc2V0J10obm9kZSwgcmVzdWx0LCBjYWNoZSlcblxuICAgICAgICAvLyBub2RlLmJvZHkgW11cbiAgICAgICAgdmFyIGxpdGVyYWwgPSBSYW5kb20ucGljayhub2RlLmJvZHkpXG4gICAgICAgIHJldHVybiB0aGlzLmdlbihsaXRlcmFsLCByZXN1bHQsIGNhY2hlKVxuICAgIH0sXG4gICAgJ2ludmVydC1jaGFyc2V0JzogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuICAgICAgICB2YXIgcG9vbCA9IFBSSU5UQUJMRVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaXRlbTsgaSA8IG5vZGUuYm9keS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaXRlbSA9IG5vZGUuYm9keVtpXVxuICAgICAgICAgICAgc3dpdGNoIChpdGVtLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsaXRlcmFsJzpcbiAgICAgICAgICAgICAgICAgICAgcG9vbCA9IHBvb2wucmVwbGFjZShpdGVtLmJvZHksICcnKVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JhbmdlJzpcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1pbiA9IHRoaXMuZ2VuKGl0ZW0uc3RhcnQsIHJlc3VsdCwgY2FjaGUpLmNoYXJDb2RlQXQoKVxuICAgICAgICAgICAgICAgICAgICB2YXIgbWF4ID0gdGhpcy5nZW4oaXRlbS5lbmQsIHJlc3VsdCwgY2FjaGUpLmNoYXJDb2RlQXQoKVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpaSA9IG1pbjsgaWkgPD0gbWF4OyBpaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwb29sID0gcG9vbC5yZXBsYWNlKFN0cmluZy5mcm9tQ2hhckNvZGUoaWkpLCAnJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAvKiBmYWxscyB0aHJvdWdoICovXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoYXJhY3RlcnMgPSBDSEFSQUNURVJfQ0xBU1NFU1tpdGVtLnRleHRdXG4gICAgICAgICAgICAgICAgICAgIGlmIChjaGFyYWN0ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpaWkgPSAwOyBpaWkgPD0gY2hhcmFjdGVycy5sZW5ndGg7IGlpaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9vbCA9IHBvb2wucmVwbGFjZShjaGFyYWN0ZXJzW2lpaV0sICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFJhbmRvbS5waWNrKHBvb2wuc3BsaXQoJycpKVxuICAgIH0sXG4gICAgcmFuZ2U6IGZ1bmN0aW9uKG5vZGUsIHJlc3VsdCwgY2FjaGUpIHtcbiAgICAgICAgLy8gbm9kZS5zdGFydCwgbm9kZS5lbmRcbiAgICAgICAgdmFyIG1pbiA9IHRoaXMuZ2VuKG5vZGUuc3RhcnQsIHJlc3VsdCwgY2FjaGUpLmNoYXJDb2RlQXQoKVxuICAgICAgICB2YXIgbWF4ID0gdGhpcy5nZW4obm9kZS5lbmQsIHJlc3VsdCwgY2FjaGUpLmNoYXJDb2RlQXQoKVxuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgICAgIFJhbmRvbS5pbnRlZ2VyKG1pbiwgbWF4KVxuICAgICAgICApXG4gICAgfSxcbiAgICBsaXRlcmFsOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG4gICAgICAgIHJldHVybiBub2RlLmVzY2FwZWQgPyBub2RlLmJvZHkgOiBub2RlLnRleHRcbiAgICB9LFxuICAgIC8vIFVuaWNvZGUgXFx1XG4gICAgdW5pY29kZTogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgICAgIHBhcnNlSW50KG5vZGUuY29kZSwgMTYpXG4gICAgICAgIClcbiAgICB9LFxuICAgIC8vIOWNgeWFrei/m+WItiBcXHhGRlxuICAgIGhleDogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgICAgIHBhcnNlSW50KG5vZGUuY29kZSwgMTYpXG4gICAgICAgIClcbiAgICB9LFxuICAgIC8vIOWFq+i/m+WItiBcXDBcbiAgICBvY3RhbDogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShcbiAgICAgICAgICAgIHBhcnNlSW50KG5vZGUuY29kZSwgOClcbiAgICAgICAgKVxuICAgIH0sXG4gICAgLy8g5Y+N5ZCR5byV55SoXG4gICAgJ2JhY2stcmVmZXJlbmNlJzogZnVuY3Rpb24obm9kZSwgcmVzdWx0LCBjYWNoZSkge1xuICAgICAgICByZXR1cm4gY2FjaGVbbm9kZS5jb2RlXSB8fCAnJ1xuICAgIH0sXG4gICAgLypcbiAgICAgICAgaHR0cDovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DMF9hbmRfQzFfY29udHJvbF9jb2Rlc1xuICAgICovXG4gICAgQ09OVFJPTF9DSEFSQUNURVJfTUFQOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIENPTlRST0xfQ0hBUkFDVEVSID0gJ0AgQSBCIEMgRCBFIEYgRyBIIEkgSiBLIEwgTSBOIE8gUCBRIFIgUyBUIFUgViBXIFggWSBaIFsgXFxcXCBdIF4gXycuc3BsaXQoJyAnKVxuICAgICAgICB2YXIgQ09OVFJPTF9DSEFSQUNURVJfVU5JQ09ERSA9ICdcXHUwMDAwIFxcdTAwMDEgXFx1MDAwMiBcXHUwMDAzIFxcdTAwMDQgXFx1MDAwNSBcXHUwMDA2IFxcdTAwMDcgXFx1MDAwOCBcXHUwMDA5IFxcdTAwMEEgXFx1MDAwQiBcXHUwMDBDIFxcdTAwMEQgXFx1MDAwRSBcXHUwMDBGIFxcdTAwMTAgXFx1MDAxMSBcXHUwMDEyIFxcdTAwMTMgXFx1MDAxNCBcXHUwMDE1IFxcdTAwMTYgXFx1MDAxNyBcXHUwMDE4IFxcdTAwMTkgXFx1MDAxQSBcXHUwMDFCIFxcdTAwMUMgXFx1MDAxRCBcXHUwMDFFIFxcdTAwMUYnLnNwbGl0KCcgJylcbiAgICAgICAgdmFyIG1hcCA9IHt9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgQ09OVFJPTF9DSEFSQUNURVIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG1hcFtDT05UUk9MX0NIQVJBQ1RFUltpXV0gPSBDT05UUk9MX0NIQVJBQ1RFUl9VTklDT0RFW2ldXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcFxuICAgIH0oKSxcbiAgICAnY29udHJvbC1jaGFyYWN0ZXInOiBmdW5jdGlvbihub2RlLCByZXN1bHQsIGNhY2hlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLkNPTlRST0xfQ0hBUkFDVEVSX01BUFtub2RlLmNvZGVdXG4gICAgfVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSBIYW5kbGVyIl19