/**
 * Users can create update delte posts, and this data is viewable in the newsfeed
 */
export type Post = {
  postId: string;
  userId: string;
  username: string;
  /**
   * The main text of the post
   */
  body: string;
};

export type User = {
  userId: string;
  username: string;
};

/**
 * This object will be used to create a new user
 */
export type CreateUserDTO = {
  username: string;
  email: string;
  password: string;
};

export type LoginDTO = {
  email: string;
  password: string;
};
