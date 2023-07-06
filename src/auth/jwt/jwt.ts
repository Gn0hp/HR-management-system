import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { yamlParser } from 'src/commons/yamlParser';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload } from './jwtPayload';

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
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secret: parseJwtConfig().secret,
    });
  }
  async validate(payload: JwtPayload) {
    // validate jwt here
    throw new UnauthorizedException();
  }
}
