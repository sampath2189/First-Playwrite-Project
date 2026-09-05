const{expect, test} = require("@playwright/test");

test('child window handle', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator("#username");
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const documentLink = page.locator("[href*='https://rahulshettyacademy.com/document']");
    const recruitersPageLink = page.locator("[href='https://techsmarthire.com/']");

    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click(),
        ])
    const [newPage2] = await Promise.all([
        context.waitForEvent('page'),
        recruitersPageLink.click()
    ]);

    const arrayText = await newPage.locator("[class='im-para red']").textContent();
    const domain = arrayText.split("@")[1].split(" ")[0];
    await userName.fill(domain);
    console.log(await userName.inputValue());

})