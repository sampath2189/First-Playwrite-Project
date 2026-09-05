    const{expect, test} = require('@playwright/test');
    test('rahulsheety academy login page', async ({page})=>{
        await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
        const userName = page.locator('#username');
        const passWord = page.locator('.form-control').nth(1);
        const signIn = page.locator("[id='signInBtn']");

        await userName.fill('rahul');
        await passWord.fill('password');
        await signIn.click();
        //style="display: block;"
        console.log(await page.locator("[style*='block']").textContent());
        await expect(page.locator("[style='display: block;']")).toContainText("Incorrect");
        await userName.fill("");
        await passWord.fill("");
        await userName.fill('rahulshettyacademy');
        await passWord.fill('Learning@830$3mK2');
        await signIn.click();

        console.log(await page.locator("div h4").nth(0).textContent());
        console.log(await page.locator("div h4").nth(1).textContent());
        console.log(await page.locator("div h4").first().textContent());
        console.log(await page.locator("div h4").allTextContents());
    
    })