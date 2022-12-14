import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository, InjectDataSource } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../database/user.entity';
// import CreateExerciseDto from 'src/exercise/dto/create-exercise.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { CheckUserNameDto } from './dto/check-username.dto';
import { CheckEmailDto } from './dto/check-email.dto';
import * as bcrypt from 'bcrypt';
import { Coach } from 'src/database/coach.entity';
import { Student } from 'src/database/student.entity';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Coach)
    private coachRepository: Repository<Coach>,
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectDataSource() private dataSource: DataSource,
  ) {}

  // check the username exist or not
  async checkUsernameExist(data: CheckUserNameDto): Promise<boolean> {
    const user = await this.userRepository.findOneBy({
      username: data.username,
    });

    console.log('user = ', user);

    if (user) {
      return true;
    }
    return false;
  }

  // check the email exist or not
  async checkEmailExist(data: CheckEmailDto): Promise<boolean> {
    const user_test = this.findAll()
    console.log('user_test --> ', user_test)
    const user = await this.userRepository.findOneBy({
      emailAddress: data.emailAddress,
    });
    // console.log('user => ', user)

    if (user) {
      return true;
    }
    return false;
  }

  async create(user: CreateUserDto) {
    const metaData = {
      role: 'coach',
      isActive: true,
    };
    // if the role is a user, we need to set the role to user
    // then, setting isActive to true is by coach
    if (user.role_type === 'User') {
      (metaData.role = 'user'), (metaData.isActive = true);
    }

    console.log(`To convert the password by bcrypt`);
    const saltOrRounds = 10;
    const afterHashSalted = await bcrypt.hash(user['password'], saltOrRounds);
    // i use bcrypt for my password hashing function
    // i use md5 before but there is some risk for md5

    user['password'] = afterHashSalted;
    let insertToDB = { ...user, ...metaData };

    console.log('checking the username exsit or not');

    // console.log(await this.coachRepository.findOneBy({ id: user.coach_id }));
    // maybe we do the process in the pipe?
    if (
      (await this.checkUsernameExist({ username: insertToDB.username })) ===
      true
    ) {
      return { create_user: false }; // should not happen
    }

    console.log('checking the email address exsit or not');
    // maybe we do the process in the pipe?
    if (
      (await this.checkEmailExist({
        emailAddress: insertToDB.emailAddress,
      })) === true
    ) {
      return { create_user: false }; // should not happen
    }

    let successInsert = null;

    if (user.role_type === 'Coach') {
      const coach_meta = {
        introduction: 'test',
        display_name: user.coach_name,
      };
      const new_caoch = this.coachRepository.create(coach_meta);
      successInsert = await this.coachRepository.save(new_caoch);
      insertToDB = {
        ...insertToDB,
        ...{ coach: successInsert },
      };
    }

    if (user.role_type === 'User') {
      const student_coach = await this.coachRepository.find({
        where: { display_name: user.coach_name },
      });

      if (student_coach.length === 0) {
        return { create_user: false };
      }

      const student_meta = {
        username: 'to_be_insert_by_coach',
        coach: student_coach[0],
      };
      const new_student = this.studentRepository.create(student_meta);
      successInsert = await this.studentRepository.save(new_student);
      insertToDB = {
        ...insertToDB,
        ...{ student: successInsert },
      };
    }

    console.log('insertToDB =>', insertToDB);

    const new_user = this.userRepository.create(insertToDB);
    try {
      await this.userRepository.save(new_user);
      console.log(`create user successfully`);
      return { create_user: true };
    } catch (e) {
      console.log(`create user fail with error == ${e}`);
      return { create_user: false };
    }
  }

  // find all user from the database
  async findAll(): Promise<string> {
    const user = await this.userRepository.find();
    console.log('user in findall', user)
    return 'haha'
  }

  // find the user information from the database and used by thr getUser Api
  async findUserWithMeta(username: string): Promise<any> {
    // role.push('student');
    const role = [];
    // role.push('coach');
    const user = await this.dataSource
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.student', 'student')
      .leftJoinAndSelect('user.coach', 'coach')
      .where('user.username = :username', { username: username })
      .getOne();

    let user_coach = null;
    if (user.student !== null) {
      role.push('student');
      user_coach = await this.dataSource
        .getRepository(Student)
        .createQueryBuilder('student')
        .leftJoinAndSelect('student.coach', 'student_coach')
        .where('student.id = :id', { id: user.student.id })
        .getOne();
    }
    let coach_student = null;
    if (user.coach !== null) {
      role.push('coach');
      coach_student = await this.dataSource
        .getRepository(Coach)
        .createQueryBuilder('coach')
        .leftJoinAndSelect('coach.students', 'student_coach')
        .where('coach.id = :id', { id: user.coach.id })
        .getOne();
    }
    const { password, ...result } = user;
    result['role'] = role;
    return {
      user: result,
      user_coach: user_coach,
      coach_student: coach_student,
    };
  }

  async findOne(username: string): Promise<User> {
    this.logger.log(`parameter in findOne function = ${username}`);
    this.logger.log(`going to find user info from the user repository`);
    const user = await this.userRepository.find({
      where: { username: username },
      relations: {
        coach: true,
        student: true,
      },
    });
    if (user.length > 0) {
      return user[0];
    }
    // only occur when user perform the login action
    this.logger.error(`no user found in the user repository`);
    return null;
  }
  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
