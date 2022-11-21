import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Coach } from './coach.entity'
// define exercise structure
@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  details: string;

  // @Column()
  // created_by: number;

  @ManyToOne(() => Coach, (coach) => coach.exercises)
  @JoinColumn({ name: 'created_by' }) // to specify the column name?
  created_by: Coach;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
