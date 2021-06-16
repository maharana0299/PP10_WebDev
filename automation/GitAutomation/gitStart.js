const puppeteer = require("puppeteer");
const fs = require('fs');
let data = {};


async function automation(githubLink) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 100, // for slowing a bit 
            defaultViewport: null, // null the default viewport 
            args: ["--start-maximized"], // for full screen
        });

        let page = (await browser.pages())[0];
        page.goto(githubLink);
        console.log('Automation Started....');

        console.log('Getting topic');

        await page.waitForSelector('p.lh-condensed');

        let allTopics = await getTopics(page);

        for (let i = 0; i < allTopics.length; i++) {
            data[allTopics[i].title] = {};
        }
        for (let i = 0; i < allTopics.length; i++) {
            await processProjects(allTopics[i].title, allTopics[i].url);
        }
        console.log(data);
        fs.writeFileSync('gitRep.json', JSON.stringify(data));
        async function processProjects(topic, projectUrl) {

            let newPage = await browser.newPage();
            await newPage.goto(projectUrl);

            await newPage.waitForSelector('.lh-condensed a.text-bold');
            let allProjects = await newPage.evaluate(() => {
                let topics = document.querySelectorAll('.lh-condensed a.text-bold');
                let allProjects = [];
                let length = topics.length > 5 ? 5 : 0;
                for (let i = 0; i < length; i++) {
                    let projectUrl = 'https://github.com' + topics[i].getAttribute('href');
                    let pname = topics[i].innerText;
                    allProjects.push({ url: projectUrl, pname: pname });
                }

                return allProjects;
            });

            // console.log(allProjects);

            // now we have all Projects
            for (let i = 0; i < allProjects.length; i++) {
                data[topic][allProjects[i].pname] = { url: allProjects[i].url, issues: [] };
            }

            // now work for all issues 
            for (let i = 0; i < allProjects.length; i++) {

                // get 3 issues 
                let issueUrl = allProjects[i].url + '/issues';
                await addIssuesToData(newPage, topic, allProjects[i].pname, issueUrl);
            }

            await newPage.close();
        }

        async function addIssuesToData(newPage, topic, project, issueUrl) {
            await newPage.goto(issueUrl);

            try {
                await newPage.waitForSelector('.h4.markdown-title');
                let issues = await newPage.evaluate(() => {
                    let allIssues = document.querySelectorAll('.h4.markdown-title');
                    let issues = [];
                    let length = allIssues.length > 5 ? 5 : allIssues.length;
                    for (let i = 0; i < length; i++) {
                        issues.push({
                            issue: allIssues[i].innerText,
                            url: 'https://github.com' + allIssues[i].getAttribute('href'),
                        });
                    }

                    return issues;
                })

                data[topic][project].issues = issues;
            } catch (e) {
                console.log(e);
            }
            // console.log(issues);
        }
    } catch (e) {
        console.log(e);
    }
}

async function getTopics(page) {
    return await page.evaluate(() => {
        let topics = document.querySelectorAll('.topic-box');
        topicsLink = [];
        for (let i = 0; i < topics.length; i++) {
            let topic = {
                url: 'https://github.com' + topics[i].querySelector('a').getAttribute('href'),
                title: topics[i].querySelector('p.lh-condensed').innerText,
            }
            topicsLink.push(topic);
        }

        return topicsLink;
    });
}

let link = 'https://github.com/topics';
automation(link)