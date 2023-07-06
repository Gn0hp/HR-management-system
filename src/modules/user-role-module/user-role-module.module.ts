import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from 'src/entities/UserRole';

@Module({
  imports: [TypeOrmModule.forFeature([UserRole])],
  providers: [UserRoleService],
  exports: [UserRoleService],
})
export class UserRoleModuleModule {}
