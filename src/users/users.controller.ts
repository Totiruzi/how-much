import { Body, Controller, Post, Get, Patch, Param, Delete } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
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
  findOneUser(@Param('id') id: string) {
    return this.userService.findOneUser(parseInt(id));
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
