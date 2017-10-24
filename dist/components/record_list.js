'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _record_today_test = require('./record_today_test.js');

var _record_today_test2 = _interopRequireDefault(_record_today_test);

var _record_tool = require('./record_tool.js');

var _record_tool2 = _interopRequireDefault(_record_tool);

var _record_comment = require('./record_comment.js');

var _record_comment2 = _interopRequireDefault(_record_comment);

var _record_hug = require('./record_hug.js');

var _record_hug2 = _interopRequireDefault(_record_hug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import RecordUserInfo from './record_userinfo'

// import RecordText from '../components/record_text'


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
    }, _this.$repeat = { "record": { "com": "RecordComment", "props": "comment" } }, _this.$props = { "RecordTodayTest": { "xmlns:v-bind": { "value": "", "for": "record.data", "item": "tItem", "index": "index", "key": "key" }, "v-bind:testItem.once": { "value": "tItem", "type": "item", "for": "record.data", "item": "tItem", "index": "index", "key": "key" }, "v-bind:indext.once": { "value": "index", "type": "index", "for": "record.data", "item": "tItem", "index": "index", "key": "key" } }, "RecordHug": { "v-bind:hug.once": { "value": "hugitem", "type": "item", "for": "record.hug", "item": "hugitem", "index": "index", "key": "key" } }, "RecordComment": { "v-bind:comment.once": { "value": "comment", "type": "item", "for": "record.comment", "item": "comment", "index": "index", "key": "key" } } }, _this.$events = {}, _this.components = {
      // RecordUserInfo: RecordUserInfo,
      RecordTodayTest: _record_today_test2.default,
      // RecordText: RecordText,
      RecordTool: _record_tool2.default,
      RecordHug: _record_hug2.default,
      RecordComment: _record_comment2.default
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
      short_text: function short_text() {
        if (this.record) {
          return this.record.text.substr(0, 30) + '...';
        }
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
      nothing: function nothing() {},
      delete: function _delete(recordid) {
        console.log(recordid);
        this.$emit('deleteRecord', recordid);
      }
    }, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RecordList, [{
    key: 'onLoad',
    value: function onLoad() {}
  }]);

  return RecordList;
}(_wepy2.default.component);

exports.default = RecordList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZF9saXN0LmpzIl0sIm5hbWVzIjpbIlJlY29yZExpc3QiLCJwcm9wcyIsInJlY29yZCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIlJlY29yZFRvZGF5VGVzdCIsIlJlY29yZFRvb2wiLCJSZWNvcmRIdWciLCJSZWNvcmRDb21tZW50IiwiZGF0YSIsInNob3ciLCJoZWxsbyIsIk1hdGgiLCJyYW5kb20iLCJjb21wdXRlZCIsInVzZXJpbmZvIiwibmlja25hbWUiLCJhZ2UiLCJzZXgiLCJkaXNlYXNlIiwiZm9sbG93Iiwic2hvcnRfdGV4dCIsInRleHQiLCJzdWJzdHIiLCJtZXRob2RzIiwidG9nZ2xlU2hvdyIsImUiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlRmlsdGVyIiwiaWQiLCJub3RoaW5nIiwiZGVsZXRlIiwicmVjb3JkaWQiLCIkZW1pdCIsImV2ZW50cyIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7QUFFQTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUFMQTs7QUFFQTs7O0lBS3FCQSxVOzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLEssR0FBUTtBQUNOQyxjQUFRO0FBREYsSyxRQUlUQyxPLEdBQVUsRUFBQyxVQUFTLEVBQUMsT0FBTSxlQUFQLEVBQXVCLFNBQVEsU0FBL0IsRUFBVixFLFFBQ2JDLE0sR0FBUyxFQUFDLG1CQUFrQixFQUFDLGdCQUFlLEVBQUMsU0FBUSxFQUFULEVBQVksT0FBTSxhQUFsQixFQUFnQyxRQUFPLE9BQXZDLEVBQStDLFNBQVEsT0FBdkQsRUFBK0QsT0FBTSxLQUFyRSxFQUFoQixFQUE0Rix3QkFBdUIsRUFBQyxTQUFRLE9BQVQsRUFBaUIsUUFBTyxNQUF4QixFQUErQixPQUFNLGFBQXJDLEVBQW1ELFFBQU8sT0FBMUQsRUFBa0UsU0FBUSxPQUExRSxFQUFrRixPQUFNLEtBQXhGLEVBQW5ILEVBQWtOLHNCQUFxQixFQUFDLFNBQVEsT0FBVCxFQUFpQixRQUFPLE9BQXhCLEVBQWdDLE9BQU0sYUFBdEMsRUFBb0QsUUFBTyxPQUEzRCxFQUFtRSxTQUFRLE9BQTNFLEVBQW1GLE9BQU0sS0FBekYsRUFBdk8sRUFBbkIsRUFBMlYsYUFBWSxFQUFDLG1CQUFrQixFQUFDLFNBQVEsU0FBVCxFQUFtQixRQUFPLE1BQTFCLEVBQWlDLE9BQU0sWUFBdkMsRUFBb0QsUUFBTyxTQUEzRCxFQUFxRSxTQUFRLE9BQTdFLEVBQXFGLE9BQU0sS0FBM0YsRUFBbkIsRUFBdlcsRUFBNmQsaUJBQWdCLEVBQUMsdUJBQXNCLEVBQUMsU0FBUSxTQUFULEVBQW1CLFFBQU8sTUFBMUIsRUFBaUMsT0FBTSxnQkFBdkMsRUFBd0QsUUFBTyxTQUEvRCxFQUF5RSxTQUFRLE9BQWpGLEVBQXlGLE9BQU0sS0FBL0YsRUFBdkIsRUFBN2UsRSxRQUNUQyxPLEdBQVUsRSxRQUNUQyxVLEdBQWE7QUFDUjtBQUNBQyxrREFGUTtBQUdSO0FBQ0FDLHVDQUpRO0FBS1JDLHFDQUxRO0FBTVJDO0FBTlEsSyxRQVNWQyxJLEdBQU87QUFDTEMsWUFBTSxLQUREO0FBRUxDLGFBQU9DLEtBQUtDLE1BQUw7QUFGRixLLFFBS1BDLFEsR0FBVztBQUNUQyxjQURTLHNCQUNHO0FBQ1YsWUFBSSxLQUFLZixNQUFULEVBQWlCO0FBQ2YsaUJBQU87QUFDTGdCLHNCQUFVLEtBQUtoQixNQUFMLENBQVlnQixRQURqQjtBQUVMQyxpQkFBSyxLQUFLakIsTUFBTCxDQUFZaUIsR0FGWjtBQUdMQyxpQkFBSyxLQUFLbEIsTUFBTCxDQUFZa0IsR0FIWjtBQUlMQyxxQkFBUyxLQUFLbkIsTUFBTCxDQUFZbUIsT0FKaEI7QUFLTEMsb0JBQVEsS0FBS3BCLE1BQUwsQ0FBWW9CO0FBTGYsV0FBUDtBQU9EO0FBQ0YsT0FYUTtBQVlUQyxnQkFaUyx3QkFZSztBQUNaLFlBQUksS0FBS3JCLE1BQVQsRUFBaUI7QUFDZixpQkFBTyxLQUFLQSxNQUFMLENBQVlzQixJQUFaLENBQWlCQyxNQUFqQixDQUF3QixDQUF4QixFQUEyQixFQUEzQixJQUFpQyxLQUF4QztBQUNEO0FBQ0Y7QUFoQlEsSyxRQW1CWEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNJQyxDQURKLEVBQ087QUFDYkMsZ0JBQVFDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNBLGFBQUtoQixJQUFMLEdBQVksQ0FBQyxLQUFLQSxJQUFsQjtBQUNBaUIsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLbEIsSUFBakI7QUFDRCxPQUxPO0FBTVJtQixrQkFOUSx3QkFNTUMsRUFOTixFQU1VO0FBQ2hCSCxnQkFBUUMsR0FBUixDQUFZRSxFQUFaO0FBQ0QsT0FSTztBQVNSQyxhQVRRLHFCQVNHLENBQUUsQ0FUTDtBQVVSQyxZQVZRLG1CQVVBQyxRQVZBLEVBVVU7QUFDaEJOLGdCQUFRQyxHQUFSLENBQVlLLFFBQVo7QUFDQSxhQUFLQyxLQUFMLENBQVcsY0FBWCxFQUEyQkQsUUFBM0I7QUFDRDtBQWJPLEssUUFnQlZFLE0sR0FBUyxFOzs7Ozs2QkFHQyxDQUNUOzs7O0VBN0RxQyxlQUFLQyxTOztrQkFBeEJ0QyxVIiwiZmlsZSI6InJlY29yZF9saXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICAvLyBpbXBvcnQgUmVjb3JkVXNlckluZm8gZnJvbSAnLi9yZWNvcmRfdXNlcmluZm8nXHJcbiAgaW1wb3J0IFJlY29yZFRvZGF5VGVzdCBmcm9tICcuLi9jb21wb25lbnRzL3JlY29yZF90b2RheV90ZXN0J1xyXG4gIC8vIGltcG9ydCBSZWNvcmRUZXh0IGZyb20gJy4uL2NvbXBvbmVudHMvcmVjb3JkX3RleHQnXHJcbiAgaW1wb3J0IFJlY29yZFRvb2wgZnJvbSAnLi4vY29tcG9uZW50cy9yZWNvcmRfdG9vbCdcclxuICBpbXBvcnQgUmVjb3JkQ29tbWVudCBmcm9tICcuLi9jb21wb25lbnRzL3JlY29yZF9jb21tZW50J1xyXG4gIGltcG9ydCBSZWNvcmRIdWcgZnJvbSAnLi4vY29tcG9uZW50cy9yZWNvcmRfaHVnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRMaXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgIHJlY29yZDoge31cclxuICAgIH1cclxuXHJcbiAgICRyZXBlYXQgPSB7XCJyZWNvcmRcIjp7XCJjb21cIjpcIlJlY29yZENvbW1lbnRcIixcInByb3BzXCI6XCJjb21tZW50XCJ9fTtcclxuJHByb3BzID0ge1wiUmVjb3JkVG9kYXlUZXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJyZWNvcmQuZGF0YVwiLFwiaXRlbVwiOlwidEl0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dGVzdEl0ZW0ub25jZVwiOntcInZhbHVlXCI6XCJ0SXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJyZWNvcmQuZGF0YVwiLFwiaXRlbVwiOlwidEl0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6aW5kZXh0Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcInJlY29yZC5kYXRhXCIsXCJpdGVtXCI6XCJ0SXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJSZWNvcmRIdWdcIjp7XCJ2LWJpbmQ6aHVnLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaHVnaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJyZWNvcmQuaHVnXCIsXCJpdGVtXCI6XCJodWdpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcIlJlY29yZENvbW1lbnRcIjp7XCJ2LWJpbmQ6Y29tbWVudC5vbmNlXCI6e1widmFsdWVcIjpcImNvbW1lbnRcIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicmVjb3JkLmNvbW1lbnRcIixcIml0ZW1cIjpcImNvbW1lbnRcIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgLy8gUmVjb3JkVXNlckluZm86IFJlY29yZFVzZXJJbmZvLFxyXG4gICAgICBSZWNvcmRUb2RheVRlc3Q6IFJlY29yZFRvZGF5VGVzdCxcclxuICAgICAgLy8gUmVjb3JkVGV4dDogUmVjb3JkVGV4dCxcclxuICAgICAgUmVjb3JkVG9vbDogUmVjb3JkVG9vbCxcclxuICAgICAgUmVjb3JkSHVnOiBSZWNvcmRIdWcsXHJcbiAgICAgIFJlY29yZENvbW1lbnQ6IFJlY29yZENvbW1lbnRcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzaG93OiBmYWxzZSxcclxuICAgICAgaGVsbG86IE1hdGgucmFuZG9tKClcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgdXNlcmluZm8gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlY29yZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmlja25hbWU6IHRoaXMucmVjb3JkLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICBhZ2U6IHRoaXMucmVjb3JkLmFnZSxcclxuICAgICAgICAgICAgc2V4OiB0aGlzLnJlY29yZC5zZXgsXHJcbiAgICAgICAgICAgIGRpc2Vhc2U6IHRoaXMucmVjb3JkLmRpc2Vhc2UsXHJcbiAgICAgICAgICAgIGZvbGxvdzogdGhpcy5yZWNvcmQuZm9sbG93XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBzaG9ydF90ZXh0ICgpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWNvcmQpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnJlY29yZC50ZXh0LnN1YnN0cigwLCAzMCkgKyAnLi4uJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHRvZ2dsZVNob3cgKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3dcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNob3cpXHJcbiAgICAgIH0sXHJcbiAgICAgIGhhbmRsZUZpbHRlciAoaWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpZClcclxuICAgICAgfSxcclxuICAgICAgbm90aGluZyAoKSB7fSxcclxuICAgICAgZGVsZXRlIChyZWNvcmRpZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlY29yZGlkKVxyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2RlbGV0ZVJlY29yZCcsIHJlY29yZGlkKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=