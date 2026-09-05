const {test, expect} = require('@playwright/test');

test('login page test', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('input#username').fill('rahulshetty');
    await page.locator("[type='password']").fill('Learning@830$3mK2');
    await page.locator("[id='signInBtn']").click();
    await page.locator()
    console.log(await page.locator("[class='alert alert-danger col-md-12']").textContent());
    await expect(page.locator("[class='alert alert-danger col-md-12']")).toContainText("Incorrect");
})