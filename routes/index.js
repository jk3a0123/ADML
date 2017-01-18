var express = require('express');
var fileIO = require('../public/javascripts/fileio.js');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('ad.html', { title: 'Express' });
});

router.get('/fileData', function(req, res, next) {
    res.send(fileIO());
});


module.exports = router;
