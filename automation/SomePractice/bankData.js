const puppeteer = require('puppeteer');



// when we open any webpage, if any ad's come, we will close it
async function bandData(url) {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 50, // for slowing a bit 
            defaultViewport: null, // null the default viewport 
            args: ["--start-maximized"], // for full screen
        });

        console.log('Launched......');
        const page = (await browser.pages())[0];
        await page.goto(url);
        console.log('Going to url....');

        await page.waitForSelector('.form-group input');

        await page.type('#username', 'username');
        await page.type('#password', 'password');

        await Promise.all([page.click('#log-in'), page.waitForNavigation()]);

        await page.waitForSelector('table');

        // now extract data

        await page.evaluate(() => {

        });
    } catch (e) {
        console.log(e);
    }

    // await browser.close();
}

let url = 'https://demo.applitools.com';
bandData(url);