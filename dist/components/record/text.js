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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRleHQuanMiXSwibmFtZXMiOlsiUmVjb3JkVGV4dCIsInByb3BzIiwidGV4dCIsImRhdGEiLCJjb21wdXRlZCIsInNob3J0X3RleHQiLCJ2YWx1ZSIsInN1YnN0ciIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU07QUFEQSxLLFFBSVJDLEksR0FBTyxFLFFBRVBDLFEsR0FBVztBQUNUQyxnQkFEUyx3QkFDSztBQUNaLGVBQU8sS0FBS0gsSUFBTCxDQUFVSSxLQUFWLENBQWdCQyxNQUFoQixDQUF1QixDQUF2QixFQUEwQixFQUExQixJQUFnQyxLQUF2QztBQUNEO0FBSFEsSzs7OztFQVAyQixlQUFLQyxTOztrQkFBeEJSLFUiLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZFRleHQgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgdGV4dDoge31cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge31cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgc2hvcnRfdGV4dCAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dC52YWx1ZS5zdWJzdHIoMCwgNDApICsgJy4uLidcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuIl19