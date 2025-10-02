import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MongoExceptionFilter } from './common/filters/mongo-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { UserContextInterceptor } from './common/interceptors/user-context.interceptor';
import { ContextService } from './common/services/context.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Task Management API')
    .setDescription('API documentation for Task Management System')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.setGlobalPrefix('api');
  app.useGlobalFilters(new MongoExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log(`Application is running on: http://localhost:${process.env.PORT || 3000}`);
  console.log(`Swagger is running on: http://localhost:${process.env.PORT || 3000}/api/docs`);
}
bootstrap();
