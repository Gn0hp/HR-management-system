import { Module } from '@nestjs/common';
import { EmployeeFormService } from './employee-form-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeForm } from '../../entities/EmployeeForm';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeForm])],
  providers: [EmployeeFormService],
  exports: [EmployeeFormService],
})
export class EmployeeFormModuleModule {}
