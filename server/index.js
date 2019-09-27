const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
// const cors = require('cors')
// const api = require('./api')
var login = require('./login/login')
var upload = require('./upload/upload')
var enumeration = require('./enum/enum')
var t_info = require('./teach/t_info')
var t_list = require('./teach/t_list')
var s_list = require('./student/s_list')
var s_info = require('./student/s_info')
var course = require('./course/course')
var grade = require('./grade/grade')
// var session = require('express-session')
// app.all('*', function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
//   res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
//   res.header('X-Powered-By', ' 3.2.1')
//   res.header('Content-Type', 'application/json;charset=utf-8')
//   next()
// })
// 引入处理post数据的模块
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// app.use(cors)
// 登录页
// app.use('/login', api)
// app.use('/api', birds)
app.use(login) // 登录信息
app.use(enumeration) // 枚举
app.use(s_info) // 获取学生信息
app.use(s_list) // 获取学生列表
app.use(t_info) // 获取老师信息
app.use(t_list) // 获取老师列表
app.use(course) // 课程
app.use(grade) // 成绩
app.use(upload) // 上传
// app.use(
//   session({
//     secret: 'zhengke',
//     resave: false,
//     saveUninitialized: true,
//     rolling: 1000 * 60 * 30,
//     cookie: { maxAge: 1000 * 60 * 30 }
//   })
// )
app.use(express.static(path.resolve(__dirname, './public')))
// app.get('*', function (req, res) {
//   const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
//   res.send(html)
// })
app.listen(8008)
console.log('success listen…………')
