import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermit } from 'src/modules/role-permit-module/RolePermit';
import { In, Repository } from 'typeorm';
import { IBaseService } from '../../commons/interfaces/IBaseService';
import { QueryParams } from '../../commons/query_params';
import { RolePermitDto } from '../../entities/dtos/RolePermitDto';

@Injectable()
export class RolePermitService implements IBaseService {
  constructor(
    @InjectRepository(RolePermit)
    private repository: Repository<RolePermit>,
  ) {}
  async save(dto: RolePermitDto) {
    if (!dto.isValid()) {
      throw new Error('RolePermit is invalid');
    }
    return await this.repository.save(dto.toEntity());
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }

  async softDelete(id: number) {
    const updatedRolePermit: RolePermit = {
      is_deleted: true,
      deleted_at: new Date(),
    };
    return this.update(id, new RolePermitDto(updatedRolePermit));
  }

  async findAll(options?: any) {
    return await this.repository.find(options);
  }

  async findById(id: number) {
    return await this.repository.findOne({ where: { id } });
  }

  async findByIds(condition: any, options?: QueryParams) {
    return await this.repository.find({
      where: {
        id: In(condition),
      },
      ...options,
    });
  }

  async findByOptions(condition: any, options?: QueryParams) {
    return this.repository.find({ where: condition, ...options });
  }

  async findOneByOptions(condition: any) {
    return await this.repository.findOne(condition);
  }

  async update(id: number, entity: RolePermitDto) {
    if (!entity.isValid()) {
      throw new Error('RolePermit is invalid');
    }
    return await this.repository.update(id, entity.toEntity());
  }
}
