import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultModel } from '../../entities/DefaultModel';
import { Form } from '../form-module/Form';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class EmployeeForm extends DefaultModel {
  @Column()
  @ApiProperty({
    nullable: true,
    description:
      'every note for this form, manager after approving can add note',
  })
  note?: string;

  @Column()
  @ApiProperty({
    enum: ['NEW', 'SUBMITTED', 'APPROVED', 'REJECTED', 'CLOSED'],
    description: `status of each form corresponding to each employee
    NEW: new form created
    SUBMITTED: form submitted by employee
    APPROVAL: form approved by manager
    CLOSED: form closed by admin`,
    default: 'NEW',
  })
  status?: string;

  //   @ManyToOne(() => User, (user) => user.roles)
  //   user: User;

  //   @OneToMany(() => Permission, (permission) => permission.role)
  //   permissions: Permission[];
  @ManyToOne(() => Form, (form) => form.employeeForms)
  form?: Form;
  // @ManyToOne(() => User, (user) => user.employeeForms)
  @Column()
  userId?: number;
}
