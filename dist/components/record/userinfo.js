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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInVzZXJpbmZvLmpzIl0sIm5hbWVzIjpbIlJlY29yZFVzZXJJbmZvIiwicHJvcHMiLCJ1SXRlbSIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwiaXRlbSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0U7Ozs7Ozs7Ozs7OztJQUVxQkEsYzs7Ozs7Ozs7Ozs7Ozs7c01BQ25CQyxLLEdBQVE7QUFDTkMsYUFBTztBQURELEssUUFJUkMsSSxHQUFPLEU7Ozs7OzZCQUVHO0FBQ1JDLGNBQVFDLEdBQVIsQ0FBWSxlQUFaO0FBQ0FELGNBQVFDLEdBQVIsQ0FBWSxLQUFLQyxJQUFqQjtBQUNEOzs7O0VBVnlDLGVBQUtDLFM7O2tCQUE1QlAsYyIsImZpbGUiOiJ1c2VyaW5mby5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZFVzZXJJbmZvIGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgIHVJdGVtOiB7fVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7fVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd1c2VyaW5mbyBpdGVtJylcclxuICAgICAgY29uc29sZS5sb2codGhpcy5pdGVtKVxyXG4gICAgfVxyXG4gIH1cclxuIl19