import { Module } from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodController } from './food.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from 'src/database/food.entity';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Food]), UserModule],
  controllers: [FoodController],
  providers: [FoodService],
})
export class FoodModule {}
