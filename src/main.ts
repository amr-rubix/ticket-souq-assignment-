import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //filter extra data on requests
    }),
  );
  /**
   * Todo: add fronturl
   */
  app.enableCors();

  await app.listen(3333);
}
bootstrap();
