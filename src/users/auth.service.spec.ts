import { User } from './user.entity';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

describe('AuthService', () => {
  let authService: AuthService;
  let fakeUserService: Partial<UsersService>;

  beforeEach(async () => {
    // Create a fake copy of the user service
    const users: User[] = []
    fakeUserService = {
      findUserByEmail: (email: string) => {
        const filteredUser = users.filter(u => u.email === email);
        return Promise.resolve(filteredUser[0]);
      },
      createUser: (email: string, password: string) => {
        const newUser = {id: users.length + 1, email, password} as User;
        users.push(newUser);
        return Promise.resolve(newUser);
        
      }
    }
    const module = await Test.createTestingModule({
      providers: [
        AuthService, 
        {
          provide: UsersService,
          useValue: fakeUserService,
        }
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  })

  it('can create an instance of Auth service',async () => {
    expect(authService).toBeDefined();
  })

  it('create a new user with salted and hashed password' , async () => {
    let user;
    try {
      user = await authService.signup('zakky@bob.com', 'bobby');
      expect(user.password).not.toEqual('bobby');
      const [salt, hash] = user.password.split('.');
      expect(salt).toBeDefined();
      expect(hash).toBeDefined();
    } catch (err){
      console.log(err);
    }    
  });

  it('throw an error if user with email is in use', async () => {
    await authService.signup('z@zoro.com', 'bobby');
    try {
      await authService.signup('z@zoro.com', 'zoro');
    } catch (error) {
      expect(error.message).toEqual('User already exists');
    }
  })

  it('throw an error if invalid password', async () => {
    await authService.signup('pace@pacecom', 'pace');
    try {
      await authService.signin('pace@pacecom', 'pae');
    } catch (error) {
      expect(error.message).toEqual('Invalid password or email');
    }
  })

  it('return a user if correct password is provided', async () => {
    await authService.signup('grace@grace.com', 'grace');

    const user = await authService.signin('grace@grace.com', 'grace');
    console.log(user);
    expect(user).toBeDefined();
  })
});
