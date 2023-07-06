import { Module } from '@nestjs/common';
import { EmployeeFormService } from './employee-form-service';

@Module({
  providers: [EmployeeFormService],
  exports: [EmployeeFormService],
})
export class EmployeeFormModuleModule {}
