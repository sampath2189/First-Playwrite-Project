const {test, expect} = require('@playwright/test')

test('Page Playwright test', async ({page})=>{
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    console.log(await page.title());
})