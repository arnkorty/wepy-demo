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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZHMuanMiXSwibmFtZXMiOlsiTW9jayIsIm1vY2siLCJzdGF0dXMiLCJtc2ciLCJkYXRhIiwicGhvdG8iLCJSYW5kb20iLCJpbWFnZSIsImJnX2ltYWdlIiwiYXZhdGFyIiwicmVjb3JkaWQiLCJpZCIsInVzcmVpZCIsIm5pY2tuYW1lIiwiY25hbWUiLCJkYXRlIiwidGV4dCIsImNwYXJhZ3JhcGgiLCJncHMiLCJmbG9hdCIsInkiLCJjdGltZSIsImRhdGV0aW1lIiwidmFsdWUiLCJpbnRlZ2VyIiwicmVtYXJrIiwiYm1lc2giLCJyYW5nZSIsImxvdyIsIm5vcm1hbCIsInNsaWdodCIsIm1vZGVyYXRlIiwic2V2ZXJlIiwidXNlcmlkIiwiY29tdHRpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUdlLFlBQVk7QUFDekIsU0FBT0EsS0FBS0MsSUFBTCxDQUFVO0FBQ2ZDLFlBQVEsQ0FETztBQUVmQyxTQUFLLEVBRlU7QUFHZkMsVUFBTTtBQUNKLHlCQUFtQixHQURmO0FBRUpDLGFBQU9DLE9BQU9DLEtBQVAsRUFGSDtBQUdKQyxnQkFBVSw0QkFITjtBQUlKQyxjQUFRSCxPQUFPQyxLQUFQLEVBSko7QUFLSixtQkFBYSxDQUFDLFlBQVk7QUFDeEI7QUFDRUcsb0JBQVVKLE9BQU9LLEVBQVAsRUFEWjtBQUVFQyxrQkFBUU4sT0FBT0ssRUFBUCxFQUZWO0FBR0VFLG9CQUFVUCxPQUFPUSxLQUFQO0FBSFosV0FJS2QsS0FBS0MsSUFBTCxDQUFVLEVBQUMsWUFBWSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWIsRUFBVixDQUpMO0FBS0Usc0JBQVlLLE9BQU9TLElBQVAsRUFMZDtBQU1FLG1CQUFTVCxPQUFPQyxLQUFQO0FBTlgsV0FPS1AsS0FBS0MsSUFBTCxDQUFVLEVBQUMsYUFBYSxDQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXNCLFNBQXRCLEVBQWlDLEtBQWpDLEVBQXdDLFdBQXhDLENBQWQsRUFBVixDQVBMLEVBUUtELEtBQUtDLElBQUwsQ0FBVSxFQUFDLFlBQVksQ0FBQyxJQUFELEVBQU8sS0FBUCxDQUFiLEVBQVYsQ0FSTDtBQVNFZSxnQkFBTVYsT0FBT1csVUFBUCxDQUFrQixFQUFsQixFQUFzQixHQUF0QixDQVRSO0FBVUVDLGVBQUssRUFBQyxLQUFLWixPQUFPYSxLQUFQLENBQWEsQ0FBYixFQUFnQixFQUFoQixDQUFOLEVBQTJCQyxHQUFHZCxPQUFPYSxLQUFQLENBQWEsQ0FBYixFQUFnQixFQUFoQixDQUE5QixFQVZQO0FBV0VFLGlCQUFPZixPQUFPZ0IsUUFBUDtBQVhULFdBWUt0QixLQUFLQyxJQUFMLENBQVUsRUFBQyxZQUFZLENBQ3hCO0FBQ0Usc0JBQVUsQ0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQixRQUFuQixFQUE2QixVQUE3QixDQURaO0FBRUUsdUJBQVcsQ0FBQztBQUNWc0IscUJBQU9qQixPQUFPa0IsT0FBUCxDQUFlLEVBQWYsRUFBbUIsR0FBbkIsQ0FERztBQUVWLDBCQUFZLENBQUMsS0FBRCxFQUFRLE1BQVIsQ0FGRjtBQUdWQyxzQkFBUW5CLE9BQU9XLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsQ0FIRTtBQUlWUyxxQkFBTyxjQUpHO0FBS1ZDLHFCQUFPO0FBQ0xDLHFCQUFLLENBQUMsQ0FBRCxFQUFJLEVBQUosQ0FEQTtBQUVMQyx3QkFBUSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBRkg7QUFHTEMsd0JBQVEsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUhIO0FBSUxDLDBCQUFVLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FKTDtBQUtMQyx3QkFBUSxDQUFDLEVBQUQsRUFBSyxHQUFMO0FBTEg7QUFMRyxhQUFEO0FBRmIsV0FEd0IsQ0FBYixFQUFWLENBWkwsRUE4QktoQyxLQUFLQyxJQUFMLENBQVUsRUFBQyxZQUFZLENBQ3hCO0FBQ0VnQyxvQkFBUTNCLE9BQU9LLEVBQVAsRUFEVjtBQUVFLHdCQUFZTCxPQUFPUSxLQUFQO0FBRmQsV0FEd0IsQ0FBYixFQUFWLENBOUJMLEVBb0NLZCxLQUFLQyxJQUFMLENBQVUsRUFBQyxnQkFBZ0IsQ0FBQztBQUM3QmdDLG9CQUFRM0IsT0FBT0ssRUFBUCxFQURxQjtBQUU3QkUsc0JBQVVQLE9BQU9RLEtBQVAsRUFGbUI7QUFHN0JFLGtCQUFNVixPQUFPVyxVQUFQLENBQWtCLENBQWxCLEVBQXFCLEVBQXJCLENBSHVCO0FBSTdCaUIsc0JBQVU1QixPQUFPZ0IsUUFBUDtBQUptQixXQUFEO0FBQWpCLFNBQVYsQ0FwQ0w7QUEyQ0QsT0E1Q1k7QUFMVDtBQUhTLEdBQVYsQ0FBUDtBQXVERCxDOztBQTNERDs7SUFBWXRCLEk7Ozs7QUFDWjtBQUNBLElBQU1NLFNBQVNOLEtBQUtNLE1BQXBCIiwiZmlsZSI6InJlY29yZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNb2NrIGZyb20gJ21vY2tqcydcclxuLy8gaW1wb3J0ICdtb2MnXHJcbmNvbnN0IFJhbmRvbSA9IE1vY2suUmFuZG9tXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gTW9jay5tb2NrKHtcclxuICAgIHN0YXR1czogMCxcclxuICAgIG1zZzogJycsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICdtc2dfY291bnR8MC0xMDAnOiAxMDAsXHJcbiAgICAgIHBob3RvOiBSYW5kb20uaW1hZ2UoKSxcclxuICAgICAgYmdfaW1hZ2U6ICcvbW9jay9pbWFnZXMvYmdfaW1hZ2UuanBlZycsXHJcbiAgICAgIGF2YXRhcjogUmFuZG9tLmltYWdlKCksXHJcbiAgICAgICdsaXN0fDEtMTAnOiBbZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICByZWNvcmRpZDogUmFuZG9tLmlkKCksXHJcbiAgICAgICAgICB1c3JlaWQ6IFJhbmRvbS5pZCgpLFxyXG4gICAgICAgICAgbmlja25hbWU6IFJhbmRvbS5jbmFtZSgpLFxyXG4gICAgICAgICAgLi4uTW9jay5tb2NrKHsnZ2VuZGVyfDEnOiBbJzEnLCAnMiddfSksXHJcbiAgICAgICAgICAnYmlydGhkYXknOiBSYW5kb20uZGF0ZSgpLFxyXG4gICAgICAgICAgJ3Bob3RvJzogUmFuZG9tLmltYWdlKCksXHJcbiAgICAgICAgICAuLi5Nb2NrLm1vY2soeydkaXNlYXNlfDEnOiBbJ+mrmOihgOWOi+OAgemrmOihgOezlicsICfotKvooYDjgIHogqXog5bnl4cnLCAn6auY6KGA5Y6L44CB6auY6KGA57OWJywgJ+iCpeiDlueXhycsICfnpZ7nu4/oobDlvLHjgIHokKXlhbvkuI3oia8nXX0pLFxyXG4gICAgICAgICAgLi4uTW9jay5tb2NrKHsnZm9sbG93fDEnOiBbdHJ1ZSwgZmFsc2VdfSksXHJcbiAgICAgICAgICB0ZXh0OiBSYW5kb20uY3BhcmFncmFwaCgxMCwgMTAwKSxcclxuICAgICAgICAgIGdwczogeyd4JzogUmFuZG9tLmZsb2F0KDAsIDMwKSwgeTogUmFuZG9tLmZsb2F0KDAsIDMwKX0sXHJcbiAgICAgICAgICBjdGltZTogUmFuZG9tLmRhdGV0aW1lKCksXHJcbiAgICAgICAgICAuLi5Nb2NrLm1vY2soeydkYXRhfDEtMyc6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICd0eXBlfDEnOiBbJ2Jsb29kJywgJ3N1Z2FyJywgJ3dlaWdodCcsICdtZWRpbmRleCddLFxyXG4gICAgICAgICAgICAgICd2YWx1ZXwxJzogW3tcclxuICAgICAgICAgICAgICAgIHZhbHVlOiBSYW5kb20uaW50ZWdlcigxMCwgMTAwKSxcclxuICAgICAgICAgICAgICAgICdwYXJhfDAtMSc6IFsnMjM0JywgJzUuMzQnXSxcclxuICAgICAgICAgICAgICAgIHJlbWFyazogUmFuZG9tLmNwYXJhZ3JhcGgoMywgOCksXHJcbiAgICAgICAgICAgICAgICBibWVzaDogJ2xvaW5jLTEyMzIxMycsXHJcbiAgICAgICAgICAgICAgICByYW5nZToge1xyXG4gICAgICAgICAgICAgICAgICBsb3c6IFswLCAyMF0sXHJcbiAgICAgICAgICAgICAgICAgIG5vcm1hbDogWzIwLCA0MF0sXHJcbiAgICAgICAgICAgICAgICAgIHNsaWdodDogWzQwLCA2MF0sXHJcbiAgICAgICAgICAgICAgICAgIG1vZGVyYXRlOiBbNjAsIDgwXSxcclxuICAgICAgICAgICAgICAgICAgc2V2ZXJlOiBbODAsIDEwMF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICBdfSksXHJcbiAgICAgICAgICAuLi5Nb2NrLm1vY2soeydodWd8MS0xMCc6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIHVzZXJpZDogUmFuZG9tLmlkKCksXHJcbiAgICAgICAgICAgICAgJ25pY2tuYW1lJzogUmFuZG9tLmNuYW1lKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXX0pLFxyXG4gICAgICAgICAgLi4uTW9jay5tb2NrKHsnY29tbWVudHwwLTEwJzogW3tcclxuICAgICAgICAgICAgdXNlcmlkOiBSYW5kb20uaWQoKSxcclxuICAgICAgICAgICAgbmlja25hbWU6IFJhbmRvbS5jbmFtZSgpLFxyXG4gICAgICAgICAgICB0ZXh0OiBSYW5kb20uY3BhcmFncmFwaCgyLCA0MCksXHJcbiAgICAgICAgICAgIGNvbXR0aW1lOiBSYW5kb20uZGF0ZXRpbWUoKVxyXG4gICAgICAgICAgfV1cclxuICAgICAgICAgIH0pfVxyXG4gICAgICB9XVxyXG4gICAgfVxyXG4gIH0pXHJcbn1cclxuIl19