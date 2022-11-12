import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    // private usersService: UsersService,
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.UserService.findOne(username);
    console.log('user => ', user);

    const isMatch = await bcrypt.compare(pass, user.password);
    // compare the user input and the hashed password in the db

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: [user.role],
    };
    console.log('payload == ', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
