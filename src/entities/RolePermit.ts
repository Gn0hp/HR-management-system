import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { Role } from './Role';
import { Permission } from './Permission';

@Entity()
export class RolePermit extends DefaultModel {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  status: string;

  @ManyToOne(() => Role, (role) => role.rolePermits)
  role: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermits)
  permission: Permission;
}
