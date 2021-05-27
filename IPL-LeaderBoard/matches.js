const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

function getMatchesLink(link) {
    request(link, getMessage);
}

function getMessage(e, r, data) {
    processData(data);
}

function processData(data) {
    // load to cherrio
    let ch = cheerio.load(data);
    let bothInnings = ch('.Collapsible');

    // console.log(bothInnings.length);

    for (let i = 0; i < bothInnings.length; i++) {
        let teamName = ch(bothInnings[i]).find('h5').text();
        teamName = teamName.split('INNINGS')[0].trim();

        let allTrs = ch(bothInnings[i])
            .find('.table.batsman tbody tr');

        getStats(allTrs, ch, teamName);
    }
}

function getStats(allTrs, ch, teamName) {
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

            processDetails(teamName, batsmanName, runs, balls, fours, sixes);
        }
    }
}

function processDetails(teamName, batsmanName, runs, balls, fours, sixes) {
    let leaderPath = './leaderBoad.json';
    createIfNotExist(leaderPath);

    let leaderBoadJson = fs.readFileSync(leaderPath);
    leaderBoadJson = JSON.parse(leaderBoadJson);
    // console.log(leaderBoadJson[batsmanName]);
    batsmanName = generateName(batsmanName);
    console.log(batsmanName);
    if (leaderBoadJson[batsmanName] == undefined) {
        let batDetails = {
            Name: batsmanName,
            Runs: Number(runs),
            Sixes: Number(sixes),
            Fours: Number(fours),
            'Team Name ': teamName,
            'Fifty': Number(runs) < 100 && Number(runs) >= 50 ? 1 : 0,
            'Hundred': Number(runs) >= 100 ? 1 : 0,
        }
        leaderBoadJson[batsmanName] = batDetails;
        // fs.writeFileSync(leaderPath, JSON.stringify(leaderBoadJson));
    } else {
        let details = leaderBoadJson[batsmanName];
        details['Runs'] = Number(details['Runs']) + Number(runs);
        details['Sixes'] = Number(details['Sixes']) + Number(sixes);
        details['Fours'] = Number(details['Fours']) + Number(fours);
        if (Number(runs) < 100 && Number(runs) >= 50) {
            details['Fifty'] = details['Fifty'] + 1;
        }
        if (Number(runs) >= 100) {
            details['Hundred'] = details['Hundred'] + 1;
        }
    }

    fs.writeFileSync(leaderPath, JSON.stringify(leaderBoadJson));

    // todo
}

function createIfNotExist(file) {
    if (!fs.existsSync(file)) {
        let json = {};
        fs.writeFileSync(file, JSON.stringify(json));
    }
}

function generateName(batsmanName) {
    let a = batsmanName.toString().split(/[\s]+/);
    // return a[0] + " " + a[1].slice(0, 3) + '.';
    return a[0] + " " + a[1];
}

// let json = {
//     player1: {
//         matches: 1,
//         runs: 234,
//         sixes: 23,
//         fours: 34,
//         teamName:'RCB'
//     },
// }
module.exports = getMatchesLink;