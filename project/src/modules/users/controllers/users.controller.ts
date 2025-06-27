import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { PagParamsDto } from 'src/infrastructure/pagination/dto/pagParams.dto';
import { AuthDataType } from 'src/modules/auth/types/authData.type';
import { UserRole } from '../enums/userRole.enum';
import { AuthUser } from 'src/modules/authGlobal/decorators/authUser.decorator';
import { Roles } from 'src/modules/authGlobal/decorators/roles.decorator';
import JwtAccessGuard from 'src/modules/authGlobal/guards/jwtAccess.guard';
import JwtOpenGuard from 'src/modules/authGlobal/guards/jwtOpen.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtOpenGuard)
  @Get()
  listing(@Query() params: PagParamsDto, @AuthUser() auth: AuthDataType) {
    return this.usersService.listing(params, auth);
  }

  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAccessGuard)
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete(id);
  }
}
