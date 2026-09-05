const{test, expect} = require("@playwright/test");
const { text } = require("node:stream/consumers");
test('End to end test case', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/");
    await page.locator("#userEmail").fill("goneliw313@jobraux.com");
    await page.locator("#userPassword").fill("Sampathkumar@1");
    await page.locator("#login").click();
    await page.locator("[class='btn w-10 rounded']").nth(1).click();
    await page.locator("[routerlink='/dashboard/cart']").click();
    await page.locator('button.btn.btn-primary:has-text("checkout")').click();

    await page.locator("[placeholder='Select Country']").click();
    await page.locator("[placeholder='Select Country']").pressSequentially("India", {delay: 100});
    const option = page.locator("[class='ta-item list-group-item ng-star-inserted']").filter({ hasText: /India$/ });
    await option.click();

    await page.locator("div div input").nth(1).fill("00000");
    await page.locator("div div input").nth(2).fill("Jaan");
    await page.locator("div div input").nth(3).fill("rahulshettyacademy");
    await page.locator("[type='submit']").click();

    await page.locator("[class='btnn action__submit ng-star-inserted']").click();
    const orderID = (await page.locator("tr td label").nth(1).textContent()).replace(/[^a-zA-Z0-9]/g, '');
    console.log(orderID);

    //await page.locator("[routerlink='/dashboard/myorders']").filter({ hasText: "Orders History Page" }).click();
    await page.locator("[routerlink='/dashboard/myorders']").filter({ hasText: "Orders History Page" }).click();
    await page.waitForURL('https://rahulshettyacademy.com/client/#/dashboard/myorders');
    await page.waitForLoadState('networkidle');
    await page.locator("tr").filter({ hasText: orderID }).locator("button.btn.btn-primary").click();
    
})