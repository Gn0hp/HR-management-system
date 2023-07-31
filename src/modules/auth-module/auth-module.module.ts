import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModuleModule } from '../user-module/user-module.module';
import { JwtStrategy } from '../../auth/jwt/strategies/access-strategy';
import { RefreshTokenStrategy } from '../../auth/jwt/strategies/refresh-strategy';
import { JwtModule } from '@nestjs/jwt';
import { AuthInterceptor } from './auth.interceptor';

@Module({
  imports: [UserModuleModule, JwtModule.register({}), UserModuleModule],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy, AuthInterceptor],
  exports: [AuthService, AuthInterceptor],
})
export class AuthModuleModule {}
