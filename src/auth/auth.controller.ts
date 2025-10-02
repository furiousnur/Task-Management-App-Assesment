import { Controller, Post, Body, HttpCode, HttpStatus, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SwaggerResponse } from 'src/common/swagger-response.helper';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exception.filter';

@Controller('auth')
@UseFilters(MongoExceptionFilter)
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'User login',
    description: 'Authenticate user with username and password'
  })
  @ApiBody({ type: LoginDto })
  @ApiResponse(SwaggerResponse.loginSuccess())
  @ApiResponse(SwaggerResponse.invalidCredentials())
  @ApiResponse(SwaggerResponse.validationError({
    message: ['username must be a string', 'password must be at least 6 characters'],
    error: 'Bad Request',
    statusCode: 400
  }))
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.validateUser(loginDto.username, loginDto.password);
  }

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'User registration',
    description: 'Register a new user with username, email, password, and confirm password'
  })
  @ApiBody({ type: RegisterDto })
  @ApiResponse(SwaggerResponse.registerSuccess())
  @ApiResponse(SwaggerResponse.userConflict())
  @ApiResponse(SwaggerResponse.validationError({
    message: [
      'username must be a string',
      'email must be a valid email',
      'password must be at least 6 characters',
      'confirmPassword must be at least 6 characters',
      'confirmPassword must match the password'
    ],
    error: 'Bad Request',
    statusCode: 400
  }))
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
}
