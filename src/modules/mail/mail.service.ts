import { Injectable } from '@nestjs/common';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { Options } from 'nodemailer/lib/smtp-transport';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  private async setTransport(): Promise<boolean> {
    const Oauth2 = google.auth.OAuth2;
    const oauth2Client = new Oauth2(
      this.configService.get<string>('GMAIL_CLIENT_ID'),
      this.configService.get<string>('GMAIL_CLIENT_SECRET'),
      this.configService.get<string>('GMAIL_REDIRECT_URL'),
    );
    oauth2Client.setCredentials({
      refresh_token: this.configService.get<string>('GMAIL_REFRESH_TOKEN'),
    });
    const access_token = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log('error while getting access_token', err);
          reject(err);
        }
        resolve(token);
      });
    });
    if (!access_token) {
      console.log('error while getting access_token');
      return false;
    }
    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get<string>('GMAIL_ADDRESS'),
        clientId: this.configService.get<string>('GMAIL_CLIENT_ID'),
        clientSecret: this.configService.get<string>('GMAIL_CLIENT_SECRET'),
        accessToken: access_token as string,
      },
      tls: {
        rejectUnauthorized: false,
      },
    };
    this.mailerService.addTransporter('gmail', config);
    return true;
  }
  async send(emailContent: ISendMailOptions) {
    await this.setTransport();
    emailContent.transporterName = 'gmail';
    await this.mailerService
      .sendMail(emailContent)
      .then(() => {
        console.log('send mail success');
        return true;
      })
      .catch((err) => {
        console.log('send mail fail: ', err);
      });
    return false;
  }
}
