import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeForm } from '../../entities/EmployeeForm';
import { IBaseService } from '../../commons/interfaces/IBaseService';
import { QueryParams } from '../../commons/query_params';
import { In, Repository } from 'typeorm';
import { EmployeeFormDto } from '../../entities/dtos/EmployeeFormDto';

@Injectable()
export class EmployeeFormService implements IBaseService {
  constructor(
    @InjectRepository(EmployeeForm)
    private readonly repository: Repository<EmployeeForm>,
  ) {}
  async save(dto: EmployeeFormDto) {
    if (!dto.isValid()) {
      throw new Error('EmployeeForm is invalid');
    }
    return await this.repository.save(dto.toEntity());
  }
  findById(id: number) {
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }

  findAll(options?: any) {
    return this.repository.find(options);
  }

  async findByIds(ids: any, options?: QueryParams) {
    return await this.repository.find({
      where: {
        id: In(ids),
      },
      ...options,
    });
  }

  async findByOptions(condition: any, options?: QueryParams) {
    return await this.repository.find({ where: condition, ...options });
  }

  async findOneByOptions(condition: any) {
    return await this.repository.findOne(condition);
  }

  update(id: number, dto: EmployeeFormDto) {
    if (!dto.isValid()) {
      throw new Error('EmployeeForm is invalid');
    }
    return this.repository.update(id, dto.toEntity());
  }
}
