const express = require('express')
const app = express()
// const cors = require('cors')
// const api = require('./api')
var login = require('./login/login')
var enumeration = require('./enum/enum')
var t_info = require('./teach/t_info')
var t_list = require('./teach/t_list')
var s_list = require('./student/s_list')
var s_info = require('./student/s_info')
var course = require('./course/course')
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
// app.use(api)
// console.log(api)
// console.log(birds)
// api(app)

app.listen(8088)
console.log('success listen…………')
