import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role_checker/role.enum';

@Injectable()
export class IsVerifiedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    console.log('user haha -->', user);
    if (user.role.includes('student') && !user.isVerified) {
      return false;
    }
    return true;
  }
}
