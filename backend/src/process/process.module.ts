import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weight } from 'src/database/weight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Weight])],
  controllers: [ProcessController],
  providers: [ProcessService]
})
export class ProcessModule {}
