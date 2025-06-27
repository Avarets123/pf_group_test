import { UserRole } from 'src/modules/users/enums/userRole.enum';

export type AuthDataType = {
  id: string;
  role: UserRole;
};
