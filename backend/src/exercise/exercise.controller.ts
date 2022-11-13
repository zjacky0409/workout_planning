import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import CreateExerciseDto from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  // for creating an exercise record
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createExerciseDto: CreateExerciseDto) {
    return this.exerciseService.create(createExerciseDto, req.user);
  }

  // get all exercises from db
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    console.log(`${req.user.username} request to get all the exercises`);
    return this.exerciseService.findAll();
  }
}
