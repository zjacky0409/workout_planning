import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
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

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
