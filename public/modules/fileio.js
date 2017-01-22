/**
 * Created by juyoungjung on 2017. 1. 18..
 */

var fs = require("fs");
var util = require("util");
var mime = require("mime");


var fileIO = (function () {
    var result;
    function localBaseRead(callback) {
        var input = fs.createReadStream("/Users/juyoungjung/Downloads/adlog.csv");
        input.on('data', function(chunk){
            result = chunk.toString();
            var obj = {type : "post" , data : {"text" : result} , url : "log"};
            console.log(obj);
            callback(obj);
        });
    }
    function localWrite() {
        var data = "\"ino\"," + "\"dno\"," +"\"age\"," +"\"gender\"," +"\"adno\"," +"\"watch_time\"," +"\"curr_time\"," +
            "\"bef_happiness\"," + "\"bef_anger\"," +"\"bef_sadness\"," +"\"bef_neutral\"," +"\"bef_surprise\"," +"\"bef_fear\","+
            "\"bef_contempt\","+"\"bef_disgust\","+"\"aft_happiness\","+"\"aft_anger\","+"\"aft_sadness\","+"\"aft_neutral\","+
            "\"aft_surprise\","+ "\"aft_fear\","+"\"aft_contempt\","+"\"aft_disqust\","+"\"rule\"\n";
        fs.writeFileSync("/Users/juyoungjung/Downloads/adlog.csv" , data , 'utf8');
    }

    function logWrite() {
        var data = "\"ino\"," + "\"dno\"," +"\"age\"," +"\"gender\"," +"\"adno\"," +"\"watch_time\"," +"\"curr_time\"," +
            "\"bef_happiness\"," + "\"bef_anger\"," +"\"bef_sadness\"," +"\"bef_neutral\"," +"\"bef_surprise\"," +"\"bef_fear\","+
            "\"bef_contempt\","+"\"bef_disgust\","+"\"aft_happiness\","+"\"aft_anger\","+"\"aft_sadness\","+"\"aft_neutral\","+
            "\"aft_surprise\","+ "\"aft_fear\","+"\"aft_contempt\","+"\"aft_disqust\","+"\"rule\"\n";
        fs.appendFile("/Users/juyoungjung/Downloads/adlog.csv" , data , 'utf8' , function (err) {
            console.log(err);
        });

    }

    function adFileImgRead(callback) {

            var adImgList = fs.readFileSync("/Users/juyoungjung/Downloads/list.csv");

            console.log(adImgList.toString());

            var row = adImgList.toString().split('\n');

            console.log(row);

            console.log("..........");
            var col = new Array();
            var arr = new Array();
            for(var i = 0 ; i < row.length ; i ++){
                col.push(row[i].split(','));
            }


            console.log(col[1][1] );

            var data = fs.readFileSync("/Users/juyoungjung/Downloads/adimages/"+col[1][1]).toString("base64");

            var dataUri = util.format("data:%s;base64,%s" , mime.lookup("/Users/juyoungjung/Downloads/adimages/"+col[1][1]),data);

            callback(dataUri);
    }

    return {localBaseRead : localBaseRead , localWrite : localWrite , logWrite : logWrite , adFileImgRead : adFileImgRead};
})();
module.exports = fileIO;
    









