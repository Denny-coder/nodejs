'use strict'
var express = require('express')
var router = express.Router()
const db = require('../db')

router.post('/course/setCourse', function(req, res) {
  // 对发来的注册数据进行验证
  const major = req.body.major
  const classes = req.body.classes
  const course = req.body.course
  let semester
  let year
  if (new Date().getMonth() + 1 < 9) {
    semester = '2'
    year = new Date().getFullYear() - 1
  } else {
    semester = '1'
    year = new Date().getFullYear()
  }

  if (!major) {
    res.send({ code: 600, msg: '专业 不能为空！' })
    return
  }
  if (!classes) {
    res.send({ code: 600, msg: '班级 不能为空！' })
    return
  }
  db.Course.create(
    {
      year: year, // 学年
      semester: semester, // 学期
      major: major, // 专业
      course: course, // 课表
      classes: classes // 班级
    },
    function(err, doc) {
      if (err) {
        res.send({ code: 504, msg: '保存失败', result: {}})
      } else {
        res.send({ code: 200, msg: '保存成功' })
        return
      }
    }
  )
})
router.post('/course/updateCourse', function(req, res) {
  // 对发来的注册数据进行验证
  const course = req.body.course
  const l_id = req.body.l_id
  if (!l_id) {
    res.send({ code: 600, msg: '更新失败' })
    return
  }
  db.Course.update(
    { _id: l_id },
    {
      $set: {
        course: course // 专业
      }
    },
    function(err, result) {
      if (err) {
        res.send({ code: 504, msg: '修改失败', result: {}})
      }
      res.send({ code: 200, msg: '修改成功', result: {}})
    }
  )
})
router.post('/course/getCourse', function(req, res) {
  // 对发来的注册数据进行验证
  const major = req.body.major
  const classes = req.body.classes
  let semester
  let year
  if (new Date().getMonth() + 1 < 9) {
    semester = '2'
    year = new Date().getFullYear() - 1
  } else {
    semester = '1'
    year = new Date().getFullYear()
  }
  if (!classes) {
    res.send({ code: 405, msg: '班级' })
    return
  }
  if (!major) {
    res.send({ code: 405, msg: '专业' })
    return
  }
  db.Course.findOne(
    { major: major, classes: classes, semester: semester, year: year },
    function(err, doc) {
      if (err) {
        res.send({ code: 700, msg: '查询出错：' + err })
        return
      } else {
        if (doc) {
          res.send({ code: 200, msg: '', result: doc })
          return
        } else {
          res.send({ code: 200, msg: '查询为空', result: [] })
        }
      }
    }
  )
})
module.exports = router
