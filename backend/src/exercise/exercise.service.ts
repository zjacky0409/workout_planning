import {
  Injectable,
  UnauthorizedException,
  ParseIntPipe,
  Logger,
} from '@nestjs/common';
import CreateExerciseDto from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from 'src/database/exercise.entity';
import { UserService } from 'src/user/user.service';
import { userInfo } from 'src/share/common';
import GetExerciseDto from './dto/get-exercise.dto';
@Injectable()
export class ExerciseService {
  private readonly logger = new Logger('ExerciseService');
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
    private userServive: UserService,
  ) { }
  async create(createExerciseDto: CreateExerciseDto, user: userInfo) {
    this.logger.log(`${user.username} is going to create an exercise`);
    const user_to = await this.userServive.findOne(user.username);
    if (user_to === null) {
      // should not happend
      this.logger.error(`create exericse occur: cannot find the coach`);
      return { create_exercise: false };
    }
    const metaData: any = {
      created_by: user_to.coach,
    };
    this.logger.log(`To be inserted data => `);
    this.logger.log({
      ...createExerciseDto,
      ...metaData,
    });
    // insert to db
    try {
      this.logger.log('going to insert the data to db')
      await this.exerciseRepository.insert({
        ...createExerciseDto,
        ...metaData,
      });
      return { create_exercise: true };
    } catch (e) {
      this.logger.error(`create exercise fail with error ${e}`);
      return { create_exercise: false };
    }
  }

  async update(createExerciseDto: UpdateExerciseDto, user: userInfo) {
    console.log('user == ', user)
    console.log(`user ${user.userId} request to get the food list`);
    // select the data from the database
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

    // modify the record
    foodToUpdate[0].name = createExerciseDto.name;
    foodToUpdate[0].type = createExerciseDto.type;
    foodToUpdate[0].subtype = createExerciseDto.subtype;
    foodToUpdate[0].details = createExerciseDto.details;
    try {
      // save the change
      await this.exerciseRepository.save(foodToUpdate[0]);
      return { update_exercise: true };
    } catch (e) {
      console.log('e === ', e);
      return { update_exercise: false };
    }
  }

  // find all exercise from database
  async findAll(user: userInfo, getExerciseDto: GetExerciseDto) {
    let toBeSerachedId = -999
    if (user.student_coach_id !== -999) {
      toBeSerachedId = user.student_coach_id;
    } else {
      toBeSerachedId = user.coach_id;
    }

    if (getExerciseDto.subtype === 'Summary') {
      return {
        exercise_list: await this.exerciseRepository.find({
          where: {
            created_by: { id: toBeSerachedId },
            type: getExerciseDto.type,
          },
        }),
      };
    }
    return {
      exercise_list: await this.exerciseRepository.find({
        where: {
          created_by: { id: toBeSerachedId },
          type: getExerciseDto.type,
          subtype: getExerciseDto.subtype,
        },
      }),
    };
  }

  // to delete an exericse
  async delete(user: userInfo, toBeDeleted: number) {

    let deleteResult;
    console.log(
      `${user.username} is going to delete exercise with id ${toBeDeleted}`,
    );
    try {
      deleteResult = await this.exerciseRepository.delete({
        id: toBeDeleted,
        created_by: { id: user.coach_id },
      });
    } catch (e) {
      console.log(e);
      return { delete_exercise: false };
    }

    if (deleteResult.affected === 0) {
      // should not happen
      throw new UnauthorizedException();
    }
    console.log('result == ', deleteResult);
    return { delete_exercise: true };
  }
}
