/**
 * Created by BitCamp on 2017-01-23.
 */

var express = require('express');
var fs = require("fs");
var router = express.Router();
var rules = require("../public/modules/rules.js");
var fileIO = require("../public/modules/fileio.js");
var ajaxMD = require("../public/modules/node.to.backend.js");

router.get('/rule', function(req, res) {
    //req.query.area
    var obj = {"area" : "KJ" , "gender" : req.query.gender , "age" : req.query.age , "emotion" : req.query.firstemotion};
    rules.baserule(obj  , function (result) {
        console.log(result.data[0]);
        console.log("............");
        console.log(result.par);
        res.writeHead(206 , {"Accept-Ranges" : "bytes" , "Content-Type" : "video/mp4" });
        fileIO.adVideoRead( result.data[0].ad ,function (result) {
            result.on("open" , function () {
                result.pipe(res);
            });
        });
    });
});

router.get('/kmeans', function(req, res) {
  var input = fs.createReadStream('c:/zzz/kmeans_example.csv');
  var gender = req.query.gender;
  var age = req.query.age;
  var emotion = req.query.emotion;
  var area = req.query.area;
  var csvRows;
  var rulesArr = new Array();

  console.log(gender);
  console.log(age);
  console.log(area);
  console.log(emotion);

  input.on('data', function (data) {
    csvRows = data.toString('utf8');

    // csv파일 String으로 읽어서, List<Object>에 집어 넣음
    var csvRow = csvRows.split('\r\n');
    var columns = csvRow[0].split(',');

    for( var i=1; i < csvRow.length - 1; i++){
      var rule = {};
      var row = csvRow[i].split(',');
      for(var j=0; j < columns.length; j++){
        rule[columns[j]] = row[j];
      }
      rulesArr.push(rule);
      // console.log(rule);
    }

    var result = rulesArr.filter(function (v) {
      var flag = true;
      if (area){
        flag = v['area'] == area || !v['area'] ? flag : false;
      }
      if (gender){
        flag = v['gender'] == gender || !v['gender'] ? flag : false;
      }
      return flag;
    });

    for(var i = 0 ; i < result.length ; i++ ){
      console.log("RESULT : " + result[i]);
    }

    function euclidean(x1, y1, x2, y2) {
      return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    }

    var minval = 100;
    var minrulenum;
    for(var i = 0 ; i < result.length ; i ++){
      var currval = euclidean(result[i]['age'], result[i]['emotion'], age, emotion);
      console.log("CURRVAL : " + currval);
      if (minval > currval){
        minval = currval;
        minrulenum = i;
      }
    }
    console.log("RULES : " + result[minrulenum]);
    console.log(result[minrulenum]);

    res.send({rule:result[minrulenum], age:age, emotion:emotion});
  });
});

module.exports = router;