var News = require('../lib/mongo').News;
var Tjreports = require('../lib/mongo').Tjreports;
module.exports = {
    //上传资讯
    create: function create(news) {
        return News.create(news).exec();
    },

    //根据objectid 查找资讯
    getNewsById: function getNewsById(newsid){
        return Tjreports
            // .findById(newsid)
            .findOne({_id:newsid})
            // .findOne({title:newsid})
            .exec();
    }
};