import { Body, Controller, Delete, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard, SessionUser } from '../auth/auth.guard';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

/**
 * Sign up, log in, delete your own account. GET/PATCH /api/user/:id used to
 * return or change any user - password included - with no authentication;
 * the client never used them, so they are gone.
 */
@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('login')
  login(@Body() loginUserDto: { email: string; password: string }) {
    return this.userService.login(loginUserDto?.email, loginUserDto?.password);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: { user: SessionUser }) {
    return this.userService.remove(id, req.user);
  }
}
