let { email, password } = require('./creds.js');
const pup = require('puppeteer');

async function hack() {

    try {

        let browser = await pup.launch({
            headless: false,
            defaultViewport: null,
            args: ['--start-maximized'],
            slowMo: 50, // to slow things up by x millis
        })

        let pages = await (browser).pages();

        let gpage = pages[0];
        await gpage.goto('https://www.hackerrank.com/auth/login');

        await gpage.type('#input-1', email);
        await gpage.type('#input-2', password);

        await Promise.all([
            gpage.waitForNavigation(),
            gpage.click('[data-analytics="LoginPassword"]')
        ]);

        await Promise.all([
            gpage.waitForNavigation(), // wait for navigation to next page
            gpage.click('[data-attr1="interview-preparation-kit"]')
        ]);

        await gpage.waitForSelector('[data-attr1="warmup"]'); // wait uniti this element comes/load

        await Promise.all([
            gpage.waitForNavigation(),
            gpage.click('[data-attr1="warmup"]')
        ]);

        await gpage.waitForSelector('.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled'); // wait uniti this element comes/load

        await Promise.all([
            gpage.waitForNavigation(),
            gpage.click('.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled')
        ]);

        await gpage.waitForSelector('[data-attr2="Editorial"]'); // wait uniti this element comes/load

        await Promise.all([
            gpage.waitForNavigation(),
            gpage.click('[data-attr2="Editorial"]')
        ]);

        await handleLockBtn('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled', gpage);

    } catch (err) {
        console.log(err);
    }
};

hack();

function handleLockBtn(selector, gpage) {
    return new Promise(function(resolve, reject) {
        // lets try to click 
        gpage.waitForSelector(selector)
            .then(() => {
                return gpage.click(selector);
            })
            .then(() => {
                // runs if upr wala is resovled 
                // means lock button is clicked 
                // clicked first time 
                resolve();
            })
            .catch((err) => {
                // no button exist then simply resolve
                resolve();
            })
    });
}