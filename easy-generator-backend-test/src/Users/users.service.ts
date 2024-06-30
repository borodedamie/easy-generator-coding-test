import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from './users.model';
import { CreateUserDto } from './users.dto';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  private readonly logger = new Logger('UserService');
  
  constructor(
    @InjectModel('users') private userModel: Model<UserDocument>,
  ) {}

  async signUp(createUserDto: CreateUserDto): Promise<User> {
    try {
      const salt = bcrypt.genSaltSync(10)

      const hashedPassword = await bcrypt.hashSync(
        createUserDto.password,
        salt,
      );

      const user = new this.userModel({
        ...createUserDto,
        password: hashedPassword,
      });

      return user.save();
    } catch (error) {
      this.logger.error(`Error occurred: ${error.message}`);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}