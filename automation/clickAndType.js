const pup = require('puppeteer');

let gpage;

pup.launch({
        headless: false,
        defaultViewport: null, // for nullifyinh the default viewport
        args: ['--start-maximized'] // to maximise the window
    })
    .then((browser) => {
        return browser.newPage();
    })
    .then((page) => {
        gpage = page;
        return page.goto('https://www.google.com/')
    })
    .then(() => {
        return gpage.type('.gLFyf.gsfi', "Dogs")
    })
    .then(() => {
        // returning multiple promises and if all the promises are resolved then we return 
        return Promise.all([gpage.waitForNavigation(),
            gpage.click('.FPdoLc.lJ9FBc .gNO89b')
        ]);
    })
    .then(() => {
        return Promise.all([gpage.waitForNavigation(),
            gpage.click('a[data-hveid="CAEQAw"]')
        ])
    })
    .then(() => {
        return gpage.screenshot({ path: 'ss.png' });
    })
    .catch(function(err) {
        console.log(err);
    })