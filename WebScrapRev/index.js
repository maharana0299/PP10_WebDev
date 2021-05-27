const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
let url = 'https://www.google.com/';

// asynchroous call to request the data and when data is fetched then callback is called
request(url, callback);

function callback(error, response, body) {
    if (!error) {
        fs.writeFileSync('index.html', body);
        // console.log(`body: ${body}`);
    }
}