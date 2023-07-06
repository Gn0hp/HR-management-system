import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { User } from './User';
import { Form } from './Form';

@Entity()
export class EmployeeForm extends DefaultModel {
  @Column()
  note: string;

  @Column()
  status: string;

  //   @ManyToOne(() => User, (user) => user.roles)
  //   user: User;

  //   @OneToMany(() => Permission, (permission) => permission.role)
  //   permissions: Permission[];
  @ManyToOne(() => Form, (form) => form.employeeForms)
  form: Form;
  @ManyToOne(() => User, (user) => user.employeeForms)
  user: User;
}
