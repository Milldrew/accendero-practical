import { Injectable } from '@nestjs/common';
import { CreateUserDto, User } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  private users: User[] = [
    {
      userId: '1',
      username: 'John',
      email: 'john@example.com',
      password: '123456',
    },
  ];
  create(createUserDto: CreateUserDto) {
    const userId = Date.now().toString() + Math.random().toString().slice(1, 3);
    this.users.push({ userId, ...createUserDto });
    return { userId, username: createUserDto.username };
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
