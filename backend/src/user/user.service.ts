import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import CreateExerciseDto from 'src/exercise/dto/create-exercise.dto';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';
import { CheckUserNameDto } from './dto/check-username.dto';
import e from 'express';
import { CheckEmailDto } from './dto/check-email.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

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

    const saltOrRounds = 10;
    const afterHashSalted = await bcrypt.hash(user['password'], saltOrRounds);
    // i use bcrypt for my password hashing function
    // i use md5 before but there is some risk for md5

    user['password'] = afterHashSalted;
    const insertToDB = { ...user, ...metaData };
    console.log('insertToDB --> ', insertToDB);

    if (
      (await this.checkUsernameExist({ username: insertToDB.username })) ===
      true
    ) {
      return { create_user: false }; // should not happen
    }

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
      return { create_user: true };
    } catch {
      return { create_user: false };
    }
    // return 'HI'
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.userRepository.findOneBy({ username: username });
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
