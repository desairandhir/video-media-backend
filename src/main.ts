import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as basicAuth from 'express-basic-auth';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Env } from './constants/env.constant';
import { logger } from './configs/winston.config';
import { CORS } from './constants/app.constant';
import {
  VERSION_NEUTRAL,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { HttpExceptionFilter } from './interceptors/exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger,
  });

  //Disable x-powered-by header.
  const httpAdapterInstance = app.getHttpAdapter().getInstance();
  httpAdapterInstance.disable('x-powered-by');

  app.enableCors({
    origin: CORS.allowedOrigins,
    methods: CORS.methods,
  });

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
    }),
  );

  app.use(
    ['/docs', '/docs-json'],
    basicAuth({
      challenge: true,
      users: {
        [Env.SWAGGER.USER]: Env.SWAGGER.PASSWORD,
      },
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Docxel ERP')
    .setDescription('')
    .setVersion('1.0.0')
    .addBearerAuth()
    .addTag('')
    .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  await app.listen(Env.APP.PORT);
}
bootstrap();
