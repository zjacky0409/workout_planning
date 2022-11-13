import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ValidationPipe } from '../pipes/validate.pipe';
import { CheckUserNameDto } from './dto/check-username.dto';
import { CheckEmailDto } from './dto/check-email.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // create an user
  // i should create a userCreateValidationPipe for this controller
  @Post('/create')
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    console.log(`someone want to create an user`);
    console.log('createUserDto == ', createUserDto);
    return this.userService.create(createUserDto);
  }

  @Post('/check_username_duplicate')
  async check_username_duplicate(
    @Body(new ValidationPipe()) checkUsernameDto: CheckUserNameDto,
  ) {
    if (await this.userService.checkUsernameExist(checkUsernameDto)) {
      return { exist: true };
    }
    return { exist: false };
  }

  @Post('/check_email_duplicate')
  async check_email_duplicate(
    @Body(new ValidationPipe()) checkEmailDto: CheckEmailDto,
  ) {
    if (await this.userService.checkEmailExist(checkEmailDto)) {
      return { exist: true };
    }
    return { exist: false };
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
