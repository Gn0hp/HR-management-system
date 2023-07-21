import { Module } from '@nestjs/common';
import { UserControllerController } from './user-controller.controller';
import { UserService } from './user-service';
import { UserRoleModuleModule } from '../user-role-module/user-role-module.module';

@Module({
  imports: [UserRoleModuleModule],
  providers: [UserService],
  controllers: [UserControllerController],
  exports: [UserService],
})
export class UserModuleModule {}
