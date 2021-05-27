var json2xls = require('json2xls');
const fs = require('fs');
const path = require('path');

let rootDir = './IPL';
let excelPath = './IPLExcel';
fs.mkdirSync(excelPath);
let files = fs.readdirSync(rootDir);
// console.log(file.length);
files.forEach(teamName => {
    // console.log(element);
    let teamPath = path.join(rootDir, teamName);
    let teamFiles = fs.readdirSync(teamPath);
    teamFiles.forEach(batsmanName => {
        // console.log(e);
        let batsmanFilePath = path.join(teamPath, batsmanName);
        let batsmanFile = fs.readFileSync(batsmanFilePath);

        let jsonBatsmanFile = JSON.parse(batsmanFile);
        let xls = json2xls(jsonBatsmanFile);
        // console.log(jsonBatsmanFile);
        makeTeamDirectory(excelPath, teamName);
        fs.writeFileSync(`${excelPath}/${teamName}/${batsmanName}.xlsx`, xls, 'binary');
    });
});
// var xls = json2xls(json);

// fs.writeFileSync('data.xlsx', xls, 'binary');
function makeTeamDirectory(excelPath, teamName) {
    if (!fs.existsSync(path.join(excelPath, teamName))) {
        fs.mkdirSync(path.join(excelPath, teamName));
    }
}