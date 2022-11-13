import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// to define the user structure
@Entity()
export class User {
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

  @Column({ default: true })
  isActive: boolean;
}
