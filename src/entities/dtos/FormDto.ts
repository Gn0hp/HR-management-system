import { IBaseDTO } from './IBaseDTO';
import { Form } from '../../modules/form-module/Form';

export class FormDto implements IBaseDTO {
  form: Form;
  constructor(form: Form) {
    this.form = form;
  }
  isValid(): boolean {
    return true;
  }

  toEntity(): any {
    return this.form;
  }
}
