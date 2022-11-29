import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from 'typeorm';
import {User} from './user.entity'
import { Coach } from './coach.entity';
import { Diet } from './diet.entity';
// to define the user structure
@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  carbs: number;

  @Column()
  protein: number;

  @Column()
  fat: number;

  // @Column()
  // created_by: number;

  @OneToMany(() => Diet, (diet) => diet.food) // or ManyToMany??
  diets: Diet[];

  @ManyToOne(() => Coach, (coach) => coach.foods, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'created_by' })
  coach: Coach;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
