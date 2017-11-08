var Mongolass = require('mongolass');
var mongolass = new Mongolass();
mongolass.connect('mongodb://10.20.39.19:28001/news');

exports.News = mongolass.model('news',{
    title:{type:'string'},
    author:{type:'string'},
    date:{type:'string'},
    content:{type:'string'},
    attachment:{type:'string'}
})

exports.Tjreports = mongolass.model('tj_reports',{
    province:{type:'string'},
    city:{type:'string'},
    create_date:{type:'string'},
    attachment:{type:'array'},    
    report_type:{type:'string'},
    title:{type:'string'},
    url:{type:'string'},
    content:{type:'string'},
    attachment_content:{type:'string'},
    year:{type:'string'},
})