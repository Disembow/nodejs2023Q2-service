import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { resolve, dirname } from 'node:path';
import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';
import { SwaggerModule } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service';

config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(app.get(LoggerService));
  app.useGlobalPipes(new ValidationPipe());

  const pathToDocFile = resolve(dirname(__dirname), 'doc', 'api.yaml');
  const docFile = await readFile(pathToDocFile, 'utf-8');
  const documentation = parse(docFile);
  SwaggerModule.setup('doc', app, documentation);

  await app.listen(process.env.PORT ?? 4000);
}

bootstrap();
