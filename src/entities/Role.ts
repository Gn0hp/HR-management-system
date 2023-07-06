import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { RolePermit } from './RolePermit';
import { UserRole } from './UserRole';

@Entity()
export class Role extends DefaultModel {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  note: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];

  @OneToMany(() => RolePermit, (rolePermit) => rolePermit.role)
  rolePermits: RolePermit[];
}
