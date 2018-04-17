'use strict'
var express = require('express')
var router = express.Router()
const db = require('../db')

router.post('/grade/addGrade', function(req, res) {
  // 对发来的注册数据进行验证
  const major = req.body.major
  const classes = req.body.classes
  const grade = req.body.grade
  const account = req.body.account
  const fullname = req.body.fullname
  const subject = req.body.subject
  const year = req.body.year
  const semester = req.body.semester
  const l_id = req.body.l_id
  if (!major) {
    res.send({ code: 600, msg: '专业 不能为空！' })
    return
  }
  if (!l_id) {
    res.send({ code: 600, msg: '主键ID 不能为空！' })
    return
  }
  if (!classes) {
    res.send({ code: 600, msg: '班级 不能为空！' })
    return
  }
  if (!account) {
    res.send({ code: 600, msg: '校号 不能为空！' })
    return
  }
  if (!subject) {
    res.send({ code: 600, msg: '科目 不能为空！' })
    return
  }
  if (!grade) {
    res.send({ code: 600, msg: '成绩 不能为空！' })
    return
  }

  db.Grade.create(
    {
      year: year, // 学年
      semester: semester, // 学期
      major: major, // 专业
      account: account, // 校号
      fullname: fullname, // 姓名
      grade: grade, // 成绩
      subject: subject, // 成绩
      l_id: l_id, // 成绩
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
router.post('/grade/updateGrade', function(req, res) {
  // 对发来的注册数据进行验证
  const subject = req.body.subject
  const grade = req.body.grade
  const _id = req.body._id
  if (!_id) {
    res.send({ code: 600, msg: '更新失败' })
    return
  }
  db.Grade.update(
    { _id: _id },
    {
      $set: {
        grade: grade, // 分数
        subject: subject // 科目
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
router.post('/grade/getGrade', function(req, res) {
  // 对发来的注册数据进行验证
  const l_id = req.body.l_id
  if (!l_id) {
    res.send({ code: 600, msg: '缺少必要参数' })
    return
  }
  db.Grade.find({ l_id: l_id }, function(err, doc) {
    if (err) {
      res.send({ code: 700, msg: '查询出错：' + err })
      return
    } else {
      console.log(doc)
      if (doc) {
        res.send({ code: 200, msg: '', result: doc })
        return
      } else {
        res.send({ code: 200, msg: '查询为空', result: [] })
      }
    }
  })
})
router.post('/grade/delGrade', function(req, res) {
  // 对发来的注册数据进行验证
  const _id = req.body._id
  if (!_id) {
    res.send({ code: 600, msg: 'id 不能为空' })
    return
  }
  db.Grade.deleteOne({ _id: _id }, function(err, result) {
    if (err) {
      res.send({ code: 504, msg: '删除失败', result: {}})
    }
    res.send({ code: 200, msg: '删除成功', result: {}})
  })
})
module.exports = router
