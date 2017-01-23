/**
 * Created by juyoungjung on 2017. 1. 18..
 */

var fs = require("fs");
var util = require("util");
var mime = require("mime");
var chunkit = require("chunkit");


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
            var row = adImgList.toString().split('\n').slice(1);
            console.log(row.length);
            // callback return emotion insert
            var arr = row.join().split(",");
            console.log("..........");
            var fileUri = new Array();
            var fileNames = new Array();
            var count = 1;
            var j = 0 ;
            setInterval(function () {
                fileNames.push(arr[j+count].slice(1,-1));
                var data = fs.readFileSync("/Users/juyoungjung/Downloads/adimages/"+fileNames[j]).toString("base64");
                fileUri.push(util.format("data:%s;base64,%s" , mime.lookup("/Users/juyoungjung/Downloads/adimages/"+fileNames[j]),data));
                j++;
                count++;
                console.log(j);
                if(j == row.length){
                    clearInterval();
                    console.log("end....");
                    callback(fileUri);

                }
            },100);
    }
    function adVideoRead(path , callback) {
        console.log("video called...");
        console.log(path);

        var stream = fs.createReadStream("/Users/juyoungjung/Downloads/ad/"+path , {encoding : "base64" , bytes : 102400 * 102400});
        callback(stream)



        // callback(videoURI);



            //
            //
            // console.log(data);
            // callback(data);


        // console.log(videoData);
        // var videoURI = util.format("data:%s;base64,%s" , mime.lookup("/Users/juyoungjung/Downloads/ad/"+videoData),data);
   // data     console.log(videoData);
   //
   //      callback(videoData);

    }
    return {localBaseRead : localBaseRead , localWrite : localWrite , logWrite : logWrite , adFileImgRead : adFileImgRead , adVideoRead : adVideoRead};
})();
module.exports = fileIO;
    









