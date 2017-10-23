'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordTodayTest = function (_wepy$component) {
  _inherits(RecordTodayTest, _wepy$component);

  function RecordTodayTest() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RecordTodayTest);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecordTodayTest.__proto__ || Object.getPrototypeOf(RecordTodayTest)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      item: {}
    }, _this.data = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RecordTodayTest, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log('userinfo item');
      console.log(this.item);
    }
  }]);

  return RecordTodayTest;
}(_wepy2.default.component);

exports.default = RecordTodayTest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZGF5X3Rlc3QuanMiXSwibmFtZXMiOlsiUmVjb3JkVG9kYXlUZXN0IiwicHJvcHMiLCJpdGVtIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLGU7Ozs7Ozs7Ozs7Ozs7O3dNQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU07QUFEQSxLLFFBSVJDLEksR0FBTyxFOzs7Ozs2QkFFRztBQUNSQyxjQUFRQyxHQUFSLENBQVksZUFBWjtBQUNBRCxjQUFRQyxHQUFSLENBQVksS0FBS0gsSUFBakI7QUFDRDs7OztFQVYwQyxlQUFLSSxTOztrQkFBN0JOLGUiLCJmaWxlIjoidG9kYXlfdGVzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZFRvZGF5VGVzdCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIGl0ZW06IHt9XG4gICAgfVxuXG4gICAgZGF0YSA9IHt9XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgY29uc29sZS5sb2coJ3VzZXJpbmZvIGl0ZW0nKVxuICAgICAgY29uc29sZS5sb2codGhpcy5pdGVtKVxuICAgIH1cbiAgfVxuIl19