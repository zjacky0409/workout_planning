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
import { RolesGuard } from 'src/role_checker/role.guard';
import { Role } from 'src/role_checker/role.enum';
import { Roles } from 'src/role_checker/roles.decorator';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Roles(Role.Coach)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/create')
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
