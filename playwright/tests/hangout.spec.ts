import { test, devices, ViewportSize } from "@playwright/test";

test("open bowser only", async ({ page }) => {
  await page.goto("http://localhost:4200/");

  await page.goto("http://localhost:4200/");
  await page.goto("http://localhost:4200/sign-up");

  await page.getByRole("button", { name: "Login" }).click();
  /*
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("foo");
  await page.getByPlaceholder("Password").click();
  await page.getByPlaceholder("Password").fill("foo");
  await page.getByPlaceholder("Password").press("Enter");
  await page.locator("#fab").click();
  await page.getByPlaceholder("Your post content here...").click();
  await page.getByPlaceholder("Your post content here...").fill("NEW POST");
  await page.getByPlaceholder("Your post content here...").press("Enter");
  await page.getByRole("button", { name: "Create Post" }).click();
  await page
    .locator(
      "body > app-root > app-newsfeed > blog-post:nth-child(1) > mat-card > mat-card-actions > div > button"
    )
    .click();
  await page.waitForTimeout(1000 * 60 * 30);
  await page.getByPlaceholder("Your post content here...").click();
  await page.getByPlaceholder("Your post content here...").fill("EDITED POST");
  await page.getByRole("button", { name: "Edit Post" }).click();
  */
  await page.waitForTimeout(1000 * 60 * 30);
});
