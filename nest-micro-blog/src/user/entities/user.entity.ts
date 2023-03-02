import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  email: string;
}
