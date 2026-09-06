import{test, expect} from '@playwright/test';
const baseurl = "https://eventhub.rahulshettyacademy.com";
const userID = "dummy12@gmail.com";
const password = "Dummy@12";

const login = async (page) => {
    await page.goto(baseurl);
    await page.getByPlaceholder("you@email.com").fill(userID);
    await page.getByPlaceholder("••••••").fill(password);
    await page.getByRole("button", {name: "Sign In"}).click();
    await expect(page.getByRole("link", {name: "Browse Events →"})).toBeVisible();
}

test("Single ticket booking is eligible for refund", async ({page})=>{
    await login(page);
    await page.goto(`${baseurl}/events`);
    await page.getByRole("link",{name:"Book Now"}).first().click();
    await page.getByPlaceholder("Your full name").fill("Dummy Name");
    await page.getByPlaceholder("you@email.com").fill(userID);
    await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");
    await page.getByRole("button", {name:"Confirm Booking"}).click();
    await page.getByRole('button', {name:'View My Bookings'}).click();
    await expect(page).toHaveURL(`${baseurl}/bookings`);
    await page.getByRole("link",{name:"View Details"}).first().click();
    await expect(page.getByText("Booking Information")).toBeVisible();
    const bookingRef = await page.locator("span[class='text-gray-900 font-mono']").innerText();
    console.log(bookingRef);
    const eventTitle = await page.locator("h1[class='text-2xl font-bold text-gray-900']").innerText();
    console.log(eventTitle);
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
    await page.locator("button[data-testid='check-refund-btn']").click();
    await expect(page.getByText("Checking your refund eligibility…")).toBeVisible();
    await expect(page.getByText("Checking your refund eligibility…")).not.toBeVisible({ timeout: 6000 });
    const refundResult = page.locator("#refund-result");
    await expect(refundResult).toBeVisible();
    await expect(refundResult).toContainText("Eligible for refund");
    await expect(refundResult).toContainText("Single-ticket bookings qualify for a full refund");
});

test("Group ticket booking is NOT eligible for refund", async ({ page }) => {
    await login(page);
    await page.goto(`${baseurl}/events`);
    await page.getByRole("link",{name:"Book Now"}).last().click();
    await page.getByPlaceholder("Your full name").fill("Dummy Name");
    await page.getByPlaceholder("you@email.com").fill(userID);
    await page.getByPlaceholder("+91 98765 43210").fill("+91 98765 43210");

    for(let i=0; i<2; i++){
        await page.getByRole("button", {name:"+"}).click();
    }

    await page.getByRole("button", {name:"Confirm Booking"}).click();
    await page.getByRole('button', {name:'View My Bookings'}).click();
    await expect(page).toHaveURL(`${baseurl}/bookings`);
    await page.getByRole("link",{name:"View Details"}).first().click();
    await expect(page.getByText("Booking Information")).toBeVisible();
    const bookingRef = await page.locator("span[class='text-gray-900 font-mono']").innerText();
    console.log(bookingRef);
    const eventTitle = await page.locator("h1[class='text-2xl font-bold text-gray-900']").innerText();
    console.log(eventTitle);
    expect(bookingRef.charAt(0)).toBe(eventTitle.charAt(0));
    await page.locator("button[data-testid='check-refund-btn']").click();
    await expect(page.getByText("Checking your refund eligibility…")).toBeVisible();
    await expect(page.getByText("Checking your refund eligibility…")).not.toBeVisible({ timeout: 6000 });
    const refundResult = page.locator("#refund-result");
    await expect(refundResult).toContainText("Not eligible for refund");
    await expect(refundResult).toContainText("Group bookings (3 tickets) are non-refundable");
    
})
