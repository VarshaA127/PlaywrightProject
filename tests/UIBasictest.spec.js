const { test, expect } = require("@playwright/test");

test.only("browser context playwright test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator("#username");
  await username.type("Walden Schmidt");
  const password = await page.locator("#password");
  await password.type("learning");
  const signin = page.locator('input[id="signInBtn"]');
  await signin.click();
  console.log(await page.locator("[style*='display']").textContent());
  //using assertions
  await expect(page.locator("[style*='display']")).toContainText("Incorrect");
  await username.fill(" ");
  await username.fill("rahulshettyacademy");
  await password.fill("");
  await password.fill("learning");
  //race condition for non service based apps
  await Promise.all([page.waitForNavigation(), signin.click()]);

  console.log(await page.locator(".card-body a").nth(0).textContent());
});

test("Ui controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const username = page.locator("#username");
  const signin = page.locator('input[id="signInBtn"]');
  const dropdown = await page.locator("select.form-control");
  const documentLink = page.locator("[href*='documents-request']");
  dropdown.selectOption("consult");
  await page.locator(".radiotextsty").last().click();

  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#okayBtn").click();
  await page.locator('[type="checkbox"]').click();
  expect(await page.locator('[type="checkbox"]')).toBeChecked();
  await page.locator('[type="checkbox"]').uncheck();

  expect(await page.locator('[type="checkbox"]')).toBeTruthy();

  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  //await page.pause();
  //await signin.click();
});

test("child window link", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");
  const [newpage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);

  const text = await newpage.locator(".red").textContent();
  console.log(text);
});
// test("page playwright test", async ({ page }) => {
//   await page.goto("https://google.com/");
//   console.log(await page.title());
//   await expect(page).toHaveTitle("Google");
// }
// );
