import { test, devices, ViewportSize, expect } from "@playwright/test";
const LOCAL_DOMAIN = "http://localhost:3000";

test("Check all nestjs endpoints", async ({ page, browser }) => {
  const rootPayload = await page.request.get(LOCAL_DOMAIN);
  const body = await rootPayload.body();
  console.log(body.toString());
  expect(body.toString()).toContain("Hello World");

  const createUserPayload = await page.request.post(
    LOCAL_DOMAIN + "/api/user",
    {
      data: { username: "username", password: "password", email: "email" },
    }
  );
  const createUserJSON = await createUserPayload.json();
  expect(createUserJSON.username).toBe("username");

  const getUserByIdPayload = await page.request.get(
    LOCAL_DOMAIN + "/api/user/" + createUserJSON.userId
  );
  const getUserByIdJSON = await getUserByIdPayload.json();
  console.log(getUserByIdJSON);
  expect(getUserByIdJSON.username).toBe("username");

  const UPDATED_USERNAME = "updated-name";
  const updateUserPayload = await page.request.patch(
    LOCAL_DOMAIN + "/api/user/" + createUserJSON.userId,
    {
      data: {
        username: UPDATED_USERNAME,
        password: "password",
        email: "email",
      },
    }
  );
  const updateUserJSON = await updateUserPayload.json();
  console.log({ updateUserJSON });
  expect(updateUserJSON.username).toBe(UPDATED_USERNAME);
  const deleteUserPayload = await page.request.delete(
    LOCAL_DOMAIN + "/api/user/2"
  );
  const deleteUserPayloadBuffer = await deleteUserPayload.body();
  const deleteUserPayloadString = deleteUserPayloadBuffer.toString();
  console.log(deleteUserPayloadString);
});
