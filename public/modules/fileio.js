/**
 * Created by juyoungjung on 2017. 1. 18..
 */

var fs = require("fs");
var util = require("util");
var mime = require("mime");

var fileIO = (function () {
    var result;
    function localLogRead(callback) {
        var input = fs.createReadStream("/Users/juyoungjung/Downloads/adlog.csv");
        input.on('data', function(chunk){
            result = chunk.toString();
            var obj = {"text" : result};
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

    function logWrite(log) {
        var data = "\"ino\"," + "\"1\"," +""+log.detect.age+"," + ""+log.detect.gender+"," +""+log.adno+"," +""+log.watchTime+"," +""+log.currentTime+"," +
            ""+log.befEmotion.happiness+"," + ""+log.befEmotion.anger+"," +""+log.befEmotion.sadness+"," +""+log.befEmotion.neutral+"," +""+log.befEmotion.surprise+"," +
            ""+log.befEmotion.fear+","+ ""+log.befEmotion.contempt+","+""+log.befEmotion.disgust+","+""+log.aftEmotion.happiness+","+""+log.aftEmotion.anger+","+
            ""+log.aftEmotion.sadness+","+""+log.aftEmotion.neutral+","+ ""+log.aftEmotion.surprise+","+ ""+log.aftEmotion.fear+","+""+log.aftEmotion.contempt+","+
            ""+log.aftEmotion.disgust+","+"\"base\"\n";
        fs.appendFile("/Users/juyoungjung/Downloads/adlog.csv" , data , 'utf8' , function (err) {
            console.log(err);
        });

    }

    function adFileImgRead(callback) {

            var adImgList = fs.readFileSync("/Users/juyoungjung/Downloads/list.csv");
            console.log(adImgList.toString());
            var row = adImgList.toString().split('\n').slice(1);
            console.log(row.length);
            // callback return emotion insert
            var arr = row.join().split(",");
            console.log("..........");
            var fileUri = new Array();
            var fileNames = new Array();
            var count = 1;
            var j = 0 ;
            var convert = setInterval(function () {
                var files = arr[j+count].slice(1,-1);
                fileNames.push(files);
                var data = fs.readFileSync("/Users/juyoungjung/Downloads/adimages/"+fileNames[j]).toString("base64");
                fileUri.push(util.format("data:%s;base64,%s" , mime.lookup("/Users/juyoungjung/Downloads/adimages/"+fileNames[j]),data));
                j++;
                count++;
                console.log(j);
                if(j == row.length){
                    console.log("end....");
                    clearInterval(convert);

                    callback(fileUri);
                }
            },100);
    }
    function adVideoRead(path , callback) {
        console.log("video called...");
        console.log(path);
        var stream = fs.createReadStream("/Users/juyoungjung/Downloads/ad/"+path , {encoding : "base64" , bytes : 102400 * 102400});
        callback(stream);
    }


    return {localLogRead : localLogRead , localWrite : localWrite , logWrite : logWrite , adFileImgRead : adFileImgRead , adVideoRead : adVideoRead};
})();
module.exports = fileIO;
    









