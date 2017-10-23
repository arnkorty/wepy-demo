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
      },
      nothing: function nothing() {}
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Filter, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log(this);
      console.log('____________________');
    }
  }]);

  return Filter;
}(_wepy2.default.component);

exports.default = Filter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlci5qcyJdLCJuYW1lcyI6WyJGaWx0ZXIiLCJwcm9wcyIsIml0ZW1zIiwiZGF0YSIsInNob3ciLCJtZXRob2RzIiwidG9nZ2xlU2hvdyIsImUiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlRmlsdGVyIiwiaWQiLCJub3RoaW5nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxNOzs7Ozs7Ozs7Ozs7OztzTEFDbkJDLEssR0FBUTtBQUNOQyxhQUFPO0FBREQsSyxRQUlSQyxJLEdBQU87QUFDTEMsWUFBTTtBQURELEssUUFJUEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNJQyxDQURKLEVBQ087QUFDYkMsZ0JBQVFDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNBLGFBQUtILElBQUwsR0FBWSxDQUFDLEtBQUtBLElBQWxCO0FBQ0FJLGdCQUFRQyxHQUFSLENBQVksS0FBS0wsSUFBakI7QUFDRCxPQUxPO0FBTVJNLGtCQU5RLHdCQU1NQyxFQU5OLEVBTVU7QUFDaEJILGdCQUFRQyxHQUFSLENBQVlFLEVBQVo7QUFDRCxPQVJPO0FBU1JDLGFBVFEscUJBU0csQ0FBRTtBQVRMLEs7Ozs7OzZCQVdBO0FBQ1JKLGNBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0FELGNBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQUNEOzs7O0VBdkJpQyxlQUFLSSxTOztrQkFBcEJiLE0iLCJmaWxlIjoiZmlsdGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIEZpbHRlciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcbiAgICBwcm9wcyA9IHtcbiAgICAgIGl0ZW1zOiB7fVxuICAgIH1cblxuICAgIGRhdGEgPSB7XG4gICAgICBzaG93OiBmYWxzZVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgICB0b2dnbGVTaG93IChlKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGUpXG4gICAgICAgIHRoaXMuc2hvdyA9ICF0aGlzLnNob3dcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zaG93KVxuICAgICAgfSxcbiAgICAgIGhhbmRsZUZpbHRlciAoaWQpIHtcbiAgICAgICAgY29uc29sZS5sb2coaWQpXG4gICAgICB9LFxuICAgICAgbm90aGluZyAoKSB7fVxuICAgIH1cbiAgICBvbkxvYWQgKCkge1xuICAgICAgY29uc29sZS5sb2codGhpcylcbiAgICAgIGNvbnNvbGUubG9nKCdfX19fX19fX19fX19fX19fX19fXycpXG4gICAgfVxuICB9XG4iXX0=