const puppeteer = require('puppeteer-extra')
const id = "nirbhay0227@gmail.com";
const pass = "tanish_team";
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
var data = {
    name: 'Nirbhay',
    class: 'CSE-2',
    enroll: '40413202718',
    email: "nirbhay0299@gmail.com",
}
async function googleForms(link) {

    try {
        let browser = await puppeteer.launch({
            headless: false,
            args: ["--disable-notifications", "--mute-audio", "--enable-automation", '--start-maximized'],
            ignoreDefaultArgs: true
        });

        let newPage = await browser.newPage();
        await newPage.goto(link);

        await newPage.waitForSelector('.quantumWizMenuPaperselectRipple');
        await newPage.waitForTimeout(1000);

        // await newPage.evaluate(() => {
        //     let a = document.querySelector('.quantumWizMenuPaperselectContent')
        //     a.click();
        // })

        await fillDropDown(newPage);
        // await newPage.evaluate(() => {

        //     let ops = document.querySelectorAll('.quantumWizMenuPaperselectOption[role="option"] .quantumWizMenuPaperselectContent ')
        //     ops[3].click();
        // })


    } catch (e) {
        console.log(e);
    }

}

async function fillDropDown(newPage) {


    let a = await newPage.$('.quantumWizMenuPaperselectContent');
    await newPage.waitForTimeout(1000);
    a.click();
    await newPage.waitForTimeout(1000);

    let allDropDowns = await newPage.$$('.quantumWizMenuPaperselectOption[role="option"]');
    for (let i = 0; i < allDropDowns.length; i++) {
        let text = await allDropDowns[i].$eval('.quantumWizMenuPaperselectContent', x => x.innerText);
        if (text.includes('2')) {
            await newPage.waitForTimeout(1000);
            await allDropDowns[i].click();
        }
    }
}

googleForms('https://docs.google.com/forms/d/e/1FAIpQLSf5a3KjIyUERQgtg1GZIwnao_GZ9yBQxOboHAL6XH37UXqyxQ/viewform');