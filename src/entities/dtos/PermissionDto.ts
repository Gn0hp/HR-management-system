import { IBaseDTO } from './IBaseDTO';
import { Permission } from '../../modules/permission-module/Permission';

export class PermissionDto implements IBaseDTO {
  permission: Permission;
  constructor(permission: Permission) {
    this.permission = permission;
  }
  isValid(): boolean {
    return true;
  }

  toEntity(): any {}
}
