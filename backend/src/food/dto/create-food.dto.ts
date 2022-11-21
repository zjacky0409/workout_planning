import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export default class CreateFoodDto {
  @IsString()
  name: string;

  @IsNumber()
  carbs: number;

  @IsNumber()
  protein: number;

  @IsNumber()
  fat: number;
}
