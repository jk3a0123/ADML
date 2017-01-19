var express = require('express');
var fileIO = require('../public/javascripts/fileio.js');
var router = express.Router();
var fs = require("fs");
var ajaxMD = require("../public/javascripts/ajax-module.js");


/* GET home page. */
router.get('/', function(req, res, next) {
    // fileIO.localWrite();
    res.render('ad.html', { title: 'Express' });
});

router.get('/console', function(req, res, next) {
    fileIO.localBaseRead(result => ajaxMD.sendLog(result));
});

router.get('/write' , function (req , res , next) {
   fileIO.logWrite();
});
module.exports = router;
