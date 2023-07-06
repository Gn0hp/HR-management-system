import { EntityId } from 'typeorm/repository/EntityId';
export interface IBaseService<T> {
  findAll(): Promise<T[]>;

  findById(id: EntityId): Promise<T>;

  findByIds(id: [EntityId]): Promise<T[]>;

  save(entity: T): Promise<T>;

  saveInBatch(entities: T[], batch: number): Promise<T[]>;

  update(id: EntityId, entity: T): Promise<T>;

  updateInBatch(id: EntityId[], entity: T): Promise<T[]>;

  delete(id: EntityId): Promise<T>;
}
