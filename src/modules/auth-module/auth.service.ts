import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt/jwtPayload';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/User';
import { UserService } from '../user-module/user-service';
import { ConfigService } from '@nestjs/config';

const saltRounds = 10; // Number of salt rounds to generate

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
    private readonly configService: ConfigService,
  ) {}
  async generateJwt(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }
  async registerNewUser(user: Partial<User>) {
    user.password = await bcrypt.hash(user.password, saltRounds);
    // return this.userService.save(user);
    this.userService
      .save(user)
      .then((res) => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  }
  async signIn(user: Partial<User>) {
    const userFound = await this.userService
      .findOne({
        username: user.username,
      })
      .then((res) => {
        if (res) {
          console.log('valid login');
          return res;
        }
      })
      .catch((err) => {
        console.log(err);
        return null;
      });
    if (!userFound) {
      throw new UnauthorizedException('User does not exist');
    }
    if ((await bcrypt.compare(user?.password, userFound.password)) === false) {
      throw new UnauthorizedException('Wrong password');
    }
    const permissions = (
      await this.userService.getAllPermissionByUserId(userFound.id)
    ).map((permission) => permission.name);
    const roles = (await this.userService.getRolesByUserId(userFound.id)).map(
      (role) => role.name,
    );
    const payload: JwtPayload = {
      userId: userFound?.id,
      username: userFound?.username,
      roles,
      permissions,
    };
    const tokens = await this.getTokens(payload);
    await this.updateRefreshToken(userFound.id, tokens.refreshToken);
    return {
      success: true,
      ...tokens,
    };
  }
  async logout(userId: number) {
    await this.userService.update(userId, {
      refreshToken: null,
    });
  }
  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, saltRounds);
    await this.userService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }
  async getTokens(payload: JwtPayload) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.secret'),
        expiresIn: this.configService.get<string>('jwt.lifecycle'),
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('jwt.refresh_token_secret'),
        expiresIn: this.configService.get<string>(
          'jwt.refresh_token_lifecycle',
        ),
      }),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
  async refreshToken(user: JwtPayload, refreshToken: string) {
    const userFound = await this.userService.findById(user.userId);
    if (!userFound || !userFound.refreshToken) {
      throw new ForbiddenException('User not found');
    }
    const matchRefreshToken = await bcrypt.compare(
      refreshToken,
      userFound.refreshToken,
    );
    if (!matchRefreshToken) {
      throw new ForbiddenException('Invalid refresh token');
    }
    const tokens = await this.getTokens(user);
    await this.updateRefreshToken(user.userId, tokens.refreshToken);
    return {
      success: true,
      ...tokens,
    };
  }
}
