import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { RolePermit } from './RolePermit';
import { UserRole } from './UserRole';
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
