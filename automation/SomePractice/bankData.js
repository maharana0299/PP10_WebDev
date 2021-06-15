const puppeteer = require('puppeteer');



// how much we have spent most on ?

async function bandData(url) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
            slowMo: 50, // for slowing a bit 
            defaultViewport: null, // null the default viewport 
            args: ["--start-maximized"], // for full screen
        });

        console.log('Launched......');
        const page = (await browser.pages())[0];
        await page.goto(url);
        console.log('Going to url....');

        await page.waitForSelector('.form-group input');

        await page.type('#username', 'username');
        await page.type('#password', 'password');

        await Promise.all([page.click('#log-in'), page.waitForNavigation()]);

        await page.waitForSelector('table');

        // now extract data

        let maxSpent = await page.evaluate(() => {
            let allTars = document.querySelectorAll('tbody tr');
            let allAmounts = [];
            let allDescriptions = [];

            for (let i = 0; i < allTars.length; i++) {
                let allTd = allTars[i].querySelectorAll('td');
                allAmounts.push(allTd[allTd.length - 1].innerText);

                allDescriptions.push(allTd[2].innerText);
            }

            for (let i = 0; i < allAmounts.length; i++) {
                let a = allAmounts[i].split(" ");
                let b = a[1].split(",");
                a[1] = b.join("");
                allAmounts[i] = Number(a[0] + a[1]);
            }

            let maxSpent = 0;
            let index = -1;
            for (let i = 0; i < allAmounts.length; i++) {

                if (allAmounts[i] < maxSpent) {
                    maxSpent = allAmounts[i];
                    index = i;
                }
            }

            return "We Have Spent " + (-maxSpent) + " on " + allDescriptions[index];
        });

        console.log(maxSpent);

        await browser.close();
    } catch (e) {
        console.log(e);
    }


}

let url = 'https://demo.applitools.com';
bandData(url);