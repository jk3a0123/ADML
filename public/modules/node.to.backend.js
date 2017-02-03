/**
 * Created by juyoungjung on 2017. 1. 19..
 */

var jsdom = require("jsdom");
var fileIO = require("./fileio.js");
var ajaxMD = (function () {
    function sendLog(obj) {
        jsdom.env("" , ["https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"] , function ( err , window) {
            var $ = window.$;
            console.log("......");
            $.support.cors = true;
            $.ajax({
                url : "http://192.168.0.12:8081/log",
                data : obj,
                type : "post",
                succeess : function (data) {
                    console.log("success");
                }
            });
        });
    }


    function recevieFile(obj) {
        jsdom.env("" , ["https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"] , function ( err , window) {
            var $ = window.$;
            console.log("......");
            $.support.cors = true;
            $.ajax({
                url : "http://192.168.0.12:8081/"+obj.url,
                type : "get",
                dataType : "text",
                succeess : function (data) {
                    console.log("success");
                    console.log(data);
                }
            });
        });
    }
    return {sendLog :  sendLog , recevieFile : recevieFile};


})();

module.exports = ajaxMD;

