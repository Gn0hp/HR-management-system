import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role';
import { FindManyOptions, FindOneOptions, In, Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly userRepository: Repository<Role>,
  ) {}
  findAll(): Promise<Role[]> {
    return this.userRepository.find();
  }
  findById(id: number): Promise<Role> {
    const options: FindOneOptions<Role> = {
      where: { id },
    };
    return this.userRepository.findOne(options);
  }
  findByIds(ids: number[]): Promise<Role[]> {
    const options: FindManyOptions<Role> = {
      where: { id: In(ids) },
    };
    return this.userRepository.find(options);
  }
}
