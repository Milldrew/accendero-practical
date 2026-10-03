import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, SessionUser } from '../auth/auth.guard';
import { PostService } from './post.service';

/** Reading is public; writing needs a session, and only your own posts change. */
@Controller('/api/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() body: { body: string }, @Req() req: { user: SessionUser }) {
    return this.postService.create(body?.body, req.user);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body: { body: string }, @Req() req: { user: SessionUser }) {
    return this.postService.update(id, body?.body, req.user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: { user: SessionUser }) {
    return this.postService.remove(id, req.user);
  }
}
