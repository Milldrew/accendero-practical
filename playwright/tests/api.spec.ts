import { test, devices, ViewportSize, expect } from "@playwright/test";
const LOCAL_DOMAIN = "http://localhost:3000";
test("Check User Endpoints", async ({ page }) => {
  const rootPayload = await page.request.get(LOCAL_DOMAIN);
  const body = await rootPayload.body();
  console.log(body.toString());
  expect(body.toString()).toContain("Hello World");

  const EMAIL = String(Math.random()) + "@gmail.com";
  const createUserPayload = await page.request.post(
    LOCAL_DOMAIN + "/api/user",
    {
      data: { username: "username", password: "password", email: EMAIL },
    }
  );
  const createUserJSON = await createUserPayload.json();
  expect(createUserJSON.username).toBe("username");

  const getUserByIdPayload = await page.request.get(
    LOCAL_DOMAIN + "/api/user/" + createUserJSON.userId
  );
  const loginUser = await page.request.post(LOCAL_DOMAIN + "/api/user/login", {
    data: { email: EMAIL, password: "password" },
  });
  const loginUserJSON = await loginUser.json();
  console.log(loginUserJSON, "loginUserJSON");
  expect(loginUserJSON.username).toBe("username");
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

test("Check Post Endpoints", async ({ page }) => {
  const createPostPayload = await page.request.post(
    LOCAL_DOMAIN + "/api/post",
    {
      data: {
        userId: "1",
        username: "username",
        body: "post body",
        timestamp: String(Date.now()),
      },
    }
  );
  let createPostJSON = await createPostPayload.json();
  console.log(createPostJSON);
  const POST_ID = createPostJSON.postId;
  expect(createPostJSON.username).toBe("username");

  let getAllPostsPayload = await page.request.get(LOCAL_DOMAIN + "/api/post");
  let getAllPostsJSON: Buffer | string = await getAllPostsPayload.body();
  getAllPostsJSON = getAllPostsJSON.toString();
  console.log(getAllPostsJSON);

  let updatePostPayload = await page.request.patch(
    LOCAL_DOMAIN + "/api/post/" + POST_ID,
    {
      data: {
        userId: "1",
        username: "1",
        body: "updated post body",
        timestap: String(Date.now()),
      },
    }
  );
  let updatePostJSON = await updatePostPayload.json();
  console.log(updatePostJSON);
  expect(updatePostJSON.body).toBe("updated post body");
  console.log(updatePostJSON);
  let deletePostPayload = await page.request.delete(
    LOCAL_DOMAIN + "/api/post/" + POST_ID
  );
  let deletePostJSON: Buffer | string = await deletePostPayload.body();
  deletePostJSON = deletePostJSON.toString();
  expect(deletePostJSON).toMatch(POST_ID);
  console.log(deletePostJSON);
});
