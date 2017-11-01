var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect('mongodb://localhost:28001/news');

exports.News = mongolass.model('news',{
    title:{type:'string'},
    author:{type:'string'},
    date:{type:'string'},
    content:{type:'string'},
    attachment:{type:'string'}
})