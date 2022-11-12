import { IsString, IsNotEmpty } from 'class-validator';

export class CheckUserNameDto {
  @IsString()
  @IsNotEmpty()
  username: string;
}
