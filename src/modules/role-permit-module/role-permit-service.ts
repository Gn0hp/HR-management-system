import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermit } from 'src/entities/RolePermit';
import { Repository } from 'typeorm';

@Injectable()
export class RolePermitService {
  constructor(
    @InjectRepository(RolePermit)
    private userRepository: Repository<RolePermit>,
  ) {}
}
