import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from 'src/entities/Permission';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly userRepository: Repository<Permission>,
  ) {}
  findAll(): Promise<Permission[]> {
    return this.userRepository.find();
  }
}
