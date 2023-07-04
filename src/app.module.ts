import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PermissionModuleModule } from './modules/permission-module/permission-module.module';
import { RoleModuleModule } from './modules/role-module/role-module.module';
import { UserModuleModule } from './modules/user-module/user-module.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    PermissionModuleModule,
    RoleModuleModule,
    UserModuleModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
