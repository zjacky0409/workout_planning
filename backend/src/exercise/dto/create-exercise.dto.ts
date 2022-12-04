import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
export default class CreateExerciseDto {
  @IsString()
  name: string;
  @IsString()
  type: string;
  @IsString()
  subtype: string;
  @IsString()
  details: string;
}
