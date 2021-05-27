const fs = require('fs');
const json2xls = require('json2xls');
let arr = [];
let allPlayersStats = fs.readFileSync('./leaderBoad.json');
allPlayersStats = JSON.parse(allPlayersStats);

for (let k in allPlayersStats) {
    arr.push(allPlayersStats[k]);
}
arr.sort(GetSortOrder('Runs'))
    // arr.length = 10;
console.log(arr);

function GetSortOrder(prop) {
    return function(a, b) {
        if (a[prop] < b[prop]) {
            return 1;
        } else if (a[prop] > b[prop]) {
            return -1;
        }
        return 0;
    }
}

var xls = json2xls(arr);

fs.writeFileSync('leaderBoard.xlsx', xls, 'binary');