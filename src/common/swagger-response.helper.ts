import { ApiResponseOptions } from '@nestjs/swagger';

export class SwaggerResponse {
  static success(
    description: string,
    example?: any,
    status = 200
  ): ApiResponseOptions {
    return {
      status,
      description,
      schema: {
        example: example || { message: 'Success' }
      }
    };
  }

  static validationError(example?: any): ApiResponseOptions {
    return {
      status: 400,
      description: 'Validation error',
      schema: {
        example: example || {
          message: ['field must be a string', 'field is required'],
          error: 'Bad Request',
          statusCode: 400
        }
      }
    };
  }

  static unauthorized(description = 'Unauthorized', example?: any): ApiResponseOptions {
    return {
      status: 401,
      description,
      schema: {
        example: example || {
          message: 'Unauthorized',
          statusCode: 401
        }
      }
    };
  }

  static conflict(description = 'Conflict', example?: any): ApiResponseOptions {
    return {
      status: 409,
      description,
      schema: {
        example: example || {
          message: 'Resource already exists',
          statusCode: 409
        }
      }
    };
  }

  static created(description = 'Created successfully', example?: any): ApiResponseOptions {
    return {
      status: 201,
      description,
      schema: {
        example: example || {
          message: 'Resource created successfully'
        }
      }
    };
  }

  // Auth-specific responses
  static loginSuccess(): ApiResponseOptions {
    return this.success(
      'Login successful',
      {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
        user: {
          id: '507f1f77bcf86cd799439011',
          username: 'john.doe',
          email: 'john.doe@example.com'
        }
      }
    );
  }

  static invalidCredentials(): ApiResponseOptions {
    return this.unauthorized(
      'Invalid credentials',
      {
        message: 'Invalid credentials',
        statusCode: 401
      }
    );
  }

  static registerSuccess(): ApiResponseOptions {
    return this.created(
      'User registered successfully',
      {
        message: 'User registered successfully',
        user: {
          id: '507f1f77bcf86cd799439011',
          username: 'john.doe',
          email: 'john.doe@example.com',
          role: 'user',
          isActive: true
        }
      }
    );
  }

  static userConflict(): ApiResponseOptions {
    return this.conflict(
      'User already exists',
      {
        message: 'User with this username or email already exists',
        statusCode: 409
      }
    );
  }

  // Task-specific responses
  static taskCreated(): ApiResponseOptions {
    return this.created(
      'Task created successfully',
      {
        message: 'Task created successfully',
        task: {
          _id: '507f1f77bcf86cd799439011',
          title: 'Complete project documentation',
          description: 'Write detailed documentation for the API endpoints',
          status: 'Pending',
          assignedUser: 'john.doe',
          dueDate: '2024-12-31T23:59:59.999Z',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z'
        }
      }
    );
  }

  static tasksRetrieved(): ApiResponseOptions {
    return this.success(
      'Tasks retrieved successfully',
      {
        message: 'Tasks retrieved successfully',
        tasks: [
          {
            _id: '507f1f77bcf86cd799439011',
            title: 'Complete project documentation',
            description: 'Write detailed documentation for the API endpoints',
            status: 'Pending',
            assignedUser: 'john.doe',
            dueDate: '2024-12-31T23:59:59.999Z',
            createdAt: '2024-01-01T00:00:00.000Z',
            updatedAt: '2024-01-01T00:00:00.000Z'
          }
        ]
      }
    );
  }

  static taskRetrieved(): ApiResponseOptions {
    return this.success(
      'Task retrieved successfully',
      {
        message: 'Task retrieved successfully',
        task: {
          _id: '507f1f77bcf86cd799439011',
          title: 'Complete project documentation',
          description: 'Write detailed documentation for the API endpoints',
          status: 'Pending',
          assignedUser: 'john.doe',
          dueDate: '2024-12-31T23:59:59.999Z',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-01T00:00:00.000Z'
        }
      }
    );
  }

  static taskUpdated(): ApiResponseOptions {
    return this.success(
      'Task updated successfully',
      {
        message: 'Task updated successfully',
        task: {
          _id: '507f1f77bcf86cd799439011',
          title: 'Updated task title',
          description: 'Updated description',
          status: 'In Progress',
          assignedUser: 'jane.doe',
          dueDate: '2024-12-31T23:59:59.999Z',
          createdAt: '2024-01-01T00:00:00.000Z',
          updatedAt: '2024-01-02T00:00:00.000Z'
        }
      }
    );
  }

  static taskDeleted(): ApiResponseOptions {
    return this.success(
      'Task deleted successfully',
      {
        message: 'Task deleted successfully',
        data: null
      }
    );
  }

  static taskNotFound(): ApiResponseOptions {
    return this.notFound(
      'Task not found',
      {
        message: 'Task with ID 507f1f77bcf86cd799439011 not found',
        statusCode: 404
      }
    );
  }

  static taskValidationError(): ApiResponseOptions {
    return this.validationError({
      message: [
        'title must be a string',
        'title should not be empty',
        'status must be one of: Pending, In Progress, Completed',
        'dueDate must be a valid ISO 8601 date string'
      ],
      error: 'Bad Request',
      statusCode: 400
    });
  }

  static notFound(description = 'Not found', example?: any): ApiResponseOptions {
    return {
      status: 404,
      description,
      schema: {
        example: example || {
          message: 'Resource not found',
          statusCode: 404
        }
      }
    };
  }
}