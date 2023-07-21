import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from 'src/entities/UserRole';
import { RoleModuleModule } from '../role-module/role-module.module';
import { UserRoleController } from './user-role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole]), RoleModuleModule],
  controllers: [UserRoleController],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModuleModule {}
