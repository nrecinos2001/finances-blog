import { NestFactory } from '@nestjs/core';

import envVariables from '@Config/env-variables';

import { AppModule } from './app.module';

const port = envVariables().port;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.info(`App running on port`, port);
}
bootstrap();
