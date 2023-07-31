import { DeleteResult } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import {QueryParams} from "../query_params";
export interface IBaseService {
  findAll(options?: any);

  /*condition: { id: 1, name: 'abc',..}*/
  findById(condition, options?: QueryParams);
  /* condition: { status: Not('INACTIVE'),
                amount: LessThan(10),  LessThanOrEqual, Morethan, Equal, Like('%abc%'),
                id: IN([1,2,3]) Any
              }*/
  /* options: {
  * select: ['id', 'name'],
  * sort: { id: 'ASC', name: 'DESC' },
  * take: 10,
  * skip: 10,
  *
  * }*/
  findByIds(condition: any, options?: QueryParams);

  findOneByOptions(condition: any, options?: QueryParams);

  findByOptions(condition: any, options?: QueryParams);

  save(entity: any);

  // saveInBatch(entities: T[], batch: number): Promise<T>;

  update(id: number, entity: any);

  // updateInBatch(id, entities, batch: number);

  delete(id: number);
}
