import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from 'src/entities/UserRole';
import { RoleModuleModule } from '../role-module/role-module.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole]), RoleModuleModule],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModuleModule {}
