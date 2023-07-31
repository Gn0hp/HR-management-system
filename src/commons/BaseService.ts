import { IBaseService } from './interfaces/IBaseService';

export abstract class BaseService implements IBaseService {
  findAll() {
    throw new Error('Method not implemented.');
  }
  findById(options: any) {
    throw new Error('Method not implemented.');
  }
  findByIds(options: any) {
    throw new Error('Method not implemented.');
  }
  findOneByOptions(options: any) {
    throw new Error('Method not implemented.');
  }
  findByOptions(options: any) {
    throw new Error('Method not implemented.');
  }
  save(entity: any) {
    throw new Error('Method not implemented.');
  }
  update(id: any, entity: any) {
    throw new Error('Method not implemented.');
  }
  delete(id) {
    throw new Error('Method not implemented.');
  }
}
