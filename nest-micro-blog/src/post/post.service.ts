import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}
  create(createPostDto: CreatePostDto) {
    const postId = Date.now().toString() + Math.random().toString().slice(2);
    const post = this.postRepository.create({
      ...createPostDto,
      postId,
    });
    return this.postRepository.save(post);
  }

  findAll() {
    const allPosts = this.postRepository.find();
    return allPosts;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepository.preload({
      postId: id,
      ...updatePostDto,
    });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    console.log({ post });
    return this.postRepository.save(post);
  }

  async remove(id: string) {
    const post = await this.postRepository.findOne({ where: { postId: id } });
    console.log({ post }, 'POST FROM SERVICE');
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    this.postRepository.remove(post);
    return { message: `Removed ${JSON.stringify(post)} from database` };
  }
}
