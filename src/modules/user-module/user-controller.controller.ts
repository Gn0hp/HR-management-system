import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user-service';
import {
  DELETE_PERMISSION,
  READ_PERMISSION,
  UPDATE_PERMISSION,
} from '../../commons/globals/Constants';
import {
  AuthInterceptor,
  RequiredPermission,
} from '../auth-module/auth.interceptor';
import { User } from './User';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { parseQuery } from '../../commons/query_params';
import { ResponseInterceptor } from '../../commons/CommonResponse';
import { JwtPayload } from '../../auth/jwt/jwtPayload';
import {GetUser, JwtAuthGuard} from "../../auth/jwt/jwt";

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
@ApiTags('Users')
export class UserControllerController {
  constructor(private readonly userService: UserService) {}

  @Get('get/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @ApiOperation({
    summary: 'Get user by id',
    description:
      'Get user by id, Permission: READ_USER. Not implement filter for get-request yet',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'user id',
  })
  findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }
  @Get('self-info')
  @ApiOperation({
    summary: 'Get self info',
    description: 'Get self info, Permission: just need authenticate.',
  })
  selfInfo(@GetUser() payload: JwtPayload) {
    return this.userService.findById(payload.userId);
  }
  @Get('get')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  // @RequiredRole(['ADMIN'])
  @ApiOperation({
    summary: 'Get all user',
    description: 'Get all user, Permission: READ_USER.',
  })
  findAll() {
    return this.userService.findAll();
  }
  @Get('get-roles/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @ApiOperation({
    summary: 'Get all roles by user id',
    description: 'Get all roles by user id, Permission: READ_USER.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'user id',
  })
  findRolesByUserId(@Param('id') id: number) {
    return this.userService.getAllPermissionByUserId(id);
  }
  @Get('get-by-options')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @ApiOperation({
    summary: 'Get list users by options',
    description: 'Get user by options, Permission: READ_USER.',
  })
  @ApiParam({
    name: 'exampleQuery',
    description: 'properties of user entity',
    example: 'id=1&name=abc&...',
  })
  findByOptions(@Query() query: any) {
    const filterUser = <User>parseQuery(query);
    return this.userService.findByOptions(filterUser);
  }
  @Delete('delete/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(DELETE_PERMISSION)
  @ApiOperation({
    summary: 'Delete user by id',
    description: 'Delete user by id, Permission: DELETE_USER.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'user id',
  })
  async delete(@Param('id') id: number) {
    return this.userService
      .delete(id)
      .then((res) => {
        return {
          result: true,
          message: res,
        };
      })
      .catch((err) => {
        return {
          result: false,
          message: err,
        };
      });
  }
  @Put('update/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(UPDATE_PERMISSION)
  @ApiOperation({
    summary: 'Update user by id',
    description: 'Update user by id, Permission: UPDATE_USER.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'user id',
  })
  @ApiBody({
    type: User,
  })
  async update(@Param('id') id: number, @Body() body: User) {
    return this.userService
      .update(id, body)
      .then((res) => {
        return {
          result: true,
          message: res,
        };
      })
      .catch((err) => {
        return {
          result: false,
          message: err,
        };
      });
  }
  @Patch('self-update')
  @ApiOperation({
    summary: 'Update user by id',
    description: 'Update user by id, Permission: just need authenticate.',
  })
  @ApiBody({
    type: User,
  })
  async selfUpdate(@GetUser() payload: JwtPayload, @Body() body: User) {
    return this.userService
      .update(payload.userId, body)
      .then((res) => {
        return {
          result: true,
          message: res,
        };
      })
      .catch((err) => {
        return {
          result: false,
          message: err,
        };
      });
  }
}
