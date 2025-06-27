import { OmitType } from '@nestjs/mapped-types';
import { UserCreateDto } from './userCreate.dto';

export class UserLoginDto extends OmitType(UserCreateDto, ['role']) {}
