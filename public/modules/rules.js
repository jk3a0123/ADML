/**
 * Created by BitCamp on 2017-01-23.
 */

var fs = require("fs");

var rules = (function () {

    function baserule(obj, callback) {
        // var input = fs.createReadStream('/Users/juyoungjung/Downloads/rule_example.csv');
        var input = fs.createReadStream('c:/zzz/ad/rule_example.csv');
        var area = obj.area;
        var age = Math.floor(obj.age / 10) * 10;
        var gender = obj.gender;

        var emotion;
        var currkey;
        var currvalue = 0;

        for (key in obj.emotion) {
            if (currvalue < obj.emotion[key]) {
                currkey = key;
                currvalue = obj.emotion[key];
            }
        }
        emotion = currkey;

        var csvRows;
        var rulesArr = new Array();

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
                flag = v['area'] == area || !v['area'] ? flag : false;
                flag = v['gender'] == gender || !v['gender'] ? flag : false;
                flag = v['emotion'] == emotion || !v['emotion'] ? flag : false;
                flag = v['age'] / 10 == age / 10 || !v['age'] ? flag : false;
                return flag;
            });

            console.log(result.length == 0 ? "BASE 룰 없음" : "BASE 룰 있음 = " + result[0].ad);

            callback({data: result[0], par: area + gender + age + emotion});
        });
    }


    function kmeansrule(obj, callback) {
        // var input = fs.createReadStream('/Users/juyoungjung/Downloads/kmeans_example.csv');
        var input = fs.createReadStream('c:/zzz/ad/kmeans_example.csv');
        var gender = obj.gender;
        var age = obj.age;
        var emotion = obj.emotion;
        var area = obj.area;
        var csvRows;
        var rulesArr = new Array();

        // anger, contemp, disgust, fear, happiness, neutral, sadness, surprise
        // nega    nega     nega     nega   posi       null    posi    posi

        var emotionScore = parseFloat(emotion["happiness"]) + parseFloat(emotion["neutral"]) + parseFloat(emotion["surprise"])
            - parseFloat(emotion["anger"]) - parseFloat(emotion["contempt"]) - parseFloat(emotion["disgust"])
            - parseFloat(emotion["fear"]) - parseFloat(emotion["sadness"]);

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
                flag = v['area'] == area || !v['area'] ? flag : false;
                flag = v['gender'] == gender || !v['gender'] ? flag : false;
                return flag;
            });

            function euclidean(x1, y1, x2, y2) {
                return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
            }

            var minval = 100;
            var minrulenum;
            for (var i = 0; i < result.length; i++) {
                var currval = euclidean(result[i]['age'], result[i]['emotion'], age, emotionScore);
                if (minval > currval) {
                    minval = currval;
                    minrulenum = i;
                }
            }
            console.log(!result[minrulenum] ? "KMEANS 룰 없음" : "KMEANS 룰 있음 = " + result[minrulenum].ad);
            callback({data: result[minrulenum], par: area + gender + age});
        });
    }

    function ruleMachines(obj, callback) {
        console.log("== RULE MACHINES RUNNING ==");

        var baseResult = 1;
        var kmeansResult = 1;
        var result;
        var ruleName;
        baserule(obj, function (data) {
            baseResult = data;
        });

        kmeansrule(obj, function (data) {
            kmeansResult = data;
        });

        var interval = setInterval(function () {
            if (baseResult != 1 && kmeansResult != 1) {
                // if (baseResult != null) {
                //     console.log("BASE RULE RETURN");
                //     result = baseResult;
                //     ruleName = "BASE";
                // } else {
                //     console.log("KMEANS RULE RETURN");
                //     result = kmeansResult;
                //     ruleName = "KMEANS";
                // }

                if (Math.random() > 0.5) {
                    console.log("BASE RULE RETURN");
                    result = baseResult;
                    ruleName = "BASE";
                } else {
                    console.log("KMEANS RULE RETURN");
                    result = kmeansResult;
                    ruleName = "KMEANS";
                }

            }
            console.log("MACHINE RESULT : " + result);
            clearInterval(interval);

            callback({result: result, ruleName: ruleName});

        }, 500);

    }

    return {baserule: baserule, kmeansrule: kmeansrule, ruleMachines: ruleMachines};
    // return {ruleMachines:ruleMachines};
})();
module.exports = rules;