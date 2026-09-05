const{test, expect} = require("@playwright/test");
const { text } = require("node:stream/consumers");
test('End to end test case', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("goneliw313@jobraux.com");
    await page.locator("#userPassword").fill("Sampathkumar@1");
    await page.locator("#login").click();
    const products = await page.locator(".card-body");
    const productName = 'ZARA COAT 3';
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

})