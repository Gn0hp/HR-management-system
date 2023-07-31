import { Module } from '@nestjs/common';
import { EmployeeFormService } from './employee-form-service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeeForm } from './EmployeeForm';
import { UserModuleModule } from '../user-module/user-module.module';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeForm]), UserModuleModule],
  providers: [EmployeeFormService],
  exports: [EmployeeFormService],
})
export class EmployeeFormModuleModule {}
