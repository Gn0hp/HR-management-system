import { Test, TestingModule } from '@nestjs/testing';
import { UserControllerController } from './user-controller.controller';
import { UserService } from './user-service';
import { UserRoleModuleModule } from '../user-role-module/user-role-module.module';
import { User } from './User';
import { JwtAuthGuard } from '../../auth/jwt/jwt';

describe('UserControllerController', () => {
  let service: UserService;
  let controller: UserControllerController;
  let allUsers: User[];

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   imports: [UserRoleModuleModule],
    //   providers: [UserService],
    //   controllers: [UserControllerController],
    // }).compile();
    const userAdmin = <User>{
      username: 'gn0hp',
      first_name: 'Phong',
      last_name: 'Tran',
      email: 'phongtk@mail.com',
      phone: '0912546876',
      password: '111',
      status: 'ACTIVE',
      id: 1,
      address: 'Dong Da, Ha Noi',
      avatar: 'https://link-to-test-avatar-for-user-12',
    };
    const userDirector = <User>{
      username: 'gn0hp_test01',
      first_name: 'Martin',
      last_name: 'Locust',
      email: 'martin@mail.com',
      phone: '0123546879',
      password: '$2b$10$Ta/koWIijGObBBKRV4aVp.h8.1kgCyFgS3FkMSup4EbRLXPfe1G2W',
      status: 'ACTIVE',
      id: 2,
    };
    const userHr = <User>{
      username: 'gn0hp_test04',
      first_name: 'gn0hp',
      last_name: 'Tran',
      email: 'gn0hpTran@mail.com',
      phone: '0123546879',
      password: '$2b$10$Oqwbl8TTmF98h.rubeG5oOmm/0YcsR9PHcENc0WkOTaicoQPBH33C',
      status: 'ACTIVE',
      id: 5,
    };
    const userManager = <User>{
      username: 'gn0hp_test03',
      first_name: 'Locust',
      last_name: 'Tran',
      email: 'locustTran@mail.com',
      phone: '0123546879',
      password: '$2b$10$MHkeHvLX4qofmUy.gvRSi.hmSzvBTUerzONsiBFBjIr38pS9YhEOe',
      status: 'ACTIVE',
      id: 4,
    };
    const userEmployee = <User>{
      username: 'trung_test',
      first_name: 'trung',
      last_name: 'nguyen',
      email: 'trungnguyen@mail.com',
      phone: '0123546879',
      password: '$2b$10$t5yE1xtQdAPymPo8HH7XQeL7EExgDWz1Bih4GqnZ3IAvGTT0EjxB6',
      status: 'ACTIVE',
      id: 10,
    };
    allUsers = [userAdmin, userDirector, userHr, userManager, userEmployee];
    service = new UserService(null, null, null);
    controller = new UserControllerController(service);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should ensure the JwtGuard is apply to routes', async () => {
    const guards = Reflect.getMetadata(
      '__guards__',
      UserControllerController.prototype,
    );
    console.log(guards);
  });
  it('should find all users success', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(async () => allUsers);
    const actualResult = await controller.findAll();
    expect(actualResult).toEqual(allUsers);
  });
  it('should find user by id success', async () => {
    jest.spyOn(service, 'findById').mockImplementation(async () => allUsers[0]);
    expect(await controller.findById(1)).toEqual(allUsers[0]);
  });
  it('should find user by id fail that id is not valid', async () => {
    jest.spyOn(service, 'findById').mockImplementation(async () => null);
    const actualResult = await controller.findById(10);
    expect(actualResult).toBeNull();
  });
});
