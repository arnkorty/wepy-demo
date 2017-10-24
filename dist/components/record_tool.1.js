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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZF90b29sLjEuanMiXSwibmFtZXMiOlsiUmVjb3JkVG9vbCIsInByb3BzIiwiZGF0YSIsImNvbXB1dGVkIiwidGltZWFnbyIsIk1hdGgiLCJyYW5kb20iLCJsb2NhdGlvbiIsImNhbl9kZWxldGUiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLEssR0FBUSxFLFFBR1JDLEksR0FBTyxFLFFBR1BDLFEsR0FBVztBQUNUQyxhQURTLHFCQUNFO0FBQ1QsZUFBTyxDQUFDLEVBQUVDLEtBQUtDLE1BQUwsS0FBZ0IsRUFBbEIsQ0FBRCxHQUF5QixLQUFoQztBQUNELE9BSFE7QUFJVEMsY0FKUyxzQkFJRztBQUNWLGVBQU8sQ0FBQyxJQUFELEVBQU8sSUFBUCxFQUFhLElBQWIsRUFBbUIsSUFBbkIsRUFBeUIsSUFBekIsRUFBK0IsQ0FBQyxFQUFFRixLQUFLQyxNQUFMLEtBQWdCLENBQWxCLENBQWhDLENBQVA7QUFDRCxPQU5RO0FBT1RFLGdCQVBTLHdCQU9LO0FBQ1osZUFBTyxDQUFDLElBQUQsRUFBTyxLQUFQLEVBQWMsQ0FBQyxFQUFFSCxLQUFLQyxNQUFMLEtBQWdCLENBQWxCLENBQWYsQ0FBUDtBQUNEO0FBVFEsSzs7O0FBRFg7Ozs7RUFOc0MsZUFBS0csUzs7a0JBQXhCVCxVIiwiZmlsZSI6InJlY29yZF90b29sLjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRUb29sIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHt9XHJcblxyXG4gICAgLy8g5b6F5a6M5oiQXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgdGltZWFnbyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIH5+KE1hdGgucmFuZG9tKCkgKiA2MCkgKyAn5YiG6ZKf5YmNJ1xyXG4gICAgICB9LFxyXG4gICAgICBsb2NhdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFsn5oiQ6YO9JywgJ+WMl+S6rCcsICflub/lt54nLCAn5rex5ZyzJywgJ+S4iua1tyddW35+KE1hdGgucmFuZG9tKCkgKiA3KV1cclxuICAgICAgfSxcclxuICAgICAgY2FuX2RlbGV0ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFt0cnVlLCBmYWxzZV1bfn4oTWF0aC5yYW5kb20oKSAqIDIpXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=