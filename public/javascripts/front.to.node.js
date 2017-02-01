/**
 * Created by juyoungjung on 2017. 1. 23..
 */
function callimg() {
    $.ajax({
        url : "http://localhost:8080/adfile",
        dataType : "json",
        success : function (data) {

            console.log(data);
            var i = 0 ;
            setInterval(function () {
                $('#img').attr('src' , data[i]);
                i++;
                if(i > data.length){
                    i=0;
                }
            },1000);
        }
    })
}
function logWrite(obj) {

    $.ajax({
        url : "http://localhost:8080/logwrite",
        data : obj,
        success : function () {
            console.log("success write log.....");
        }
    });

}
function callVideo(path) {

    $.ajax({
        url : "http://localhost:8080/advideo/" + path,
        type : "get",
        dataType: "text",
        success : function (result) {
            console.log(result);
            $('#advideo').attr('src' , "data:video/mp4;base64," +result);
        }

    })

}

function ruleBase(path , callback) {
    $.ajax({
        url : "http://localhost:8080/rules/rule" ,
        data : path,
        type : "get",
        success : function (result) {
            console.log("success base");
            $('#img').css('visibility' , 'hidden');
            var video = $('#advideo');
            var timer;
            video.attr('src' , "data:video/mp4;base64," +result);
            var seconds = video[0];
            var t = setInterval(function () {
                if(seconds.readyState > 0) {
                    timer = seconds.duration;
                    console.log("duration......");
                    console.log(timer);
                        setTimeout(function () {
                            callback("end");
                            clearInterval(t);
                        }, timer);

                }
            }, 500);




        }
    })
}

function kmeansRule(path) {
    $.ajax({
        url : "http://localhost:8080/rules/kmeans/" + path,
        type : "get",
        success : function () {
            console.log("success....");
        }

    })

}
