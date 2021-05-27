const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
let url = 'https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/ball-by-ball-commentary';
request(url, callback);

function callback(error, response, html) {

    if (!error) {

        let ch = cheerio.load(html);
        let comments = ch('.col-14 div.match-comment-long-text p');
        console.log(ch(comments[0]).text());
    }
}