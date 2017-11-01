var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var NewsModel = require('../model/news');


router.get('/:newsid',function(req,res){
    var newsid = req.params.newsid;
    // console.log(newsid);
    NewsModel.getNewsById(newsid)
        .then(function(result){
            var news = result;
            if (!news){
                throw new Error('资讯不存在');
            }
            // console.log(news);
            res.render('news',{news:news});
        
        })
        // .catch(function(e){
        //     console.log('查找error');
        //     next(e);
        // })
        ;

});

module.exports = router;
