import { IBaseDTO } from './IBaseDTO';
import { UserRole } from '../../modules/user-role-module/UserRole';

export class UserRoleDto implements IBaseDTO {
  userRole: UserRole;
  constructor(userRole: UserRole) {
    this.userRole = userRole;
  }
  isValid(): boolean {
    return true;
  }

  toEntity(): any {
    return this.userRole;
  }
}
