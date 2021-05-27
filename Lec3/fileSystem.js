let fs = require('fs'); // import fs module

let data = fs.readFileSync('./abc.txt'); // this is read in form of buffer
console.log(data); // prints buffer
console.log(data.toString()); //buffer to stringf
let wdata = '\nThis is some data that i have to append';
fs.appendFileSync('write.txt', wdata); // to append data
fs.unlinkSync('abc.txt'); // to delete a file
fs.mkdirSync('Other'); // to make a directory

let a = fs.existsSync('write.txt'); // to check if file or directory exist or not
console.log(a);