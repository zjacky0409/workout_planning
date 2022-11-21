import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateFoodDto from './dto/create-food.dto';
import { Food } from 'src/database/food.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) {}

  create(createFoood: CreateFoodDto, user: any) {

    console.log(user)
    const metaData: any = {
      created_by: user.userId,
    //   updated_by: user.id,
    };
    console.log({
      ...createFoood,
      ...metaData,
    });
    console.log(`user ${user.username} is going to create an exercise`);
    console.log('exercise content == ', createFoood);
    // insert to db
    return this.foodRepository.insert({
      ...createFoood,
      ...metaData,
    });
  }
}
