import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // to check the user enter the correct password and username or not
  async validate(username: string, password: string): Promise<any> {
    // call function to vaildate user's password and useranme
    Logger.log(`username ${username} -- login action`, 'LocalStrategy');
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      Logger.log(`wrong user name or password`);
      throw new UnauthorizedException();
    }
    return user;
  }
}
