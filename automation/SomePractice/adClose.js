const puppeteer = require('puppeteer');

let aTagEntry = `a[href='/entry_ad']`;

// when we open any webpage, if any ad's come, we will close it
async function closeAd(url) {
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

        // await page.waitForSelector(aTagEntry);
        // console.log('Opening ads....');
        // await Promise.all([
        //     page.click(aTagEntry),
        //     page.waitForNavigation(),
        // ]);
        await page.waitForSelector('ul');

        let link = await page.evaluate(() => {
            let a = document.querySelectorAll('li')[14];
            let link = 'http://the-internet.herokuapp.com/' + a.querySelector('a').getAttribute('href');

            return link;
        });

        console.log(link);

        page.goto(link);
        // same chiz using eval

        await page.waitForSelector('.modal-footer > p', { visible: true });
        await page.click('.modal-footer > p');


    } catch (e) {
        console.log(e);
    }

    // await browser.close();
}

let url = 'http://the-internet.herokuapp.com';
closeAd(url);