import { IsDefined, IsEmail, IsEnum, IsString } from 'class-validator';
import { UserRole } from '../enums/userRole.enum';

export class UserCreateDto {
  @IsDefined()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;

  @IsDefined()
  @IsEnum(UserRole)
  role: UserRole;
}
