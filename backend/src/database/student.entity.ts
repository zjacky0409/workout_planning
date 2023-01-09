import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  ManyToMany,
  JoinTable,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Food } from './food.entity';
import { Exercise } from './exercise.entity';
import { Diet } from './diet.entity';
import { User } from './user.entity';
import { Coach } from './coach.entity';
import { Weight } from './weight.entity';
// to define the user structure
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  display_name: string; // easy to select the username for the list of student for a coach
  // students :  [{id: 1, username: "jacky"}] // maybe this username can be enter by a coach after we activate the user

  // @Column()
  // firstName: string;

  // @Column()
  // lastName: string;

  // @Column()
  // phoneNumber: number;

  // @Column()
  // emailAddress: string;

  // @Column()
  // dateOfBirth: string;

  // @Column()
  // age: number;

  // @Column()
  // password: string;

  // @Column()
  // role: string;

  // @OneToMany(() => Food, (food) => food.coach)
  // foods: Food[];

  // @OneToMany(() => Diet, (diet) => diet.created_by)
  // diets: Diet[];

  // @OneToMany(() => Exercise, (exercise) => exercise.created_by)
  // exercises: Exercise[];

  @Column({ default: true })
  isVerified: boolean; // a field that the student is verified bY coach or not

  // @OneToOne(() => User)
  // @JoinColumn()
  // user: User;

  @ManyToOne(() => Coach, (coach) => coach.students)
  @JoinTable()
  @JoinColumn()
  coach: Coach;
  // @OneToOne(() => Company)
  // @JoinColumn()
  // company: Company;

  @OneToMany(() => Weight, (weight) => weight.created_by)
  @JoinColumn()
  weights: Weight[];
}
