import{test,expect} from '@playwright/test';
test('Event Assignment', async ({ page }) => {
    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.getByPlaceholder("you@email.com").fill("dummy12@gmail.com");
    await page.getByLabel("Password").fill("Dummy@12");
    await page.getByRole("button", {name: "Sign In"}).click();
    await expect(page.getByRole("link", {name: "Browse Events"}).first()).toBeVisible();

});

test("Test case 2 create events", async ({page})=>{
    await page.goto("https://eventhub.rahulshettyacademy.com/admin/events");
    await page.getByPlaceholder("you@email.com").fill("dummy12@gmail.com");
    await page.getByLabel("Password").fill("Dummy@12");
    await page.getByRole("button", {name: "Sign In"}).click();
    await page.locator("button svg").nth(0).click();
    await page.locator("div div div div div a").nth(0).click();
    await page.locator("#event-title-input").fill("Dasara Damaka");
    await page.locator("textarea").fill("Lest have a blast for the evening");
    await page.locator("#city").fill("Hyderabad");
    await page.getByLabel("Venue").fill("Shilpa kala Vedika");
    const eventTime = "2026-08-31T15:30";
    await page.locator("input[id='event-date-&-time']").fill(eventTime);
    await page.getByLabel("Price ($)").fill("100");
    await page.locator("#total-seats").fill("50");
    await page.getByRole("button", {name: "+ Add Event"}).click();

    await expect(page.getByText('Event created!')).toBeVisible();


});

test("Dasara Damaka", async ({page})=>{
    await page.goto("https://eventhub.rahulshettyacademy.com/admin/events");
    await page.getByPlaceholder("you@email.com").fill("dummy12@gmail.com");
    await page.getByLabel("Password").fill("Dummy@12");
    await page.getByRole("button", {name: "Sign In"}).click();
    const firstCard = page.locator("img[alt='Dilli Diwali Mela']"); 
    await expect(firstCard).toBeVisible();
    await page.locator("a[data-testid='nav-events']").click();
    //await page.getByPlaceholder("Search events, venues…").fill("Dasara Damaka");
    await page.locator("select[class*='w-full px-3 py-2 rounded-lg border text-sm text-gray-900 bg-white']").nth(0).selectOption("Conference");
    const seatCount = page.locator("span[class='text-xs font-semibold text-emerald-600']").nth(0).textContent();
    //const seatCount = page.getByText("seats available").textContent();
    console.log(seatCount);
    const cardaftersearch = page.locator("div[class='absolute inset-0 flex items-center justify-center text-indigo-200']")
    await expect(cardaftersearch.first()).toBeVisible();
    await page.getByRole("link", {name:"Book Now"}).nth(1).click();
    await page.getByPlaceholder("your full name").fill("Dummy Name");
    await page.getByPlaceholder("you@email.com").fill("dummy12@gmail.com");
    await page.getByPlaceholder("+91 98765 43210").fill("98765 43210");
    await page.getByRole("button", {name:"Confirm Booking"}).click();
    // - Locate the booking reference element (locate by CSS class .booking-ref, take .first())
    const bookingRef = page.locator("span[class='booking-ref font-mono font-bold text-indigo-600']").innerText();
    
    await expect(page.locator("span[class='booking-ref font-mono font-bold text-indigo-600']")).toBeVisible();
    console.log(bookingRef);

    await page.getByRole("link", {name:"View My Bookings"}).click();

});
