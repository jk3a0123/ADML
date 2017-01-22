/**
 * Created by juyoungjung on 2017. 1. 16..
 */

function defaultBase(count , callback) {
        $.ajax({
            url: "http://192.168.0.12:8081/kmeans",
            type: "GET",
            contentType: false,
            processData: false,
            dataType: "JSON",
            success: function (blob) {
                console.log(blob);
                var csvData = blob.json;
                var arr = csvData.split(" ");
                var data = [];
                console.log("result...");
                console.log(result);
                console.log(arr[0]);
                    for(var i = 0 ; i < arr.length ; i++){
                        data[i] = new Array();
                        data[i][0] = arr[i];
                    }
                console.log(data[0][1]);

                callback(data);
                var csvContent = "data:text/csv;charset=utf-8,";
                    data.forEach(function(infoArray, index){
                        dataString = infoArray.join(",");
                        csvContent += index < data.length ? dataString+ "\n" : dataString;
                    });
                var encodedUri = encodeURI(csvContent);
                var fileReader = new FileReader();
                var result = fileReader.readAsText(encodedUri);
                console.log("result.....");
                console.log(result);
                var link = document.createElement("a");
                link.setAttribute("id" , "log");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF
                link.click();

            }
        });
}

var callfile = function () {
    var fileIO = require('./../modules/fileio.js');
    console.log(fileIO());
};



var ruleBase = function (detect , emotion , rule) {
    console.log(".......");
    console.log(rule[0]);
    var age = detect.age;
    var gender = detect.gender;
    var checkGender = (gender=="male") ?  checkAge(age, gender , emotion) : checkAge(age, gender , emotion);
};

function checkAge(age, gender , emotion) {

    switch (age) {
        case 10<= age <20 : checkEmotion(age , gender , emotion);
        break;
        case  20<= age <30 : checkEmotion(age , gender , emotion);
        break;
        case  30<= age <40 : checkEmotion(age , gender , emotion);
        break;
        case  40<= age <50 : checkEmotion(age , gender , emotion);
        break;
        case  50<= age <60 : checkEmotion(age , gender , emotion);
        break;
        case  60<= age <70 : checkEmotion(age , gender , emotion);
        break;
        case  70<= age < 80 : checkEmotion(age , gender , emotion);
        break;
    }
}

function checkEmotion(age, gender , emotion) {
    var anger = emotion.anger;
    var happiness = emotion.happiness;
    var sadness = emotion.sadness;
    var neutral = emotion.neutral;

}