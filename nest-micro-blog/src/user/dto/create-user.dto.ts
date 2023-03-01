export class CreateUserDto {
  readonly username: string;
  readonly email: string;
  readonly password: string;
}

export type User = {
  userId: string;
  username: string;
  email: string;
  password: string;
};
