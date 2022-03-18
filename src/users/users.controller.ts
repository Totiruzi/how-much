import { Body, Controller, Post, Get, Patch, Param, Delete, NotFoundException, UseInterceptors } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UsersService } from './users.service';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor( private userService: UsersService) {}

  @Get('/')
  findAllUser() {
    return this.userService.findAllUser();
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.createUser(body.email, body.password);
    return body;
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
