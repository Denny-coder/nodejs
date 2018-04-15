'use strict'
var express = require('express')
var router = express.Router()
const db = require('../db')

router.post('/info/setTeachInfo', function(req, res) {
  const l_id = req.body.l_id
  const fullname = req.body.fullname
  const sex = req.body.sex
  const nation = req.body.nation
  const age = req.body.age
  const worknum = req.body.worknum
  const major = req.body.major
  const classes = req.body.classes
  const phone = req.body.phone
  const email = req.body.email
  const idcard = req.body.idcard
  const birthday = req.body.birthday
  const origin = req.body.origin
  if (!l_id) {
    res.send({ code: 600, msg: '不存在此用户，保存失败' })
    return
  }
  if (!fullname) {
    res.send({ code: 600, msg: '姓名 不能为空！' })
    return
  }
  if (!sex) {
    res.send({ code: 600, msg: '性别 不能为空！' })
    return
  }
  if (!age) {
    res.send({ code: 600, msg: '年龄 不能为空！' })
    return
  }
  if (!nation) {
    res.send({ code: 600, msg: '民族 不能为空！' })
    return
  }
  if (!worknum) {
    res.send({ code: 600, msg: '工号 不能为空！' })
    return
  }
  if (!major) {
    res.send({ code: 600, msg: '专业 不能为空！' })
    return
  }
  if (!classes) {
    res.send({ code: 600, msg: '班级 不能为空！' })
    return
  }
  if (!phone) {
    res.send({ code: 600, msg: '手机号 不能为空！' })
    return
  }
  if (!email) {
    res.send({ code: 600, msg: '邮箱 不能为空！' })
    return
  }
  if (!idcard) {
    res.send({ code: 600, msg: '身份证号 不能为空！' })
    return
  }
  if (!birthday) {
    res.send({ code: 600, msg: '生日 不能为空！' })
    return
  }
  if (!origin) {
    res.send({ code: 600, msg: '籍贯 不能为空！' })
    return
  }
  db.T_info.findOne({ l_id: l_id }, function(err, doc) {
    if (err) {
      res.send({ code: 700, msg: '查询出错：' + err })
      return
    } else {
      if (doc) {
        db.T_info.update(
          { l_id: l_id },
          {
            $set: {
              fullname: fullname, // 姓名
              sex: sex, // 性别
              age: age, // 年龄
              nation: nation, // 年龄
              worknum: worknum, // 校号
              major: major, // 专业
              classes: classes, // 班级
              phone: phone, // 手机号
              email: email, // 邮箱
              idcard: idcard, // 身份证号
              birthday: birthday, // 生日
              origin: origin // 籍贯
            }
          },
          function(err, result) {
            if (err) {
              res.send({ code: 700, msg: '编辑失败' })
            } else {
              res.send({
                code: 200,
                msg: '编辑成功'
              })
            }
          }
        )
        return
      } else {
        db.T_info.create(
          {
            l_id: l_id, // 登录id
            fullname: fullname, // 姓名
            sex: sex, // 性别
            age: age, // 年龄
            nation: nation, // 年龄
            worknum: worknum, // 校号
            major: major, // 专业
            classes: classes, // 班级
            phone: phone, // 手机号
            email: email, // 邮箱
            idcard: idcard, // 身份证号
            birthday: birthday, // 生日
            origin: origin // 籍贯
          },
          function(err, doc) {
            if (err) {
              res.end('保存失败:' + err)
            } else {
              res.send({ code: 200, msg: '保存成功' })
              return
            }
          }
        )
      }
    }
  })
})
router.post('/info/getTeachInfo', function(req, res) {
  const l_id = req.body.l_id
  db.Login.findOne({ _id: l_id }, function(error, response) {
    if (error) {
      res.send({ code: 700, msg: '查询出错：' + error })
    } else {
      if (response) {
        db.T_info.findOne({ l_id: l_id }, function(err, doc) {
          if (err) {
            res.send({ code: 700, msg: '查询出错：' + err })
            return
          } else {
            if (doc) {
              res.send({
                code: 200,
                msg: '',
                result: {
                  l_id: doc.l_id, // 登录id
                  fullname: doc.fullname, // 姓名
                  sex: doc.sex, // 性别
                  age: doc.age, // 年龄
                  nation: doc.nation, // 民族
                  worknum: doc.worknum, // 工号
                  major: doc.major, // 专业
                  classes: doc.classes, // 班级
                  phone: doc.phone, // 手机号
                  email: doc.email, // 邮箱
                  idcard: doc.idcard, // 身份证号
                  birthday: doc.birthday, // 生日
                  has: '1', // 是否填写
                  origin: doc.origin // 籍贯
                }
              })
              return
            } else {
              res.send({
                code: 200,
                msg: '',
                result: {
                  worknum: response.account, // 工号
                  major: response.major, // 专业
                  classes: response.classes, // 班级
                  is_edit: '0', // 母亲手机号
                  has: '0' // 是否填写
                }
              })
            }
          }
        })
      } else {
        res.send({ code: 200, msg: '查询为空', result: {}})
      }
    }
  })
})
router.post('/info/getTeachType', function(req, res) {
  const l_id = req.body.l_id
  db.Login.findOne({ _id: l_id }, function(err, doc) {
    if (err) {
      res.send({ code: 700, msg: '查询出错：' + err })
      return
    } else {
      if (doc) {
        res.send({
          code: 200,
          msg: '',
          result: {
            major: doc.major, // 专业
            classes: doc.classes // 班级
          }
        })
        return
      } else {
        res.send({ code: 200, msg: '', result: {}}) //
      }
    }
  })
})
module.exports = router
