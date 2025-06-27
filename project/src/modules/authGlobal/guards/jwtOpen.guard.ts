import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { getEnv } from 'src/infrastructure/utils/getEnv.util';
import { AuthDataType } from 'src/modules/auth/types/authData.type';
import { JwtVerifyService } from '../services/jwtVerify.service';

@Injectable()
export default class JwtOpenGuard implements CanActivate {
  constructor(private readonly jwtVerify: JwtVerifyService) {}

  canActivate(context: ExecutionContext) {
    const req = context
      .switchToHttp()
      .getRequest<Request & { user: AuthDataType | null }>();

    const token = req.headers.authorization || '';
    const splitedToken = token.split(' ');
    if (splitedToken.length < 2) return true;

    req.user = this.jwtVerify.verify(
      splitedToken[1],
      getEnv('JWT_ACCESS_TOKEN_SECRET') as string,
    ) as AuthDataType;

    return true;
  }
}
