const puppeteer = require('puppeteer');



// when we open any webpage, if any ad's come, we will close it
async function bandData(url) {
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


    } catch (e) {
        console.log(e);
    }

    // await browser.close();
}

let url = 'http://the-internet.herokuapp.com';
bandData(url);