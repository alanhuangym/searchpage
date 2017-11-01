var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var NewsModel = require('../model/news');

router.get('/',function(req,res,next){
    res.render('upload');
});
;

// 点击上传按钮后
router.post('/',function(req,res,next){
    var title = req.fields.title;
    var author = req.fields.author;
    var date = req.fields.date;
    var content = req.fields.content;
    var attachment = req.files.attachment.path.split(path.sep).pop();
    
    // 校验参数
    try {
        if (!(title.length >= 1 && title.length <= 50)) {
        throw new Error('标题请限制在 1-50 个字符');
        }
    } catch (e) {
        // 注册失败，异步删除上传的头像
        if (req.files.attachment !== undefined){
            fs.unlink(req.files.attachment.path);}
        return res.redirect('/upload');
    }

    // if (req.files.attachment != undefined){
        // console.log(req.files.attachment);
    exec(('java -jar public/tika-app-1.16.jar --text public/attachment/'+attachment),function(error,stdout,stderr){
        if (error !== null){
            console.error('error');
        };

        // console.log(stdout);
        attachmentcontent = stdout;
        // info = {
        //     "title":title,
        //     "author":author,
        //     "date":date,
        //     "content":content,
        //     "attachment":attachmentcontent
        // };
        // res.render('display',info);

        // 待写入mongodb的信息
        var news = {
            title:title,
            author:author,
            date:date,
            content:content,
            attachment:attachmentcontent
        };
        // 写入数据库
        NewsModel.create(news)
            .then(function(result){
                //取插入成功后的值
                var news = result.ops[0];
                // console.log(news);
                // 删除上传的文档
                // fs.unlink(req.files.attachment.path)
                // 重定向至成功上传资讯的页面
                res.redirect('/news/'+news._id);
            })
            .catch(function(e){
                //插入失败的话
                console.log('插入error');
                next(e);
            });
        
    });
    // };


    

    

});

module.exports = router;
