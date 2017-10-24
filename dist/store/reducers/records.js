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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZHMuanMiXSwibmFtZXMiOlsiaW5pdFN0YXRlIiwiZmlsdGVycyIsImlkIiwibmFtZSIsImxpc3QiLCJtc2dfY291bnQiLCJwaG90byIsImJnX2ltYWdlIiwiYXZhdGFyIiwic3RhdGUiLCJjb25zb2xlIiwibG9nIiwiYXJndW1lbnRzIiwiZGF0YSIsInBheWxvYWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTs7QUFDQTs7QUFFQTs7OztBQUVBLElBQU1BLFlBQVk7QUFDaEJDLFdBQVMsQ0FBQyxFQUFDQyxJQUFJLGFBQUwsRUFBb0JDLE1BQU0sTUFBMUIsRUFBRCxFQUFvQyxFQUFDRCxJQUFJLGVBQUwsRUFBc0JDLE1BQU0sTUFBNUIsRUFBcEMsQ0FETztBQUVoQkMsUUFBTSxFQUZVO0FBR2hCQyxhQUFXLENBSEs7QUFJaEJDLFNBQU8sRUFKUztBQUtoQkMsWUFBVSxFQUxNO0FBTWhCQyxVQUFRO0FBTlEsQ0FBbEI7a0JBUWUseUhBQ0lDLEtBREosRUFDVztBQUN0QkMsVUFBUUMsR0FBUixDQUFZRixLQUFaO0FBQ0FDLFVBQVFDLEdBQVIsQ0FBWUMsU0FBWjtBQUNBLHNCQUFXSCxLQUFYO0FBQ0VMLFVBQU0sY0FBUVMsSUFBUixDQUFhVCxJQURyQjtBQUVFQyxlQUFXLGNBQVFRLElBQVIsQ0FBYVIsU0FGMUI7QUFHRUMsV0FBTyxjQUFRTyxJQUFSLENBQWFQLEtBSHRCO0FBSUVDLGNBQVUsY0FBUU0sSUFBUixDQUFhTixRQUp6QjtBQUtFQyxZQUFRLGNBQVFLLElBQVIsQ0FBYUw7QUFMdkI7QUFPRCxDQVhZLHNFQVlLQyxLQVpMLEVBWVlLLE9BWlosRUFZcUI7QUFDaEMsU0FBT0wsS0FBUDtBQUNELENBZFksb0JBZVpULFNBZlksQyIsImZpbGUiOiJyZWNvcmRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaGFuZGxlQWN0aW9ucyB9IGZyb20gJ3JlZHV4LWFjdGlvbnMnXHJcbmltcG9ydCB7IEZFVENIX1JFQ09SRFMsIEZJTFRFUl9SRUNPUkRTIH0gZnJvbSAnLi4vdHlwZXMvcmVjb3JkcydcclxuXHJcbmltcG9ydCB7IHJlY29yZHMgfSBmcm9tICcuLi8uLi9tb2NrJ1xyXG5cclxuY29uc3QgaW5pdFN0YXRlID0ge1xyXG4gIGZpbHRlcnM6IFt7aWQ6ICdmb2lzamRmb2RzZicsIG5hbWU6ICfmiJHnmoTlrrbkuronfSwge2lkOiAnamZvZHNqZm9zZGpmbycsIG5hbWU6ICfmiJHlhbPms6jnmoQnfV0sXHJcbiAgbGlzdDogW10sXHJcbiAgbXNnX2NvdW50OiAwLFxyXG4gIHBob3RvOiAnJyxcclxuICBiZ19pbWFnZTogJycsXHJcbiAgYXZhdGFyOiAnJ1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IGhhbmRsZUFjdGlvbnMoe1xyXG4gIFtGRVRDSF9SRUNPUkRTXSAoc3RhdGUpIHtcclxuICAgIGNvbnNvbGUubG9nKHN0YXRlKVxyXG4gICAgY29uc29sZS5sb2coYXJndW1lbnRzKVxyXG4gICAgcmV0dXJuIHsuLi5zdGF0ZSxcclxuICAgICAgbGlzdDogcmVjb3Jkcy5kYXRhLmxpc3QsXHJcbiAgICAgIG1zZ19jb3VudDogcmVjb3Jkcy5kYXRhLm1zZ19jb3VudCxcclxuICAgICAgcGhvdG86IHJlY29yZHMuZGF0YS5waG90byxcclxuICAgICAgYmdfaW1hZ2U6IHJlY29yZHMuZGF0YS5iZ19pbWFnZSxcclxuICAgICAgYXZhdGFyOiByZWNvcmRzLmRhdGEuYXZhdGFyXHJcbiAgICB9XHJcbiAgfSxcclxuICBbRklMVEVSX1JFQ09SRFNdIChzdGF0ZSwgcGF5bG9hZCkge1xyXG4gICAgcmV0dXJuIHN0YXRlXHJcbiAgfVxyXG59LCBpbml0U3RhdGUpXHJcbiJdfQ==