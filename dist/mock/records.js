'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function () {
  return Mock.mock({
    status: 0,
    msg: '',
    data: {
      'msg_count|0-100': 100,
      photo: Random.image(),
      bg_image: '/mock/images/bg_image.jpeg',
      avatar: Random.image(),
      'list|1-10': [function () {
        return _extends({
          recordid: Random.id(),
          usreid: Random.id(),
          age: Random.integer(8, 80),
          'sex': Random.integer(1, 2),
          nickname: Random.cname()
        }, Mock.mock({ 'gender|1': ['1', '2'] }), {
          'birthday': Random.date(),
          'photo': Random.image()
        }, Mock.mock({ 'disease|1': ['高血压、高血糖', '贫血、肥胖症', '高血压、高血糖', '肥胖症', '神经衰弱、营养不良'] }), Mock.mock({ 'follow|1': [true, false] }), {
          text: Random.cparagraph(10, 100),
          gps: { 'x': Random.float(0, 30), y: Random.float(0, 30) },
          ctime: Random.datetime()
        }, Mock.mock({ 'data|1-3': [{
            'type|1': ['blood', 'sugar', 'weight', 'medindex'],
            'value|1': [{
              value: Random.integer(10, 100),
              'para|0-1': ['234', '5.34'],
              remark: Random.cparagraph(3, 8),
              bmesh: 'loinc-123213',
              range: {
                low: [0, 20],
                normal: [20, 40],
                slight: [40, 60],
                moderate: [60, 80],
                severe: [80, 100]
              }
            }]
          }] }), Mock.mock({ 'hug|1-10': [{
            userid: Random.id(),
            'nickname': Random.cname()
          }] }), Mock.mock({ 'comment|0-10': [{
            userid: Random.id(),
            nickname: Random.cname(),
            text: Random.cparagraph(2, 40),
            comttime: Random.datetime()
          }]
        }));
      }]
    }
  });
};

var _mockjs = require('./../npm/mockjs/dist/mock.js');

var Mock = _interopRequireWildcard(_mockjs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// import 'moc'
var Random = Mock.Random;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZHMuanMiXSwibmFtZXMiOlsiTW9jayIsIm1vY2siLCJzdGF0dXMiLCJtc2ciLCJkYXRhIiwicGhvdG8iLCJSYW5kb20iLCJpbWFnZSIsImJnX2ltYWdlIiwiYXZhdGFyIiwicmVjb3JkaWQiLCJpZCIsInVzcmVpZCIsImFnZSIsImludGVnZXIiLCJuaWNrbmFtZSIsImNuYW1lIiwiZGF0ZSIsInRleHQiLCJjcGFyYWdyYXBoIiwiZ3BzIiwiZmxvYXQiLCJ5IiwiY3RpbWUiLCJkYXRldGltZSIsInZhbHVlIiwicmVtYXJrIiwiYm1lc2giLCJyYW5nZSIsImxvdyIsIm5vcm1hbCIsInNsaWdodCIsIm1vZGVyYXRlIiwic2V2ZXJlIiwidXNlcmlkIiwiY29tdHRpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUdlLFlBQVk7QUFDekIsU0FBT0EsS0FBS0MsSUFBTCxDQUFVO0FBQ2ZDLFlBQVEsQ0FETztBQUVmQyxTQUFLLEVBRlU7QUFHZkMsVUFBTTtBQUNKLHlCQUFtQixHQURmO0FBRUpDLGFBQU9DLE9BQU9DLEtBQVAsRUFGSDtBQUdKQyxnQkFBVSw0QkFITjtBQUlKQyxjQUFRSCxPQUFPQyxLQUFQLEVBSko7QUFLSixtQkFBYSxDQUFDLFlBQVk7QUFDeEI7QUFDRUcsb0JBQVVKLE9BQU9LLEVBQVAsRUFEWjtBQUVFQyxrQkFBUU4sT0FBT0ssRUFBUCxFQUZWO0FBR0VFLGVBQUtQLE9BQU9RLE9BQVAsQ0FBZSxDQUFmLEVBQWtCLEVBQWxCLENBSFA7QUFJRSxpQkFBT1IsT0FBT1EsT0FBUCxDQUFlLENBQWYsRUFBa0IsQ0FBbEIsQ0FKVDtBQUtFQyxvQkFBVVQsT0FBT1UsS0FBUDtBQUxaLFdBTUtoQixLQUFLQyxJQUFMLENBQVUsRUFBQyxZQUFZLENBQUMsR0FBRCxFQUFNLEdBQU4sQ0FBYixFQUFWLENBTkw7QUFPRSxzQkFBWUssT0FBT1csSUFBUCxFQVBkO0FBUUUsbUJBQVNYLE9BQU9DLEtBQVA7QUFSWCxXQVNLUCxLQUFLQyxJQUFMLENBQVUsRUFBQyxhQUFhLENBQUMsU0FBRCxFQUFZLFFBQVosRUFBc0IsU0FBdEIsRUFBaUMsS0FBakMsRUFBd0MsV0FBeEMsQ0FBZCxFQUFWLENBVEwsRUFVS0QsS0FBS0MsSUFBTCxDQUFVLEVBQUMsWUFBWSxDQUFDLElBQUQsRUFBTyxLQUFQLENBQWIsRUFBVixDQVZMO0FBV0VpQixnQkFBTVosT0FBT2EsVUFBUCxDQUFrQixFQUFsQixFQUFzQixHQUF0QixDQVhSO0FBWUVDLGVBQUssRUFBQyxLQUFLZCxPQUFPZSxLQUFQLENBQWEsQ0FBYixFQUFnQixFQUFoQixDQUFOLEVBQTJCQyxHQUFHaEIsT0FBT2UsS0FBUCxDQUFhLENBQWIsRUFBZ0IsRUFBaEIsQ0FBOUIsRUFaUDtBQWFFRSxpQkFBT2pCLE9BQU9rQixRQUFQO0FBYlQsV0FjS3hCLEtBQUtDLElBQUwsQ0FBVSxFQUFDLFlBQVksQ0FDeEI7QUFDRSxzQkFBVSxDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLFFBQW5CLEVBQTZCLFVBQTdCLENBRFo7QUFFRSx1QkFBVyxDQUFDO0FBQ1Z3QixxQkFBT25CLE9BQU9RLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLEdBQW5CLENBREc7QUFFViwwQkFBWSxDQUFDLEtBQUQsRUFBUSxNQUFSLENBRkY7QUFHVlksc0JBQVFwQixPQUFPYSxVQUFQLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLENBSEU7QUFJVlEscUJBQU8sY0FKRztBQUtWQyxxQkFBTztBQUNMQyxxQkFBSyxDQUFDLENBQUQsRUFBSSxFQUFKLENBREE7QUFFTEMsd0JBQVEsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUZIO0FBR0xDLHdCQUFRLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FISDtBQUlMQywwQkFBVSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBSkw7QUFLTEMsd0JBQVEsQ0FBQyxFQUFELEVBQUssR0FBTDtBQUxIO0FBTEcsYUFBRDtBQUZiLFdBRHdCLENBQWIsRUFBVixDQWRMLEVBZ0NLakMsS0FBS0MsSUFBTCxDQUFVLEVBQUMsWUFBWSxDQUN4QjtBQUNFaUMsb0JBQVE1QixPQUFPSyxFQUFQLEVBRFY7QUFFRSx3QkFBWUwsT0FBT1UsS0FBUDtBQUZkLFdBRHdCLENBQWIsRUFBVixDQWhDTCxFQXNDS2hCLEtBQUtDLElBQUwsQ0FBVSxFQUFDLGdCQUFnQixDQUFDO0FBQzdCaUMsb0JBQVE1QixPQUFPSyxFQUFQLEVBRHFCO0FBRTdCSSxzQkFBVVQsT0FBT1UsS0FBUCxFQUZtQjtBQUc3QkUsa0JBQU1aLE9BQU9hLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsRUFBckIsQ0FIdUI7QUFJN0JnQixzQkFBVTdCLE9BQU9rQixRQUFQO0FBSm1CLFdBQUQ7QUFBakIsU0FBVixDQXRDTDtBQTZDRCxPQTlDWTtBQUxUO0FBSFMsR0FBVixDQUFQO0FBeURELEM7O0FBN0REOztJQUFZeEIsSTs7OztBQUNaO0FBQ0EsSUFBTU0sU0FBU04sS0FBS00sTUFBcEIiLCJmaWxlIjoicmVjb3Jkcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIE1vY2sgZnJvbSAnbW9ja2pzJ1xuLy8gaW1wb3J0ICdtb2MnXG5jb25zdCBSYW5kb20gPSBNb2NrLlJhbmRvbVxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKCkge1xuICByZXR1cm4gTW9jay5tb2NrKHtcbiAgICBzdGF0dXM6IDAsXG4gICAgbXNnOiAnJyxcbiAgICBkYXRhOiB7XG4gICAgICAnbXNnX2NvdW50fDAtMTAwJzogMTAwLFxuICAgICAgcGhvdG86IFJhbmRvbS5pbWFnZSgpLFxuICAgICAgYmdfaW1hZ2U6ICcvbW9jay9pbWFnZXMvYmdfaW1hZ2UuanBlZycsXG4gICAgICBhdmF0YXI6IFJhbmRvbS5pbWFnZSgpLFxuICAgICAgJ2xpc3R8MS0xMCc6IFtmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmVjb3JkaWQ6IFJhbmRvbS5pZCgpLFxuICAgICAgICAgIHVzcmVpZDogUmFuZG9tLmlkKCksXG4gICAgICAgICAgYWdlOiBSYW5kb20uaW50ZWdlcig4LCA4MCksXG4gICAgICAgICAgJ3NleCc6IFJhbmRvbS5pbnRlZ2VyKDEsIDIpLFxuICAgICAgICAgIG5pY2tuYW1lOiBSYW5kb20uY25hbWUoKSxcbiAgICAgICAgICAuLi5Nb2NrLm1vY2soeydnZW5kZXJ8MSc6IFsnMScsICcyJ119KSxcbiAgICAgICAgICAnYmlydGhkYXknOiBSYW5kb20uZGF0ZSgpLFxuICAgICAgICAgICdwaG90byc6IFJhbmRvbS5pbWFnZSgpLFxuICAgICAgICAgIC4uLk1vY2subW9jayh7J2Rpc2Vhc2V8MSc6IFsn6auY6KGA5Y6L44CB6auY6KGA57OWJywgJ+i0q+ihgOOAgeiCpeiDlueXhycsICfpq5jooYDljovjgIHpq5jooYDns5YnLCAn6IKl6IOW55eHJywgJ+elnue7j+ihsOW8seOAgeiQpeWFu+S4jeiJryddfSksXG4gICAgICAgICAgLi4uTW9jay5tb2NrKHsnZm9sbG93fDEnOiBbdHJ1ZSwgZmFsc2VdfSksXG4gICAgICAgICAgdGV4dDogUmFuZG9tLmNwYXJhZ3JhcGgoMTAsIDEwMCksXG4gICAgICAgICAgZ3BzOiB7J3gnOiBSYW5kb20uZmxvYXQoMCwgMzApLCB5OiBSYW5kb20uZmxvYXQoMCwgMzApfSxcbiAgICAgICAgICBjdGltZTogUmFuZG9tLmRhdGV0aW1lKCksXG4gICAgICAgICAgLi4uTW9jay5tb2NrKHsnZGF0YXwxLTMnOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICd0eXBlfDEnOiBbJ2Jsb29kJywgJ3N1Z2FyJywgJ3dlaWdodCcsICdtZWRpbmRleCddLFxuICAgICAgICAgICAgICAndmFsdWV8MSc6IFt7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFJhbmRvbS5pbnRlZ2VyKDEwLCAxMDApLFxuICAgICAgICAgICAgICAgICdwYXJhfDAtMSc6IFsnMjM0JywgJzUuMzQnXSxcbiAgICAgICAgICAgICAgICByZW1hcms6IFJhbmRvbS5jcGFyYWdyYXBoKDMsIDgpLFxuICAgICAgICAgICAgICAgIGJtZXNoOiAnbG9pbmMtMTIzMjEzJyxcbiAgICAgICAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgICAgICAgbG93OiBbMCwgMjBdLFxuICAgICAgICAgICAgICAgICAgbm9ybWFsOiBbMjAsIDQwXSxcbiAgICAgICAgICAgICAgICAgIHNsaWdodDogWzQwLCA2MF0sXG4gICAgICAgICAgICAgICAgICBtb2RlcmF0ZTogWzYwLCA4MF0sXG4gICAgICAgICAgICAgICAgICBzZXZlcmU6IFs4MCwgMTAwXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdfSksXG4gICAgICAgICAgLi4uTW9jay5tb2NrKHsnaHVnfDEtMTAnOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHVzZXJpZDogUmFuZG9tLmlkKCksXG4gICAgICAgICAgICAgICduaWNrbmFtZSc6IFJhbmRvbS5jbmFtZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXX0pLFxuICAgICAgICAgIC4uLk1vY2subW9jayh7J2NvbW1lbnR8MC0xMCc6IFt7XG4gICAgICAgICAgICB1c2VyaWQ6IFJhbmRvbS5pZCgpLFxuICAgICAgICAgICAgbmlja25hbWU6IFJhbmRvbS5jbmFtZSgpLFxuICAgICAgICAgICAgdGV4dDogUmFuZG9tLmNwYXJhZ3JhcGgoMiwgNDApLFxuICAgICAgICAgICAgY29tdHRpbWU6IFJhbmRvbS5kYXRldGltZSgpXG4gICAgICAgICAgfV1cbiAgICAgICAgICB9KX1cbiAgICAgIH1dXG4gICAgfVxuICB9KVxufVxuIl19