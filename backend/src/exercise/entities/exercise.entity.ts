import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
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

  @Column() // should be forgien key of user table
  created_by: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
