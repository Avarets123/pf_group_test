import { Global, Module } from '@nestjs/common';
import JwtAccessGuard from './guards/jwtAccess.guard';
import JwtOpenGuard from './guards/jwtOpen.guard';
import JwtRefreshGuard from './guards/jwtRefresh.guard';
import RolesGuard from './guards/roles.guard';
import { JwtVerifyService } from './services/jwtVerify.service';

@Global()
@Module({
  providers: [
    JwtAccessGuard,
    JwtOpenGuard,
    JwtRefreshGuard,
    RolesGuard,
    JwtVerifyService,
  ],
  exports: [JwtVerifyService],
})
export class AuthGlobalModule {}
