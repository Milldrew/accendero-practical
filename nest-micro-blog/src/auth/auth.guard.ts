import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export interface SessionUser {
  userId: string;
  username: string;
}

/**
 * Requires "Authorization: Bearer <token>" from POST /api/user or /login and
 * puts { userId, username } on the request. Who you are comes from the token,
 * never from the request body - the body used to say who was posting.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const header: string = req.headers?.authorization ?? '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : '';
    try {
      const payload = this.jwt.verify<{ sub: string; username: string }>(token);
      req.user = { userId: payload.sub, username: payload.username } as SessionUser;
      return true;
    } catch {
      throw new UnauthorizedException('Please log in again');
    }
  }
}
