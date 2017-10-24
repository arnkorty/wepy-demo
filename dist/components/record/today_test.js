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

var types = {
  blood: '血压',
  sugar: '血糖',
  weight: '体重'
};
var units = {
  blood: 'mmHg',
  sugar: '单位'
};

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
      testItem: {},
      indext: {
        default: 0,
        type: 'Integer'
      }
    }, _this.data = {}, _this.computed = {
      type_name: function type_name() {
        return types[this.testItem.type];
      },
      level_name: function level_name() {
        var lname = 'normal';
        for (var k in this.testItem.value.range) {
          var v = this.testItem.value.range[k];
          if (v[0] <= this.testItem.value.value && v[1] >= this.testItem.value.value) {
            return k;
          }
        }
        return lname;
      },
      unit_name: function unit_name() {
        return units[this.testItem.type];
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(RecordTodayTest, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log('userinfo item');
      console.log(this.tItem);
    }
  }]);

  return RecordTodayTest;
}(_wepy2.default.component);

exports.default = RecordTodayTest;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRvZGF5X3Rlc3QuanMiXSwibmFtZXMiOlsidHlwZXMiLCJibG9vZCIsInN1Z2FyIiwid2VpZ2h0IiwidW5pdHMiLCJSZWNvcmRUb2RheVRlc3QiLCJwcm9wcyIsInRlc3RJdGVtIiwiaW5kZXh0IiwiZGVmYXVsdCIsInR5cGUiLCJkYXRhIiwiY29tcHV0ZWQiLCJ0eXBlX25hbWUiLCJsZXZlbF9uYW1lIiwibG5hbWUiLCJrIiwidmFsdWUiLCJyYW5nZSIsInYiLCJ1bml0X25hbWUiLCJjb25zb2xlIiwibG9nIiwidEl0ZW0iLCJjb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxRQUFRO0FBQ1pDLFNBQU8sSUFESztBQUVaQyxTQUFPLElBRks7QUFHWkMsVUFBUTtBQUhJLENBQWQ7QUFLQSxJQUFNQyxRQUFRO0FBQ1pILFNBQU8sTUFESztBQUVaQyxTQUFPO0FBRkssQ0FBZDs7SUFJcUJHLGU7Ozs7Ozs7Ozs7Ozs7O3dNQUNuQkMsSyxHQUFRO0FBQ05DLGdCQUFVLEVBREo7QUFFTkMsY0FBUTtBQUNOQyxpQkFBUyxDQURIO0FBRU5DLGNBQU07QUFGQTtBQUZGLEssUUFRUkMsSSxHQUFPLEUsUUFFUEMsUSxHQUFXO0FBQ1RDLGVBRFMsdUJBQ0k7QUFDWCxlQUFPYixNQUFNLEtBQUtPLFFBQUwsQ0FBY0csSUFBcEIsQ0FBUDtBQUNELE9BSFE7QUFJVEksZ0JBSlMsd0JBSUs7QUFDWixZQUFJQyxRQUFRLFFBQVo7QUFDQSxhQUFLLElBQUlDLENBQVQsSUFBYyxLQUFLVCxRQUFMLENBQWNVLEtBQWQsQ0FBb0JDLEtBQWxDLEVBQXlDO0FBQ3ZDLGNBQUlDLElBQUksS0FBS1osUUFBTCxDQUFjVSxLQUFkLENBQW9CQyxLQUFwQixDQUEwQkYsQ0FBMUIsQ0FBUjtBQUNBLGNBQUlHLEVBQUUsQ0FBRixLQUFRLEtBQUtaLFFBQUwsQ0FBY1UsS0FBZCxDQUFvQkEsS0FBNUIsSUFBcUNFLEVBQUUsQ0FBRixLQUFRLEtBQUtaLFFBQUwsQ0FBY1UsS0FBZCxDQUFvQkEsS0FBckUsRUFBNEU7QUFDMUUsbUJBQU9ELENBQVA7QUFDRDtBQUNGO0FBQ0QsZUFBT0QsS0FBUDtBQUNELE9BYlE7QUFjVEssZUFkUyx1QkFjSTtBQUNYLGVBQU9oQixNQUFNLEtBQUtHLFFBQUwsQ0FBY0csSUFBcEIsQ0FBUDtBQUNEO0FBaEJRLEs7Ozs7OzZCQW1CRDtBQUNSVyxjQUFRQyxHQUFSLENBQVksZUFBWjtBQUNBRCxjQUFRQyxHQUFSLENBQVksS0FBS0MsS0FBakI7QUFDRDs7OztFQWpDMEMsZUFBS0MsUzs7a0JBQTdCbkIsZSIsImZpbGUiOiJ0b2RheV90ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXHJcbiAgaW1wb3J0IHdlcHkgZnJvbSAnd2VweSdcclxuXHJcbiAgY29uc3QgdHlwZXMgPSB7XHJcbiAgICBibG9vZDogJ+ihgOWOiycsXHJcbiAgICBzdWdhcjogJ+ihgOezlicsXHJcbiAgICB3ZWlnaHQ6ICfkvZPph40nXHJcbiAgfVxyXG4gIGNvbnN0IHVuaXRzID0ge1xyXG4gICAgYmxvb2Q6ICdtbUhnJyxcclxuICAgIHN1Z2FyOiAn5Y2V5L2NJ1xyXG4gIH1cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBSZWNvcmRUb2RheVRlc3QgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgICAgdGVzdEl0ZW06IHt9LFxyXG4gICAgICBpbmRleHQ6IHtcclxuICAgICAgICBkZWZhdWx0OiAwLFxyXG4gICAgICAgIHR5cGU6ICdJbnRlZ2VyJ1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZGF0YSA9IHt9XHJcblxyXG4gICAgY29tcHV0ZWQgPSB7XHJcbiAgICAgIHR5cGVfbmFtZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHR5cGVzW3RoaXMudGVzdEl0ZW0udHlwZV1cclxuICAgICAgfSxcclxuICAgICAgbGV2ZWxfbmFtZSAoKSB7XHJcbiAgICAgICAgbGV0IGxuYW1lID0gJ25vcm1hbCdcclxuICAgICAgICBmb3IgKGxldCBrIGluIHRoaXMudGVzdEl0ZW0udmFsdWUucmFuZ2UpIHtcclxuICAgICAgICAgIGxldCB2ID0gdGhpcy50ZXN0SXRlbS52YWx1ZS5yYW5nZVtrXVxyXG4gICAgICAgICAgaWYgKHZbMF0gPD0gdGhpcy50ZXN0SXRlbS52YWx1ZS52YWx1ZSAmJiB2WzFdID49IHRoaXMudGVzdEl0ZW0udmFsdWUudmFsdWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxuYW1lXHJcbiAgICAgIH0sXHJcbiAgICAgIHVuaXRfbmFtZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHVuaXRzW3RoaXMudGVzdEl0ZW0udHlwZV1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCAoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCd1c2VyaW5mbyBpdGVtJylcclxuICAgICAgY29uc29sZS5sb2codGhpcy50SXRlbSlcclxuICAgIH1cclxuICB9XHJcbiJdfQ==