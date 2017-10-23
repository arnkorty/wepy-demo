'use strict';

/* global require, chai, describe, before, it */
// 数据模板定义（Data Temaplte Definition，DTD）
/*
    ## BDD
    1. 结构 
        describe suite
            [ describe ]
            before after beforeEach afterEach
            it test
        done
            搜索 this.async = fn && fn.length
    2. 常用 expect
        expect().to
            .equal .deep.equal .not.equal
            .match
            .have.length .with.length
            .have.property .have.deep.property
            .to.be.a .to.be.an
            .that
            .least .most .within
    3. 速度 
        搜索 test.speed
        slow > 75
        75 / 2 < medium < 75
        fast < 75 / 2
 */
var expect = chai.expect;
var Mock, $, _;

describe('DTD', function () {
    before(function (done) {
        require(['mock', 'underscore', 'jquery'], function () {
            Mock = arguments[0];
            _ = arguments[1];
            $ = arguments[2];
            expect(Mock).to.not.equal(undefined);
            expect(_).to.not.equal(undefined);
            expect($).to.not.equal(undefined);
            done();
        });
    });
    describe('Literal', function () {
        it('', function () {
            var data = Mock.mock(this.test.title);
            expect(data).to.equal(this.test.title);
        });
        it('foo', function () {
            var data = Mock.mock(this.test.title);
            expect(data).to.equal(this.test.title);
        });
        it(1, function () {
            var data = Mock.mock(this.test.title);
            expect(data).to.equal(this.test.title);
        });
        it(true, function () {
            var data = Mock.mock(this.test.title);
            expect(data).to.equal(this.test.title);
        });
        it(false, function () {
            var data = Mock.mock(this.test.title);
            expect(data).to.equal(this.test.title);
        });
        it({}, function () {
            var data = Mock.mock(this.test.title);
            expect(data).to.deep.equal(this.test.title);
        });
        it([], function () {
            var data = Mock.mock(this.test.title);
            expect(data).to.deep.equal(this.test.title);
        });
        it(function () {}, function () {
            var data = Mock.mock(this.test.title);
            expect(data).to.equal(undefined);
        });
    });
    describe('String', function () {
        // `'name|min-max': 'value'`
        it('name|min-max', function () {
            var data = Mock.mock({
                'name|1-10': '★号'
            });
            expect(data.name).to.have.length.within(2, 20);
        });

        // `'name|count': 'value'`
        it('name|count', function () {
            var data = Mock.mock({
                'name|10': '★号'
            });
            expect(data.name).to.be.a('string').that.have.length(20);
        });
    });
    describe('Number', function () {
        // `'name|+step': value`
        it('name|+step', function () {
            var data = Mock.mock({
                'list|10': [{
                    'name|+1': 100
                }]
            });
            expect(data.list).to.be.an('array').with.length(10);
            _.each(data.list, function (item, index) {
                expect(item).to.have.property('name').that.be.a('number');
                if (index === 0) expect(item.name).to.equal(100);else expect(item.name).to.equal(data.list[index - 1].name + 1);
            });
        });

        // `'name|min-max': value`
        it('name|min-max', function () {
            var data = Mock.mock({
                'name|1-100': 100
            });
            expect(data).to.have.property('name').that.be.a('number').within(1, 100);
        });
        it('name|max-min', function () {
            var data = Mock.mock({
                'name|100-1': 100
            });
            expect(data).to.have.property('name').that.be.a('number').within(1, 100);
        });
        it('name|-min--max', function () {
            var data = Mock.mock({
                'name|-100--1': 100
            });
            expect(data).to.have.property('name').that.be.a('number').within(-100, -1);
        });
        it('name|-max--min', function () {
            var data = Mock.mock({
                'name|-1--100': 100
            });
            expect(data).to.have.property('name').that.be.a('number').within(-100, -1);
        });
        it('name|min-min', function () {
            var data = Mock.mock({
                'name|10-10': 100
            });
            expect(data).to.have.property('name').that.be.a('number').equal(10);
        });
        it('name|count', function () {
            var data = Mock.mock({
                'name|10': 100
            });
            expect(data).to.have.property('name').that.be.a('number').equal(10);
        });

        // `'name|min-max.dmin-dmax': value`

        // 1 整数部分 2 小数部分
        var RE_FLOAT = /([\+\-]?\d+)\.?(\d+)?/;

        function validNumber(number, min, max, dmin, dmax) {
            expect(number).to.be.a('number');
            RE_FLOAT.lastIndex = 0;
            var parts = RE_FLOAT.exec('' + number);
            expect(+parts[1]).to.be.a('number').within(min, max);
            expect(parts[2]).to.have.length.within(dmin, dmax);
        }

        it('name|min-max.dmin-dmax', function () {
            var data = Mock.mock({
                'name|1-10.1-10': 123.456
            });
            validNumber(data.name, 1, 10, 1, 10);
        });
        it('name|min-max.dcount', function () {
            var data = Mock.mock({
                'name|1-10.10': 123.456
            });
            validNumber(data.name, 1, 10, 10, 10);
        });
        it('name|count.dmin-dmax', function () {
            var data = Mock.mock({
                'name|10.1-10': 123.456
            });
            validNumber(data.name, 10, 10, 1, 10);
        });
        it('name|count.dcount', function () {
            var data = Mock.mock({
                'name|10.10': 123.456
            });
            validNumber(data.name, 10, 10, 10, 10);
        });
        it('name|.dmin-dmax', function () {
            var data = Mock.mock({
                'name|.1-10': 123.456
            });
            validNumber(data.name, 123, 123, 1, 10);
        });
        it('name|.dcount', function () {
            var data = Mock.mock({
                'name|.10': 123.456
            });
            validNumber(data.name, 123, 123, 10, 10);
        });
    });
    describe('Boolean', function () {
        // `'name|1': value` 
        it('name|1', function () {
            var data = Mock.mock({
                'name|1': true
            });
            expect(data).to.have.property('name').that.be.a('boolean');
        });

        // `'name|min-max': value`
        it('name|min-max', function () {
            var data = Mock.mock({
                'name|8-2': true
            });
            expect(data).to.have.property('name').that.be.a('boolean');
        });
    });
    describe('Object', function () {
        var methods = {
            GET: '@URL',
            POST: '@URL',
            HEAD: '@URL',
            PUT: '@URL',
            DELETE: '@URL'
        };
        var methodCount, tpl, data;

        // `'name|min-max': {}`
        it('name|min-max', function () {
            methodCount = _.keys(methods).length; // 5
            for (var min = 0, max; min <= methodCount + 1; min++) {
                tpl = {};
                max = Mock.Random.integer(0, methodCount);

                // methods|0-? |1-? |2-? |3-? |4-? |5-? |6-?
                tpl['methods|' + min + '-' + max] = methods;
                data = Mock.mock(tpl);
                expect(_.keys(data.methods)).to.have.length.that.within(Math.min(min, max), Math.max(min, max));
            }
        });

        // `'name|count': {}`
        it('name|count', function () {
            methodCount = _.keys(methods).length; // 5
            for (var count = 0; count <= methodCount + 1; count++) {
                tpl = {};
                tpl['methods|' + count] = methods;
                data = Mock.mock(tpl);
                expect(_.keys(data.methods)).to.have.length(Math.min(count, methodCount));
            }
        });
    });
    describe('Array', function () {
        // `'name': [{}, {} ...]`
        it('name', function () {
            var value = [{
                foo: 'foo'
            }, {
                bar: 'bar'
            }, {
                foobar: 'foobar'
            }];
            var data = Mock.mock({
                name: value
            });
            expect(data).to.have.property('name').that.be.an('array').with.length(3).that.not.equal(value);
            expect(data).to.have.property('name');

            for (var i = 0; i < data.name.length; i++) {
                expect(data.name[i]).to.not.equal(value[i]);
                expect(data.name[i]).to.deep.equal(value[i]);
            }
        });

        // `'name|1': [{}, {} ...]`
        it('name|1: [1, 2, 4, 8]', function () {
            // number array
            var value = [1, 2, 4, 8];
            var data = Mock.mock({
                'name|1': value
            });
            expect(data).to.have.property('name').that.be.a('number');
            expect(value).to.include(data.name);
        });
        it('name|1: ["GET", "POST", "HEAD", "DELETE"]', function () {
            // string array
            var value = ['GET', 'POST', 'HEAD', 'DELETE'];
            var data = Mock.mock({
                'name|1': value
            });
            expect(data).to.have.property('name').that.be.a('string');
            expect(value).to.include(data.name);
        });
        it('name|1 [{}]', function () {
            // object array
            var value = [{}];
            var data = Mock.mock({
                'name|1': value
            });
            expect(data).to.have.property('name').that.be.a('object').that.deep.equal({});
            expect(data.name).to.not.equal(value[0]);
        });
        it('name|1 [{}, {}, {}]', function () {
            // object array
            var data = Mock.mock({
                'name|1': [{}, {}, {}]
            });
            expect(data).to.have.property('name').that.be.a('object').that.deep.equal({});
        });
        it('name|1 [{}, {}, {}]', function () {
            // object array
            var value = [{
                method: 'GET'
            }, {
                method: 'POST'
            }, {
                method: 'HEAD'
            }, {
                method: 'DELETE'
            }];
            var data = Mock.mock({
                'name|1': value
            });
            expect(data).to.have.property('name').that.be.a('object').that.have.property('method').that.be.a('string');
            expect(_.pluck(value, 'method')).include(data.name.method);
        });

        // `'name|+1': [{}, {} ...]`
        it('name|+1: ["a", "b", "c"]', function () {
            var data = Mock.mock({
                'list|5': [{
                    'name|+1': ['a', 'b', 'c']
                }]
            });
            expect(data).to.have.property('list').that.be.an('array').with.length(5);
            expect(data.list[0].name).to.equal('a');
            expect(data.list[1].name).to.equal('b');
            expect(data.list[2].name).to.equal('c');
            expect(data.list[3].name).to.equal('a');
            expect(data.list[4].name).to.equal('b');
        });
        it('name|+1: ["@integer", "@email", "@boolean"]', function () {
            var data = Mock.mock({
                'list|5-10': [{
                    'name|+1': ['@integer', '@email', '@boolean']
                }]
            });
            expect(data).to.have.property('list').that.be.an('array').have.length.within(5, 10);
            expect(data.list[0].name).to.be.a('number');
            expect(data.list[1].name).to.be.a('string');
            expect(data.list[2].name).to.be.a('boolean');
            expect(data.list[3].name).to.be.a('number');
            expect(data.list[4].name).to.be.a('string');
        });

        // `'name|min-max': [{}, {} ...]`
        it('name|min-min', function () {
            var data = Mock.mock({
                'name|1-1': [{}]
            });
            expect(data.name).to.be.an('array').with.length(1);
            _.each(data.name, function (item /*, index*/) {
                expect(item).to.deep.equal({});
            });
        });
        it('name|min-max [{}]', function () {
            var data = Mock.mock({
                'name|1-10': [{}]
            });
            expect(data.name).to.be.an('array').with.length.within(1, 10);
            _.each(data.name, function (item /*, index*/) {
                expect(item).to.deep.equal({});
            });
        });
        it('name|max-min [{}]', function () {
            var data = Mock.mock({
                'name|10-1': [{}]
            });
            expect(data.name).to.be.an('array').with.length.within(1, 10);
            _.each(data.name, function (item /*, index*/) {
                expect(item).to.deep.equal({});
            });
        });
        it('name|min-max [{}, {}]', function () {
            var data = Mock.mock({
                'name|1-10': [{}, {}]
            });
            expect(data.name).to.be.an('array').with.length.within(2, 20);
            _.each(data.name, function (item /*, index*/) {
                expect(item).to.deep.equal({});
            });
        });
        it('name|max-min [{}, {}]', function () {
            var data = Mock.mock({
                'name|10-1': [{}, {}]
            });
            expect(data.name).to.be.an('array').with.length.within(2, 20);
            _.each(data.name, function (item /*, index*/) {
                expect(item).to.deep.equal({});
            });
        });

        // `'name|count': [{}, {} ...]`
        it('name|count [{}]', function () {
            var data = Mock.mock({
                'name|10': [{}]
            });
            expect(data.name).to.be.an('array').with.length(10);
            _.each(data.name, function (item /*, index*/) {
                expect(item).to.deep.equal({});
            });
        });
        it('name|count [{}, {}]', function () {
            var data = Mock.mock({
                'name|10': [{}, {}]
            });
            expect(data.name).to.be.an('array').with.length(20);
            _.each(data.name, function (item /*, index*/) {
                expect(item).to.deep.equal({});
            });
        });
    });
    describe('Function', function () {
        // `'name': function(){}`
        it('name: function', function () {
            var data = Mock.mock({
                prop: 'hello',
                name: function name() /*root, path*/{
                    return this.prop;
                }
            });
            expect(data).to.have.property('name').that.be.a('string').equal('hello');
        });

        // 无序的 function
        it('name: function', function () {
            var data = Mock.mock({
                name2: function name2() {
                    return this.prop * 2;
                },
                prop: 1,
                name4: function name4() {
                    return this.prop * 4;
                }
            });
            expect(data.name2).to.equal(2);
            expect(data.name4).to.equal(4);
        });

        // #25 改变了非函数属性的顺序，查找起来不方便
        it('name: function', function () {
            var data = Mock.mock({
                name: function name() {},
                first: '',
                second: '',
                third: ''
            });
            var keys = _.keys(data);
            expect(keys[0]).equal('first');
            expect(keys[1]).equal('second');
            expect(keys[2]).equal('third');
            expect(keys[3]).equal('name');
        });
    });

    /*
        按照 http://www.regexr.com/ 的 Reference 设计测试用例。
        https://github.com/nuysoft/Mock/blob/7c1e3a686bcc515855f1f583d70ae0ee89acc65e/test/regexp.js#L120
     */
    describe('RegExp', function () {
        function validRegExp(regexp) {
            if (arguments.length > 1) {
                for (var i = 0; i < arguments.length; i++) {
                    validRegExp(arguments[i]);
                }
            }

            it(regexp, function () {
                var data = Mock.mock(regexp);
                this.test.title += ' => ' + data;
                expect(regexp.test(data)).to.be.true;
            });
        }

        describe('Character Classes', function () {
            validRegExp(/./);
            validRegExp(/[a-z]/, /[A-Z]/, /[0-9]/);
            validRegExp(/\w/, /\W/, /\s/, /\S/, /\d/, /\D/);
            validRegExp(/[.]/, /[\w]/, /[\W]/, /[\s]/, /[\S]/, /[\d]/, /[\D]/);
            validRegExp(/[^.]/, /[^\w]/, /[^\W]/, /[^\s]/, /[^\S]/, /[^\d]/, /[^\D]/);
        });
        describe('Quantifiers', function () {
            validRegExp(/\d?/, /\d+/, /\d*/);

            // {n}, {n,}, {n,m}, {0,1} ?, {1,0} +, {0,} *
            validRegExp(/\d{5}/, /\d{5,}/, /\d{5,10}/, /\d{0,1}/, /\d{0,}/);

            validRegExp(/[\u4E00-\u9FA5]+/); // 汉字
        });
        describe('Anchors', function () {
            validRegExp(/^/);
            validRegExp(/$/);
            validRegExp(/^foo/);
            validRegExp(/foo$/);
            validRegExp(/\bfoo/);
            validRegExp(/\Bfoo/);
        });

        describe('Escaped Characters', function () {
            validRegExp(/\000/);
            validRegExp(/\xFF/);
            validRegExp(/\uFFFF/);
            validRegExp(/\cI/);
        });

        describe('Groups & Lookaround', function () {
            validRegExp(/(ABC)/);
            validRegExp(/(ABC)\1/);
            validRegExp(/(?:ABC)/);
            validRegExp(/(?=ABC)/);
            validRegExp(/(?!ABC)/);
            // validRegExp(/(?<=ABC)/)
            // validRegExp(/(?<!ABC)/)

            validRegExp(/(\d{5,10})|([a-zA-Z]{5,10})/);
            validRegExp(/(?:\d{5,10})|(?:[a-zA-Z]{5,10})/);
            validRegExp(/(.)(\w)(\W)(\s)(\S)(\d)(\D),\1\2\3\4\5\6\7,\1\2\3\4\5\6\7/);
        });

        describe('Quantifiers & Alternation', function () {
            validRegExp(/.+/);
            validRegExp(/.*/);
            validRegExp(/.{1,3}/);
            validRegExp(/.?/);
            validRegExp(/a|bc/);

            validRegExp(/\d{5,10}|[a-zA-Z]{5,10}/);
        });

        describe('Flags', function () {
            // ignoreCase
            // multiline
            // global
        });
    });

    describe('Complex', function () {
        var tpl = {
            'title': 'Syntax Demo',

            'string1|1-10': '★',
            'string2|3': 'value',

            'number1|+1': 100,
            'number2|1-100': 100,
            'number3|1-100.1-10': 1,
            'number4|123.1-10': 1,
            'number5|123.3': 1,
            'number6|123.10': 1.123,

            'boolean1|1': true,
            'boolean2|1-2': true,

            'object1|2-4': {
                '110000': '北京市',
                '120000': '天津市',
                '130000': '河北省',
                '140000': '山西省'
            },
            'object2|2': {
                '310000': '上海市',
                '320000': '江苏省',
                '330000': '浙江省',
                '340000': '安徽省'
            },

            'array1|1': ['AMD', 'CMD', 'KMD', 'UMD'],
            'array2|1-10': ['Mock.js'],
            'array3|3': ['Mock.js'],
            'array4|1-10': [{
                'name|+1': ['Hello', 'Mock.js', '!']
            }],

            'function': function _function() {
                return this.title;
            },

            'regexp1': /[a-z][A-Z][0-9]/,
            'regexp2': /\w\W\s\S\d\D/,
            'regexp3': /\d{5,10}/,

            'nested': {
                a: {
                    b: {
                        c: 'Mock.js'
                    }
                }
            },
            'absolutePath': '@/title @/nested/a/b/c',
            'relativePath': {
                a: {
                    b: {
                        c: '@../../../nested/a/b/c'
                    }
                }
            }
        };

        it('', function () {
            var data = Mock.mock(tpl);
            this.test.title += JSON.stringify(data /*, null, 4*/);
            expect(data).to.be.a('object');
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QubW9jay5zcGVjLmR0ZC5qcyJdLCJuYW1lcyI6WyJleHBlY3QiLCJjaGFpIiwiTW9jayIsIiQiLCJfIiwiZGVzY3JpYmUiLCJiZWZvcmUiLCJkb25lIiwicmVxdWlyZSIsImFyZ3VtZW50cyIsInRvIiwibm90IiwiZXF1YWwiLCJ1bmRlZmluZWQiLCJpdCIsImRhdGEiLCJtb2NrIiwidGVzdCIsInRpdGxlIiwiZGVlcCIsIm5hbWUiLCJoYXZlIiwibGVuZ3RoIiwid2l0aGluIiwiYmUiLCJhIiwidGhhdCIsImxpc3QiLCJhbiIsIndpdGgiLCJlYWNoIiwiaXRlbSIsImluZGV4IiwicHJvcGVydHkiLCJSRV9GTE9BVCIsInZhbGlkTnVtYmVyIiwibnVtYmVyIiwibWluIiwibWF4IiwiZG1pbiIsImRtYXgiLCJsYXN0SW5kZXgiLCJwYXJ0cyIsImV4ZWMiLCJtZXRob2RzIiwiR0VUIiwiUE9TVCIsIkhFQUQiLCJQVVQiLCJERUxFVEUiLCJtZXRob2RDb3VudCIsInRwbCIsImtleXMiLCJSYW5kb20iLCJpbnRlZ2VyIiwiTWF0aCIsImNvdW50IiwidmFsdWUiLCJmb28iLCJiYXIiLCJmb29iYXIiLCJpIiwiaW5jbHVkZSIsIm1ldGhvZCIsInBsdWNrIiwicHJvcCIsIm5hbWUyIiwibmFtZTQiLCJmaXJzdCIsInNlY29uZCIsInRoaXJkIiwidmFsaWRSZWdFeHAiLCJyZWdleHAiLCJ0cnVlIiwiYiIsImMiLCJKU09OIiwic3RyaW5naWZ5Il0sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0JBLElBQUlBLFNBQVNDLEtBQUtELE1BQWxCO0FBQ0EsSUFBSUUsSUFBSixFQUFVQyxDQUFWLEVBQWFDLENBQWI7O0FBRUFDLFNBQVMsS0FBVCxFQUFnQixZQUFXO0FBQ3ZCQyxXQUFPLFVBQVNDLElBQVQsRUFBZTtBQUNsQkMsZ0JBQVEsQ0FBQyxNQUFELEVBQVMsWUFBVCxFQUF1QixRQUF2QixDQUFSLEVBQTBD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WiwyQkFBVyxDQUFDLE9BQUQsRUFBVSxTQUFWLEVBQXFCLEdBQXJCO0FBREMsYUFBRCxDQWhDVDs7QUFvQ04sd0JBQVkscUJBQVc7QUFDbkIsdUJBQU8sS0FBS2pDLEtBQVo7QUFDSCxhQXRDSzs7QUF3Q04sdUJBQVcsaUJBeENMO0FBeUNOLHVCQUFXLGNBekNMO0FBMENOLHVCQUFXLFVBMUNMOztBQTRDTixzQkFBVTtBQUNOTyxtQkFBRztBQUNDaUQsdUJBQUc7QUFDQ0MsMkJBQUc7QUFESjtBQURKO0FBREcsYUE1Q0o7QUFtRE4sNEJBQWdCLHdCQW5EVjtBQW9ETiw0QkFBZ0I7QUFDWmxELG1CQUFHO0FBQ0NpRCx1QkFBRztBQUNDQywyQkFBRztBQURKO0FBREo7QUFEUztBQXBEVixTQUFWOztBQTZEQTdELFdBQUcsRUFBSCxFQUFPLFlBQVc7QUFDZCxnQkFBSUMsT0FBT2IsS0FBS2MsSUFBTCxDQUFVbUMsR0FBVixDQUFYO0FBQ0EsaUJBQUtsQyxJQUFMLENBQVVDLEtBQVYsSUFBbUIwRCxLQUFLQyxTQUFMLENBQWU5RCxJQUFmLENBQW9CLGFBQXBCLENBQW5CO0FBQ0FmLG1CQUFPZSxJQUFQLEVBQWFMLEVBQWIsQ0FBZ0JjLEVBQWhCLENBQW1CQyxDQUFuQixDQUFxQixRQUFyQjtBQUNILFNBSkQ7QUFLSCxLQW5FRDtBQW9FSCxDQXZvQkQiLCJmaWxlIjoidGVzdC5tb2NrLnNwZWMuZHRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHJlcXVpcmUsIGNoYWksIGRlc2NyaWJlLCBiZWZvcmUsIGl0ICovXG4vLyDmlbDmja7mqKHmnb/lrprkuYnvvIhEYXRhIFRlbWFwbHRlIERlZmluaXRpb27vvIxEVETvvIlcbi8qXG4gICAgIyMgQkREXG4gICAgMS4g57uT5p6EIFxuICAgICAgICBkZXNjcmliZSBzdWl0ZVxuICAgICAgICAgICAgWyBkZXNjcmliZSBdXG4gICAgICAgICAgICBiZWZvcmUgYWZ0ZXIgYmVmb3JlRWFjaCBhZnRlckVhY2hcbiAgICAgICAgICAgIGl0IHRlc3RcbiAgICAgICAgZG9uZVxuICAgICAgICAgICAg5pCc57SiIHRoaXMuYXN5bmMgPSBmbiAmJiBmbi5sZW5ndGhcbiAgICAyLiDluLjnlKggZXhwZWN0XG4gICAgICAgIGV4cGVjdCgpLnRvXG4gICAgICAgICAgICAuZXF1YWwgLmRlZXAuZXF1YWwgLm5vdC5lcXVhbFxuICAgICAgICAgICAgLm1hdGNoXG4gICAgICAgICAgICAuaGF2ZS5sZW5ndGggLndpdGgubGVuZ3RoXG4gICAgICAgICAgICAuaGF2ZS5wcm9wZXJ0eSAuaGF2ZS5kZWVwLnByb3BlcnR5XG4gICAgICAgICAgICAudG8uYmUuYSAudG8uYmUuYW5cbiAgICAgICAgICAgIC50aGF0XG4gICAgICAgICAgICAubGVhc3QgLm1vc3QgLndpdGhpblxuICAgIDMuIOmAn+W6piBcbiAgICAgICAg5pCc57SiIHRlc3Quc3BlZWRcbiAgICAgICAgc2xvdyA+IDc1XG4gICAgICAgIDc1IC8gMiA8IG1lZGl1bSA8IDc1XG4gICAgICAgIGZhc3QgPCA3NSAvIDJcbiAqL1xudmFyIGV4cGVjdCA9IGNoYWkuZXhwZWN0XG52YXIgTW9jaywgJCwgX1xuXG5kZXNjcmliZSgnRFREJywgZnVuY3Rpb24oKSB7XG4gICAgYmVmb3JlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgcmVxdWlyZShbJ21vY2snLCAndW5kZXJzY29yZScsICdqcXVlcnknXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBNb2NrID0gYXJndW1lbnRzWzBdXG4gICAgICAgICAgICBfID0gYXJndW1lbnRzWzFdXG4gICAgICAgICAgICAkID0gYXJndW1lbnRzWzJdXG4gICAgICAgICAgICBleHBlY3QoTW9jaykudG8ubm90LmVxdWFsKHVuZGVmaW5lZClcbiAgICAgICAgICAgIGV4cGVjdChfKS50by5ub3QuZXF1YWwodW5kZWZpbmVkKVxuICAgICAgICAgICAgZXhwZWN0KCQpLnRvLm5vdC5lcXVhbCh1bmRlZmluZWQpXG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIGRlc2NyaWJlKCdMaXRlcmFsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHRoaXMudGVzdC50aXRsZSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5lcXVhbCh0aGlzLnRlc3QudGl0bGUpXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCdmb28nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHRoaXMudGVzdC50aXRsZSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5lcXVhbCh0aGlzLnRlc3QudGl0bGUpXG4gICAgICAgIH0pXG4gICAgICAgIGl0KDEsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBNb2NrLm1vY2sodGhpcy50ZXN0LnRpdGxlKVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmVxdWFsKHRoaXMudGVzdC50aXRsZSlcbiAgICAgICAgfSlcbiAgICAgICAgaXQodHJ1ZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh0aGlzLnRlc3QudGl0bGUpXG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uZXF1YWwodGhpcy50ZXN0LnRpdGxlKVxuICAgICAgICB9KVxuICAgICAgICBpdChmYWxzZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh0aGlzLnRlc3QudGl0bGUpXG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uZXF1YWwodGhpcy50ZXN0LnRpdGxlKVxuICAgICAgICB9KVxuICAgICAgICBpdCh7fSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh0aGlzLnRlc3QudGl0bGUpXG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uZGVlcC5lcXVhbCh0aGlzLnRlc3QudGl0bGUpXG4gICAgICAgIH0pXG4gICAgICAgIGl0KFtdLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHRoaXMudGVzdC50aXRsZSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5kZWVwLmVxdWFsKHRoaXMudGVzdC50aXRsZSlcbiAgICAgICAgfSlcbiAgICAgICAgaXQoZnVuY3Rpb24oKSB7fSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh0aGlzLnRlc3QudGl0bGUpXG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uZXF1YWwodW5kZWZpbmVkKVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgZGVzY3JpYmUoJ1N0cmluZycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBgJ25hbWV8bWluLW1heCc6ICd2YWx1ZSdgXG4gICAgICAgIGl0KCduYW1lfG1pbi1tYXgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwxLTEwJzogJ+KYheWPtydcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBleHBlY3QoZGF0YS5uYW1lKS50by5oYXZlLmxlbmd0aC53aXRoaW4oMiwgMjApXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gYCduYW1lfGNvdW50JzogJ3ZhbHVlJ2BcbiAgICAgICAgaXQoJ25hbWV8Y291bnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwxMCc6ICfimIXlj7cnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEubmFtZSkudG8uYmUuYSgnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAudGhhdC5oYXZlLmxlbmd0aCgyMClcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIGRlc2NyaWJlKCdOdW1iZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gYCduYW1lfCtzdGVwJzogdmFsdWVgXG4gICAgICAgIGl0KCduYW1lfCtzdGVwJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh7XG4gICAgICAgICAgICAgICAgJ2xpc3R8MTAnOiBbe1xuICAgICAgICAgICAgICAgICAgICAnbmFtZXwrMSc6IDEwMFxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEubGlzdCkudG8uYmUuYW4oJ2FycmF5Jykud2l0aC5sZW5ndGgoMTApXG4gICAgICAgICAgICBfLmVhY2goZGF0YS5saXN0LCBmdW5jdGlvbihpdGVtLCBpbmRleCkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChpdGVtKS50by5oYXZlLnByb3BlcnR5KCduYW1lJylcbiAgICAgICAgICAgICAgICAgICAgLnRoYXQuYmUuYSgnbnVtYmVyJylcbiAgICAgICAgICAgICAgICBpZiAoaW5kZXggPT09IDApIGV4cGVjdChpdGVtLm5hbWUpLnRvLmVxdWFsKDEwMClcbiAgICAgICAgICAgICAgICBlbHNlIGV4cGVjdChpdGVtLm5hbWUpLnRvLmVxdWFsKFxuICAgICAgICAgICAgICAgICAgICBkYXRhLmxpc3RbaW5kZXggLSAxXS5uYW1lICsgMVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gYCduYW1lfG1pbi1tYXgnOiB2YWx1ZWBcbiAgICAgICAgaXQoJ25hbWV8bWluLW1heCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBNb2NrLm1vY2soe1xuICAgICAgICAgICAgICAgICduYW1lfDEtMTAwJzogMTAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmhhdmUucHJvcGVydHkoJ25hbWUnKVxuICAgICAgICAgICAgICAgIC50aGF0LmJlLmEoJ251bWJlcicpLndpdGhpbigxLCAxMDApXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCduYW1lfG1heC1taW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwxMDAtMSc6IDEwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCduYW1lJylcbiAgICAgICAgICAgICAgICAudGhhdC5iZS5hKCdudW1iZXInKS53aXRoaW4oMSwgMTAwKVxuICAgICAgICB9KVxuICAgICAgICBpdCgnbmFtZXwtbWluLS1tYXgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwtMTAwLS0xJzogMTAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmhhdmUucHJvcGVydHkoJ25hbWUnKVxuICAgICAgICAgICAgICAgIC50aGF0LmJlLmEoJ251bWJlcicpLndpdGhpbigtMTAwLCAtMSlcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ25hbWV8LW1heC0tbWluJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh7XG4gICAgICAgICAgICAgICAgJ25hbWV8LTEtLTEwMCc6IDEwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCduYW1lJylcbiAgICAgICAgICAgICAgICAudGhhdC5iZS5hKCdudW1iZXInKS53aXRoaW4oLTEwMCwgLTEpXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCduYW1lfG1pbi1taW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwxMC0xMCc6IDEwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCduYW1lJylcbiAgICAgICAgICAgICAgICAudGhhdC5iZS5hKCdudW1iZXInKS5lcXVhbCgxMClcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ25hbWV8Y291bnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwxMCc6IDEwMFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCduYW1lJylcbiAgICAgICAgICAgICAgICAudGhhdC5iZS5hKCdudW1iZXInKS5lcXVhbCgxMClcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBgJ25hbWV8bWluLW1heC5kbWluLWRtYXgnOiB2YWx1ZWBcblxuICAgICAgICAvLyAxIOaVtOaVsOmDqOWIhiAyIOWwj+aVsOmDqOWIhlxuICAgICAgICB2YXIgUkVfRkxPQVQgPSAvKFtcXCtcXC1dP1xcZCspXFwuPyhcXGQrKT8vXG5cbiAgICAgICAgZnVuY3Rpb24gdmFsaWROdW1iZXIobnVtYmVyLCBtaW4sIG1heCwgZG1pbiwgZG1heCkge1xuICAgICAgICAgICAgZXhwZWN0KG51bWJlcikudG8uYmUuYSgnbnVtYmVyJylcbiAgICAgICAgICAgIFJFX0ZMT0FULmxhc3RJbmRleCA9IDBcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IFJFX0ZMT0FULmV4ZWMoJycgKyBudW1iZXIpXG4gICAgICAgICAgICBleHBlY3QoK3BhcnRzWzFdKS50by5iZS5hKCdudW1iZXInKS53aXRoaW4obWluLCBtYXgpXG4gICAgICAgICAgICBleHBlY3QocGFydHNbMl0pLnRvLmhhdmUubGVuZ3RoLndpdGhpbihkbWluLCBkbWF4KVxuICAgICAgICB9XG5cbiAgICAgICAgaXQoJ25hbWV8bWluLW1heC5kbWluLWRtYXgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwxLTEwLjEtMTAnOiAxMjMuNDU2XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdmFsaWROdW1iZXIoZGF0YS5uYW1lLCAxLCAxMCwgMSwgMTApXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCduYW1lfG1pbi1tYXguZGNvdW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh7XG4gICAgICAgICAgICAgICAgJ25hbWV8MS0xMC4xMCc6IDEyMy40NTZcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB2YWxpZE51bWJlcihkYXRhLm5hbWUsIDEsIDEwLCAxMCwgMTApXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCduYW1lfGNvdW50LmRtaW4tZG1heCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBNb2NrLm1vY2soe1xuICAgICAgICAgICAgICAgICduYW1lfDEwLjEtMTAnOiAxMjMuNDU2XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdmFsaWROdW1iZXIoZGF0YS5uYW1lLCAxMCwgMTAsIDEsIDEwKVxuICAgICAgICB9KVxuICAgICAgICBpdCgnbmFtZXxjb3VudC5kY291bnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwxMC4xMCc6IDEyMy40NTZcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB2YWxpZE51bWJlcihkYXRhLm5hbWUsIDEwLCAxMCwgMTAsIDEwKVxuICAgICAgICB9KVxuICAgICAgICBpdCgnbmFtZXwuZG1pbi1kbWF4JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh7XG4gICAgICAgICAgICAgICAgJ25hbWV8LjEtMTAnOiAxMjMuNDU2XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdmFsaWROdW1iZXIoZGF0YS5uYW1lLCAxMjMsIDEyMywgMSwgMTApXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCduYW1lfC5kY291bnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwuMTAnOiAxMjMuNDU2XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgdmFsaWROdW1iZXIoZGF0YS5uYW1lLCAxMjMsIDEyMywgMTAsIDEwKVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgZGVzY3JpYmUoJ0Jvb2xlYW4nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gYCduYW1lfDEnOiB2YWx1ZWAgXG4gICAgICAgIGl0KCduYW1lfDEnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwxJzogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCduYW1lJylcbiAgICAgICAgICAgICAgICAudGhhdC5iZS5hKCdib29sZWFuJylcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBgJ25hbWV8bWluLW1heCc6IHZhbHVlYFxuICAgICAgICBpdCgnbmFtZXxtaW4tbWF4JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh7XG4gICAgICAgICAgICAgICAgJ25hbWV8OC0yJzogdHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCduYW1lJylcbiAgICAgICAgICAgICAgICAudGhhdC5iZS5hKCdib29sZWFuJylcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIGRlc2NyaWJlKCdPYmplY3QnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1ldGhvZHMgPSB7XG4gICAgICAgICAgICBHRVQ6ICdAVVJMJyxcbiAgICAgICAgICAgIFBPU1Q6ICdAVVJMJyxcbiAgICAgICAgICAgIEhFQUQ6ICdAVVJMJyxcbiAgICAgICAgICAgIFBVVDogJ0BVUkwnLFxuICAgICAgICAgICAgREVMRVRFOiAnQFVSTCdcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWV0aG9kQ291bnQsIHRwbCwgZGF0YVxuXG4gICAgICAgIC8vIGAnbmFtZXxtaW4tbWF4Jzoge31gXG4gICAgICAgIGl0KCduYW1lfG1pbi1tYXgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIG1ldGhvZENvdW50ID0gXy5rZXlzKG1ldGhvZHMpLmxlbmd0aCAvLyA1XG4gICAgICAgICAgICBmb3IgKHZhciBtaW4gPSAwLCBtYXg7IG1pbiA8PSBtZXRob2RDb3VudCArIDE7IG1pbisrKSB7XG4gICAgICAgICAgICAgICAgdHBsID0ge31cbiAgICAgICAgICAgICAgICBtYXggPSBNb2NrLlJhbmRvbS5pbnRlZ2VyKDAsIG1ldGhvZENvdW50KVxuXG4gICAgICAgICAgICAgICAgLy8gbWV0aG9kc3wwLT8gfDEtPyB8Mi0/IHwzLT8gfDQtPyB8NS0/IHw2LT9cbiAgICAgICAgICAgICAgICB0cGxbJ21ldGhvZHN8JyArIG1pbiArICctJyArIG1heF0gPSBtZXRob2RzXG4gICAgICAgICAgICAgICAgZGF0YSA9IE1vY2subW9jayh0cGwpXG4gICAgICAgICAgICAgICAgZXhwZWN0KF8ua2V5cyhkYXRhLm1ldGhvZHMpKS50by5oYXZlLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICAudGhhdC53aXRoaW4oTWF0aC5taW4obWluLCBtYXgpLCBNYXRoLm1heChtaW4sIG1heCkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gYCduYW1lfGNvdW50Jzoge31gXG4gICAgICAgIGl0KCduYW1lfGNvdW50JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZXRob2RDb3VudCA9IF8ua2V5cyhtZXRob2RzKS5sZW5ndGggLy8gNVxuICAgICAgICAgICAgZm9yICh2YXIgY291bnQgPSAwOyBjb3VudCA8PSBtZXRob2RDb3VudCArIDE7IGNvdW50KyspIHtcbiAgICAgICAgICAgICAgICB0cGwgPSB7fVxuICAgICAgICAgICAgICAgIHRwbFsnbWV0aG9kc3wnICsgY291bnRdID0gbWV0aG9kc1xuICAgICAgICAgICAgICAgIGRhdGEgPSBNb2NrLm1vY2sodHBsKVxuICAgICAgICAgICAgICAgIGV4cGVjdChfLmtleXMoZGF0YS5tZXRob2RzKSkudG8uaGF2ZS5sZW5ndGgoXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWluKGNvdW50LCBtZXRob2RDb3VudClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBkZXNjcmliZSgnQXJyYXknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gYCduYW1lJzogW3t9LCB7fSAuLi5dYFxuICAgICAgICBpdCgnbmFtZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gW3tcbiAgICAgICAgICAgICAgICBmb286ICdmb28nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgYmFyOiAnYmFyJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGZvb2JhcjogJ2Zvb2JhcidcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh7XG4gICAgICAgICAgICAgICAgbmFtZTogdmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uaGF2ZS5wcm9wZXJ0eSgnbmFtZScpXG4gICAgICAgICAgICAgICAgLnRoYXQuYmUuYW4oJ2FycmF5Jykud2l0aC5sZW5ndGgoMylcbiAgICAgICAgICAgICAgICAudGhhdC5ub3QuZXF1YWwodmFsdWUpXG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uaGF2ZS5wcm9wZXJ0eSgnbmFtZScpXG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS5uYW1lLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGRhdGEubmFtZVtpXSkudG8ubm90LmVxdWFsKHZhbHVlW2ldKVxuICAgICAgICAgICAgICAgIGV4cGVjdChkYXRhLm5hbWVbaV0pLnRvLmRlZXAuZXF1YWwodmFsdWVbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gYCduYW1lfDEnOiBbe30sIHt9IC4uLl1gXG4gICAgICAgIGl0KCduYW1lfDE6IFsxLCAyLCA0LCA4XScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gbnVtYmVyIGFycmF5XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBbMSwgMiwgNCwgOF1cbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwxJzogdmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uaGF2ZS5wcm9wZXJ0eSgnbmFtZScpXG4gICAgICAgICAgICAgICAgLnRoYXQuYmUuYSgnbnVtYmVyJylcbiAgICAgICAgICAgIGV4cGVjdCh2YWx1ZSkudG8uaW5jbHVkZShkYXRhLm5hbWUpXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCduYW1lfDE6IFtcIkdFVFwiLCBcIlBPU1RcIiwgXCJIRUFEXCIsIFwiREVMRVRFXCJdJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBzdHJpbmcgYXJyYXlcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IFsnR0VUJywgJ1BPU1QnLCAnSEVBRCcsICdERUxFVEUnXVxuICAgICAgICAgICAgdmFyIGRhdGEgPSBNb2NrLm1vY2soe1xuICAgICAgICAgICAgICAgICduYW1lfDEnOiB2YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCduYW1lJylcbiAgICAgICAgICAgICAgICAudGhhdC5iZS5hKCdzdHJpbmcnKVxuICAgICAgICAgICAgZXhwZWN0KHZhbHVlKS50by5pbmNsdWRlKGRhdGEubmFtZSlcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ25hbWV8MSBbe31dJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBvYmplY3QgYXJyYXlcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IFt7fV1cbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwxJzogdmFsdWVcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uaGF2ZS5wcm9wZXJ0eSgnbmFtZScpXG4gICAgICAgICAgICAgICAgLnRoYXQuYmUuYSgnb2JqZWN0JylcbiAgICAgICAgICAgICAgICAudGhhdC5kZWVwLmVxdWFsKHt9KVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEubmFtZSkudG8ubm90LmVxdWFsKHZhbHVlWzBdKVxuICAgICAgICB9KVxuICAgICAgICBpdCgnbmFtZXwxIFt7fSwge30sIHt9XScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gb2JqZWN0IGFycmF5XG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh7XG4gICAgICAgICAgICAgICAgJ25hbWV8MSc6IFt7fSwge30sIHt9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCduYW1lJylcbiAgICAgICAgICAgICAgICAudGhhdC5iZS5hKCdvYmplY3QnKVxuICAgICAgICAgICAgICAgIC50aGF0LmRlZXAuZXF1YWwoe30pXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCduYW1lfDEgW3t9LCB7fSwge31dJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBvYmplY3QgYXJyYXlcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IFt7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnSEVBRCdcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnXG4gICAgICAgICAgICB9XVxuICAgICAgICAgICAgdmFyIGRhdGEgPSBNb2NrLm1vY2soe1xuICAgICAgICAgICAgICAgICduYW1lfDEnOiB2YWx1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCduYW1lJylcbiAgICAgICAgICAgICAgICAudGhhdC5iZS5hKCdvYmplY3QnKVxuICAgICAgICAgICAgICAgIC50aGF0LmhhdmUucHJvcGVydHkoJ21ldGhvZCcpXG4gICAgICAgICAgICAgICAgLnRoYXQuYmUuYSgnc3RyaW5nJylcbiAgICAgICAgICAgIGV4cGVjdChfLnBsdWNrKHZhbHVlLCAnbWV0aG9kJykpLmluY2x1ZGUoZGF0YS5uYW1lLm1ldGhvZClcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBgJ25hbWV8KzEnOiBbe30sIHt9IC4uLl1gXG4gICAgICAgIGl0KCduYW1lfCsxOiBbXCJhXCIsIFwiYlwiLCBcImNcIl0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbGlzdHw1JzogW3tcbiAgICAgICAgICAgICAgICAgICAgJ25hbWV8KzEnOiBbJ2EnLCAnYicsICdjJ11cbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCdsaXN0JylcbiAgICAgICAgICAgICAgICAudGhhdC5iZS5hbignYXJyYXknKS53aXRoLmxlbmd0aCg1KVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEubGlzdFswXS5uYW1lKS50by5lcXVhbCgnYScpXG4gICAgICAgICAgICBleHBlY3QoZGF0YS5saXN0WzFdLm5hbWUpLnRvLmVxdWFsKCdiJylcbiAgICAgICAgICAgIGV4cGVjdChkYXRhLmxpc3RbMl0ubmFtZSkudG8uZXF1YWwoJ2MnKVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEubGlzdFszXS5uYW1lKS50by5lcXVhbCgnYScpXG4gICAgICAgICAgICBleHBlY3QoZGF0YS5saXN0WzRdLm5hbWUpLnRvLmVxdWFsKCdiJylcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ25hbWV8KzE6IFtcIkBpbnRlZ2VyXCIsIFwiQGVtYWlsXCIsIFwiQGJvb2xlYW5cIl0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbGlzdHw1LTEwJzogW3tcbiAgICAgICAgICAgICAgICAgICAgJ25hbWV8KzEnOiBbJ0BpbnRlZ2VyJywgJ0BlbWFpbCcsICdAYm9vbGVhbiddXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uaGF2ZS5wcm9wZXJ0eSgnbGlzdCcpXG4gICAgICAgICAgICAgICAgLnRoYXQuYmUuYW4oJ2FycmF5JykuaGF2ZS5sZW5ndGgud2l0aGluKDUsIDEwKVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEubGlzdFswXS5uYW1lKS50by5iZS5hKCdudW1iZXInKVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEubGlzdFsxXS5uYW1lKS50by5iZS5hKCdzdHJpbmcnKVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEubGlzdFsyXS5uYW1lKS50by5iZS5hKCdib29sZWFuJylcbiAgICAgICAgICAgIGV4cGVjdChkYXRhLmxpc3RbM10ubmFtZSkudG8uYmUuYSgnbnVtYmVyJylcbiAgICAgICAgICAgIGV4cGVjdChkYXRhLmxpc3RbNF0ubmFtZSkudG8uYmUuYSgnc3RyaW5nJylcbiAgICAgICAgfSlcblxuICAgICAgICAvLyBgJ25hbWV8bWluLW1heCc6IFt7fSwge30gLi4uXWBcbiAgICAgICAgaXQoJ25hbWV8bWluLW1pbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBNb2NrLm1vY2soe1xuICAgICAgICAgICAgICAgICduYW1lfDEtMSc6IFt7fV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBleHBlY3QoZGF0YS5uYW1lKS50by5iZS5hbignYXJyYXknKS53aXRoLmxlbmd0aCgxKVxuICAgICAgICAgICAgXy5lYWNoKGRhdGEubmFtZSwgZnVuY3Rpb24oaXRlbSAvKiwgaW5kZXgqLyApIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoaXRlbSkudG8uZGVlcC5lcXVhbCh7fSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCduYW1lfG1pbi1tYXggW3t9XScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBNb2NrLm1vY2soe1xuICAgICAgICAgICAgICAgICduYW1lfDEtMTAnOiBbe31dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEubmFtZSkudG8uYmUuYW4oJ2FycmF5Jykud2l0aC5sZW5ndGgud2l0aGluKDEsIDEwKVxuICAgICAgICAgICAgXy5lYWNoKGRhdGEubmFtZSwgZnVuY3Rpb24oaXRlbSAvKiwgaW5kZXgqLyApIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoaXRlbSkudG8uZGVlcC5lcXVhbCh7fSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCduYW1lfG1heC1taW4gW3t9XScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBNb2NrLm1vY2soe1xuICAgICAgICAgICAgICAgICduYW1lfDEwLTEnOiBbe31dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEubmFtZSkudG8uYmUuYW4oJ2FycmF5Jykud2l0aC5sZW5ndGgud2l0aGluKDEsIDEwKVxuICAgICAgICAgICAgXy5lYWNoKGRhdGEubmFtZSwgZnVuY3Rpb24oaXRlbSAvKiwgaW5kZXgqLyApIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoaXRlbSkudG8uZGVlcC5lcXVhbCh7fSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCduYW1lfG1pbi1tYXggW3t9LCB7fV0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAnbmFtZXwxLTEwJzogW3t9LCB7fV1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBleHBlY3QoZGF0YS5uYW1lKS50by5iZS5hbignYXJyYXknKS53aXRoLmxlbmd0aC53aXRoaW4oMiwgMjApXG4gICAgICAgICAgICBfLmVhY2goZGF0YS5uYW1lLCBmdW5jdGlvbihpdGVtIC8qLCBpbmRleCovICkge1xuICAgICAgICAgICAgICAgIGV4cGVjdChpdGVtKS50by5kZWVwLmVxdWFsKHt9KVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ25hbWV8bWF4LW1pbiBbe30sIHt9XScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBNb2NrLm1vY2soe1xuICAgICAgICAgICAgICAgICduYW1lfDEwLTEnOiBbe30sIHt9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhLm5hbWUpLnRvLmJlLmFuKCdhcnJheScpLndpdGgubGVuZ3RoLndpdGhpbigyLCAyMClcbiAgICAgICAgICAgIF8uZWFjaChkYXRhLm5hbWUsIGZ1bmN0aW9uKGl0ZW0gLyosIGluZGV4Ki8gKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KGl0ZW0pLnRvLmRlZXAuZXF1YWwoe30pXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIGAnbmFtZXxjb3VudCc6IFt7fSwge30gLi4uXWBcbiAgICAgICAgaXQoJ25hbWV8Y291bnQgW3t9XScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBNb2NrLm1vY2soe1xuICAgICAgICAgICAgICAgICduYW1lfDEwJzogW3t9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhLm5hbWUpLnRvLmJlLmFuKCdhcnJheScpLndpdGgubGVuZ3RoKDEwKVxuICAgICAgICAgICAgXy5lYWNoKGRhdGEubmFtZSwgZnVuY3Rpb24oaXRlbSAvKiwgaW5kZXgqLyApIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoaXRlbSkudG8uZGVlcC5lcXVhbCh7fSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICAgIGl0KCduYW1lfGNvdW50IFt7fSwge31dJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh7XG4gICAgICAgICAgICAgICAgJ25hbWV8MTAnOiBbe30sIHt9XVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhLm5hbWUpLnRvLmJlLmFuKCdhcnJheScpLndpdGgubGVuZ3RoKDIwKVxuICAgICAgICAgICAgXy5lYWNoKGRhdGEubmFtZSwgZnVuY3Rpb24oaXRlbSAvKiwgaW5kZXgqLyApIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoaXRlbSkudG8uZGVlcC5lcXVhbCh7fSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBkZXNjcmliZSgnRnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gYCduYW1lJzogZnVuY3Rpb24oKXt9YFxuICAgICAgICBpdCgnbmFtZTogZnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICBwcm9wOiAnaGVsbG8nLFxuICAgICAgICAgICAgICAgIG5hbWU6IGZ1bmN0aW9uKCAvKnJvb3QsIHBhdGgqLyApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uaGF2ZS5wcm9wZXJ0eSgnbmFtZScpXG4gICAgICAgICAgICAgICAgLnRoYXQuYmUuYSgnc3RyaW5nJykuZXF1YWwoJ2hlbGxvJylcbiAgICAgICAgfSlcblxuICAgICAgICAvLyDml6Dluo/nmoQgZnVuY3Rpb25cbiAgICAgICAgaXQoJ25hbWU6IGZ1bmN0aW9uJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IE1vY2subW9jayh7XG4gICAgICAgICAgICAgICAgbmFtZTI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wICogMlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJvcDogMSxcbiAgICAgICAgICAgICAgICBuYW1lNDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3AgKiA0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhLm5hbWUyKS50by5lcXVhbCgyKVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEubmFtZTQpLnRvLmVxdWFsKDQpXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gIzI1IOaUueWPmOS6humdnuWHveaVsOWxnuaAp+eahOmhuuW6j++8jOafpeaJvui1t+adpeS4jeaWueS+v1xuICAgICAgICBpdCgnbmFtZTogZnVuY3Rpb24nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBmdW5jdGlvbigpIHt9LFxuICAgICAgICAgICAgICAgIGZpcnN0OiAnJyxcbiAgICAgICAgICAgICAgICBzZWNvbmQ6ICcnLFxuICAgICAgICAgICAgICAgIHRoaXJkOiAnJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIHZhciBrZXlzID0gXy5rZXlzKGRhdGEpXG4gICAgICAgICAgICBleHBlY3Qoa2V5c1swXSkuZXF1YWwoJ2ZpcnN0JylcbiAgICAgICAgICAgIGV4cGVjdChrZXlzWzFdKS5lcXVhbCgnc2Vjb25kJylcbiAgICAgICAgICAgIGV4cGVjdChrZXlzWzJdKS5lcXVhbCgndGhpcmQnKVxuICAgICAgICAgICAgZXhwZWN0KGtleXNbM10pLmVxdWFsKCduYW1lJylcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgLypcbiAgICAgICAg5oyJ54WnIGh0dHA6Ly93d3cucmVnZXhyLmNvbS8g55qEIFJlZmVyZW5jZSDorr7orqHmtYvor5XnlKjkvovjgIJcbiAgICAgICAgaHR0cHM6Ly9naXRodWIuY29tL251eXNvZnQvTW9jay9ibG9iLzdjMWUzYTY4NmJjYzUxNTg1NWYxZjU4M2Q3MGFlMGVlODlhY2M2NWUvdGVzdC9yZWdleHAuanMjTDEyMFxuICAgICAqL1xuICAgIGRlc2NyaWJlKCdSZWdFeHAnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZnVuY3Rpb24gdmFsaWRSZWdFeHAocmVnZXhwKSB7XG4gICAgICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YWxpZFJlZ0V4cChhcmd1bWVudHNbaV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdChyZWdleHAsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHJlZ2V4cClcbiAgICAgICAgICAgICAgICB0aGlzLnRlc3QudGl0bGUgKz0gJyA9PiAnICsgZGF0YVxuICAgICAgICAgICAgICAgIGV4cGVjdChyZWdleHAudGVzdChkYXRhKSkudG8uYmUudHJ1ZVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIGRlc2NyaWJlKCdDaGFyYWN0ZXIgQ2xhc3NlcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFsaWRSZWdFeHAoLy4vKVxuICAgICAgICAgICAgdmFsaWRSZWdFeHAoXG4gICAgICAgICAgICAgICAgL1thLXpdLyxcbiAgICAgICAgICAgICAgICAvW0EtWl0vLFxuICAgICAgICAgICAgICAgIC9bMC05XS9cbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIHZhbGlkUmVnRXhwKFxuICAgICAgICAgICAgICAgIC9cXHcvLFxuICAgICAgICAgICAgICAgIC9cXFcvLFxuICAgICAgICAgICAgICAgIC9cXHMvLFxuICAgICAgICAgICAgICAgIC9cXFMvLFxuICAgICAgICAgICAgICAgIC9cXGQvLFxuICAgICAgICAgICAgICAgIC9cXEQvXG4gICAgICAgICAgICApXG4gICAgICAgICAgICB2YWxpZFJlZ0V4cChcbiAgICAgICAgICAgICAgICAvWy5dLyxcbiAgICAgICAgICAgICAgICAvW1xcd10vLFxuICAgICAgICAgICAgICAgIC9bXFxXXS8sXG4gICAgICAgICAgICAgICAgL1tcXHNdLyxcbiAgICAgICAgICAgICAgICAvW1xcU10vLFxuICAgICAgICAgICAgICAgIC9bXFxkXS8sXG4gICAgICAgICAgICAgICAgL1tcXERdL1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgdmFsaWRSZWdFeHAoXG4gICAgICAgICAgICAgICAgL1teLl0vLFxuICAgICAgICAgICAgICAgIC9bXlxcd10vLFxuICAgICAgICAgICAgICAgIC9bXlxcV10vLFxuICAgICAgICAgICAgICAgIC9bXlxcc10vLFxuICAgICAgICAgICAgICAgIC9bXlxcU10vLFxuICAgICAgICAgICAgICAgIC9bXlxcZF0vLFxuICAgICAgICAgICAgICAgIC9bXlxcRF0vXG4gICAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICAgIGRlc2NyaWJlKCdRdWFudGlmaWVycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFsaWRSZWdFeHAoXG4gICAgICAgICAgICAgICAgL1xcZD8vLFxuICAgICAgICAgICAgICAgIC9cXGQrLyxcbiAgICAgICAgICAgICAgICAvXFxkKi9cbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgLy8ge259LCB7bix9LCB7bixtfSwgezAsMX0gPywgezEsMH0gKywgezAsfSAqXG4gICAgICAgICAgICB2YWxpZFJlZ0V4cChcbiAgICAgICAgICAgICAgICAvXFxkezV9LyxcbiAgICAgICAgICAgICAgICAvXFxkezUsfS8sXG4gICAgICAgICAgICAgICAgL1xcZHs1LDEwfS8sXG4gICAgICAgICAgICAgICAgL1xcZHswLDF9LyxcbiAgICAgICAgICAgICAgICAvXFxkezAsfS9cbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgdmFsaWRSZWdFeHAoL1tcXHU0RTAwLVxcdTlGQTVdKy8pIC8vIOaxieWtl1xuICAgICAgICB9KVxuICAgICAgICBkZXNjcmliZSgnQW5jaG9ycycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFsaWRSZWdFeHAoL14vKVxuICAgICAgICAgICAgdmFsaWRSZWdFeHAoLyQvKVxuICAgICAgICAgICAgdmFsaWRSZWdFeHAoL15mb28vKVxuICAgICAgICAgICAgdmFsaWRSZWdFeHAoL2ZvbyQvKVxuICAgICAgICAgICAgdmFsaWRSZWdFeHAoL1xcYmZvby8pXG4gICAgICAgICAgICB2YWxpZFJlZ0V4cCgvXFxCZm9vLylcbiAgICAgICAgfSlcblxuICAgICAgICBkZXNjcmliZSgnRXNjYXBlZCBDaGFyYWN0ZXJzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YWxpZFJlZ0V4cCgvXFwwMDAvKVxuICAgICAgICAgICAgdmFsaWRSZWdFeHAoL1xceEZGLylcbiAgICAgICAgICAgIHZhbGlkUmVnRXhwKC9cXHVGRkZGLylcbiAgICAgICAgICAgIHZhbGlkUmVnRXhwKC9cXGNJLylcbiAgICAgICAgfSlcblxuICAgICAgICBkZXNjcmliZSgnR3JvdXBzICYgTG9va2Fyb3VuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFsaWRSZWdFeHAoLyhBQkMpLylcbiAgICAgICAgICAgIHZhbGlkUmVnRXhwKC8oQUJDKVxcMS8pXG4gICAgICAgICAgICB2YWxpZFJlZ0V4cCgvKD86QUJDKS8pXG4gICAgICAgICAgICB2YWxpZFJlZ0V4cCgvKD89QUJDKS8pXG4gICAgICAgICAgICB2YWxpZFJlZ0V4cCgvKD8hQUJDKS8pXG4gICAgICAgICAgICAgICAgLy8gdmFsaWRSZWdFeHAoLyg/PD1BQkMpLylcbiAgICAgICAgICAgICAgICAvLyB2YWxpZFJlZ0V4cCgvKD88IUFCQykvKVxuXG4gICAgICAgICAgICB2YWxpZFJlZ0V4cCgvKFxcZHs1LDEwfSl8KFthLXpBLVpdezUsMTB9KS8pXG4gICAgICAgICAgICB2YWxpZFJlZ0V4cCgvKD86XFxkezUsMTB9KXwoPzpbYS16QS1aXXs1LDEwfSkvKVxuICAgICAgICAgICAgdmFsaWRSZWdFeHAoLyguKShcXHcpKFxcVykoXFxzKShcXFMpKFxcZCkoXFxEKSxcXDFcXDJcXDNcXDRcXDVcXDZcXDcsXFwxXFwyXFwzXFw0XFw1XFw2XFw3LylcbiAgICAgICAgfSlcblxuICAgICAgICBkZXNjcmliZSgnUXVhbnRpZmllcnMgJiBBbHRlcm5hdGlvbicsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFsaWRSZWdFeHAoLy4rLylcbiAgICAgICAgICAgIHZhbGlkUmVnRXhwKC8uKi8pXG4gICAgICAgICAgICB2YWxpZFJlZ0V4cCgvLnsxLDN9LylcbiAgICAgICAgICAgIHZhbGlkUmVnRXhwKC8uPy8pXG4gICAgICAgICAgICB2YWxpZFJlZ0V4cCgvYXxiYy8pXG5cbiAgICAgICAgICAgIHZhbGlkUmVnRXhwKC9cXGR7NSwxMH18W2EtekEtWl17NSwxMH0vKVxuICAgICAgICB9KVxuXG4gICAgICAgIGRlc2NyaWJlKCdGbGFncycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gaWdub3JlQ2FzZVxuICAgICAgICAgICAgLy8gbXVsdGlsaW5lXG4gICAgICAgICAgICAvLyBnbG9iYWxcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ0NvbXBsZXgnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHRwbCA9IHtcbiAgICAgICAgICAgICd0aXRsZSc6ICdTeW50YXggRGVtbycsXG5cbiAgICAgICAgICAgICdzdHJpbmcxfDEtMTAnOiAn4piFJyxcbiAgICAgICAgICAgICdzdHJpbmcyfDMnOiAndmFsdWUnLFxuXG4gICAgICAgICAgICAnbnVtYmVyMXwrMSc6IDEwMCxcbiAgICAgICAgICAgICdudW1iZXIyfDEtMTAwJzogMTAwLFxuICAgICAgICAgICAgJ251bWJlcjN8MS0xMDAuMS0xMCc6IDEsXG4gICAgICAgICAgICAnbnVtYmVyNHwxMjMuMS0xMCc6IDEsXG4gICAgICAgICAgICAnbnVtYmVyNXwxMjMuMyc6IDEsXG4gICAgICAgICAgICAnbnVtYmVyNnwxMjMuMTAnOiAxLjEyMyxcblxuICAgICAgICAgICAgJ2Jvb2xlYW4xfDEnOiB0cnVlLFxuICAgICAgICAgICAgJ2Jvb2xlYW4yfDEtMic6IHRydWUsXG5cbiAgICAgICAgICAgICdvYmplY3QxfDItNCc6IHtcbiAgICAgICAgICAgICAgICAnMTEwMDAwJzogJ+WMl+S6rOW4gicsXG4gICAgICAgICAgICAgICAgJzEyMDAwMCc6ICflpKnmtKXluIInLFxuICAgICAgICAgICAgICAgICcxMzAwMDAnOiAn5rKz5YyX55yBJyxcbiAgICAgICAgICAgICAgICAnMTQwMDAwJzogJ+Wxseilv+ecgSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnb2JqZWN0MnwyJzoge1xuICAgICAgICAgICAgICAgICczMTAwMDAnOiAn5LiK5rW35biCJyxcbiAgICAgICAgICAgICAgICAnMzIwMDAwJzogJ+axn+iLj+ecgScsXG4gICAgICAgICAgICAgICAgJzMzMDAwMCc6ICfmtZnmsZ/nnIEnLFxuICAgICAgICAgICAgICAgICczNDAwMDAnOiAn5a6J5b6955yBJ1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgJ2FycmF5MXwxJzogWydBTUQnLCAnQ01EJywgJ0tNRCcsICdVTUQnXSxcbiAgICAgICAgICAgICdhcnJheTJ8MS0xMCc6IFsnTW9jay5qcyddLFxuICAgICAgICAgICAgJ2FycmF5M3wzJzogWydNb2NrLmpzJ10sXG4gICAgICAgICAgICAnYXJyYXk0fDEtMTAnOiBbe1xuICAgICAgICAgICAgICAgICduYW1lfCsxJzogWydIZWxsbycsICdNb2NrLmpzJywgJyEnXVxuICAgICAgICAgICAgfV0sXG5cbiAgICAgICAgICAgICdmdW5jdGlvbic6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRpdGxlXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAncmVnZXhwMSc6IC9bYS16XVtBLVpdWzAtOV0vLFxuICAgICAgICAgICAgJ3JlZ2V4cDInOiAvXFx3XFxXXFxzXFxTXFxkXFxELyxcbiAgICAgICAgICAgICdyZWdleHAzJzogL1xcZHs1LDEwfS8sXG5cbiAgICAgICAgICAgICduZXN0ZWQnOiB7XG4gICAgICAgICAgICAgICAgYToge1xuICAgICAgICAgICAgICAgICAgICBiOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjOiAnTW9jay5qcydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnYWJzb2x1dGVQYXRoJzogJ0AvdGl0bGUgQC9uZXN0ZWQvYS9iL2MnLFxuICAgICAgICAgICAgJ3JlbGF0aXZlUGF0aCc6IHtcbiAgICAgICAgICAgICAgICBhOiB7XG4gICAgICAgICAgICAgICAgICAgIGI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGM6ICdALi4vLi4vLi4vbmVzdGVkL2EvYi9jJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KCcnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gTW9jay5tb2NrKHRwbClcbiAgICAgICAgICAgIHRoaXMudGVzdC50aXRsZSArPSBKU09OLnN0cmluZ2lmeShkYXRhIC8qLCBudWxsLCA0Ki8gKVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLmEoJ29iamVjdCcpXG4gICAgICAgIH0pXG4gICAgfSlcbn0pIl19