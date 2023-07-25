import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FormService } from './form.service';
import { ConfigService } from '@nestjs/config';
import { IMailContext } from '../../commons/interfaces/IMailContext';
import { IFormCreatePostBody } from '../../internal/FormCreatePostBody';
import { UserService } from '../user-module/user-service';
import { convertToNodeArray } from '../../utils/converter';
import { GetUser, JwtAuthGuard } from '../../auth/jwt/jwt';
import { ParseMailContent } from '../../utils/mail-content-buider';
import { MailService } from '../mail/mail.service';
import { AuthInterceptor } from '../../commons/auth.interceptor';
import {
  WRITE_FORM_PERMISSION,
  WRITE_PERMISSION,
} from '../../commons/globals/Constants';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { ApiTags } from '@nestjs/swagger';
import { EmployeeFormService } from '../employee-form-module/employee-form-service';
import { Form } from '../../entities/Form';
import { FormDto } from '../../entities/dtos/FormDto';
import { EmployeeForm } from '../../entities/EmployeeForm';
import { EmployeeFormDto } from '../../entities/dtos/EmployeeFormDto';
import {
  IEmployeeFormApproveBody,
  IEmployeeSubmitBody,
} from '../../internal/RequestPostBody';
import { parseQuery, queryParamBuilder } from '../../commons/query_params';

@Controller('form')
@UseGuards(JwtAuthGuard)
@ApiTags('form')
export class FormController {
  constructor(
    private readonly service: FormService,
    private readonly configService: ConfigService,
    private userService: UserService,
    private mailService: MailService,
    private employeeService: EmployeeFormService,
  ) {}

  @Post('create')
  @UseInterceptors(
    new AuthInterceptor([WRITE_FORM_PERMISSION, WRITE_PERMISSION]),
  )
  // status form = NEW, is_notified = false
  async create(@GetUser() user, @Body() body: IFormCreatePostBody) {
    //TODO: handle validating and saving to db
    const form: Form = {
      name: body?.subject,
      content: body?.text,
      link: body?.link,
      status: 'NEW',
      expiry_date: new Date(body?.expireDate) || new Date(),
      is_notified: false,
      type: body?.type,
    };
    // sending mail:
    // const userMails = this.userService
    //   .findAllUserMails()
    //   .then((res) => convertToNodeArray(res))
    //   .catch((err) => {
    //     console.log('error while getting users email', err);
    //     throw err;
    //   });
    const userMails = ['gn0hp289@gmail.com'];
    // const userDB = await this.userService.findById(user?.id);
    // TODO: convert to ISendMailOptions
    const attachment = body.attachments
      ? convertToNodeArray(body.attachments)
      : undefined;
    const mailContext: IMailContext = {
      text: body?.text || '',
      link: body?.link || '',
      type: body?.type || '',
    };
    const mailContent: ISendMailOptions = {
      to: convertToNodeArray(userMails),
      from: this.configService.get<string>('GMAIL_ADDRESS'),
      subject: body?.subject,
      text: body?.text,
    };
    if (attachment) mailContent.attachments = attachment;

    const emailContent = ParseMailContent(mailContext, mailContent);
    const resSendMail = await this.mailService.send(emailContent);
    console.log(resSendMail);
    form.is_notified = true;
    await this.service
      .save(new FormDto(form))
      .then((res) => {
        console.log('form saved', res);
      })
      .catch((err) => {
        console.log('error while saving form: ', err);
        throw err;
      });
    return resSendMail ? resSendMail : 'failed';
  }

  @Post('submit')
  // employee submit form
  async submit(@GetUser() payload, @Body() body: IEmployeeSubmitBody) {
    if (!body.formId) throw new Error('formId is required');
    const formDb = await this.service.findById(body.formId);
    if (!formDb) throw new Error('form not found');
    const employeeForm: EmployeeForm = {
      status: 'NEW',
      userId: payload.userId,
      form: formDb,
    };
    if (body.note) employeeForm.note = body.note;
    return this.employeeService.save(new EmployeeFormDto(employeeForm));
  }

  @Post('approve')
  @UseInterceptors(new AuthInterceptor(undefined, ['MANAGER']))
  // manager approve form
  async approve(@GetUser() payload, @Body() body: IEmployeeFormApproveBody) {
    if (!body.employeeFormId) throw new Error('employeeFormId is required');
    const employeeForm = await this.employeeService.findById(
      body.employeeFormId,
    );
    if (!employeeForm) throw new Error('employeeForm not found');
    employeeForm.status = 'APPROVED';
    return this.employeeService.update(
      body.employeeFormId,
      new EmployeeFormDto(employeeForm),
    );
  }

  @Patch('close-submitted-form/:id')
  @UseInterceptors(new AuthInterceptor(undefined, ['HR']))
  // hr close submitted form
  async closeSubmittedForm(@Param('id') id: number) {
    const formDTO: FormDto = new FormDto(<Form>{ status: 'CLOSED' });
    return this.service.update(id, formDTO);
  }
  @Get('get')
  findAll(@Query() query) {
    return this.service.findAll(queryParamBuilder(query));
  }

  @Get('get-by-id/:id')
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Get('get-by-ids')
  findByIds(@Query() query) {
    if (!query.ids) throw new Error('ids is required');
    const ids = query.ids.split(',');
    return this.service.findByIds(ids, queryParamBuilder(query));
  }

  @Get('get-by-options')
  findByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.service.findByOptions(asBody, queryParamBuilder(query));
  }

  @Get('get-one-by-options')
  findOneByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.service.findOneByOptions(asBody);
  }

  @Post('delete/:id')
  delete(@Param('id') id) {
    return this.service.delete(id);
  }

  @Patch('update/:id')
  update(@Param('id') id, @Body() body: { entity: Form }) {
    return this.service.update(id, new FormDto(body.entity));
  }
}
