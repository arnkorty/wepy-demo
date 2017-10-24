'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _today_test = require('./today_test.js');

var _today_test2 = _interopRequireDefault(_today_test);

var _tool = require('./tool.js');

var _tool2 = _interopRequireDefault(_tool);

var _comment = require('./comment.js');

var _comment2 = _interopRequireDefault(_comment);

var _hug = require('./hug.js');

var _hug2 = _interopRequireDefault(_hug);

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
      RecordTodayTest: _today_test2.default,
      // RecordText: RecordText,
      RecordTool: _tool2.default,
      RecordHug: _hug2.default,
      RecordComment: _comment2.default
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuanMiXSwibmFtZXMiOlsiUmVjb3JkTGlzdCIsInByb3BzIiwicmVjb3JkIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiUmVjb3JkVG9kYXlUZXN0IiwiUmVjb3JkVG9vbCIsIlJlY29yZEh1ZyIsIlJlY29yZENvbW1lbnQiLCJkYXRhIiwic2hvdyIsImhlbGxvIiwiTWF0aCIsInJhbmRvbSIsImNvbXB1dGVkIiwidXNlcmluZm8iLCJuaWNrbmFtZSIsImFnZSIsInNleCIsImRpc2Vhc2UiLCJmb2xsb3ciLCJzaG9ydF90ZXh0IiwidGV4dCIsInN1YnN0ciIsIm1ldGhvZHMiLCJ0b2dnbGVTaG93IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVGaWx0ZXIiLCJpZCIsIm5vdGhpbmciLCJkZWxldGUiLCJyZWNvcmRpZCIsIiRlbWl0IiwiZXZlbnRzIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7OztBQUVBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7Ozs7OztBQUxBOztBQUVBOzs7SUFLcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsSyxHQUFRO0FBQ05DLGNBQVE7QUFERixLLFFBSVRDLE8sR0FBVSxFQUFDLFVBQVMsRUFBQyxPQUFNLGVBQVAsRUFBdUIsU0FBUSxTQUEvQixFQUFWLEUsUUFDYkMsTSxHQUFTLEVBQUMsbUJBQWtCLEVBQUMsZ0JBQWUsRUFBQyxTQUFRLEVBQVQsRUFBWSxPQUFNLGFBQWxCLEVBQWdDLFFBQU8sT0FBdkMsRUFBK0MsU0FBUSxPQUF2RCxFQUErRCxPQUFNLEtBQXJFLEVBQWhCLEVBQTRGLHdCQUF1QixFQUFDLFNBQVEsT0FBVCxFQUFpQixRQUFPLE1BQXhCLEVBQStCLE9BQU0sYUFBckMsRUFBbUQsUUFBTyxPQUExRCxFQUFrRSxTQUFRLE9BQTFFLEVBQWtGLE9BQU0sS0FBeEYsRUFBbkgsRUFBa04sc0JBQXFCLEVBQUMsU0FBUSxPQUFULEVBQWlCLFFBQU8sT0FBeEIsRUFBZ0MsT0FBTSxhQUF0QyxFQUFvRCxRQUFPLE9BQTNELEVBQW1FLFNBQVEsT0FBM0UsRUFBbUYsT0FBTSxLQUF6RixFQUF2TyxFQUFuQixFQUEyVixhQUFZLEVBQUMsbUJBQWtCLEVBQUMsU0FBUSxTQUFULEVBQW1CLFFBQU8sTUFBMUIsRUFBaUMsT0FBTSxZQUF2QyxFQUFvRCxRQUFPLFNBQTNELEVBQXFFLFNBQVEsT0FBN0UsRUFBcUYsT0FBTSxLQUEzRixFQUFuQixFQUF2VyxFQUE2ZCxpQkFBZ0IsRUFBQyx1QkFBc0IsRUFBQyxTQUFRLFNBQVQsRUFBbUIsUUFBTyxNQUExQixFQUFpQyxPQUFNLGdCQUF2QyxFQUF3RCxRQUFPLFNBQS9ELEVBQXlFLFNBQVEsT0FBakYsRUFBeUYsT0FBTSxLQUEvRixFQUF2QixFQUE3ZSxFLFFBQ1RDLE8sR0FBVSxFLFFBQ1RDLFUsR0FBYTtBQUNSO0FBQ0FDLDJDQUZRO0FBR1I7QUFDQUMsZ0NBSlE7QUFLUkMsOEJBTFE7QUFNUkM7QUFOUSxLLFFBU1ZDLEksR0FBTztBQUNMQyxZQUFNLEtBREQ7QUFFTEMsYUFBT0MsS0FBS0MsTUFBTDtBQUZGLEssUUFLUEMsUSxHQUFXO0FBQ1RDLGNBRFMsc0JBQ0c7QUFDVixZQUFJLEtBQUtmLE1BQVQsRUFBaUI7QUFDZixpQkFBTztBQUNMZ0Isc0JBQVUsS0FBS2hCLE1BQUwsQ0FBWWdCLFFBRGpCO0FBRUxDLGlCQUFLLEtBQUtqQixNQUFMLENBQVlpQixHQUZaO0FBR0xDLGlCQUFLLEtBQUtsQixNQUFMLENBQVlrQixHQUhaO0FBSUxDLHFCQUFTLEtBQUtuQixNQUFMLENBQVltQixPQUpoQjtBQUtMQyxvQkFBUSxLQUFLcEIsTUFBTCxDQUFZb0I7QUFMZixXQUFQO0FBT0Q7QUFDRixPQVhRO0FBWVRDLGdCQVpTLHdCQVlLO0FBQ1osWUFBSSxLQUFLckIsTUFBVCxFQUFpQjtBQUNmLGlCQUFPLEtBQUtBLE1BQUwsQ0FBWXNCLElBQVosQ0FBaUJDLE1BQWpCLENBQXdCLENBQXhCLEVBQTJCLEVBQTNCLElBQWlDLEtBQXhDO0FBQ0Q7QUFDRjtBQWhCUSxLLFFBbUJYQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0lDLENBREosRUFDTztBQUNiQyxnQkFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0EsYUFBS2hCLElBQUwsR0FBWSxDQUFDLEtBQUtBLElBQWxCO0FBQ0FpQixnQkFBUUMsR0FBUixDQUFZLEtBQUtsQixJQUFqQjtBQUNELE9BTE87QUFNUm1CLGtCQU5RLHdCQU1NQyxFQU5OLEVBTVU7QUFDaEJILGdCQUFRQyxHQUFSLENBQVlFLEVBQVo7QUFDRCxPQVJPO0FBU1JDLGFBVFEscUJBU0csQ0FBRSxDQVRMO0FBVVJDLFlBVlEsbUJBVUFDLFFBVkEsRUFVVTtBQUNoQk4sZ0JBQVFDLEdBQVIsQ0FBWUssUUFBWjtBQUNBLGFBQUtDLEtBQUwsQ0FBVyxjQUFYLEVBQTJCRCxRQUEzQjtBQUNEO0FBYk8sSyxRQWdCVkUsTSxHQUFTLEU7Ozs7OzZCQUdDLENBQ1Q7Ozs7RUE3RHFDLGVBQUtDLFM7O2tCQUF4QnRDLFUiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgLy8gaW1wb3J0IFJlY29yZFVzZXJJbmZvIGZyb20gJy4vcmVjb3JkX3VzZXJpbmZvJ1xyXG4gIGltcG9ydCBSZWNvcmRUb2RheVRlc3QgZnJvbSAnLi90b2RheV90ZXN0J1xyXG4gIC8vIGltcG9ydCBSZWNvcmRUZXh0IGZyb20gJy4uL2NvbXBvbmVudHMvcmVjb3JkX3RleHQnXHJcbiAgaW1wb3J0IFJlY29yZFRvb2wgZnJvbSAnLi90b29sJ1xyXG4gIGltcG9ydCBSZWNvcmRDb21tZW50IGZyb20gJy4vY29tbWVudCdcclxuICBpbXBvcnQgUmVjb3JkSHVnIGZyb20gJy4vaHVnJ1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRMaXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgIHJlY29yZDoge31cclxuICAgIH1cclxuXHJcbiAgICRyZXBlYXQgPSB7XCJyZWNvcmRcIjp7XCJjb21cIjpcIlJlY29yZENvbW1lbnRcIixcInByb3BzXCI6XCJjb21tZW50XCJ9fTtcclxuJHByb3BzID0ge1wiUmVjb3JkVG9kYXlUZXN0XCI6e1wieG1sbnM6di1iaW5kXCI6e1widmFsdWVcIjpcIlwiLFwiZm9yXCI6XCJyZWNvcmQuZGF0YVwiLFwiaXRlbVwiOlwidEl0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6dGVzdEl0ZW0ub25jZVwiOntcInZhbHVlXCI6XCJ0SXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJyZWNvcmQuZGF0YVwiLFwiaXRlbVwiOlwidEl0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn0sXCJ2LWJpbmQ6aW5kZXh0Lm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaW5kZXhcIixcInR5cGVcIjpcImluZGV4XCIsXCJmb3JcIjpcInJlY29yZC5kYXRhXCIsXCJpdGVtXCI6XCJ0SXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcImtleVwifX0sXCJSZWNvcmRIdWdcIjp7XCJ2LWJpbmQ6aHVnLm9uY2VcIjp7XCJ2YWx1ZVwiOlwiaHVnaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJyZWNvcmQuaHVnXCIsXCJpdGVtXCI6XCJodWdpdGVtXCIsXCJpbmRleFwiOlwiaW5kZXhcIixcImtleVwiOlwia2V5XCJ9fSxcIlJlY29yZENvbW1lbnRcIjp7XCJ2LWJpbmQ6Y29tbWVudC5vbmNlXCI6e1widmFsdWVcIjpcImNvbW1lbnRcIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwicmVjb3JkLmNvbW1lbnRcIixcIml0ZW1cIjpcImNvbW1lbnRcIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJrZXlcIn19fTtcclxuJGV2ZW50cyA9IHt9O1xyXG4gY29tcG9uZW50cyA9IHtcclxuICAgICAgLy8gUmVjb3JkVXNlckluZm86IFJlY29yZFVzZXJJbmZvLFxyXG4gICAgICBSZWNvcmRUb2RheVRlc3Q6IFJlY29yZFRvZGF5VGVzdCxcclxuICAgICAgLy8gUmVjb3JkVGV4dDogUmVjb3JkVGV4dCxcclxuICAgICAgUmVjb3JkVG9vbDogUmVjb3JkVG9vbCxcclxuICAgICAgUmVjb3JkSHVnOiBSZWNvcmRIdWcsXHJcbiAgICAgIFJlY29yZENvbW1lbnQ6IFJlY29yZENvbW1lbnRcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzaG93OiBmYWxzZSxcclxuICAgICAgaGVsbG86IE1hdGgucmFuZG9tKClcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgdXNlcmluZm8gKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnJlY29yZCkge1xyXG4gICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbmlja25hbWU6IHRoaXMucmVjb3JkLm5pY2tuYW1lLFxyXG4gICAgICAgICAgICBhZ2U6IHRoaXMucmVjb3JkLmFnZSxcclxuICAgICAgICAgICAgc2V4OiB0aGlzLnJlY29yZC5zZXgsXHJcbiAgICAgICAgICAgIGRpc2Vhc2U6IHRoaXMucmVjb3JkLmRpc2Vhc2UsXHJcbiAgICAgICAgICAgIGZvbGxvdzogdGhpcy5yZWNvcmQuZm9sbG93XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9LFxyXG4gICAgICBzaG9ydF90ZXh0ICgpIHtcclxuICAgICAgICBpZiAodGhpcy5yZWNvcmQpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLnJlY29yZC50ZXh0LnN1YnN0cigwLCAzMCkgKyAnLi4uJ1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHRvZ2dsZVNob3cgKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3dcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNob3cpXHJcbiAgICAgIH0sXHJcbiAgICAgIGhhbmRsZUZpbHRlciAoaWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpZClcclxuICAgICAgfSxcclxuICAgICAgbm90aGluZyAoKSB7fSxcclxuICAgICAgZGVsZXRlIChyZWNvcmRpZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlY29yZGlkKVxyXG4gICAgICAgIHRoaXMuJGVtaXQoJ2RlbGV0ZVJlY29yZCcsIHJlY29yZGlkKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=