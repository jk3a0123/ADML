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

router.get('/advideo/:path' , function (req , res) {
   var path = req.params.path;
   console.log("......");
   console.log(path);

   res.writeHead(206 , {"Accept-Ranges" : "bytes" , "Content-Type" : "video/mp4" });

    fileIO.adVideoRead(path,function (result) {
            result.on("open" , function () {
                result.pipe(res);
            });
    });

   // fileIO.adVideoRead(path , function (result) {
   //          console.log(result);
   //          res.pipe(result);
   //          res.end();
   // });
});


module.exports = router;
