import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service'
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt); // convert the scrypt function to a promise

@Injectable()
export class AuthService {
  constructor( private usersService: UsersService ) {}

  async signup(email: string, password: string): Promise<User> {
    // check if user exist
    const signupUser = await this.usersService.findUserByEmail(email);
    if (signupUser) {
      throw new BadRequestException('User already exists');
    }
    // Encrypt user password
    // Hash user password
    const salt = randomBytes(8).toString('hex');

    // Generate the salt
    // Hash the salt and the password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // Join the hashed rsult and the password together
    const hashedPassword = `${salt}.${hash.toString('hex')}`;

    // create user
    const user = await this.usersService.createUser(email, hashedPassword);
    
    // return the user
    return user;
  }
  
  async signin( email: string, password: string) {
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [ salt, storedHash ] = user.password.split('.');
    
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    if(hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Invalid password or email');
    }
    return user;
  }
}