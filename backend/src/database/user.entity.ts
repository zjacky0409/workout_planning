import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn
} from 'typeorm';
import { Food } from './food.entity';
import { Coach } from './coach.entity';
import { Student } from './student.entity';

// to define the user structure
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  phoneNumber: number;

  @Column()
  emailAddress: string;

  @Column()
  dateOfBirth: string;

  @Column()
  age: number;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Coach, { nullable: true })
  @JoinColumn()
  coach: Coach;

  @OneToOne(() => Student, { nullable: true })
  @JoinColumn()
  student: Student;
}
