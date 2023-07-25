import { Test, TestingModule } from '@nestjs/testing';
import { UserControllerController } from './user-controller.controller';

describe('UserControllerController', () => {
  let controller: UserControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserControllerController],
    }).compile();

    controller = module.get(UserControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should find all users success', async () => {});
  it('should find all users with query params success', async () => {});
  it('should find all users with query params fail', async () => {});
  it('should find user by id success', async () => {});
  it('should find user by id fail that id is not valid', async () => {});
  it('should find user by options success', async () => {});
  it('should find user by options fail that ?', async () => {});

});
