/**
 * Created by juyoungjung on 2017. 1. 18..
 */

var fileIO = function () {
    var fs = require("fs");
    var input = fs.createReadStream("/Users/juyoungjung/Downloads/my_data.csv");
    input.on('data', function(chunk){
        var result = chunk.toString();
        return result;
    });
};
module.exports = fileIO;










