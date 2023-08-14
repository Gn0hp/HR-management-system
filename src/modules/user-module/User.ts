import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultModel } from '../../entities/DefaultModel';
import { EmployeeForm } from '../employee-form-module/EmployeeForm';
import { UserRole } from '../user-role-module/UserRole';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User extends DefaultModel {
  @Column({
    nullable: true,
    //unique: true
  })
  @ApiProperty({
    example: 'employee001 or admin001',
    description: 'identifier of user in system',
  })
  employee_id?: number;

  @Column()
  @ApiProperty()
  first_name?: string;

  @Column()
  @ApiProperty()
  last_name?: string;

  @Column()
  @ApiProperty({
    description: 'email of user. Using gmail host',
  })
  email?: string;

  @Column()
  @ApiProperty()
  phone?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    nullable: true,
    description: 'link or path(if existed) to avatar of user',
  })
  avatar?: string;

  @Column()
  @ApiProperty({
    nullable: true,
  })
  cccd_id?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    nullable: true,
  })
  bhxh_number?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  address?: string;

  @Column({
    unique: true,
  })
  @ApiProperty({
    uniqueItems: true,
    description: 'username of user. Using for login',
  })
  username?: string;

  @Column()
  @ApiProperty({
    minLength: 0,
    description:
      'Currently not valid password. So it could be any length but 0',
  })
  password?: string;

  @Column()
  @ApiProperty({
    enum: ['ACTIVE', 'INACTIVE', 'DELETED'],
    default: 'ACTIVE',
  })
  status?: string;

  @Column()
  refreshToken?: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles?: UserRole[];

  @OneToMany(() => EmployeeForm, (employeeForm) => employeeForm.user)
  employeeForms?: EmployeeForm[];
}
