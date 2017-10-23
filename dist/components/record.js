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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZC5qcyJdLCJuYW1lcyI6WyJSZWNvcmRMaXN0IiwicHJvcHMiLCJpdGVtIiwiZGF0YSIsInNob3ciLCJtZXRob2RzIiwidG9nZ2xlU2hvdyIsImUiLCJjb25zb2xlIiwibG9nIiwiaGFuZGxlRmlsdGVyIiwiaWQiLCJub3RoaW5nIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0lBQ3FCQSxVOzs7Ozs7Ozs7Ozs7Ozs4TEFDbkJDLEssR0FBUTtBQUNOQyxZQUFNO0FBREEsSyxRQUlSQyxJLEdBQU87QUFDTEMsWUFBTTtBQURELEssUUFJUEMsTyxHQUFVO0FBQ1JDLGdCQURRLHNCQUNJQyxDQURKLEVBQ087QUFDYkMsZ0JBQVFDLEdBQVIsQ0FBWUYsQ0FBWjtBQUNBLGFBQUtILElBQUwsR0FBWSxDQUFDLEtBQUtBLElBQWxCO0FBQ0FJLGdCQUFRQyxHQUFSLENBQVksS0FBS0wsSUFBakI7QUFDRCxPQUxPO0FBTVJNLGtCQU5RLHdCQU1NQyxFQU5OLEVBTVU7QUFDaEJILGdCQUFRQyxHQUFSLENBQVlFLEVBQVo7QUFDRCxPQVJPO0FBU1JDLGFBVFEscUJBU0csQ0FBRTtBQVRMLEs7Ozs7OzZCQVdBO0FBQ1JKLGNBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0FELGNBQVFDLEdBQVIsQ0FBWSxzQkFBWjtBQUNEOzs7O0VBdkJxQyxlQUFLSSxTOztrQkFBeEJiLFUiLCJmaWxlIjoicmVjb3JkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRMaXN0IGV4dGVuZHMgd2VweS5jb21wb25lbnQge1xyXG4gICAgcHJvcHMgPSB7XHJcbiAgICAgIGl0ZW06IHt9XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgc2hvdzogZmFsc2VcclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICB0b2dnbGVTaG93IChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSlcclxuICAgICAgICB0aGlzLnNob3cgPSAhdGhpcy5zaG93XHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5zaG93KVxyXG4gICAgICB9LFxyXG4gICAgICBoYW5kbGVGaWx0ZXIgKGlkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coaWQpXHJcbiAgICAgIH0sXHJcbiAgICAgIG5vdGhpbmcgKCkge31cclxuICAgIH1cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMpXHJcbiAgICAgIGNvbnNvbGUubG9nKCdfX19fX19fX19fX19fX19fX19fXycpXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=