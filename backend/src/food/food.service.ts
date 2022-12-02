import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import CreateFoodDto from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-exercise.dto';
import { Food } from 'src/database/food.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { UnauthorizedException } from '@nestjs/common';
import DeleteFoodDto from './dto/delete-food.dto';
@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    private userServive: UserService,
  ) { }

  async create(createFoood: CreateFoodDto, user: any) {
    console.log(`${user.userId} want to create a food`);
    console.log('food content == ', createFoood);
    const user_to = await this.userServive.findOne(user.username);
    const metaData: any = {
      coach: user_to.coach,
    };
    console.log('To be inserted data ==> ', {
      ...createFoood,
      ...metaData,
    });
    // insert to db
    try {
      await this.foodRepository.insert({
        ...createFoood,
        ...metaData,
      });
      return { create_food: true };
    } catch (e) {
      console.log(
        `error occur when ${user.username} want to create a food with error ${e}`,
      );
      return { create_food: false };
    }
  }

  async getFood(user: any) {
    console.log(`user ${user.userId} request to get the food list`);
    const result = await this.foodRepository.find();
    return { food_list: result };
  }

  async updateFood(food: UpdateFoodDto, user: any) {
    console.log('user == ', user)
    console.log(`user ${user.userId} request to get the food list`);
    // const result = await this.foodRepository.update({id: });
    const foodToUpdate = await this.foodRepository.find({
      where: { id: food.id },
      relations: {
        coach: true,
      },
    });

    console.log('foodToUpdate == ', foodToUpdate[0]);

    if (foodToUpdate[0].coach.id !== user.coach_id) {
      throw new UnauthorizedException(); // should not happen
    }
    foodToUpdate[0].name = food.name;
    foodToUpdate[0].carbs = food.carbs;
    foodToUpdate[0].protein = food.protein;
    foodToUpdate[0].fat = food.fat;
    foodToUpdate[0].comment = food.comment;
    foodToUpdate[0].recommendation = food.recommendation;
    try {
      await this.foodRepository.save(foodToUpdate[0]);
      return { update_food: true };
    } catch (e) {
      console.log('e === ', e);
      return { update_food: false };
    }
  }

  async deleteFood(toBeDelete: DeleteFoodDto, user: any) {
    // console.log(`user ${user.userId} request to get the food list`);
    // // const result = await this.foodRepository.update({id: });
    // const foodToUpdate = await this.foodRepository.find({
    //   where: { id: toBeDelete.toBeDelete },
    //   relations: {
    //     coach: true,
    //   },
    // });

    // console.log('foodToUpdate == ', foodToUpdate[0]);

    // if (foodToUpdate[0].coach.id !== user.userId) {
    //   throw new UnauthorizedException(); // should not happen
    // }
    let deleteResult
    try {
      deleteResult = await this.foodRepository.delete({
        id: toBeDelete.toBeDelete,
        coach: user.userId,
      });

      // if (result.affected === 0) {
      //   throw new UnauthorizedException();
      // }
      // console.log('result == ', result)
      // return { delete_food: true };
    } catch (e) {
      console.log(e);
      return { delete_food: false };
    }

    if (deleteResult.affected === 0) {
      throw new UnauthorizedException();
    }
    console.log('result == ', deleteResult)
    return { delete_food: true };
  }
}
