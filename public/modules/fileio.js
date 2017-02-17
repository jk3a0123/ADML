/**
 * Created by juyoungjung on 2017. 1. 18..
 */

var fs = require("fs");
var util = require("util");
var mime = require("mime");

var fileIO = (function () {

    var adName = null;
    var ruleName = null;

    function setAdNameRuleName(obj) {
        adName = obj.adName;
        ruleName = obj.ruleName;
    }

    // function localLogRead(callback) {
    //     // var input = fs.createReadStream("/Users/juyoungjung/Downloads/adlog.csv");
    //     var input = fs.createReadStream("c:zzz/ad/adlog.csv");
    //     input.on('data', function (chunk) {
    //         result = chunk.toString();
    //         var obj = {"text": result};
    //         console.log(obj);
    //         callback(obj);
    //     });
    // }

    function localWrite() { // 컬럼명 지정할 때. file 없으면 새로 만들기.
        var data = "\"ino\"," + "\"dno\"," + "\"age\"," + "\"gender\"," + "\"adno\"," + "\"watch_time\"," + "\"curr_time\"," +
            "\"bef_happiness\"," + "\"bef_anger\"," + "\"bef_sadness\"," + "\"bef_neutral\"," + "\"bef_surprise\"," + "\"bef_fear\"," +
            "\"bef_contempt\"," + "\"bef_disgust\"," + "\"aft_happiness\"," + "\"aft_anger\"," + "\"aft_sadness\"," + "\"aft_neutral\"," +
            "\"aft_surprise\"," + "\"aft_fear\"," + "\"aft_contempt\"," + "\"aft_disqust\"," + "\"rule\"\n";
        // fs.writeFileSync("/Users/juyoungjung/Downloads/adlog.csv" , data , 'utf8');
        fs.writeFileSync("c:/zzz/ad/adlog7.csv", data, 'utf8');
    }

    function logWrite(log) {
        // "\"1\","
        var data = "\"ino\"," + "\"1\"," + Math.round(log.detect.age) + "," + log.detect.gender + "," + adName + "," + log.watchTime + "," + log.currentTime + "," +
            log.befEmotion.happiness + "," + log.befEmotion.anger + "," + log.befEmotion.sadness + "," + log.befEmotion.neutral + "," + log.befEmotion.surprise + "," +
            log.befEmotion.fear + "," + log.befEmotion.contempt + "," + log.befEmotion.disgust + "," + log.aftEmotion.happiness + "," + log.aftEmotion.anger + "," +
            log.aftEmotion.sadness + "," + log.aftEmotion.neutral + "," + log.aftEmotion.surprise + "," + log.aftEmotion.fear + "," + log.aftEmotion.contempt + "," +
            log.aftEmotion.disgust + "," + ruleName +"\n";
        // fs.appendFile("/Users/juyoungjung/Downloads/adlog.csv" , data , 'utf8' , function (err) {
        fs.appendFile("c:/zzz/ad/adlog7.csv", data, 'utf8', function (err) {
            console.log(err);
        });
    }

    function adFileImgRead(callback) {
        // var adImgList = fs.readFileSync("/Users/juyoungjung/Downloads/list.csv");
        var adImgList = fs.readFileSync("c:/zzz/ad/list.csv");

        var csvRows = adImgList.toString('utf8');
        var csvRow = csvRows.split('\r\n');
        var columns = csvRow[0].split(',');

        var filesArr = new Array();
        for (var i = 1; i < csvRow.length - 1; i++) {
            var rule = {};
            var row = csvRow[i].split(',');
            for (var j = 0; j < columns.length; j++) {
                rule[columns[j].slice(1, -1)] = row[j].slice(1, -1); // 따옴표
            }
            filesArr.push(rule);
            console.log(rule);
        }

        var i = 0;
        var fileUri = new Array();

        var convert = setInterval(function () {
            // var files = arr[j+count].slice(1,-1);
            // var data = fs.readFileSync("/Users/juyoungjung/Downloads/adimages/"+filesArr[i]["image"]).toString("base64");
            // fileUri.push(util.format("data:%s;base64,%s" , mime.lookup("/Users/juyoungjung/Downloads/adimages/"+filesArr[i]["image"]),data));
            var data = fs.readFileSync("c:/zzz/ad/" + filesArr[i]["image"]).toString("base64");
            fileUri.push(util.format("data:%s;base64,%s", mime.lookup("c:/zzz/ad/" + filesArr[i]["image"]), data));

            i++;
            if (i == filesArr.length) {
                console.log("end....");
                clearInterval(convert);
                callback(fileUri);
            }
        }, 100);
    }

    function adVideoRead(path, callback) {
        console.log("video called...");
        console.log(path);
        // var stream = fs.createReadStream("/Users/juyoungjung/Downloads/ad/"+path , {encoding : "base64" , bytes : 102400 * 102400});
        var stream = fs.createReadStream("c:/zzz/ad/" + path, {encoding: "base64", bytes: 102400 * 102400});
        callback(stream);


    }


    return {
        // localLogRead: localLogRead,
        setAdNameRuleName : setAdNameRuleName,
        localWrite: localWrite,
        logWrite: logWrite,
        adFileImgRead: adFileImgRead,
        adVideoRead: adVideoRead
    };
})();
module.exports = fileIO;
    









