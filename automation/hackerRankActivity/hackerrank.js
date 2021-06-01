let { email, password } = require('./creds.js');
const pup = require('puppeteer');
let gpage;
let gbrowser;

let codeInfo;
// waitfrnavigation only needed for click
pup.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-maximized'],
        slowMo: 50, // to slow things up by x millis
    })
    .then((browser) => {
        gbrowser = browser;
        return browser.pages();
    })
    .then((pages) => {
        gpage = pages[0];
        return gpage.goto('https://www.hackerrank.com/auth/login');
    })
    .then(() => {
        return gpage.type('#input-1', email);
    })
    .then(() => {
        return gpage.type('#input-2', password);
    })
    .then(() => {
        return Promise.all([
            gpage.waitForNavigation(),
            gpage.click('[data-analytics="LoginPassword"]')
        ]);
    })
    .then(() => {
        return Promise.all([
            gpage.waitForNavigation(), // wait for navigation to next page
            gpage.click('[data-attr1="interview-preparation-kit"]')
        ]);
    })
    .then(() => {
        return gpage.waitForSelector('[data-attr1="warmup"]'); // wait uniti this element comes/load
    })
    .then(() => {
        return Promise.all([
            gpage.waitForNavigation(),
            gpage.click('[data-attr1="warmup"]')
        ]);
    })
    .then(() => {
        // for a problem 
        return gpage.waitForSelector('.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled'); // wait uniti this element comes/load
    })
    .then(() => {
        return Promise.all([
            gpage.waitForNavigation(),
            gpage.click('.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled')
        ]);
    })
    .then(() => {
        // for editorial
        return gpage.waitForSelector('[data-attr2="Editorial"]'); // wait uniti this element comes/load
    })
    // wait for selector only waits for 30s rememebr
    .then(() => {
        return Promise.all([
            gpage.waitForNavigation(),
            gpage.click('[data-attr2="Editorial"]')
        ]);
    })
    .then(() => {
        // editorial selector 
        return handleLockBtn('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled');
    })
    .then(() => {

        // return gpage.$$('.challenge-editorial-block.editorial-setter-code');
        // it returns a promise of value which we are returning
        return gpage.evaluate(() => {
            // this section runs in browser not in nodejs

            // array of codes
            let allCodes = document.querySelectorAll(
                '.challenge-editorial-block.editorial-setter-code .highlight'
            );

            // arrays of languages 
            let allLannguages = document.querySelectorAll(
                '.challenge-editorial-block.editorial-setter-code h3'
            );

            // we have to return code of first language which is stored at 0 th pos 
            let obj = {
                code: allCodes[0].innerText,
                language: allLannguages[0].innerText,
            }

            return obj;
        })
    })
    .then((obj) => {
        codeInfo = obj;
        return Promise.all([gpage.waitForNavigation(),
            gpage.click('[data-attr2="Problem"]')
        ]);
    })
    .then(() => {
        // wait for the lang 
        return gpage.waitForSelector('.css-1hwfws3')
    })
    .then(() => {
        return gpage.click('.css-1hwfws3');
    })
    .then(() => {
        // type the language
        return gpage.type('.css-1hwfws3', codeInfo.language);
    })
    .then(() => {
        // press enter
        return gpage.keyboard.press('Enter')
    })
    .then(() => {
        return gpage.click('[type="checkbox"]');
    })
    .then(() => {
        return gpage.waitForSelector('#input-1');
    })
    .then(() => {
        return gpage.type('#input-1', codeInfo.code);
    })
    .then(() => {
        // press ctr c
        return gpage.keyboard.down("Control");
    })
    .then(() => {
        // press ctr a
        return gpage.keyboard.press("KeyA");
    })
    .then(() => {
        // press ctr x
        return gpage.keyboard.press("KeyX");
    })
    .then(() => {
        // releace ctrl
        return gpage.keyboard.down("Control");
    })
    .then(() => {
        return gpage.click('.hr-monaco-editor-parent')
    })
    .then(() => {
        console.log(codeInfo.code);
    })
    .then(() => {
        return gpage.keyboard.down('Control')
    })
    .then(() => {
        // press ctr a
        return gpage.keyboard.press("KeyA");
    })
    .then(() => {
        // press ctr v
        return gpage.keyboard.press("KeyV");
    })
    .then(() => {
        // release ctrl
        return gpage.keyboard.up("Control");
    })
    .then(() => {
        return Promise.all(
            gpage.waitForNavigation(),
            gpage.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled")
        );
    })
    .catch((err) => {
        console.log(err);

    })


// lets make a custom pomise questions 
// managed the error using handle lock button 
// important 
function handleLockBtn(selector) {
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