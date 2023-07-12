import { Module } from '@nestjs/common';
import { Role } from 'src/entities/Role';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleControllerController } from './role-controller.controller';
import { RoleService } from './role-service';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RoleControllerController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModuleModule {}
