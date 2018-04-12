'use strict'
var express = require('express')
var router = express.Router()
const db = require('../db')
const token = require('../token/token')

// 该路由使用的中间件
router.use(function timeLog(req, res, next) {
  // 白名单不验证token
  if (req._parsedUrl.pathname === '/user/login') {
    console.log(new Date())
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
  if (!req.query.name) {
    res.send({ code: 600, msg: 'name 不能为空！' })
    return
  }
  if (!req.query.pwd) {
    res.send({ code: 600, msg: 'pwd 不能为空！' })
    return
  }
  db.Login.findOne({ name: req.query.name, pwd: req.query.pwd }, function(
    err,
    doc
  ) {
    if (err) {
      res.send({ code: 700, msg: '查询出错：' + err })
      return
    } else {
      if (!doc) {
        res.send({ code: 700, msg: '不存在该用户名：' + req.query.name })
        return
      } else {
        if (req.query.pwd !== doc.pwd) {
          res.send({ code: 700, msg: '密码不正确！' })
          return
        } else {
          console.log(1233)
          const setToken = token.createToken({ name: req.query.name, pwd: req.query.pwd })
          res.send({
            code: 200,
            msg: '密码正确，登录成功',
            data: {
              token: setToken,
              name: doc.name,
              roles: doc.roles,
              l_id: doc._id
            }
          })
          return
        }
      }
    }
  })
})
// 定义网站主页的路由
router.get('/user/info', function(req, res) {
  const tokenObj = token.decodeToken(req.headers['x-token'])
  const name = tokenObj.payload.data.name
  const pwd = tokenObj.payload.data.pwd
  // 对发来的登录数据进行验证
  db.Login.findOne({ name: name, pwd: pwd }, function(err, doc) {
    if (err) {
      res.send({ code: 700, msg: '查询出错：' + err })
      return
    } else {
      if (!doc) {
        res.send({ code: 700, msg: 'token 验证失败' })
        return
      } else {
        res.send({
          code: 200,
          data: {
            name: doc.name,
            roles: doc.roles
          }
        })
      }
    }
  })
})

// 定义 about 页面的路由
router.post('/user/register', function(req, res) {
  // 对发来的注册数据进行验证
  const name = req.body.name
  const pwd = req.body.pwd
  const roles = req.body.pwd
  if (!name) {
    res.send({ code: 600, msg: 'name 不能为空！' })
    return
  }
  if (!pwd) {
    res.send({ code: 600, msg: 'pwd 不能为空！' })
    return
  }
  // 查询数据库验证注册账号、密码
  // 是否存在账号
  db.Login.findOne({ name: req.body.name }, function(err, doc) {
    if (err) {
      res.send({ code: 700, msg: '查询出错：' + err })
      return
    } else {
      if (doc) {
        res.send({ code: 700, msg: '该用户名名已经被注册：' + name })
        return
      } else {
        db.Login.create(
          {
            roles: roles,
            name: name,
            pwd: pwd
          },
          function(err, doc) {
            if (err) {
              res.end('注册失败:' + err)
            } else {
              res.send({ code: 200, msg: '用户注册成功：' + name })
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

module.exports = router
