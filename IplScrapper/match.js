const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
// const link = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/sunrisers-hyderabad-vs-royal-challengers-bangalore-3rd-match-1216534/full-scorecard';


function getMatchLinks(link) {
    request(link, getMessage);
}

function getMessage(e, r, data) {
    process(data);
}

function process(data) {
    let ch = cheerio.load(data);
    let bothInnings = ch('.Collapsible');
    // console.log(bothInnings.length);
    for (let i = 0; i < bothInnings.length; i++) {
        let tName = ch(bothInnings[i]).find('h5').text();

        tName = tName.split('INNINGS')[0].trim();

        let allTrs = ch(bothInnings[i]).find('.table.batsman tbody tr');
        console.log(tName);
        getStats(allTrs, ch, tName);
    }
}

function getStats(allTrs, ch, tName) {
    console.log('################################');
    // length - 1 coz it contains one extra empty player
    for (let j = 0; j < allTrs.length - 1; j++) {
        let allTds = ch(allTrs[j]).find('td');
        if (allTds.length > 1) {

            // getting all details
            let batsmanName = ch(allTds[0]).find('a').text().trim();
            let runs = ch(allTds[2]).text().trim();
            let balls = ch(allTds[3]).text().trim();
            let fours = ch(allTds[5]).text().trim();
            let sixes = ch(allTds[6]).text().trim();
            // console.log(`Batsman - ${batsmanName}, Runs - ${runs}, Balls - ${balls}, Fours - ${fours}, Sixes - ${sixes}`);

            processDetails(tName, batsmanName, runs, balls, fours, sixes);
        }
    }
    console.log('################################');
}

function checkTeamFolder(teamName) {

    let teamPath = `./IPL/${teamName}`;
    return fs.existsSync(teamPath);
}

function createTeamFolder(teamName) {
    let teamPath = `./IPL/${teamName}`;
    fs.mkdirSync(teamPath);
}

function checkBatsmanFile(teamName, batsmanName) {
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}

function createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes) {
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    console.log('Added');
    let batsmanFile = [];
    let inning = {
        Runs: runs,
        Balls: balls,
        Fours: fours,
        Sixes: sixes,
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath, JSON.stringify(batsmanFile));
}

function updateBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes) {
    let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
    let file = fs.readFileSync(batsmanFilePath);

    let jsonBatsmanFile = JSON.parse(file);
    let inning = {
        Runs: runs,
        Balls: balls,
        Fours: fours,
        Sixes: sixes,
    }
    jsonBatsmanFile.push(inning);

    fs.writeFileSync(batsmanFilePath, JSON.stringify(jsonBatsmanFile));
}


function processDetails(teamName, batsmanName, runs, balls, fours, sixes) {
    let teamFolderExist = checkTeamFolder(teamName);
    if (teamFolderExist) {
        let batsmanFileExist = checkBatsmanFile(teamName, batsmanName);
        if (batsmanFileExist) {
            updateBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes);
        } else {
            createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes);
        }
    } else {
        createTeamFolder(teamName);
        createBatsmanFile(teamName, batsmanName, runs, balls, fours, sixes);
    }
}

module.exports = getMatchLinks;