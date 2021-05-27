const request = require("request");
const cheerio = require("cheerio");
const fs = require('fs');
const getMatchLinks = require('./match.js');


const baseUrl = "https://www.espncricinfo.com";

function getAllMatches(link) {
    request(link, function(error, response, data) {
        processData(data);
    })
}


function processData(html) {
    // get liks of all the matchess !!!
    let ch = cheerio.load(html);
    let allATags = ch('a[data-hover="Scorecard"]');

    // {},{},{} .....
    if (!fs.existsSync(`./IPL`)) {
        fs.mkdirSync('./IPL')
        for (let i = 0; i < allATags.length; i++) {
            let matchLink = baseUrl + ch(allATags[i]).attr("href");
            // console.log(matchLink); // got all scorecard links

            getMatchLinks(matchLink);
        }
    }
}
module.exports = getAllMatches;