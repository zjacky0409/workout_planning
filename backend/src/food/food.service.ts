import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateFoodDto from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-exercise.dto';
import { Food } from 'src/database/food.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodService {

  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
  ) { }

  async create(createFoood: CreateFoodDto, user: any) {
    const metaData: any = {
      created_by: user.userId,
    };
    console.log({
      ...createFoood,
      ...metaData,
    });
    console.log(`user ${user.username} is going to create an food`);
    console.log('exercise content == ', createFoood);
    // insert to db
    try {
      await this.foodRepository.insert({
        ...createFoood,
        ...metaData,
      });
      return { create_food: true };
    } catch (e) {
      return { create_food: false };
    }
  }

  async getFood(user: any) {
    console.log(`user ${user.userId} request to get the food list`);
    const result = await this.foodRepository.find();
    return { food_list: result };
  }

  async updateFood(food: UpdateFoodDto, user: any) {
    console.log(`user ${user.userId} request to get the food list`);
    // const result = await this.foodRepository.update({id: });
    const foodToUpdate = await this.foodRepository.findOneBy({
      id: food.id,
    });

    console.log('foodToUpdate == ', foodToUpdate.created_by)
    console.log(user.userId === foodToUpdate.created_by)

    if (foodToUpdate.created_by !== user.userId) {
      return { update_food: 'fail' };
    }
    foodToUpdate.name = food.name;
    foodToUpdate.carbs = food.carbs;
    foodToUpdate.protein = food.protein;
    foodToUpdate.fat = food.fat;
    try {
      await this.foodRepository.save(foodToUpdate);
      return { update_food: 'success' };
    } catch (e) {
      console.log('e === ', e);
      return { update_food: 'fail' };
    }
  }
}
