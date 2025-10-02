import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    switch (exception.code) {
      case 11000:
        status = HttpStatus.CONFLICT;
        const field = Object.keys(exception.keyPattern)[0];
        const value = exception.keyValue[field];
        message = `${field} '${value}' already exists`;
        break;

      case 121:
        status = HttpStatus.BAD_REQUEST;
        message = 'Document failed validation';
        break;

      case 16755:
        status = HttpStatus.BAD_REQUEST;
        message = 'Invalid BSON data';
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = 'Database operation failed';
        break;
    }

    response.status(status).json({
      statusCode: status,
      message,
      data: null,
      timestamp: new Date().toISOString(),
    });
  }
}