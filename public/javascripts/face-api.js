/**
 * Created by juyoungjung on 2017. 1. 13..
 */
var detectapi = function (blob , callback) {
        console.log(blob);
        var params = {
            // Request parameters
            "returnFaceId": "true",
            "returnFaceAttributes": "age,gender"
        };
        $.ajax({
            url: "https://api.projectoxford.ai/face/v1.0/detect?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/octet-stream");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","8918428ab45549d29708a7c8c339e59d");
            },
            contentType:false,
            processData:false,
            type: "POST",
            // Request body
            data: blob,
            dataType:"JSON",

        })
            .done(function(data) {
                console.log(data);
                var age = data[0].faceAttributes.age;
                var gender = data[0].faceAttributes.gender;
                var obj = {"age" : age , "gender" : gender};
                console.log(obj);
                callback(obj);
            })
            .fail(function() {
                alert("error");
            });
    };
var emotionapi = function (blob , callback) {
    console.log(blob);
    $.ajax({
        url: "https://api.projectoxford.ai/emotion/v1.0/recognize?" ,
        beforeSend: function (xhrObj) {
            // Request headers
            xhrObj.setRequestHeader("Content-Type", "application/octet-stream");
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "46eadcc93d9547b3b3af8ec56ddf5283");
        },
        contentType: false,
        processData: false,
        type: "POST",
        // Request body
        data: blob,
        dataType: "JSON",
    })
        .done(function (data) {
            console.log(data);
            var result = data[0].scores;
            console.log(result);
            callback(result);
        })
        .fail(function () {
            alert("error");
        });

};
