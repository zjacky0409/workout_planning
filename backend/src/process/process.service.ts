import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { userInfo } from 'src/share/common';
import { Weight } from 'src/database/weight.entity';
import { Repository } from 'typeorm';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProcessService {
  
  constructor(
    @InjectRepository(Weight)
    private weightResource: Repository<Weight>,
    private userServive: UserService,
  ) { }

  async create(user: userInfo, createProcessDto: CreateProcessDto) {
    console.log('userInfo => ', user)
    console.log('createProcessDto => ', createProcessDto)

    const user_to = await this.userServive.findOne(user.username);
    if (user_to === null) {
      // should not happend
      console.error(`create exericse occur: cannot find the student`);
      return { create_exercise: false };
    }
    const metaData: any = {
      created_by: user_to.student,
    };
    try {
      console.log('going to insert the data to db')
      await this.weightResource.insert({
        ...createProcessDto,
        ...metaData,
      });
      return { create_exercise: true };
    } catch (e) {
      console.error(`create exercise fail with error ${e}`);
      return { create_exercise: false };
    }

    return 'This action adds a new process';
  }

  findAll() {
    return `This action returns all process`;
  }

  async findAllWeight(user: userInfo): Promise<Weight[]> {
    console.log(user.userId + ' is going to find the weight from the database');
    console.log(user)
    const weight = await this.weightResource.find({
      where: { created_by: { id: user.student_id } },
      select: {
        weight: true,
        comments: true,
        date: true,
    },
    });

    return weight;
  }

  findOne(id: number) {
    return `This action returns a #${id} process`;
  }

  update(id: number, updateProcessDto: UpdateProcessDto) {
    return `This action updates a #${id} process`;
  }

  remove(id: number) {
    return `This action removes a #${id} process`;
  }
}
