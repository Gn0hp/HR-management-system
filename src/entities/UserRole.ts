import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { User } from './User';
import { Role } from './Role';

@Entity()
export class UserRole extends DefaultModel {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: string;

  @Column()
  note: string;

  @ManyToOne(() => User, (user) => user.userRoles)
  user: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role: Role;
}
