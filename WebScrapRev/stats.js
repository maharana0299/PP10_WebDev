const request = require('request');
const cheerio = require('cheerio');


const url = 'https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard';

request(url, callback);

function callback(error, response, html) {

    if (!error) {


        let ch = cheerio.load(html);
        let bothTables = ch('.table.bowler');

        for (let i = 0; i < bothTables.length; i++) {

            let allBowlers = ch(bothTables[i]).find('tbody tr');

            let topper = {
                name: undefined,
                wickets: 0,
            };

            for (let i = 0; i < allBowlers.length; i++) {

                let player = ch(allBowlers[i]).find('td');

                let wicketTaken = ch(player[4]).text();
                let pname = ch(player[0]).text();

                // console.log(`Name: ${pname}, Wickets Taken: ${wicketTaken}`);

                if (Number(wicketTaken) > topper.wickets) {
                    topper.name = pname;
                    topper.wickets = Number(wicketTaken);;
                }
            }

            console.log(topper);
        }
    }
}