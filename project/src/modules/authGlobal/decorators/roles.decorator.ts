import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import RolesGuard from '../guards/roles.guard';
import { UserRole } from 'src/modules/users/enums/userRole.enum';

export function Roles(...roles: UserRole[]) {
  return applyDecorators(SetMetadata('roles', roles), UseGuards(RolesGuard));
}
