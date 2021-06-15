const puppeteer = require('puppeteer');
const fs = require('fs');
const https = require('https');


// download images of all products

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


        await page.waitForSelector('.form_input');
        console.log('Sigining In.....');
        await page.type('#user-name', 'standard_user');
        await page.type('#password', 'secret_sauce');

        await Promise.all([page.click('#login-button'), page.waitForNavigation()]);
        await page.waitForSelector('.inventory_list img');

        // one method
        const download = (url, destination) => new Promise((resolve, reject) => {
            const file = fs.createWriteStream(destination);

            https.get(url, response => {
                response.pipe(file);

                file.on('finish', () => {
                    file.close(resolve(true));
                });
            }).on('error', error => {
                fs.unlink(destination);

                reject(error.message);
            });
        });

        let imagesUrl = await page.evaluate(async() => {

            let images = document.querySelectorAll('.inventory_list img');
            return Array.from(images, e => e.src);
        });


        for (let i = 0; i < imagesUrl.length; i++) {
            // result = await download(imagesUrl[i], `image-${i}.png`);

            // if (result === true) {
            //     console.log('Success:', imagesUrl[i], 'has been downloaded successfully.');
            // } else {
            //     console.log('Error:', imagesUrl[i], 'was not downloaded.');
            //     console.error(result);
            // }
            // console.log(imagesUrl[i]);

            await donwloadImage(url, i);
        }


        // second method
        function donwloadImage(url, i) {
            return new Promise((res, rej) => {
                page.evaluate((url, i) => {

                    // create an anchor tag
                    let anchor = document.createElement("a");
                    anchor.href = url;
                    anchor.download = `image-from-anchor-${i}.jpg`;
                    anchor.click();
                }, url, i).then(() => {
                    console.log('Donwloded.....');
                    res();
                })
            });
        }

        await browser.close();

    } catch (e) {
        console.log(e);
    }
}
let url = 'https://www.saucedemo.com/';
bandData(url);