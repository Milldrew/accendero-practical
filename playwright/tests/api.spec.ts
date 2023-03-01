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
  console.log(createUserJSON, "create user payload");
  expect(createUserJSON.username).toBe("username");

  const getUserByIdPayload = await page.request.get(
    LOCAL_DOMAIN + "/api/user/1"
  );
  const getUserByIdBuffer = await getUserByIdPayload.body();
  const getUserByIdString = getUserByIdBuffer.toString();
  console.log(getUserByIdString, "GET USER BY ID PAYLOAD");
  expect(getUserByIdString).toBeTruthy();

  const updateUserPayload = await page.request.patch(
    LOCAL_DOMAIN + "/api/user/1",
    {
      data: { username: "username", password: "password", email: "email" },
    }
  );
  //const updateUserJSON = await updateUserPayload.json();
  const updateUserPayloadBuffer = await updateUserPayload.body();
  const updateUserPayloadString = updateUserPayloadBuffer.toString();
  console.log(updateUserPayloadString);
  expect(updateUserPayloadString).toBeTruthy();
  const deleteUserPayload = await page.request.delete(
    LOCAL_DOMAIN + "/api/user/2"
  );
  const deleteUserPayloadBuffer = await deleteUserPayload.body();
  const deleteUserPayloadString = deleteUserPayloadBuffer.toString();
  console.log(deleteUserPayloadString);
});
