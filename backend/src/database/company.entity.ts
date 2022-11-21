import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { Food } from './food.entity';
import { Exercise } from './exercise.entity';
import { Diet } from './diet.entity';
import { Coach } from './coach.entity';
// to define the user structure
@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;
}
