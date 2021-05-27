const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');

var baseUrl = 'https://github.com';

/**
 * This function  helps in adding issue
 * a json reference is passsed along with the project url 
 * Project url is converted into issue url and top 5 issues are fetched 
 * these issues are then added to the projectjson file 
 * The reference of the projectJson file is contained in json variable which automatically gets updated
 * then we simply write the json to the data.json file
 * projectJson -> memory reference of the project json 
 * We can also seach in the array bt it would be time consuming
 */

function proJectProcessor(projectUrl, projectJson, json) {
    // console.log(projectUrl);
    let issueUrl = projectUrl + '/issues';

    request(issueUrl, processIssues)

    function processIssues(err, res, body) {
        let ch = cheerio.load(body);
        let issues = ch('.Link--primary.v-align-middle.no-underline.h4');

        issues = issues.slice(0, 5);

        for (let i = 0; i < issues.length; i++) {

            let issueName = ch(issues[i]).text();
            let issueUrl = baseUrl + ch(issues[i]).attr('href');

            // here we are passing the project which is a json and when we are changing anything
            // it will automatically be reflected in main json as object are passed by reference
            addIssue(projectJson, issueName, issueUrl);
            // console.log(issueName.slice(0, 10), issueUrl);
        }
    }


    function addIssue(project, issueName, issueUrl) {
        // console.log(project);

        if (!project['issues']) {
            project.issues = [];
        }

        project['issues'].push({
            name: issueName,
            url: issueUrl,
        });

        fs.writeFileSync('data.json', JSON.stringify(json));
    }
}

module.exports = proJectProcessor;