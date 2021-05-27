const fs = require("fs");
const cheerio = require("cheerio");

let htmlKaData = fs.readFileSync("./index.html");

let ch = cheerio.load(htmlKaData);

// <h1>Heading 1</h1> => object form !!
let liKaObject = ch('tr');
// console.log(liKaObject.length);

let ps = ch('p');
lastP = ch(ps[2]);
// console.log(lastP.text());

let pInsideLi = ch('ul li p'); // selectors 
// console.log(pInsideLi.text());

let pisideUl = ch('ul>p'); // > this is for direct childre;
// console.log(pisideUl.text());
// let h1KaData = ch("li").text();
// console.log(h1KaData)

// class -multiple - use . for class
// id- unique - use #

let pClass = ch('.para.main').text(); // no space for same element
// console.log(pClass);

let pId = ch('#unique');
console.log(pId.text());