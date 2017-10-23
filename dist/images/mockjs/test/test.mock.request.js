'use strict';

/* global console, require, chai, describe, before, it */
// 数据占位符定义（Data Placeholder Definition，DPD）
var expect = chai.expect;
var Mock, $, _;

describe('Request', function () {
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

    function stringify(json) {
        return JSON.stringify(json /*, null, 4*/);
    }

    describe('jQuery.ajax()', function () {
        it('', function (done) {
            var that = this;
            var url = Math.random();
            $.ajax({
                url: url,
                dataType: 'json'
            }).done(function () /*data, textStatus, jqXHR*/{
                // 不会进入
            }).fail(function (jqXHR /*, textStatus, errorThrown*/) {
                // 浏览器 || PhantomJS
                expect([404, 0]).to.include(jqXHR.status);
                that.test.title += url + ' => ' + jqXHR.status;
            }).always(function () {
                done();
            });
        });
    });
    describe('jQuery.getScript()', function () {
        it('', function (done) {
            var that = this;
            var url = './materiels/noop.js';
            $.getScript(url, function (script, textStatus, jqXHR) {
                expect(script).to.be.ok;
                that.test.title += url + ' => ' + jqXHR.status + ' ' + textStatus;
                done();
            });
        });
    });
    describe('jQuery.load()', function () {
        it('', function (done) {
            var that = this;
            var url = './materiels/noop.html';
            $('<div>').load(url, function (responseText /*, textStatus, jqXHR*/) {
                expect(responseText).to.be.ok;
                that.test.title += url + ' => ' + responseText;
                done();
            });
        });
    });
    describe('jQuery.ajax() XHR Fields', function () {
        it('', function (done) {
            var that = this;
            var url = Math.random();
            var _xhr;
            $.ajax({
                xhr: function xhr() {
                    _xhr = $.ajaxSettings.xhr();
                    return _xhr;
                },
                url: url,
                dataType: 'json',
                xhrFields: {
                    timeout: 123,
                    withCredentials: true
                }
            }).done(function () /*data, textStatus, jqXHR*/{
                // 不会进入
            }).fail(function (jqXHR /*, textStatus, errorThrown*/) {
                // 浏览器 || PhantomJS
                expect([404, 0]).to.include(jqXHR.status);
                that.test.title += url + ' => ' + jqXHR.status;
                expect(_xhr.timeout).to.be.equal(123);
                expect(_xhr.withCredentials).to.be.equal(true);
            }).always(function () {
                done();
            });
        });
    });

    describe('Mock.mock( rurl, template )', function () {
        it('', function (done) {
            var that = this;
            var url = 'rurl_template.json';

            Mock.mock(/rurl_template.json/, {
                'list|1-10': [{
                    'id|+1': 1,
                    'email': '@EMAIL'
                }]
            });

            Mock.setup({
                // timeout: 100,
                timeout: '10-50'
            });
            $.ajax({
                url: url,
                dataType: 'json'
            }).done(function (data /*, textStatus, jqXHR*/) {
                that.test.title += url + ' => ' + stringify(data);
                expect(data).to.have.property('list').that.be.an('array').with.length.within(1, 10);
                _.each(data.list, function (item, index, list) {
                    if (index > 0) expect(item.id).to.be.equal(list[index - 1].id + 1);
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }).always(function () {
                done();
            });
        });
    });

    describe('Mock.mock( rurl, function(options) )', function () {
        it('', function (done) {
            var that = this;
            var url = 'rurl_function.json';

            Mock.mock(/rurl_function\.json/, function (options) {
                expect(options).to.not.equal(undefined);
                expect(options.url).to.be.equal(url);
                expect(options.type).to.be.equal('GET');
                expect(options.body).to.be.equal(null);
                return Mock.mock({
                    'list|1-10': [{
                        'id|+1': 1,
                        'email': '@EMAIL'
                    }]
                });
            });

            $.ajax({
                url: url,
                dataType: 'json'
            }).done(function (data /*, status, jqXHR*/) {
                that.test.title += url + ' => ' + stringify(data);
                expect(data).to.have.property('list').that.be.an('array').with.length.within(1, 10);
                _.each(data.list, function (item, index, list) {
                    if (index > 0) expect(item.id).to.be.equal(list[index - 1].id + 1);
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }).always(function () {
                done();
            });
        });
    });

    describe('Mock.mock( rurl, function(options) ) + GET + data', function () {
        it('', function (done) {
            var that = this;
            var url = 'rurl_function.json';

            Mock.mock(/rurl_function\.json/, function (options) {
                expect(options).to.not.equal(undefined);
                expect(options.url).to.be.equal(url + '?foo=1');
                expect(options.type).to.be.equal('GET');
                expect(options.body).to.be.equal(null);
                return Mock.mock({
                    'list|1-10': [{
                        'id|+1': 1,
                        'email': '@EMAIL'
                    }]
                });
            });

            $.ajax({
                url: url,
                dataType: 'json',
                data: {
                    foo: 1
                }
            }).done(function (data /*, status, jqXHR*/) {
                that.test.title += url + ' => ' + stringify(data);
                expect(data).to.have.property('list').that.be.an('array').with.length.within(1, 10);
                _.each(data.list, function (item, index, list) {
                    if (index > 0) expect(item.id).to.be.equal(list[index - 1].id + 1);
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }).always(function () {
                done();
            });
        });
    });

    describe('Mock.mock( rurl, function(options) ) + POST + data', function () {
        it('', function (done) {
            var that = this;
            var url = 'rurl_function.json';

            Mock.mock(/rurl_function\.json/, function (options) {
                expect(options).to.not.equal(undefined);
                expect(options.url).to.be.equal(url);
                expect(options.type).to.be.equal('POST');
                expect(options.body).to.be.equal('foo=1');
                return Mock.mock({
                    'list|1-10': [{
                        'id|+1': 1,
                        'email': '@EMAIL'
                    }]
                });
            });

            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: {
                    foo: 1
                }
            }).done(function (data /*, status, jqXHR*/) {
                that.test.title += url + ' => ' + stringify(data);
                expect(data).to.have.property('list').that.be.an('array').with.length.within(1, 10);
                _.each(data.list, function (item, index, list) {
                    if (index > 0) expect(item.id).to.be.equal(list[index - 1].id + 1);
                });
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }).always(function () {
                done();
            });
        });
    });

    describe('Mock.mock( rurl, rtype, template )', function () {
        it('', function (done) {
            var that = this;
            var url = 'rurl_rtype_template.json';
            var count = 0;

            Mock.mock(/rurl_rtype_template\.json/, 'get', {
                'list|1-10': [{
                    'id|+1': 1,
                    'email': '@EMAIL',
                    type: 'get'
                }]
            });
            Mock.mock(/rurl_rtype_template\.json/, 'post', {
                'list|1-10': [{
                    'id|+1': 1,
                    'email': '@EMAIL',
                    type: 'post'
                }]
            });

            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json'
            }).done(function (data /*, status, jqXHR*/) {
                that.test.title += 'GET ' + url + ' => ' + stringify(data) + ' ';
                expect(data).to.have.property('list').that.be.an('array').with.length.within(1, 10);
                _.each(data.list, function (item, index, list) {
                    if (index > 0) expect(item.id).to.be.equal(list[index - 1].id + 1);
                    expect(item).to.have.property('type').equal('get');
                });
            }).done(success).always(complete);

            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json'
            }).done(function (data /*, status, jqXHR*/) {
                that.test.title += 'POST ' + url + ' => ' + stringify(data) + ' ';
                expect(data).to.have.property('list').that.be.an('array').with.length.within(1, 10);
                _.each(data.list, function (item, index, list) {
                    if (index > 0) expect(item.id).to.be.equal(list[index - 1].id + 1);
                    expect(item).to.have.property('type').equal('post');
                });
            }).done(success).always(complete);

            function success() /*data*/{
                count++;
            }

            function complete() {
                if (count === 2) done();
            }
        });
    });

    describe('Mock.mock( rurl, rtype, function(options) )', function () {
        it('', function (done) {
            var that = this;
            var url = 'rurl_rtype_function.json';
            var count = 0;

            Mock.mock(/rurl_rtype_function\.json/, /get/, function (options) {
                expect(options).to.not.equal(undefined);
                expect(options.url).to.be.equal(url);
                expect(options.type).to.be.equal('GET');
                expect(options.body).to.be.equal(null);
                return {
                    type: 'get'
                };
            });
            Mock.mock(/rurl_rtype_function\.json/, /post|put/, function (options) {
                expect(options).to.not.equal(undefined);
                expect(options.url).to.be.equal(url);
                expect(['POST', 'PUT']).to.include(options.type);
                expect(options.body).to.be.equal(null);
                return {
                    type: options.type.toLowerCase()
                };
            });

            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json'
            }).done(function (data /*, status, jqXHR*/) {
                that.test.title += 'GET ' + url + ' => ' + stringify(data);
                expect(data).to.have.property('type', 'get');
            }).done(success).always(complete);

            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json'
            }).done(function (data /*, status, jqXHR*/) {
                that.test.title += 'POST ' + url + ' => ' + stringify(data);
                expect(data).to.have.property('type', 'post');
            }).done(success).always(complete);

            $.ajax({
                url: url,
                type: 'put',
                dataType: 'json'
            }).done(function (data /*, status, jqXHR*/) {
                that.test.title += 'PUT ' + url + ' => ' + stringify(data);
                expect(data).to.have.property('type', 'put');
            }).done(success).always(complete);

            function success() /*data*/{
                count++;
            }

            function complete() {
                if (count === 3) done();
            }
        });
    });
    describe('Mock.mock( rurl, rtype, function(options) ) + data', function () {
        it('', function (done) {
            var that = this;
            var url = 'rurl_rtype_function.json';
            var count = 0;

            Mock.mock(/rurl_rtype_function\.json/, /get/, function (options) {
                expect(options).to.not.equal(undefined);
                expect(options.url).to.be.equal(url + '?foo=1');
                expect(options.type).to.be.equal('GET');
                expect(options.body).to.be.equal(null);
                return {
                    type: 'get'
                };
            });
            Mock.mock(/rurl_rtype_function\.json/, /post|put/, function (options) {
                expect(options).to.not.equal(undefined);
                expect(options.url).to.be.equal(url);
                expect(['POST', 'PUT']).to.include(options.type);
                expect(options.body).to.be.equal('foo=1');
                return {
                    type: options.type.toLowerCase()
                };
            });

            $.ajax({
                url: url,
                type: 'get',
                dataType: 'json',
                data: {
                    foo: 1
                }
            }).done(function (data /*, status, jqXHR*/) {
                that.test.title += 'GET ' + url + ' => ' + stringify(data);
                expect(data).to.have.property('type', 'get');
            }).done(success).always(complete);

            $.ajax({
                url: url,
                type: 'post',
                dataType: 'json',
                data: {
                    foo: 1
                }
            }).done(function (data /*, status, jqXHR*/) {
                that.test.title += 'POST ' + url + ' => ' + stringify(data);
                expect(data).to.have.property('type', 'post');
            }).done(success).always(complete);

            $.ajax({
                url: url,
                type: 'put',
                dataType: 'json',
                data: {
                    foo: 1
                }
            }).done(function (data /*, status, jqXHR*/) {
                that.test.title += 'PUT ' + url + ' => ' + stringify(data);
                expect(data).to.have.property('type', 'put');
            }).done(success).always(complete);

            function success() /*data*/{
                count++;
            }

            function complete() {
                if (count === 3) done();
            }
        });
    });
    describe('#105 addEventListener', function () {
        it('addEventListene => addEventListener', function (done) {
            var xhr = new Mock.XHR();
            expect(xhr.addEventListener).to.not.equal(undefined);
            expect(xhr.addEventListene).to.equal(undefined);
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QubW9jay5yZXF1ZXN0LmpzIl0sIm5hbWVzIjpbImV4cGVjdCIsImNoYWkiLCJNb2NrIiwiJCIsIl8iLCJkZXNjcmliZSIsImJlZm9yZSIsImRvbmUiLCJyZXF1aXJlIiwiYXJndW1lbnRzIiwidG8iLCJub3QiLCJlcXVhbCIsInVuZGVmaW5lZCIsInN0cmluZ2lmeSIsImpzb24iLCJKU09OIiwiaXQiLCJ0aGF0IiwidXJsIiwiTWF0aCIsInJhbmRvbSIsImFqYXgiLCJkYXRhVHlwZSIsImZhaWwiLCJqcVhIUiIsImluY2x1ZGUiLCJzdGF0dXMiLCJ0ZXN0IiwidGl0bGUiLCJhbHdheXMiLCJnZXRTY3JpcHQiLCJzY3JpcHQiLCJ0ZXh0U3RhdHVzIiwiYmUiLCJvayIsImxvYWQiLCJyZXNwb25zZVRleHQiLCJ4aHIiLCJhamF4U2V0dGluZ3MiLCJ4aHJGaWVsZHMiLCJ0aW1lb3V0Iiwid2l0aENyZWRlbnRpYWxzIiwibW9jayIsInNldHVwIiwiZGF0YSIsImhhdmUiLCJwcm9wZXJ0eSIsImFuIiwid2l0aCIsImxlbmd0aCIsIndpdGhpbiIsImVhY2giLCJsaXN0IiwiaXRlbSIsImluZGV4IiwiaWQiLCJlcnJvclRocm93biIsImNvbnNvbGUiLCJsb2ciLCJvcHRpb25zIiwidHlwZSIsImJvZHkiLCJmb28iLCJjb3VudCIsInN1Y2Nlc3MiLCJjb21wbGV0ZSIsInRvTG93ZXJDYXNlIiwiWEhSIiwiYWRkRXZlbnRMaXN0ZW5lciIsImFkZEV2ZW50TGlzdGVuZSJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0EsSUFBSUEsU0FBU0MsS0FBS0QsTUFBbEI7QUFDQSxJQUFJRSxJQUFKLEVBQVVDLENBQVYsRUFBYUMsQ0FBYjs7QUFFQUMsU0FBUyxTQUFULEVBQW9CLFlBQVc7QUFDM0JDLFdBQU8sVUFBU0MsSUFBVCxFQUFlO0FBQ2xCQyxnQkFBUSxDQUFDLE1BQUQsRUFBUyxZQUFULEVBQXVCLFFBQXZCLENBQVIsRUFBMEMsWUFBVztBQUNqRE4sbUJB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O0FBRUQscUJBQVNFLFFBQVQsR0FBb0I7QUFDaEIsb0JBQUlGLFVBQVUsQ0FBZCxFQUFpQnpEO0FBQ3BCO0FBRUosU0FyRUQ7QUFzRUgsS0F2RUQ7QUF3RUFGLGFBQVMsdUJBQVQsRUFBa0MsWUFBVztBQUN6Q1ksV0FBRyxxQ0FBSCxFQUEwQyxVQUFTVixJQUFULEVBQWU7QUFDckQsZ0JBQUkrQixNQUFNLElBQUlwQyxLQUFLa0UsR0FBVCxFQUFWO0FBQ0FwRSxtQkFBT3NDLElBQUkrQixnQkFBWCxFQUE2QjNELEVBQTdCLENBQWdDQyxHQUFoQyxDQUFvQ0MsS0FBcEMsQ0FBMENDLFNBQTFDO0FBQ0FiLG1CQUFPc0MsSUFBSWdDLGVBQVgsRUFBNEI1RCxFQUE1QixDQUErQkUsS0FBL0IsQ0FBcUNDLFNBQXJDO0FBQ0FOO0FBQ0gsU0FMRDtBQU1ILEtBUEQ7QUFRSCxDQXZiRCIsImZpbGUiOiJ0ZXN0Lm1vY2sucmVxdWVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGdsb2JhbCBjb25zb2xlLCByZXF1aXJlLCBjaGFpLCBkZXNjcmliZSwgYmVmb3JlLCBpdCAqL1xuLy8g5pWw5o2u5Y2g5L2N56ym5a6a5LmJ77yIRGF0YSBQbGFjZWhvbGRlciBEZWZpbml0aW9u77yMRFBE77yJXG52YXIgZXhwZWN0ID0gY2hhaS5leHBlY3RcbnZhciBNb2NrLCAkLCBfXG5cbmRlc2NyaWJlKCdSZXF1ZXN0JywgZnVuY3Rpb24oKSB7XG4gICAgYmVmb3JlKGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgcmVxdWlyZShbJ21vY2snLCAndW5kZXJzY29yZScsICdqcXVlcnknXSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBNb2NrID0gYXJndW1lbnRzWzBdXG4gICAgICAgICAgICBfID0gYXJndW1lbnRzWzFdXG4gICAgICAgICAgICAkID0gYXJndW1lbnRzWzJdXG4gICAgICAgICAgICBleHBlY3QoTW9jaykudG8ubm90LmVxdWFsKHVuZGVmaW5lZClcbiAgICAgICAgICAgIGV4cGVjdChfKS50by5ub3QuZXF1YWwodW5kZWZpbmVkKVxuICAgICAgICAgICAgZXhwZWN0KCQpLnRvLm5vdC5lcXVhbCh1bmRlZmluZWQpXG4gICAgICAgICAgICBkb25lKClcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5KGpzb24pIHtcbiAgICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGpzb24gLyosIG51bGwsIDQqLyApXG4gICAgfVxuXG4gICAgZGVzY3JpYmUoJ2pRdWVyeS5hamF4KCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICAgICAgdmFyIHVybCA9IE1hdGgucmFuZG9tKClcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggLypkYXRhLCB0ZXh0U3RhdHVzLCBqcVhIUiovICkge1xuICAgICAgICAgICAgICAgIC8vIOS4jeS8mui/m+WFpVxuICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihqcVhIUiAvKiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24qLyApIHtcbiAgICAgICAgICAgICAgICAvLyDmtY/op4jlmaggfHwgUGhhbnRvbUpTXG4gICAgICAgICAgICAgICAgZXhwZWN0KFs0MDQsIDBdKS50by5pbmNsdWRlKGpxWEhSLnN0YXR1cylcbiAgICAgICAgICAgICAgICB0aGF0LnRlc3QudGl0bGUgKz0gdXJsICsgJyA9PiAnICsganFYSFIuc3RhdHVzXG4gICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgZGVzY3JpYmUoJ2pRdWVyeS5nZXRTY3JpcHQoKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgICAgICB2YXIgdXJsID0gJy4vbWF0ZXJpZWxzL25vb3AuanMnXG4gICAgICAgICAgICAkLmdldFNjcmlwdCh1cmwsIGZ1bmN0aW9uKHNjcmlwdCwgdGV4dFN0YXR1cywganFYSFIpIHtcbiAgICAgICAgICAgICAgICBleHBlY3Qoc2NyaXB0KS50by5iZS5va1xuICAgICAgICAgICAgICAgIHRoYXQudGVzdC50aXRsZSArPSB1cmwgKyAnID0+ICcgKyBqcVhIUi5zdGF0dXMgKyAnICcgKyB0ZXh0U3RhdHVzXG4gICAgICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgZGVzY3JpYmUoJ2pRdWVyeS5sb2FkKCknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICAgICAgdmFyIHVybCA9ICcuL21hdGVyaWVscy9ub29wLmh0bWwnXG4gICAgICAgICAgICAkKCc8ZGl2PicpLmxvYWQodXJsLCBmdW5jdGlvbihyZXNwb25zZVRleHQgLyosIHRleHRTdGF0dXMsIGpxWEhSKi8gKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KHJlc3BvbnNlVGV4dCkudG8uYmUub2tcbiAgICAgICAgICAgICAgICB0aGF0LnRlc3QudGl0bGUgKz0gdXJsICsgJyA9PiAnICsgcmVzcG9uc2VUZXh0XG4gICAgICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG4gICAgZGVzY3JpYmUoJ2pRdWVyeS5hamF4KCkgWEhSIEZpZWxkcycsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgICAgICB2YXIgdXJsID0gTWF0aC5yYW5kb20oKVxuICAgICAgICAgICAgdmFyIHhoclxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB4aHI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB4aHIgPSAkLmFqYXhTZXR0aW5ncy54aHIoKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4geGhyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIHhockZpZWxkczoge1xuICAgICAgICAgICAgICAgICAgICB0aW1lb3V0OiAxMjMsXG4gICAgICAgICAgICAgICAgICAgIHdpdGhDcmVkZW50aWFsczogdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIC8qZGF0YSwgdGV4dFN0YXR1cywganFYSFIqLyApIHtcbiAgICAgICAgICAgICAgICAvLyDkuI3kvJrov5vlhaVcbiAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oanFYSFIgLyosIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKi8gKSB7XG4gICAgICAgICAgICAgICAgLy8g5rWP6KeI5ZmoIHx8IFBoYW50b21KU1xuICAgICAgICAgICAgICAgIGV4cGVjdChbNDA0LCAwXSkudG8uaW5jbHVkZShqcVhIUi5zdGF0dXMpXG4gICAgICAgICAgICAgICAgdGhhdC50ZXN0LnRpdGxlICs9IHVybCArICcgPT4gJyArIGpxWEhSLnN0YXR1c1xuICAgICAgICAgICAgICAgIGV4cGVjdCh4aHIudGltZW91dCkudG8uYmUuZXF1YWwoMTIzKVxuICAgICAgICAgICAgICAgIGV4cGVjdCh4aHIud2l0aENyZWRlbnRpYWxzKS50by5iZS5lcXVhbCh0cnVlKVxuICAgICAgICAgICAgfSkuYWx3YXlzKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGRvbmUoKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ01vY2subW9jayggcnVybCwgdGVtcGxhdGUgKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgICAgICB2YXIgdXJsID0gJ3J1cmxfdGVtcGxhdGUuanNvbidcblxuICAgICAgICAgICAgTW9jay5tb2NrKC9ydXJsX3RlbXBsYXRlLmpzb24vLCB7XG4gICAgICAgICAgICAgICAgJ2xpc3R8MS0xMCc6IFt7XG4gICAgICAgICAgICAgICAgICAgICdpZHwrMSc6IDEsXG4gICAgICAgICAgICAgICAgICAgICdlbWFpbCc6ICdARU1BSUwnXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIE1vY2suc2V0dXAoe1xuICAgICAgICAgICAgICAgIC8vIHRpbWVvdXQ6IDEwMCxcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiAnMTAtNTAnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbihkYXRhIC8qLCB0ZXh0U3RhdHVzLCBqcVhIUiovICkge1xuICAgICAgICAgICAgICAgIHRoYXQudGVzdC50aXRsZSArPSB1cmwgKyAnID0+ICcgKyBzdHJpbmdpZnkoZGF0YSlcbiAgICAgICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uaGF2ZS5wcm9wZXJ0eSgnbGlzdCcpXG4gICAgICAgICAgICAgICAgICAgIC50aGF0LmJlLmFuKCdhcnJheScpLndpdGgubGVuZ3RoLndpdGhpbigxLCAxMClcbiAgICAgICAgICAgICAgICBfLmVhY2goZGF0YS5saXN0LCBmdW5jdGlvbihpdGVtLCBpbmRleCwgbGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwKSBleHBlY3QoaXRlbS5pZCkudG8uYmUuZXF1YWwobGlzdFtpbmRleCAtIDFdLmlkICsgMSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pXG4gICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnTW9jay5tb2NrKCBydXJsLCBmdW5jdGlvbihvcHRpb25zKSApJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCcnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgICAgIHZhciB1cmwgPSAncnVybF9mdW5jdGlvbi5qc29uJ1xuXG4gICAgICAgICAgICBNb2NrLm1vY2soL3J1cmxfZnVuY3Rpb25cXC5qc29uLywgZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb25zKS50by5ub3QuZXF1YWwodW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb25zLnVybCkudG8uYmUuZXF1YWwodXJsKVxuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb25zLnR5cGUpLnRvLmJlLmVxdWFsKCdHRVQnKVxuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb25zLmJvZHkpLnRvLmJlLmVxdWFsKG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1vY2subW9jayh7XG4gICAgICAgICAgICAgICAgICAgICdsaXN0fDEtMTAnOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2lkfCsxJzogMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdlbWFpbCc6ICdARU1BSUwnXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbihkYXRhIC8qLCBzdGF0dXMsIGpxWEhSKi8gKSB7XG4gICAgICAgICAgICAgICAgdGhhdC50ZXN0LnRpdGxlICs9IHVybCArICcgPT4gJyArIHN0cmluZ2lmeShkYXRhKVxuICAgICAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCdsaXN0JylcbiAgICAgICAgICAgICAgICAgICAgLnRoYXQuYmUuYW4oJ2FycmF5Jykud2l0aC5sZW5ndGgud2l0aGluKDEsIDEwKVxuICAgICAgICAgICAgICAgIF8uZWFjaChkYXRhLmxpc3QsIGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBsaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIGV4cGVjdChpdGVtLmlkKS50by5iZS5lcXVhbChsaXN0W2luZGV4IC0gMV0uaWQgKyAxKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bilcbiAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkb25lKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdNb2NrLm1vY2soIHJ1cmwsIGZ1bmN0aW9uKG9wdGlvbnMpICkgKyBHRVQgKyBkYXRhJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCcnLCBmdW5jdGlvbihkb25lKSB7XG4gICAgICAgICAgICB2YXIgdGhhdCA9IHRoaXNcbiAgICAgICAgICAgIHZhciB1cmwgPSAncnVybF9mdW5jdGlvbi5qc29uJ1xuXG4gICAgICAgICAgICBNb2NrLm1vY2soL3J1cmxfZnVuY3Rpb25cXC5qc29uLywgZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb25zKS50by5ub3QuZXF1YWwodW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb25zLnVybCkudG8uYmUuZXF1YWwodXJsICsgJz9mb289MScpXG4gICAgICAgICAgICAgICAgZXhwZWN0KG9wdGlvbnMudHlwZSkudG8uYmUuZXF1YWwoJ0dFVCcpXG4gICAgICAgICAgICAgICAgZXhwZWN0KG9wdGlvbnMuYm9keSkudG8uYmUuZXF1YWwobnVsbClcbiAgICAgICAgICAgICAgICByZXR1cm4gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAgICAgJ2xpc3R8MS0xMCc6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAnaWR8KzEnOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2VtYWlsJzogJ0BFTUFJTCdcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgZm9vOiAxXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbihkYXRhIC8qLCBzdGF0dXMsIGpxWEhSKi8gKSB7XG4gICAgICAgICAgICAgICAgdGhhdC50ZXN0LnRpdGxlICs9IHVybCArICcgPT4gJyArIHN0cmluZ2lmeShkYXRhKVxuICAgICAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCdsaXN0JylcbiAgICAgICAgICAgICAgICAgICAgLnRoYXQuYmUuYW4oJ2FycmF5Jykud2l0aC5sZW5ndGgud2l0aGluKDEsIDEwKVxuICAgICAgICAgICAgICAgIF8uZWFjaChkYXRhLmxpc3QsIGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBsaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIGV4cGVjdChpdGVtLmlkKS50by5iZS5lcXVhbChsaXN0W2luZGV4IC0gMV0uaWQgKyAxKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGpxWEhSLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bilcbiAgICAgICAgICAgIH0pLmFsd2F5cyhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBkb25lKClcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcblxuICAgIGRlc2NyaWJlKCdNb2NrLm1vY2soIHJ1cmwsIGZ1bmN0aW9uKG9wdGlvbnMpICkgKyBQT1NUICsgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgICAgICB2YXIgdXJsID0gJ3J1cmxfZnVuY3Rpb24uanNvbidcblxuICAgICAgICAgICAgTW9jay5tb2NrKC9ydXJsX2Z1bmN0aW9uXFwuanNvbi8sIGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBleHBlY3Qob3B0aW9ucykudG8ubm90LmVxdWFsKHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBleHBlY3Qob3B0aW9ucy51cmwpLnRvLmJlLmVxdWFsKHVybClcbiAgICAgICAgICAgICAgICBleHBlY3Qob3B0aW9ucy50eXBlKS50by5iZS5lcXVhbCgnUE9TVCcpXG4gICAgICAgICAgICAgICAgZXhwZWN0KG9wdGlvbnMuYm9keSkudG8uYmUuZXF1YWwoJ2Zvbz0xJylcbiAgICAgICAgICAgICAgICByZXR1cm4gTW9jay5tb2NrKHtcbiAgICAgICAgICAgICAgICAgICAgJ2xpc3R8MS0xMCc6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAnaWR8KzEnOiAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2VtYWlsJzogJ0BFTUFJTCdcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGZvbzogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSAvKiwgc3RhdHVzLCBqcVhIUiovICkge1xuICAgICAgICAgICAgICAgIHRoYXQudGVzdC50aXRsZSArPSB1cmwgKyAnID0+ICcgKyBzdHJpbmdpZnkoZGF0YSlcbiAgICAgICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uaGF2ZS5wcm9wZXJ0eSgnbGlzdCcpXG4gICAgICAgICAgICAgICAgICAgIC50aGF0LmJlLmFuKCdhcnJheScpLndpdGgubGVuZ3RoLndpdGhpbigxLCAxMClcbiAgICAgICAgICAgICAgICBfLmVhY2goZGF0YS5saXN0LCBmdW5jdGlvbihpdGVtLCBpbmRleCwgbGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwKSBleHBlY3QoaXRlbS5pZCkudG8uYmUuZXF1YWwobGlzdFtpbmRleCAtIDFdLmlkICsgMSlcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSkuZmFpbChmdW5jdGlvbihqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhqcVhIUiwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pXG4gICAgICAgICAgICB9KS5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZG9uZSgpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH0pXG5cbiAgICBkZXNjcmliZSgnTW9jay5tb2NrKCBydXJsLCBydHlwZSwgdGVtcGxhdGUgKScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgICAgICB2YXIgdXJsID0gJ3J1cmxfcnR5cGVfdGVtcGxhdGUuanNvbidcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDBcblxuICAgICAgICAgICAgTW9jay5tb2NrKC9ydXJsX3J0eXBlX3RlbXBsYXRlXFwuanNvbi8sICdnZXQnLCB7XG4gICAgICAgICAgICAgICAgJ2xpc3R8MS0xMCc6IFt7XG4gICAgICAgICAgICAgICAgICAgICdpZHwrMSc6IDEsXG4gICAgICAgICAgICAgICAgICAgICdlbWFpbCc6ICdARU1BSUwnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZ2V0J1xuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgTW9jay5tb2NrKC9ydXJsX3J0eXBlX3RlbXBsYXRlXFwuanNvbi8sICdwb3N0Jywge1xuICAgICAgICAgICAgICAgICdsaXN0fDEtMTAnOiBbe1xuICAgICAgICAgICAgICAgICAgICAnaWR8KzEnOiAxLFxuICAgICAgICAgICAgICAgICAgICAnZW1haWwnOiAnQEVNQUlMJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dldCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbihkYXRhIC8qLCBzdGF0dXMsIGpxWEhSKi8gKSB7XG4gICAgICAgICAgICAgICAgdGhhdC50ZXN0LnRpdGxlICs9ICdHRVQgJyArIHVybCArICcgPT4gJyArIHN0cmluZ2lmeShkYXRhKSArICcgJ1xuICAgICAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCdsaXN0JylcbiAgICAgICAgICAgICAgICAgICAgLnRoYXQuYmUuYW4oJ2FycmF5Jykud2l0aC5sZW5ndGgud2l0aGluKDEsIDEwKVxuICAgICAgICAgICAgICAgIF8uZWFjaChkYXRhLmxpc3QsIGZ1bmN0aW9uKGl0ZW0sIGluZGV4LCBsaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRleCA+IDApIGV4cGVjdChpdGVtLmlkKS50by5iZS5lcXVhbChsaXN0W2luZGV4IC0gMV0uaWQgKyAxKVxuICAgICAgICAgICAgICAgICAgICBleHBlY3QoaXRlbSkudG8uaGF2ZS5wcm9wZXJ0eSgndHlwZScpLmVxdWFsKCdnZXQnKVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KS5kb25lKHN1Y2Nlc3MpLmFsd2F5cyhjb21wbGV0ZSlcblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbihkYXRhIC8qLCBzdGF0dXMsIGpxWEhSKi8gKSB7XG4gICAgICAgICAgICAgICAgdGhhdC50ZXN0LnRpdGxlICs9ICdQT1NUICcgKyB1cmwgKyAnID0+ICcgKyBzdHJpbmdpZnkoZGF0YSkgKyAnICdcbiAgICAgICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uaGF2ZS5wcm9wZXJ0eSgnbGlzdCcpXG4gICAgICAgICAgICAgICAgICAgIC50aGF0LmJlLmFuKCdhcnJheScpLndpdGgubGVuZ3RoLndpdGhpbigxLCAxMClcbiAgICAgICAgICAgICAgICBfLmVhY2goZGF0YS5saXN0LCBmdW5jdGlvbihpdGVtLCBpbmRleCwgbGlzdCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5kZXggPiAwKSBleHBlY3QoaXRlbS5pZCkudG8uYmUuZXF1YWwobGlzdFtpbmRleCAtIDFdLmlkICsgMSlcbiAgICAgICAgICAgICAgICAgICAgZXhwZWN0KGl0ZW0pLnRvLmhhdmUucHJvcGVydHkoJ3R5cGUnKS5lcXVhbCgncG9zdCcpXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pLmRvbmUoc3VjY2VzcykuYWx3YXlzKGNvbXBsZXRlKVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzdWNjZXNzKCAvKmRhdGEqLyApIHtcbiAgICAgICAgICAgICAgICBjb3VudCsrXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMikgZG9uZSgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICB9KVxuXG4gICAgZGVzY3JpYmUoJ01vY2subW9jayggcnVybCwgcnR5cGUsIGZ1bmN0aW9uKG9wdGlvbnMpICknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaXQoJycsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB0aGF0ID0gdGhpc1xuICAgICAgICAgICAgdmFyIHVybCA9ICdydXJsX3J0eXBlX2Z1bmN0aW9uLmpzb24nXG4gICAgICAgICAgICB2YXIgY291bnQgPSAwXG5cbiAgICAgICAgICAgIE1vY2subW9jaygvcnVybF9ydHlwZV9mdW5jdGlvblxcLmpzb24vLCAvZ2V0LywgZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb25zKS50by5ub3QuZXF1YWwodW5kZWZpbmVkKVxuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb25zLnVybCkudG8uYmUuZXF1YWwodXJsKVxuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb25zLnR5cGUpLnRvLmJlLmVxdWFsKCdHRVQnKVxuICAgICAgICAgICAgICAgIGV4cGVjdChvcHRpb25zLmJvZHkpLnRvLmJlLmVxdWFsKG51bGwpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2dldCdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgTW9jay5tb2NrKC9ydXJsX3J0eXBlX2Z1bmN0aW9uXFwuanNvbi8sIC9wb3N0fHB1dC8sIGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICBleHBlY3Qob3B0aW9ucykudG8ubm90LmVxdWFsKHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgICBleHBlY3Qob3B0aW9ucy51cmwpLnRvLmJlLmVxdWFsKHVybClcbiAgICAgICAgICAgICAgICBleHBlY3QoWydQT1NUJywgJ1BVVCddKS50by5pbmNsdWRlKG9wdGlvbnMudHlwZSlcbiAgICAgICAgICAgICAgICBleHBlY3Qob3B0aW9ucy5ib2R5KS50by5iZS5lcXVhbChudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IG9wdGlvbnMudHlwZS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgICB1cmw6IHVybCxcbiAgICAgICAgICAgICAgICB0eXBlOiAnZ2V0JyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEgLyosIHN0YXR1cywganFYSFIqLyApIHtcbiAgICAgICAgICAgICAgICB0aGF0LnRlc3QudGl0bGUgKz0gJ0dFVCAnICsgdXJsICsgJyA9PiAnICsgc3RyaW5naWZ5KGRhdGEpXG4gICAgICAgICAgICAgICAgZXhwZWN0KGRhdGEpLnRvLmhhdmUucHJvcGVydHkoJ3R5cGUnLCAnZ2V0JylcbiAgICAgICAgICAgIH0pLmRvbmUoc3VjY2VzcykuYWx3YXlzKGNvbXBsZXRlKVxuXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHVybDogdXJsLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEgLyosIHN0YXR1cywganFYSFIqLyApIHtcbiAgICAgICAgICAgICAgICB0aGF0LnRlc3QudGl0bGUgKz0gJ1BPU1QgJyArIHVybCArICcgPT4gJyArIHN0cmluZ2lmeShkYXRhKVxuICAgICAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCd0eXBlJywgJ3Bvc3QnKVxuICAgICAgICAgICAgfSkuZG9uZShzdWNjZXNzKS5hbHdheXMoY29tcGxldGUpXG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3B1dCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbihkYXRhIC8qLCBzdGF0dXMsIGpxWEhSKi8gKSB7XG4gICAgICAgICAgICAgICAgdGhhdC50ZXN0LnRpdGxlICs9ICdQVVQgJyArIHVybCArICcgPT4gJyArIHN0cmluZ2lmeShkYXRhKVxuICAgICAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCd0eXBlJywgJ3B1dCcpXG4gICAgICAgICAgICB9KS5kb25lKHN1Y2Nlc3MpLmFsd2F5cyhjb21wbGV0ZSlcblxuXG4gICAgICAgICAgICBmdW5jdGlvbiBzdWNjZXNzKCAvKmRhdGEqLyApIHtcbiAgICAgICAgICAgICAgICBjb3VudCsrXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGNvbXBsZXRlKCkge1xuICAgICAgICAgICAgICAgIGlmIChjb3VudCA9PT0gMykgZG9uZSgpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSlcbiAgICB9KVxuICAgIGRlc2NyaWJlKCdNb2NrLm1vY2soIHJ1cmwsIHJ0eXBlLCBmdW5jdGlvbihvcHRpb25zKSApICsgZGF0YScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpdCgnJywgZnVuY3Rpb24oZG9uZSkge1xuICAgICAgICAgICAgdmFyIHRoYXQgPSB0aGlzXG4gICAgICAgICAgICB2YXIgdXJsID0gJ3J1cmxfcnR5cGVfZnVuY3Rpb24uanNvbidcbiAgICAgICAgICAgIHZhciBjb3VudCA9IDBcblxuICAgICAgICAgICAgTW9jay5tb2NrKC9ydXJsX3J0eXBlX2Z1bmN0aW9uXFwuanNvbi8sIC9nZXQvLCBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG9wdGlvbnMpLnRvLm5vdC5lcXVhbCh1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgZXhwZWN0KG9wdGlvbnMudXJsKS50by5iZS5lcXVhbCh1cmwgKyAnP2Zvbz0xJylcbiAgICAgICAgICAgICAgICBleHBlY3Qob3B0aW9ucy50eXBlKS50by5iZS5lcXVhbCgnR0VUJylcbiAgICAgICAgICAgICAgICBleHBlY3Qob3B0aW9ucy5ib2R5KS50by5iZS5lcXVhbChudWxsKVxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdnZXQnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIE1vY2subW9jaygvcnVybF9ydHlwZV9mdW5jdGlvblxcLmpzb24vLCAvcG9zdHxwdXQvLCBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgZXhwZWN0KG9wdGlvbnMpLnRvLm5vdC5lcXVhbCh1bmRlZmluZWQpXG4gICAgICAgICAgICAgICAgZXhwZWN0KG9wdGlvbnMudXJsKS50by5iZS5lcXVhbCh1cmwpXG4gICAgICAgICAgICAgICAgZXhwZWN0KFsnUE9TVCcsICdQVVQnXSkudG8uaW5jbHVkZShvcHRpb25zLnR5cGUpXG4gICAgICAgICAgICAgICAgZXhwZWN0KG9wdGlvbnMuYm9keSkudG8uYmUuZXF1YWwoJ2Zvbz0xJylcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBvcHRpb25zLnR5cGUudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgdHlwZTogJ2dldCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGZvbzogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSAvKiwgc3RhdHVzLCBqcVhIUiovICkge1xuICAgICAgICAgICAgICAgIHRoYXQudGVzdC50aXRsZSArPSAnR0VUICcgKyB1cmwgKyAnID0+ICcgKyBzdHJpbmdpZnkoZGF0YSlcbiAgICAgICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uaGF2ZS5wcm9wZXJ0eSgndHlwZScsICdnZXQnKVxuICAgICAgICAgICAgfSkuZG9uZShzdWNjZXNzKS5hbHdheXMoY29tcGxldGUpXG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBmb286IDFcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKGRhdGEgLyosIHN0YXR1cywganFYSFIqLyApIHtcbiAgICAgICAgICAgICAgICB0aGF0LnRlc3QudGl0bGUgKz0gJ1BPU1QgJyArIHVybCArICcgPT4gJyArIHN0cmluZ2lmeShkYXRhKVxuICAgICAgICAgICAgICAgIGV4cGVjdChkYXRhKS50by5oYXZlLnByb3BlcnR5KCd0eXBlJywgJ3Bvc3QnKVxuICAgICAgICAgICAgfSkuZG9uZShzdWNjZXNzKS5hbHdheXMoY29tcGxldGUpXG5cbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgICAgdXJsOiB1cmwsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3B1dCcsXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGZvbzogMVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oZGF0YSAvKiwgc3RhdHVzLCBqcVhIUiovICkge1xuICAgICAgICAgICAgICAgIHRoYXQudGVzdC50aXRsZSArPSAnUFVUICcgKyB1cmwgKyAnID0+ICcgKyBzdHJpbmdpZnkoZGF0YSlcbiAgICAgICAgICAgICAgICBleHBlY3QoZGF0YSkudG8uaGF2ZS5wcm9wZXJ0eSgndHlwZScsICdwdXQnKVxuICAgICAgICAgICAgfSkuZG9uZShzdWNjZXNzKS5hbHdheXMoY29tcGxldGUpXG5cblxuICAgICAgICAgICAgZnVuY3Rpb24gc3VjY2VzcyggLypkYXRhKi8gKSB7XG4gICAgICAgICAgICAgICAgY291bnQrK1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBjb21wbGV0ZSgpIHtcbiAgICAgICAgICAgICAgICBpZiAoY291bnQgPT09IDMpIGRvbmUoKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0pXG4gICAgfSlcbiAgICBkZXNjcmliZSgnIzEwNSBhZGRFdmVudExpc3RlbmVyJywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGl0KCdhZGRFdmVudExpc3RlbmUgPT4gYWRkRXZlbnRMaXN0ZW5lcicsIGZ1bmN0aW9uKGRvbmUpIHtcbiAgICAgICAgICAgIHZhciB4aHIgPSBuZXcgTW9jay5YSFIoKVxuICAgICAgICAgICAgZXhwZWN0KHhoci5hZGRFdmVudExpc3RlbmVyKS50by5ub3QuZXF1YWwodW5kZWZpbmVkKVxuICAgICAgICAgICAgZXhwZWN0KHhoci5hZGRFdmVudExpc3RlbmUpLnRvLmVxdWFsKHVuZGVmaW5lZClcbiAgICAgICAgICAgIGRvbmUoKVxuICAgICAgICB9KVxuICAgIH0pXG59KSJdfQ==