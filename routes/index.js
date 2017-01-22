var express = require('express');
var fileIO = require('../public/modules/fileio.js');
var router = express.Router();
var fs = require("fs");
var ajaxMD = require("../public/modules/ajax-module.js");


/* GET home page. */
router.get('/', function(req, res, next) {
    // fileIO.localWrite();
    res.render('ad.html', { title: 'Express' });
});

router.get('/callajax', function(req, res, next) {
    fileIO.localBaseRead(obj => ajaxMD.callAjax(obj));
});

router.get('/write' , function (req , res , next) {
   fileIO.logWrite();
});

router.get('/adfile' , function (req , res , next) {
   fileIO.adFileImgRead(function (img) {
       console.log(img);
       res.send(img);
   });
});


module.exports = router;
