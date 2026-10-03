import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionUser } from '../auth/auth.guard';
import { Post } from './entities/post.entity';

const MAX_LENGTH = 500;

function cleanBody(body: unknown): string {
  const text = String(body ?? '').trim();
  if (!text) throw new BadRequestException('Write something first');
  if (text.length > MAX_LENGTH) throw new BadRequestException(`Posts are at most ${MAX_LENGTH} characters`);
  return text;
}

@Injectable()
export class PostService {
  constructor(@InjectRepository(Post) private readonly postRepository: Repository<Post>) {}

  /** Author and time come from the session and the server, not the request. */
  create(body: unknown, me: SessionUser) {
    return this.postRepository.save(
      this.postRepository.create({
        postId: Date.now().toString() + Math.random().toString().slice(2),
        userId: me.userId,
        username: me.username,
        body: cleanBody(body),
        timestamp: String(Date.now()),
      }),
    );
  }

  findAll() {
    return this.postRepository.find({ order: { timestamp: 'DESC' }, take: 200 });
  }

  private async own(id: string, me: SessionUser) {
    const post = await this.postRepository.findOne({ where: { postId: id } });
    if (!post) throw new NotFoundException(`Post ${id} not found`);
    if (post.userId !== me.userId) throw new ForbiddenException('You can only change your own posts');
    return post;
  }

  async update(id: string, body: unknown, me: SessionUser) {
    const post = await this.own(id, me);
    post.body = cleanBody(body);
    return this.postRepository.save(post);
  }

  async remove(id: string, me: SessionUser) {
    await this.postRepository.remove(await this.own(id, me));
    return { message: 'Post deleted' };
  }
}
