import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, In, Repository } from 'typeorm';
import { RoleService } from '../role-module/role-service';
import { IBaseService } from '../../commons/interfaces/IBaseService';
import { QueryParams } from '../../commons/query_params';
import { UserRoleDto } from '../../entities/dtos/UserRoleDto';
import {UserRole, UserRolePostRequest} from "../user-module/UserRole";
import {UserService} from "../user-module/user-service";

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
  findAll(options?: QueryParams) {
    return this.userRepository.find(options);
  }

  async findById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findByIds(ids, options?: QueryParams) {
    return await this.userRepository.find({
      where: {
        id: In(ids),
      },
      ...options,
    });
  }

  async findByOptions(condition, options?: QueryParams) {
    return await this.userRepository.find({ where: condition, ...options });
  }

  findOneByOptions(condition) {
    return this.userRepository.findOne(condition);
  }

  async save(request: UserRolePostRequest) {
    const role = await this.roleService.findById(request.roleId);
    const userRole: UserRole = {
      status: 'ACTIVE',
      created_at: new Date(),
      userId: request.userId,
      role,
      name: request.name,
      description: request.description,
    };
    const dto = new UserRoleDto(userRole);
    if (!dto.isValid()) {
      throw new Error('UserRole is invalid');
    }
    return this.userRepository.save(dto.toEntity());
  }

  async update(id: number, entity: UserRoleDto) {
    if (!entity.isValid()) {
      throw new Error('UserRole is invalid');
    }
    return await this.userRepository.update(id, entity.toEntity());
  }
  delete(id) {
    return this.userRepository.delete(id);
  }
}
