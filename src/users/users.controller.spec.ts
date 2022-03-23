import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeAuthService = {
      signin: (email: string, password: string) => { 
        return Promise.resolve({id: 1, email, password} as User);
      },

      signup: (email: string, password: string) => { 
        return Promise.resolve({id: 2, email, password} as User);
      }
    };

    fakeUsersService = {
      findAllUser: () => {
        return Promise.resolve([{}] as User[]);
      },

      findOneUser: (id: number) => {
        return Promise.resolve({ id, email: 'come@g.com', password: 'come' } as User);
      },

      // createUser: (email: string, password: string) => {
      //   return Promise.resolve({ id: 2, email, password } as User);
      // },
      // createUser: jest.fn(),
      // updateUser: jest.fn(),

    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        }
      ]
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findAllUser should return all users', async () => {
    const users = await controller.findAllUser();
    expect(users).toEqual([{}]);
  });

  it('findOneUser should return a single user with the given id', async () => {
    const user =  await controller.findOneUser('1');
    expect(user).toBeDefined();
  })

  it('findOneUser should throw an error if user with given id is not found', async () => {
    fakeUsersService.findOneUser = (id: number) => {
      return Promise.resolve(null);
    };

    try {
      await controller.findOneUser('2');
    } catch (error) {
      expect(error.message).toEqual('User does not exist!');
    }
  })

  it('signin, updare session and return a user', async () => {
    const session = {userId: -4};
    const user = await controller.signin({email:'graceful.g.com', password:'grace'}, session);

    expect(user.id).toEqual(1);
    expect(session.userId).toEqual(1);
  })

  it('createUser creates a new user, session snd returns a user', async () => {
    const session = {userId: -7};
    const user = await controller.createUser({email: 'grate@g.com', password:'grate'}, session);
  
    expect(user.id).toEqual(2);
    expect(session.userId).toEqual(2);
  });
  
});
