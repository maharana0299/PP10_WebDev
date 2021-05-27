// require puppeteer
const puppeteer = require('puppeteer');
let gpage;

// lanuching the browser and then retur a new page 
// after it, we goto a specific page bt using page.goto
puppeteer
    .launch({ headless: false })
    .then((browser) => {
        return browser.newPage();
    })
    .then(function(page) {
        gpage = page;
        // all puppteer function returns a promise 
        return page.goto('https://www.google.com/')
    })
    .then(() => {
        // taking screenshot
        // return gpage.screenshot({ path: 'ss.png' });
        return gpage.type('.gLFyf.gsfi', "Dogs")
    })
    .then(() => {
        return gpage.screenshot({ path: 'ss.png' });
    })
    .catch(function(err) {
        // if any error then catch the error and print it
        console.log(err);
    })