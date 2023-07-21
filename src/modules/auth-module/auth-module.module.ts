import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModuleModule } from '../user-module/user-module.module';
import { JwtStrategy } from '../../auth/jwt/strategies/access-strategy';
import { RefreshTokenStrategy } from '../../auth/jwt/strategies/refresh-strategy';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [UserModuleModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, RefreshTokenStrategy],
  exports: [AuthService],
})
export class AuthModuleModule {}
