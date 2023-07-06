import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { EmployeeForm } from './EmployeeForm';

@Entity()
export class Form extends DefaultModel {
  @Column()
  name: string;

  @Column()
  type: string;

  @Column()
  link: string;

  @Column()
  note: string;

  @Column()
  status: string;

  @Column()
  is_notified: boolean;

  @Column()
  description: string;
  //   @ManyToOne(() => User, (user) => user.roles)
  //   user: User;

  //   @OneToMany(() => Permission, (permission) => permission.role)
  //   permissions: Permission[];
  @OneToMany(() => EmployeeForm, (employeeForm) => employeeForm.form)
  employeeForms: EmployeeForm[];
}
