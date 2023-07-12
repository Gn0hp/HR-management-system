import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user-service';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from 'src/auth/jwt/jwt';

@Controller('user-controller')
export class UserControllerController {
  constructor(
    private readonly service: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Get('get/:id')
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }

  @Get('get')
  @UseGuards(AuthGuard)
  findAll() {
    return this.service.findAll();
  }
  @Get('get-roles/:id')
  @UseGuards(AuthGuard)
  findRolesByUserId(@Param('id') id: number) {
    return this.service.getAllPermissionByUserId(id);
  }
  @Delete('delete/:id')
  delete(@Param('id') id: number) {
    return this.service.delete(id);
  }
}
