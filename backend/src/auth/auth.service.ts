import { Injectable, Logger } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Student } from 'src/database/student.entity';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');
  constructor(
    private UserService: UserService,
    private jwtService: JwtService,
    @InjectDataSource() private dataSource: DataSource,
  ) { }

  // for checking login information correct or not
  // for local.strategy to use
  async validateUser(username: string, pass: string): Promise<any> {
    // find the user info from the database
    const user = await this.UserService.findOne(username);

    if (user) {
      // compare the user input and the hashed password in the db
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  // to sign the jwt token with its payload
  async login(user: any) {
    // the payload to be inserted to the jwt token
    const payload = {
      username: user.username,
      sub: user.id,
      role: [],
      coach_id: -999,
      student_id: -999,
      student_coach_id: -999,
      isVerified: false,
    };
    let user_coach = null

    // if the user is a student
    if (user.student !== null) {
      payload.role.push('student');
      payload.student_id = user.student.id;

      // select the data from the Student Table
      // find the coach, isVerified for the user
      user_coach = await this.dataSource
        .getRepository(Student)
        .createQueryBuilder('student')
        .leftJoinAndSelect('student.coach', 'student_coach')
        .where('student.id = :id', { id: user.student.id })
        .getOne();
      payload.student_coach_id = user_coach.id;
      console.log('user_coach => ', user_coach);
      payload.isVerified = user_coach.isVerified;
    }

    // if the user is a coach
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
