import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;
  @IsString()
  lastName: string;
  @IsString()
  username: string;
  @IsNumber()
  phoneNumber: number;
  @IsString()
  emailAddress: string;
  @IsString()
  password: string;
  @IsString()
  dateOfBirth: string;
  @IsString()
  confirmPassword: string;
  @IsNumber()
  age: number;
}
