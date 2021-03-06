'use strict'
var express = require('express')
var router = express.Router()
const db = require('../db')

router.post('/list/getTeach', function(req, res) {
  var limit = req.body.pageSize
  var currentPage = req.body.pageNum
  const major = req.body.major
  const classes = req.body.classes
  const t_name = req.body.t_name
  const worknum = req.body.worknum
  if (!limit) {
    res.send({ code: 405, msg: '页数 不能为空' })
    return
  }
  if (!currentPage) {
    res.send({ code: 405, msg: '页长 不能为空' })
    return
  }
  if (currentPage < 1) {
    currentPage = 1
  }
  db.T_info.find().exec(function(err, rs) {
    if (err) {
      res.send(err)
    } else {
      var totalPage = Math.floor(rs.length / limit)
      if (rs.length % limit !== 0) {
        totalPage += 1
      }
      if (currentPage > totalPage) {
        currentPage = 1
      }
      var queryFilter = {}
      if (major) {
        queryFilter.major = major
      }
      if (classes) {
        queryFilter.classes = classes
      }
      if (t_name) {
        queryFilter.fullname = t_name
      }
      if (worknum) {
        queryFilter.worknum = worknum
      }
      // var totalCount = 0
      var query = db.T_info.find(queryFilter)
      query.skip((currentPage - 1) * limit)
      query.limit(limit)
      query.exec(function(error, result) {
        if (error) {
          res.send(error)
        } else {
          db.T_info.find(queryFilter, function(err, doc) {
            if (err) {
            } else {
              const jsonArray = {
                code: 200,
                totalCount: doc.length,
                result: result
              }
              res.json(jsonArray)
            }
          })
        }
      })
    }
  })
})
router.post('/list/delTeach', function(req, res) {
  const l_id = req.body.l_id
  db.T_info.deleteOne({ l_id: l_id }, function(err, doc) {
    if (err) {
      res.send({ code: 700, msg: '删除失败：' + err })
      return
    } else {
      db.Login.deleteOne({ _id: l_id }, function(err, doc) {
        if (err) {
          res.send({ code: 700, msg: '删除失败：' + err })
          return
        } else {
          res.send({
            code: 200,
            msg: '删除成功',
            result: {}
          })
        }
      })
    }
  })
})

module.exports = router
