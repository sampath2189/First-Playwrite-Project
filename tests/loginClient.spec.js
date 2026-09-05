const{test, expect} = require('@playwright/test');
test('login client test', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("[type='email']").fill("goneliw313@jobraux.com");
    await page.locator("[type='password']").fill("Sampathkumar@1");
    await page.locator("[name='login']").click();
    await page.locator("[class='card-body']").first().waitFor();
    console.log(await page.locator("[class='card-body']").allTextContents());
})