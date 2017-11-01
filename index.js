var express = require('express');
var app = express();
var path = require('path');
var indexRouter = require('./router/index');
var searchRouter = require('./router/search');
var uploadRouter = require('./router/upload');
var newsRouter = require('./router/news');
var reportsRouter = require('./router/reports');
var search_databaseRouter = require('./router/search_database');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//设置静态文件目录
app.use(express.static(path.join(__dirname,'public')));

//处理表单及文件上传的中间件
app.use(require('express-formidable')({
	uploadDir: path.join(__dirname,'public/attachment'), //上传文件目录
	keepExtensions: true //保留后缀
}));

app.use('/',indexRouter);
app.use('/search',searchRouter);
app.use('/upload',uploadRouter);
app.use('/news',newsRouter);
app.use('/search_reports',reportsRouter);
app.use('/search_database',search_databaseRouter);

app.listen(3000);