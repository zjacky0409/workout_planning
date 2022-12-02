import { Injectable } from '@nestjs/common';
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

  // find all exercise from database
  async findAll() {
    return { exercise_list: await this.exerciseRepository.find() }
  }
}
