import { Module } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { JwtVerifyService } from '../authGlobal/services/jwtVerify.service';

@Module({
  // imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UsersRepository, UsersService, JwtVerifyService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
