const fs = require('fs');
const cheerio = require('cheerio');
const request = require('request');

const URL = 'https://www.amazon.in/';

// request(URL, getMessage);

function getMessage(error, response, body) {
    fs.writeFileSync("./twiiterPage.html", body);
}


let tweets = fs.readFileSync('./twiiterPage.html');
let ch = cheerio.load(tweets);
console.log(ch('.a-cardui-header>h2')['0'].children[0]['data']);
// console.log(ch('.css-1dbjc4n').text());