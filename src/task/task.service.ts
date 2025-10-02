import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument } from './entities/task.entity';
import { CreateTaskDto, UpdateTaskDto } from './dto/task.dto';
import { TaskStatus } from './enum/task-status.enum';
import { ContextService } from 'src/common/services/context.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
    private contextService: ContextService,
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const username = this.contextService.getUsername();
    const taskData = {
      ...createTaskDto,
      assignedUser: username
    };

    const task = new this.taskModel(taskData);
    const savedTask = await task.save();

    return {
      statusCode: 201,
      message: 'Task created successfully',
      data: savedTask
    };
  }

  async findAll(
    status?: TaskStatus,
    assignedUser?: string,
    page: number = 1,
    limit: number = 10
  ) {
    const filter: any = {};

    if (status) filter.status = status;
    if (assignedUser) filter.assignedUser = assignedUser;

    const skip = (page - 1) * limit;

    const tasks = await this.taskModel.find(filter)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.taskModel.countDocuments(filter);
    const currentPageTotal = tasks.length;

    return {
      statusCode: 200,
      message: 'Tasks retrieved successfully',
      data: tasks,
      pagination: {
        total,
        currentPageTotal,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const task = await this.taskModel.findById(id).exec();

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      message: 'Task retrieved successfully',
      data: task
    };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const task = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      message: 'Task updated successfully',
      data: task
    };
  }

  async remove(id: string) {
    const task = await this.taskModel.findByIdAndDelete(id).exec();

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return {
      statusCode: 200,
      message: 'Task deleted successfully',
      data: null
    };
  }
}