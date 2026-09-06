import{test, expect} from "@playwright/test";
const email = "practice@expandtesting.com";
const OTP = "214365";

test("Login with default OTP", async({page})=>{
    await page.goto("https://practice.expandtesting.com/otp-login");
    await page.getByLabel("Your Email Address").fill(email);
    await page.locator("#btn-send-otp").click();
    await page.getByPlaceholder("Enter OTP code").fill(OTP);
    await page.getByRole("button", {name: "Verify OTP Code"}).click();
    await expect(page.getByText("You logged into a secure area!")).toBeVisible();
})


