import { test, devices, ViewportSize, expect } from "@playwright/test";

test("visualy look at screen sizes", async ({ page, browser }) => {
  const rootPaylaod = await page.request.get("http://localhost:3000");
  const body = await rootPaylaod.body();
  console.log(body.toString());
  expect(body.toString()).toContain("Hello World");
});
