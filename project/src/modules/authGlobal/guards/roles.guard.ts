import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { AuthDataType } from 'src/modules/auth/types/authData.type';

@Injectable()
export default class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const request = context
      .switchToHttp()
      .getRequest<Request & { user: AuthDataType }>();
    const user = request.user;
    return roles.includes(user.role);
  }
}
