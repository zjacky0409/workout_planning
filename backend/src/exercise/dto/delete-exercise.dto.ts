import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
export default class DeleteExerciseDto {
  @IsNotEmpty()
  @IsNumber()
  exerciseId: number;
}
