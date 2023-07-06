import { Test, TestingModule } from '@nestjs/testing';
import { PermissionService } from './permission-service';

describe('PermissionService', () => {
  let provider: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionService],
    }).compile();

    provider = module.get<PermissionService>(PermissionService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
