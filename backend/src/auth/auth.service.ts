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

    // const user = await this.UserService.find({
    //   where: { id: food.id },
    //   relations: {
    //     coach: true,
    //   },
    // });

    const user = await this.UserService.findOne(username); 
    // find the user inforamtion from the database
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
    // user should not be any ah
    console.log('user == ', user);
    const payload = {
      username: user.username,
      sub: user.id,
      role: [],
      coach_id: -999,
      student_id: -999,
    };
    if (user.student !== null) {
      payload.role.push('student');
      payload.student_id = user.student.id;
    }
    if (user.coach !== null) {
      payload.role.push('coach');
      payload.coach_id = user.coach.id;
    }
    console.log(`user ${user.username}:${user.id} login successfully`);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
