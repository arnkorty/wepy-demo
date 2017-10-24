'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

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

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecordTool.__proto__ || Object.getPrototypeOf(RecordTool)).call.apply(_ref, [this].concat(args))), _this), _this.props = {}, _this.data = {}, _this.methods = {
      delete: function _delete() {
        console.log('emit deleteRecord');
        console.log(this);
        this.$emit('log');
      }
    }, _this.computed = {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvb2wuanMiXSwibmFtZXMiOlsiUmVjb3JkVG9vbCIsInByb3BzIiwiZGF0YSIsIm1ldGhvZHMiLCJkZWxldGUiLCJjb25zb2xlIiwibG9nIiwiJGVtaXQiLCJjb21wdXRlZCIsInRpbWVhZ28iLCJNYXRoIiwicmFuZG9tIiwibG9jYXRpb24iLCJjYW5fZGVsZXRlIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsVTs7Ozs7Ozs7Ozs7Ozs7OExBQ25CQyxLLEdBQVEsRSxRQUdSQyxJLEdBQU8sRSxRQUVQQyxPLEdBQVU7QUFDUkMsWUFEUSxxQkFDRTtBQUNSQyxnQkFBUUMsR0FBUixDQUFZLG1CQUFaO0FBQ0FELGdCQUFRQyxHQUFSLENBQVksSUFBWjtBQUNBLGFBQUtDLEtBQUwsQ0FBVyxLQUFYO0FBQ0Q7QUFMTyxLLFFBU1ZDLFEsR0FBVztBQUNUQyxhQURTLHFCQUNFO0FBQ1QsZUFBTyxDQUFDLEVBQUVDLEtBQUtDLE1BQUwsS0FBZ0IsRUFBbEIsQ0FBRCxHQUF5QixLQUFoQztBQUNELE9BSFE7QUFJVEMsY0FKUyxzQkFJRztBQUNWLGVBQU8sQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsQ0FBQyxFQUFFRixLQUFLQyxNQUFMLEtBQWdCLENBQWxCLENBQWhDLENBQVA7QUFDRCxPQU5RO0FBT1RFLGdCQVBTLHdCQU9LO0FBQ1osZUFBTyxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsQ0FBQyxFQUFFSCxLQUFLQyxNQUFMLEtBQWdCLENBQWxCLENBQWYsQ0FBUDtBQUNEO0FBVFEsSzs7O0FBRFg7Ozs7RUFkc0MsZUFBS0csUzs7a0JBQXhCZCxVIiwiZmlsZSI6InRvb2wuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRUb29sIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHt9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgZGVsZXRlICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnZW1pdCBkZWxldGVSZWNvcmQnKVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpXHJcbiAgICAgICAgdGhpcy4kZW1pdCgnbG9nJylcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIOW+heWujOaIkFxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIHRpbWVhZ28gKCkge1xyXG4gICAgICAgIHJldHVybiB+fihNYXRoLnJhbmRvbSgpICogNjApICsgJ+WIhumSn+WJjSdcclxuICAgICAgfSxcclxuICAgICAgbG9jYXRpb24gKCkge1xyXG4gICAgICAgIHJldHVybiBbJ+aIkOmDvScsICfljJfkuqwnLCAn5bm/5beeJywgJ+a3seWcsycsICfkuIrmtbcnXVt+fihNYXRoLnJhbmRvbSgpICogNyldXHJcbiAgICAgIH0sXHJcbiAgICAgIGNhbl9kZWxldGUgKCkge1xyXG4gICAgICAgIHJldHVybiBbdHJ1ZSwgZmFsc2VdW35+KE1hdGgucmFuZG9tKCkgKiAyKV1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19