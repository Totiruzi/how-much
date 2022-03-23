import { 
  Body, 
  Controller, 
  Post, 
  Get, 
  Patch, 
  Param, 
  Delete, 
  NotFoundException, 
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserGuard } from './guards/auth.gaurd';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor( 
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/')
  findAllUser() {
    return this.userService.findAllUser();
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;
    return user;
    // return this.authService.signup(body.email, body.password)
  }

  @Post('/signin')
  async signin(@Body() body: CreateUserDto, @Session() session: any) {
    const user =  await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // @Get('/whoami')
  // whoami(@Session() session: any, @CurrentUser() user: any) {
  //   return this.userService.findOneUser(session.userId);
  // }

  @Get('/whoami')
  whoami(@CurrentUser() user: User) {
    return user;
  }

  @Get('/:id')
  async findOneUser(@Param('id') id: string) {
    const user = await this.userService.findOneUser(parseInt(id));
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return user;
  }

  @Patch('/:id')
  @UseGuards(CurrentUserGuard)
  updateUser(@Param('id') id: string, @Body() body: Partial<UpdateUserDto>) {
    return this.userService.updateUser(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(parseInt(id));
  }

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
    return { message: 'You are signed out!' };
  }
}
