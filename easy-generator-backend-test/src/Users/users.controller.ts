import { Controller, Body, Post } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto } from './users.dto';
import { User } from './interfaces/user.interface';

@Controller('sign-up')
export class UserController {  
  constructor(private readonly userService: UserService) {}

  @Post()
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.userService.signUp(createUserDto);
  }
}