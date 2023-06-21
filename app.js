const puppeteer = require("puppeteer");

(async () => {  

    const browser = await puppeteer.launch({headless : 'new' , executablePath : '/Users/krishaanbhagat/Desktop/Puppeteer/node_modules/@puppeteer/browsers/chrome-mac/Chromium.app/Contents/MacOS/Chromium' });
    const page = await browser.newPage(); // opens a new tab in browser
    await page.goto("https://app.prizepicks.com/", {waitUntil: "domcontentloaded"});
    await page.waitForSelector('#projections').then(() => console.log('yayy'));
    await page.screenshot({path : "step1.png"});
    page.setDefaultTimeout(3000000);


    const playerGrabber = await page.evaluate (() => {
        const pgTag = document.querySelectorAll(".name");
        let adder = [];
        pgTag.forEach((player) => {
            adder.push(player.innerHTML);
        });
        return adder;
    })


    //Shows all leagues available on prizepicks
    const leagueGrabber = await page.evaluate (() => {
        const pgTag = document.querySelectorAll(".league .name");
        let adder = [];
        pgTag.forEach((league) => {
            adder.push(league.innerHTML);
        });
        return adder;
    });

    //Shows all stats available on this league
    const statContainer = await page.evaluate (() => {
        return document.querySelectorAll(".stat-container")[0].innerText.split('\n');    
    });

    //Check if it changes leagues properly
    const statCheck = await page.evaluate (() => {
        let pgTag =  document.querySelectorAll(".stat-container");
        let array = [];
        pgTag.forEach((stat) => {
            array.push(stat.innerHTML);
        });
        return array;
    });

    const leagueCheck = await page.evaluate (() => {
         let pgTag = document.querySelectorAll('.league.selected');
         let adder = [];
         pgTag.forEach((tag) => {
            adder.push(tag.innerHTML);
         });
         return adder;
    });

    var allLeagues = leagueGrabber; //shows leagues
    console.log(playerGrabber);
    await page.click('button[class="sc-crXcEl eGYtH"]'); //passes the popup
    await page.screenshot({path : "step2.png"});

    //checks if I can surf to MLB leaagues
    await page.click('div[class="sc-gGnURB eSxqOI league-icon basketball"]');
    await page.waitForSelector(".league.selected .sc-gGnURB.eSxqOI.league-icon.basketball");
    await page.screenshot({path : "step3.png"});
    //console.log(statContainer);
    //console.log(leagueContainer);
    //console.log(leagueCheck);
    await page.click('div[class = "stat "]');
    await page.screenshot({path : "step4.png"});
    await page.close();
    process.exit(); //need this to close node js
})();

