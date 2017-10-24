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

var Filter = function (_wepy$component) {
  _inherits(Filter, _wepy$component);

  function Filter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Filter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Filter.__proto__ || Object.getPrototypeOf(Filter)).call.apply(_ref, [this].concat(args))), _this), _this.props = {
      items: {}
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
        this.$emit('filter', id);
      },
      nothing: function nothing() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Filter, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log('filters items');
      console.log(this.items);
    }
  }]);

  return Filter;
}(_wepy2.default.component);

exports.default = Filter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlci5qcyJdLCJuYW1lcyI6WyJGaWx0ZXIiLCJwcm9wcyIsIml0ZW1zIiwiZGF0YSIsInNob3ciLCJtZXRob2RzIiwidG9nZ2xlU2hvdyIsImUiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlRmlsdGVyIiwiaWQiLCIkZW1pdCIsIm5vdGhpbmciLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFDcUJBLE07Ozs7Ozs7Ozs7Ozs7O3NMQUNuQkMsSyxHQUFRO0FBQ05DLGFBQU87QUFERCxLLFFBSVJDLEksR0FBTztBQUNMQyxZQUFNO0FBREQsSyxRQUlQQyxPLEdBQVU7QUFDUkMsZ0JBRFEsc0JBQ0lDLENBREosRUFDTztBQUNiQyxnQkFBUUMsR0FBUixDQUFZRixDQUFaO0FBQ0EsYUFBS0gsSUFBTCxHQUFZLENBQUMsS0FBS0EsSUFBbEI7QUFDQUksZ0JBQVFDLEdBQVIsQ0FBWSxLQUFLTCxJQUFqQjtBQUNELE9BTE87QUFNUk0sa0JBTlEsd0JBTU1DLEVBTk4sRUFNVTtBQUNoQkgsZ0JBQVFDLEdBQVIsQ0FBWUUsRUFBWjtBQUNBLGFBQUtDLEtBQUwsQ0FBVyxRQUFYLEVBQXFCRCxFQUFyQjtBQUNELE9BVE87QUFVUkUsYUFWUSxxQkFVRyxDQUFFO0FBVkwsSzs7Ozs7NkJBWUE7QUFDUkwsY0FBUUMsR0FBUixDQUFZLGVBQVo7QUFDQUQsY0FBUUMsR0FBUixDQUFZLEtBQUtQLEtBQWpCO0FBQ0Q7Ozs7RUF4QmlDLGVBQUtZLFM7O2tCQUFwQmQsTSIsImZpbGUiOiJmaWx0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbHRlciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICBpdGVtczoge31cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgICBzaG93OiBmYWxzZVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICAgIHRvZ2dsZVNob3cgKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3dcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnNob3cpXHJcbiAgICAgIH0sXHJcbiAgICAgIGhhbmRsZUZpbHRlciAoaWQpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhpZClcclxuICAgICAgICB0aGlzLiRlbWl0KCdmaWx0ZXInLCBpZClcclxuICAgICAgfSxcclxuICAgICAgbm90aGluZyAoKSB7fVxyXG4gICAgfVxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ2ZpbHRlcnMgaXRlbXMnKVxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLml0ZW1zKVxyXG4gICAgfVxyXG4gIH1cclxuIl19