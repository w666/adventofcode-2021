"use strict";
exports.__esModule = true;
var fs = require("fs");
var testArray1 = ["199", "200", "208", "210", "200", "207", "240", "269", "260", "263"];
var array;
array = fs.readFileSync('input.txt', 'utf-8').split('\n');
// part 1
function getLargerMeasurements(inputArr, numberOfMeasurements) {
    var resultArr = [];
    inputArr.forEach(function (value, index, arr) {
        if (index >= numberOfMeasurements) {
            var currentSum = 0;
            var previousSum = 0;
            for (var i = index - numberOfMeasurements; i < index; i++) {
                previousSum = previousSum + parseInt(arr[i]);
            }
            for (var i = index - numberOfMeasurements + 1; i <= index; i++) {
                currentSum = currentSum + parseInt(arr[i]);
            }
            if (currentSum > previousSum) {
                resultArr.push(value);
            }
        }
    });
    return resultArr;
}
// test 1
if (getLargerMeasurements(testArray1, 1).length != 7) {
    throw "Test failed";
}
else {
    console.log("Test passed!");
}
console.log("part 1: " + getLargerMeasurements(array, 1).length);
// test 2
if (getLargerMeasurements(testArray1, 3).length != 5) {
    throw "Test failed";
}
else {
    console.log("Test passed!");
}
console.log("part 2: " + getLargerMeasurements(array, 3).length);
