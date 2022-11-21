import { PartialType } from '@nestjs/mapped-types';
// import CreateExerciseDto from './create-food.dto';
import CreateFoodDto from './create-food.dto';

export class UpdateExerciseDto extends PartialType(CreateFoodDto) {}
