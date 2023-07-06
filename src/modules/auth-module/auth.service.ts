import { Injectable } from '@nestjs/common';
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
    private readonly userService: UserService,
  ) {}
  async generateJwt(payload: JwtPayload): Promise<string> {
    return this.jwtService.sign(payload);
  }
  async registerNewUser(user: User) {
    user.password = await bcrypt.hash(user.password, saltRounds);
    // return this.userService.save(user);
  }
  async checkLogin(user: User) {
    user.password = await bcrypt.hash(user.password, saltRounds);
    // encrypt password
    // find user by username and password
    // const roles = this.userService.findRolesByUserId(user.id);
    // const payload = {
    //   userId: user.id,
    //   roles,
    // }
    // return {
    //   access_token: await this.jwtService.sign(payload),
    // };
  }
}
