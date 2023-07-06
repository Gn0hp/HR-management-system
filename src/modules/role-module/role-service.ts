import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/Role';
import { Repository } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private readonly userRepository: Repository<Role>,
  ) {}
  findAll(): Promise<Role[]> {
    return this.userRepository.find();
  }
}
