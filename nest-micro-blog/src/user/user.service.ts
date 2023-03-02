import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    const userId = Date.now().toString() + Math.random().toString().slice(2);
    const newUser = {
      userId,
      username: createUserDto.username,
      email: createUserDto.email,
      password: createUserDto.password,
    };
    console.log({ newUser });
    const user = this.userRepository.create(newUser);
    return this.userRepository.save(user);
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
