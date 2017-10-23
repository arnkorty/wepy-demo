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
    }, _this.$repeat = {}, _this.$props = { "filter": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:items.once": "filters" } }, _this.$events = { "filter": { "v-on:filter": "filter" } }, _this.components = {
      filter: _filter2.default
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwibGlzdCIsInN0YXRlIiwicmVjb3JkcyIsInBob3RvIiwiYmdfaW1hZ2VfdXJsIiwiYmdfaW1hZ2UiLCJhdmF0YXJfdXJsIiwiYXZhdGFyIiwibXNnX2NvdW50IiwiZmlsdGVycyIsImZldGNoIiwiZmlsdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIm1peGlucyIsImRhdGEiLCJjb21wdXRlZCIsIm5vdyIsIkRhdGUiLCJtZXRob2RzIiwiZXZlbnRzIiwidHlwZSIsImNvbnNvbGUiLCJsb2ciLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNFOzs7O0FBRUE7Ozs7QUFFQTs7QUFDQTs7Ozs7Ozs7OztJQWFxQkEsSyxXQVpwQix3QkFBUSx5QkFBUztBQUNoQkMsUUFBTSxjQUFDQyxLQUFEO0FBQUEsV0FBV0EsTUFBTUMsT0FBTixDQUFjRixJQUF6QjtBQUFBLEdBRFU7QUFFaEJHLFNBQU8sZUFBQ0YsS0FBRDtBQUFBLFdBQVdBLE1BQU1DLE9BQU4sQ0FBY0MsS0FBekI7QUFBQSxHQUZTO0FBR2hCQyxnQkFBYyxzQkFBQ0gsS0FBRDtBQUFBLFdBQVdBLE1BQU1DLE9BQU4sQ0FBY0csUUFBekI7QUFBQSxHQUhFO0FBSWhCQyxjQUFZLG9CQUFDTCxLQUFEO0FBQUEsV0FBV0EsTUFBTUMsT0FBTixDQUFjSyxNQUF6QjtBQUFBLEdBSkk7QUFLaEJDLGFBQVcsbUJBQUNQLEtBQUQ7QUFBQSxXQUFXQSxNQUFNQyxPQUFOLENBQWNNLFNBQXpCO0FBQUEsR0FMSztBQU1oQkMsV0FBUyxpQkFBQ1IsS0FBRDtBQUFBLFdBQVdBLE1BQU1DLE9BQU4sQ0FBY08sT0FBekI7QUFBQTtBQU5PLENBQVQsQ0FBUixFQU9HO0FBQ0ZDLDZCQURFO0FBRUZDO0FBRkUsQ0FQSCxDOzs7Ozs7Ozs7Ozs7OztvTEFhQ0MsTSxHQUFTO0FBQ1BDLDhCQUF3QjtBQURqQixLLFFBR1ZDLE8sR0FBVSxFLFFBQ2JDLE0sR0FBUyxFQUFDLFVBQVMsRUFBQyxjQUFhLEVBQWQsRUFBaUIsZ0JBQWUsRUFBaEMsRUFBbUMscUJBQW9CLFNBQXZELEVBQVYsRSxRQUNUQyxPLEdBQVUsRUFBQyxVQUFTLEVBQUMsZUFBYyxRQUFmLEVBQVYsRSxRQUNUQyxVLEdBQWE7QUFDUk47QUFEUSxLLFFBSVZPLE0sR0FBUyxFLFFBRVRDLEksR0FBTyxFLFFBR1BDLFEsR0FBVztBQUNUQyxTQURTLGlCQUNGO0FBQ0wsZUFBTyxDQUFDLElBQUlDLElBQUosRUFBUjtBQUNEO0FBSFEsSyxRQU1YQyxPLEdBQVUsRSxRQUdWQyxNLEdBQVMsRTs7Ozs7NkJBR0E7QUFDUCxXQUFLRCxPQUFMLENBQWFiLEtBQWIsQ0FBbUIsRUFBQ2UsTUFBTSxTQUFQLEVBQW5CO0FBQ0FDLGNBQVFDLEdBQVIsQ0FBWSxJQUFaO0FBQ0Q7Ozs7RUEvQmdDLGVBQUtDLEk7a0JBQW5CN0IsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuICBpbXBvcnQgd2VweSBmcm9tICd3ZXB5J1xuXG4gIGltcG9ydCBGaWx0ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9maWx0ZXInXG5cbiAgaW1wb3J0IHsgY29ubmVjdCwgbWFwU3RhdGUgfSBmcm9tICd3ZXB5LXJlZHV4J1xuICBpbXBvcnQgeyBGRVRDSF9SRUNPUkRTLCBGSUxURVJfUkVDT1JEUyB9IGZyb20gJy4uL3N0b3JlL3R5cGVzJ1xuICBAY29ubmVjdChtYXBTdGF0ZSh7XG4gICAgbGlzdDogKHN0YXRlKSA9PiBzdGF0ZS5yZWNvcmRzLmxpc3QsXG4gICAgcGhvdG86IChzdGF0ZSkgPT4gc3RhdGUucmVjb3Jkcy5waG90byxcbiAgICBiZ19pbWFnZV91cmw6IChzdGF0ZSkgPT4gc3RhdGUucmVjb3Jkcy5iZ19pbWFnZSxcbiAgICBhdmF0YXJfdXJsOiAoc3RhdGUpID0+IHN0YXRlLnJlY29yZHMuYXZhdGFyLFxuICAgIG1zZ19jb3VudDogKHN0YXRlKSA9PiBzdGF0ZS5yZWNvcmRzLm1zZ19jb3VudCxcbiAgICBmaWx0ZXJzOiAoc3RhdGUpID0+IHN0YXRlLnJlY29yZHMuZmlsdGVyc1xuICB9KSwge1xuICAgIGZldGNoOiBGRVRDSF9SRUNPUkRTLFxuICAgIGZpbHRlcjogRklMVEVSX1JFQ09SRFNcbiAgfSlcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WKqOaAgeWIl+ihqCdcbiAgICB9XG4gICAkcmVwZWF0ID0ge307XHJcbiRwcm9wcyA9IHtcImZpbHRlclwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDppdGVtcy5vbmNlXCI6XCJmaWx0ZXJzXCJ9fTtcclxuJGV2ZW50cyA9IHtcImZpbHRlclwiOntcInYtb246ZmlsdGVyXCI6XCJmaWx0ZXJcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIGZpbHRlcjogRmlsdGVyXG4gICAgfVxuXG4gICAgbWl4aW5zID0gW11cblxuICAgIGRhdGEgPSB7XG4gICAgfVxuXG4gICAgY29tcHV0ZWQgPSB7XG4gICAgICBub3cgKCkge1xuICAgICAgICByZXR1cm4gK25ldyBEYXRlKClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZXRob2RzID0ge1xuICAgIH1cblxuICAgIGV2ZW50cyA9IHtcbiAgICB9XG5cbiAgICBvbkxvYWQoKSB7XG4gICAgICB0aGlzLm1ldGhvZHMuZmV0Y2goe3R5cGU6ICdmaWRzaW9mJ30pXG4gICAgICBjb25zb2xlLmxvZyh0aGlzKVxuICAgIH1cbiAgfVxuIl19