import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultModel } from '../../entities/DefaultModel';
import { RolePermit } from '../role-permit-module/RolePermit';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Permission extends DefaultModel {
  @Column()
  @ApiProperty({
    examples: ['R', 'RF', 'W'],
  })
  name?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    example: 'Read permission`',
  })
  description?: string;

  @Column()
  @ApiProperty({
    enum: ['ACTIVE', 'INACTIVE'],
  })
  status?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  note?: string;

  @OneToMany(() => RolePermit, (rolePermit) => rolePermit.permission)
  rolePermits?: RolePermit[];
}
