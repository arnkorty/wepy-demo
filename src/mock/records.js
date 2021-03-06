import * as Mock from 'mockjs'
// import 'moc'
const Random = Mock.Random
export default function () {
  return Mock.mock({
    status: 0,
    msg: '',
    data: {
      'msg_count|0-100': 100,
      photo: Random.image(),
      bg_image: '/mock/images/bg_image.jpeg',
      avatar: Random.image(),
      'list|1-10': [function () {
        return {
          recordid: Random.id(),
          usreid: Random.id(),
          age: Random.integer(8, 80),
          'sex': Random.integer(1, 2),
          nickname: Random.cname(),
          ...Mock.mock({'gender|1': ['1', '2']}),
          'birthday': Random.date(),
          'photo': Random.image(),
          ...Mock.mock({'disease|1': ['高血压、高血糖', '贫血、肥胖症', '高血压、高血糖', '肥胖症', '神经衰弱、营养不良']}),
          ...Mock.mock({'follow|1': [true, false]}),
          text: Random.cparagraph(10, 100),
          gps: {'x': Random.float(0, 30), y: Random.float(0, 30)},
          ctime: Random.datetime(),
          timeago: '18分钟前',
          ...Mock.mock({'location|1': ['北京', '上海', '广州']}),
          ...Mock.mock({'data|1-2': [
            {
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
            }
          ]}),
          ...Mock.mock({'hug|1-10': [
            {
              userid: Random.id(),
              'nickname|1': [Random.cname(), Random.cname()],
              photo: Random.image()
            }
          ]}),
          ...Mock.mock({'comment|0-10': [{
            userid: Random.id(),
            'nickname|1': [Random.cname(), Random.cname()],
            'text|1': [Random.ctitle(2, 10), Random.ctitle(2, 40)],
            comttime: Random.datetime()
          }]
          })}
      }]
    }
  })
}
