import { Module } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { ExerciseController } from './exercise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exercise } from 'src/database/exercise.entity';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [TypeOrmModule.forFeature([Exercise]), UserModule],
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExerciseModule {}
