var express = require('express');
var fileIO = require('../public/modules/fileio.js');
var router = express.Router();
var fs = require("fs");
var ajaxMD = require("../public/modules/node.to.backend.js");


/* GET home page. */
router.get('/', function(req, res, next) {
    // fileIO.localWrite();
    res.render('ad.html', { title: 'Express' });
});

router.get('/sendlog', function(req, res, next) {
    fileIO.localLogRead(obj => ajaxMD.sendLog(obj));
});

router.get('/logwrite' , function (req , res , next) {

    var log = { detect : req.query.detect,
                befEmotion : req.query.firstEmotion,
                aftEmotion : req.query.secondEmotion,
                adno : "1",
                watchTime : Math.round(req.query.watchTime) ,
                currentTime : req.query.currentTime,
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

module.exports = router;
