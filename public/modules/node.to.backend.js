/**
 * Created by juyoungjung on 2017. 1. 19..
 */

var jsdom = require("jsdom");
var fileIO = require("./fileio.js");
var path = require('path');
var fs = require('fs');


var ajaxMD = (function () {
    function sendLog(obj) {
        jsdom.env("" , ["https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"] , function ( err , window) {
            var $ = window.$;
            console.log("......");
            console.log(obj);
            $.support.cors = true;
            $.ajax({
                url : "http://192.168.0.6:8081/ad/log",
                data : {"file" : obj} ,
                type : "post",
                succeess : function (data) {
                    console.log("success");
                },
                error : function (err) {
                    console.log(err);
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
    function sendFile() {

        jsdom.env("" , ["https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"] , function ( err , window) {
            var $ = window.$;
            console.log("......");
            $.support.cors = true;
            $.ajax({
                url : "http://192.168.0.6:8081/log",
                contentType : false,
                processData : false,
                data :formData,
                type : "post",
                succeess : function (data) {
                    console.log("success");
                }
            });
        });
    }

    return {sendLog :  sendLog , recevieFile : recevieFile , sendFile : sendFile};
})();

module.exports = ajaxMD;

