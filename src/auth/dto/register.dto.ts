import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsEmail, Matches, MaxLength } from 'class-validator';
import { Match } from '../decorators/match.decorator';

export class RegisterDto {
  @ApiProperty({
    example: 'john.doe',
    description: 'Username of the user (3-30 characters, letters, numbers, underscores, dots, and hyphens only)'
  })
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters' })
  @MaxLength(30, { message: 'Username cannot exceed 30 characters' })
  @Matches(/^[a-zA-Z0-9_.-]+$/, {
    message: 'Username can only contain letters, numbers, underscores, dots, and hyphens'
  })
  username: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'Email of the user'
  })
  @IsEmail({}, { message: 'Please provide a valid email' })
  @Matches(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, {
    message: 'Please provide a valid email address'
  })
  email: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'Password of the user (minimum 6 characters)'
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password: string;

  @ApiProperty({
    example: 'P@ssw0rd!',
    description: 'Confirm password must match the password'
  })
  @IsString({ message: 'Confirm password must be a string' })
  @MinLength(6, { message: 'Confirm password must be at least 6 characters' })
  @Match('password', { message: 'Confirm password must match the password' })
  confirmPassword: string;
}