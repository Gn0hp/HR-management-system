import { Test, TestingModule } from '@nestjs/testing';
import { EmployeeFormService } from './employee-form-service';

describe('EmployeeFormService', () => {
  let provider: EmployeeFormService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EmployeeFormService],
    }).compile();

    provider = module.get<EmployeeFormService>(EmployeeFormService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
