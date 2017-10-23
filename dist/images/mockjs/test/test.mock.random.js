'use strict';

/* global require, chai, describe, before, it */
/* global window */
// 数据占位符定义（Data Placeholder Definition，DPD）
var expect = chai.expect;
var Mock, Random, $, _, Random;

/* jshint -W061 */
describe('Random', function () {
    before(function (done) {
        require(['mock', 'underscore', 'jquery'], function () {
            Mock = arguments[0];
            window.Random = Random = Mock.Random;
            _ = arguments[1];
            $ = arguments[2];
            expect(Mock).to.not.equal(undefined);
            expect(_).to.not.equal(undefined);
            expect($).to.not.equal(undefined);
            done();
        });
    });

    function stringify(json) {
        return JSON.stringify(json /*, null, 4*/);
    }

    function doit(expression, validator) {
        it('', function () {
            // for (var i = 0; i < 1; i++) {}
            var data = eval(expression);
            validator(data);
            this.test.title = stringify(expression) + ' => ' + stringify(data);
        });
    }

    describe('Basic', function () {
        doit('Random.boolean()', function (data) {
            expect(data).to.be.a('boolean');
        });

        doit('Random.natural()', function (data) {
            expect(data).to.be.a('number').within(0, 9007199254740992);
        });
        doit('Random.natural(1, 3)', function (data) {
            expect(data).to.be.a('number').within(1, 3);
        });
        doit('Random.natural(1)', function (data) {
            expect(data).to.be.a('number').least(1);
        });

        doit('Random.integer()', function (data) {
            expect(data).to.be.a('number').within(-9007199254740992, 9007199254740992);
        });
        doit('Random.integer(-10, 10)', function (data) {
            expect(data).to.be.a('number').within(-10, 10);
        });

        // 1 整数部分 2 小数部分
        var RE_FLOAT = /(\-?\d+)\.?(\d+)?/;

        function validFloat(float, min, max, dmin, dmax) {
            RE_FLOAT.lastIndex = 0;
            var parts = RE_FLOAT.exec(float + '');

            expect(+parts[1]).to.be.a('number').within(min, max);

            /* jshint -W041 */
            if (parts[2] != undefined) {
                expect(parts[2]).to.have.length.within(dmin, dmax);
            }
        }

        doit('Random.float()', function (data) {
            validFloat(data, -9007199254740992, 9007199254740992, 0, 17);
        });
        doit('Random.float(0)', function (data) {
            validFloat(data, 0, 9007199254740992, 0, 17);
        });
        doit('Random.float(60, 100)', function (data) {
            validFloat(data, 60, 100, 0, 17);
        });
        doit('Random.float(60, 100, 3)', function (data) {
            validFloat(data, 60, 100, 3, 17);
        });
        doit('Random.float(60, 100, 3, 5)', function (data) {
            validFloat(data, 60, 100, 3, 5);
        });

        var CHARACTER_LOWER = 'abcdefghijklmnopqrstuvwxyz';
        var CHARACTER_UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var CHARACTER_NUMBER = '0123456789';
        var CHARACTER_SYMBOL = '!@#$%^&*()[]';
        doit('Random.character()', function (data) {
            expect(data).to.be.a('string').with.length(1);
            expect(CHARACTER_LOWER + CHARACTER_UPPER + CHARACTER_NUMBER + CHARACTER_SYMBOL).to.include(data);
        });
        doit('Random.character("lower")', function (data) {
            expect(data).to.be.a('string').with.length(1);
            expect(CHARACTER_LOWER).to.include(data);
        });
        doit('Random.character("upper")', function (data) {
            expect(data).to.be.a('string').with.length(1);
            expect(CHARACTER_UPPER).to.include(data);
        });
        doit('Random.character("number")', function (data) {
            expect(data).to.be.a('string').with.length(1);
            expect(CHARACTER_NUMBER).to.include(data);
        });
        doit('Random.character("symbol")', function (data) {
            expect(data).to.be.a('string').with.length(1);
            expect(CHARACTER_SYMBOL).to.include(data);
        });
        doit('Random.character("aeiou")', function (data) {
            expect(data).to.be.a('string').with.length(1);
            expect('aeiou').to.include(data);
        });

        doit('Random.string()', function (data) {
            expect(data).to.be.a('string').with.length.within(3, 7);
        });
        doit('Random.string(5)', function (data) {
            expect(data).to.be.a('string').with.length(5);
        });
        doit('Random.string("lower", 5)', function (data) {
            expect(data).to.be.a('string').with.length(5);
            for (var i = 0; i < data.length; i++) {
                expect(CHARACTER_LOWER).to.include(data[i]);
            }
        });
        doit('Random.string(7, 10)', function (data) {
            expect(data).to.be.a('string').with.length.within(7, 10);
        });
        doit('Random.string("aeiou", 1, 3)', function (data) {
            expect(data).to.be.a('string').with.length.within(1, 3);
            for (var i = 0; i < data.length; i++) {
                expect('aeiou').to.include(data[i]);
            }
        });

        doit('Random.range(10)', function (data) {
            expect(data).to.be.an('array').with.length(10);
        });
        doit('Random.range(3, 7)', function (data) {
            expect(data).to.be.an('array').deep.equal([3, 4, 5, 6]);
        });
        doit('Random.range(1, 10, 2)', function (data) {
            expect(data).to.be.an('array').deep.equal([1, 3, 5, 7, 9]);
        });
        doit('Random.range(1, 10, 3)', function (data) {
            expect(data).to.be.an('array').deep.equal([1, 4, 7]);
        });

        var RE_DATE = /\d{4}-\d{2}-\d{2}/;
        var RE_TIME = /\d{2}:\d{2}:\d{2}/;
        var RE_DATETIME = new RegExp(RE_DATE.source + ' ' + RE_TIME.source);

        doit('Random.date()', function (data) {
            expect(RE_DATE.test(data)).to.be.true;
        });

        doit('Random.time()', function (data) {
            expect(RE_TIME.test(data)).to.be.true;
        });

        doit('Random.datetime()', function (data) {
            expect(RE_DATETIME.test(data)).to.be.true;
        });
        doit('Random.datetime("yyyy-MM-dd A HH:mm:ss")', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.datetime("yyyy-MM-dd a HH:mm:ss")', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.datetime("yy-MM-dd HH:mm:ss")', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.datetime("y-MM-dd HH:mm:ss")', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.datetime("y-M-d H:m:s")', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.datetime("yyyy yy y MM M dd d HH H hh h mm m ss s SS S A a T")', function (data) {
            expect(data).to.be.ok;
        });

        doit('Random.now()', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.now("year")', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.now("month")', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.now("day")', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.now("hour")', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.now("minute")', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.now("second")', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.now("week")', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.now("yyyy-MM-dd HH:mm:ss SS")', function (data) {
            expect(data).to.be.ok;
        });
    });

    describe('Image', function () {
        doit('Random.image()', function (data) {
            expect(data).to.be.ok;
        });
        it('Random.dataImage()', function () {
            var data = eval(this.test.title);
            expect(data).to.be.ok;
            this.test.title = stringify(this.test.title) + ' => ';
        });
        it('Random.dataImage("200x100")', function () {
            var data = eval(this.test.title);
            expect(data).to.be.ok;
            this.test.title = stringify(this.test.title) + ' => ';
        });
        it('Random.dataImage("200x100", "Hello Mock.js!")', function () {
            var data = eval(this.test.title);
            expect(data).to.be.ok;
            this.test.title = stringify(this.test.title) + ' => ';
        });
    });

    var RE_COLOR = /^#[0-9a-fA-F]{6}$/;
    var RE_COLOR_RGB = /^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/;
    var RE_COLOR_RGBA = /^rgba\(\d{1,3}, \d{1,3}, \d{1,3}, 0\.\d{1,2}\)$/;
    var RE_COLOR_HSL = /^hsl\(\d{1,3}, \d{1,3}, \d{1,3}\)$/;
    describe('Color', function () {
        doit('Random.color()', function (data) {
            expect(RE_COLOR.test(data)).to.true;
        });
        doit('Random.hex()', function (data) {
            expect(RE_COLOR.test(data)).to.true;
        });
        doit('Random.rgb()', function (data) {
            expect(RE_COLOR_RGB.test(data)).to.true;
        });
        doit('Random.rgba()', function (data) {
            expect(RE_COLOR_RGBA.test(data)).to.true;
        });
        doit('Random.hsl()', function (data) {
            expect(RE_COLOR_HSL.test(data)).to.true;
        });
    });

    describe('Text', function () {
        doit('Random.paragraph()', function (data) {
            expect(data.split('.').length - 1).to.within(3, 7);
        });
        doit('Random.paragraph(2)', function (data) {
            expect(data.split('.').length - 1).to.equal(2);
        });
        doit('Random.paragraph(1, 3)', function (data) {
            expect(data.split('.').length - 1).to.within(1, 3);
        });

        doit('Random.sentence()', function (data) {
            expect(data[0]).to.equal(data.toUpperCase()[0]);
            expect(data.split(' ').length).to.within(12, 18);
        });
        doit('Random.sentence(4)', function (data) {
            expect(data[0]).to.equal(data.toUpperCase()[0]);
            expect(data.split(' ').length).to.equal(4);
        });
        doit('Random.sentence(3, 5)', function (data) {
            expect(data[0]).to.equal(data.toUpperCase()[0]);
            expect(data.split(' ').length).to.within(3, 5);
        });

        doit('Random.word()', function (data) {
            expect(data).to.have.length.within(3, 10);
        });
        doit('Random.word(4)', function (data) {
            expect(data).to.have.length(4);
        });
        doit('Random.word(3, 5)', function (data) {
            expect(data).to.have.length.within(3, 5);
        });

        doit('Random.title()', function (data) {
            var words = data.split(' ');
            _.each(words, function (word) {
                expect(word[0]).to.equal(word[0].toUpperCase());
            });
            expect(words).to.have.length.within(3, 7);
        });
        doit('Random.title(4)', function (data) {
            var words = data.split(' ');
            _.each(words, function (word) {
                expect(word[0]).to.equal(word[0].toUpperCase());
            });
            expect(words).to.have.length(4);
        });
        doit('Random.title(3, 5)', function (data) {
            var words = data.split(' ');
            _.each(words, function (word) {
                expect(word[0]).to.equal(word[0].toUpperCase());
            });
            expect(words).to.have.length.within(3, 5);
        });
    });

    describe('Name', function () {
        doit('Random.first()', function (data) {
            expect(data[0]).to.equal(data[0].toUpperCase());
        });
        doit('Random.last()', function (data) {
            expect(data[0]).to.equal(data[0].toUpperCase());
        });
        doit('Random.name()', function (data) {
            var words = data.split(' ');
            expect(words).to.have.length(2);
            expect(words[0][0]).to.equal(words[0][0].toUpperCase());
            expect(words[1][0]).to.equal(words[1][0].toUpperCase());
        });
        doit('Random.name(true)', function (data) {
            var words = data.split(' ');
            expect(words).to.have.length(3);
            expect(words[0][0]).to.equal(words[0][0].toUpperCase());
            expect(words[1][0]).to.equal(words[1][0].toUpperCase());
            expect(words[2][0]).to.equal(words[2][0].toUpperCase());
        });

        doit('Random.cfirst()', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.clast()', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.cname()', function (data) {
            expect(data).to.be.ok;
        });
    });

    var RE_URL = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
    var RE_IP = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    describe('Web', function () {
        doit('Random.url()', function (data) {
            expect(RE_URL.test(data)).to.be.true;
        });
        doit('Random.domain()', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.domain("com")', function (data) {
            expect(data).to.include('.com');
        });
        doit('Random.tld()', function (data) {
            expect(data).to.be.ok;
        });

        doit('Random.email()', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.email("nuysoft.com")', function (data) {
            expect(data).to.include('@nuysoft.com');
        });
        doit('Random.ip()', function (data) {
            expect(RE_IP.test(data)).to.be.true;
        });
    });
    describe('Address', function () {
        doit('Random.region()', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.province()', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.city()', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.city(true)', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.county()', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.county(true)', function (data) {
            expect(data).to.be.ok;
        });
        doit('Random.zip()', function (data) {
            expect(data).to.be.ok;
        });
    });
    describe('Helpers', function () {
        doit('Random.capitalize()', function (data) {
            expect(data).to.equal('Undefined');
        });
        doit('Random.capitalize("hello")', function (data) {
            expect(data).to.equal('Hello');
        });

        doit('Random.upper()', function (data) {
            expect(data).to.equal('UNDEFINED');
        });
        doit('Random.upper("hello")', function (data) {
            expect(data).to.equal('HELLO');
        });

        doit('Random.lower()', function (data) {
            expect(data).to.equal('undefined');
        });
        doit('Random.lower("HELLO")', function (data) {
            expect(data).to.equal('hello');
        });

        doit('Random.pick()', function (data) {
            expect(data).to.be.undefined;
        });
        doit('Random.pick("a", "e", "i", "o", "u")', function (data) {
            expect(["a", "e", "i", "o", "u"]).to.include(data);
        });
        doit('Random.pick(["a", "e", "i", "o", "u"])', function (data) {
            expect(["a", "e", "i", "o", "u"]).to.include(data);
        });
        doit('Random.pick(["a", "e", "i", "o", "u"], 3)', function (data) {
            expect(data).to.be.an('array').with.length(3);
        });
        doit('Random.pick(["a", "e", "i", "o", "u"], 1, 5)', function (data) {
            expect(data).to.be.an('array').with.length.within(1, 5);
        });

        doit('Random.shuffle()', function (data) {
            expect(data).to.deep.equal([]);
        });
        doit('Random.shuffle(["a", "e", "i", "o", "u"])', function (data) {
            expect(data.join('')).to.not.equal('aeiou');
            expect(data.sort().join('')).to.equal('aeiou');
        });
        doit('Random.shuffle(["a", "e", "i", "o", "u"], 3)', function (data) {
            expect(data).to.be.an('array').with.length(3);
        });
        doit('Random.shuffle(["a", "e", "i", "o", "u"], 1, 5)', function (data) {
            expect(data).to.be.an('array').with.length.within(1, 5);
        });
    });

    var RE_GUID = /[a-fA-F0-9]{8}\-[a-fA-F0-9]{4}\-[a-fA-F0-9]{4}\-[a-fA-F0-9]{4}\-[a-fA-F0-9]{12}/;
    describe('Miscellaneous', function () {
        doit('Random.guid()', function (data) {
            expect(data).to.be.a('string').with.length(36);
            expect(RE_GUID.test(data)).to.be.true;
        });
        doit('Random.id()', function (data) {
            expect(data).to.be.a('string').with.length(18);
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QubW9jay5yYW5kb20uanMiXSwibmFtZXMiOlsiZXhwZWN0IiwiY2hhaSIsIk1vY2siLCJSYW5kb20iLCIkIiwiXyIsImRlc2NyaWJlIiwiYmVmb3JlIiwiZG9uZSIsInJlcXVpcmUiLCJhcmd1bWVudHMiLCJ3aW5kb3ciLCJ0byIsIm5vdCIsImVxdWFsIiwidW5kZWZpbmVkIiwic3RyaW5naWZ5IiwianNvbiIsIkpTT04iLCJkb2l0IiwiZXhwcmVzc2lvbiIsInZhbGlkYXRvciIsIml0IiwiZGF0YSIsImV2YWwiLCJ0ZXN0IiwidGl0bGUiLCJiZSIsImEiLCJ3aXRoaW4iLCJsZWFzdCIsIlJFX0ZMT0FUIiwidmFsaWRGbG9hdCIsImZsb2F0IiwibWluIiwibWF4IiwiZG1pbiIsImRtYXgiLCJsYXN0SW5kZXgiLCJwYXJ0cyIsImV4ZWMiLCJoYXZlIiwibGVuZ3RoIiwiQ0hBUkFDVEVSX0xPV0VSIiwiQ0hBUkFDVEVSX1VQUEVSIiwiQ0hBUkFDVEVSX05VTUJFUiIsIkNIQVJBQ1RFUl9TWU1CT0wiLCJ3aXRoIiwiaW5jbHVkZSIsImkiLCJhbiIsImRlZXAiLCJSRV9EQVRFIiwiUkVfVElNRSIsIlJFX0RBVEVUSU1FIiwiUmVnRXhwIiwic291cmNlIiwidHJ1ZSIsIm9rIiwiUkVfQ09MT1IiLCJSRV9DT0xPUl9SR0IiLCJSRV9DT0xPUl9SR0JBIiwiUkVfQ09MT1JfSFNMIiwic3BsaXQiLCJ0b1VwcGVyQ2FzZSIsIndvcmRzIiwiZWFjaCIsIndvcmQiLCJSRV9VUkwiLCJSRV9JUCIsImpvaW4iLCJzb3J0IiwiUkVfR1VJRCJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxJQUFJQSxTQUFTQyxLQUFLRCxNQUFsQjtBQUNBLElBQUlFLElBQUosRUFBVUMsTUFBVixFQUFrQkMsQ0FBbEIsRUFBcUJDLENBQXJCLEVBQXdCRixNQUF4Qjs7QUFFQTtBQUNBRyxTQUFTLFFBQVQsRUFBbUIsWUFBVztBQUMxQkMsV0FBTyxVQUFTQyxJQUFULEVB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QUNqQ2EsYUFBSyxlQUFMLEVBQXNCLFVBQVNJLElBQVQsRUFBZTtBQUNqQ3ZCLG1CQUFPdUIsSUFBUCxFQUFhWCxFQUFiLENBQWdCZSxFQUFoQixDQUFtQkMsQ0FBbkIsQ0FBcUIsUUFBckIsRUFBK0JtQixJQUEvQixDQUFvQ0wsTUFBcEMsQ0FBMkMsRUFBM0M7QUFDQTFDLG1CQUFPd0UsUUFBUS9DLElBQVIsQ0FBYUYsSUFBYixDQUFQLEVBQTJCWCxFQUEzQixDQUE4QmUsRUFBOUIsQ0FBaUM4QixJQUFqQztBQUNILFNBSEQ7QUFJQXRDLGFBQUssYUFBTCxFQUFvQixVQUFTSSxJQUFULEVBQWU7QUFDL0J2QixtQkFBT3VCLElBQVAsRUFBYVgsRUFBYixDQUFnQmUsRUFBaEIsQ0FBbUJDLENBQW5CLENBQXFCLFFBQXJCLEVBQStCbUIsSUFBL0IsQ0FBb0NMLE1BQXBDLENBQTJDLEVBQTNDO0FBQ0gsU0FGRDtBQUdILEtBUkQ7QUFTSCxDQXhjRCIsImZpbGUiOiJ0ZXN0Lm1vY2sucmFuZG9tLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyogZ2xvYmFsIHJlcXVpcmUsIGNoYWksIGRlc2NyaWJlLCBiZWZvcmUsIGl0ICovXG4vKiBnbG9iYWwgd2luZG93ICovXG4vLyDmlbDmja7ljaDkvY3nrKblrprkuYnvvIhEYXRhIFBsYWNlaG9sZGVyIERlZmluaXRpb27vvIxEUETvvIlcbnZhciBleHBlY3QgPSBjaGFpLmV4cGVjdFxudmFyIE1vY2ssIFJhbmRvbSwgJCwgXywgUmFuZG9tXG5cbi8qIGpzaGludCAtVzA2MSAqL1xuZGVzY3JpYmUoJ1JhbmRvbScsIGZ1bmN0aW9uKCkge1xuICAgIGJlZm9yZShmdW5jdGlvbihkb25lKSB7XG4gICAgICAgIHJlcXVpcmUoWydtb2NrJywgJ3VuZGVyc2NvcmUnLCAnanF1ZXJ5J10sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgTW9jayA9IGFyZ3VtZW50c1swXVxuICAgICAgICAgICAgd2luZG93LlJhbmRvbSA9IFJhbmRvbSA9IE1vY2suUmFuZG9tXG4gICAgICAgICAgICBfID0gYXJndW1lbnRzWzFdXG4gICAgICAgICAgICAkID0gYXJndW1lbnRzWzJdXG4gICAgICAgICAgICBleHBlY3QoTW9jaykudG8ubm90LmVxdWFsKHVuZGVmaW5lZClcbiAgICAgICAgICAgIGV4cGVjdChfKS50by5ub3QuZXF1YWwodW5kZWZpbmVkKVxuICAgICAgICAgICAgZXhwZWN0KCQpLnRvLm5vdC5lcXVhbCh1bmRlZmluZWQpXG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5KGpzb24pIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzb24gLyosIG51bGwsIDQqLyApXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9pdChleHByZXNzaW9uLCB2YWxpZGF0b3IpIHtcbiAgICAgICAgaXQoJycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCAxOyBpKyspIHt9XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGV2YWwoZXhwcmVzc2lvbilcbiAgICAgICAgICAgIHZhbGlkYXRvcihkYXRhKVxuICAgICAgICAgICAgdGhpcy50ZXN0LnRpdGxlID0gc3RyaW5naWZ5KGV4cHJlc3Npb24pICsgJyA9PiAnICsgc3RyaW5naWZ5KGRhdGEpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ0Jhc2ljJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvaXQoJ1JhbmRvbS5ib29sZWFuKCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUuYSgnYm9vbGVhbicpXG4gICAgICAgIH0pXG5cbiAgICAgICAgZG9pdCgnUmFuZG9tLm5hdHVyYWwoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5hKCdudW1iZXInKS53aXRoaW4oMCwgOTAwNzE5OTI1NDc0MDk5MilcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLm5hdHVyYWwoMSwgMyknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUuYSgnbnVtYmVyJykud2l0aGluKDEsIDMpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5uYXR1cmFsKDEpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLmEoJ251bWJlcicpLmxlYXN0KDEpXG4gICAgICAgIH0pXG5cbiAgICAgICAgZG9pdCgnUmFuZG9tLmludGVnZXIoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5hKCdudW1iZXInKS53aXRoaW4oLTkwMDcxOTkyNTQ3NDA5OTIsIDkwMDcxOTkyNTQ3NDA5OTIpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5pbnRlZ2VyKC0xMCwgMTApJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLmEoJ251bWJlcicpLndpdGhpbigtMTAsIDEwKVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIDEg5pW05pWw6YOo5YiGIDIg5bCP5pWw6YOo5YiGXG4gICAgICAgIHZhciBSRV9GTE9BVCA9IC8oXFwtP1xcZCspXFwuPyhcXGQrKT8vXG5cbiAgICAgICAgZnVuY3Rpb24gdmFsaWRGbG9hdChmbG9hdCwgbWluLCBtYXgsIGRtaW4sIGRtYXgpIHtcbiAgICAgICAgICAgIFJFX0ZMT0FULmxhc3RJbmRleCA9IDBcbiAgICAgICAgICAgIHZhciBwYXJ0cyA9IFJFX0ZMT0FULmV4ZWMoZmxvYXQgKyAnJylcblxuICAgICAgICAgICAgZXhwZWN0KCtwYXJ0c1sxXSkudG8uYmUuYSgnbnVtYmVyJykud2l0aGluKG1pbiwgbWF4KVxuXG4gICAgICAgICAgICAvKiBqc2hpbnQgLVcwNDEgKi9cbiAgICAgICAgICAgIGlmIChwYXJ0c1syXSAhPSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBleHBlY3QocGFydHNbMl0pLnRvLmhhdmUubGVuZ3RoLndpdGhpbihkbWluLCBkbWF4KVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZG9pdCgnUmFuZG9tLmZsb2F0KCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICB2YWxpZEZsb2F0KGRhdGEsIC05MDA3MTk5MjU0NzQwOTkyLCA5MDA3MTk5MjU0NzQwOTkyLCAwLCAxNylcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLmZsb2F0KDApJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFsaWRGbG9hdChkYXRhLCAwLCA5MDA3MTk5MjU0NzQwOTkyLCAwLCAxNylcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLmZsb2F0KDYwLCAxMDApJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFsaWRGbG9hdChkYXRhLCA2MCwgMTAwLCAwLCAxNylcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLmZsb2F0KDYwLCAxMDAsIDMpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFsaWRGbG9hdChkYXRhLCA2MCwgMTAwLCAzLCAxNylcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLmZsb2F0KDYwLCAxMDAsIDMsIDUpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFsaWRGbG9hdChkYXRhLCA2MCwgMTAwLCAzLCA1KVxuICAgICAgICB9KVxuXG4gICAgICAgIHZhciBDSEFSQUNURVJfTE9XRVIgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXonXG4gICAgICAgIHZhciBDSEFSQUNURVJfVVBQRVIgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonXG4gICAgICAgIHZhciBDSEFSQUNURVJfTlVNQkVSID0gJzAxMjM0NTY3ODknXG4gICAgICAgIHZhciBDSEFSQUNURVJfU1lNQk9MID0gJyFAIyQlXiYqKClbXSdcbiAgICAgICAgZG9pdCgnUmFuZG9tLmNoYXJhY3RlcigpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLmEoJ3N0cmluZycpLndpdGgubGVuZ3RoKDEpXG4gICAgICAgICAgICBleHBlY3QoXG4gICAgICAgICAgICAgICAgQ0hBUkFDVEVSX0xPV0VSICtcbiAgICAgICAgICAgICAgICBDSEFSQUNURVJfVVBQRVIgK1xuICAgICAgICAgICAgICAgIENIQVJBQ1RFUl9OVU1CRVIgK1xuICAgICAgICAgICAgICAgIENIQVJBQ1RFUl9TWU1CT0xcbiAgICAgICAgICAgICkudG8uaW5jbHVkZShkYXRhKVxuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uY2hhcmFjdGVyKFwibG93ZXJcIiknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUuYSgnc3RyaW5nJykud2l0aC5sZW5ndGgoMSlcbiAgICAgICAgICAgIGV4cGVjdChDSEFSQUNURVJfTE9XRVIpLnRvLmluY2x1ZGUoZGF0YSlcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLmNoYXJhY3RlcihcInVwcGVyXCIpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLmEoJ3N0cmluZycpLndpdGgubGVuZ3RoKDEpXG4gICAgICAgICAgICBleHBlY3QoQ0hBUkFDVEVSX1VQUEVSKS50by5pbmNsdWRlKGRhdGEpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5jaGFyYWN0ZXIoXCJudW1iZXJcIiknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUuYSgnc3RyaW5nJykud2l0aC5sZW5ndGgoMSlcbiAgICAgICAgICAgIGV4cGVjdChDSEFSQUNURVJfTlVNQkVSKS50by5pbmNsdWRlKGRhdGEpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5jaGFyYWN0ZXIoXCJzeW1ib2xcIiknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUuYSgnc3RyaW5nJykud2l0aC5sZW5ndGgoMSlcbiAgICAgICAgICAgIGV4cGVjdChDSEFSQUNURVJfU1lNQk9MKS50by5pbmNsdWRlKGRhdGEpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5jaGFyYWN0ZXIoXCJhZWlvdVwiKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5hKCdzdHJpbmcnKS53aXRoLmxlbmd0aCgxKVxuICAgICAgICAgICAgZXhwZWN0KCdhZWlvdScpLnRvLmluY2x1ZGUoZGF0YSlcbiAgICAgICAgfSlcblxuICAgICAgICBkb2l0KCdSYW5kb20uc3RyaW5nKCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUuYSgnc3RyaW5nJykud2l0aC5sZW5ndGgud2l0aGluKDMsIDcpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5zdHJpbmcoNSknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUuYSgnc3RyaW5nJykud2l0aC5sZW5ndGgoNSlcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLnN0cmluZyhcImxvd2VyXCIsIDUpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLmEoJ3N0cmluZycpLndpdGgubGVuZ3RoKDUpXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBleHBlY3QoQ0hBUkFDVEVSX0xPV0VSKS50by5pbmNsdWRlKGRhdGFbaV0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5zdHJpbmcoNywgMTApJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLmEoJ3N0cmluZycpLndpdGgubGVuZ3RoLndpdGhpbig3LCAxMClcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLnN0cmluZyhcImFlaW91XCIsIDEsIDMpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLmEoJ3N0cmluZycpLndpdGgubGVuZ3RoLndpdGhpbigxLCAzKVxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KCdhZWlvdScpLnRvLmluY2x1ZGUoZGF0YVtpXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBkb2l0KCdSYW5kb20ucmFuZ2UoMTApJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLmFuKCdhcnJheScpLndpdGgubGVuZ3RoKDEwKVxuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20ucmFuZ2UoMywgNyknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUuYW4oJ2FycmF5JykuZGVlcC5lcXVhbChbMywgNCwgNSwgNl0pXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5yYW5nZSgxLCAxMCwgMiknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUuYW4oJ2FycmF5JykuZGVlcC5lcXVhbChbMSwgMywgNSwgNywgOV0pXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5yYW5nZSgxLCAxMCwgMyknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUuYW4oJ2FycmF5JykuZGVlcC5lcXVhbChbMSwgNCwgN10pXG4gICAgICAgIH0pXG5cbiAgICAgICAgdmFyIFJFX0RBVEUgPSAvXFxkezR9LVxcZHsyfS1cXGR7Mn0vXG4gICAgICAgIHZhciBSRV9USU1FID0gL1xcZHsyfTpcXGR7Mn06XFxkezJ9L1xuICAgICAgICB2YXIgUkVfREFURVRJTUUgPSBuZXcgUmVnRXhwKFJFX0RBVEUuc291cmNlICsgJyAnICsgUkVfVElNRS5zb3VyY2UpXG5cbiAgICAgICAgZG9pdCgnUmFuZG9tLmRhdGUoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChSRV9EQVRFLnRlc3QoZGF0YSkpLnRvLmJlLnRydWVcbiAgICAgICAgfSlcblxuICAgICAgICBkb2l0KCdSYW5kb20udGltZSgpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KFJFX1RJTUUudGVzdChkYXRhKSkudG8uYmUudHJ1ZVxuICAgICAgICB9KVxuXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5kYXRldGltZSgpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KFJFX0RBVEVUSU1FLnRlc3QoZGF0YSkpLnRvLmJlLnRydWVcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLmRhdGV0aW1lKFwieXl5eS1NTS1kZCBBIEhIOm1tOnNzXCIpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLm9rXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5kYXRldGltZShcInl5eXktTU0tZGQgYSBISDptbTpzc1wiKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uZGF0ZXRpbWUoXCJ5eS1NTS1kZCBISDptbTpzc1wiKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uZGF0ZXRpbWUoXCJ5LU1NLWRkIEhIOm1tOnNzXCIpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLm9rXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5kYXRldGltZShcInktTS1kIEg6bTpzXCIpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLm9rXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5kYXRldGltZShcInl5eXkgeXkgeSBNTSBNIGRkIGQgSEggSCBoaCBoIG1tIG0gc3MgcyBTUyBTIEEgYSBUXCIpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLm9rXG4gICAgICAgIH0pXG5cbiAgICAgICAgZG9pdCgnUmFuZG9tLm5vdygpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLm9rXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5ub3coXCJ5ZWFyXCIpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLm9rXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5ub3coXCJtb250aFwiKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20ubm93KFwiZGF5XCIpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLm9rXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5ub3coXCJob3VyXCIpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLm9rXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5ub3coXCJtaW51dGVcIiknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUub2tcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLm5vdyhcInNlY29uZFwiKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20ubm93KFwid2Vla1wiKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20ubm93KFwieXl5eS1NTS1kZCBISDptbTpzcyBTU1wiKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnSW1hZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9pdCgnUmFuZG9tLmltYWdlKCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUub2tcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ1JhbmRvbS5kYXRhSW1hZ2UoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBldmFsKHRoaXMudGVzdC50aXRsZSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICAgICAgdGhpcy50ZXN0LnRpdGxlID0gc3RyaW5naWZ5KHRoaXMudGVzdC50aXRsZSkgKyAnID0+ICdcbiAgICAgICAgfSlcbiAgICAgICAgaXQoJ1JhbmRvbS5kYXRhSW1hZ2UoXCIyMDB4MTAwXCIpJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IGV2YWwodGhpcy50ZXN0LnRpdGxlKVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLm9rXG4gICAgICAgICAgICB0aGlzLnRlc3QudGl0bGUgPSBzdHJpbmdpZnkodGhpcy50ZXN0LnRpdGxlKSArICcgPT4gJ1xuICAgICAgICB9KVxuICAgICAgICBpdCgnUmFuZG9tLmRhdGFJbWFnZShcIjIwMHgxMDBcIiwgXCJIZWxsbyBNb2NrLmpzIVwiKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBldmFsKHRoaXMudGVzdC50aXRsZSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICAgICAgdGhpcy50ZXN0LnRpdGxlID0gc3RyaW5naWZ5KHRoaXMudGVzdC50aXRsZSkgKyAnID0+ICdcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgdmFyIFJFX0NPTE9SID0gL14jWzAtOWEtZkEtRl17Nn0kL1xuICAgIHZhciBSRV9DT0xPUl9SR0IgPSAvXnJnYlxcKFxcZHsxLDN9LCBcXGR7MSwzfSwgXFxkezEsM31cXCkkL1xuICAgIHZhciBSRV9DT0xPUl9SR0JBID0gL15yZ2JhXFwoXFxkezEsM30sIFxcZHsxLDN9LCBcXGR7MSwzfSwgMFxcLlxcZHsxLDJ9XFwpJC9cbiAgICB2YXIgUkVfQ09MT1JfSFNMID0gL15oc2xcXChcXGR7MSwzfSwgXFxkezEsM30sIFxcZHsxLDN9XFwpJC9cbiAgICBkZXNjcmliZSgnQ29sb3InLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9pdCgnUmFuZG9tLmNvbG9yKCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoUkVfQ09MT1IudGVzdChkYXRhKSkudG8udHJ1ZVxuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uaGV4KCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoUkVfQ09MT1IudGVzdChkYXRhKSkudG8udHJ1ZVxuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20ucmdiKCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoUkVfQ09MT1JfUkdCLnRlc3QoZGF0YSkpLnRvLnRydWVcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLnJnYmEoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChSRV9DT0xPUl9SR0JBLnRlc3QoZGF0YSkpLnRvLnRydWVcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLmhzbCgpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KFJFX0NPTE9SX0hTTC50ZXN0KGRhdGEpKS50by50cnVlXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdUZXh0JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvaXQoJ1JhbmRvbS5wYXJhZ3JhcGgoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhLnNwbGl0KCcuJykubGVuZ3RoIC0gMSkudG8ud2l0aGluKDMsIDcpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5wYXJhZ3JhcGgoMiknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YS5zcGxpdCgnLicpLmxlbmd0aCAtIDEpLnRvLmVxdWFsKDIpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5wYXJhZ3JhcGgoMSwgMyknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YS5zcGxpdCgnLicpLmxlbmd0aCAtIDEpLnRvLndpdGhpbigxLCAzKVxuICAgICAgICB9KVxuXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5zZW50ZW5jZSgpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGFbMF0pLnRvLmVxdWFsKGRhdGEudG9VcHBlckNhc2UoKVswXSlcbiAgICAgICAgICAgIGV4cGVjdChkYXRhLnNwbGl0KCcgJykubGVuZ3RoKS50by53aXRoaW4oMTIsIDE4KVxuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uc2VudGVuY2UoNCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YVswXSkudG8uZXF1YWwoZGF0YS50b1VwcGVyQ2FzZSgpWzBdKVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEuc3BsaXQoJyAnKS5sZW5ndGgpLnRvLmVxdWFsKDQpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5zZW50ZW5jZSgzLCA1KScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhWzBdKS50by5lcXVhbChkYXRhLnRvVXBwZXJDYXNlKClbMF0pXG4gICAgICAgICAgICBleHBlY3QoZGF0YS5zcGxpdCgnICcpLmxlbmd0aCkudG8ud2l0aGluKDMsIDUpXG4gICAgICAgIH0pXG5cbiAgICAgICAgZG9pdCgnUmFuZG9tLndvcmQoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLmxlbmd0aC53aXRoaW4oMywgMTApXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS53b3JkKDQpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmhhdmUubGVuZ3RoKDQpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS53b3JkKDMsIDUpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmhhdmUubGVuZ3RoLndpdGhpbigzLCA1KVxuICAgICAgICB9KVxuXG4gICAgICAgIGRvaXQoJ1JhbmRvbS50aXRsZSgpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFyIHdvcmRzID0gZGF0YS5zcGxpdCgnICcpXG4gICAgICAgICAgICBfLmVhY2god29yZHMsIGZ1bmN0aW9uKHdvcmQpIHtcbiAgICAgICAgICAgICAgICBleHBlY3Qod29yZFswXSkudG8uZXF1YWwod29yZFswXS50b1VwcGVyQ2FzZSgpKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGV4cGVjdCh3b3JkcykudG8uaGF2ZS5sZW5ndGgud2l0aGluKDMsIDcpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS50aXRsZSg0KScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciB3b3JkcyA9IGRhdGEuc3BsaXQoJyAnKVxuICAgICAgICAgICAgXy5lYWNoKHdvcmRzLCBmdW5jdGlvbih3b3JkKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHdvcmRbMF0pLnRvLmVxdWFsKHdvcmRbMF0udG9VcHBlckNhc2UoKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBleHBlY3Qod29yZHMpLnRvLmhhdmUubGVuZ3RoKDQpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS50aXRsZSgzLCA1KScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciB3b3JkcyA9IGRhdGEuc3BsaXQoJyAnKVxuICAgICAgICAgICAgXy5lYWNoKHdvcmRzLCBmdW5jdGlvbih3b3JkKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHdvcmRbMF0pLnRvLmVxdWFsKHdvcmRbMF0udG9VcHBlckNhc2UoKSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBleHBlY3Qod29yZHMpLnRvLmhhdmUubGVuZ3RoLndpdGhpbigzLCA1KVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnTmFtZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb2l0KCdSYW5kb20uZmlyc3QoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhWzBdKS50by5lcXVhbChkYXRhWzBdLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5sYXN0KCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YVswXSkudG8uZXF1YWwoZGF0YVswXS50b1VwcGVyQ2FzZSgpKVxuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20ubmFtZSgpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFyIHdvcmRzID0gZGF0YS5zcGxpdCgnICcpXG4gICAgICAgICAgICBleHBlY3Qod29yZHMpLnRvLmhhdmUubGVuZ3RoKDIpXG4gICAgICAgICAgICBleHBlY3Qod29yZHNbMF1bMF0pLnRvLmVxdWFsKHdvcmRzWzBdWzBdLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgICAgICBleHBlY3Qod29yZHNbMV1bMF0pLnRvLmVxdWFsKHdvcmRzWzFdWzBdLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5uYW1lKHRydWUpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFyIHdvcmRzID0gZGF0YS5zcGxpdCgnICcpXG4gICAgICAgICAgICBleHBlY3Qod29yZHMpLnRvLmhhdmUubGVuZ3RoKDMpXG4gICAgICAgICAgICBleHBlY3Qod29yZHNbMF1bMF0pLnRvLmVxdWFsKHdvcmRzWzBdWzBdLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgICAgICBleHBlY3Qod29yZHNbMV1bMF0pLnRvLmVxdWFsKHdvcmRzWzFdWzBdLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgICAgICBleHBlY3Qod29yZHNbMl1bMF0pLnRvLmVxdWFsKHdvcmRzWzJdWzBdLnRvVXBwZXJDYXNlKCkpXG4gICAgICAgIH0pXG5cbiAgICAgICAgZG9pdCgnUmFuZG9tLmNmaXJzdCgpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLm9rXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5jbGFzdCgpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLm9rXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5jbmFtZSgpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLm9rXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIHZhciBSRV9VUkwgPSAvXihbXFx3ListXSs6KSg/OlxcL1xcLyhbXlxcLz8jOl0qKSg/OjooXFxkKyl8KXwpL1xuICAgIHZhciBSRV9JUCA9IC9eXFxkezEsM31cXC5cXGR7MSwzfVxcLlxcZHsxLDN9XFwuXFxkezEsM30kL1xuICAgIGRlc2NyaWJlKCdXZWInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZG9pdCgnUmFuZG9tLnVybCgpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KFJFX1VSTC50ZXN0KGRhdGEpKS50by5iZS50cnVlXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5kb21haW4oKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uZG9tYWluKFwiY29tXCIpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmluY2x1ZGUoJy5jb20nKVxuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20udGxkKCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUub2tcbiAgICAgICAgfSlcblxuICAgICAgICBkb2l0KCdSYW5kb20uZW1haWwoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uZW1haWwoXCJudXlzb2Z0LmNvbVwiKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5pbmNsdWRlKCdAbnV5c29mdC5jb20nKVxuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uaXAoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChSRV9JUC50ZXN0KGRhdGEpKS50by5iZS50cnVlXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBkZXNjcmliZSgnQWRkcmVzcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb2l0KCdSYW5kb20ucmVnaW9uKCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUub2tcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLnByb3ZpbmNlKCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUub2tcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLmNpdHkoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uY2l0eSh0cnVlKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uY291bnR5KCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUub2tcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLmNvdW50eSh0cnVlKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5va1xuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uemlwKCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUub2tcbiAgICAgICAgfSlcbiAgICB9KVxuICAgIGRlc2NyaWJlKCdIZWxwZXJzJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGRvaXQoJ1JhbmRvbS5jYXBpdGFsaXplKCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uZXF1YWwoJ1VuZGVmaW5lZCcpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5jYXBpdGFsaXplKFwiaGVsbG9cIiknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uZXF1YWwoJ0hlbGxvJylcbiAgICAgICAgfSlcblxuICAgICAgICBkb2l0KCdSYW5kb20udXBwZXIoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5lcXVhbCgnVU5ERUZJTkVEJylcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLnVwcGVyKFwiaGVsbG9cIiknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uZXF1YWwoJ0hFTExPJylcbiAgICAgICAgfSlcblxuICAgICAgICBkb2l0KCdSYW5kb20ubG93ZXIoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5lcXVhbCgndW5kZWZpbmVkJylcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLmxvd2VyKFwiSEVMTE9cIiknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uZXF1YWwoJ2hlbGxvJylcbiAgICAgICAgfSlcblxuICAgICAgICBkb2l0KCdSYW5kb20ucGljaygpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLnVuZGVmaW5lZFxuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20ucGljayhcImFcIiwgXCJlXCIsIFwiaVwiLCBcIm9cIiwgXCJ1XCIpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KFtcImFcIiwgXCJlXCIsIFwiaVwiLCBcIm9cIiwgXCJ1XCJdKS50by5pbmNsdWRlKGRhdGEpXG4gICAgICAgIH0pXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5waWNrKFtcImFcIiwgXCJlXCIsIFwiaVwiLCBcIm9cIiwgXCJ1XCJdKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChbXCJhXCIsIFwiZVwiLCBcImlcIiwgXCJvXCIsIFwidVwiXSkudG8uaW5jbHVkZShkYXRhKVxuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20ucGljayhbXCJhXCIsIFwiZVwiLCBcImlcIiwgXCJvXCIsIFwidVwiXSwgMyknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUuYW4oJ2FycmF5Jykud2l0aC5sZW5ndGgoMylcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLnBpY2soW1wiYVwiLCBcImVcIiwgXCJpXCIsIFwib1wiLCBcInVcIl0sIDEsIDUpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLmFuKCdhcnJheScpLndpdGgubGVuZ3RoLndpdGhpbigxLCA1KVxuICAgICAgICB9KVxuXG4gICAgICAgIGRvaXQoJ1JhbmRvbS5zaHVmZmxlKCknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uZGVlcC5lcXVhbChbXSlcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLnNodWZmbGUoW1wiYVwiLCBcImVcIiwgXCJpXCIsIFwib1wiLCBcInVcIl0pJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEuam9pbignJykpLnRvLm5vdC5lcXVhbCgnYWVpb3UnKVxuICAgICAgICAgICAgZXhwZWN0KGRhdGEuc29ydCgpLmpvaW4oJycpKS50by5lcXVhbCgnYWVpb3UnKVxuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uc2h1ZmZsZShbXCJhXCIsIFwiZVwiLCBcImlcIiwgXCJvXCIsIFwidVwiXSwgMyknLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uYmUuYW4oJ2FycmF5Jykud2l0aC5sZW5ndGgoMylcbiAgICAgICAgfSlcbiAgICAgICAgZG9pdCgnUmFuZG9tLnNodWZmbGUoW1wiYVwiLCBcImVcIiwgXCJpXCIsIFwib1wiLCBcInVcIl0sIDEsIDUpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLmFuKCdhcnJheScpLndpdGgubGVuZ3RoLndpdGhpbigxLCA1KVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICB2YXIgUkVfR1VJRCA9IC9bYS1mQS1GMC05XXs4fVxcLVthLWZBLUYwLTldezR9XFwtW2EtZkEtRjAtOV17NH1cXC1bYS1mQS1GMC05XXs0fVxcLVthLWZBLUYwLTldezEyfS9cbiAgICBkZXNjcmliZSgnTWlzY2VsbGFuZW91cycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBkb2l0KCdSYW5kb20uZ3VpZCgpJywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmJlLmEoJ3N0cmluZycpLndpdGgubGVuZ3RoKDM2KVxuICAgICAgICAgICAgZXhwZWN0KFJFX0dVSUQudGVzdChkYXRhKSkudG8uYmUudHJ1ZVxuICAgICAgICB9KVxuICAgICAgICBkb2l0KCdSYW5kb20uaWQoKScsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5iZS5hKCdzdHJpbmcnKS53aXRoLmxlbmd0aCgxOClcbiAgICAgICAgfSlcbiAgICB9KVxufSkiXX0=