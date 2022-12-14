import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/database/student.entity';
import { userInfo } from 'src/share/common';
import { Repository } from 'typeorm';
import UpdateStudentDto from './dto/update_student.dto';

@Injectable()
export class CoachService {
  private readonly logger = new Logger('ExerciseService');
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
  ) { }

  async update(updateStudentData: UpdateStudentDto, user: userInfo) {
    const studentToUpdate = await this.studentRepository.find({
      where: {
        id: updateStudentData.id,
        coach: { id: user.coach_id },
      },
    });

    if (studentToUpdate.length <= 0) {
      console.log('e in update student => no student are found');
      return { update_student: false };
    }
    studentToUpdate[0].display_name = updateStudentData.display_name;
    studentToUpdate[0].isVerified = updateStudentData.isVerified;
    try {
      await this.studentRepository.save(studentToUpdate);
      return { update_student: true };
    } catch (e) {
      console.log('e in update student => ', e);
      return { update_student: false };
    }
  }

  async getStudent(user: userInfo): Promise<{
    student_list: Student[];
  }> {
    const student_list = await this.studentRepository.find({
      where: {
        coach: { id: user.coach_id },
      },
    });

    return { student_list: student_list };
  }
}
