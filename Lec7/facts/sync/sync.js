const fs = require('fs');

console.log('Before It');
let fData = fs.readFileSync('./f1.txt');
console.log(fData);
console.log('Hello after');