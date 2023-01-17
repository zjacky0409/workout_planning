import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsEnum,
  IsDate,
  IsEmpty,
  IsDateString,
} from 'class-validator';
export class GetStudentWeightDTO {
  @IsNumber()
  id: number;
}
