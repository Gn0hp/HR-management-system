import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PermissionModuleModule } from './modules/permission-module/permission-module.module';
import { RoleModuleModule } from './modules/role-module/role-module.module';
import { UserModuleModule } from './modules/user-module/user-module.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { parseConfig } from './database/config/mysql/configuration';
import { yamlParser } from './commons/yamlParser';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { parseJwtConfig } from './auth/jwt/jwt';
import { UserRoleModuleModule } from './modules/user-role-module/user-role-module.module';
import { RolePermitModuleModule } from './modules/role-permit-module/role-permit-module.module';
import { EmployeeFormModuleModule } from './modules/employee-form-module/employee-form-module.module';
import { FormModuleModule } from './modules/form-module/form-module.module';

@Module({
  imports: [
    UserModuleModule,
    UserRoleModuleModule,
    RoleModuleModule,
    RolePermitModuleModule,
    PermissionModuleModule,
    EmployeeFormModuleModule,
    FormModuleModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register(parseJwtConfig()),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [() => yamlParser('config.yaml')],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => parseConfig(),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
