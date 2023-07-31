import { forwardRef, Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleControllerController } from './role-controller.controller';
import { RoleService } from './role-service';
import { Role } from './Role';
import { UserModuleModule } from '../user-module/user-module.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
    forwardRef(() => UserModuleModule),
  ],
  controllers: [RoleControllerController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModuleModule {}
