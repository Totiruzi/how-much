import { AfterInsert, AfterUpdate, AfterRemove, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Report } from '../reports/reports.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany( () => Report, report => report.user )
  reports: Report[];

  @AfterInsert() 
  logInsert() {
    console.log('User inserted');
  }

  @AfterUpdate()
  logUpdate() {
    console.log('User updated');
  }

  @AfterRemove()
  logRemove() {
    console.log('User removed');
  }
}