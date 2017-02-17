var express = require('express');
var app = express();
var fileIO = require('../public/modules/fileio.js');
var router = express.Router();
var fs = require("fs");
var ajaxMD = require("../public/modules/node.to.backend.js");
var path = require('path');
var jsdom = require("jsdom");
var ajax = require('ajax');
var request = require('request');
var csrf = require('csurf');
var jwt = require('jwt-simple');
var FormData = require('form-data');

var querystring = require('querystring');


/* GET home page. */
router.get('/', function(req, res, next) {
    // fileIO.localWrite();
    res.render('ad.html', { title: 'Express' });
});

router.get('/test', function(req, res, next) {
    // fileIO.localWrite();
    res.render('adtest.html', { title: 'Express' });
});



router.get('/sendlog', function(req, res, next) {
    fileIO.localLogRead(obj => ajaxMD.sendLog(obj));
});

router.get('/logwrite' , function (req , res , next) {

    var log = { detect : req.query.detect,
                befEmotion : req.query.befEmotion,
                aftEmotion : req.query.aftEmotion,
                watchTime : Math.round(req.query.watchTime) ,
                currentTime : req.query.currentTime
                };
   fileIO.logWrite(log);
});

router.get('/receivelist' , function (req , res , next) {

    var obj = {url : "adlist"};
    ajaxMD.recevieFile(obj);

});

router.get('/receivebase' , function (req , res , next) {
    var obj = {url:"rulebase"};
    ajaxMD.recevieFile(obj);

});

router.get('/receivekmeans' , function (req , res , next) {
    var obj = {url:"kmeans"};
    ajaxMD.recevieFile(obj);
});

router.get('/adfile' , function (req , res) {
    fileIO.adFileImgRead(result => res.send(result));
});

router.get('/sendfile' , function (req , res) {


    // jsdom.env("http://192.168.0.12:8081/token" , ["https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"] , function ( err , window) {
    //     var $ = window.$;
    //     var token = $('input[name=_csrf]').attr("value");
    //     // var tokenForm = $('#token');
    //
    //     console.log(token);

        // var data = fs.readFileSync("/Users/juyoungjung/Downloads/adlog.csv");
        // console.log(data);

        var called = request.post("http://192.168.0.12:8081/log" , function (err , res , body) {
           console.log(body);
        });
        var form = called.form();
        form.append("file" , fs.createReadStream("/Users/juyoungjung/Downloads/adlog.csv"));
        console.log(form);



});
module.exports = router;
