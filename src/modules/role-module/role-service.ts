import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';
import { IBaseService } from '../../commons/interfaces/IBaseService';
import { QueryParams } from '../../commons/query_params';
import { RoleDto } from '../../entities/dtos/RoleDto';
import { Role } from './Role';

@Injectable()
export class RoleService implements IBaseService {
  constructor(
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
  ) {}
  findAll(options): Promise<Role[]> {
    return this.roleRepository.find(options);
  }
  findById(id: number): Promise<Role> {
    const options: FindOneOptions<Role> = {
      where: { id },
    };
    return this.roleRepository.findOne(options);
  }
  findByIds(ids: number[], options: QueryParams): Promise<Role[]> {
    return this.roleRepository.find({
      where: { id: In(ids) },
      ...options,
    });
  }
  async delete(id: number) {
    return await this.roleRepository.delete(id);
  }

  async findByOptions(condition: any, options?: QueryParams) {
    return await this.roleRepository.find({ where: condition, ...options });
  }

  async findOneByOptions(condition: any) {
    return await this.roleRepository.findOne(condition);
  }

  async save(roleDto: RoleDto) {
    if (!roleDto.isValid()) {
      throw new Error('Role is invalid');
    }
    return await this.roleRepository.save(roleDto.toEntity());
  }

  update(id: number, roleDto: RoleDto) {
    if (!roleDto.isValid()) {
      throw new Error('Role is invalid');
    }
    return this.roleRepository.update(id, roleDto.toEntity());
  }
}
