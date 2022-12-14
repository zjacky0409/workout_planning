import { IsString, IsBoolean, IsNumber } from 'class-validator';

export default class UpdateStudentDto {
  @IsNumber()
  id: number;

  @IsString()
  display_name: string;

  @IsBoolean()
  isVerified: boolean;
}
