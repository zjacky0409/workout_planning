import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { FoodService } from './food.service';
import { ValidationPipe } from '../pipes/validate.pipe';
import CreateFoodDto from './dto/create-food.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  create(
    @Request() req,
    @Body(new ValidationPipe()) createFoodDto: CreateFoodDto,
  ) {
    return this.foodService.create(createFoodDto, req.user);
  }
}
