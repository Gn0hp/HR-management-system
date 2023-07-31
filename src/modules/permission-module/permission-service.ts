import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/modules/permission-module/Permission';
import { In, Repository } from 'typeorm';
import { IBaseService } from '../../commons/interfaces/IBaseService';
import { QueryParams } from '../../commons/query_params';
import { PermissionDto } from '../../entities/dtos/PermissionDto';

@Injectable()
export class PermissionService implements IBaseService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}
  findAll(options: QueryParams): Promise<Permission[]> {
    return this.permissionRepository.find(options);
  }

  async delete(id: number) {
    return await this.permissionRepository.delete(id);
  }

  async findById(id: number) {
    return await this.permissionRepository.findOne({ where: { id } });
  }

  async findByIds(ids: any, options?: QueryParams) {
    return await this.permissionRepository.find({
      where: { id: In(ids) },
      ...options,
    });
  }

  async findByOptions(condition: any, options?: QueryParams) {
    return await this.permissionRepository.find({
      where: condition,
      ...options,
    });
  }

  async findOneByOptions(condition: any) {
    return await this.permissionRepository.findOne(condition);
  }

  async save(dto: PermissionDto) {
    if (!dto.isValid()) {
      throw new Error('Permission is invalid');
    }
    return this.permissionRepository.save(dto.toEntity());
  }

  update(id: number, dto: PermissionDto) {
    if (!dto.isValid()) {
      throw new Error('Permission is invalid');
    }
    return this.permissionRepository.update(id, dto.toEntity());
  }
}
