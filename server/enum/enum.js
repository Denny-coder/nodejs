'use strict'
var express = require('express')
var router = express.Router()
const db = require('../db')

router.post('/enum/major', function(req, res) {
  console.log(req.body.type)
  // 对发来的注册数据进行验证
  db.Enum.find({ type: req.body.type }, function(err, doc) {
    if (err) {
      console.log('查询出错：' + err)
      res.send({ code: 700, msg: '查询出错：' + err })
      return
    } else {
      if (doc) {
        res.send({ code: 200, result: doc })
        return
      } else {
        res.send({ code: 504, msg: '服务异常' })
        return
      }
    }
  })
})

module.exports = router
