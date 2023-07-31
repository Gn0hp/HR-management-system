import { MailService } from './mail.service';
import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';

@Controller('mails')
@ApiTags('Mails')
export class MailController {
  constructor(private service: MailService) {}
  // @Post('test-send-mail')
  // @UseGuards(JwtAuthGuard)
  // sendMail(@GetUser() user, @Body() body: any) {
  //   this.service.send();
  // }
}
