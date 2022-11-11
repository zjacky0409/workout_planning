import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    /*不檢查原生JavaScript的型別，因為刻意寫ValidationPipe，就是要使用自定義的DTO class
        的屬性去做參數型別檢查，如果metatype是原生JavaScript的型別，就直接return 原始參數，
        不做ValidationPipe的檢查。
        */
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    console.log('metatype == ');
    console.log(metatype); // the cat class
    console.log('value == ');
    console.log(value); // user's input

    //這裡使用class-transformer的方法，將plain javascript object(像是JSON object)，轉換成一個class的object。
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    console.log(errors)
    if (errors.length > 0) {
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
