import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';

export default class CreateDietDto {
  @IsNumber()
  amount: number;

  @IsString()
  type: string;

//   @Is
//   meal_th: number
}
