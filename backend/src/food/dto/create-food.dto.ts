import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

export default class CreateFoodDto {
  @IsString()
  name: string;

  @IsNumber()
  carbs: number;

  @IsNumber()
  protein: number;

  @IsNumber()
  fat: number;

  @IsString()
  comment: string;

  @IsEnum(['Recommand', 'Not Bad', 'Not Recommand'])
  recommendation: string;

  // @IsString()
  // base64string: string;
}
