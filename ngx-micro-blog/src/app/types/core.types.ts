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
