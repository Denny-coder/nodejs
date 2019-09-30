const mongoose = require('mongoose')

const loginSchema = mongoose.Schema({
  account: String, // 登录账号
  pwd: String, // 密码
  token: String, // token
  major: String, // 专业
  classes: String, // 班级
  roles: { type: Array, default: [] } // 角色
})
const s_infoSchema = mongoose.Schema({
  l_id: String, // 登录id
  fullname: String, // 姓名
  sex: String, // 性别
  age: String, // 年龄
  nation: String, // 民族
  schoolnum: String, // 校号
  major: String, // 专业
  classes: String, // 班级
  phone: String, // 手机号
  email: String, // 邮箱
  idcard: String, // 身份证号
  birthday: String, // 生日
  origin: String, // 籍贯
  f_phone: String, // 父亲手机号
  m_phone: String, // 母亲手机号
  is_edit: { type: String, default: '1' } // 是否可编辑
})
const t_infoSchema = mongoose.Schema({
  l_id: String, // 登录id
  fullname: String, // 姓名
  sex: String, // 性别
  age: String, // 年龄
  nation: String, // 民族
  worknum: String, // 工号
  major: String, // 专业
  classes: String, // 班级
  phone: String, // 手机号
  email: String, // 邮箱
  idcard: String, // 身份证号
  birthday: String, // 生日
  origin: String // 籍贯
})
const enumSchema = mongoose.Schema({
  type: String, // id
  id: String, // id
  name: String
})
const coursechema = mongoose.Schema({
  course: {
    type: Array,
    default: [
      {
        one: '第一、二节',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
      },
      {
        one: '第三、四节',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
      },
      {
        one: '第五、六节',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
      },
      {
        one: '第七、八节',
        two: '',
        three: '',
        four: '',
        five: '',
        six: ''
      }
    ]
  }, // id
  year: String, // 学年
  semester: String, // 学期
  major: String, // id
  classes: String
})
const gradeSchema = mongoose.Schema({
  grade: String, // 成绩
  major: String, // 专业
  fullname: String, // 姓名
  account: String, // 校号
  subject: String, // 科目
  l_id: String, // id
  semester: String, // 学期
  year: String, // 学年
  classes: String // 班级
})
mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:12707/test_nodeVue')
const database = mongoose.connection
database.once('error', function(error) {
  console.log('数据库test_nodeVue连接失败：' + error)
  return
})
database.once('open', function() {
  console.log('数据库test_nodeVue连接成功')
})

const db = {
  Login: mongoose.model('Login', loginSchema),
  S_info: mongoose.model('S_info', s_infoSchema),
  T_info: mongoose.model('T_info', t_infoSchema),
  Enum: mongoose.model('Enum', enumSchema),
  Course: mongoose.model('Course', coursechema),
  Grade: mongoose.model('Grade', gradeSchema)
}

module.exports = db
