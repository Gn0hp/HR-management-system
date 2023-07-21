import { Controller, Get } from '@nestjs/common';
import { PermissionService } from './permission-service';
import { ApiTags } from '@nestjs/swagger';

@Controller('permission-controller')
@ApiTags('permission-controller')
export class PermissionControllerController {
  constructor(private readonly permissionService: PermissionService) {}
  @Get()
  findAll() {
    return this.permissionService.findAll();
  }
}
