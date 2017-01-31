/**
 * Created by BitCamp on 2017-01-23.
 */

var fs = require("fs");

var rules = (function () {

  function baserule(obj , callback) {
    // var adList = fs.createReadStream('/Users/juyoungjung/Downloads/list.csv');
    var input = fs.createReadStream('/Users/juyoungjung/Downloads/rule_example.csv');
    var area = obj.area;
    var age = obj.age;
    var gender = obj.gender;
    var emotion = "happiness";

    console.log(area);
    console.log(age);
    console.log(gender);
    console.log(emotion);

    var csvRows;
    var rulesArr = new Array();
    var adlistRows;
    // var adlistcol;
    var row;

    // adList.on('data' , function (data) {
    //     adlistRows = data.toString('utf8');
    //     row = adlistRows.split('\r\n');
    //     console.log(row);
    //     var adlistcol = row[0].split(',');
    //
    // });

    input.on('data', function (data) {
      csvRows = data.toString('utf8');

      // csv파일 String으로 읽어서, List<Object>에 집어 넣음
      var csvRow = csvRows.split('\r\n');
      var columns = csvRow[0].split(',');

      for (var i = 1; i < csvRow.length - 1; i++) {
        var rule = {};
        var row = csvRow[i].split(',');
        for (var j = 0; j < columns.length; j++) {
          rule[columns[j]] = row[j];
        }
        rulesArr.push(rule);
        // console.log(rule);
      }

      var result = rulesArr.filter(function (v) {
        var flag = true;
        if (area) {
          flag = v['area'] == area || !v['area'] ? flag : false;
        }
        if (gender) {
          flag = v['gender'] == gender || !v['gender'] ? flag : false;
        }
        if (emotion) {
          flag = v['emotion'] == emotion || !v['emotion'] ? flag : false;
        }
        if (age) {
          flag = v['age'] / 10 == age / 10 || !v['age'] ? flag : false;
        }
        return flag;
      });
      console.log("result called....");
      console.log(result[0].ad);





      console.log("result end...");
      callback({data: result, par: area + gender + age + emotion , adno : result[0].ad});
    });
  }








  function kmeansrule(callback) {
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
      // console.log(result);
      callback({rule:result[minrulenum], age:age, emotion:emotion});
    });
  }

  return {baserule : baserule, kmeansrule : kmeansrule};
})();
module.exports = rules;