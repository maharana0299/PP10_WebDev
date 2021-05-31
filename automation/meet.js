const puppeteer = require('puppeteer-extra')

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())

function start({ metting_id }) {


    // puppeteer usage as normal
    puppeteer.launch({
            headless: false,
            args: ["--disable-notifications", "--mute-audio", "--enable-automation", '--start-maximized'],
            ignoreDefaultArgs: true
        }).then(async browser => {
            const page = await browser.newPage();
            const navigationPromise = page.waitForNavigation();
            await page.goto("https://accounts.google.com/");

            const context = browser.defaultBrowserContext();
            await context.overridePermissions(
                "https://meet.google.com/", ["microphone", "camera", "notifications"]
            );

            await navigationPromise;

            await page.setDefaultTimeout(3600000);

            // await page.setDefaultNavigationTimeout(0); // disable timeout error 

            // typing out email
            await page.waitForSelector('input[type="email"]');
            await page.click('input[type="email"]');
            await navigationPromise;

            await page.keyboard.type(`nk02061999@gmail.com`, {
                delay: 300
            }); // rep lace XXXXX with your original email, before the @gmail.com
            await page.waitForTimeout(2000);

            await page.waitForSelector("#identifierNext");
            await page.click("#identifierNext");

            // typing out password
            await page.waitForTimeout(3500);
            await page.keyboard.type(`IamMahaRana`, { delay: 200 }); // replace YYYYY with your original password
            await page.waitForTimeout(800);
            await page.keyboard.press('Enter');
            await navigationPromise;

            // going to Meet after signing in
            await page.waitForTimeout(2500);
            await page.goto("https://meet.google.com/");
            await page.waitForSelector('input[type="text"]');
            await page.click('input[type="text"]');
            await page.waitForTimeout(1000);

            await page.keyboard.type(`${metting_id}`, { delay: 200 }); // replace aaa-bbbb-ccc with the required Google Meet Code
            await page.waitForTimeout(800);
            await page.keyboard.press('Enter');
            await navigationPromise;
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
                await page.waitForTimeout();
            }

            await page.keyboard.press('Enter');
            await navigationPromise;

            // open chat section and send a message to all
            await page.waitForTimeout(3000);

            // waiting until join the metting
            await page.waitForSelector('[data-self-name="You"]');

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
            await page.click('a[href]');
            // await page.waitForNavigation();
            // await browser.close();
            console.log(page.url());
            var page2 = await browser.targets()[browser.targets().length - 1].page();
            console.log(page2.url());
            // npage.waitForNavigation();
            // console.log(napge);
            // console.log(pages.length)
        })
        .catch((err) => {
            console.log(err);
        })
}

// wfp-aavb-vma
// console.log(process.argv[2]);
start({ metting_id: process.argv[2] });