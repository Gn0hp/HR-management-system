import { Test, TestingModule } from '@nestjs/testing';
import { UserRoleController } from './user-role.controller';
import { JwtAuthGuard } from '../../auth/jwt/jwt';

describe('UserRoleController', () => {
  let controller: UserRoleController;
  const adminAccount = {
    username: 'gn0hp',
    password: '111',
  };
  const DirectorAccount = {
    username: 'gn0hp',
    password: '111',
  };
  const ManagerAccount = {
    username: 'gn0hp',
    password: '111',
  };
  const EmployeeAccount = {
    username: 'gn0hp',
    password: '111',
  };
  const HrAccount = {
    username: 'gn0hp',
    password: '111',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRoleController],
    }).compile();

    controller = module.get(UserRoleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

async function guardEnsurance() {
  const guards = Reflect.getMetadata('__guards__', UserRoleController);
  const guard = new guards[0]();

  expect(guard).toBeInstanceOf(JwtAuthGuard);
}
