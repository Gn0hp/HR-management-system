import { Column, Entity, OneToMany } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { RolePermit } from './RolePermit';

@Entity()
export class Permission extends DefaultModel {
  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column()
  status: string;

  @Column({
    nullable: true,
  })
  note: string;

  @OneToMany(() => RolePermit, (rolePermit) => rolePermit.permission)
  rolePermits: RolePermit[];
}
