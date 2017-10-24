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
          ctime: Random.datetime(),
          timeago: '18分钟前'
        }, Mock.mock({ 'location|1': ['北京', '上海', '广州'] }), Mock.mock({ 'data|1-2': [{
            'type|1': ['blood', 'sugar', 'weight', 'medindex'],
            'value|1': [{
              'value|1': [Random.integer(10, 100), Random.integer(10, 100)],
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
            'nickname|1': [Random.cname(), Random.cname()],
            photo: Random.image()
          }] }), Mock.mock({ 'comment|0-10': [{
            userid: Random.id(),
            'nickname|1': [Random.cname(), Random.cname()],
            'text|1': [Random.ctitle(2, 10), Random.ctitle(2, 40)],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlY29yZHMuanMiXSwibmFtZXMiOlsiTW9jayIsIm1vY2siLCJzdGF0dXMiLCJtc2ciLCJkYXRhIiwicGhvdG8iLCJSYW5kb20iLCJpbWFnZSIsImJnX2ltYWdlIiwiYXZhdGFyIiwicmVjb3JkaWQiLCJpZCIsInVzcmVpZCIsImFnZSIsImludGVnZXIiLCJuaWNrbmFtZSIsImNuYW1lIiwiZGF0ZSIsInRleHQiLCJjcGFyYWdyYXBoIiwiZ3BzIiwiZmxvYXQiLCJ5IiwiY3RpbWUiLCJkYXRldGltZSIsInRpbWVhZ28iLCJyZW1hcmsiLCJibWVzaCIsInJhbmdlIiwibG93Iiwibm9ybWFsIiwic2xpZ2h0IiwibW9kZXJhdGUiLCJzZXZlcmUiLCJ1c2VyaWQiLCJjdGl0bGUiLCJjb210dGltZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7a0JBR2UsWUFBWTtBQUN6QixTQUFPQSxLQUFLQyxJQUFMLENBQVU7QUFDZkMsWUFBUSxDQURPO0FBRWZDLFNBQUssRUFGVTtBQUdmQyxVQUFNO0FBQ0oseUJBQW1CLEdBRGY7QUFFSkMsYUFBT0MsT0FBT0MsS0FBUCxFQUZIO0FBR0pDLGdCQUFVLDRCQUhOO0FBSUpDLGNBQVFILE9BQU9DLEtBQVAsRUFKSjtBQUtKLG1CQUFhLENBQUMsWUFBWTtBQUN4QjtBQUNFRyxvQkFBVUosT0FBT0ssRUFBUCxFQURaO0FBRUVDLGtCQUFRTixPQUFPSyxFQUFQLEVBRlY7QUFHRUUsZUFBS1AsT0FBT1EsT0FBUCxDQUFlLENBQWYsRUFBa0IsRUFBbEIsQ0FIUDtBQUlFLGlCQUFPUixPQUFPUSxPQUFQLENBQWUsQ0FBZixFQUFrQixDQUFsQixDQUpUO0FBS0VDLG9CQUFVVCxPQUFPVSxLQUFQO0FBTFosV0FNS2hCLEtBQUtDLElBQUwsQ0FBVSxFQUFDLFlBQVksQ0FBQyxHQUFELEVBQU0sR0FBTixDQUFiLEVBQVYsQ0FOTDtBQU9FLHNCQUFZSyxPQUFPVyxJQUFQLEVBUGQ7QUFRRSxtQkFBU1gsT0FBT0MsS0FBUDtBQVJYLFdBU0tQLEtBQUtDLElBQUwsQ0FBVSxFQUFDLGFBQWEsQ0FBQyxTQUFELEVBQVksUUFBWixFQUFzQixTQUF0QixFQUFpQyxLQUFqQyxFQUF3QyxXQUF4QyxDQUFkLEVBQVYsQ0FUTCxFQVVLRCxLQUFLQyxJQUFMLENBQVUsRUFBQyxZQUFZLENBQUMsSUFBRCxFQUFPLEtBQVAsQ0FBYixFQUFWLENBVkw7QUFXRWlCLGdCQUFNWixPQUFPYSxVQUFQLENBQWtCLEVBQWxCLEVBQXNCLEdBQXRCLENBWFI7QUFZRUMsZUFBSyxFQUFDLEtBQUtkLE9BQU9lLEtBQVAsQ0FBYSxDQUFiLEVBQWdCLEVBQWhCLENBQU4sRUFBMkJDLEdBQUdoQixPQUFPZSxLQUFQLENBQWEsQ0FBYixFQUFnQixFQUFoQixDQUE5QixFQVpQO0FBYUVFLGlCQUFPakIsT0FBT2tCLFFBQVAsRUFiVDtBQWNFQyxtQkFBUztBQWRYLFdBZUt6QixLQUFLQyxJQUFMLENBQVUsRUFBQyxjQUFjLENBQUMsSUFBRCxFQUFPLElBQVAsRUFBYSxJQUFiLENBQWYsRUFBVixDQWZMLEVBZ0JLRCxLQUFLQyxJQUFMLENBQVUsRUFBQyxZQUFZLENBQ3hCO0FBQ0Usc0JBQVUsQ0FBQyxPQUFELEVBQVUsT0FBVixFQUFtQixRQUFuQixFQUE2QixVQUE3QixDQURaO0FBRUUsdUJBQVcsQ0FBQztBQUNWLHlCQUFXLENBQUNLLE9BQU9RLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLEdBQW5CLENBQUQsRUFBMEJSLE9BQU9RLE9BQVAsQ0FBZSxFQUFmLEVBQW1CLEdBQW5CLENBQTFCLENBREQ7QUFFViwwQkFBWSxDQUFDLEtBQUQsRUFBUSxNQUFSLENBRkY7QUFHVlksc0JBQVFwQixPQUFPYSxVQUFQLENBQWtCLENBQWxCLEVBQXFCLENBQXJCLENBSEU7QUFJVlEscUJBQU8sY0FKRztBQUtWQyxxQkFBTztBQUNMQyxxQkFBSyxDQUFDLENBQUQsRUFBSSxFQUFKLENBREE7QUFFTEMsd0JBQVEsQ0FBQyxFQUFELEVBQUssRUFBTCxDQUZIO0FBR0xDLHdCQUFRLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FISDtBQUlMQywwQkFBVSxDQUFDLEVBQUQsRUFBSyxFQUFMLENBSkw7QUFLTEMsd0JBQVEsQ0FBQyxFQUFELEVBQUssR0FBTDtBQUxIO0FBTEcsYUFBRDtBQUZiLFdBRHdCLENBQWIsRUFBVixDQWhCTCxFQWtDS2pDLEtBQUtDLElBQUwsQ0FBVSxFQUFDLFlBQVksQ0FDeEI7QUFDRWlDLG9CQUFRNUIsT0FBT0ssRUFBUCxFQURWO0FBRUUsMEJBQWMsQ0FBQ0wsT0FBT1UsS0FBUCxFQUFELEVBQWlCVixPQUFPVSxLQUFQLEVBQWpCLENBRmhCO0FBR0VYLG1CQUFPQyxPQUFPQyxLQUFQO0FBSFQsV0FEd0IsQ0FBYixFQUFWLENBbENMLEVBeUNLUCxLQUFLQyxJQUFMLENBQVUsRUFBQyxnQkFBZ0IsQ0FBQztBQUM3QmlDLG9CQUFRNUIsT0FBT0ssRUFBUCxFQURxQjtBQUU3QiwwQkFBYyxDQUFDTCxPQUFPVSxLQUFQLEVBQUQsRUFBaUJWLE9BQU9VLEtBQVAsRUFBakIsQ0FGZTtBQUc3QixzQkFBVSxDQUFDVixPQUFPNkIsTUFBUCxDQUFjLENBQWQsRUFBaUIsRUFBakIsQ0FBRCxFQUF1QjdCLE9BQU82QixNQUFQLENBQWMsQ0FBZCxFQUFpQixFQUFqQixDQUF2QixDQUhtQjtBQUk3QkMsc0JBQVU5QixPQUFPa0IsUUFBUDtBQUptQixXQUFEO0FBQWpCLFNBQVYsQ0F6Q0w7QUFnREQsT0FqRFk7QUFMVDtBQUhTLEdBQVYsQ0FBUDtBQTRERCxDOztBQWhFRDs7SUFBWXhCLEk7Ozs7QUFDWjtBQUNBLElBQU1NLFNBQVNOLEtBQUtNLE1BQXBCIiwiZmlsZSI6InJlY29yZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBNb2NrIGZyb20gJ21vY2tqcydcclxuLy8gaW1wb3J0ICdtb2MnXHJcbmNvbnN0IFJhbmRvbSA9IE1vY2suUmFuZG9tXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gTW9jay5tb2NrKHtcclxuICAgIHN0YXR1czogMCxcclxuICAgIG1zZzogJycsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgICdtc2dfY291bnR8MC0xMDAnOiAxMDAsXHJcbiAgICAgIHBob3RvOiBSYW5kb20uaW1hZ2UoKSxcclxuICAgICAgYmdfaW1hZ2U6ICcvbW9jay9pbWFnZXMvYmdfaW1hZ2UuanBlZycsXHJcbiAgICAgIGF2YXRhcjogUmFuZG9tLmltYWdlKCksXHJcbiAgICAgICdsaXN0fDEtMTAnOiBbZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICByZWNvcmRpZDogUmFuZG9tLmlkKCksXHJcbiAgICAgICAgICB1c3JlaWQ6IFJhbmRvbS5pZCgpLFxyXG4gICAgICAgICAgYWdlOiBSYW5kb20uaW50ZWdlcig4LCA4MCksXHJcbiAgICAgICAgICAnc2V4JzogUmFuZG9tLmludGVnZXIoMSwgMiksXHJcbiAgICAgICAgICBuaWNrbmFtZTogUmFuZG9tLmNuYW1lKCksXHJcbiAgICAgICAgICAuLi5Nb2NrLm1vY2soeydnZW5kZXJ8MSc6IFsnMScsICcyJ119KSxcclxuICAgICAgICAgICdiaXJ0aGRheSc6IFJhbmRvbS5kYXRlKCksXHJcbiAgICAgICAgICAncGhvdG8nOiBSYW5kb20uaW1hZ2UoKSxcclxuICAgICAgICAgIC4uLk1vY2subW9jayh7J2Rpc2Vhc2V8MSc6IFsn6auY6KGA5Y6L44CB6auY6KGA57OWJywgJ+i0q+ihgOOAgeiCpeiDlueXhycsICfpq5jooYDljovjgIHpq5jooYDns5YnLCAn6IKl6IOW55eHJywgJ+elnue7j+ihsOW8seOAgeiQpeWFu+S4jeiJryddfSksXHJcbiAgICAgICAgICAuLi5Nb2NrLm1vY2soeydmb2xsb3d8MSc6IFt0cnVlLCBmYWxzZV19KSxcclxuICAgICAgICAgIHRleHQ6IFJhbmRvbS5jcGFyYWdyYXBoKDEwLCAxMDApLFxyXG4gICAgICAgICAgZ3BzOiB7J3gnOiBSYW5kb20uZmxvYXQoMCwgMzApLCB5OiBSYW5kb20uZmxvYXQoMCwgMzApfSxcclxuICAgICAgICAgIGN0aW1lOiBSYW5kb20uZGF0ZXRpbWUoKSxcclxuICAgICAgICAgIHRpbWVhZ286ICcxOOWIhumSn+WJjScsXHJcbiAgICAgICAgICAuLi5Nb2NrLm1vY2soeydsb2NhdGlvbnwxJzogWyfljJfkuqwnLCAn5LiK5rW3JywgJ+W5v+W3niddfSksXHJcbiAgICAgICAgICAuLi5Nb2NrLm1vY2soeydkYXRhfDEtMic6IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICd0eXBlfDEnOiBbJ2Jsb29kJywgJ3N1Z2FyJywgJ3dlaWdodCcsICdtZWRpbmRleCddLFxyXG4gICAgICAgICAgICAgICd2YWx1ZXwxJzogW3tcclxuICAgICAgICAgICAgICAgICd2YWx1ZXwxJzogW1JhbmRvbS5pbnRlZ2VyKDEwLCAxMDApLCBSYW5kb20uaW50ZWdlcigxMCwgMTAwKV0sXHJcbiAgICAgICAgICAgICAgICAncGFyYXwwLTEnOiBbJzIzNCcsICc1LjM0J10sXHJcbiAgICAgICAgICAgICAgICByZW1hcms6IFJhbmRvbS5jcGFyYWdyYXBoKDMsIDgpLFxyXG4gICAgICAgICAgICAgICAgYm1lc2g6ICdsb2luYy0xMjMyMTMnLFxyXG4gICAgICAgICAgICAgICAgcmFuZ2U6IHtcclxuICAgICAgICAgICAgICAgICAgbG93OiBbMCwgMjBdLFxyXG4gICAgICAgICAgICAgICAgICBub3JtYWw6IFsyMCwgNDBdLFxyXG4gICAgICAgICAgICAgICAgICBzbGlnaHQ6IFs0MCwgNjBdLFxyXG4gICAgICAgICAgICAgICAgICBtb2RlcmF0ZTogWzYwLCA4MF0sXHJcbiAgICAgICAgICAgICAgICAgIHNldmVyZTogWzgwLCAxMDBdXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgfV1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgXX0pLFxyXG4gICAgICAgICAgLi4uTW9jay5tb2NrKHsnaHVnfDEtMTAnOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICB1c2VyaWQ6IFJhbmRvbS5pZCgpLFxyXG4gICAgICAgICAgICAgICduaWNrbmFtZXwxJzogW1JhbmRvbS5jbmFtZSgpLCBSYW5kb20uY25hbWUoKV0sXHJcbiAgICAgICAgICAgICAgcGhvdG86IFJhbmRvbS5pbWFnZSgpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIF19KSxcclxuICAgICAgICAgIC4uLk1vY2subW9jayh7J2NvbW1lbnR8MC0xMCc6IFt7XHJcbiAgICAgICAgICAgIHVzZXJpZDogUmFuZG9tLmlkKCksXHJcbiAgICAgICAgICAgICduaWNrbmFtZXwxJzogW1JhbmRvbS5jbmFtZSgpLCBSYW5kb20uY25hbWUoKV0sXHJcbiAgICAgICAgICAgICd0ZXh0fDEnOiBbUmFuZG9tLmN0aXRsZSgyLCAxMCksIFJhbmRvbS5jdGl0bGUoMiwgNDApXSxcclxuICAgICAgICAgICAgY29tdHRpbWU6IFJhbmRvbS5kYXRldGltZSgpXHJcbiAgICAgICAgICB9XVxyXG4gICAgICAgICAgfSl9XHJcbiAgICAgIH1dXHJcbiAgICB9XHJcbiAgfSlcclxufVxyXG4iXX0=