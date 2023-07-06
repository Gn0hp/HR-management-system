import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Permission } from 'src/entities/Permission';
import { Role } from 'src/entities/Role';
import { User } from 'src/entities/User';
import { yamlParser } from '../../../commons/yamlParser';
import { UserRole } from 'src/entities/UserRole';
import { RolePermit } from 'src/entities/RolePermit';
import { Form } from 'src/entities/Form';
import { EmployeeForm } from 'src/entities/EmployeeForm';

export function parseConfig(): TypeOrmModuleOptions {
  const YAML_CONFIG_FILENAME = 'config.yaml';
  const config = yamlParser(YAML_CONFIG_FILENAME);
  return {
    type: config.database.type ?? 'mysql',
    host: config.database.host ?? 'localhost',
    port: parseInt(config.database.port) ?? 3306,
    username: config.database.user ?? 'root',
    password: config.database.password ?? 'root',
    database: config.database.name ?? 'hr_management_system',
    entities:
      [User, Role, Permission, UserRole, RolePermit, Form, EmployeeForm] ?? [],
    // entities: [__dirname + '/**/*.entity{.ts,.js}'] ?? [],
    synchronize: true,
    logging: true,
    migrations: ['src/database/migrations/*{.ts,.js}'],
  };
}
