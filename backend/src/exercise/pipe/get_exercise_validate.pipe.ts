import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

// a pipe to checking the user request fit the dto or not
@Injectable()
export class GetExerciseValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    console.log('metatype == ');
    console.log(metatype); // the cat class
    console.log('value == ');
    console.log(value); // user's input

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    console.log(errors);
    if (errors.length > 0) {
      throw new BadRequestException('Invalid input');
    }

    const Body_Part = ['Chest', 'Back', 'Arms', 'Legs', 'Core', 'Shoulder'];

    if (!Body_Part.includes(value.type)) {
      throw new BadRequestException('Invalid input');
    }

    const Body_Part_Subtype = {
      None: [],
      Chest: ['Upper', 'Lower', 'Middle', 'Inner', 'Outter', 'Summary'],
      Back: ['Lat', 'Upper', 'Trap'],
      Shoulder: ['Rear Delt', 'Side Delt', 'Front Delt', 'Summary'],
      Arms: ['Former', 'Tricept', 'Bicept', 'Summary'],
      Legs: ['Quad', 'Harmstring', 'Hip', 'Summary'],
      Core: ['Upper', 'Lower', 'Full', 'Summary'],
    };

    if (!Body_Part_Subtype[value.type].includes(value.subtype)) {
      throw new BadRequestException('Invalid input');
    }
    return value;
  }

  //檢驗是否為原生JavaScript的型別
  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

// Pipes example
