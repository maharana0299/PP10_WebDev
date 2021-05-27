const cheerio = require('cheerio');
const request = require('request');
const getProjects = require('./getProjects');

var baseUrl = 'https://github.com';
let topicUrl = '/topics';

function explore(url) {
    request(url, getTopics);
}

function getTopics(err, res, html) {

    if (!err) {
        let ch = cheerio.load(html);
        let topics = ch('.topic-box a');
        // console.log(topics.length);

        for (let i = 0; i < topics.length; i++) {

            let topicName = ch(topics[i]).find('p.lh-condensed')
                .text()
                .trim();
            let topicLink = baseUrl + ch(topics[i]).attr('href');

            getProjects(topicName, topicLink);
            // console.log(topicName, topicLink);
        }
    }
}

explore(`${baseUrl}${topicUrl}`);