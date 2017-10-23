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

var _index = require('./../mock/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

console.log(_index.records);

// const record = getRecord()

var Index = (_dec = (0, _wepyRedux.connect)((0, _wepyRedux.mapState)({
  // list: (state) => state.records.list,
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
      navigationBarTitleText: '动态列表',
      backgroundColor: '#bbb'
    }, _this.$repeat = { "list": { "com": "RecordList", "props": "record" } }, _this.$props = { "RecordList": { "v-bind:record.once": { "value": "litem", "type": "item", "for": "list", "item": "litem", "index": "index", "key": "recordid" }, "indexa": { "value": "index", "type": "index", "for": "list", "item": "litem", "index": "index", "key": "recordid" } }, "Filter": { "xmlns:v-on": "", "xmlns:v-bind": "", "v-bind:items.once": "filters" } }, _this.$events = { "Filter": { "v-on:filter": "filter" } }, _this.components = {
      Filter: _filter2.default,
      RecordList: _record_list2.default
    }, _this.mixins = [], _this.data = {
      list: _index.records.data.list
    }, _this.computed = {
      now: function now() {
        return +new Date();
      }
    }, _this.methods = {}, _this.events = {}, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      this.methods.fetch({ type: 'fidsiof' });
      console.log('get wepy index list');
      console.log(this.data.list);
    }
  }]);

  return Index;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbImNvbnNvbGUiLCJsb2ciLCJJbmRleCIsInBob3RvIiwic3RhdGUiLCJyZWNvcmRzIiwiYmdfaW1hZ2VfdXJsIiwiYmdfaW1hZ2UiLCJhdmF0YXJfdXJsIiwiYXZhdGFyIiwibXNnX2NvdW50IiwiZmlsdGVycyIsImZldGNoIiwiZmlsdGVyIiwiY29uZmlnIiwibmF2aWdhdGlvbkJhclRpdGxlVGV4dCIsImJhY2tncm91bmRDb2xvciIsIiRyZXBlYXQiLCIkcHJvcHMiLCIkZXZlbnRzIiwiY29tcG9uZW50cyIsIkZpbHRlciIsIlJlY29yZExpc3QiLCJtaXhpbnMiLCJkYXRhIiwibGlzdCIsImNvbXB1dGVkIiwibm93IiwiRGF0ZSIsIm1ldGhvZHMiLCJldmVudHMiLCJ0eXBlIiwicGFnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDRTs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFFQTs7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQUNBQSxRQUFRQyxHQUFSOztBQUVBOztJQWNxQkMsSyxXQVpwQix3QkFBUSx5QkFBUztBQUNoQjtBQUNBQyxTQUFPLGVBQUNDLEtBQUQ7QUFBQSxXQUFXQSxNQUFNQyxPQUFOLENBQWNGLEtBQXpCO0FBQUEsR0FGUztBQUdoQkcsZ0JBQWMsc0JBQUNGLEtBQUQ7QUFBQSxXQUFXQSxNQUFNQyxPQUFOLENBQWNFLFFBQXpCO0FBQUEsR0FIRTtBQUloQkMsY0FBWSxvQkFBQ0osS0FBRDtBQUFBLFdBQVdBLE1BQU1DLE9BQU4sQ0FBY0ksTUFBekI7QUFBQSxHQUpJO0FBS2hCQyxhQUFXLG1CQUFDTixLQUFEO0FBQUEsV0FBV0EsTUFBTUMsT0FBTixDQUFjSyxTQUF6QjtBQUFBLEdBTEs7QUFNaEJDLFdBQVMsaUJBQUNQLEtBQUQ7QUFBQSxXQUFXQSxNQUFNQyxPQUFOLENBQWNNLE9BQXpCO0FBQUE7QUFOTyxDQUFULENBQVIsRUFPRztBQUNGQyw2QkFERTtBQUVGQztBQUZFLENBUEgsQzs7Ozs7Ozs7Ozs7Ozs7b0xBYUNDLE0sR0FBUztBQUNQQyw4QkFBd0IsTUFEakI7QUFFUEMsdUJBQWlCO0FBRlYsSyxRQUlWQyxPLEdBQVUsRUFBQyxRQUFPLEVBQUMsT0FBTSxZQUFQLEVBQW9CLFNBQVEsUUFBNUIsRUFBUixFLFFBQ2JDLE0sR0FBUyxFQUFDLGNBQWEsRUFBQyxzQkFBcUIsRUFBQyxTQUFRLE9BQVQsRUFBaUIsUUFBTyxNQUF4QixFQUErQixPQUFNLE1BQXJDLEVBQTRDLFFBQU8sT0FBbkQsRUFBMkQsU0FBUSxPQUFuRSxFQUEyRSxPQUFNLFVBQWpGLEVBQXRCLEVBQW1ILFVBQVMsRUFBQyxTQUFRLE9BQVQsRUFBaUIsUUFBTyxPQUF4QixFQUFnQyxPQUFNLE1BQXRDLEVBQTZDLFFBQU8sT0FBcEQsRUFBNEQsU0FBUSxPQUFwRSxFQUE0RSxPQUFNLFVBQWxGLEVBQTVILEVBQWQsRUFBeU8sVUFBUyxFQUFDLGNBQWEsRUFBZCxFQUFpQixnQkFBZSxFQUFoQyxFQUFtQyxxQkFBb0IsU0FBdkQsRUFBbFAsRSxRQUNUQyxPLEdBQVUsRUFBQyxVQUFTLEVBQUMsZUFBYyxRQUFmLEVBQVYsRSxRQUNUQyxVLEdBQWE7QUFDUkMsOEJBRFE7QUFFUkM7QUFGUSxLLFFBS1ZDLE0sR0FBUyxFLFFBRVRDLEksR0FBTztBQUNMQyxZQUFNLGVBQVFELElBQVIsQ0FBYUM7QUFEZCxLLFFBSVBDLFEsR0FBVztBQUNUQyxTQURTLGlCQUNGO0FBQ0wsZUFBTyxDQUFDLElBQUlDLElBQUosRUFBUjtBQUNEO0FBSFEsSyxRQU1YQyxPLEdBQVUsRSxRQUdWQyxNLEdBQVMsRTs7Ozs7NkJBR0E7QUFDUCxXQUFLRCxPQUFMLENBQWFqQixLQUFiLENBQW1CLEVBQUNtQixNQUFNLFNBQVAsRUFBbkI7QUFDQS9CLGNBQVFDLEdBQVIsQ0FBWSxxQkFBWjtBQUNBRCxjQUFRQyxHQUFSLENBQVksS0FBS3VCLElBQUwsQ0FBVUMsSUFBdEI7QUFDRDs7OztFQW5DZ0MsZUFBS08sSTtrQkFBbkI5QixLIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXG5cbiAgaW1wb3J0IEZpbHRlciBmcm9tICcuLi9jb21wb25lbnRzL2ZpbHRlcidcbiAgaW1wb3J0IFJlY29yZExpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9yZWNvcmRfbGlzdCdcblxuICBpbXBvcnQgeyBjb25uZWN0LCBtYXBTdGF0ZSB9IGZyb20gJ3dlcHktcmVkdXgnXG4gIGltcG9ydCB7IEZFVENIX1JFQ09SRFMsIEZJTFRFUl9SRUNPUkRTIH0gZnJvbSAnLi4vc3RvcmUvdHlwZXMnXG5cbiAgaW1wb3J0IHsgcmVjb3JkcyB9IGZyb20gJy4uL21vY2svaW5kZXgnXG4gIGNvbnNvbGUubG9nKHJlY29yZHMpXG5cbiAgLy8gY29uc3QgcmVjb3JkID0gZ2V0UmVjb3JkKClcblxuICBAY29ubmVjdChtYXBTdGF0ZSh7XG4gICAgLy8gbGlzdDogKHN0YXRlKSA9PiBzdGF0ZS5yZWNvcmRzLmxpc3QsXG4gICAgcGhvdG86IChzdGF0ZSkgPT4gc3RhdGUucmVjb3Jkcy5waG90byxcbiAgICBiZ19pbWFnZV91cmw6IChzdGF0ZSkgPT4gc3RhdGUucmVjb3Jkcy5iZ19pbWFnZSxcbiAgICBhdmF0YXJfdXJsOiAoc3RhdGUpID0+IHN0YXRlLnJlY29yZHMuYXZhdGFyLFxuICAgIG1zZ19jb3VudDogKHN0YXRlKSA9PiBzdGF0ZS5yZWNvcmRzLm1zZ19jb3VudCxcbiAgICBmaWx0ZXJzOiAoc3RhdGUpID0+IHN0YXRlLnJlY29yZHMuZmlsdGVyc1xuICB9KSwge1xuICAgIGZldGNoOiBGRVRDSF9SRUNPUkRTLFxuICAgIGZpbHRlcjogRklMVEVSX1JFQ09SRFNcbiAgfSlcblxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XG4gICAgY29uZmlnID0ge1xuICAgICAgbmF2aWdhdGlvbkJhclRpdGxlVGV4dDogJ+WKqOaAgeWIl+ihqCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjYmJiJ1xuICAgIH1cbiAgICRyZXBlYXQgPSB7XCJsaXN0XCI6e1wiY29tXCI6XCJSZWNvcmRMaXN0XCIsXCJwcm9wc1wiOlwicmVjb3JkXCJ9fTtcclxuJHByb3BzID0ge1wiUmVjb3JkTGlzdFwiOntcInYtYmluZDpyZWNvcmQub25jZVwiOntcInZhbHVlXCI6XCJsaXRlbVwiLFwidHlwZVwiOlwiaXRlbVwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJsaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInJlY29yZGlkXCJ9LFwiaW5kZXhhXCI6e1widmFsdWVcIjpcImluZGV4XCIsXCJ0eXBlXCI6XCJpbmRleFwiLFwiZm9yXCI6XCJsaXN0XCIsXCJpdGVtXCI6XCJsaXRlbVwiLFwiaW5kZXhcIjpcImluZGV4XCIsXCJrZXlcIjpcInJlY29yZGlkXCJ9fSxcIkZpbHRlclwiOntcInhtbG5zOnYtb25cIjpcIlwiLFwieG1sbnM6di1iaW5kXCI6XCJcIixcInYtYmluZDppdGVtcy5vbmNlXCI6XCJmaWx0ZXJzXCJ9fTtcclxuJGV2ZW50cyA9IHtcIkZpbHRlclwiOntcInYtb246ZmlsdGVyXCI6XCJmaWx0ZXJcIn19O1xyXG4gY29tcG9uZW50cyA9IHtcbiAgICAgIEZpbHRlcjogRmlsdGVyLFxuICAgICAgUmVjb3JkTGlzdDogUmVjb3JkTGlzdFxuICAgIH1cblxuICAgIG1peGlucyA9IFtdXG5cbiAgICBkYXRhID0ge1xuICAgICAgbGlzdDogcmVjb3Jkcy5kYXRhLmxpc3RcbiAgICB9XG5cbiAgICBjb21wdXRlZCA9IHtcbiAgICAgIG5vdyAoKSB7XG4gICAgICAgIHJldHVybiArbmV3IERhdGUoKVxuICAgICAgfVxuICAgIH1cblxuICAgIG1ldGhvZHMgPSB7XG4gICAgfVxuXG4gICAgZXZlbnRzID0ge1xuICAgIH1cblxuICAgIG9uTG9hZCgpIHtcbiAgICAgIHRoaXMubWV0aG9kcy5mZXRjaCh7dHlwZTogJ2ZpZHNpb2YnfSlcbiAgICAgIGNvbnNvbGUubG9nKCdnZXQgd2VweSBpbmRleCBsaXN0JylcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5saXN0KVxuICAgIH1cbiAgfVxuIl19