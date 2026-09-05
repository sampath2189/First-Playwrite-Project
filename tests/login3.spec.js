const{expect, test} = require('@playwright/test');
test('login practice radio butto', async ({page})=>{
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.locator("input#username").fill("rahulshettyacademy");
    await page.locator("input#password").fill("Learning@830$3mK2");
    //await page.locator("select.form-control").selectOption({label: "consult"});
    await page.locator("select.form-control").selectOption("consult");
    await page.locator("span.checkmark").last().click();
    await expect(page.locator("[class='modal-body']")).toContainText("You will be limited to only fewer functionalities of the app. Proceed?");
    await page.locator('button#okayBtn').click();
    await page.locator("input#signInBtn").click();
})