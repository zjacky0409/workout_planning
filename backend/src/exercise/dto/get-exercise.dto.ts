import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
export default class GetExerciseDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  subtype: string;
}
