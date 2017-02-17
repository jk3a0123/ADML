/**
 * Created by juyoungjung on 2017. 2. 15..
 */
var request = require('request');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var assert = require('assert');
var Ajax = require('simple-ajax');


var sendMD = (function () {
    function sendLogFile(data) {
        console.log(data);
        var ajax = new Ajax({
            url : 'http://192.168.0.12:8081/ad/log',
            method : "post",
            headers : { 'Access-Control-Allow-Origin': '*' }
        });
        ajax.send();
    }

    return {sendLogFile : sendLogFile}
})();
module.exports = sendMD;
