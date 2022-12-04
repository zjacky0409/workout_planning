import { PartialType } from '@nestjs/mapped-types';
import CreateExerciseDto from './create-exercise.dto';
import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

export class UpdateExerciseDto extends PartialType(CreateExerciseDto) {
  @IsNumber()
  id: number;
}
