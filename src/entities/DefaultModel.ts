import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
export class DefaultModel {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  created_at: Date;

  @Column()
  created_by: number; // id of user

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  updated_at: Date;
  @DeleteDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  deleted_at: Date;

  @Column()
  deleted_by: number; // id of user
}
