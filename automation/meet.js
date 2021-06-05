const puppeteer = require('puppeteer-extra')
const id = "nirbhay0227@gmail.com";
const pass = "tanish_team";
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
let page;
let browser;
var data = {
    name: 'Nirbhay',
    class: 'CSE-2',
    enroll: '40413202718',
    email: "nirbhay0299@gmail.com",
}
async function start({ metting_id }) {


    // puppeteer usage as normal
    try {

        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-notifications", "--mute-audio", "--enable-automation", '--start-maximized'],
            ignoreDefaultArgs: true
        });

        await fillForm({ url: 'https://docs.google.com/forms/d/e/1FAIpQLSf5a3KjIyUERQgtg1GZIwnao_GZ9yBQxOboHAL6XH37UXqyxQ/viewform' }, data)
            // await doAutomation();
            // await browser.close();

    } catch (err) {
        console.log(err);
    }
}

async function afterJoiningMeet() {
    // open chat section and send a message to all

    // waiting until join the metting

    await page.waitForSelector('[data-self-name="You"]', );
    console.log('here we are ');
    // opening chat
    for (i = 1; i <= 11; i++) {
        await page.keyboard.press('Tab');
        await page.waitForTimeout(400);
    }

    await page.keyboard.press('Enter');

    // waiting for a link
    await page.waitForSelector('a[href]');
    // console.log("Got!!");
    await page.waitForTimeout(1000);

    let obj = await page.evaluate(() => {
        let a = document.querySelectorAll('div a[href]');

        let url = a[0].href;
        let obj = { url: url };
        return obj;
    });

    console.log(obj);


    await fillForm(obj);
    // let newpage =
    // await page.click('a[href]');
    // console.log(page.url());
    // var page2 = await browser.targets()[browser.targets().length - 1].page();
    // console.log(page2.url());

}

async function fillForm(obj, data) {

    try {
        let newPage = await browser.newPage();
        await newPage.goto(obj.url);
        await newPage.waitForNavigation();

        await newPage.waitForSelector('.freebirdFormviewerComponentsQuestionBaseRoot input');

        // need to optimize this
        const elementHandle = await newPage.$$('.freebirdFormviewerComponentsQuestionBaseRoot input');

        // getting type
        const attr = await newPage.$$eval('.freebirdFormviewerComponentsQuestionBaseRoot input', el => el.map(x => x.getAttribute("type")));
        console.log(attr);
        // getting text name 
        const feild = await newPage.$$eval('.freebirdFormviewerComponentsQuestionBaseRoot .freebirdFormviewerComponentsQuestionBaseHeader',
            el => el.map(x => x.innerText));
        console.log(feild);

        for (let i = 0; i < elementHandle.length; i++) {

            if (feild[i].includes('Name') && attr[i] == 'text') {
                await elementHandle[i].type(data.name);
            } else if (feild[i].includes('nrollment') && attr[i] == 'text') {
                await elementHandle[i].type(data.enroll);
            } else if (feild[i].includes('mail') && attr[i] == 'text') {
                await elementHandle[i].type(data.email);
            } else if (feild[i].includes('lass') && attr[i] == 'text') {
                await elementHandle[i].type(data.class);
            }
        }


        // const ele = await newPage.waitForSelector('.freebirdFormviewerComponentsQuestionBaseRoot input');
        // await ele.type('.freebirdFormviewerComponentsQuestionBaseRoot input', "nifjnlksjf");
        // console.log(ele);


    } catch (e) {
        console.log(e);
    }
}
async function siginToGoogle() {
    // typing out email
    await page.waitForSelector('input[type="email"]');
    await page.click('input[type="email"]');
    // await page.waitForNavigation();

    await page.keyboard.type(`${id}`, {
        delay: 200
    }); // replace XXXXX with your original email, before the @gmail.com
    await page.waitForTimeout(2000);

    await page.waitForSelector("#identifierNext");
    await page.click("#identifierNext");

    // typing out password
    await page.waitForTimeout(3500);
    await page.keyboard.type(`${page}`, { delay: 200 }); // replace YYYYY with your original password
    await page.waitForTimeout(800);
    await Promise.all([page.keyboard.press('Enter'), page.waitForNavigation()]);
}

async function joinMeet() {

    try {
        await page.waitForTimeout(2500);

        await page.goto("https://meet.google.com/");

        await page.waitForSelector('input[type="text"]');

        await Promise.all([page.click('input[type="text"]'), page.waitForTimeout(1000)]);

        await page.keyboard.type(`${metting_id}`, { delay: 200 }); // replace aaa-bbbb-ccc with the required Google Meet Code
        await page.waitForTimeout(800);

        await Promise.all([page.keyboard.press('Enter'), await page.waitForNavigation()]);
        // turn off cam using Ctrl+E
        await page.waitForTimeout(8000);
        await page.keyboard.down('ControlLeft');
        await page.keyboard.press('KeyE');
        await page.keyboard.up('ControlLeft');
        await page.waitForTimeout(2000);

        //turn off mic using Ctrl+D
        await page.waitForTimeout(1000);
        await page.keyboard.down('ControlLeft');
        await page.keyboard.press('KeyD');
        await page.keyboard.up('ControlLeft');
        await page.waitForTimeout(2000);

        // Join Now
        var i;
        for (i = 1; i <= 9; i++) {
            await page.keyboard.press('Tab');
        }

        await Promise.all([page.keyboard.press('Enter')]);
    } catch (e) {
        console.log(e);
    }
}

async function doAutomation() {
    let pages = await browser.pages();
    page = pages[0];
    const navigationPromise = page.waitForNavigation();
    await page.goto("https://accounts.google.com/");

    const context = browser.defaultBrowserContext();
    await context.overridePermissions(
        "https://meet.google.com/", ["microphone", "camera", "notifications"]
    );

    await page.setDefaultTimeout(3600000);

    // // await page.setDefaultNavigationTimeout(0); // disable timeout error 

    await siginToGoogle();

    // going to Meet after signing in
    console.log('joined');
    await joinMeet();
    console.log('after');
    await afterJoiningMeet();

}

// wfp-aavb-vma
let metting_id = (process.argv[2]);
start({ metting_id: metting_id });