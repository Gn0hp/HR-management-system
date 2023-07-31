import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultModel } from '../../entities/DefaultModel';
import { Role } from '../role-module/Role';
import { Permission } from '../permission-module/Permission';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class RolePermit extends DefaultModel {
  @Column()
  @ApiProperty({
    examples: ['Admin-R', 'Manger-RF', 'Director-W'],
  })
  name?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  description?: string;

  @Column()
  @ApiProperty({
    enum: ['ACTIVE', 'INACTIVE'],
    default: 'ACTIVE',
  })
  status?: string;

  @ManyToOne(() => Role, (role) => role.rolePermits)
  role?: Role;

  @ManyToOne(() => Permission, (permission) => permission.rolePermits)
  permission?: Permission;
}
