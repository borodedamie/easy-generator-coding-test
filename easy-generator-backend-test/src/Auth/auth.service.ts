import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { UserDocument } from 'src/Users/users.model';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './auth.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger('AuthService');

  constructor(
    @InjectModel('users') private userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    try {
      const user = await this.userModel.findOne({
        email: signInDto.email.toLowerCase(),
      });

      if (!user) {
        this.logger.warn(`User not found: ${signInDto.email}`);
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      if (user && (await bcrypt.compare(signInDto.password, user.password))) {
        this.logger.log(`User signed in: ${user.email}`);
        const token = this.jwtService.sign({ id: user._id });
        return {
          email: user.email,
          name: user.name,
          token: token,
        };
      } else {
        this.logger.warn(`Invalid email or password: ${signInDto.email}`);
        throw new HttpException(
          'Invalid email or password',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (error) {
      this.logger.error(`Error occurred: ${error.message}`);
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}