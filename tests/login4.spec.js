const{expect, test} = require("@playwright/test");
test("login check box test", async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("input#username").fill("rahulshettyacademy");
    await page.locator("input#password").fill("Learning@830$3mK2");
    await page.locator("span.checkmark").last().click();
    await page.locator("button#okayBtn").click();
    expect(await page.locator("span.checkmark").last().isChecked()).toBeTruthy();
    const terms = page.locator("input#terms");
    await terms.click();
    console.log(await terms.isChecked());
    expect(await terms.isChecked()).toBeTruthy();
    await expect(page.locator("[href*='documents-request']")).toHaveAttribute("class","blinkingText");
})



