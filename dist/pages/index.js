'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

var _wepy = require('./../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

var _filter = require('./../components/filter.js');

var _filter2 = _interopRequireDefault(_filter);

var _record_list = require('./../components/record_list.js');

var _record_list2 = _interopRequireDefault(_record_list);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _types = require('./../store/types/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Index = (_dec = (0, _wepyRedux.connect)((0, _wepyRedux.mapState)({
  list: function list(state) {
    return state.records.list;
  },
  photo: function photo(state) {
    return state.records.photo;
  },
  bg_image_url: function bg_image_url(state) {
    return state.records.bg_image;
  },
  avatar_url: function avatar_url(state) {
    return state.records.avatar;
  },
  msg_count: function msg_count(state) {
    return state.records.msg_count;
  },
  filters: function filters(state) {
    return state.records.filters;
  }
}), {
  fetch: _types.FETCH_RECORDS,
  filter: _types.FILTER_RECORDS
}), _dec(_class = function (_wepy$page) {
  _inherits(Index, _wepy$page);

  function Index() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Index);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Index.__proto__ || Object.getPrototypeOf(Index)).call.apply(_ref, [this].concat(args))), _this), _this.config = {
      navigationBarTitleText: '动态列表'
    }, _this.$repeat = { "list": { "com": "RecordList", "props": "item" } }, _this.$props = { "RecordList": { "v-bind:item.once": { "value": "item", "type": "item", "for": "list", "item": "item", "index": "index", "key": "recordid" } }, "Filter": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:items.once": "filters" } }, _this.$events = { "Filter": { "v-on:filter": "filter" } }, _this.components = {
      Filter: _filter2.default,
      RecordList: _record_list2.default
    }, _this.mixins = [], _this.data = {}, _this.computed = {
      now: function now() {
        return +new Date();
      }
    }, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      this.methods.fetch({ type: 'fidsiof' });
      console.log(this);
    }
  }]);

  return Index;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwibGlzdCIsInN0YXRlIiwicmVjb3JkcyIsInBob3RvIiwiYmdfaW1hZ2VfdXJsIiwiYmdfaW1hZ2UiLCJhdmF0YXJfdXJsIiwiYXZhdGFyIiwibXNnX2NvdW50IiwiZmlsdGVycyIsImZldGNoIiwiZmlsdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkZpbHRlciIsIlJlY29yZExpc3QiLCJtaXhpbnMiLCJkYXRhIiwiY29tcHV0ZWQiLCJub3ciLCJEYXRlIiwibWV0aG9kcyIsImV2ZW50cyIsInR5cGUiLCJjb25zb2xlIiwibG9nIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDRTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQWFxQkEsSyxXQVpwQix3QkFBUSx5QkFBUztBQUNoQkMsUUFBTSxjQUFDQyxLQUFEO0FBQUEsV0FBV0EsTUFBTUMsT0FBTixDQUFjRixJQUF6QjtBQUFBLEdBRFU7QUFFaEJHLFNBQU8sZUFBQ0YsS0FBRDtBQUFBLFdBQVdBLE1BQU1DLE9BQU4sQ0FBY0MsS0FBekI7QUFBQSxHQUZTO0FBR2hCQyxnQkFBYyxzQkFBQ0gsS0FBRDtBQUFBLFdBQVdBLE1BQU1DLE9BQU4sQ0FBY0csUUFBekI7QUFBQSxHQUhFO0FBSWhCQyxjQUFZLG9CQUFDTCxLQUFEO0FBQUEsV0FBV0EsTUFBTUMsT0FBTixDQUFjSyxNQUF6QjtBQUFBLEdBSkk7QUFLaEJDLGFBQVcsbUJBQUNQLEtBQUQ7QUFBQSxXQUFXQSxNQUFNQyxPQUFOLENBQWNNLFNBQXpCO0FBQUEsR0FMSztBQU1oQkMsV0FBUyxpQkFBQ1IsS0FBRDtBQUFBLFdBQVdBLE1BQU1DLE9BQU4sQ0FBY08sT0FBekI7QUFBQTtBQU5PLENBQVQsQ0FBUixFQU9HO0FBQ0ZDLDZCQURFO0FBRUZDO0FBRkUsQ0FQSCxDOzs7Ozs7Ozs7Ozs7OztvTEFhQ0MsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFQUFDLFFBQU8sRUFBQyxPQUFNLFlBQVAsRUFBb0IsU0FBUSxNQUE1QixFQUFSLEUsUUFDYkMsTSxHQUFTLEVBQUMsY0FBYSxFQUFDLG9CQUFtQixFQUFDLFNBQVEsTUFBVCxFQUFnQixRQUFPLE1BQXZCLEVBQThCLE9BQU0sTUFBcEMsRUFBMkMsUUFBTyxNQUFsRCxFQUF5RCxTQUFRLE9BQWpFLEVBQXlFLE9BQU0sVUFBL0UsRUFBcEIsRUFBZCxFQUE4SCxVQUFTLEVBQUMsY0FBYSxFQUFkLEVBQWlCLGdCQUFlLEVBQWhDLEVBQW1DLHFCQUFvQixTQUF2RCxFQUF2SSxFLFFBQ1RDLE8sR0FBVSxFQUFDLFVBQVMsRUFBQyxlQUFjLFFBQWYsRUFBVixFLFFBQ1RDLFUsR0FBYTtBQUNSQyw4QkFEUTtBQUVSQztBQUZRLEssUUFLVkMsTSxHQUFTLEUsUUFFVEMsSSxHQUFPLEUsUUFHUEMsUSxHQUFXO0FBQ1RDLFNBRFMsaUJBQ0Y7QUFDTCxlQUFPLENBQUMsSUFBSUMsSUFBSixFQUFSO0FBQ0Q7QUFIUSxLLFFBTVhDLE8sR0FBVSxFLFFBR1ZDLE0sR0FBUyxFOzs7Ozs2QkFHQTtBQUNQLFdBQUtELE9BQUwsQ0FBYWYsS0FBYixDQUFtQixFQUFDaUIsTUFBTSxTQUFQLEVBQW5CO0FBQ0FDLGNBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0Q7Ozs7RUFoQ2dDLGVBQUtDLEk7a0JBQW5CL0IsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gIGltcG9ydCBGaWx0ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9maWx0ZXInXHJcbiAgaW1wb3J0IFJlY29yZExpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9yZWNvcmRfbGlzdCdcclxuXHJcbiAgaW1wb3J0IHsgY29ubmVjdCwgbWFwU3RhdGUgfSBmcm9tICd3ZXB5LXJlZHV4J1xyXG4gIGltcG9ydCB7IEZFVENIX1JFQ09SRFMsIEZJTFRFUl9SRUNPUkRTIH0gZnJvbSAnLi4vc3RvcmUvdHlwZXMnXHJcbiAgQGNvbm5lY3QobWFwU3RhdGUoe1xyXG4gICAgbGlzdDogKHN0YXRlKSA9PiBzdGF0ZS5yZWNvcmRzLmxpc3QsXHJcbiAgICBwaG90bzogKHN0YXRlKSA9PiBzdGF0ZS5yZWNvcmRzLnBob3RvLFxyXG4gICAgYmdfaW1hZ2VfdXJsOiAoc3RhdGUpID0+IHN0YXRlLnJlY29yZHMuYmdfaW1hZ2UsXHJcbiAgICBhdmF0YXJfdXJsOiAoc3RhdGUpID0+IHN0YXRlLnJlY29yZHMuYXZhdGFyLFxyXG4gICAgbXNnX2NvdW50OiAoc3RhdGUpID0+IHN0YXRlLnJlY29yZHMubXNnX2NvdW50LFxyXG4gICAgZmlsdGVyczogKHN0YXRlKSA9PiBzdGF0ZS5yZWNvcmRzLmZpbHRlcnNcclxuICB9KSwge1xyXG4gICAgZmV0Y2g6IEZFVENIX1JFQ09SRFMsXHJcbiAgICBmaWx0ZXI6IEZJTFRFUl9SRUNPUkRTXHJcbiAgfSlcclxuXHJcbiAgZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5kZXggZXh0ZW5kcyB3ZXB5LnBhZ2Uge1xyXG4gICAgY29uZmlnID0ge1xyXG4gICAgICBuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0OiAn5Yqo5oCB5YiX6KGoJ1xyXG4gICAgfVxyXG4gICAkcmVwZWF0ID0ge1wibGlzdFwiOntcImNvbVwiOlwiUmVjb3JkTGlzdFwiLFwicHJvcHNcIjpcIml0ZW1cIn19O1xyXG4kcHJvcHMgPSB7XCJSZWNvcmRMaXN0XCI6e1widi1iaW5kOml0ZW0ub25jZVwiOntcInZhbHVlXCI6XCJpdGVtXCIsXCJ0eXBlXCI6XCJpdGVtXCIsXCJmb3JcIjpcImxpc3RcIixcIml0ZW1cIjpcIml0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJyZWNvcmRpZFwifX0sXCJGaWx0ZXJcIjp7XCJ4bWxuczp2LW9uXCI6XCJcIixcInhtbG5zOnYtYmluZFwiOlwiXCIsXCJ2LWJpbmQ6aXRlbXMub25jZVwiOlwiZmlsdGVyc1wifX07XHJcbiRldmVudHMgPSB7XCJGaWx0ZXJcIjp7XCJ2LW9uOmZpbHRlclwiOlwiZmlsdGVyXCJ9fTtcclxuIGNvbXBvbmVudHMgPSB7XHJcbiAgICAgIEZpbHRlcjogRmlsdGVyLFxyXG4gICAgICBSZWNvcmRMaXN0OiBSZWNvcmRMaXN0XHJcbiAgICB9XHJcblxyXG4gICAgbWl4aW5zID0gW11cclxuXHJcbiAgICBkYXRhID0ge1xyXG4gICAgfVxyXG5cclxuICAgIGNvbXB1dGVkID0ge1xyXG4gICAgICBub3cgKCkge1xyXG4gICAgICAgIHJldHVybiArbmV3IERhdGUoKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbWV0aG9kcyA9IHtcclxuICAgIH1cclxuXHJcbiAgICBldmVudHMgPSB7XHJcbiAgICB9XHJcblxyXG4gICAgb25Mb2FkKCkge1xyXG4gICAgICB0aGlzLm1ldGhvZHMuZmV0Y2goe3R5cGU6ICdmaWRzaW9mJ30pXHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMpXHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=