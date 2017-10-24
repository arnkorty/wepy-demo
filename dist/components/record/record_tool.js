'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _wepy = require('./../../npm/wepy/lib/wepy.js');

var _wepy2 = _interopRequireDefault(_wepy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RecordTool = function (_wepy$component) {
  _inherits(RecordTool, _wepy$component);

  function RecordTool() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, RecordTool);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = RecordTool.__proto__ || Object.getPrototypeOf(RecordTool)).call.apply(_ref, [this].concat(args))), _this), _this.props = {}, _this.data = {}, _this.methods = {
      delete: function _delete() {
        console.log('emit deleteRecord');
        console.log(this);
        this.$emit('log');
      }
    }, _this.computed = {
      timeago: function timeago() {
        return ~~(Math.random() * 60) + '分钟前';
      },
      location: function location() {
        return ['成都', '北京', '广州', '深圳', '上海'][~~(Math.random() * 7)];
      },
      can_delete: function can_delete() {
        return [true, false][~~(Math.random() * 2)];
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  // 待完成


  return RecordTool;
}(_wepy2.default.component);

exports.default = RecordTool;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZF90b29sLmpzIl0sIm5hbWVzIjpbIlJlY29yZFRvb2wiLCJwcm9wcyIsImRhdGEiLCJtZXRob2RzIiwiZGVsZXRlIiwiY29uc29sZSIsImxvZyIsIiRlbWl0IiwiY29tcHV0ZWQiLCJ0aW1lYWdvIiwiTWF0aCIsInJhbmRvbSIsImxvY2F0aW9uIiwiY2FuX2RlbGV0ZSIsImNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNFOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7Ozs7Ozs7Ozs7Ozs7OzhMQUNuQkMsSyxHQUFRLEUsUUFHUkMsSSxHQUFPLEUsUUFFUEMsTyxHQUFVO0FBQ1JDLFlBRFEscUJBQ0U7QUFDUkMsZ0JBQVFDLEdBQVIsQ0FBWSxtQkFBWjtBQUNBRCxnQkFBUUMsR0FBUixDQUFZLElBQVo7QUFDQSxhQUFLQyxLQUFMLENBQVcsS0FBWDtBQUNEO0FBTE8sSyxRQVNWQyxRLEdBQVc7QUFDVEMsYUFEUyxxQkFDRTtBQUNULGVBQU8sQ0FBQyxFQUFFQyxLQUFLQyxNQUFMLEtBQWdCLEVBQWxCLENBQUQsR0FBeUIsS0FBaEM7QUFDRCxPQUhRO0FBSVRDLGNBSlMsc0JBSUc7QUFDVixlQUFPLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLEVBQW1CLElBQW5CLEVBQXlCLElBQXpCLEVBQStCLENBQUMsRUFBRUYsS0FBS0MsTUFBTCxLQUFnQixDQUFsQixDQUFoQyxDQUFQO0FBQ0QsT0FOUTtBQU9URSxnQkFQUyx3QkFPSztBQUNaLGVBQU8sQ0FBQyxJQUFELEVBQU8sS0FBUCxFQUFjLENBQUMsRUFBRUgsS0FBS0MsTUFBTCxLQUFnQixDQUFsQixDQUFmLENBQVA7QUFDRDtBQVRRLEs7OztBQURYOzs7O0VBZHNDLGVBQUtHLFM7O2tCQUF4QmQsVSIsImZpbGUiOiJyZWNvcmRfdG9vbC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxyXG4gIGltcG9ydCB3ZXB5IGZyb20gJ3dlcHknXHJcblxyXG4gIGV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlY29yZFRvb2wgZXh0ZW5kcyB3ZXB5LmNvbXBvbmVudCB7XHJcbiAgICBwcm9wcyA9IHtcclxuICAgIH1cclxuXHJcbiAgICBkYXRhID0ge31cclxuXHJcbiAgICBtZXRob2RzID0ge1xyXG4gICAgICBkZWxldGUgKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdlbWl0IGRlbGV0ZVJlY29yZCcpXHJcbiAgICAgICAgY29uc29sZS5sb2codGhpcylcclxuICAgICAgICB0aGlzLiRlbWl0KCdsb2cnKVxyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5b6F5a6M5oiQXHJcbiAgICBjb21wdXRlZCA9IHtcclxuICAgICAgdGltZWFnbyAoKSB7XHJcbiAgICAgICAgcmV0dXJuIH5+KE1hdGgucmFuZG9tKCkgKiA2MCkgKyAn5YiG6ZKf5YmNJ1xyXG4gICAgICB9LFxyXG4gICAgICBsb2NhdGlvbiAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFsn5oiQ6YO9JywgJ+WMl+S6rCcsICflub/lt54nLCAn5rex5ZyzJywgJ+S4iua1tyddW35+KE1hdGgucmFuZG9tKCkgKiA3KV1cclxuICAgICAgfSxcclxuICAgICAgY2FuX2RlbGV0ZSAoKSB7XHJcbiAgICAgICAgcmV0dXJuIFt0cnVlLCBmYWxzZV1bfn4oTWF0aC5yYW5kb20oKSAqIDIpXVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfVxyXG4iXX0=