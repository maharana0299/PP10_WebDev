const pup = require('puppeteer');
let { password, uname, uid } = require('./consts.js');

let automationTask = async() => {
    try {
        let browser = await pup.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized'],
            slowMo: 50, // to slow things up by x millis
        })

        let pages = await (browser).pages();
        let page = pages[0];
        // login 
        await loginToTwitter(page);
    } catch (e) {
        console.log(e);
    }
}

automationTask();
async function loginToTwitter(page) {

    await page.goto(`https://twitter.com/login`);

    await page.waitForSelector('body');
    await page.focus('body');

    await page.keyboard.type(uid, { delay: 100 });
    await page.keyboard.press('Tab');
    await page.keyboard.type(password, { delay: 100 });
    await Promise.all([page.keyboard.press('Enter'), page.waitForNavigation()]);

    await page.waitForSelector('[aria-label="Search query"]');
    await page.click('[aria-label="Search query"]');

    await page.waitForTimeout();

    await page.type('[aria-label="Search query"]', 'Covid Oxygen Need');
    await Promise.all([page.keyboard.press('Enter'), page.waitForNavigation()]);

    await page.waitForSelector('[role="article"] div[data-testid="tweet"]');
    let json = await page.evaluate(() => {
        // this section runs in browser not in nodejs
        let j = [];
        // array of codes
        let somePosts = document.querySelectorAll(
            '[role="article"] div[data-testid="tweet"]'
        );

        // we have to return code of first language which is stored at 0 th pos 
        for (let i = 0; i < somePosts.length; i++) {
            let obj = {
                post: somePosts[i].innerText,
            }

            j.push(obj)
        }
        return j;
    })

    console.log(json);
}