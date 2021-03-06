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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZF90b2RheV90ZXN0LmpzIl0sIm5hbWVzIjpbInR5cGVzIiwiYmxvb2QiLCJzdWdhciIsIndlaWdodCIsInVuaXRzIiwiUmVjb3JkVG9kYXlUZXN0IiwicHJvcHMiLCJ0ZXN0SXRlbSIsImluZGV4dCIsImRlZmF1bHQiLCJ0eXBlIiwiZGF0YSIsImNvbXB1dGVkIiwidHlwZV9uYW1lIiwibGV2ZWxfbmFtZSIsImxuYW1lIiwiayIsInZhbHVlIiwicmFuZ2UiLCJ2IiwidW5pdF9uYW1lIiwiY29uc29sZSIsImxvZyIsInRJdGVtIiwiY29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFDRTs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTUEsUUFBUTtBQUNaQyxTQUFPLElBREs7QUFFWkMsU0FBTyxJQUZLO0FBR1pDLFVBQVE7QUFISSxDQUFkO0FBS0EsSUFBTUMsUUFBUTtBQUNaSCxTQUFPLE1BREs7QUFFWkMsU0FBTztBQUZLLENBQWQ7O0lBSXFCRyxlOzs7Ozs7Ozs7Ozs7Ozt3TUFDbkJDLEssR0FBUTtBQUNOQyxnQkFBVSxFQURKO0FBRU5DLGNBQVE7QUFDTkMsaUJBQVMsQ0FESDtBQUVOQyxjQUFNO0FBRkE7QUFGRixLLFFBUVJDLEksR0FBTyxFLFFBRVBDLFEsR0FBVztBQUNUQyxlQURTLHVCQUNJO0FBQ1gsZUFBT2IsTUFBTSxLQUFLTyxRQUFMLENBQWNHLElBQXBCLENBQVA7QUFDRCxPQUhRO0FBSVRJLGdCQUpTLHdCQUlLO0FBQ1osWUFBSUMsUUFBUSxRQUFaO0FBQ0EsYUFBSyxJQUFJQyxDQUFULElBQWMsS0FBS1QsUUFBTCxDQUFjVSxLQUFkLENBQW9CQyxLQUFsQyxFQUF5QztBQUN2QyxjQUFJQyxJQUFJLEtBQUtaLFFBQUwsQ0FBY1UsS0FBZCxDQUFvQkMsS0FBcEIsQ0FBMEJGLENBQTFCLENBQVI7QUFDQSxjQUFJRyxFQUFFLENBQUYsS0FBUSxLQUFLWixRQUFMLENBQWNVLEtBQWQsQ0FBb0JBLEtBQTVCLElBQXFDRSxFQUFFLENBQUYsS0FBUSxLQUFLWixRQUFMLENBQWNVLEtBQWQsQ0FBb0JBLEtBQXJFLEVBQTRFO0FBQzFFLG1CQUFPRCxDQUFQO0FBQ0Q7QUFDRjtBQUNELGVBQU9ELEtBQVA7QUFDRCxPQWJRO0FBY1RLLGVBZFMsdUJBY0k7QUFDWCxlQUFPaEIsTUFBTSxLQUFLRyxRQUFMLENBQWNHLElBQXBCLENBQVA7QUFDRDtBQWhCUSxLOzs7Ozs2QkFtQkQ7QUFDUlcsY0FBUUMsR0FBUixDQUFZLGVBQVo7QUFDQUQsY0FBUUMsR0FBUixDQUFZLEtBQUtDLEtBQWpCO0FBQ0Q7Ozs7RUFqQzBDLGVBQUtDLFM7O2tCQUE3Qm5CLGUiLCJmaWxlIjoicmVjb3JkX3RvZGF5X3Rlc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcclxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xyXG5cclxuICBjb25zdCB0eXBlcyA9IHtcclxuICAgIGJsb29kOiAn6KGA5Y6LJyxcclxuICAgIHN1Z2FyOiAn6KGA57OWJyxcclxuICAgIHdlaWdodDogJ+S9k+mHjSdcclxuICB9XHJcbiAgY29uc3QgdW5pdHMgPSB7XHJcbiAgICBibG9vZDogJ21tSGcnLFxyXG4gICAgc3VnYXI6ICfljZXkvY0nXHJcbiAgfVxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZFRvZGF5VGVzdCBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICB0ZXN0SXRlbToge30sXHJcbiAgICAgIGluZGV4dDoge1xyXG4gICAgICAgIGRlZmF1bHQ6IDAsXHJcbiAgICAgICAgdHlwZTogJ0ludGVnZXInXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge31cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgdHlwZV9uYW1lICgpIHtcclxuICAgICAgICByZXR1cm4gdHlwZXNbdGhpcy50ZXN0SXRlbS50eXBlXVxyXG4gICAgICB9LFxyXG4gICAgICBsZXZlbF9uYW1lICgpIHtcclxuICAgICAgICBsZXQgbG5hbWUgPSAnbm9ybWFsJ1xyXG4gICAgICAgIGZvciAobGV0IGsgaW4gdGhpcy50ZXN0SXRlbS52YWx1ZS5yYW5nZSkge1xyXG4gICAgICAgICAgbGV0IHYgPSB0aGlzLnRlc3RJdGVtLnZhbHVlLnJhbmdlW2tdXHJcbiAgICAgICAgICBpZiAodlswXSA8PSB0aGlzLnRlc3RJdGVtLnZhbHVlLnZhbHVlICYmIHZbMV0gPj0gdGhpcy50ZXN0SXRlbS52YWx1ZS52YWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4ga1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbG5hbWVcclxuICAgICAgfSxcclxuICAgICAgdW5pdF9uYW1lICgpIHtcclxuICAgICAgICByZXR1cm4gdW5pdHNbdGhpcy50ZXN0SXRlbS50eXBlXVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkICgpIHtcclxuICAgICAgY29uc29sZS5sb2coJ3VzZXJpbmZvIGl0ZW0nKVxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzLnRJdGVtKVxyXG4gICAgfVxyXG4gIH1cclxuIl19