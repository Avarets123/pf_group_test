import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { TokensResponseType } from '../types/tokensRes.type';
import { getEnv } from 'src/infrastructure/utils/getEnv.util';
import { AuthDataType } from '../types/authData.type';

@Injectable()
export class JwtgeneratorService {
  constructor(private readonly jwtService: JwtService) {}

  generateTokens(payload: AuthDataType): TokensResponseType {
    return {
      access: this.generateAccessToken(payload),
      refresh: this.generateRefreshToken(payload.id),
    };
  }

  private generateAccessToken(payload: AuthDataType): string {
    const options: JwtSignOptions = {
      secret: getEnv('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: '15m',
    };

    return this.jwtService.sign(payload, options);
  }

  private generateRefreshToken(userId: string): string {
    const options: JwtSignOptions = {
      secret: getEnv('JWT_REFRESH_TOKEN_SECRET'),
      expiresIn: '15h',
    };

    return this.jwtService.sign({ id: userId }, options);
  }
}
