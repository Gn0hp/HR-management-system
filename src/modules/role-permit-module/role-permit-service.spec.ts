import { Test, TestingModule } from '@nestjs/testing';
import { RolePermitService } from './role-permit-service';

describe('RolePermitService', () => {
  let provider: RolePermitService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RolePermitService],
    }).compile();

    provider = module.get<RolePermitService>(RolePermitService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
