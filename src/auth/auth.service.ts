import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private users = [
    { id: 1, username: 'admin', password: bcrypt.hashSync('admin123', 10) },
  ];

  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name)
    private userModel: Model<User>,
    private readonly configService: ConfigService
  ) { }

  async validateUser(username: string, password: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      return {
        statusCode: 401,
        message: 'Invalid credentials',
        data: null
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user && isPasswordValid) {
      return {
        statusCode: 200,
        message: 'User validated successfully',
        data: {
          id: user._id.toString(),
          username: user.username,
          email: user.email,
          role: user.role,
          isActive: user.isActive,
          access_token: this.jwtService.sign({ username: user.username, sub: user._id })
        }
      };
    }
    return {
      statusCode: 401,
      message: 'Invalid credentials',
      data: null
    };
  }

  async register(registerDto: RegisterDto) {
    if(registerDto.password !== registerDto.confirmPassword) {
      return {
        statusCode: 400,
        message: 'Password and confirm password do not match',
        data: null
      };
    }
    const user = await this.userModel.create({
      ...registerDto,
      password: await bcrypt.hash(registerDto.password, this.configService.get<number>('BCRYPT_SALT_ROUNDS') || 10),
    });
    return {
      statusCode: 200,
      message: 'User registered successfully',
      data: user
    };
  }

  async verifyToken() {
    return {
      statusCode: 200,
      message: 'Token is valid',
      data: { valid: true }
    };
  }
}
