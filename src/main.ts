import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config';
import 'reflect-metadata';

async function start() {
  const app = await NestFactory.create(AppModule);
  await app.listen(SERVER_PORT, () =>
    console.log(`Server started on port ${SERVER_PORT}`),
  );
}

start();
