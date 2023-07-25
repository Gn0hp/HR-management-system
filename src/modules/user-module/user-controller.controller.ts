import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user-service';
import { GetUser, JwtAuthGuard } from 'src/auth/jwt/jwt';
import {
  DELETE_PERMISSION,
  READ_PERMISSION,
  UPDATE_PERMISSION,
} from '../../commons/globals/Constants';
import { AuthInterceptor } from '../../commons/auth.interceptor';
import { User } from '../../entities/User';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { parseQuery } from '../../commons/query_params';

@Controller('user-controller')
@ApiTags('user-controller')
export class UserControllerController {
  constructor(private readonly service: UserService) {}

  @Get('get/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor(READ_PERMISSION))
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
    return this.service.findById(id);
  }

  @Get('get')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor(READ_PERMISSION))
  @ApiOperation({
    summary: 'Get all user',
    description: 'Get all user, Permission: READ_USER.',
  })
  findAll() {
    return this.service.findAll();
  }
  @Get('get-roles/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor(READ_PERMISSION))
  @ApiOperation({
    summary: 'Get all roles by user id',
    description: 'Get all roles by user id, Permission: READ_USER.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'user id',
  })
  findRolesByUserId(@GetUser() user, @Param('id') id: number) {
    return this.service.getAllPermissionByUserId(id);
  }
  @Get('get-by-options')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor(READ_PERMISSION))
  @ApiOperation({
    summary: 'Get list users by options',
    description: 'Get user by options, Permission: READ_USER.',
  })
  @ApiParam({
    name: 'exampleQuery',
    description: 'properties of user entity',
    example: 'id=1&name=abc&...',
  })
  findByOptions(@GetUser() user, @Query() query) {
    const filterUser = <User>parseQuery(query);
    return this.service.findByOptions(filterUser);
  }
  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor(DELETE_PERMISSION))
  @ApiOperation({
    summary: 'Delete user by id',
    description: 'Delete user by id, Permission: DELETE_USER.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'user id',
  })
  delete(@Param('id') id: number) {
    return this.service
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
  @Patch('update/:id')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new AuthInterceptor(UPDATE_PERMISSION))
  @ApiOperation({
    summary: 'Update user by id',
    description: 'Update user by id, Permission: UPDATE_USER.',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'user id',
  })
  update(@Param('id') id: number, @Body() body: User) {
    return this.service
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
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Update user by id',
    description: 'Update user by id, Permission: just need authenticate.',
  })
  selfUpdate(@GetUser() payload, @Body() body: User) {
    return this.service
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
