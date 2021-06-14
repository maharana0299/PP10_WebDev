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
    section: 2,
}
async function start({ metting_id }) {


    // puppeteer usage as normal
    try {

        browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-notifications", "--mute-audio", "--enable-automation", '--start-maximized'],
            ignoreDefaultArgs: true,
            slowmo: 50,
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

        await newPage.waitForSelector('.freebirdFormviewerComponentsQuestionBaseRoot');

        const elementHandles = await newPage.$$('.freebirdFormviewerComponentsQuestionBaseRoot');

        // here we have got all the elements
        console.log(elementHandles.length);

        for (let i = 0; i < elementHandles.length; i++) {
            // get names of the tag
            let name = await elementHandles[i].$eval('.freebirdFormviewerComponentsQuestionBaseHeader', x => x.innerText);

            let input = await elementHandles[i].$('input ');
            let radio = await elementHandles[i].$('.freebirdFormviewerViewItemsRadiogroupRadioGroup')
            let dropDown = await elementHandles[i].$('.quantumWizMenuPaperselectOptionList');
            await newPage.waitForTimeout(1000);
            name = name.toLowerCase();
            if (radio) {
                // .freebirdFormviewerComponentsQuestionRadioChoice
                console.log('radio ' + name);

                // let radioOptions = await radio.$$('.freebirdFormviewerComponentsQuestionRadioChoice');
                // console.log(radioOptions[0]);
                await newPage.waitForSelector('.freebirdFormviewerComponentsQuestionRadioChoice');
                await newPage.waitForTimeout(1000);
                // todo
                let n = await elementHandles[i].$$('.freebirdFormviewerComponentsQuestionRadioChoice');
                console.log(n.length);
                await n[1].click()
            } else if (dropDown) {
                // quantumWizMenuPaperselectContent exportContent
                console.log("Dropdown");
                console.log(name);
                if (name.includes('class'))
                    await fillDropDownClass(elementHandles[i]);
            } else if (input) {


                if (name.includes('name')) {
                    await input.type(data.name);
                } else if (name.includes('email')) {
                    await input.type(data.email);
                } else if (name.includes('enroll')) {
                    await input.type(data.enroll);
                } else if (name.includes('class')) {
                    await input.type(data.class);
                }
                console.log('input ' + name);
            }
            // console.log(name);
        }

        async function fillDropDownClass(ele) {


            let a = await ele.$('.quantumWizMenuPaperselectContent');
            await newPage.waitForTimeout(1000);
            a.click();
            await newPage.waitForTimeout(1000);

            let allDropDowns = await ele.$$('.quantumWizMenuPaperselectOption[role="option"]');
            for (let i = 0; i < allDropDowns.length; i++) {
                let text = await allDropDowns[i].$eval('.quantumWizMenuPaperselectContent', x => x.innerText);
                if (text.includes(data.section)) {
                    await newPage.waitForTimeout(1000);
                    await allDropDowns[i].click();
                }
            }
        }

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