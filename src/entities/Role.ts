import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { User } from './User';
import { Permission } from './Permission';

@Entity()
export class Role extends DefaultModel {
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  note: string;

  @ManyToOne(() => User, (user) => user.roles)
  user: User;

  @OneToMany(() => Permission, (permission) => permission.role)
  permissions: Permission[];
}
