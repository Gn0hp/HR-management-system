import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Permission } from 'src/modules/permission-module/Permission';

import { yamlParser } from '../../../utils/yamlParser';

import { RolePermit } from 'src/modules/role-permit-module/RolePermit';
import { Form } from 'src/modules/form-module/Form';
import { EmployeeForm } from 'src/modules/employee-form-module/EmployeeForm';
import { UserRole } from '../../../modules/user-role-module/UserRole';
import { Role } from '../../../modules/role-module/Role';

export function parseConfig(): TypeOrmModuleOptions {
  const YAML_CONFIG_FILENAME = 'config.yaml';
  const config = yamlParser(YAML_CONFIG_FILENAME);
  return {
    type: 'mysql',
    host: config.database.mysql.host ?? 'localhost',
    port: parseInt(config.database.mysql.port) ?? 3306,
    username: config.database.mysql.user ?? 'root',
    password: config.database.mysql.password ?? 'root',
    database: config.database.mysql.name ?? 'hr_management_system',
    entities:
      [Role, Permission, UserRole, RolePermit, Form, EmployeeForm] ?? [],
    // entities: [__dirname + '/**/*.entity{.ts,.js}'] ?? [],
    synchronize: true,
    logging: true,
    migrations: ['src/database/migrations/*{.ts,.js}'],
    retryAttempts: 10,
    retryDelay: 3000,
    keepConnectionAlive: true,
    verboseRetryLog: true,
    autoLoadEntities: true,
  };
}
