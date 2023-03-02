export class CreatePostDto {
  userId: string;
  username: string;
  /**
   * The main text of the post
   */
  body: string;
  timestamp: string;
}
