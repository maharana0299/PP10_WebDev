const puppeteer = require('puppeteer');

const playListLink = 'https://www.youtube.com/playlist?list=PLMC9KNkIncKtPzgY-5rmhvj7fax8fdxoj';
let totalVideoSelector = '.style-scope.yt-formatted-string';
let allElementSelctor = '#text.style-scope.ytd-thumbnail-overlay-time-status-renderer';

async function automation(playListLink) {
    let page;
    try {

        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 50, // for slowing a bit 
            defaultViewport: null, // null the default viewport 
            args: ["--start-maximized"], // for full screen
        });

        page = (await browser.pages())[0];

        console.log('Automation Started....');
        await page.goto(`${playListLink}`);
        console.log('Opened Playlist Page');
        // get total videos length 
        let totalVideos = await getTotalVideos(totalVideoSelector);

        console.log('Size of PlayList ' + totalVideos);

        // now we have total videos length, we have to scroll to the last element and get the duration of videos 
        // now get time stamps 
        let totalDuration = await scrollAndGetAllDuration(totalVideos);
        console.log('Got Duration of All Videos');
        console.log('Converting to visual data......');
        console.log(totalDuration);
        await browser.close();
    } catch (e) {
        console.log(e);
    }


    async function scrollAndGetAllDuration(totalVideos) {

        let totalDuration = await page.evaluate(async(tv, elemSelctor) => {

            let a = document.querySelectorAll(elemSelctor);

            let promise = new Promise((resolve, reject) => {

                console.log(a.length);

                let interval = setInterval(() => {
                    if (a.length != tv) {
                        let videoContainer = document.querySelector("#contents");
                        window.scrollTo(0, videoContainer.scrollHeight);
                        a = document.querySelectorAll(elemSelctor);
                    } else {
                        clearInterval(interval);
                        resolve();
                    }
                }, 500);
            });

            await promise;
            let allDurations = [];
            for (let i = 0; i < a.length; i++) {
                allDurations.push(hmsToSecondsOnly(a[i].innerText.trim()));
            }

            // convert into seconds 
            function hmsToSecondsOnly(str) {
                var p = str.split(':'),
                    s = 0,
                    m = 1;

                while (p.length > 0) {
                    s += m * parseInt(p.pop(), 10);
                    m *= 60;
                }

                return s;
            }

            return allDurations;
        }, totalVideos, allElementSelctor);

        return totalDuration;
    }

    async function getTotalVideos(totalVideoSelector) {
        await page.waitForSelector('.style-scope.yt-formatted-string');
        let totalVideos = await page.evaluate((s) => {
            let a = document.querySelectorAll(s);
            // to remove comma -> 1,00,00
            return Number(a[1].innerText.split(',').join(''));
        }, totalVideoSelector)

        return totalVideos;
    }
}



automation(playListLink);