/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationErrorResponse } from 'src/infrastructure/validation/errors/validationErrorResponse';

@Catch()
export class AllHttpExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    console.log(exception);
    const response = ctx.getResponse<Response>();
    let status = exception['status'] || HttpStatus.INTERNAL_SERVER_ERROR;
    let code =
      exception['code'] ||
      exception['response']?.code ||
      'INTERNAL_SERVER_ERROR';

    let message =
      exception?.['response']?.['message'] || exception['message'] || undefined;

    if (exception?.['response'] instanceof ValidationErrorResponse) {
      const exc = exception['response'];
      code = exc.code;
      status = exc.status;
      message = exc.exceptions;
    }

    if (typeof response?.status === 'function') {
      return response.status(status).json({ status, code, message });
    }
  }
}
