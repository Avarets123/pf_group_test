import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserCreateDto } from 'src/modules/users/dto/userCreate.dto';
import { UserLoginDto } from 'src/modules/users/dto/userLogin.dto';
import { AuthUser } from 'src/modules/authGlobal/decorators/authUser.decorator';
import JwtRefreshGuard from 'src/modules/authGlobal/guards/jwtRefresh.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  signUp(@Body() body: UserCreateDto) {
    return this.authService.signUp(body);
  }

  @Post('sign-in')
  signIn(@Body() body: UserLoginDto) {
    return this.authService.signIn(body);
  }

  @UseGuards(JwtRefreshGuard)
  @Post('refresh-tokens')
  refreshTokens(@AuthUser('id') id: string) {
    return this.authService.refreshToken(id);
  }
}
