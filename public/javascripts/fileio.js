/**
 * Created by juyoungjung on 2017. 1. 18..
 */

var fs = require("fs");


var fileIO = (function () {
    var result;
    function localBaseRead(callback) {
        var input = fs.createReadStream("/Users/juyoungjung/Downloads/adlog.csv");
        input.on('data', function(chunk){
            result = chunk.toString();
            callback(result);
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

    return {localBaseRead : localBaseRead , localWrite : localWrite , logWrite : logWrite};
})();
module.exports = fileIO;
    











