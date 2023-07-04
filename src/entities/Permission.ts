import { Column, ManyToOne } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { Role } from './Role';

export class Permission extends DefaultModel {
  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => Role, (role) => role.permissions)
  role: Role;
}
