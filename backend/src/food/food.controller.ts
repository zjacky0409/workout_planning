import {
  Controller,
  Body,
  Post,
  UseGuards,
  Request,
  Get,
  ParseIntPipe
} from '@nestjs/common';
import { FoodService } from './food.service';
import { ValidationPipe } from '../pipes/validate.pipe';
import CreateFoodDto from './dto/create-food.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/guards/role_checker/role.guard';
import { Role } from 'src/guards/role_checker/role.enum';
import { Roles } from 'src/guards/role_checker/roles.decorator';
import { UpdateFoodDto } from './dto/update-exercise.dto';
import DeleteFoodDto from './dto/delete-food.dto';
import { IsVerifiedGuard } from 'src/guards/isVerified.guard';
@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Roles(Role.Coach)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('/create')
  create(
    @Request() req,
    @Body(new ValidationPipe()) createFoodDto: CreateFoodDto,
  ) {
    return this.foodService.create(createFoodDto, req.user);
  }

  @UseGuards(JwtAuthGuard, IsVerifiedGuard)
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

  @Roles(Role.Coach)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('delete')
  delete(
    @Request() req,
    @Body(new ValidationPipe()) toBedelete: DeleteFoodDto,
  ) {
    return this.foodService.deleteFood(toBedelete, req.user);
  }
}
