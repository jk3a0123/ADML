/**
 * Created by juyoungjung on 2017. 1. 19..
 */

var jsdom = require("jsdom");

var ajaxMD = (function () {
    function callAjax(obj) {
        jsdom.env("" , ["https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"] , function (err , window) {
            var $ = window.$;
            console.log("......");
            $.support.cors = true;
            $.ajax({
                url : "http://192.168.0.12:8081/"+obj.url,
                data : obj.data,
                type : obj.type,
                succeess : function (data) {
                    console.log("success");
                }
            });
        });
    }
    return {callAjax :  callAjax};
})();

module.exports = ajaxMD;

