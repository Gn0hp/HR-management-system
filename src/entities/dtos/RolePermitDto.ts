import { IBaseDTO } from './IBaseDTO';
import { RolePermit } from '../RolePermit';

export class RolePermitDto implements IBaseDTO {
  rolePermit: RolePermit;
  constructor(rolePermit: RolePermit) {
    this.rolePermit = rolePermit;
  }
  isValid(): boolean {
    return true;
  }

  toEntity(): any {}
}
