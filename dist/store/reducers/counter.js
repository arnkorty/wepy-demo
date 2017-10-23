'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = require('./../../npm/redux-actions/lib/index.js');

var _counter = require('./../types/counter.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _counter.INCREMENT, function (state) {
  return _extends({}, state, {
    num: state.num + 1
  });
}), _defineProperty(_handleActions, _counter.DECREMENT, function (state) {
  return _extends({}, state, {
    num: state.num - 1
  });
}), _defineProperty(_handleActions, _counter.ASYNC_INCREMENT, function (state, action) {
  return _extends({}, state, {
    asyncNum: state.asyncNum + action.payload
  });
}), _handleActions), {
  num: 0,
  asyncNum: 0
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvdW50ZXIuanMiXSwibmFtZXMiOlsic3RhdGUiLCJudW0iLCJhY3Rpb24iLCJhc3luY051bSIsInBheWxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7OztrQkFFZSxxSEFDQUEsS0FEQSxFQUNPO0FBQ2xCLHNCQUNLQSxLQURMO0FBRUVDLFNBQUtELE1BQU1DLEdBQU4sR0FBWTtBQUZuQjtBQUlELENBTlksaUVBT0FELEtBUEEsRUFPTztBQUNsQixzQkFDS0EsS0FETDtBQUVFQyxTQUFLRCxNQUFNQyxHQUFOLEdBQVk7QUFGbkI7QUFJRCxDQVpZLHVFQWFNRCxLQWJOLEVBYWFFLE1BYmIsRUFhcUI7QUFDaEMsc0JBQ0tGLEtBREw7QUFFRUcsY0FBVUgsTUFBTUcsUUFBTixHQUFpQkQsT0FBT0U7QUFGcEM7QUFJRCxDQWxCWSxvQkFtQlo7QUFDREgsT0FBSyxDQURKO0FBRURFLFlBQVU7QUFGVCxDQW5CWSxDIiwiZmlsZSI6ImNvdW50ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBoYW5kbGVBY3Rpb25zIH0gZnJvbSAncmVkdXgtYWN0aW9ucydcclxuaW1wb3J0IHsgSU5DUkVNRU5ULCBERUNSRU1FTlQsIEFTWU5DX0lOQ1JFTUVOVCB9IGZyb20gJy4uL3R5cGVzL2NvdW50ZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBoYW5kbGVBY3Rpb25zKHtcclxuICBbSU5DUkVNRU5UXSAoc3RhdGUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLnN0YXRlLFxyXG4gICAgICBudW06IHN0YXRlLm51bSArIDFcclxuICAgIH1cclxuICB9LFxyXG4gIFtERUNSRU1FTlRdIChzdGF0ZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uc3RhdGUsXHJcbiAgICAgIG51bTogc3RhdGUubnVtIC0gMVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgW0FTWU5DX0lOQ1JFTUVOVF0gKHN0YXRlLCBhY3Rpb24pIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLnN0YXRlLFxyXG4gICAgICBhc3luY051bTogc3RhdGUuYXN5bmNOdW0gKyBhY3Rpb24ucGF5bG9hZFxyXG4gICAgfVxyXG4gIH1cclxufSwge1xyXG4gIG51bTogMCxcclxuICBhc3luY051bTogMFxyXG59KVxyXG4iXX0=