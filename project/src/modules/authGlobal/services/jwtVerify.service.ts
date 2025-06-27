import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDataType } from '../../auth/types/authData.type';

@Injectable()
export class JwtVerifyService {
  constructor(private readonly jwtService: JwtService) {}

  verify(token: string, secret: string): AuthDataType | null {
    try {
      return this.jwtService.verify<AuthDataType>(token, { secret });
    } catch {
      return null;
    }
  }
}
