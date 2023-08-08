import { FormController } from './form.controller';
import { FormService } from './form.service';
import { IFormCreatePostBody } from '../../internal/FormCreatePostBody';
import { IMailContext } from '../../commons/interfaces/IMailContext';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { ParseMailContent } from '../../utils/mail-content-buider';
import {JwtPayload} from "../../auth/jwt/jwtPayload";

describe('FormController', () => {
  let service: FormService;
  let controller: FormController;
  const payload: JwtPayload = {
    userId: 1,
    username: 'Noreply <gn0hp>',
    email: 'test@gmail.com',
  };
  const formBody = <IFormCreatePostBody>{
    name: 'Test Form',
    content: 'This is a test form text',
    status: 'ACTIVE',
    link: 'https://link-to-test-form',
    expireDate: '2021-12-31',
    type: '1',
  };
  const mailContext: IMailContext = {
    text: 'This is a test form text',
    link: 'https://link-to-test-form',
    type: '1',
  };
  const mailContent: ISendMailOptions = {
    to: ['test@gmail.com'],
    from: 'Noreply <gn0hp>',
    subject: 'Test Form',
    text: 'This is a test form text',
  };
  const emailContent = ParseMailContent(mailContext, mailContent);
  beforeEach(async () => {
    service = new FormService(null, null, null, null);
    controller = new FormController(service, null, null, null, null);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  it('should create form successfully', async () => {
    jest
      .spyOn(controller, 'create')
      .mockImplementation(async () => emailContent);
    const actualResult = await controller.create(payload, formBody);
    expect(actualResult).toEqual(emailContent);
  });
});
