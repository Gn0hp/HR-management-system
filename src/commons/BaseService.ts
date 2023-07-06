// import { DefaultModel } from 'src/entities/DefaultModel';
// import { In, Repository, FindOptionsWhere } from 'typeorm';
// import { IBaseService } from './interfaces/IBaseService';
// import { LoggerService } from '@nestjs/common';

// export class BaseService<T extends DefaultModel, R extends Repository<T>>
//   implements IBaseService<T>
// {
//   protected readonly repository: R;
//   protected readonly logger: LoggerService;

//   constructor(repository: R, logger: LoggerService) {
//     this.repository = repository;
//     this.logger = logger;
//   }
//   findAll(): Promise<T[]> {
//     return this.repository.find();
//   }
//   findById(
//     id: FindOptionsWhere<T> | number | string | string[] | number[],
//   ): Promise<T | null> {
//     return this.repository.findOne({ id });
//   }
//   findByIds(ids: [EntityId]): Promise<T[]> {
//     return this.repository.findBy({ id: In(ids) });
//   }
//   save(entity: T): Promise<T> {
//     throw new Error('Method not implemented.');
//   }
//   saveInBatch(entities: T[], batch: number): Promise<T[]> {
//     throw new Error('Method not implemented.');
//   }
//   update(id: EntityId, entity: T): Promise<T> {
//     throw new Error('Method not implemented.');
//   }
//   updateInBatch(id: EntityId[], entity: T): Promise<T[]> {
//     throw new Error('Method not implemented.');
//   }
//   delete(id: EntityId): Promise<T> {
//     throw new Error('Method not implemented.');
//   }
// }
