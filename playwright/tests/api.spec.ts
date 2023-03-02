import { test, devices, ViewportSize, expect } from "@playwright/test";
const LOCAL_DOMAIN = "http://localhost:3000";
/*
test("Check User Endpoints", async ({ page, browser }) => {
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
  expect(updateUserJSON.username).toBe(UPDATED_USERNAME);
  const deleteUserPayload = await page.request.delete(
    LOCAL_DOMAIN + "/api/user/" + createUserJSON.userId
  );
  const deleteUserPayloadBuffer = await deleteUserPayload.body();
  const deleteUserPayloadString = deleteUserPayloadBuffer.toString();
  expect(deleteUserPayloadString).toMatch(createUserJSON.userId);
  console.log(deleteUserPayloadString);
});
*/
test("Check Post Endpoints", async ({ page, browser }) => {
  const createPostPayload = await page.request.post(
    LOCAL_DOMAIN + "/api/post",
    {
      data: {
        userId: "1",
        username: "1",
        body: "post body",
      },
    }
  );
  let createPostJSON: Buffer | string = await createPostPayload.body();
  createPostJSON = createPostJSON.toString();
  console.log(createPostJSON);

  let getAllPostsPayload = await page.request.get(LOCAL_DOMAIN + "/api/post");
  let getAllPostsJSON: Buffer | string = await getAllPostsPayload.body();
  getAllPostsJSON = getAllPostsJSON.toString();
  console.log(getAllPostsJSON);

  let updatePostPayload = await page.request.patch(
    LOCAL_DOMAIN + "/api/post/1",
    {
      data: {
        userId: "1",
        username: "1",
        body: "updated post body",
      },
    }
  );
  let updatePostJSON: Buffer | string = await updatePostPayload.body();
  updatePostJSON = updatePostJSON.toString();
  console.log(updatePostJSON);
  let deletePostPayload = await page.request.delete(
    LOCAL_DOMAIN + "/api/post/1"
  );
  let deletePostJSON: Buffer | string = await deletePostPayload.body();
  deletePostJSON = deletePostJSON.toString();
  console.log(deletePostJSON);
});
