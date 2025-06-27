import { INestApplication } from '@nestjs/common';
import { AllHttpExceptionsFilter } from './filters/allHttpExceptions.filter';

export function exceptionBoot(app: INestApplication) {
  app.useGlobalFilters(new AllHttpExceptionsFilter());
}
