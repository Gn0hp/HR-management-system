import { Module } from '@nestjs/common';
import { UserControllerController } from './user-controller.controller';
import { UserService } from './user-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserControllerController],
  exports: [UserService],
})
export class UserModuleModule {}
