import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsDate,
  IsEmpty,
  IsDateString,
} from 'class-validator';
export class CreateProcessDto {
  @IsNumber()
  weight: number;
  @IsString()
  comments: string;
  // ISO 8601 date string
  @IsDateString()
  date: string;
}
