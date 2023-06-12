import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.PORT);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname + 'images', '..', 'images'), {
    prefix: '/images/',
  });
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT);
}
bootstrap();
