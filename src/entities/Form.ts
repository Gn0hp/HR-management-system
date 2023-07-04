import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { User } from './User';
import { Permission } from './Permission';

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
  is_active: boolean;

  @Column()
  is_notified: boolean;
  //   @ManyToOne(() => User, (user) => user.roles)
  //   user: User;

  //   @OneToMany(() => Permission, (permission) => permission.role)
  //   permissions: Permission[];
}
