import { Module } from '@nestjs/common';
import { PermissionService } from './permission-service/permission-service';
import { PermissionControllerController } from './permission-controller/permission-controller.controller';

@Module({
  providers: [PermissionService],
  controllers: [PermissionControllerController]
})
export class PermissionModuleModule {}
