import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Food } from './food.entity';
import { Exercise } from './exercise.entity';
import { Diet } from './diet.entity';
import { Company } from './company.entity';
// to define the user structure
@Entity()
export class Coach {
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

  @Column()
  role: string;

  @OneToMany(() => Food, (food) => food.created_by)
  foods: Food[];

  @OneToMany(() => Diet, (diet) => diet.created_by)
  diets: Diet[];

  @OneToMany(() => Exercise, (exercise) => exercise.created_by)
  exercises: Exercise[];

  @Column({ default: true })
  isActive: boolean;

  @OneToOne(() => Company)
  @JoinColumn()
  company: Company;
}
