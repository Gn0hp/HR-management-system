import { ApiProperty } from '@nestjs/swagger';

export class IEmployeeFormApproveBody {
  @ApiProperty()
  employeeFormId?: number;
}

export class IEmployeeSubmitBody {
  @ApiProperty()
  formId?: number;
  @ApiProperty()
  note?: string;
}
