import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import CreateExerciseDto from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';
import { Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Request() req, @Body() createExerciseDto: CreateExerciseDto) {
    // console.log()
    // console.log(req.user)
    return this.exerciseService.create(createExerciseDto, req.user);
  }

  @Get()
  findAll() {
    return this.exerciseService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.exerciseService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateExerciseDto: UpdateExerciseDto) {
  //   return this.exerciseService.update(+id, updateExerciseDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.exerciseService.remove(+id);
  // }
}
