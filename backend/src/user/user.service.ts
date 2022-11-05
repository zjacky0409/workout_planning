import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
// import CreateExerciseDto from 'src/exercise/dto/create-exercise.dto';
import { CreateUserDto } from './dto/create-user.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const metaData = {
      role: 'user',
      isActive: true,
    };
    const insertToDB = { ...user, ...metaData };
    console.log('insertToDB --> ', insertToDB);

    const new_user = this.usersRepository.create(insertToDB);
    try {
      await this.usersRepository.save(new_user);
      return { create_user: true };
    } catch {
      return { create_user: false };
    }
    // return 'HI'
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(username: string): Promise<User> {
    return this.usersRepository.findOneBy({ username: username });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
