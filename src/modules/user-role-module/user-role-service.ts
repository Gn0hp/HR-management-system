import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/entities/UserRole';
import { FindManyOptions, Repository } from 'typeorm';
import { RoleService } from '../role-module/role-service';
import { IBaseService } from '../../commons/interfaces/IBaseService';
import { QueryParams } from '../../commons/query_params';

@Injectable()
export class UserRoleService implements IBaseService {
  constructor(
    @InjectRepository(UserRole) private userRepository: Repository<UserRole>,
    private roleService: RoleService,
  ) {}
  async findByUserId(id: number): Promise<UserRole[]> {
    const options: FindManyOptions<UserRole> = {
      where: { userId: id },
    };
    return await this.userRepository.find(options);
  }

  delete(id) {
    return this.userRepository.delete(id);
  }

  findAll(options?: QueryParams) {
    return this.userRepository.find(options);
  }

  findById(condition, options?: QueryParams) {}

  findByIds(condition, options?: QueryParams) {}

  findByOptions(condition, options?: QueryParams) {}

  findOneByOptions(condition, options?: QueryParams) {}

  save(entity) {}

  update(id, entity) {}
}
