import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly configService: ConfigService,
  ) {}
  @Get('/get-secret')
  getSecret() {
    return this.configService.get<string>('DATABASE_NAME'); // can get both yaml and .env file
  }
  @Post('/login')
  login(@Body() body: any) {
    return {
      u: body.username,
      p: body.password,
    };
  }
  @Get('/test-param')
  testParam(@Query() query: any) {
    return {
      u: query.username,
      p: query.password,
    };
  }
}
