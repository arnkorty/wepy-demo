'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordUserInfo = function (_wepy$component) {
  _inherits(RecordUserInfo, _wepy$component);

  function RecordUserInfo() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RecordUserInfo);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecordUserInfo.__proto__ || Object.getPrototypeOf(RecordUserInfo)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      uItem: {}
    }, _this.data = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RecordUserInfo, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log('userinfo item');
      console.log(this.item);
    }
  }]);

  return RecordUserInfo;
}(_wepy2.default.component);

exports.default = RecordUserInfo;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZF91c2VyaW5mby5qcyJdLCJuYW1lcyI6WyJSZWNvcmRVc2VySW5mbyIsInByb3BzIiwidUl0ZW0iLCJkYXRhIiwiY29uc29sZSIsImxvZyIsIml0ZW0iLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLGM7Ozs7Ozs7Ozs7Ozs7O3NNQUNuQkMsSyxHQUFRO0FBQ05DLGFBQU87QUFERCxLLFFBSVJDLEksR0FBTyxFOzs7Ozs2QkFFRztBQUNSQyxjQUFRQyxHQUFSLENBQVksZUFBWjtBQUNBRCxjQUFRQyxHQUFSLENBQVksS0FBS0MsSUFBakI7QUFDRDs7OztFQVZ5QyxlQUFLQyxTOztrQkFBNUJQLGMiLCJmaWxlIjoicmVjb3JkX3VzZXJpbmZvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkVXNlckluZm8gZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgdUl0ZW06IHt9XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHt9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3VzZXJpbmZvIGl0ZW0nKVxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLml0ZW0pXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=