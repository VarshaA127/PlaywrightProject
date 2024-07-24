const { test, expect } = require("@playwright/test");

test("", async ({ page }) => {
  const productname = "zara coat 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("Iamking@000");
  await page.locator("[value='Login']").click();
  //wait for service based app
  await page.waitForLoadState("networkidle");
  const title = await products.allTextContents();
  console.log(title);
  // const count = products.count();
  // console.log(count);
  for (let i = 1; i < 8; i++) {
    if ((await products.nth(i).locator("b").textContent()) === productname) {
      //add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*='cart']").click();
  await page.locator("div li").first().waitFor();
  const bool = await page.locator("h3:has-text('zara coat 3')").isVisible(); //pseudo class selector
  expect(bool).toBeTruthy();
  const waiting = await page.locator("text=Checkout").click();
  //await page.locator("text=Checkout").click();
  await page.locator("[placeholder*= Country]").type("ind", { delay: 100 });
  const option = page.locator(".ta-results");
  await option.waitFor();
  const optioncount = await option.locator("button").count();
  for (let i = 0; i < optioncount; i++) {
    const text = await option.locator("button").nth(i).textContent();
    console.log(text);
    if (text === " India") {
      //click
      await option.locator("button").nth(i).click();
      break;
    }
  }
  await page.locator(".user__name .ng-valid").fill("joe@gmail.com");

  await page.locator(".field .text-validated").fill("456724357654");
  await page.locator("(//input[@type='text'])[2]").fill("986");
  await page.locator("(//input[@type='text'])[2]").fill("Anshika Samesun");
  await page.locator(".action__submit").click();
  //await page.pause();
  //ex comment
  const orderId = await page
    .locator(".em-spacer-1 .ng-star-inserted")
    .textContent();
  console.log(orderId);
  page.locator("ORDERS").click();

  const orId = page.locator('[scope="row"]');
  for (let i = 0; i < orId.count(); i++) {
    if (orId.nth(i).textContent === orderId) {
    }
  }
});
