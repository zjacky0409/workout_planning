import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
  ) {}

  // for checking login information correct or not
  // for local.strategy to use
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.UserService.findOne(username); // find the user inforamtion from the database
    console.log('user => ', user);

    console.log(`compare the password`)
    const isMatch = await bcrypt.compare(pass, user.password);
    // compare the user input and the hashed password in the db

    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // to sign the jwt token with its payload
  async login(user: any) {
    const payload = {
      username: user.username,
      sub: user.id,
      role: [user.role],
    };
    console.log(`user ${user.username}:${user.id} login successfully`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
