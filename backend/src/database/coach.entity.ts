import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Food } from './food.entity';
import { Exercise } from './exercise.entity';
import { Diet } from './diet.entity';
import { Company } from './company.entity';
import { User } from './user.entity';
import { Student } from './student.entity';
// to define the user structure
@Entity()
export class Coach {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  introduction: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Food, (food) => food.coach)
  foods: Food[];

  @OneToMany(() => Diet, (diet) => diet.created_by)
  diets: Diet[];

  @OneToMany(() => Exercise, (exercise) => exercise.created_by)
  exercises: Exercise[];

  @OneToOne(() => Company)
  @JoinColumn()
  company: Company;
}
