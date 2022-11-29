import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export default class DeleteFoodDto {
  @IsNumber()
  toBeDelete: number;
}
