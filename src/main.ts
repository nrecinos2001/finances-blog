import { NestFactory } from '@nestjs/core';

import envVariables from '@Config/env-variables';
import { setupSwaggerDoc } from '@Config/swagger-config';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

const port = envVariables().port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwaggerDoc(app);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(port);
  console.info(`App running on port`, port);
}
bootstrap();
