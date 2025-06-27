import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtgeneratorService } from './jwtGenerate.service';
import { UserCreateDto } from 'src/modules/users/dto/userCreate.dto';
import { TokensResponseType } from '../types/tokensRes.type';
import { UsersService } from 'src/modules/users/services/users.service';
import { UserLoginDto } from 'src/modules/users/dto/userLogin.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtGenerateService: JwtgeneratorService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(dto: UserCreateDto): Promise<TokensResponseType> {
    const newUser = await this.usersService.create(dto);
    return this.jwtGenerateService.generateTokens({
      id: newUser.id,
      role: newUser.role,
    });
  }

  async signIn(dto: UserLoginDto): Promise<TokensResponseType> {
    const user = await this.usersService.findOneByEmail(dto.email);

    const isValidPasswd = await user.validatePasswd(dto.password);

    if (!isValidPasswd) {
      throw new BadRequestException('INVALID_PASSWORD');
    }

    return this.jwtGenerateService.generateTokens({
      id: user.id,
      role: user.role,
    });
  }

  async refreshToken(id: string): Promise<TokensResponseType> {
    const user = await this.usersService.findOneById(id);
    return this.jwtGenerateService.generateTokens({
      id: user.id,
      role: user.role,
    });
  }
}
