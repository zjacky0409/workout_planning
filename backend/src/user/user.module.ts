import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/database/user.entity';
import { Coach } from 'src/database/coach.entity';
import { Student } from 'src/database/student.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Coach]),
    TypeOrmModule.forFeature([Student]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule { }