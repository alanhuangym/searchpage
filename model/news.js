var News = require('../lib/mongo').News;

module.exports = {
    //上传资讯
    create: function create(news) {
        return News.create(news).exec();
    },

    //根据objectid 查找资讯
    getNewsById: function getNewsById(newsid){
        return News
            // .findById(newsid)
            .findOne({_id:newsid})
            // .findOne({title:newsid})
            .exec();
    }
};