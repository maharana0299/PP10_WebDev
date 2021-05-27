const fs = require('fs');
console.log('Start');

// fs.readFile('./f1.txt', function(data) {

// })

fs.readFile('./f1.txt', giveMeData)

function giveMeData(error, data) {
    console.log('Inside Callback');
    console.log(data + "");
}

console.log('Doind Work in async');
console.log('Still Doing');