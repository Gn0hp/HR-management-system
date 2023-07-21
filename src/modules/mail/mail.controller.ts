import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { GetUser, JwtAuthGuard } from '../../auth/jwt/jwt';
import { ApiTags } from '@nestjs/swagger';

@Controller('mail')
@ApiTags('mail')
export class MailController {
  constructor(private service: MailService) {}
  // @Post('test-send-mail')
  // @UseGuards(JwtAuthGuard)
  // sendMail(@GetUser() user, @Body() body: any) {
  //   this.service.send();
  // }
}
