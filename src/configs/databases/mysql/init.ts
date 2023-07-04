import { Permission } from 'src/entities/Permission';
import { Role } from 'src/entities/Role';
import { User } from 'src/entities/User';
import { DataSource } from 'typeorm';

export const AppDatasource = new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [User, Role, Permission],
});

AppDatasource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
