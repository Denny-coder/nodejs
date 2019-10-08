'use strict'
var express = require('express')
var router = express.Router()
const fs = require('fs')
const path = require('path')
var formidable = require("formidable");
router.post('/upload', function (req, res) {
    const listenNumber = req.headers.referer//.match(/\d+/)[0];
    var form = new formidable.IncomingForm();//既处理表单，又处理文件上传
    //设置文件上传文件夹/路径，__dirname是一个常量，为当前路径
    let uploadDir = path.resolve(__dirname, "../public");
    form.uploadDir = uploadDir;//本地文件夹目录路径
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        let oldPath = files.file.path;//这里的路径是图片的本地路径
        const fileName = files.file.name
        let newPath = path.join(path.dirname(oldPath), fileName);
        //这里我传回一个下载此图片的Url
        var downUrl = listenNumber + "server/public/" + fileName;//这里是想传回图片的链接
        fs.rename(oldPath, newPath, () => {//fs.rename重命名图片名称
            res.send({ code: 50008, msg: { downUrl,fields, files } })
        })
    })
})
router.post('/upload/bigFile', function (req, res) {
    const listenNumber = req.headers.referer//.match(/\d+/)[0];
    var form = new formidable.IncomingForm();//既处理表单，又处理文件上传
    //设置文件上传文件夹/路径，__dirname是一个常量，为当前路径
    let uploadDir = path.resolve(__dirname, "../public");
    form.uploadDir = uploadDir;//本地文件夹目录路径
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        console.log(err, fields, files)
        // let oldPath = files.file.path;//这里的路径是图片的本地路径
        // const fileName = files.file.name
        // let newPath = path.join(path.dirname(oldPath), fileName);
        // //这里我传回一个下载此图片的Url
        // var downUrl = listenNumber + "server/public/" + fileName;//这里是想传回图片的链接
        // fs.rename(oldPath, newPath, () => {//fs.rename重命名图片名称
            res.send({ code: 50008, msg: { } })
            // res.send({ code: 50008, msg: { downUrl,fields, files } })
        // })
    })
})
module.exports = router
