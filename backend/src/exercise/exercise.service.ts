import { Injectable } from '@nestjs/common';
import CreateExerciseDto from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';

@Injectable()
export class ExerciseService {
  constructor(
    @InjectRepository(Exercise)
    private exerciseRepository: Repository<Exercise>,
  ) {}
  create(createExerciseDto: CreateExerciseDto, user: any) {
    const metaData: any = {
      created_by: user.username,
      updated_by: user.username,
      // created_at: new Date(Date.now()).toISOString(), // should be no need to set created_at here because we has already set the @CreateDateColumn
      // updated_at: new Date(Date.now()).toISOString(),
    };
    console.log({
      ...createExerciseDto,
      ...metaData,
    });
    console.log(`user ${user.username} is going to create an exercise`);
    console.log('exercise content == ', createExerciseDto);
    // insert to db
    return this.exerciseRepository.insert({
      ...createExerciseDto,
      ...metaData,
    });
  }


  // find all exercise from database
  findAll() {
    return this.exerciseRepository.find();
  }
}
