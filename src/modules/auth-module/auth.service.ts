import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/jwt/jwtPayload';
import * as bcrypt from 'bcrypt';
import { User } from 'src/entities/User';
import { UserService } from '../user-module/user-service';

const saltRounds = 10; // Number of salt rounds to generate

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
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
      throw new UnauthorizedException();
    }
    if ((await bcrypt.compare(user?.password, userFound.password)) === false) {
      throw new UnauthorizedException();
    }
    const permissions = (
      await this.userService.getAllPermissionByUserId(userFound.id)
    ).map((permission) => permission.name);
    const payload: JwtPayload = {
      userId: userFound?.id,
      permissions,
    };
    return {
      is_valid: true,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
