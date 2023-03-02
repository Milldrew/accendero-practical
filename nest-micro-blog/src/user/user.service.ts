import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  create(createUserDto: CreateUserDto) {
    try {
      const userId = Date.now().toString() + Math.random().toString().slice(2);
      const newUser = {
        userId,
        username: createUserDto.username,
        email: createUserDto.email,
        password: createUserDto.password,
      };
      const user = this.userRepository.create(newUser);
      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(`database error`);
    }
  }

  async findOneByEmail(email: string, password: string) {
    try {
      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        throw new NotFoundException(`User with email: ${email} not found`);
      }
      console.log(password, user.password, 'passowrd and user password');
      if (user.password !== password) {
        //nest error for incorrect password
        throw new NotFoundException(`Incorrect password`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(`database error`);
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { userId: id } });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      return user;
    } catch (error) {
      throw new NotFoundException(`database error`);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userRepository.preload({
        userId: id,
        ...updateUserDto,
      });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      console.log(user);
      return this.userRepository.save(user);
    } catch (error) {
      throw new NotFoundException(`database error`);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.userRepository.findOne({ where: { userId: id } });
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      this.userRepository.remove(user);
      return `Removed ${JSON.stringify(user)} from database`;
    } catch (error) {
      throw new NotFoundException(`database error`);
    }
  }
}
