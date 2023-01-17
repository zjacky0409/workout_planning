import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Weight } from 'src/database/weight.entity';
import { UserService } from 'src/user/user.service';
import { UserModule } from 'src/user/user.module';
import { Student } from 'src/database/student.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Weight, Student]), UserModule],
  controllers: [ProcessController],
  providers: [ProcessService]
})
export class ProcessModule {}
