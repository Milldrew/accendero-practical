import { test, devices, ViewportSize, expect } from "@playwright/test";
const LOCAL_DOMAIN = "http://localhost:3000";

test("Check all nestjs endpoints", async ({ page, browser }) => {
  const rootPayload = await page.request.get(LOCAL_DOMAIN);
  const body = await rootPayload.body();
  console.log(body.toString());
  expect(body.toString()).toContain("Hello World");

  const createUserPayload = await page.request.post(LOCAL_DOMAIN + "/user", {
    data: { username: "username", password: "password", email: "email" },
  });
  const createUserJSON = await createUserPayload.json();
  console.log(createUserJSON, "create user payload");
  expect(createUserJSON.username).toBe("username");
});
