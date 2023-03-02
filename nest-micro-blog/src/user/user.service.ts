import { Injectable, NotFoundException } from '@nestjs/common';
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
    const user = this.userRepository.create(newUser);
    return this.userRepository.save(user);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { userId: id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      userId: id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    console.log(user);
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
