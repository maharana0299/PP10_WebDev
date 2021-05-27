const cheerio = require('cheerio');
const request = require('request');
const getAllMatches = require('./allMatches');

const baseUrl = "https://www.espncricinfo.com";
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";
request(url, getData);

function getData(error, response, data) {
    process(data);
}

function process(data) {
    let ch = cheerio.load(data); // data loaded inside cheerio
    let aTag = ch('.widget-items.cta-link a');
    let allMatchLink = baseUrl + aTag.attr("href");
    // console.log(allMatchLink);
    getAllMatches(allMatchLink);
}