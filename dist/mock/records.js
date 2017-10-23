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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZHMuanMiXSwibmFtZXMiOlsiTW9jayIsIm1vY2siLCJzdGF0dXMiLCJtc2ciLCJkYXRhIiwicGhvdG8iLCJSYW5kb20iLCJpbWFnZSIsImJnX2ltYWdlIiwiYXZhdGFyIiwicmVjb3JkaWQiLCJpZCIsInVzcmVpZCIsIm5pY2tuYW1lIiwiY25hbWUiLCJkYXRlIiwidGV4dCIsImNwYXJhZ3JhcGgiLCJncHMiLCJmbG9hdCIsInkiLCJjdGltZSIsImRhdGV0aW1lIiwidmFsdWUiLCJpbnRlZ2VyIiwicmVtYXJrIiwiYm1lc2giLCJyYW5nZSIsImxvdyIsIm5vcm1hbCIsInNsaWdodCIsIm1vZGVyYXRlIiwic2V2ZXJlIiwidXNlcmlkIiwiY29tdHRpbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O2tCQUdlLFlBQVk7QUFDekIsU0FBT0EsS0FBS0MsSUFBTCxDQUFVO0FBQ2ZDLFlBQVEsQ0FETztBQUVmQyxTQUFLLEVBRlU7QUFHZkMsVUFBTTtBQUNKLHlCQUFtQixHQURmO0FBRUpDLGFBQU9DLE9BQU9DLEtBQVAsRUFGSDtBQUdKQyxnQkFBVSw0QkFITjtBQUlKQyxjQUFRSCxPQUFPQyxLQUFQLEVBSko7QUFLSixtQkFBYSxDQUFDLFlBQVk7QUFDeEI7QUFDRUcsb0JBQVVKLE9BQU9LLEVBQVAsRUFEWjtBQUVFQyxrQkFBUU4sT0FBT0ssRUFBUCxFQUZWO0FBR0VFLG9CQUFVUCxPQUFPUSxLQUFQO0FBSFosV0FJS2QsS0FBS0MsSUFBTCxDQUFVLEVBQUMsWUFBWSxDQUFDLEdBQUQsRUFBTSxHQUFOLENBQWIsRUFBVixDQUpMO0FBS0Usc0JBQVlLLE9BQU9TLElBQVAsRUFMZDtBQU1FLG1CQUFTVCxPQUFPQyxLQUFQO0FBTlgsV0FPS1AsS0FBS0MsSUFBTCxDQUFVLEVBQUMsYUFBYSxDQUFDLFNBQUQsRUFBWSxRQUFaLEVBQXNCLFNBQXRCLEVBQWlDLEtBQWpDLEVBQXdDLFdBQXhDLENBQWQsRUFBVixDQVBMLEVBUUtELEtBQUtDLElBQUwsQ0FBVSxFQUFDLFlBQVksQ0FBQyxJQUFELEVBQU8sS0FBUCxDQUFiLEVBQVYsQ0FSTDtBQVNFZSxnQkFBTVYsT0FBT1csVUFBUCxDQUFrQixFQUFsQixFQUFzQixHQUF0QixDQVRSO0FBVUVDLGVBQUssRUFBQyxLQUFLWixPQUFPYSxLQUFQLENBQWEsQ0FBYixFQUFnQixFQUFoQixDQUFOLEVBQTJCQyxHQUFHZCxPQUFPYSxLQUFQLENBQWEsQ0FBYixFQUFnQixFQUFoQixDQUE5QixFQVZQO0FBV0VFLGlCQUFPZixPQUFPZ0IsUUFBUDtBQVhULFdBWUt0QixLQUFLQyxJQUFMLENBQVUsRUFBQyxZQUFZLENBQ3hCO0FBQ0Usc0JBQVUsQ0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQixRQUFuQixFQUE2QixVQUE3QixDQURaO0FBRUUsdUJBQVcsQ0FBQztBQUNWc0IscUJBQU9qQixPQUFPa0IsT0FBUCxDQUFlLEVBQWYsRUFBbUIsR0FBbkIsQ0FERztBQUVWLDBCQUFZLENBQUMsS0FBRCxFQUFRLE1BQVIsQ0FGRjtBQUdWQyxzQkFBUW5CLE9BQU9XLFVBQVAsQ0FBa0IsQ0FBbEIsRUFBcUIsQ0FBckIsQ0FIRTtBQUlWUyxxQkFBTyxjQUpHO0FBS1ZDLHFCQUFPO0FBQ0xDLHFCQUFLLENBQUMsQ0FBRCxFQUFJLEVBQUosQ0FEQTtBQUVMQyx3QkFBUSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBRkg7QUFHTEMsd0JBQVEsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUhIO0FBSUxDLDBCQUFVLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FKTDtBQUtMQyx3QkFBUSxDQUFDLEVBQUQsRUFBSyxHQUFMO0FBTEg7QUFMRyxhQUFEO0FBRmIsV0FEd0IsQ0FBYixFQUFWLENBWkwsRUE4QktoQyxLQUFLQyxJQUFMLENBQVUsRUFBQyxZQUFZLENBQ3hCO0FBQ0VnQyxvQkFBUTNCLE9BQU9LLEVBQVAsRUFEVjtBQUVFLHdCQUFZTCxPQUFPUSxLQUFQO0FBRmQsV0FEd0IsQ0FBYixFQUFWLENBOUJMLEVBb0NLZCxLQUFLQyxJQUFMLENBQVUsRUFBQyxnQkFBZ0IsQ0FBQztBQUM3QmdDLG9CQUFRM0IsT0FBT0ssRUFBUCxFQURxQjtBQUU3QkUsc0JBQVVQLE9BQU9RLEtBQVAsRUFGbUI7QUFHN0JFLGtCQUFNVixPQUFPVyxVQUFQLENBQWtCLENBQWxCLEVBQXFCLEVBQXJCLENBSHVCO0FBSTdCaUIsc0JBQVU1QixPQUFPZ0IsUUFBUDtBQUptQixXQUFEO0FBQWpCLFNBQVYsQ0FwQ0w7QUEyQ0QsT0E1Q1k7QUFMVDtBQUhTLEdBQVYsQ0FBUDtBQXVERCxDOztBQTNERDs7SUFBWXRCLEk7Ozs7QUFDWjtBQUNBLElBQU1NLFNBQVNOLEtBQUtNLE1BQXBCIiwiZmlsZSI6InJlY29yZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNb2NrIGZyb20gJ21vY2tqcydcbi8vIGltcG9ydCAnbW9jJ1xuY29uc3QgUmFuZG9tID0gTW9jay5SYW5kb21cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIE1vY2subW9jayh7XG4gICAgc3RhdHVzOiAwLFxuICAgIG1zZzogJycsXG4gICAgZGF0YToge1xuICAgICAgJ21zZ19jb3VudHwwLTEwMCc6IDEwMCxcbiAgICAgIHBob3RvOiBSYW5kb20uaW1hZ2UoKSxcbiAgICAgIGJnX2ltYWdlOiAnL21vY2svaW1hZ2VzL2JnX2ltYWdlLmpwZWcnLFxuICAgICAgYXZhdGFyOiBSYW5kb20uaW1hZ2UoKSxcbiAgICAgICdsaXN0fDEtMTAnOiBbZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJlY29yZGlkOiBSYW5kb20uaWQoKSxcbiAgICAgICAgICB1c3JlaWQ6IFJhbmRvbS5pZCgpLFxuICAgICAgICAgIG5pY2tuYW1lOiBSYW5kb20uY25hbWUoKSxcbiAgICAgICAgICAuLi5Nb2NrLm1vY2soeydnZW5kZXJ8MSc6IFsnMScsICcyJ119KSxcbiAgICAgICAgICAnYmlydGhkYXknOiBSYW5kb20uZGF0ZSgpLFxuICAgICAgICAgICdwaG90byc6IFJhbmRvbS5pbWFnZSgpLFxuICAgICAgICAgIC4uLk1vY2subW9jayh7J2Rpc2Vhc2V8MSc6IFsn6auY6KGA5Y6L44CB6auY6KGA57OWJywgJ+i0q+ihgOOAgeiCpeiDlueXhycsICfpq5jooYDljovjgIHpq5jooYDns5YnLCAn6IKl6IOW55eHJywgJ+elnue7j+ihsOW8seOAgeiQpeWFu+S4jeiJryddfSksXG4gICAgICAgICAgLi4uTW9jay5tb2NrKHsnZm9sbG93fDEnOiBbdHJ1ZSwgZmFsc2VdfSksXG4gICAgICAgICAgdGV4dDogUmFuZG9tLmNwYXJhZ3JhcGgoMTAsIDEwMCksXG4gICAgICAgICAgZ3BzOiB7J3gnOiBSYW5kb20uZmxvYXQoMCwgMzApLCB5OiBSYW5kb20uZmxvYXQoMCwgMzApfSxcbiAgICAgICAgICBjdGltZTogUmFuZG9tLmRhdGV0aW1lKCksXG4gICAgICAgICAgLi4uTW9jay5tb2NrKHsnZGF0YXwxLTMnOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICd0eXBlfDEnOiBbJ2Jsb29kJywgJ3N1Z2FyJywgJ3dlaWdodCcsICdtZWRpbmRleCddLFxuICAgICAgICAgICAgICAndmFsdWV8MSc6IFt7XG4gICAgICAgICAgICAgICAgdmFsdWU6IFJhbmRvbS5pbnRlZ2VyKDEwLCAxMDApLFxuICAgICAgICAgICAgICAgICdwYXJhfDAtMSc6IFsnMjM0JywgJzUuMzQnXSxcbiAgICAgICAgICAgICAgICByZW1hcms6IFJhbmRvbS5jcGFyYWdyYXBoKDMsIDgpLFxuICAgICAgICAgICAgICAgIGJtZXNoOiAnbG9pbmMtMTIzMjEzJyxcbiAgICAgICAgICAgICAgICByYW5nZToge1xuICAgICAgICAgICAgICAgICAgbG93OiBbMCwgMjBdLFxuICAgICAgICAgICAgICAgICAgbm9ybWFsOiBbMjAsIDQwXSxcbiAgICAgICAgICAgICAgICAgIHNsaWdodDogWzQwLCA2MF0sXG4gICAgICAgICAgICAgICAgICBtb2RlcmF0ZTogWzYwLCA4MF0sXG4gICAgICAgICAgICAgICAgICBzZXZlcmU6IFs4MCwgMTAwXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICBdfSksXG4gICAgICAgICAgLi4uTW9jay5tb2NrKHsnaHVnfDEtMTAnOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHVzZXJpZDogUmFuZG9tLmlkKCksXG4gICAgICAgICAgICAgICduaWNrbmFtZSc6IFJhbmRvbS5jbmFtZSgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXX0pLFxuICAgICAgICAgIC4uLk1vY2subW9jayh7J2NvbW1lbnR8MC0xMCc6IFt7XG4gICAgICAgICAgICB1c2VyaWQ6IFJhbmRvbS5pZCgpLFxuICAgICAgICAgICAgbmlja25hbWU6IFJhbmRvbS5jbmFtZSgpLFxuICAgICAgICAgICAgdGV4dDogUmFuZG9tLmNwYXJhZ3JhcGgoMiwgNDApLFxuICAgICAgICAgICAgY29tdHRpbWU6IFJhbmRvbS5kYXRldGltZSgpXG4gICAgICAgICAgfV1cbiAgICAgICAgICB9KX1cbiAgICAgIH1dXG4gICAgfVxuICB9KVxufVxuIl19