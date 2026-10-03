import { BadRequestException, ConflictException, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import { Repository } from 'typeorm';
import { SessionUser } from '../auth/auth.guard';
import { Post } from '../post/entities/post.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    private readonly jwt: JwtService,
  ) {}

  /** The account as the client sees it: never the password (hash), plus a session token. */
  private session(user: User) {
    return {
      userId: user.userId,
      username: user.username,
      email: user.email,
      token: this.jwt.sign({ sub: user.userId, username: user.username }),
    };
  }

  async create(dto: CreateUserDto) {
    const username = String(dto?.username ?? '').trim().slice(0, 30);
    const email = String(dto?.email ?? '').trim().toLowerCase().slice(0, 120);
    const password = String(dto?.password ?? '');
    if (!username || !/^\S+@\S+\.\S+$/.test(email) || password.length < 6) {
      throw new BadRequestException('Enter a username, a valid email and a password of at least 6 characters');
    }
    if (await this.userRepository.findOne({ where: { email } })) {
      throw new ConflictException('That email already has an account - log in instead');
    }
    const user = await this.userRepository.save(
      this.userRepository.create({
        userId: Date.now().toString() + Math.random().toString().slice(2),
        username,
        email,
        // Stored as a bcrypt hash; it used to be stored, compared and logged in plain text.
        password: await bcrypt.hash(password, 10),
      }),
    );
    return this.session(user);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email: String(email ?? '').trim().toLowerCase() } });
    // One message either way, so the response does not reveal which emails exist.
    if (!user || !(await bcrypt.compare(String(password ?? ''), user.password))) {
      throw new UnauthorizedException('Wrong email or password');
    }
    return this.session(user);
  }

  /** Your own account only, and your posts with it. */
  async remove(id: string, me: SessionUser) {
    if (id !== me.userId) throw new ForbiddenException('You can only delete your own account');
    await this.postRepository.delete({ userId: me.userId });
    await this.userRepository.delete({ userId: me.userId });
    return { message: 'Account deleted' };
  }
}
