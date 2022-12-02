import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../database/user.entity';
// import CreateExerciseDto from 'src/exercise/dto/create-exercise.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';
import { CheckUserNameDto } from './dto/check-username.dto';
import e from 'express';
import { CheckEmailDto } from './dto/check-email.dto';
import * as bcrypt from 'bcrypt';
import { Coach } from 'src/database/coach.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
    const user = await this.userRepository.findOneBy({
      emailAddress: data.emailAddress,
    });

    if (user) {
      return true;
    }
    return false;
  }

  async create(user: CreateUserDto) {
    const metaData = {
      role: 'user',
      isActive: true,
    };

    console.log(`To convert the password by bcrypt`);
    const saltOrRounds = 10;
    const afterHashSalted = await bcrypt.hash(user['password'], saltOrRounds);
    // i use bcrypt for my password hashing function
    // i use md5 before but there is some risk for md5

    user['password'] = afterHashSalted;
    const insertToDB = { ...user, ...metaData };
    console.log('insertToDB --> ', insertToDB);

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
    const new_user = this.userRepository.create(insertToDB);
    try {
      await this.userRepository.save(new_user);
      console.log(`create user successfully`);
      return { create_user: true };
    } catch (e) {
      console.log(`create user fail with error == ${e}`);
      return { create_user: false };
    }
    // return 'HI'
  }

  // find all user from the database
  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  // find the user information from the database
  async findOne(username: string): Promise<User> {
    const user = await this.userRepository.find({
      where: { username: username },
      relations: {
        coach: true,
        student: true,
      },
    });
    return user[0];
  }
  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
