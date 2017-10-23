'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _handleActions;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reduxActions = require('./../../npm/redux-actions/lib/index.js');

var _records = require('./../types/records.js');

var _mock = require('./../../mock/index.js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var initState = {
  filters: [{ id: 'foisjdfodsf', name: '我的家人' }, { id: 'jfodsjfosdjfo', name: '我关注的' }],
  list: [],
  msg_count: 0,
  photo: '',
  bg_image: '',
  avatar: ''
};
exports.default = (0, _reduxActions.handleActions)((_handleActions = {}, _defineProperty(_handleActions, _records.FETCH_RECORDS, function (state) {
  console.log(state);
  console.log(arguments);
  return _extends({}, state, {
    list: _mock.records.data.list,
    msg_count: _mock.records.data.msg_count,
    photo: _mock.records.data.photo,
    bg_image: _mock.records.data.bg_image,
    avatar: _mock.records.data.avatar
  });
}), _defineProperty(_handleActions, _records.FILTER_RECORDS, function (state, payload) {
  return state;
}), _handleActions), initState);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZHMuanMiXSwibmFtZXMiOlsiaW5pdFN0YXRlIiwiZmlsdGVycyIsImlkIiwibmFtZSIsImxpc3QiLCJtc2dfY291bnQiLCJwaG90byIsImJnX2ltYWdlIiwiYXZhdGFyIiwic3RhdGUiLCJjb25zb2xlIiwibG9nIiwiYXJndW1lbnRzIiwiZGF0YSIsInBheWxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7OztBQUVBLElBQU1BLFlBQVk7QUFDaEJDLFdBQVMsQ0FBQyxFQUFDQyxJQUFJLGFBQUwsRUFBb0JDLE1BQU0sTUFBMUIsRUFBRCxFQUFvQyxFQUFDRCxJQUFJLGVBQUwsRUFBc0JDLE1BQU0sTUFBNUIsRUFBcEMsQ0FETztBQUVoQkMsUUFBTSxFQUZVO0FBR2hCQyxhQUFXLENBSEs7QUFJaEJDLFNBQU8sRUFKUztBQUtoQkMsWUFBVSxFQUxNO0FBTWhCQyxVQUFRO0FBTlEsQ0FBbEI7a0JBUWUseUhBQ0lDLEtBREosRUFDVztBQUN0QkMsVUFBUUMsR0FBUixDQUFZRixLQUFaO0FBQ0FDLFVBQVFDLEdBQVIsQ0FBWUMsU0FBWjtBQUNBLHNCQUFXSCxLQUFYO0FBQ0VMLFVBQU0sY0FBUVMsSUFBUixDQUFhVCxJQURyQjtBQUVFQyxlQUFXLGNBQVFRLElBQVIsQ0FBYVIsU0FGMUI7QUFHRUMsV0FBTyxjQUFRTyxJQUFSLENBQWFQLEtBSHRCO0FBSUVDLGNBQVUsY0FBUU0sSUFBUixDQUFhTixRQUp6QjtBQUtFQyxZQUFRLGNBQVFLLElBQVIsQ0FBYUw7QUFMdkI7QUFPRCxDQVhZLHNFQVlLQyxLQVpMLEVBWVlLLE9BWlosRUFZcUI7QUFDaEMsU0FBT0wsS0FBUDtBQUNELENBZFksb0JBZVpULFNBZlksQyIsImZpbGUiOiJyZWNvcmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaGFuZGxlQWN0aW9ucyB9IGZyb20gJ3JlZHV4LWFjdGlvbnMnXG5pbXBvcnQgeyBGRVRDSF9SRUNPUkRTLCBGSUxURVJfUkVDT1JEUyB9IGZyb20gJy4uL3R5cGVzL3JlY29yZHMnXG5cbmltcG9ydCB7IHJlY29yZHMgfSBmcm9tICcuLi8uLi9tb2NrJ1xuXG5jb25zdCBpbml0U3RhdGUgPSB7XG4gIGZpbHRlcnM6IFt7aWQ6ICdmb2lzamRmb2RzZicsIG5hbWU6ICfmiJHnmoTlrrbkuronfSwge2lkOiAnamZvZHNqZm9zZGpmbycsIG5hbWU6ICfmiJHlhbPms6jnmoQnfV0sXG4gIGxpc3Q6IFtdLFxuICBtc2dfY291bnQ6IDAsXG4gIHBob3RvOiAnJyxcbiAgYmdfaW1hZ2U6ICcnLFxuICBhdmF0YXI6ICcnXG59XG5leHBvcnQgZGVmYXVsdCBoYW5kbGVBY3Rpb25zKHtcbiAgW0ZFVENIX1JFQ09SRFNdIChzdGF0ZSkge1xuICAgIGNvbnNvbGUubG9nKHN0YXRlKVxuICAgIGNvbnNvbGUubG9nKGFyZ3VtZW50cylcbiAgICByZXR1cm4gey4uLnN0YXRlLFxuICAgICAgbGlzdDogcmVjb3Jkcy5kYXRhLmxpc3QsXG4gICAgICBtc2dfY291bnQ6IHJlY29yZHMuZGF0YS5tc2dfY291bnQsXG4gICAgICBwaG90bzogcmVjb3Jkcy5kYXRhLnBob3RvLFxuICAgICAgYmdfaW1hZ2U6IHJlY29yZHMuZGF0YS5iZ19pbWFnZSxcbiAgICAgIGF2YXRhcjogcmVjb3Jkcy5kYXRhLmF2YXRhclxuICAgIH1cbiAgfSxcbiAgW0ZJTFRFUl9SRUNPUkRTXSAoc3RhdGUsIHBheWxvYWQpIHtcbiAgICByZXR1cm4gc3RhdGVcbiAgfVxufSwgaW5pdFN0YXRlKVxuIl19