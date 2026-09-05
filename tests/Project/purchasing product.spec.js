import{test, expect} from '@playwright/test';

//helper function to login
const base_url = "https://eventhub.rahulshettyacademy.com";
const user_email    = 'dummy12@gmail.com';// update email and password with your account
const user_password = 'Dummy@12'; 
const phoneNumber = "+91 98765 43210";
async function login(page){
    await page.goto(base_url);
    await page.getByPlaceholder("you@email.com").fill(user_email);
    await page.getByPlaceholder("••••••").fill(user_password);
    await page.getByRole("button", {name: "Sign In"}).click();
}
test('Script Practice', async ({page})=>{
    await login(page);
    await expect (page.getByRole("link", {name: "Browse Events →"})).toBeVisible();
    await page.goto(`${base_url}/admin/events`);
    const eventName = `Test Event on ${Date.now()}`;
    await page.locator("#event-title-input").fill(eventName);
    await page.locator("textarea").fill("Playwright Test Event Description");
    await page.getByLabel("City").fill("Hyderabad");
    await page.getByLabel("Venue").fill("Westin Hotel Mind Space");
    await page.getByLabel("Event Date & Time").fill("2026-09-30T10:00");
    await page.getByLabel("Price ($)").fill("1000");
    await page.getByLabel("Total Seats").fill("500");
    await page.locator("#add-event-btn").click();
    await expect(page.getByText("Event created!")).toBeVisible();
    await page.goto(`${base_url}/events`);
    const eventCard = page.locator("article[data-testid='event-card']");
    await expect(eventCard.first()).toBeVisible();
    const targetCard = eventCard.filter({hasText:eventName}).first();
    await expect(targetCard).toBeVisible({timeout:5000});
    const seatBeforeBooking = parseInt(targetCard.getByText("seats available").first().innerText());
    console.log(seatBeforeBooking);
    await targetCard.locator("a[data-testid='book-now-btn']").click();
    await page.getByLabel("Full Name").fill("Dummy Name");
    await page.locator("#customer-email").fill(user_email);
    await page.getByPlaceholder("+91 98765 43210").fill(phoneNumber);
    await page.locator("#confirm-booking").click();
    const bookingReferenceID = page.locator(".booking-ref").first();
    await expect(bookingReferenceID).toBeVisible();
    
    const bookingRef = (await (bookingReferenceID.innerText())).trim();
    expect(bookingRef.charAt(0)).toBe(eventName.trim().charAt(0).toUpperCase());
    console.log("Booking Confirmation ID: " + bookingRef);

    await page.getByRole("link", {name: "View My Booking"}).click();
    await expect(page).toHaveURL(`${base_url}/bookings`);
    await expect(page.locator("#booking-card").first()).toBeVisible();
    
    await page.goto(`${base_url}/events`);
    await page.locator("#event-card").first().isVisible();
    await expect(page.locator("#event-card").filter({name:eventName}).first()).toBeVisible();
    const seatAfterBooking = parseInt(targetCard.getByText("seats available").first().innerText());
    console.log(seatAfterBooking);
    expect(seatAfterBooking).toBe(seatBeforeBooking - 1);

});