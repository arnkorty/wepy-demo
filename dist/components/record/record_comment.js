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

var RecordComment = function (_wepy$component) {
  _inherits(RecordComment, _wepy$component);

  function RecordComment() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RecordComment);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecordComment.__proto__ || Object.getPrototypeOf(RecordComment)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      comment: {}
    }, _this.data = {}, _this.methods = {
      showText: function showText() {
        console.log(this.comment);
      }
    }, _this.computed = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // 待完成


  return RecordComment;
}(_wepy2.default.component);

exports.default = RecordComment;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZF9jb21tZW50LmpzIl0sIm5hbWVzIjpbIlJlY29yZENvbW1lbnQiLCJwcm9wcyIsImNvbW1lbnQiLCJkYXRhIiwibWV0aG9kcyIsInNob3dUZXh0IiwiY29uc29sZSIsImxvZyIsImNvbXB1dGVkIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsYTs7Ozs7Ozs7Ozs7Ozs7b01BQ25CQyxLLEdBQVE7QUFDTkMsZUFBUztBQURILEssUUFJUkMsSSxHQUFPLEUsUUFFUEMsTyxHQUFVO0FBQ1JDLGNBRFEsc0JBQ0k7QUFDVkMsZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLTCxPQUFqQjtBQUNEO0FBSE8sSyxRQU9WTSxRLEdBQVcsRTs7O0FBRFg7Ozs7RUFieUMsZUFBS0MsUzs7a0JBQTNCVCxhIiwiZmlsZSI6InJlY29yZF9jb21tZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkQ29tbWVudCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICBjb21tZW50OiB7fVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7fVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHNob3dUZXh0ICgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLmNvbW1lbnQpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyDlvoXlrozmiJBcclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgfVxyXG4gIH1cclxuIl19