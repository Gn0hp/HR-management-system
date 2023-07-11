import { DeleteResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
export interface IBaseService {
  findAll();

  /*options: { id: 1, name: 'abc',..}*/
  findById(options);
  /* options: { status: Not('INACTIVE'), 
                amount: LessThan(10),  LessThanOrEqual, Morethan, Equal, Like('%abc%'),
                id: IN([1,2,3]) Any
              }*/
  findByIds(options);

  findOneByOptions(options);

  findByOptions(options);

  save(entity);

  // saveInBatch(entities: T[], batch: number): Promise<T>;

  update(id, entity);

  updateInBatch(id, entities, batch: number);

  delete(id: EntityId): Promise<DeleteResult>;
}
