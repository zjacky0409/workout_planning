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
    console.log('createExerciseDto == ', createExerciseDto)
    const metaData: any = {
      created_by: user.username,
      updated_by: user.username,
      created_at: new Date(Date.now()).toISOString(),
      updated_at: new Date(Date.now()).toISOString(),
    };
    console.log({
      ...createExerciseDto,
      ...metaData,
    })
    return this.exerciseRepository.insert({
      ...createExerciseDto,
      ...metaData,
    });
  }

  findAll() {
    return this.exerciseRepository.find();
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} exercise`;
  // }

  // update(id: number, updateExerciseDto: UpdateExerciseDto) {
  //   return `This action updates a #${id} exercise`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} exercise`;
  // }
}
