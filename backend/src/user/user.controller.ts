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

  @Post('/create')
  create(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
