import {
  Body,
  Controller,
  Post,
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

@Controller('form')
@ApiTags('form')
export class FormController {
  constructor(
    private readonly service: FormService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly mailService: MailService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    new AuthInterceptor([WRITE_FORM_PERMISSION, WRITE_PERMISSION]),
  )
  // status form = NEW, is_notified = false
  async create(@GetUser() user, @Body() body: IFormCreatePostBody) {
    //TODO: handle validating and saving to db
    //
    // sending mail:
    const mailContext: IMailContext = {
      name: body?.subject || '',
      link: body?.link || '',
      type: body?.type || '',
    };
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
    const mailContent: ISendMailOptions = {
      to: convertToNodeArray(userMails),
      from: this.configService.get<string>('GMAIL_ADDRESS'),
      subject: body?.subject,
      text: body?.text,
    };
    if (attachment) mailContent.attachments = attachment;
    const emailContent = ParseMailContent(mailContext, mailContent);
    const resSendMail = await this.mailService.send(emailContent);
    return resSendMail ? 'success' : 'failed';
  }

  @Post('submit')
  @UseGuards(JwtAuthGuard)
  // employee submit form
  async submit() {}

  @Post('approve')
  @UseGuards(JwtAuthGuard)
  // manager approve form
  async approve() {}

  @Post('close-submitted-form')
  @UseGuards(JwtAuthGuard)
  // hr close submitted form
  async closeSubmittedForm() {}
}
