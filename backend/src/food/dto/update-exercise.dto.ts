import { PartialType } from '@nestjs/mapped-types';
// import CreateExerciseDto from './create-food.dto';
import CreateFoodDto from './create-food.dto';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateFoodDto extends PartialType(CreateFoodDto) {
  @IsNumber()
  id: number;
}
