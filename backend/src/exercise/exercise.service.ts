import {
  Injectable,
  UnauthorizedException,
  ParseIntPipe,
} from '@nestjs/common';
import CreateExerciseDto from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from 'src/database/exercise.entity';
import { UserService } from 'src/user/user.service';
@Injectable()
export class ExerciseService {

  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    private userServive: UserService,
  ) { }
  async create(createExerciseDto: CreateExerciseDto, user: any) {
    const user_to = await this.userServive.findOne(user.username);
    const metaData: any = {
      created_by: user_to.coach,
    };
    console.log({
      ...createExerciseDto,
      ...metaData,
    });
    console.log(`user ${user.username} is going to create an exercise`);
    console.log('exercise content == ', createExerciseDto);
    // insert to db
    try {
      await this.exerciseRepository.insert({
        ...createExerciseDto,
        ...metaData,
      });
      return { create_exercise: true };
    } catch (e) {
      return { create_exercise: false };
    }
  }

  async update(createExerciseDto: UpdateExerciseDto, user: any) {
    console.log('user == ', user)
    console.log(`user ${user.userId} request to get the food list`);
    // const result = await this.foodRepository.update({id: });
    const foodToUpdate = await this.exerciseRepository.find({
      where: { id: createExerciseDto.id },
      relations: {
        created_by: true,
      },
    });

    console.log('foodToUpdate == ', foodToUpdate[0]);

    if (foodToUpdate[0].created_by.id !== user.coach_id) {
      throw new UnauthorizedException(); // should not happen
    }
    foodToUpdate[0].name = createExerciseDto.name;
    foodToUpdate[0].type = createExerciseDto.type;
    foodToUpdate[0].subtype = createExerciseDto.subtype;
    foodToUpdate[0].details = createExerciseDto.details;
    try {
      await this.exerciseRepository.save(foodToUpdate[0]);
      return { update_exercise: true };
    } catch (e) {
      console.log('e === ', e);
      return { update_exercise: false };
    }
  }

  // find all exercise from database
  async findAll() {
    return { exercise_list: await this.exerciseRepository.find() }
  }

  async delete(user: any, toBeDeleted: number) {

    let deleteResult;
    console.log(
      `${user.username} is going to delete exercise with id ${toBeDeleted}`,
    );
    try {
      deleteResult = await this.exerciseRepository.delete({
        id: toBeDeleted,
        created_by: user.coach_id,
      });
    } catch (e) {
      console.log(e);
      return { delete_exercise: false };
    }

    if (deleteResult.affected === 0) {
      throw new UnauthorizedException();
    }
    console.log('result == ', deleteResult);
    return { delete_exercise: true };
  }
}
