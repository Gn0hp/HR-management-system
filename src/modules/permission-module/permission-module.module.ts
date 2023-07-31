import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/modules/permission-module/Permission';
import { PermissionControllerController } from './permission-controller.controller';
import { PermissionService } from './permission-service';
import { UserModuleModule } from '../user-module/user-module.module';

@Module({
  imports: [TypeOrmModule.forFeature([Permission]), UserModuleModule],
  providers: [PermissionService],
  controllers: [PermissionControllerController],
  exports: [PermissionService],
})
export class PermissionModuleModule {}
