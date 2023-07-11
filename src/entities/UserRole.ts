import { Column, Entity, ManyToOne } from 'typeorm';
import { DefaultModel } from './DefaultModel';
import { Role } from './Role';

@Entity()
export class UserRole extends DefaultModel {
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

  // @ManyToOne(() => User, (user) => user.userRoles)
  @Column()
  userId: number;

  @ManyToOne(() => Role, (role) => role.userRoles)
  role: Role;
}
