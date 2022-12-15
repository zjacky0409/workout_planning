import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { IsVerifiedGuard } from 'src/guards/isVerified.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  // deal with user login, if login successfully, we return a jwt token to the user
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // to return some basic information to user from jwt token
  @UseGuards(JwtAuthGuard)
  @Post('/getUser')
  async getProfile(@Request() req) {
    const user_meta_data = await this.userService.findUserWithMeta(
      req.user.username,
    );
    return user_meta_data;
  }
}
