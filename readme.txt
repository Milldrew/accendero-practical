This repository is for completing the Accendro Practical
───────────────────
Requirements
───────────────────
• Create a repository and invite the accendro team to it.
• Continuously push revisions.
• Provide a list of documentation that you used while building the application.
• The practical must be done by March 20th
• Interviews requests will begin the week of March 20th.


───────────────────
Application Requirements
───────────────────
• Persistent state.
• Allows data changes.
• Must be a full stack solution.
• User docker and docker-compose.
• Demonstrate service orchestration between more than one micro service.

───────────────────
User Story
───────────────────
Micro Blog

A user signs ups with their email and password. 
  - Once they are signed in they can create a post that is viewable by the other users.

A post is simply some text that is associated to the user.

All of the post created by all the users will be displayed in a news feed.

The user can create delete and update their own posts.

───────────────────
High Level Tasks
───────────────────
• Create an angular application with mock data
• build the backend api with nestjs
• connect the nestjs database to a postgres database
───────────────────
Angular app game plan
───────────────────
• Create a new angular named micro-blog
• Setup the angular router to handle the following routes
  - /login
  - /signup
  - /news-feed
  - 404
• dyanmically create tab <title> values
• News Feed
  - Create a playwright for the news feed page that checks all viewport sizes.
  - Add husky and automate the playwright tests on a pre-push hook.
  - Setup karma/jasmine tests for the news feed page.
  - Create a component for each route.
  - Create a Post type
    Post {
      userId: string;
      postId: string;
      body: string;
    }
  - Create some post mock data.
  - Create the news feed  Page.
  - Create a post service for CRUD operations on posts.
  - Add a modal with a form for dynamically adding posts to the news feed.
  - Dynamically add posts to the news feed.
  - With the modal
  - Create a playwright test for the modal and the CRUD operations.
• Sign Up
  - Create a playwright test to the sign up page that checks all viewport sizes.
  - Add test to pre-push hook.
  - Create a unit test for the sign up page.
  - Create the form.
  - Create a user service for CRUD operations on users.
  type User {
    userId: string; // comes from the backend, and is stored in the JWT, is also retrieved on login.
    email: string;
    password: string;
  }
• Login Page
  - Create a login form reuse some of the code form the sign up page.
  - Create a login service for authentication.
• Full user story
  - Implement the entire user story with playwright locally
  - Add this to the pre-push hook.
───────────────────
Nestjs app game plan
───────────────────
• Create an api that has the POST CRUD operations.
  - Write tests for the full CRUD with playwright and add them to the pre-push hook.
• Create the JWT authentication.
• use the JWT claim to hold the user id. sub (subject) property.
• Now create a post with a jwt in the header so that the user id is associated with the post.
  - make this change in the playwright test
───────────────────
Connect Angular and Nestjs
───────────────────
• use the environment file in the angular app to set up the local domain.
• replace the in browser memory services with http client services.
  - post service
  - user service
  - authentication service
• Make sure that the playwright test that does the user story works.
───────────────────
Database
───────────────────
• Create a configuration module for the database urls in the different environments.
• Connect the nestjs app to a postgres database.
• Run the postgress in a docker container.
• make sure the test run the same with the database in place.
───────────────────
Dockerize the app
───────────────────
Add docker configuration to in the angular app environment files and the nestjs configuration module.
Create a Dockerfile for Nestjs
Configure the webserver so that angular deeplinks work 
Create a docker-compose file that runs the angular app and the nestjs app.
Test Docker compose configure playwright to point at the docker compose ui
───────────────────
Deploy app to gcp
───────────────────
• Deploy the nestjs to google clour run
• Add a build so that the angular app points at the cloud run instance.
• Add a build so that the nestjs app points at the cloud sql instance.

