import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Roles } from './guards/role_checker/roles.decorator';
import { Role } from './guards/role_checker/role.enum';
import { RolesGuard } from './guards/role_checker/role.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // for acl checking demo
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('test/role')
  onlyAdmin(@Request() req) {
    console.log('someone is an admin');
    return req.user;
  }
}
