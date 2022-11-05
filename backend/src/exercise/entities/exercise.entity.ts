import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column() // should be forgien key of user table
  created_by: string;

  @Column() // should be forgien key of user table
  created_at: Date;

  @Column() // should be forgien key of user table
  updated_at: Date;
}
