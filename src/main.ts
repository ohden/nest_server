import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  app.useBodyParser('json', { limit: '10mb' }); //application/json利用時のlimit size.
  app.useBodyParser('urlencoded', { limit: '100mb', extended: true }); //URL encode形式のpost dataのlimit size.

  await app.listen(3000);
}
bootstrap();
