import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UsersService } from './users.service'
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt); // convert the scrypt function to a promise

@Injectable()
export class AuthService {
  constructor( private usersService: UsersService ) {}

  async signUp(email: string, password: string): Promise<User> {
    // check if user exist
    const signupUser = await this.usersService.findUserByEmail(email);
    if (signupUser) {
      throw new BadRequestException('User already exists');
    }
    // Encrypt user password
    // Hash user password
    const salt = randomBytes(8).toString('hex');

    // Generate the salt
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    // Hash the salt and the password together
    const hashedPassword = `${salt}.${hash.toString('hex')}`;
    // Join the hashed rsult and the password together

    // create user
    const user = await this.usersService.createUser(email, hashedPassword);
    
    // return the user
    return user;
  }
  
  signin(){}
}