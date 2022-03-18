import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepo: Repository<User>) {}

  createUser(email: string, password: string ): Promise<User> {
    const user = this.userRepo.create({ email, password });
    return this.userRepo.save(user);
    // return this.userRepo.save({ email, password });
  }

  findAllUser(): Promise<User[]> {
    return this.userRepo.find();
  }

  findOneUser(id: number): Promise<User> {
    return this.userRepo.findOne(id);
  }

  async updateUser(id: number, attrs: Partial<User>) {
    const user = await this.findOneUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.userRepo.save(user);
  }

  async removeUser(id: number) {
    const user = await this.findOneUser(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.remove(user);
  }
  
}

