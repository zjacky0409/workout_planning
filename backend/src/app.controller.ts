import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { Roles } from './role_checker/roles.decorator';
import { Role } from './role_checker/role.enum';
import { RolesGuard } from './role_checker/role.guard';

@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {

    // console.log('Hi, someone call the login api')
    // function wait(ms: any): any {
    //   return new Promise(resolve => setTimeout(() => resolve(''), ms));
    // };

    // // 调用方法；
    // await wait(5000);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('auth/getUser')
  async getProfile(@Request() req) {
    return req.user;
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('test/role')
  onlyAdmin(@Request() req) {
    console.log('someone is an admin')
    return req.user;
  }
}