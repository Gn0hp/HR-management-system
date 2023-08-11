import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultModel } from '../../entities/DefaultModel';
import { RolePermit } from '../role-permit-module/RolePermit';
import { UserRole } from '../user-role-module/UserRole';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Role extends DefaultModel {
  @Column()
  @ApiProperty({
    examples: ['ADMIN', 'DIRECTOR'],
  })
  name?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    example: 'Full of permission',
  })
  description?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  note?: string;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  userRoles?: UserRole[];

  @OneToMany(() => RolePermit, (rolePermit) => rolePermit.role)
  rolePermits?: RolePermit[];
}
