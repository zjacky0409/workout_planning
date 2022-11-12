import { IsString, IsNotEmpty } from 'class-validator';

export class CheckEmailDto {
  @IsString()
  @IsNotEmpty()
  emailAddress: string;
}
