import {
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { yamlParser } from 'src/utils/yamlParser';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import * as randToken from 'rand-token';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

// @Injectable()
// export class CustomJwtAuthGuard implements CanActivate {
//   constructor(
//     private jwtService: JwtService,
//     private readonly configService: ConfigService,
//   ) {}
//
//   private extractTokenFromHeader(req: Request): string | undefined {
//     const [type, token] = req.headers.authorization?.split(' ') ?? [];
//     return type === 'Bearer' ? token : undefined;
//   }
//   async canActivate(
//     context: ExecutionContext,
//   ): Promise<boolean | Promise<boolean> | Observable<boolean>> {
//     const req = context.switchToHttp().getRequest();
//     const token = this.extractTokenFromHeader(req);
//
//     if (!token) {
//       throw new UnauthorizedException();
//     }
//     try {
//       const payload = await this.jwtService.verifyAsync(token, {
//         secret: this.configService.get<string>('jwt.secret'),
//       });
//       req['user'] = payload;
//     } catch (err) {
//       throw new UnauthorizedException();
//     }
//     return true;
//   }
// }

export const GetUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req?.user;
  },
);

export function parseJwtConfig() {
  const YAML_CONFIG_FILENAME = 'config.yaml';
  const config = yamlParser(YAML_CONFIG_FILENAME);
  return {
    global: true,
    secret: config.jwt.secret ?? 'Gn0hp_s3cr3t',
    signOption: {
      expiresIn: config.jwt.lifecycle ?? 1800000,
    },
  };
}

export function randRfToken(size: number) {
  return randToken.generate(size);
}
