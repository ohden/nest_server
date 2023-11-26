import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    count: number;
  }
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors(); //enable CORS mode.

  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000, //7days
      },
    }),
  );

  app.useBodyParser('json', { limit: '10mb' }); //application/json利用時のlimit size.
  app.useBodyParser('urlencoded', { limit: '100mb', extended: true }); //URL encode形式のpost dataのlimit size.

  await app.listen(3000);
}
bootstrap();
