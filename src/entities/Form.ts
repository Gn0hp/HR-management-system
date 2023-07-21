import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { EmployeeForm } from './EmployeeForm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Form extends DefaultModel {
  @Column()
  @ApiProperty({
    example: 'Form danh gia dinh ky hang nam 2023 ...',
    description: 'name of form',
  })
  name?: string;

  @Column()
  @ApiProperty({
    enum: [1, 2],
    description: `type of form
    1: form thu viec
    2: form danh gia dinh ky`,
  })
  type?: string;

  @Column()
  @ApiProperty({
    description: 'link or path(if existed) to form. recommend link',
  })
  link?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  note?: string;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  content?: string;

  @Column()
  @ApiProperty({
    enum: ['NEW', 'CLOSED', 'DELETED'],
    description: `status of each form in general(for all employee)`,
  })
  status?: string;

  @Column()
  @ApiProperty({
    description:
      'is this form notified (by mail) to employee when form created',
    enum: [true, false],
  })
  is_notified?: boolean;

  @Column({
    nullable: true,
  })
  @ApiProperty()
  description?: string;
  //   @ManyToOne(() => User, (user) => user.roles)
  //   user: User;

  //   @OneToMany(() => Permission, (permission) => permission.role)
  //   permissions: Permission[];
  @OneToMany(() => EmployeeForm, (employeeForm) => employeeForm.form)
  employeeForms?: EmployeeForm[];
}
