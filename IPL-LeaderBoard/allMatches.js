const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');
const getMatchesLink = require('./matches');
const baseUrl = "https://www.espncricinfo.com";

function getAllMatches(link) {
    request(link, function(error, response, data) {
        processData(data);
    })
}

function processData(data) {
    let ch = cheerio.load(data);
    let allAtags = ch('a[data-hover="Scorecard"]');
    console.log(allAtags.length); // got 60 matches

    for (let i = 0; i < allAtags.length; i++) {
        let matchLink = baseUrl + ch(allAtags[i]).attr("href");
        // console.log(matchLink);
        getMatchesLink(matchLink);
    }
}

module.exports = getAllMatches;