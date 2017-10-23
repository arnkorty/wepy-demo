'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _counter = require('./../store/types/counter.js');

var _actions = require('./../store/actions/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Counter = (_dec = (0, _wepyRedux.connect)({
  stateNum: function stateNum(state) {
    return state.counter.num;
  },
  asyncNum: function asyncNum(state) {
    return state.counter.asyncNum;
  }
}, {
  incNum: _counter.INCREMENT,
  decNum: _counter.DECREMENT,
  asyncInc: _actions.asyncInc
}), _dec(_class = function (_wepy$component) {
  _inherits(Counter, _wepy$component);

  function Counter() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Counter);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Counter.__proto__ || Object.getPrototypeOf(Counter)).call.apply(_ref, [this].concat(args))), _this), _initialiseProps.call(_this), _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Counter, [{
    key: 'onLoad',
    value: function onLoad() {
      console.log('load jjj');
      console.log(this);
      this.methods.incNum();
    }
  }]);

  return Counter;
}(_wepy2.default.component)) || _class);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.props = {
    num: {
      type: [Number, String],
      coerce: function coerce(v) {
        return +v;
      },
      default: 50
    }
  };
  this.data = {};
  this.events = {
    'index-broadcast': function indexBroadcast() {
      var _ref2;

      var $event = (_ref2 = arguments.length - 1, arguments.length <= _ref2 ? undefined : arguments[_ref2]);
      console.log(_this2.$name + ' receive ' + $event.name + ' from ' + $event.source.$name);
    }
  };
  this.methods = {
    plus: function plus() {
      this.num = this.num + 1;
      console.log(this.$name + ' plus tap');

      this.$emit('index-emit', 1, 2, 3);
    },
    minus: function minus() {
      this.num = this.num - 1;
      console.log(this.$name + ' minus tap');
    }
  };
};

exports.default = Counter;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiXSwibmFtZXMiOlsiQ291bnRlciIsInN0YXRlTnVtIiwic3RhdGUiLCJjb3VudGVyIiwibnVtIiwiYXN5bmNOdW0iLCJpbmNOdW0iLCJkZWNOdW0iLCJhc3luY0luYyIsImNvbnNvbGUiLCJsb2ciLCJtZXRob2RzIiwiY29tcG9uZW50IiwicHJvcHMiLCJ0eXBlIiwiTnVtYmVyIiwiU3RyaW5nIiwiY29lcmNlIiwidiIsImRlZmF1bHQiLCJkYXRhIiwiZXZlbnRzIiwiJGV2ZW50IiwibGVuZ3RoIiwiJG5hbWUiLCJuYW1lIiwic291cmNlIiwicGx1cyIsIiRlbWl0IiwibWludXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQ0U7Ozs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7OztJQWNxQkEsTyxXQVpwQix3QkFBUTtBQUNQQyxVQURPLG9CQUNHQyxLQURILEVBQ1U7QUFDZixXQUFPQSxNQUFNQyxPQUFOLENBQWNDLEdBQXJCO0FBQ0QsR0FITTtBQUlQQyxVQUpPLG9CQUlHSCxLQUpILEVBSVU7QUFDZixXQUFPQSxNQUFNQyxPQUFOLENBQWNFLFFBQXJCO0FBQ0Q7QUFOTSxDQUFSLEVBT0U7QUFDREMsNEJBREM7QUFFREMsNEJBRkM7QUFHREM7QUFIQyxDQVBGLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7NkJBNkNXO0FBQ1JDLGNBQVFDLEdBQVIsQ0FBWSxVQUFaO0FBQ0FELGNBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0EsV0FBS0MsT0FBTCxDQUFhTCxNQUFiO0FBQ0Q7Ozs7RUFyQ2tDLGVBQUtNLFM7Ozs7O09BQ3hDQyxLLEdBQVE7QUFDTlQsU0FBSztBQUNIVSxZQUFNLENBQUNDLE1BQUQsRUFBU0MsTUFBVCxDQURIO0FBRUhDLGNBQVEsZ0JBQVVDLENBQVYsRUFBYTtBQUNuQixlQUFPLENBQUNBLENBQVI7QUFDRCxPQUpFO0FBS0hDLGVBQVM7QUFMTjtBQURDLEc7T0FVUkMsSSxHQUFPLEU7T0FFUEMsTSxHQUFTO0FBQ1AsdUJBQW1CLDBCQUFhO0FBQUE7O0FBQzlCLFVBQUlDLGtCQUFjLFVBQUtDLE1BQUwsR0FBYyxDQUE1QiwyREFBSjtBQUNBZCxjQUFRQyxHQUFSLENBQWUsT0FBS2MsS0FBcEIsaUJBQXFDRixPQUFPRyxJQUE1QyxjQUF5REgsT0FBT0ksTUFBUCxDQUFjRixLQUF2RTtBQUNEO0FBSk0sRztPQU9UYixPLEdBQVU7QUFDUmdCLFFBRFEsa0JBQ0E7QUFDTixXQUFLdkIsR0FBTCxHQUFXLEtBQUtBLEdBQUwsR0FBVyxDQUF0QjtBQUNBSyxjQUFRQyxHQUFSLENBQVksS0FBS2MsS0FBTCxHQUFhLFdBQXpCOztBQUVBLFdBQUtJLEtBQUwsQ0FBVyxZQUFYLEVBQXlCLENBQXpCLEVBQTRCLENBQTVCLEVBQStCLENBQS9CO0FBQ0QsS0FOTztBQU9SQyxTQVBRLG1CQU9DO0FBQ1AsV0FBS3pCLEdBQUwsR0FBVyxLQUFLQSxHQUFMLEdBQVcsQ0FBdEI7QUFDQUssY0FBUUMsR0FBUixDQUFZLEtBQUtjLEtBQUwsR0FBYSxZQUF6QjtBQUNEO0FBVk8sRzs7O2tCQXBCU3hCLE8iLCJmaWxlIjoiY291bnRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcbiAgaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3dlcHktcmVkdXgnXHJcbiAgaW1wb3J0IHsgSU5DUkVNRU5ULCBERUNSRU1FTlQgfSBmcm9tICcuLi9zdG9yZS90eXBlcy9jb3VudGVyJ1xyXG4gIGltcG9ydCB7IGFzeW5jSW5jIH0gZnJvbSAnLi4vc3RvcmUvYWN0aW9ucydcclxuXHJcbiAgQGNvbm5lY3Qoe1xyXG4gICAgc3RhdGVOdW0gKHN0YXRlKSB7XHJcbiAgICAgIHJldHVybiBzdGF0ZS5jb3VudGVyLm51bVxyXG4gICAgfSxcclxuICAgIGFzeW5jTnVtIChzdGF0ZSkge1xyXG4gICAgICByZXR1cm4gc3RhdGUuY291bnRlci5hc3luY051bVxyXG4gICAgfVxyXG4gIH0sIHtcclxuICAgIGluY051bTogSU5DUkVNRU5ULFxyXG4gICAgZGVjTnVtOiBERUNSRU1FTlQsXHJcbiAgICBhc3luY0luY1xyXG4gIH0pXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ291bnRlciBleHRlbmRzIHdlcHkuY29tcG9uZW50IHtcclxuICAgIHByb3BzID0ge1xyXG4gICAgICBudW06IHtcclxuICAgICAgICB0eXBlOiBbTnVtYmVyLCBTdHJpbmddLFxyXG4gICAgICAgIGNvZXJjZTogZnVuY3Rpb24gKHYpIHtcclxuICAgICAgICAgIHJldHVybiArdlxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgZGVmYXVsdDogNTBcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRhdGEgPSB7XHJcbiAgICB9XHJcbiAgICBldmVudHMgPSB7XHJcbiAgICAgICdpbmRleC1icm9hZGNhc3QnOiAoLi4uYXJncykgPT4ge1xyXG4gICAgICAgIGxldCAkZXZlbnQgPSBhcmdzW2FyZ3MubGVuZ3RoIC0gMV1cclxuICAgICAgICBjb25zb2xlLmxvZyhgJHt0aGlzLiRuYW1lfSByZWNlaXZlICR7JGV2ZW50Lm5hbWV9IGZyb20gJHskZXZlbnQuc291cmNlLiRuYW1lfWApXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBwbHVzICgpIHtcclxuICAgICAgICB0aGlzLm51bSA9IHRoaXMubnVtICsgMVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJG5hbWUgKyAnIHBsdXMgdGFwJylcclxuXHJcbiAgICAgICAgdGhpcy4kZW1pdCgnaW5kZXgtZW1pdCcsIDEsIDIsIDMpXHJcbiAgICAgIH0sXHJcbiAgICAgIG1pbnVzICgpIHtcclxuICAgICAgICB0aGlzLm51bSA9IHRoaXMubnVtIC0gMVxyXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMuJG5hbWUgKyAnIG1pbnVzIHRhcCcpXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBvbkxvYWQgKCkge1xyXG4gICAgICBjb25zb2xlLmxvZygnbG9hZCBqamonKVxyXG4gICAgICBjb25zb2xlLmxvZyh0aGlzKVxyXG4gICAgICB0aGlzLm1ldGhvZHMuaW5jTnVtKClcclxuICAgIH1cclxuICB9XHJcbiJdfQ==