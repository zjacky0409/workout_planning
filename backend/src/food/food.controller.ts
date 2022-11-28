import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { ValidationPipe } from '../pipes/validate.pipe';
import CreateFoodDto from './dto/create-food.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/role_checker/role.guard';
import { Role } from 'src/role_checker/role.enum';
import { Roles } from 'src/role_checker/roles.decorator';
import { UpdateFoodDto } from './dto/update-exercise.dto';
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) { }

  @Roles(Role.Coach)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/create')
  create(
    @Request() req,
    @Body(new ValidationPipe()) createFoodDto: CreateFoodDto,
  ) {
    return this.foodService.create(createFoodDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get')
  get(@Request() req) {
    return this.foodService.getFood(req.user);
  }

  @Roles(Role.Coach)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('update')
  update(
    @Request() req,
    @Body(new ValidationPipe()) updateFoodDto: UpdateFoodDto,
  ) {
    return this.foodService.updateFood(updateFoodDto, req.user);
  }
}
