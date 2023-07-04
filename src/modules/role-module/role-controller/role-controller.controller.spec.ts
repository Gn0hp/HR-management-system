import { Test, TestingModule } from '@nestjs/testing';
import { RoleControllerController } from './role-controller.controller';

describe('RoleControllerController', () => {
  let controller: RoleControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RoleControllerController],
    }).compile();

    controller = module.get<RoleControllerController>(RoleControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
