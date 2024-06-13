import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entity/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  getMsg() {
    return 'Server Running';
  }

  @Get('find')
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Post('post')
  registerUser(@Body() user: User): Promise<User> {
    return this.usersService.registerUser(user);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: number): Promise<void> {
    return this.usersService.remove(id);
  }

  @Post('login')
  async loginUser(@Body() user: User) {
    const { email, password } = user;
    const newUser = await this.usersService.loginUser(email, password);
    if (newUser) {
      return {
        success: true,
        message: 'User Logged in',
      };
    } else {
      return {
        success: false,
        message: 'User Logged in Error',
      };
    }
  }
}
