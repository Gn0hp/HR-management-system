import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { User } from 'src/entities/User';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Get('get-secret')
  getSecret() {
    return this.configService.get<string>('DATABASE_NAME'); // can get both yaml and .env file
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: any) {
    const user: Partial<User> = {
      username: body?.username,
      password: body?.password,
    };
    return this.service.signIn(user);
    // return JSON.stringify(this.service.login(user));
  }
  @Post('register')
  register(@Body() body: any) {
    const user: Partial<User> = {
      username: body?.username,
      first_name: body?.first_name,
      last_name: body?.last_name,
      email: body?.email,
      phone: body?.phone,
      password: body?.password,
      status: 'ACTIVE',
      created_at: new Date(),
    };
    return JSON.stringify(
      this.service.registerNewUser(user) ? 'success' : 'fail',
    );
  }
  @Get('/test-param')
  testParam(@Query() query: any) {
    return {
      u: query.username,
      p: query.password,
    };
  }
}
