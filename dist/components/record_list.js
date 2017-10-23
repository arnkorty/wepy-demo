'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _record_userinfo = require('./record_userinfo.js');

var _record_userinfo2 = _interopRequireDefault(_record_userinfo);

var _record_today_test = require('./record_today_test.js');

var _record_today_test2 = _interopRequireDefault(_record_today_test);

var _record_text = require('./record_text.js');

var _record_text2 = _interopRequireDefault(_record_text);

var _record_tool = require('./record_tool.js');

var _record_tool2 = _interopRequireDefault(_record_tool);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordList = function (_wepy$component) {
  _inherits(RecordList, _wepy$component);

  function RecordList() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RecordList);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecordList.__proto__ || Object.getPrototypeOf(RecordList)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      record: {}
    }, _this.$repeat = { "record": { "com": "RecordTodayTest", "props": "testItem" } }, _this.$props = { "RecordTodayTest": { "xmlns:v-bind": { "value": "", "for": "record.data", "item": "tItem", "index": "index", "key": "type" }, "v-bind:testItem.once": { "value": "tItem", "type": "item", "for": "record.data", "item": "tItem", "index": "index", "key": "type" }, "v-bind:index.once": { "value": "index", "type": "index", "for": "record.data", "item": "tItem", "index": "index", "key": "type" } }, "RecordUserInfo": { "uItem": "{{ record }}" }, "RecordText": { "v-bind:text.once": "text" } }, _this.$events = {}, _this.components = {
      RecordUserInfo: _record_userinfo2.default,
      RecordTodayTest: _record_today_test2.default,
      RecordText: _record_text2.default,
      RecordTool: _record_tool2.default
    }, _this.data = {
      show: false,
      hello: Math.random()
    }, _this.computed = {
      userinfo: function userinfo() {
        if (this.record) {
          return {
            nickname: this.record.nickname,
            age: this.record.age,
            sex: this.record.sex,
            disease: this.record.disease,
            follow: this.record.follow
          };
        }
      },
      text: function text() {
        return {
          value: this.record.text,
          recordid: this.record.recordid
        };
      }
    }, _this.methods = {
      toggleShow: function toggleShow(e) {
        console.log(e);
        this.show = !this.show;
        console.log(this.show);
      },
      handleFilter: function handleFilter(id) {
        console.log(id);
      },
      nothing: function nothing() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RecordList, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return RecordList;
}(_wepy2.default.component);

exports.default = RecordList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZF9saXN0LmpzIl0sIm5hbWVzIjpbIlJlY29yZExpc3QiLCJwcm9wcyIsInJlY29yZCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIlJlY29yZFVzZXJJbmZvIiwiUmVjb3JkVG9kYXlUZXN0IiwiUmVjb3JkVGV4dCIsIlJlY29yZFRvb2wiLCJkYXRhIiwic2hvdyIsImhlbGxvIiwiTWF0aCIsInJhbmRvbSIsImNvbXB1dGVkIiwidXNlcmluZm8iLCJuaWNrbmFtZSIsImFnZSIsInNleCIsImRpc2Vhc2UiLCJmb2xsb3ciLCJ0ZXh0IiwidmFsdWUiLCJyZWNvcmRpZCIsIm1ldGhvZHMiLCJ0b2dnbGVTaG93IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVGaWx0ZXIiLCJpZCIsIm5vdGhpbmciLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxLLEdBQVE7QUFDTkMsY0FBUTtBQURGLEssUUFJVEMsTyxHQUFVLEVBQUMsVUFBUyxFQUFDLE9BQU0saUJBQVAsRUFBeUIsU0FBUSxVQUFqQyxFQUFWLEUsUUFDYkMsTSxHQUFTLEVBQUMsbUJBQWtCLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLGFBQWxCLEVBQWdDLFFBQU8sT0FBdkMsRUFBK0MsU0FBUSxPQUF2RCxFQUErRCxPQUFNLE1BQXJFLEVBQWhCLEVBQTZGLHdCQUF1QixFQUFDLFNBQVEsT0FBVCxFQUFpQixRQUFPLE1BQXhCLEVBQStCLE9BQU0sYUFBckMsRUFBbUQsUUFBTyxPQUExRCxFQUFrRSxTQUFRLE9BQTFFLEVBQWtGLE9BQU0sTUFBeEYsRUFBcEgsRUFBb04scUJBQW9CLEVBQUMsU0FBUSxPQUFULEVBQWlCLFFBQU8sT0FBeEIsRUFBZ0MsT0FBTSxhQUF0QyxFQUFvRCxRQUFPLE9BQTNELEVBQW1FLFNBQVEsT0FBM0UsRUFBbUYsT0FBTSxNQUF6RixFQUF4TyxFQUFuQixFQUE2VixrQkFBaUIsRUFBQyxTQUFRLGNBQVQsRUFBOVcsRUFBdVksY0FBYSxFQUFDLG9CQUFtQixNQUFwQixFQUFwWixFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNSQywrQ0FEUTtBQUVSQyxrREFGUTtBQUdSQyx1Q0FIUTtBQUlSQztBQUpRLEssUUFPVkMsSSxHQUFPO0FBQ0xDLFlBQU0sS0FERDtBQUVMQyxhQUFPQyxLQUFLQyxNQUFMO0FBRkYsSyxRQUtQQyxRLEdBQVc7QUFDVEMsY0FEUyxzQkFDRztBQUNWLFlBQUksS0FBS2YsTUFBVCxFQUFpQjtBQUNmLGlCQUFPO0FBQ0xnQixzQkFBVSxLQUFLaEIsTUFBTCxDQUFZZ0IsUUFEakI7QUFFTEMsaUJBQUssS0FBS2pCLE1BQUwsQ0FBWWlCLEdBRlo7QUFHTEMsaUJBQUssS0FBS2xCLE1BQUwsQ0FBWWtCLEdBSFo7QUFJTEMscUJBQVMsS0FBS25CLE1BQUwsQ0FBWW1CLE9BSmhCO0FBS0xDLG9CQUFRLEtBQUtwQixNQUFMLENBQVlvQjtBQUxmLFdBQVA7QUFPRDtBQUNGLE9BWFE7QUFZVEMsVUFaUyxrQkFZRDtBQUNOLGVBQU87QUFDTEMsaUJBQU8sS0FBS3RCLE1BQUwsQ0FBWXFCLElBRGQ7QUFFTEUsb0JBQVUsS0FBS3ZCLE1BQUwsQ0FBWXVCO0FBRmpCLFNBQVA7QUFJRDtBQWpCUSxLLFFBb0JYQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0lDLENBREosRUFDTztBQUNiQyxnQkFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0EsYUFBS2hCLElBQUwsR0FBWSxDQUFDLEtBQUtBLElBQWxCO0FBQ0FpQixnQkFBUUMsR0FBUixDQUFZLEtBQUtsQixJQUFqQjtBQUNELE9BTE87QUFNUm1CLGtCQU5RLHdCQU1NQyxFQU5OLEVBTVU7QUFDaEJILGdCQUFRQyxHQUFSLENBQVlFLEVBQVo7QUFDRCxPQVJPO0FBU1JDLGFBVFEscUJBU0csQ0FBRTtBQVRMLEs7Ozs7OzZCQVlBLENBQ1Q7Ozs7RUFyRHFDLGVBQUtDLFM7O2tCQUF4QmxDLFUiLCJmaWxlIjoicmVjb3JkX2xpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcbiAgaW1wb3J0IFJlY29yZFVzZXJJbmZvIGZyb20gJy4vcmVjb3JkX3VzZXJpbmZvJ1xuICBpbXBvcnQgUmVjb3JkVG9kYXlUZXN0IGZyb20gJy4uL2NvbXBvbmVudHMvcmVjb3JkX3RvZGF5X3Rlc3QnXG4gIGltcG9ydCBSZWNvcmRUZXh0IGZyb20gJy4uL2NvbXBvbmVudHMvcmVjb3JkX3RleHQnXG4gIGltcG9ydCBSZWNvcmRUb29sIGZyb20gJy4uL2NvbXBvbmVudHMvcmVjb3JkX3Rvb2wnXG5cbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkTGlzdCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIHJlY29yZDoge31cbiAgICB9XG5cbiAgICRyZXBlYXQgPSB7XCJyZWNvcmRcIjp7XCJjb21cIjpcIlJlY29yZFRvZGF5VGVzdFwiLFwicHJvcHNcIjpcInRlc3RJdGVtXCJ9fTtcclxuJHByb3BzID0ge1wiUmVjb3JkVG9kYXlUZXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJyZWNvcmQuZGF0YVwiLFwiaXRlbVwiOlwidEl0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJ0eXBlXCJ9LFwidi1iaW5kOnRlc3RJdGVtLm9uY2VcIjp7XCJ2YWx1ZVwiOlwidEl0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicmVjb3JkLmRhdGFcIixcIml0ZW1cIjpcInRJdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwidHlwZVwifSxcInYtYmluZDppbmRleC5vbmNlXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJyZWNvcmQuZGF0YVwiLFwiaXRlbVwiOlwidEl0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJ0eXBlXCJ9fSxcIlJlY29yZFVzZXJJbmZvXCI6e1widUl0ZW1cIjpcInt7IHJlY29yZCB9fVwifSxcIlJlY29yZFRleHRcIjp7XCJ2LWJpbmQ6dGV4dC5vbmNlXCI6XCJ0ZXh0XCJ9fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIFJlY29yZFVzZXJJbmZvOiBSZWNvcmRVc2VySW5mbyxcbiAgICAgIFJlY29yZFRvZGF5VGVzdDogUmVjb3JkVG9kYXlUZXN0LFxuICAgICAgUmVjb3JkVGV4dDogUmVjb3JkVGV4dCxcbiAgICAgIFJlY29yZFRvb2w6IFJlY29yZFRvb2xcbiAgICB9XG5cbiAgICBkYXRhID0ge1xuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICBoZWxsbzogTWF0aC5yYW5kb20oKVxuICAgIH1cblxuICAgIGNvbXB1dGVkID0ge1xuICAgICAgdXNlcmluZm8gKCkge1xuICAgICAgICBpZiAodGhpcy5yZWNvcmQpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbmlja25hbWU6IHRoaXMucmVjb3JkLm5pY2tuYW1lLFxuICAgICAgICAgICAgYWdlOiB0aGlzLnJlY29yZC5hZ2UsXG4gICAgICAgICAgICBzZXg6IHRoaXMucmVjb3JkLnNleCxcbiAgICAgICAgICAgIGRpc2Vhc2U6IHRoaXMucmVjb3JkLmRpc2Vhc2UsXG4gICAgICAgICAgICBmb2xsb3c6IHRoaXMucmVjb3JkLmZvbGxvd1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRleHQgKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHZhbHVlOiB0aGlzLnJlY29yZC50ZXh0LFxuICAgICAgICAgIHJlY29yZGlkOiB0aGlzLnJlY29yZC5yZWNvcmRpZFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHRvZ2dsZVNob3cgKGUpIHtcbiAgICAgICAgY29uc29sZS5sb2coZSlcbiAgICAgICAgdGhpcy5zaG93ID0gIXRoaXMuc2hvd1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNob3cpXG4gICAgICB9LFxuICAgICAgaGFuZGxlRmlsdGVyIChpZCkge1xuICAgICAgICBjb25zb2xlLmxvZyhpZClcbiAgICAgIH0sXG4gICAgICBub3RoaW5nICgpIHt9XG4gICAgfVxuXG4gICAgb25Mb2FkICgpIHtcbiAgICB9XG4gIH1cbiJdfQ==