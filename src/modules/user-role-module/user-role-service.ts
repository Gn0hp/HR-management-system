import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { FindManyOptions, In, Repository } from 'typeorm';
import { RoleService } from '../role-module/role-service';
import { IBaseService } from '../../commons/interfaces/IBaseService';
import { QueryParams } from '../../commons/query_params';
import { UserRoleDto } from '../../entities/dtos/UserRoleDto';
import { UserRole, UserRolePostRequest } from './UserRole';
import { UserService } from '../user-module/user-service';

@Injectable()
export class UserRoleService implements IBaseService {
  constructor(
    @InjectRepository(UserRole)
    private userRoleRepository: Repository<UserRole>,
    private roleService: RoleService,
    private userService: UserService,
  ) {}
  // async findByUserId(id: number): Promise<UserRole[]> {
  //   const user = await this.userService.findById(id);
  //   const options: FindManyOptions<UserRole> = {
  //     where: {
  //       user: {
  //         id: user.id,
  //       },
  //     },
  //   };
  //   return await this.userRoleRepository.find(options);
  // }
  findAll(options?: QueryParams) {
    return this.userRoleRepository.find(options);
  }

  async findById(id: number) {
    return await this.userRoleRepository.findOne({ where: { id } });
  }

  async findByIds(ids, options?: QueryParams) {
    return await this.userRoleRepository.find({
      where: {
        id: In(ids),
      },
      ...options,
    });
  }

  async findByOptions(condition, options?: QueryParams) {
    return await this.userRoleRepository.find({ where: condition, ...options });
  }

  findOneByOptions(condition) {
    return this.userRoleRepository.findOne(condition);
  }

  async save(request: UserRolePostRequest) {
    const role = await this.roleService.findById(request.roleId);
    const user = await this.userService.findById(request.userId);
    const userRole: UserRole = {
      status: 'ACTIVE',
      created_at: new Date(),
      user,
      role,
      name: request.name,
      description: request.description,
    };
    const dto = new UserRoleDto(userRole);
    if (!dto.isValid()) {
      throw new Error('UserRole is invalid');
    }
    return this.userRoleRepository.save(dto.toEntity());
  }

  async update(id: number, entity: UserRoleDto) {
    if (!entity.isValid()) {
      throw new Error('UserRole is invalid');
    }
    return await this.userRoleRepository.update(id, entity.toEntity());
  }
  delete(id) {
    return this.userRoleRepository.delete(id);
  }
}
