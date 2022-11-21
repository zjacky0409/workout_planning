import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Food } from './food.entity';
import { User } from './user.entity';
import { Coach } from './coach.entity';
// to define the user structure
@Entity()
export class Diet {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  type: string; // trainning day or rest day

  // @User()
  // type: string; // trainning day or rest day

  // nth meal 
  @Column()
  meal_th: string;

  @ManyToOne(() => Food, (food) => food.diets) // or ManyToMany??
  food: Food

  @ManyToOne(() => Coach, (coach) => coach.diets)
  created_by: Coach

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
  


}
