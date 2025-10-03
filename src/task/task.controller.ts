import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseFilters, UseGuards } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskStatus } from './enum/task-status.enum';
import { MongoExceptionFilter } from 'src/common/filters/mongo-exception.filter';
import { SwaggerResponse } from 'src/common/swagger-response.helper';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiTags('tasks')
@UseFilters(MongoExceptionFilter)
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  @ApiResponse(SwaggerResponse.taskCreated())
  @ApiResponse(SwaggerResponse.taskValidationError())
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiResponse(SwaggerResponse.tasksRetrieved())
  async findAll(
    @Query('status') status?: TaskStatus,
    @Query('assignedUser') assignedUser?: string,
    @Query('title') title?: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.taskService.findAll(status, assignedUser, title, page, limit);
  }

  @Get(':id')
  @ApiResponse(SwaggerResponse.taskRetrieved())
  @ApiResponse(SwaggerResponse.taskNotFound())
  async findOne(@Param('id') id: string) {
    return this.taskService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse(SwaggerResponse.taskUpdated())
  @ApiResponse(SwaggerResponse.taskNotFound())
  @ApiResponse(SwaggerResponse.taskValidationError())
  async update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ) {
    return this.taskService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @ApiResponse(SwaggerResponse.taskDeleted())
  @ApiResponse(SwaggerResponse.taskNotFound())
  async remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}