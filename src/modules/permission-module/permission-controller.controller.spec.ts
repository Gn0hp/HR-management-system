import { Test, TestingModule } from '@nestjs/testing';
import { PermissionControllerController } from './permission-controller.controller';

describe('PermissionControllerController', () => {
  let controller: PermissionControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionControllerController],
    }).compile();

    controller = module.get<PermissionControllerController>(
      PermissionControllerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
