import { 
  Body, 
  Controller, 
  Post, 
  Get, 
  Patch, 
  Param, 
  Delete, 
  NotFoundException, 
  Session 
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';

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
  createUser(@Body() body: CreateUserDto) {
    // this.userService.createUser(body.email, body.password);
    return this.authService.signup(body.email, body.password);
  }

  @Post('/signin')
  signin(@Body() body: CreateUserDto) {
    return this.authService.signin(body.email, body.password);
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
  updateUser(@Param('id') id: string, @Body() body: Partial<UpdateUserDto>) {
    return this.userService.updateUser(parseInt(id), body);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.userService.removeUser(parseInt(id));
  }
}
