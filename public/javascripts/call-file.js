/**
 * Created by juyoungjung on 2017. 1. 18..
 */
function loadCSV() {
    $.ajax({
       url : "http://localhost:8080/fileData",
       contentType:false,
       processData:false,
       type : "get",
       dataType : "text",
       success : function (result) {
           console.log(result);
       }
    });
}