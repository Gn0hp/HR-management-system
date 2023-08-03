import { FormController } from './form.controller';
import { FormService } from './form.service';

describe('FormController', () => {
  let service: FormService;
  let controller: FormController;

  beforeEach(async () => {
    service = new FormService(null, null, null, null);
    controller = new FormController(service, null, null, null, null);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
