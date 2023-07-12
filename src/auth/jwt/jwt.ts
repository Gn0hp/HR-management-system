import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { yamlParser } from 'src/commons/yamlParser';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';

export function parseJwtConfig() {
  const YAML_CONFIG_FILENAME = 'config.yaml';
  const config = yamlParser(YAML_CONFIG_FILENAME);
  return {
    global: true,
    secret: config.jwt.secret ?? 'Gn0hp_s3cr3t',
    signOption: {
      expiresIn: config.jwt.lifecycle ?? '1800s',
    },
  };
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.configService.get<string>('jwt.secret'),
      });
      req['user'] = payload;
    } catch (err) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
