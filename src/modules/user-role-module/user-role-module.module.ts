import { forwardRef, Module } from '@nestjs/common';
import { UserRoleService } from './user-role-service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleModuleModule } from '../role-module/role-module.module';
import { UserRoleController } from './user-role.controller';
import { UserModuleModule } from '../user-module/user-module.module';
import { UserRole } from '../user-module/UserRole';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRole]),
    RoleModuleModule,
    forwardRef(() => UserModuleModule),
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModuleModule {}
