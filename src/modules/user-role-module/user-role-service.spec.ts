import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleService } from './user-role-service';

describe('UserRoleService', () => {
  let provider: UserRoleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserRoleService],
    }).compile();

    provider = module.get<UserRoleService>(UserRoleService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
