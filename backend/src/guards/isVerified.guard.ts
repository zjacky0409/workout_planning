/*
  To Guard the student register successfully but he doesnt activate by the coach 
  So, he doesnt get any resources from the database
*/

import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class IsVerifiedGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (user.role.includes('student') && !user.isVerified) {
      return false;
    }
    return true;
  }
}
