import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { DefaultException } from './commons/Exceptions/DefaultException';
import * as express from 'express';
async function bootstrap() {
  const server = express();
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('HR Management System')
    .setDescription('HR Management System API')
    .setVersion('1.0')
    .addTag('HR Management System')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDocument);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalFilters(new DefaultException());

  await app.listen(3000);
}
bootstrap();
