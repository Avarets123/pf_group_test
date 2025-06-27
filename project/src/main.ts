import 'dotenv/config';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { exceptionBoot } from './infrastructure/exception/exception.boot';
import { validationBoot } from './infrastructure/validation/validation.boot';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const port = process.env.PORT ?? 3000;

  app.enableCors();
  exceptionBoot(app);
  validationBoot(app);

  await app.listen(port, () => {
    Logger.log('Service has been started on port: ' + port);
  });
}
bootstrap();
