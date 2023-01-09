import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Weight } from 'src/database/weight.entity';
import { userInfo } from 'src/share/common';
import { Repository } from 'typeorm';
import { CreateProcessDto } from './dto/create-process.dto';
import { UpdateProcessDto } from './dto/update-process.dto';

@Injectable()
export class ProcessService {
  constructor(
    @InjectRepository(Weight)
    private weightResource: Repository<Weight>,
  ) { }

  create(createProcessDto: CreateProcessDto) {
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
