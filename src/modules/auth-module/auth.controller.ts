import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { User } from 'src/modules/user-module/User';
import { GetUser, JwtAuthGuard } from '../../auth/jwt/jwt';
import { JwtPayload } from '../../auth/jwt/jwtPayload';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from '../../commons/CommonResponse';

@Controller('auth')
@UseInterceptors(ResponseInterceptor)
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly service: AuthService,
    private readonly configService: ConfigService,
  ) {}
  // @Get('get-secret')
  // getSecret() {
  //   return this.configService.get<string>('DATABASE_NAME'); // can get both yaml and .env file
  // }
  @Post('login')
  @ApiOperation({
    summary: 'Login',
  })
  @ApiParam({
    name: 'username',
    description: 'username of user',
  })
  @ApiParam({
    name: 'password',
    description: 'password of user',
  })
  login(@Body() body: any) {
    const user: Partial<User> = {
      username: body?.username,
      password: body?.password,
    };
    return this.service.signIn(user);
    // return JSON.stringify(this.service.login(user));
  }
  @Post('register')
  @UseInterceptors(ResponseInterceptor)
  @ApiOperation({
    summary: 'Register new user',
  })
  @ApiBody({
    type: User,
  })
  register(@Body() body: User) {
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
    return this.service.registerNewUser(user);
  }
  @Post('refresh-token')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Refresh token',
    description:
      'Required access and refresh token after sign in then apply it to Authorization and Authorization-Refresh, NOTE: Authorization-Refresh does not need Bearer',
  })
  refreshToken(@GetUser() user: JwtPayload, @Req() req: any) {
    if (!user) return 'Invalid access token';
    return this.service.refreshToken(user, req.get('Authorization-Refresh'));
  }
}
