import { Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/database/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [CoachController],
  providers: [CoachService],
})
export class CoachModule {}
