import { Entity, Column, PrimaryGeneratedColumn, ManyToOne,CreateDateColumn ,UpdateDateColumn  } from 'typeorm';
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

  @ManyToOne(() => Coach, (coach) => coach.exercises)
  created_by: Coach;

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
