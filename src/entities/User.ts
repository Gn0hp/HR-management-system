import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { EmployeeForm } from './EmployeeForm';
import { UserRole } from './UserRole';

@Entity()
export class User extends DefaultModel {
  @Column()
  employee_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  avatar: string;

  @Column()
  cccd_id: string;

  @Column()
  bhxh_number: string;

  @Column()
  address: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  status: string;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  @OneToMany(() => EmployeeForm, (employeeForm) => employeeForm.user)
  employeeForms: EmployeeForm[];
}
