import { IBaseDTO } from './IBaseDTO';
import { Role } from '../../modules/role-module/Role';

export class RoleDto implements IBaseDTO {
  role: Role;
  constructor(role: Role) {
    this.role = role;
  }
  isValid(): boolean {
    return true;
  }

  toEntity(): any {}
}
