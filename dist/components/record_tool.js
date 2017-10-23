'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordTool = function (_wepy$component) {
  _inherits(RecordTool, _wepy$component);

  function RecordTool() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RecordTool);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecordTool.__proto__ || Object.getPrototypeOf(RecordTool)).call.apply(_ref, [this].concat(args))), _this), _this.props = {}, _this.data = {}, _this.computed = {
      timeago: function timeago() {
        return ~~(Math.random() * 60) + '分钟前';
      },
      location: function location() {
        return ['成都', '北京', '广州', '深圳', '上海'][~~(Math.random() * 7)];
      },
      can_delete: function can_delete() {
        return [true, false][~~(Math.random() * 2)];
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // 待完成


  return RecordTool;
}(_wepy2.default.component);

exports.default = RecordTool;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZF90b29sLmpzIl0sIm5hbWVzIjpbIlJlY29yZFRvb2wiLCJwcm9wcyIsImRhdGEiLCJjb21wdXRlZCIsInRpbWVhZ28iLCJNYXRoIiwicmFuZG9tIiwibG9jYXRpb24iLCJjYW5fZGVsZXRlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxLLEdBQVEsRSxRQUdSQyxJLEdBQU8sRSxRQUdQQyxRLEdBQVc7QUFDVEMsYUFEUyxxQkFDRTtBQUNULGVBQU8sQ0FBQyxFQUFFQyxLQUFLQyxNQUFMLEtBQWdCLEVBQWxCLENBQUQsR0FBeUIsS0FBaEM7QUFDRCxPQUhRO0FBSVRDLGNBSlMsc0JBSUc7QUFDVixlQUFPLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLENBQUMsRUFBRUYsS0FBS0MsTUFBTCxLQUFnQixDQUFsQixDQUFoQyxDQUFQO0FBQ0QsT0FOUTtBQU9URSxnQkFQUyx3QkFPSztBQUNaLGVBQU8sQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUFjLENBQUMsRUFBRUgsS0FBS0MsTUFBTCxLQUFnQixDQUFsQixDQUFmLENBQVA7QUFDRDtBQVRRLEs7OztBQURYOzs7O0VBTnNDLGVBQUtHLFM7O2tCQUF4QlQsVSIsImZpbGUiOiJyZWNvcmRfdG9vbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZFRvb2wgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XG4gICAgcHJvcHMgPSB7XG4gICAgfVxuXG4gICAgZGF0YSA9IHt9XG5cbiAgICAvLyDlvoXlrozmiJBcbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIHRpbWVhZ28gKCkge1xuICAgICAgICByZXR1cm4gfn4oTWF0aC5yYW5kb20oKSAqIDYwKSArICfliIbpkp/liY0nXG4gICAgICB9LFxuICAgICAgbG9jYXRpb24gKCkge1xuICAgICAgICByZXR1cm4gWyfmiJDpg70nLCAn5YyX5LqsJywgJ+W5v+W3nicsICfmt7HlnLMnLCAn5LiK5rW3J11bfn4oTWF0aC5yYW5kb20oKSAqIDcpXVxuICAgICAgfSxcbiAgICAgIGNhbl9kZWxldGUgKCkge1xuICAgICAgICByZXR1cm4gW3RydWUsIGZhbHNlXVt+fihNYXRoLnJhbmRvbSgpICogMildXG4gICAgICB9XG4gICAgfVxuICB9XG4iXX0=