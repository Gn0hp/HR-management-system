import { Column, PrimaryGeneratedColumn } from 'typeorm';
export class DefaultModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  created_at: Date;

  @Column()
  deleted_at: Date;
}
