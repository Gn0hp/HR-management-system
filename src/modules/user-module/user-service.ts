import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { User } from 'src/entities/User';
import { UserRoleService } from '../user-role-module/user-role-service';
import { UserRole } from 'src/entities/UserRole';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { IBaseService } from '../../commons/interfaces/IBaseService';
import { UserDto } from '../../entities/dtos/UserDto';

@Injectable()
export class UserService implements IBaseService {
  private readonly USER_ID_KEY = 'user:id';

  constructor(
    @InjectRedis() private readonly redis: Redis,
    @InjectDataSource() private readonly connection: DataSource,
    private userRoleService: UserRoleService,
  ) {}

  async getNextUserId(): Promise<number> {
    return await this.redis.incr(this.USER_ID_KEY);
    // TODO: save the latest id to main database cause of redis could be reset
  }

  async save(user: Partial<User>): Promise<void> {
    user.id = await this.getNextUserId();
    const userDTO = new UserDto(user);
    if (!userDTO.isValid()) {
      throw new Error('Invalid user');
    }
    await this.redis.set(`user:${user.id}`, JSON.stringify(userDTO.toEntity()));
  }
  async findAll() {
    // async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDTO<User>> {
    let res = [];
    await this.redis.keys('user:*').then(async (keys) => {
      const users = await this.redis.mget(keys);
      res = users.map((user) => JSON.parse(user));
    });
    return res;
  }
  async findById(id: number): Promise<User> {
    const user = await this.redis.get(`user:${id}`);
    return JSON.parse(user);
  }
  async findByOptions(options: Partial<User>): Promise<User[]> {
    const users = await this.findAll();
    const res = users.filter((user) => {
      let isMatch = true;
      Object.keys(options).forEach((key) => {
        if (user[key] !== options[key]) {
          isMatch = false;
        }
      });
      return isMatch;
    });
    return res;
  }
  findByIds(condition, options?: any) {
    throw new Error('Method not implemented.');
  }

  findOneByOptions(condition, options?: any) {
    throw new Error('Method not implemented.');
  }
  async findOne(options: Partial<User>): Promise<User> {
    const users = await this.findByOptions(options);
    return users.length > 0 ? users[0] : null;
  }

  async update(id: number, user: Partial<User>): Promise<void> {
    const userInRedis = await this.findById(id);
    const updatedUser = { ...userInRedis, ...user };
    const userDTO: UserDto = new UserDto(updatedUser);
    if (!userDTO.isValid()) {
      throw new Error('Invalid user');
    }
    await this.redis.set(`user:${id}`, JSON.stringify(userDTO.toEntity()));
  }

  async delete(id: number) {
    await this.redis.del(`user:${id}`);
  }
  async findRolesByUserId(id: number): Promise<UserRole[]> {
    return this.userRoleService
      .findByUserId(id)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  }
  async getAllPermissionByUserId(user_id: number) {
    return this.connection
      .query(`select p.name from hr_management_system.permission p 
            \tright join hr_management_system.role_permit rp on rp.permissionId = p.id
            join hr_management_system.role r on r.id = rp.roleId
            join hr_management_system.user_role ur on ur.roleId = r.id
            where ur.id in (${user_id});`);
  }
  async getRolesByUserId(user_id: number) {
    return this.connection.query(`select r.name from hr_management_system.role r
            join hr_management_system.user_role ur on ur.roleId = r.id
            where ur.id in (${user_id});`);
  }
  async findAllUserMails() {
    const users = await this.findAll();
    return users.map((user) => user.email);
  }
}
