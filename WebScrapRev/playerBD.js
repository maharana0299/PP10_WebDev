const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

var fname = 'dob_players';
var url = 'https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard';
var baseUrl = 'https://www.espncricinfo.com';
/*
{
    name: Sachin,
    dob: 12 - 11 - 2019,
}
*/

request(url, callback);

function callback(error, res, html) {

    if (!error) {
        let ch = cheerio.load(html);

        let allPlayers = ch('.table.batsman a');
        // let allPlayers = ch('.Collapsible__contentInner tbody a.small');
        for (let i = 0; i < allPlayers.length; i++) {

            let player = ch(allPlayers[i]).text();
            let playerUrl = baseUrl + ch(allPlayers[i]).attr('href');

            getPlayerNameAndBday(playerUrl);
            // console.log(player + " " + playerUrl);
            // console.log(playerDetail);
        }
    }
}


function getPlayerNameAndBday(url) {
    request(url, getBday);
}

function getBday(err, res, html) {

    if (!err) {
        let ch = cheerio.load(html);

        let allRef = ch('h5.player-card-description.gray-900');

        let pname = ch(allRef[0]).text();
        let bday = ch(allRef[1]).text();
        let a = {
            name: pname,
            bday: bday,
        }

        createFileIfNotExist(fname);

        let file = fs.readFileSync(`./${fname}.json`);
        let fileJson = JSON.parse(file);

        fileJson[pname] = bday;

        fs.writeFileSync(`./${fname}.json`, JSON.stringify(fileJson));
        // console.log(fileJson);
        return a;
    }
}

function createFileIfNotExist(fname) {

    let isExist = fs.existsSync(`./${fname}.json`);

    if (!isExist) {
        console.log('a');
        let a = {};
        fs.writeFileSync(`./${fname}.json`, JSON.stringify(a));
    }
}