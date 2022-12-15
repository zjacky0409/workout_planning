import { Body, Controller, Post, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ExerciseValidationPipe } from 'src/exercise/pipe/exercise_validate.pipe';
import { Role } from 'src/guards/role_checker/role.enum';
import { RolesGuard } from 'src/guards/role_checker/role.guard';
import { Roles } from 'src/guards/role_checker/roles.decorator';
import { CoachService } from './coach.service';
import UpdateStudentDto from './dto/update_student.dto';

@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}

  // to update student by a coach
  @Roles(Role.Coach)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/update_student')
  async update_student(
    @Request() req,
    @Body(new ValidationPipe()) updateStudentData: UpdateStudentDto,
  ) {
    return await this.coachService.update(updateStudentData, req.user);
  }

  // get all stduent of a coach
  @Roles(Role.Coach)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/get_student')
  async get_student(@Request() req) {
    return await this.coachService.getStudent(req.user);
  }
}
