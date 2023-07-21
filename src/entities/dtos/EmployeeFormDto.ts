import { IBaseDTO } from './IBaseDTO';
import { EmployeeForm } from '../EmployeeForm';

export class EmployeeFormDto implements IBaseDTO {
  employeeForm: EmployeeForm;
  constructor(employeeForm: EmployeeForm) {
    this.employeeForm = employeeForm;
  }
  isValid(): boolean {
    return true;
  }

  toEntity(): any {
    return this.employeeForm;
  }
}
