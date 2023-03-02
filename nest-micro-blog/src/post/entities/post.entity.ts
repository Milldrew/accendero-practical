import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Post {
  @PrimaryColumn()
  postId: string;
  @Column()
  userId: string;
  @Column()
  username: string;
  /**
   * The main text of the post
   */
  @Column()
  body: string;
  @Column()
  timestamp: string;
}
