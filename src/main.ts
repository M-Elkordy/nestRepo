import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './modules/merchant/pipes/validation.pipe';
import { port } from './config';
import { AllExceptionFilter } from './all-exceptions.filter';
import { ResponseInterceptor } from './modules/merchant/response.interceptor';
import { MorganMiddleware } from './middlewares/morgan.middleware';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import * as express from "express";
const cookieSession = require('cookie-session');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieSession({
    keys: ["dmmyString"]
  }))
  app.use(express.json())
  app.useGlobalPipes(
    new ValidationPipe({
      // additional props added to the req ( not mentioned in dto ) are not included to my code. 
      whitelist: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const err = Object.values(errors[0].constraints || errors[0].children[0]?.constraints)[0];
        return new BadRequestException(err);
      },
    }),
  );
  // app.useGlobalPipes(new CustomValidationPipe());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new AllExceptionFilter());
  // app.use(new MorganMiddleware().use);
  await app.listen(port);
}

bootstrap();
