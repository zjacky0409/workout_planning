import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  JoinColumn,
} from 'typeorm';
import { Food } from './food.entity';
import { User } from './user.entity';
import { Coach } from './coach.entity';
import { Student } from './student.entity';
// to define the user structure
@Entity()
export class Weight {
  @PrimaryGeneratedColumn()
  id: number;
  // units is kg
  @Column()
  weight: number;

  @Column()
  date: Date;

  @Column()
  comments: string; // trainning day or rest day

  @ManyToOne(() => Student, (student) => student.weights)
  @JoinTable()
  @JoinColumn()
  created_by: Student;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
