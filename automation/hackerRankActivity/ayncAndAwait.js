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

        // warmup section 
        await Promise.all([
            gpage.waitForNavigation(),
            gpage.click('[data-attr1="warmup"]')
        ]);

        // get all 4 questions 
        let questions = await getQuestions(gpage);
        console.log(questions.length);
        // clock first question
        // await gpage.waitForSelector('.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled'); // wait uniti this element comes/load

        // await Promise.all([
        //     gpage.waitForNavigation(),
        //     gpage.click('.ui-btn.ui-btn-normal.primary-cta.ui-btn-primary.ui-btn-styled')
        // ]);

        // await gpage.waitForSelector('[data-attr2="Editorial"]'); // wait uniti this element comes/load

        // // editorial 
        // await Promise.all([
        //     gpage.waitForNavigation(),
        //     gpage.click('[data-attr2="Editorial"]')
        // ]);

        // await handleLockBtn('.ui-btn.ui-btn-normal.ui-btn-primary.ui-btn-styled', gpage);

        // // returning code and language 
        // let codeInfo = await getCodes(gpage);

        // await Promise.all([gpage.waitForNavigation(),
        //     gpage.click('[data-attr2="Problem"]')
        // ]);

        // await pasteCodeAndSubmit(gpage, codeInfo);


    } catch (err) {
        console.log(err);
    }
};

hack();

function getQuestions(gpage) {
    return gpage.evaluate(() => {
        let a = document.querySelectorAll('h4');
        console.log(a);
        return a;
    })
}
async function pasteCodeAndSubmit(gpage, codeInfo) {

    await gpage.waitForSelector('.css-1hwfws3');
    await gpage.click('.css-1hwfws3');
    await gpage.type('.css-1hwfws3', codeInfo.language);
    await gpage.keyboard.press('Enter');

    await gpage.click('[type="checkbox"]');
    await gpage.waitForSelector('#input-1');

    // type the code
    await gpage.type('#input-1', codeInfo.code);

    await gpage.keyboard.down("Control");
    await gpage.keyboard.press("KeyA");
    await gpage.keyboard.press("KeyX");
    await gpage.keyboard.down("Control");

    await gpage.click('.hr-monaco-editor-parent')

    // select all and paste
    await gpage.keyboard.down('Control')
    await gpage.keyboard.press("KeyA");
    await gpage.keyboard.press("KeyV");
    await gpage.keyboard.up("Control");

    // await Promise.all(
    //     gpage.waitForNavigation(10000),
    //     gpage.click(".ui-btn.ui-btn-normal.ui-btn-primary.pull-right.hr-monaco-submit.ui-btn-styled")
    // );

    await gpage.goBack();
}

function getCodes(gpage) {
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
}

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