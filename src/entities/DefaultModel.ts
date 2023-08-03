import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
export class DefaultModel {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id?: number;

  @CreateDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  created_at?: Date;

  @Column({
    nullable: true,
    type: 'integer',
  })
  @ApiProperty({
    description: 'id of user who created this record',
  })
  created_by?: number; // id of user

  @UpdateDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  updated_at?: Date;
  @DeleteDateColumn({
    nullable: true,
    type: 'timestamp',
  })
  deleted_at?: Date;

  @Column({
    nullable: true,
  })
  @ApiProperty({
    description: 'id of user who created this record',
  })
  deleted_by?: number; // id of user
}
