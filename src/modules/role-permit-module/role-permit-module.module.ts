import { Module } from '@nestjs/common';
import { RolePermitService } from './role-permit-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermit } from 'src/modules/role-permit-module/RolePermit';

@Module({
  imports: [TypeOrmModule.forFeature([RolePermit])],
  providers: [RolePermitService],
  exports: [RolePermitService],
})
export class RolePermitModuleModule {}
