'use strict'
var express = require('express')
var router = express.Router()
const db = require('../db')

router.post('/list/getstudent', function(req, res) {
  var limit = req.body.pageSize
  var currentPage = req.body.pageNum
  const major = req.body.major
  const classes = req.body.classes
  const s_name = req.body.s_name
  const schoolnum = req.body.schoolnum
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
  db.S_info.find().exec(function(err, rs) {
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
      if (s_name) {
        queryFilter.fullname = s_name
      }
      if (schoolnum) {
        queryFilter.schoolnum = schoolnum
      }
      // var totalCount = 0
      var query = db.S_info.find(queryFilter)
      query.skip((currentPage - 1) * limit)
      query.limit(limit)
      query.exec(function(error, result) {
        if (error) {
          res.send(error)
        } else {
          db.S_info.find(queryFilter, function(err, doc) {
            if (err) {
              console.log(err)
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

module.exports = router
