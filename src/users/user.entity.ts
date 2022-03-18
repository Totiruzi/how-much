import { AfterInsert, AfterUpdate, AfterRemove, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

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