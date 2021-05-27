const request = require("request");
const cheerio = require("cheerio");
const getAllMatches = require("./allMatches");
const baseUrl = "https://www.espncricinfo.com";
const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595"

request(url, function(error, response, data) {
    processData(data);
});



function processData(html) {
    let ch = cheerio.load(html);
    let aTag = ch(".widget-items.cta-link a");
    let allMatchesLink = baseUrl + aTag.attr("href");
    getAllMatches(allMatchesLink);
}