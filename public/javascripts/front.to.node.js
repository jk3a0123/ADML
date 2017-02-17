/**
 * Created by juyoungjung on 2017. 1. 23..
 */

var slideShow;
var imgData = null;


// ============== 대기 모드 (이미지 슬라이드 쇼) ==============
function callImg() {
    console.log("MODE IMAGE CALLED");
    var i = 0;

    var dataLength = imgData.length - 1;
    slideShow = setInterval(function () {
        $('#img').attr('src', imgData[i]);
        i = i == dataLength ? 0 : i + 1;
    }, 1000);
}


// ============== 재생 모드 (영상 재생) ==============
function callVideo(path) {

    $.ajax({
        url: "http://localhost:8081/advideo/" + path,
        type: "get",
        dataType: "text",
        success: function (result) {
            console.log(result);
            $('#advideo').attr('src', "data:video/mp4;base64," + result);
        }

    })

}

// ============== 이미지를 넘기면 룰 돌림 ==============
function ruleMachines(obj, callback) {
    $.ajax({
        url: "http://localhost:8081/rules/ruleMachines",
        data: obj,
        type: "get",
        success: function (result) {
            // console.log(result);
            $('#img').css('visibility', 'hidden');
            $('#advideo').css('visibility', 'visible');

            var videos = $('#advideo');
            videos.attr('src', "data:video/mp4;base64," + result);
            var video = videos[0];
            // console.log(video);
            var seconds;
            var i = setInterval(function () {
                if (video.readyState > 0) {
                    seconds = video.duration;
                    console.log("RULE MACHINES RETURN : " + seconds);
                    callback(seconds);
                    clearInterval(i);
                }
            }, 200);
        }
    });
}


// ============== 로그 추가 ==============
function logWrite(obj) {
    $.ajax({
        url: "http://localhost:8081/logwrite",
        data: obj,
        success: function () {
            console.log("success write log.....");
        }
    });

}



