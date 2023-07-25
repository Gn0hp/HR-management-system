import { MailService } from './mail.service';
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
