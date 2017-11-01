var express = require('express');
var router = express.Router();
var fs = require('fs');
var es = require('elasticsearch');

var client = new es.Client({
    host:'localhost:9200'
})

router.get('/',function(req,res){
    filter = req.query;
    if (filter.province != '' && filter.city == '' && filter.type == '')
    {l = [
        {"term": {"province": filter.province}}
    ];}
    if (filter.province != '' && filter.city != '' && filter.type == '')
    {l = [
        {"term": {"city": filter.city}}
    ];}

    client.search({
        index:'news',
        body:{
            "from": 0,
            "size": 30,
            "query": {
                "bool":{
                    "filter":l
                }
            }
        }})
        
        .then(function (body) {
            hits = body.hits.hits;
            res.render('search_database',hits);
        }, function (error) {
            console.trace(error.message);
          });
});

module.exports = router;