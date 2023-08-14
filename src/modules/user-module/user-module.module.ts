import { Module } from '@nestjs/common';
import { UserControllerController } from './user-controller.controller';
import { UserService } from './user-service';
import { UserRoleModuleModule } from '../user-role-module/user-role-module.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './User';

@Module({
  controllers: [UserControllerController],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
})
export class UserModuleModule {}
