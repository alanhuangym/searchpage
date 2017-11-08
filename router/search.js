var express = require('express');
var router = express.Router();
var fs = require('fs');
var es = require('elasticsearch');

var client = new es.Client({
    host:'10.20.39.19:9200'
})

str = fs.readFileSync('public/files/top_search.txt', 'utf8');
top_search = (str.split('\n'));

router.get('/',function(req,res){
    var search = req.query.q;
    
    if (search == undefined)
    {
        // 渲染正常搜索首页
        res.render('search',top_search);
    }
    else
    //否则进行搜索
    {
        // 调用ES进行搜索
        client.search({
            index:'news',
            body:{
                "from": 0,
                "size": 10,
                "highlight": {
                  "pre_tags": ["<font color=\"red\">"],
                  "post_tags": ["</font>"],
                  "fields": {
                    "content": {},
                    "title": {},
                    "attachment_content":{}
                  }
                }, 
                "query": {
                  "function_score": {
                    "query": {
                      "bool": {
                    "should": [
                      {"match": {
                        "title": {
                          "query": search,
                          "boost":2,
                          "operator": "and"
                        }
                      }},
                      {"match": {
                        "content": {
                          "query": search,
                          "boost":2,
                          "operator": "and"
                        }
                      }},
                      {"match": {
                        "attachment_content": {
                          "query": search,
                          "boost":1,
                          "operator": "and"
                        }
                      }}
                    ]
                    // "minimum_should_match": 1 
                  }
                }
              }
            }
        }
          }).then(function (body) {
            // hits = body.hits.hits;
            data = {
                "body":body,
                "search":search
            }
            res.render('result',data);
          }, function (error) {
            console.trace(error.message);
          });
        
        // 将用户的搜索记录放入mongodb

    }

    
});

router.post('/',function(req,res){
    var search = req.fields.search;
    res.redirect('/search?q='+search);
});

module.exports = router;