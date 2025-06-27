import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { getEnv } from 'src/infrastructure/utils/getEnv.util';
import { AuthDataType } from 'src/modules/auth/types/authData.type';
import { JwtVerifyService } from '../services/jwtVerify.service';

@Injectable()
export default class JwtRefreshGuard implements CanActivate {
  constructor(private readonly jwtVerify: JwtVerifyService) {}

  canActivate(context: ExecutionContext) {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user: AuthDataType }>();

    const refresh = req.body?.refresh;

    if (!refresh) return false;

    const authData = this.jwtVerify.verify(
      refresh,
      getEnv('JWT_REFRESH_TOKEN_SECRET') as string,
    );

    if (!authData) return false;

    req.user = authData;

    return true;
  }
}
