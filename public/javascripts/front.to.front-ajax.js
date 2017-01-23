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
            },1000);
        }
    })
}

function writeLog(obj) {

    $.ajax({
        url : "http://localhost:8080/write",
        data : obj,
        success : function () {
            console.log("success write log.....");
        }
    });

}

function callVideo(path) {

    $.ajax({
        url : "http://localhost:8080/advideo/"+path,
        type : "get",
        dataType: "text",
        success : function (result) {
            console.log(result);
            $('#advideo').attr('src' , "data:video/mp4;base64," +result);
        }

    })

}