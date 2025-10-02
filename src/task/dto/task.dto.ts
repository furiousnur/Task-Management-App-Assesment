import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, IsDateString, IsNotEmpty } from 'class-validator';
import { TaskStatus } from '../enum/task-status.enum';

export class CreateTaskDto {
  @ApiProperty({ example: 'Complete project documentation', description: 'Title of the task' })
  @IsString()
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @ApiProperty({ example: 'Write detailed documentation for the API endpoints', description: 'Description of the task', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: TaskStatus, example: TaskStatus.Pending, description: 'Status of the task', required: false })
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;

  @ApiProperty({ example: '2024-12-31T23:59:59.999Z', description: 'Due date for the task', required: false })
  @IsDateString()
  @IsOptional()
  dueDate?: Date;
}

export class UpdateTaskDto extends PartialType(CreateTaskDto) { }