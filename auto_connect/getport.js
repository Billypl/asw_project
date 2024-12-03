require('dotenv').config();
const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Log in to the page
    await page.goto('https://www.pitunnel.com/login');
    await page.type('input[name="email"]', process.env.EMAIL);
    await page.type('input[name="password"]', process.env.PASSWORD);
    await page.click('input[type="submit"]');

    // Wait for the page to load and then navigate to the active page
    await page.waitForNavigation();
    await page.goto('https://www.pitunnel.com/active');
    // Wait for devices secton to load
    await page.waitForFunction(() => {
        const tableDiv = document.querySelector('#table_div');
        return tableDiv && tableDiv.children.length > 0;
    }, { timeout: 10000 });
    const data = await page.content();

    // Get devices table
    const tableRows = await page.$$eval('#table_div table tbody tr', (rows) => {
        return rows.map(row => {
            const cells = row.querySelectorAll('td');
            return {
                type: cells[0]?.innerText,
                availableAt: cells[1]?.innerText,
                destination: cells[2]?.innerText,
                name: cells[3]?.innerText,
            };
        });
    });
    /* tableRows STRUCTURE
     [
        {
            type: 'Custom',
            availableAt: 'ADRESS:PORT',
            destination: 'localhost:22',
            name: 'ssh'
        }
     ] 
    */

    // Extract port info
    tableRows.forEach(row => {
        const portMatch = row.availableAt?.match(/:(\d+)/);
        if (portMatch) {
            console.log(portMatch[1]);
        }
    });

    await browser.close();
})();
