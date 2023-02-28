This repository is for compelting the Accendro Practical
───────────────────
Requirements
───────────────────
• Create a repository and invite the accendro team to it.
• Continuosuly push revisions.
• Provide a list of documentation that you used while building the application.
• The practical must be done by March 20th
• Interviews requests wil begin the week of March 20th.


───────────────────
Application Requirements
───────────────────
• Persistent state.
• Allows data changes.
• Must be a full stack solution.
• User docker and docker-compose.
• Demonstrate servie orchestration between more than one microservice.

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
• Create a playwright for the news feed page that checks all viewport sizes.
• Create a component for each route.
• Create a Post type
  Post {
    id: number;
    body: string;
  }
• Create some post mock data.
• Create the news feed  Page.
• Create a post servcie for CRUD operations on posts.
• Add a modal with a form for dynamically adding posts to the news feed.
• Dynamically add posts to the news feed.
• With the modal
• Create a playwright test for the modal and the CRUD operations.
