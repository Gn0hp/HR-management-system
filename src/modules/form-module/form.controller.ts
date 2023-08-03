import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
import {
  AuthInterceptor,
  RequiredPermission,
} from '../auth-module/auth.interceptor';
import {
  APPROVE_FORM_PERMISSION,
  DELETE_FORM_PERMISSION,
  EMPLOYEE_FORM_STATUS_APPROVED,
  EMPLOYEE_FORM_STATUS_CLOSED,
  EMPLOYEE_FORM_STATUS_NEW,
  EMPLOYEE_FORM_STATUS_REJECTED,
  EMPLOYEE_FORM_STATUS_SUBMITTED,
  FORM_STATUS_CLOSED,
  READ_FORM_PERMISSION,
  UPDATE_FORM_PERMISSION,
  WRITE_FORM_PERMISSION,
} from '../../commons/globals/Constants';
import { ISendMailOptions } from '@nestjs-modules/mailer';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { EmployeeFormService } from '../employee-form-module/employee-form-service';
import { Form } from './Form';
import { FormDto } from '../../entities/dtos/FormDto';
import { EmployeeForm } from '../employee-form-module/EmployeeForm';
import { EmployeeFormDto } from '../../entities/dtos/EmployeeFormDto';
import {
  IEmployeeFormApproveBody,
  IEmployeeSubmitBody,
} from '../../internal/RequestPostBody';
import {
  CommonQueryParam,
  parseQuery,
  queryParamBuilder,
} from '../../commons/query_params';
import { ResponseInterceptor } from '../../commons/CommonResponse';
import { JwtPayload } from '../../auth/jwt/jwtPayload';

@Controller('forms')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
@ApiTags('Forms')
export class FormController {
  constructor(
    private readonly service: FormService,
    private readonly configService: ConfigService,
    private userService: UserService,
    private mailService: MailService,
    private employeeService: EmployeeFormService,
  ) {}

  @Post('create')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(WRITE_FORM_PERMISSION)
  @ApiOperation({
    summary: 'Create form',
    description: 'Create form, Permission: WRITE_FORM_PERMISSION',
  })
  @ApiBody({
    type: IFormCreatePostBody,
  })
  // status form = NEW, is_notified = false
  async create(@GetUser() user: JwtPayload, @Body() body: IFormCreatePostBody) {
    const form: Form = {
      name: body?.subject,
      content: body?.text,
      link: body?.link,
      status: EMPLOYEE_FORM_STATUS_NEW,
      expiry_date: new Date(body?.expireDate) || new Date(),
      is_notified: false,
      type: body?.type,
    };
    // sending mail:
    // let userMails = this.userService
    //   .findAllUserMails()
    //   .then((res) => convertToNodeArray(res))
    //   .catch((err) => {
    //     console.log('error while getting users email', err);
    //     throw err;
    //   });
    const userMails = convertToNodeArray([
      'gn0hp289@gmail.com',
      'userd2891@gmail.com',
    ]);
    // const userDB = await this.userService.findById(user?.id);
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
    form.created_by = user.userId;
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
  @ApiOperation({
    summary: 'Submit form',
    description: 'Submit form, Permission: Not required',
  })
  @ApiBody({
    type: IEmployeeSubmitBody,
  })
  // employee submit form
  async submit(
    @GetUser() payload: JwtPayload,
    @Body() body: IEmployeeSubmitBody,
  ) {
    if (!body.formId) throw new Error('formId is required');
    const formDb = await this.service.findById(body.formId);
    if (!formDb) throw new Error('form not found');
    if (!(await this.service.validStatusForAction(formDb)))
      throw new Error('This form is not available for any action');
    const isSubmittedForThisUser =
      await this.employeeService.isSubmittedUserForm(
        payload.userId,
        body.formId,
      );
    const employeeForm: EmployeeForm = {
      status: EMPLOYEE_FORM_STATUS_SUBMITTED,
      userId: payload.userId,
      form: formDb,
    };
    if (body.note) employeeForm.note = body.note;
    if (isSubmittedForThisUser)
      return this.employeeService.update(
        isSubmittedForThisUser.id,
        new EmployeeFormDto(employeeForm),
      );
    return this.employeeService.save(new EmployeeFormDto(employeeForm));
  }

  @Post('approve')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(APPROVE_FORM_PERMISSION)
  @ApiOperation({
    summary: 'Approve form',
    description: 'Approve form, Permission: APPROVE_FORM_PERMISSION',
  })
  @ApiBody({
    type: IEmployeeFormApproveBody,
  })
  //@UseInterceptors(new AuthInterceptor(undefined, ['MANAGER']))
  // manager approve form
  async approve(
    @GetUser() payload: JwtPayload,
    @Body() body: IEmployeeFormApproveBody,
  ) {
    if (!body.employeeFormId) throw new Error('employeeFormId is required');
    const employeeForm = await this.employeeService.findById(
      body.employeeFormId,
    );
    if (!employeeForm) throw new Error('employeeForm not found');
    if (employeeForm.status !== EMPLOYEE_FORM_STATUS_SUBMITTED) {
      throw new Error('employeeForm has been approved or not submitted');
    }
    employeeForm.status = EMPLOYEE_FORM_STATUS_APPROVED;
    employeeForm.note = `Approved by ${payload.username} at ${new Date()}`;
    return this.employeeService.update(
      body.employeeFormId,
      new EmployeeFormDto(employeeForm),
    );
  }
  @Post('reject')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(APPROVE_FORM_PERMISSION)
  @ApiOperation({
    summary: 'Reject form',
    description: 'Reject form, Permission: APPROVE_FORM_PERMISSION',
  })
  @ApiBody({
    type: IEmployeeFormApproveBody,
  })
  async rejectSubmittedForm(
    @GetUser() payload: JwtPayload,
    @Body() body: IEmployeeFormApproveBody,
  ) {
    if (!body.employeeFormId) throw new Error('employeeFormId is required');
    const employeeForm = await this.employeeService.findById(
      body.employeeFormId,
    );
    if (!employeeForm) throw new Error('employeeForm not found');
    if (employeeForm.status !== EMPLOYEE_FORM_STATUS_SUBMITTED) {
      throw new Error('employeeForm has been approved or not submitted');
    }
    employeeForm.status = EMPLOYEE_FORM_STATUS_REJECTED;
    employeeForm.note = `Rejected by ${payload.username} at ${new Date()}`;
    return this.employeeService.update(
      body.employeeFormId,
      new EmployeeFormDto(employeeForm),
    );
  }

  @Post('close-submitted-form/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(APPROVE_FORM_PERMISSION)
  @ApiOperation({
    summary: 'Close submitted form',
    description: 'Close submitted form, Permission: APPROVE_FORM_PERMISSION',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'employeeForm id',
  })
  //@UseInterceptors(new AuthInterceptor(undefined, ['HR']))
  // hr close submitted form
  async closeApprovedForm(
    @GetUser() payload: JwtPayload,
    @Param('id') id: number,
    @Body() body: IEmployeeFormApproveBody,
  ) {
    if (!(await this.service.validStatusForAction(id)))
      throw new Error('This form is not available for any action');
    const employeeForm = await this.employeeService.findById(
      body.employeeFormId,
    );
    if (!employeeForm) throw new Error('employeeForm not found');
    if (
      ![EMPLOYEE_FORM_STATUS_APPROVED, EMPLOYEE_FORM_STATUS_REJECTED].includes(
        employeeForm.status,
      )
    ) {
      throw new Error('employeeForm has not been approved');
    }
    const formDTO: EmployeeFormDto = new EmployeeFormDto(<EmployeeForm>{
      status: EMPLOYEE_FORM_STATUS_CLOSED,
      note: `Closed by ${payload.username} at ${new Date()}`,
    });
    return this.employeeService.update(body.employeeFormId, formDTO);
  }

  @Post('close-form/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(APPROVE_FORM_PERMISSION)
  @ApiOperation({
    summary: 'Close form',
    description: 'Close form, Permission: APPROVE_FORM_PERMISSION',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'form id',
  })
  //@UseInterceptors(new AuthInterceptor(undefined, ['HR']))
  // hr close submitted form
  async closeForm(@GetUser() payload: JwtPayload, @Param('id') id: number) {
    if (!(await this.service.validStatusForAction(id)))
      throw new Error('This form is not available for any action');
    const formDTO: FormDto = new FormDto(<Form>{
      status: FORM_STATUS_CLOSED,
      note: `Closed by ${payload.username} at ${new Date()}`,
    });
    return this.service.update(id, formDTO);
  }

  @Get('get')
  @CommonQueryParam()
  @UseInterceptors(AuthInterceptor)
  @UseInterceptors(ResponseInterceptor)
  @RequiredPermission(READ_FORM_PERMISSION)
  @ApiOperation({
    summary: 'Get all form',
    description: 'Get all form, Permission: READ_FORM_PERMISSION',
  })
  findAll(@Query() query) {
    return this.service.findAll(queryParamBuilder(query));
  }

  @Get('get-by-id/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_FORM_PERMISSION)
  @ApiOperation({
    summary: 'Get form by id',
    description: 'Get form by id, Permission: READ_FORM_PERMISSION',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'form id',
  })
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Get('get-by-ids')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_FORM_PERMISSION)
  @CommonQueryParam()
  @ApiOperation({
    summary: 'Get form by ids',
    description: 'Get form by ids, Permission: READ_FORM_PERMISSION',
  })
  findByIds(@Query() query) {
    if (!query.ids) throw new Error('ids is required');
    const ids = query.ids.split(',');
    return this.service.findByIds(ids, queryParamBuilder(query));
  }

  @Get('get-by-options')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_FORM_PERMISSION)
  @CommonQueryParam()
  @ApiOperation({
    summary: 'Get form by options',
    description: 'Get form by options, Permission: READ_FORM_PERMISSION',
  })
  findByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.service.findByOptions(asBody, queryParamBuilder(query));
  }

  @Get('get-one-by-options')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_FORM_PERMISSION)
  @CommonQueryParam()
  @ApiOperation({
    summary: 'Get one form by options',
    description: 'Get one form by options, Permission: READ_FORM_PERMISSION',
  })
  findOneByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.service.findOneByOptions(asBody);
  }

  @Delete('delete/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(DELETE_FORM_PERMISSION)
  @ApiOperation({
    summary: 'Delete form by id',
    description: 'Delete form by id, Permission: DELETE_FORM_PERMISSION',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }

  @Put('update/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(UPDATE_FORM_PERMISSION)
  @ApiOperation({
    summary: 'Update form by id',
    description: 'Update form by id, Permission: UPDATE_FORM_PERMISSION',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiBody({
    type: Form,
  })
  update(@Param('id') id: number, @Body() body: Form) {
    return this.service.update(id, new FormDto(body));
  }

  @Get('get-stat-complete-form/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_FORM_PERMISSION)
  @UseInterceptors(ResponseInterceptor)
  @ApiOperation({
    summary: 'Get stat complete form',
    description: 'Get stat complete form, Permission: READ_FORM_PERMISSION',
  })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  async getStatCompleteForm(@Param('id') id: number) {
    const userIds =
      await this.employeeService.getAllUserNotCompleteFormByFormId(id);
    return this.userService.findByIds(userIds);
  }
}
