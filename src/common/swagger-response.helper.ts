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
}