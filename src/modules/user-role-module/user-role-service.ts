import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/entities/UserRole';
import { FindManyOptions, Repository } from 'typeorm';
import { RoleService } from '../role-module/role-service';
import { BaseService } from 'src/commons/BaseService';

@Injectable()
export class UserRoleService extends BaseService {
  constructor(
    @InjectRepository(UserRole) private userRepository: Repository<UserRole>,
    private roleService: RoleService,
  ) {
    super();
  }
  async findByUserId(id: number): Promise<UserRole[]> {
    const options: FindManyOptions<UserRole> = {
      where: { userId: id },
    };
    return await this.userRepository.find(options);
  }
}
