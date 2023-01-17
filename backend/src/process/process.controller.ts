import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { ProcessService } from './process.service';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IsVerifiedGuard } from 'src/guards/isVerified.guard';
import { Role } from 'src/guards/role_checker/role.enum';
import { RolesGuard } from 'src/guards/role_checker/role.guard';
import { Roles } from 'src/guards/role_checker/roles.decorator';
import { ValidationPipe } from '../pipes/validate.pipe';
import { GetStudentWeightDTO } from './dto/get-student-weight.dto';

@Controller('process')
export class ProcessController {
  constructor(private readonly processService: ProcessService) { }

  @Roles(Role.Student)
  @UseGuards(JwtAuthGuard, RolesGuard, IsVerifiedGuard)
  @Post('/create_weight')
  create(
    @Request() req,
    @Body(new ValidationPipe()) createProcessDto: CreateProcessDto,
  ) {
    return this.processService.create(req.user, createProcessDto);
  }

  @Get()
  findAll() {
    return this.processService.findAll();
  }

  @UseGuards(JwtAuthGuard, IsVerifiedGuard)
  @Get('/get_all_weight')
  findAllWeight(@Request() req) {
    return this.processService.findAllWeight(req.user);
  }

  @Roles(Role.Coach)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/get_student_weight')
  getUserWeight(
    @Request() req,
    @Body(new ValidationPipe()) getStudentWeightDTO: GetStudentWeightDTO,
  ) {
    return this.processService.findStudentWeight(req.user, getStudentWeightDTO);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.processService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProcessDto: UpdateProcessDto) {
    return this.processService.update(+id, updateProcessDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.processService.remove(+id);
  }
}
