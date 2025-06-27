import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtgeneratorService } from './services/jwtGenerate.service';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';

@Module({
  imports: [UsersModule, JwtModule.register({ global: true })],
  providers: [JwtgeneratorService, AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
