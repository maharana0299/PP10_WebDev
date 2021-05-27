const cheerio = require('cheerio');
const request = require('request');
const fs = require('fs');
const proJectProcessor = require('./projectProcessor')
var baseUrl = 'https://github.com';
var json = {};

/**
 * This function takes the topic name and topic url then it loads the webpage of the specific topic,
 * fetch 5 projects from it and then with the help of other functions, it adds 5 latest issues 
 */
function getProjects(topicName, topicUrl) {

    // console.log(topicName, topicUrl);
    request(topicUrl, processTopics);


    function processTopics(err, res, body) {

        if (!err) {

            let ch = cheerio.load(body);
            let repos = ch('.lh-condensed a.text-bold');

            // console.log('------------------------------------------------------------------');
            repos = repos.slice(0, 5); // need only 5 projects
            for (let i = 0; i < repos.length; i++) {
                let projectName = ch(repos[i]).text().trim();
                let projectUrl = baseUrl + ch(repos[i]).attr('href');
                // console.log(repoName, repoLink);
                let project = addToJson(topicName, projectName);

                proJectProcessor(projectUrl, project, json)
            }
            // console.log('------------------------------------------------------------------');
        }
    }
}

function addToJson(topicName, repoName) {

    createRepoIfNotExist(topicName);

    let projectJson = {
        pname: repoName,
    }

    json[topicName].push(projectJson);
    // fs.writeFileSync('data.json', JSON.stringify(json));
    return projectJson;
}

function createRepoIfNotExist(topicName) {
    if (json[topicName] == undefined) {
        let arr = [];
        json[topicName] = arr;
    }
}

module.exports = getProjects;



{
    topic: [{
        pName: 'name',
        issues: [{
            issumeName: 'sdkj',
            url: 'url',
        }, ]
    }]
}