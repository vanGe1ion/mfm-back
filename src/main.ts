import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DEFAULT_SERVER_PORT } from './config';
import 'reflect-metadata';
import { ConfigService } from '@nestjs/config';

async function start() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_PORT') || DEFAULT_SERVER_PORT;
  await app.listen(port, () => console.log(`Server started on port ${port}`));
}

start();
