var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
    res.redirect('/search');
});

module.exports = router;

// exports.test2 = function(req,res){
//     res.send("hello test2");
// }

// exports.test3 = function(req,res){
//     res.send("hello test3");
// // }

// module.exports = function(app){
//     app.get('/',function(req,res){
//         res.send('hello world');
//     });

//     app.use('/search',require('./search'));
// };