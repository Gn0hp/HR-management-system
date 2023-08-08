import { UserControllerController } from './user-controller.controller';
import { UserService } from './user-service';
import { User } from './User';

const IDS_NULL_ERROR = 'ids is required';
const IDS_INVALID_ERROR = 'ids must be string like "1,2,3"';
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
  // it('should ensure the JwtGuard is apply to routes', async () => {
  //   const guards = Reflect.getMetadata(
  //     '__guards__',
  //     UserControllerController.prototype,
  //   );
  //   console.log(guards);
  // });
  it('should find all users success', async () => {
    jest.spyOn(service, 'findAll').mockImplementation(async () => allUsers);
    const actualResult = await controller.findAll();
    expect(actualResult).toEqual(allUsers);
  });
  it('should find user by id successfully', async () => {
    jest.spyOn(service, 'findById').mockImplementation(async () => allUsers[0]);
    expect(await controller.findById(1)).toEqual(allUsers[0]);
  });
  it('should find user by id fail that id is not valid', async () => {
    jest.spyOn(service, 'findById').mockImplementation(async () => null);
    const actualResult = await controller.findById(10);
    expect(actualResult).toBeNull();
  });
  it('should find user by ids successfully', async () => {
    const expectResult = [allUsers[0], allUsers[1], allUsers[3]];
    jest
      .spyOn(service, 'findByIds')
      .mockImplementation(async () => expectResult);
    const actualResult = await controller.findByIds({
      ids: '1, 2, 4',
    });
    expect(actualResult).toEqual(expectResult);
  });
  it('should throw error that ids is not provided', async () => {
    jest.spyOn(service, 'findByIds').mockImplementation(async () => null);
    try {
      await controller.findByIds({ ids: null });
    } catch (err) {
      expect(err.message).toEqual(IDS_NULL_ERROR);
    }
  });
  it('should throw error that ids is not valid', async () => {
    const expectResult = () => {
      throw new Error(IDS_INVALID_ERROR);
    };
    jest
      .spyOn(service, 'findByIds')
      .mockImplementation(async () => expectResult());
    try {
      await controller.findByIds({ ids: '1, 2, 3, 4, 5' });
    } catch (err) {
      expect(err.message).toEqual(IDS_INVALID_ERROR);
    }
  });
  it('should find users by options successfully', async () => {
    const expectResult = [allUsers[0], allUsers[3]];
    jest
      .spyOn(service, 'findByOptions')
      .mockImplementation(async () => expectResult);
    const actualResult = await controller.findByOptions({
      status: 'ACTIVE',
      last_name: 'Tran',
    });
    expect(actualResult).toEqual(expectResult);
  });
  // Valid later in DTOs
  it('should find users by options failed because of invalid keys', async () => {
    jest.spyOn(service, 'findByOptions').mockImplementation(async () => null);
    const actualResult = await controller.findByOptions({
      alive: true,
      live_at: 'USA',
    });
    expect(actualResult).toBeNull();
  });
  it('should update user successfully', async () => {
    jest
      .spyOn(service, 'update')
      .mockImplementation(async () => new Promise((resolve) => resolve()));
    const actualResult = await controller.update(1, {
      first_name: 'Phong',
      last_name: 'Tran',
    });
    expect(actualResult).toEqual({
      message: undefined,
      result: true,
    });
  });
  it('should update user failed because of invalid id', async () => {
    jest.spyOn(service, 'update').mockImplementation(async () => null);
    const actualResult = await controller.update(10, {
      first_name: 'Phong',
      last_name: 'Tran',
    });
    expect(actualResult).toEqual({
      message: null,
      result: true,
    });
  });
  it('should delete user successfully', async () => {
    jest
      .spyOn(service, 'delete')
      .mockImplementation(async () => new Promise((resolve) => resolve()));
    const actualResult = await controller.delete(1);
    expect(actualResult).toEqual({
      message: undefined,
      result: true,
    });
  });
  it('should delete user failed because of invalid id', async () => {
    jest.spyOn(service, 'delete').mockImplementation(async () => null);
    const actualResult = await controller.delete(10);
    expect(actualResult).toEqual({
      message: null,
      result: true,
    });
  });
});
