import {test, expect} from '@playwright/test';
test('get by locators', async ({page})=>{
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByPlaceholder('Password').fill("Sampathkumar");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Gender").selectOption("Male");
await page.getByLabel("Employed").check();
await page.getByRole("button", {name:"Submit"}).click();
const visible = page.getByText("Success! The Form has been submitted successfully!.").isVisible();
console.log(visible);
//this line will override the default timeout of 5 seconds and wait for 10 seconds for the element to be visible
await expect(visible).toBeVisible({timeout: 10000});

//await page.getByText("Shop").click();
await page.getByRole("link",{name:"Shop"}).click();
await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();
})

test('automation Practice different site', async ({page})=>{
await page.goto("https://testautomationpractice.blogspot.com/");
await page.getByPlaceholder("Enter Name").fill("Kumar");
await page.getByPlaceholder("Enter EMail").fill("Budugonda");
await page.getByPlaceholder("Enter Phone").fill("9876543210");
await page.getByLabel("Female").check();
await page.getByLabel("Sunday").check();
await page.getByLabel("Monday").check();
await page.getByLabel("Tuesday").check();
await page.getByLabel("Wednesday").click();
await page.getByLabel("Thursday").check();
await page.getByLabel("Friday").check();
await page.getByLabel("saturday").check();
await page.getByLabel("Country:").selectOption("india");
await page.getByLabel("Colors:").selectOption("Red");
await page.getByLabel("Sorted List:").selectOption("Dog");
await page.getByRole("Button", {name:"Submit"}).first().click();
await page.pause();
})


test('TimeOut Practice', async ({page})=>{
test.setTimeout(70000);
const slowExpect = expect.configure({timeout: 7000});
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByPlaceholder('Password').fill("Sampathkumar");
await page.getByLabel("Check me out if you Love IceCreams!").click();
await page.getByLabel("Gender").selectOption("Male");
await page.getByLabel("Employed").check();
await page.getByRole("button", {name:"Submit"}).click();
const visible = page.getByText("Success! The Form has been submitted successfully!.").isVisible();
console.log(visible);
//this line will override the default timeout of 7 seconds(which is mentioned as test level default time) and wait for 10 seconds for the element to be visible
await slowExpect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout: 10000});



//await page.getByText("Shop").click();
await page.getByRole("link",{name:"Shop"}).click();
await page.locator("app-card").filter({hasText:"Nokia Edge"}).getByRole("button").click();
})

test('End to end test case using getBy locators', async ({page})=>{
await page.goto("https://rahulshettyacademy.com/client/");
await page.getByPlaceholder("email@example.com").fill("goneliw313@jobraux.com");
await page.getByPlaceholder("enter your passsword").fill("Sampathkumar@1");
await page.getByRole("button",{name:"Login"}).click();
await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("Button",{name:"Add To Cart"}).click();
await page.getByRole("listitem").getByText("Cart").click();
await page.getByRole("Button",{name:"Checkout"}).click();
const countryInput = await page.getByPlaceholder("Select Country");
await countryInput.click();
await countryInput.pressSequentially("India");


const option = (page.locator(".ng-star-inserted").filter({hasText:"India"})).last();
await option.click();

 
await page.getByText("PLACE ORDER").click();
await expect(page.getByText("Thankyou for the order.")).toBeVisible();
})


