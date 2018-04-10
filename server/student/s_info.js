'use strict'
var express = require('express')
var router = express.Router()
const db = require('../db')

router.post('/info/setInfo', function(req, res) {
  // 对发来的注册数据进行验证
  const l_id = req.body.l_id
  const fullname = req.body.fullname
  const sex = req.body.sex
  const nation = req.body.nation
  const age = req.body.age
  const schoolnum = req.body.schoolnum
  const major = req.body.major
  const classes = req.body.classes
  const phone = req.body.phone
  const email = req.body.email
  const idcard = req.body.idcard
  const birthday = req.body.birthday
  const origin = req.body.origin
  const f_phone = req.body.f_phone
  const m_phone = req.body.m_phone
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
  if (!schoolnum) {
    res.send({ code: 600, msg: '校号 不能为空！' })
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
    res.send({ code: 600, msg: 'pwd 不能为空！' })
    return
  }
  if (!origin) {
    res.send({ code: 600, msg: '籍贯 不能为空！' })
    return
  }
  db.S_info.findOne({ l_id: l_id }, function(err, doc) {
    if (err) {
      res.send({ code: 700, msg: '查询出错：' + err })
      return
    } else {
      if (doc) {
        res.send({ code: 700, msg: '该用户已填写个人信息，请勿重复填写！' })
        return
      } else {
        db.S_info.create(
          {
            l_id: l_id, // 登录id
            fullname: fullname, // 姓名
            sex: sex, // 性别
            age: age, // 年龄
            nation: nation, // 年龄
            schoolnum: schoolnum, // 校号
            major: major, // 专业
            classes: classes, // 班级
            phone: phone, // 手机号
            email: email, // 邮箱
            idcard: idcard, // 身份证号
            birthday: birthday, // 生日
            origin: origin, // 籍贯
            f_phone: f_phone, // 父亲手机号
            m_phone: m_phone // 母亲手机号
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
router.post('/info/getInfo', function(req, res) {
  // 对发来的注册数据进行验证
  const l_id = req.body.l_id
  db.S_info.findOne({ l_id: l_id }, function(err, doc) {
    if (err) {
      res.send({ code: 700, msg: '查询出错：' + err })
      return
    } else {
      if (doc) {
        res.send({
          code: 200,
          msg: '',
          result: {
            fullname: doc.fullname, // 姓名
            sex: doc.sex, // 性别
            age: doc.age, // 年龄
            nation: doc.nation, // 年龄
            schoolnum: doc.schoolnum, // 校号
            major: doc.major, // 专业
            classes: doc.classes, // 班级
            phone: doc.phone, // 手机号
            email: doc.email, // 邮箱
            idcard: doc.idcard, // 身份证号
            birthday: doc.birthday, // 生日
            origin: doc.origin, // 籍贯
            f_phone: doc.f_phone, // 父亲手机号
            m_phone: doc.m_phone, // 母亲手机号
            is_edit: doc.is_edit, // 母亲手机号
            has: 1 // 是否填写
          }
        })
        return
      } else {
        res.send({ code: 200, msg: '', has: 0, result: {}}) //
      }
    }
  })
})
router.post('/info/changeEdit', function(req, res) {
  // 对发来的注册数据进行验证
  const ids = req.body.ids
  const is_edit = req.body.is_edit
  for (const key of ids) {
    db.S_info.update({ l_id: key }, { $set: { is_edit: is_edit }}, function(
      err,
      result
    ) {
      if (err) {
        console.log(err)
      }
      console.log(result)
    })
  }
  res.send({ code: 200, msg: '修改成功', result: {}})
})
router.post('/info/updateStuInfo', function(req, res) {
  // 对发来的注册数据进行验证
  const l_id = req.body.l_id
  const fullname = req.body.fullname
  const sex = req.body.sex
  const nation = req.body.nation
  const age = req.body.age
  const schoolnum = req.body.schoolnum
  const major = req.body.major
  const classes = req.body.classes
  const phone = req.body.phone
  const email = req.body.email
  const idcard = req.body.idcard
  const birthday = req.body.birthday
  const origin = req.body.origin
  const f_phone = req.body.f_phone
  const m_phone = req.body.m_phone
  if (!l_id) {
    res.send({ code: 600, msg: '用户 ID 不能为空' })
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
  if (!schoolnum) {
    res.send({ code: 600, msg: '校号 不能为空！' })
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
    res.send({ code: 600, msg: 'pwd 不能为空！' })
    return
  }
  if (!origin) {
    res.send({ code: 600, msg: '籍贯 不能为空！' })
    return
  }
  db.S_info.update(
    { l_id: l_id },
    {
      $set: {
        fullname: fullname, // 姓名
        sex: sex, // 性别
        age: age, // 年龄
        nation: nation, // 年龄
        schoolnum: schoolnum, // 校号
        major: major, // 专业
        classes: classes, // 班级
        phone: phone, // 手机号
        email: email, // 邮箱
        idcard: idcard, // 身份证号
        birthday: birthday, // 生日
        origin: origin, // 籍贯
        f_phone: f_phone, // 父亲手机号
        m_phone: m_phone // 母亲手机号
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

module.exports = router
