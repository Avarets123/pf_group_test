import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationErrorResponse } from './validationErrorResponse';

export class ValidationError extends HttpException {
  constructor(
    response: ValidationErrorResponse,
    status: number = HttpStatus.UNPROCESSABLE_ENTITY,
  ) {
    super(response, status);
  }
}
