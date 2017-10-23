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
      item: {}
    }, _this.data = {
      show: false
    }, _this.methods = {
      toggleShow: function toggleShow(e) {
        console.log(e);
        this.show = !this.show;
        console.log(this.show);
      },
      handleFilter: function handleFilter(id) {
        console.log(id);
      },
      nothing: function nothing() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RecordList, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log(this);
      console.log('____________________');
    }
  }]);

  return RecordList;
}(_wepy2.default.component);

exports.default = RecordList;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZF9saXN0LmpzIl0sIm5hbWVzIjpbIlJlY29yZExpc3QiLCJwcm9wcyIsIml0ZW0iLCJkYXRhIiwic2hvdyIsIm1ldGhvZHMiLCJ0b2dnbGVTaG93IiwiZSIsImNvbnNvbGUiLCJsb2ciLCJoYW5kbGVGaWx0ZXIiLCJpZCIsIm5vdGhpbmciLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFDcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsSyxHQUFRO0FBQ05DLFlBQU07QUFEQSxLLFFBSVJDLEksR0FBTztBQUNMQyxZQUFNO0FBREQsSyxRQUlQQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0lDLENBREosRUFDTztBQUNiQyxnQkFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0EsYUFBS0gsSUFBTCxHQUFZLENBQUMsS0FBS0EsSUFBbEI7QUFDQUksZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLTCxJQUFqQjtBQUNELE9BTE87QUFNUk0sa0JBTlEsd0JBTU1DLEVBTk4sRUFNVTtBQUNoQkgsZ0JBQVFDLEdBQVIsQ0FBWUUsRUFBWjtBQUNELE9BUk87QUFTUkMsYUFUUSxxQkFTRyxDQUFFO0FBVEwsSzs7Ozs7NkJBV0E7QUFDUkosY0FBUUMsR0FBUixDQUFZLElBQVo7QUFDQUQsY0FBUUMsR0FBUixDQUFZLHNCQUFaO0FBQ0Q7Ozs7RUF2QnFDLGVBQUtJLFM7O2tCQUF4QmIsVSIsImZpbGUiOiJyZWNvcmRfbGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgUmVjb3JkTGlzdCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICBpdGVtOiB7fVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICAgIHNob3c6IGZhbHNlXHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgICAgdG9nZ2xlU2hvdyAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICAgICAgdGhpcy5zaG93ID0gIXRoaXMuc2hvd1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuc2hvdylcclxuICAgICAgfSxcclxuICAgICAgaGFuZGxlRmlsdGVyIChpZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGlkKVxyXG4gICAgICB9LFxyXG4gICAgICBub3RoaW5nICgpIHt9XHJcbiAgICB9XHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzKVxyXG4gICAgICBjb25zb2xlLmxvZygnX19fX19fX19fX19fX19fX19fX18nKVxyXG4gICAgfVxyXG4gIH1cclxuIl19