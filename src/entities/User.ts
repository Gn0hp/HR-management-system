import { Column } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { EmployeeForm } from './EmployeeForm';
import { UserRole } from './UserRole';

// @Entity()
export class User extends DefaultModel {
  @Column({
    nullable: true,
    //unique: true
  })
  employee_id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({
    nullable: true,
  })
  avatar: string;

  @Column()
  cccd_id: string;

  @Column({
    nullable: true,
  })
  bhxh_number: string;

  @Column({
    nullable: true,
  })
  address: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @Column()
  status: string;

  // @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles: UserRole[];

  // @OneToMany(() => EmployeeForm, (employeeForm) => employeeForm.user)
  employeeForms: EmployeeForm[];
}
