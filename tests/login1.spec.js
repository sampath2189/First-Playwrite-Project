const { test, expect } = require('@playwright/test');

test('Amazon login test', async ({ page }) => {
    await page.goto("https://www.amazon.in/");
    await page.locator('input#twotabsearchtextbox').fill('mobiles');
    await page.locator('input#nav-search-submit-button').click();
    console.log(await page.locator("[class='a-color-state a-text-bold']").textContent())
    expect(await page.locator("[class='a-color-state a-text-bold']")).toContainText("mobiles");
});