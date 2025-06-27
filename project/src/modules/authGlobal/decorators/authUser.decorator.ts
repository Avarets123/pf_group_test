import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { AuthDataType } from 'src/modules/auth/types/authData.type';

export const AuthUser = createParamDecorator(
  (data: keyof AuthDataType, ctx: ExecutionContext) => {
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user: AuthDataType }>();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
