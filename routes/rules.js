/**
 * Created by BitCamp on 2017-01-23.
 */

var express = require('express');
var fs = require("fs");
var router = express.Router();
var rules = require("../public/modules/rules.js");
var fileIO = require("../public/modules/fileio.js");
var ajaxMD = require("../public/modules/node.to.backend.js");

router.get('/ruleMachines', function (req, res) {
    console.log("rule Machines called...");
    var obj = {"area": "KJ", "gender": req.query.gender, "age": req.query.age, "emotion": req.query.firstemotion};

    rules.ruleMachines(obj, function (results) {
        console.log("BACK TO THE ROUTER RULES");
        console.log(results);
        var result = results.result;
        var adName = result.data.ad;
        var ruleName = results.ruleName;

        res.writeHead(206, {"Accept-Ranges": "bytes", "Content-Type": "video/mp4"}); // 동영상 재생 위한 header 붙이기.

        fileIO.adVideoRead(result.data.ad, function (result) {
            result.on("open", function () {
                result.pipe(res); // 스트리밍 위한. 실시간.
            });
        });

        fileIO.setAdNameRuleName({adName : adName, ruleName : ruleName});
    });

});

module.exports = router;