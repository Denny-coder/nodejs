'use strict'
var express = require('express')
var router = express.Router()
const db = require('../db')
const token = require('../token/token')

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  // 白名单不验证token
  if (req._parsedUrl.pathname === '/user/login') {
    next()
  } else {
    const tokenCheck = token.checkToken(req.headers['x-token'])
    if (tokenCheck !== 50014 && tokenCheck !== 50008) {
      next()
    } else if (tokenCheck === 50014) {
      res.send({ code: 50014, msg: 'token 已过期' })
    } else if (tokenCheck === 50014) {
      res.send({ code: 50008, msg: 'token 非法' })
    }
  }
})
// 定义网站主页的路由
router.get('/user/login', function(req, res) {
  // 对发来的登录数据进行验证
  if (!req.query.account) {
    res.send({ code: 600, msg: 'account 不能为空！' })
    return
  }
  if (!req.query.pwd) {
    res.send({ code: 600, msg: 'pwd 不能为空！' })
    return
  }
  db.Login.findOne({ account: req.query.account, pwd: req.query.pwd }, function(
    err,
    doc
  ) {
    if (err) {
      res.send({ code: 700, msg: '查询出错：' + err })
      return
    } else {
      if (!doc) {
        res.send({
          code: 700,
          msg: '账号或密码错误'
        })
        return
      } else {
        const setToken = token.createToken({
          account: req.query.account,
          pwd: req.query.pwd
        })
        res.send({
          code: 200,
          msg: '密码正确，登录成功',
          data: {
            token: setToken,
            account: doc.account,
            roles: doc.roles,
            l_id: doc._id
          }
        })
      }
    }
  })
})
// 定义网站主页的路由
router.get('/user/info', function(req, res) {
  const tokenObj = token.decodeToken(req.headers['x-token'])
  const account = tokenObj.payload.data.account
  const pwd = tokenObj.payload.data.pwd
  // 对发来的登录数据进行验证
  db.Login.findOne({ account: account, pwd: pwd }, function(err, doc) {
    if (err) {
      res.send({ code: 700, msg: '查询出错：' + err })
      return
    } else {
      if (!doc) {
        res.send({ code: 700, msg: 'token 验证失败' })
        return
      } else {
        console.log(doc)
        res.send({
          code: 200,
          data: {
            account: doc.account,
            roles: doc.roles,
            classes: doc.classes,
            major: doc.major
          }
        })
      }
    }
  })
})

router.post('/user/register', function(req, res) {
  // 对发来的注册数据进行验证
  const account = req.body.account
  const pwd = req.body.pwd
  const roles = req.body.roles
  const major = req.body.major
  const classes = req.body.classes
  if (!account) {
    res.send({ code: 600, msg: '账号 不能为空！' })
    return
  }
  if (!pwd) {
    res.send({ code: 600, msg: 'pwd 不能为空！' })
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
  // 是否存在账号
  db.Login.findOne({ account: account }, function(err, doc) {
    if (err) {
      res.send({ code: 700, msg: '查询出错：' + err })
      return
    } else {
      if (doc) {
        res.send({ code: 700, msg: '该账号已经被注册：' + account })
        return
      } else {
        db.Login.create(
          {
            roles: roles,
            account: account,
            classes: classes,
            major: major,
            pwd: pwd
          },
          function(err, doc) {
            if (err) {
              res.end('注册失败:' + err)
            } else {
              res.send({
                code: 200,
                msg: '用户注册成功：' + account
              })
              return
            }
          }
        )
      }
    }
  })
  // 返回注册状态
  // res.send(JSON.stringify({code: 200, data: {account: 'guojcres', pass: 111111}}))
})
router.post('/user/changePwd', function(req, res) {
  const originpwd = req.body.originpwd
  const pwd = req.body.pwd
  const _id = req.body._id
  // 对发来的注册数据进行验证
  db.Login.update(
    { _id: _id, pwd: originpwd },
    { $set: { pwd: pwd }},
    function(err, result) {
      console.log(result)
      if (err) {
        console.log(err)
      } else {
        if (result.nModified) {
          res.send({ code: 200, msg: '修改成功', result: {}})
        } else {
          res.send({ code: 405, msg: '原密码错误', result: {}})
        }
      }
    }
  )
})
module.exports = router
