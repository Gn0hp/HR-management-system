import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role-service';
import { ApiTags } from '@nestjs/swagger';

@Controller('role-controller')
@ApiTags('role-controller')
export class RoleControllerController {
  constructor(private readonly roleService: RoleService) {}
  @Get()
  findAll() {
    return this.roleService.findAll();
  }
}
