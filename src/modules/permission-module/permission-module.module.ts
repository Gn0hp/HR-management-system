import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/entities/Permission';
import { PermissionControllerController } from './permission-controller.controller';
import { PermissionService } from './permission-service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  providers: [PermissionService],
  controllers: [PermissionControllerController],
  exports: [PermissionService],
})
export class PermissionModuleModule {}
