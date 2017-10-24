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

var RecordText = function (_wepy$component) {
  _inherits(RecordText, _wepy$component);

  function RecordText() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RecordText);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecordText.__proto__ || Object.getPrototypeOf(RecordText)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      text: {}
    }, _this.data = {}, _this.computed = {
      short_text: function short_text() {
        return this.text.value.substr(0, 40) + '...';
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return RecordText;
}(_wepy2.default.component);

exports.default = RecordText;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZF90ZXh0LmpzIl0sIm5hbWVzIjpbIlJlY29yZFRleHQiLCJwcm9wcyIsInRleHQiLCJkYXRhIiwiY29tcHV0ZWQiLCJzaG9ydF90ZXh0IiwidmFsdWUiLCJzdWJzdHIiLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBRXFCQSxVOzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLEssR0FBUTtBQUNOQyxZQUFNO0FBREEsSyxRQUlSQyxJLEdBQU8sRSxRQUVQQyxRLEdBQVc7QUFDVEMsZ0JBRFMsd0JBQ0s7QUFDWixlQUFPLEtBQUtILElBQUwsQ0FBVUksS0FBVixDQUFnQkMsTUFBaEIsQ0FBdUIsQ0FBdkIsRUFBMEIsRUFBMUIsSUFBZ0MsS0FBdkM7QUFDRDtBQUhRLEs7Ozs7RUFQMkIsZUFBS0MsUzs7a0JBQXhCUixVIiwiZmlsZSI6InJlY29yZF90ZXh0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkVGV4dCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICB0ZXh0OiB7fVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7fVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBzaG9ydF90ZXh0ICgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0LnZhbHVlLnN1YnN0cigwLCA0MCkgKyAnLi4uJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=