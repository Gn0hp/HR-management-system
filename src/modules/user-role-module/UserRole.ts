import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultModel } from '../../entities/DefaultModel';
import { Role } from '../role-module/Role';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user-module/User';

@Entity()
export class UserRole extends DefaultModel {
  @Column()
  @ApiProperty({
    examples: ['admin 1', 'director 1'],
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
  })
  status?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  note?: string;

  @ManyToOne(() => User, (user) => user.userRoles)
  user?: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role?: Role;
}
export class UserRolePostRequest {
  @ApiProperty()
  name?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  userId?: number;
  @ApiProperty()
  roleId?: number;
}
