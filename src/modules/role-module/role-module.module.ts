import { Module } from '@nestjs/common';
import { RoleControllerController } from './role-controller/role-controller.controller';
import { RoleService } from './role-service/role-service';

@Module({
  controllers: [RoleControllerController],
  providers: [RoleService]
})
export class RoleModuleModule {}
