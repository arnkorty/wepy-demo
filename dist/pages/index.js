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

var _list = require('./../components/record/list.js');

var _list2 = _interopRequireDefault(_list);

var _wepyRedux = require('./../npm/wepy-redux/lib/index.js');

var _types = require('./../store/types/index.js');

var _index = require('./../mock/index.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
    }, _this.$repeat = { "list": { "com": "RecordList", "props": "record" } }, _this.$props = { "RecordList": { "v-bind:record.once": { "value": "litem", "type": "item", "for": "list", "item": "litem", "index": "index", "key": "recordid" }, "indexa": { "value": "index", "type": "index", "for": "list", "item": "litem", "index": "index", "key": "recordid" } }, "Filter": { "xmlns:v-bind": "", "v-bind:items.once": "filters" } }, _this.$events = {}, _this.components = {
      Filter: _filter2.default,
      RecordList: _list2.default
    }, _this.mixins = [], _this.data = {
      list: _index.records.data.list
    }, _this.computed = {
      now: function now() {
        return +new Date();
      }
    }, _this.methods = {}, _this.events = {
      deleteRecord: function deleteRecord(recordid) {
        // console.log(this.list)
        this.list = this.list.filter(function (r) {
          return r.recordid !== recordid;
        });
      },
      filter: function filter(id) {
        console.log('执行过滤' + id);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Index, [{
    key: 'onLoad',
    value: function onLoad() {
      this.methods.fetch({ type: 'test redux' });
      console.log('get wepy index list');
      console.log(this.data.list);
    }
  }]);

  return Index;
}(_wepy2.default.page)) || _class);

Page(require('./../npm/wepy/lib/wepy.js').default.$createPage(Index , 'pages/index'));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LmpzIl0sIm5hbWVzIjpbIkluZGV4IiwicGhvdG8iLCJzdGF0ZSIsInJlY29yZHMiLCJiZ19pbWFnZV91cmwiLCJiZ19pbWFnZSIsImF2YXRhcl91cmwiLCJhdmF0YXIiLCJtc2dfY291bnQiLCJmaWx0ZXJzIiwiZmV0Y2giLCJmaWx0ZXIiLCJjb25maWciLCJuYXZpZ2F0aW9uQmFyVGl0bGVUZXh0IiwiYmFja2dyb3VuZENvbG9yIiwiJHJlcGVhdCIsIiRwcm9wcyIsIiRldmVudHMiLCJjb21wb25lbnRzIiwiRmlsdGVyIiwiUmVjb3JkTGlzdCIsIm1peGlucyIsImRhdGEiLCJsaXN0IiwiY29tcHV0ZWQiLCJub3ciLCJEYXRlIiwibWV0aG9kcyIsImV2ZW50cyIsImRlbGV0ZVJlY29yZCIsInJlY29yZGlkIiwiciIsImlkIiwiY29uc29sZSIsImxvZyIsInR5cGUiLCJwYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNFOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOztBQUVBOzs7Ozs7Ozs7O0FBRUE7O0lBY3FCQSxLLFdBWnBCLHdCQUFRLHlCQUFTO0FBQ2hCO0FBQ0FDLFNBQU8sZUFBQ0MsS0FBRDtBQUFBLFdBQVdBLE1BQU1DLE9BQU4sQ0FBY0YsS0FBekI7QUFBQSxHQUZTO0FBR2hCRyxnQkFBYyxzQkFBQ0YsS0FBRDtBQUFBLFdBQVdBLE1BQU1DLE9BQU4sQ0FBY0UsUUFBekI7QUFBQSxHQUhFO0FBSWhCQyxjQUFZLG9CQUFDSixLQUFEO0FBQUEsV0FBV0EsTUFBTUMsT0FBTixDQUFjSSxNQUF6QjtBQUFBLEdBSkk7QUFLaEJDLGFBQVcsbUJBQUNOLEtBQUQ7QUFBQSxXQUFXQSxNQUFNQyxPQUFOLENBQWNLLFNBQXpCO0FBQUEsR0FMSztBQU1oQkMsV0FBUyxpQkFBQ1AsS0FBRDtBQUFBLFdBQVdBLE1BQU1DLE9BQU4sQ0FBY00sT0FBekI7QUFBQTtBQU5PLENBQVQsQ0FBUixFQU9HO0FBQ0ZDLDZCQURFO0FBRUZDO0FBRkUsQ0FQSCxDOzs7Ozs7Ozs7Ozs7OztvTEFhQ0MsTSxHQUFTO0FBQ1BDLDhCQUF3QixNQURqQjtBQUVQQyx1QkFBaUI7QUFGVixLLFFBSVZDLE8sR0FBVSxFQUFDLFFBQU8sRUFBQyxPQUFNLFlBQVAsRUFBb0IsU0FBUSxRQUE1QixFQUFSLEUsUUFDYkMsTSxHQUFTLEVBQUMsY0FBYSxFQUFDLHNCQUFxQixFQUFDLFNBQVEsT0FBVCxFQUFpQixRQUFPLE1BQXhCLEVBQStCLE9BQU0sTUFBckMsRUFBNEMsUUFBTyxPQUFuRCxFQUEyRCxTQUFRLE9BQW5FLEVBQTJFLE9BQU0sVUFBakYsRUFBdEIsRUFBbUgsVUFBUyxFQUFDLFNBQVEsT0FBVCxFQUFpQixRQUFPLE9BQXhCLEVBQWdDLE9BQU0sTUFBdEMsRUFBNkMsUUFBTyxPQUFwRCxFQUE0RCxTQUFRLE9BQXBFLEVBQTRFLE9BQU0sVUFBbEYsRUFBNUgsRUFBZCxFQUF5TyxVQUFTLEVBQUMsZ0JBQWUsRUFBaEIsRUFBbUIscUJBQW9CLFNBQXZDLEVBQWxQLEUsUUFDVEMsTyxHQUFVLEUsUUFDVEMsVSxHQUFhO0FBQ1JDLDhCQURRO0FBRVJDO0FBRlEsSyxRQUtWQyxNLEdBQVMsRSxRQUVUQyxJLEdBQU87QUFDTEMsWUFBTSxlQUFRRCxJQUFSLENBQWFDO0FBRGQsSyxRQUlQQyxRLEdBQVc7QUFDVEMsU0FEUyxpQkFDRjtBQUNMLGVBQU8sQ0FBQyxJQUFJQyxJQUFKLEVBQVI7QUFDRDtBQUhRLEssUUFNWEMsTyxHQUFVLEUsUUFHVkMsTSxHQUFTO0FBQ1BDLGtCQURPLHdCQUNPQyxRQURQLEVBQ2lCO0FBQ3RCO0FBQ0EsYUFBS1AsSUFBTCxHQUFZLEtBQUtBLElBQUwsQ0FBVVosTUFBVixDQUFpQixVQUFDb0IsQ0FBRDtBQUFBLGlCQUFPQSxFQUFFRCxRQUFGLEtBQWVBLFFBQXRCO0FBQUEsU0FBakIsQ0FBWjtBQUNELE9BSk07QUFLUG5CLFlBTE8sa0JBS0NxQixFQUxELEVBS0s7QUFDVkMsZ0JBQVFDLEdBQVIsQ0FBWSxTQUFTRixFQUFyQjtBQUNEO0FBUE0sSzs7Ozs7NkJBVUE7QUFDUCxXQUFLTCxPQUFMLENBQWFqQixLQUFiLENBQW1CLEVBQUN5QixNQUFNLFlBQVAsRUFBbkI7QUFDQUYsY0FBUUMsR0FBUixDQUFZLHFCQUFaO0FBQ0FELGNBQVFDLEdBQVIsQ0FBWSxLQUFLWixJQUFMLENBQVVDLElBQXRCO0FBQ0Q7Ozs7RUExQ2dDLGVBQUthLEk7a0JBQW5CcEMsSyIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gIGltcG9ydCBGaWx0ZXIgZnJvbSAnLi4vY29tcG9uZW50cy9maWx0ZXInXHJcbiAgaW1wb3J0IFJlY29yZExpc3QgZnJvbSAnLi4vY29tcG9uZW50cy9yZWNvcmQvbGlzdCdcclxuXHJcbiAgaW1wb3J0IHsgY29ubmVjdCwgbWFwU3RhdGUgfSBmcm9tICd3ZXB5LXJlZHV4J1xyXG4gIGltcG9ydCB7IEZFVENIX1JFQ09SRFMsIEZJTFRFUl9SRUNPUkRTIH0gZnJvbSAnLi4vc3RvcmUvdHlwZXMnXHJcblxyXG4gIGltcG9ydCB7IHJlY29yZHMgfSBmcm9tICcuLi9tb2NrL2luZGV4J1xyXG5cclxuICAvLyBjb25zdCByZWNvcmQgPSBnZXRSZWNvcmQoKVxyXG5cclxuICBAY29ubmVjdChtYXBTdGF0ZSh7XHJcbiAgICAvLyBsaXN0OiAoc3RhdGUpID0+IHN0YXRlLnJlY29yZHMubGlzdCxcclxuICAgIHBob3RvOiAoc3RhdGUpID0+IHN0YXRlLnJlY29yZHMucGhvdG8sXHJcbiAgICBiZ19pbWFnZV91cmw6IChzdGF0ZSkgPT4gc3RhdGUucmVjb3Jkcy5iZ19pbWFnZSxcclxuICAgIGF2YXRhcl91cmw6IChzdGF0ZSkgPT4gc3RhdGUucmVjb3Jkcy5hdmF0YXIsXHJcbiAgICBtc2dfY291bnQ6IChzdGF0ZSkgPT4gc3RhdGUucmVjb3Jkcy5tc2dfY291bnQsXHJcbiAgICBmaWx0ZXJzOiAoc3RhdGUpID0+IHN0YXRlLnJlY29yZHMuZmlsdGVyc1xyXG4gIH0pLCB7XHJcbiAgICBmZXRjaDogRkVUQ0hfUkVDT1JEUyxcclxuICAgIGZpbHRlcjogRklMVEVSX1JFQ09SRFNcclxuICB9KVxyXG5cclxuICBleHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIHdlcHkucGFnZSB7XHJcbiAgICBjb25maWcgPSB7XHJcbiAgICAgIG5hdmlnYXRpb25CYXJUaXRsZVRleHQ6ICfliqjmgIHliJfooagnLFxyXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjYmJiJ1xyXG4gICAgfVxyXG4gICAkcmVwZWF0ID0ge1wibGlzdFwiOntcImNvbVwiOlwiUmVjb3JkTGlzdFwiLFwicHJvcHNcIjpcInJlY29yZFwifX07XHJcbiRwcm9wcyA9IHtcIlJlY29yZExpc3RcIjp7XCJ2LWJpbmQ6cmVjb3JkLm9uY2VcIjp7XCJ2YWx1ZVwiOlwibGl0ZW1cIixcInR5cGVcIjpcIml0ZW1cIixcImZvclwiOlwibGlzdFwiLFwiaXRlbVwiOlwibGl0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJyZWNvcmRpZFwifSxcImluZGV4YVwiOntcInZhbHVlXCI6XCJpbmRleFwiLFwidHlwZVwiOlwiaW5kZXhcIixcImZvclwiOlwibGlzdFwiLFwiaXRlbVwiOlwibGl0ZW1cIixcImluZGV4XCI6XCJpbmRleFwiLFwia2V5XCI6XCJyZWNvcmRpZFwifX0sXCJGaWx0ZXJcIjp7XCJ4bWxuczp2LWJpbmRcIjpcIlwiLFwidi1iaW5kOml0ZW1zLm9uY2VcIjpcImZpbHRlcnNcIn19O1xyXG4kZXZlbnRzID0ge307XHJcbiBjb21wb25lbnRzID0ge1xyXG4gICAgICBGaWx0ZXI6IEZpbHRlcixcclxuICAgICAgUmVjb3JkTGlzdDogUmVjb3JkTGlzdFxyXG4gICAgfVxyXG5cclxuICAgIG1peGlucyA9IFtdXHJcblxyXG4gICAgZGF0YSA9IHtcclxuICAgICAgbGlzdDogcmVjb3Jkcy5kYXRhLmxpc3RcclxuICAgIH1cclxuXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgbm93ICgpIHtcclxuICAgICAgICByZXR1cm4gK25ldyBEYXRlKClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG1ldGhvZHMgPSB7XHJcbiAgICB9XHJcblxyXG4gICAgZXZlbnRzID0ge1xyXG4gICAgICBkZWxldGVSZWNvcmQgKHJlY29yZGlkKSB7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2codGhpcy5saXN0KVxyXG4gICAgICAgIHRoaXMubGlzdCA9IHRoaXMubGlzdC5maWx0ZXIoKHIpID0+IHIucmVjb3JkaWQgIT09IHJlY29yZGlkKVxyXG4gICAgICB9LFxyXG4gICAgICBmaWx0ZXIgKGlkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ+aJp+ihjOi/h+a7pCcgKyBpZClcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG9uTG9hZCgpIHtcclxuICAgICAgdGhpcy5tZXRob2RzLmZldGNoKHt0eXBlOiAndGVzdCByZWR1eCd9KVxyXG4gICAgICBjb25zb2xlLmxvZygnZ2V0IHdlcHkgaW5kZXggbGlzdCcpXHJcbiAgICAgIGNvbnNvbGUubG9nKHRoaXMuZGF0YS5saXN0KVxyXG4gICAgfVxyXG4gIH1cclxuIl19