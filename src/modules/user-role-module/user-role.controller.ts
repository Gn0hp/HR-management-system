import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserRoleService } from './user-role-service';
import {
  CommonQueryParam,
  parseQuery,
  queryParamBuilder,
  QueryParams,
} from '../../commons/query_params';
import { UserRole, UserRolePostRequest } from './UserRole';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserRoleDto } from '../../entities/dtos/UserRoleDto';
import { JwtAuthGuard } from '../../auth/jwt/jwt';
import {
  AuthInterceptor,
  RequiredPermission,
} from '../auth-module/auth.interceptor';
import {
  DELETE_PERMISSION,
  READ_PERMISSION,
  UPDATE_PERMISSION,
  WRITE_PERMISSION,
} from '../../commons/globals/Constants';
import { UserService } from '../user-module/user-service';
import { ResponseInterceptor } from '../../commons/CommonResponse';

// just need authentication, not required any roles or permissions (for get request only)
@Controller('user-roles')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
@ApiTags('User Roles')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  // http://localhost:3000/user-role/get
  @Get('get')
  @CommonQueryParam()
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @ApiOperation({
    summary: 'Get all user-role',
    description: 'Get all user-role, Permission: not required',
  })
  findAll(@Query() query: Record<string, any>) {
    const options: QueryParams = queryParamBuilder(query);
    return this.service.findAll(options);
  }
  // http://localhost:3000/user-role/get-by-user-id/1
  @Get('get-by-id/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @ApiOperation({
    summary: 'Get user-role by id',
    description: 'Get user-role by id, Permission: not required',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'user-role id',
  })
  findById(@Param('id') id) {
    return this.service.findById(id);
  }
  // http://localhost:3000/user-role/get-by-ids
  @Get('get-by-ids')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @CommonQueryParam()
  @ApiOperation({
    summary: 'Get user-role by ids',
    description: 'Get user-role by ids, Permission: not required',
  })
  @ApiQuery({
    name: 'ids',
    type: String,
    description: 'user-role ids',
    example: 'ids=1,3,5',
  })
  findByIds(@Query() query) {
    if (!query.ids) throw new Error('ids is required');
    const ids = query.ids.split(',');
    return this.service.findByIds(ids, queryParamBuilder(query));
  }

  // http://localhost:3000/user-role/get-by-options?name=abc&status=1
  @Get('get-by-options')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @ApiOperation({
    summary: 'Get user-role by options',
    description:
      'Get list user-role by options, receive properties of UserRole objects Permission: not required',
  })
  @ApiQuery({
    name: 'example query string',
    example: 'name=exName&status=ACTIVE&description=exDescription',
  })
  @CommonQueryParam()
  findByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.service.findByOptions(asBody, queryParamBuilder(query));
  }
  @Get('get-one-by-options')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @ApiOperation({
    summary: 'Get one user-role by options',
    description: 'Get one user-role by options, Permission: not required',
  })
  @ApiQuery({
    name: 'example query string',
    example: 'name=exName&status=ACTIVE&description=exDescription',
  })
  findOneByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.service.findOneByOptions(asBody);
  }

  @Post('save')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(WRITE_PERMISSION)
  //@UseInterceptors(new AuthInterceptor(WRITE_PERMISSION, undefined))
  @ApiOperation({
    summary: 'Save user-role',
    description: 'Save user-role, Require permission: W',
  })
  save(@Body() body: UserRolePostRequest) {
    return this.service.save(body);
  }
  @Put('update/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(UPDATE_PERMISSION)
  @ApiOperation({
    summary: 'Update user-role',
    description: 'Update user-role, Require permission: U',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'user-role id',
  })
  //@UseInterceptors(new AuthInterceptor(UPDATE_PERMISSION))
  update(@Param('id') id, @Body() body: UserRole) {
    return this.service.update(id, new UserRoleDto(body));
  }
  @Delete('delete/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(DELETE_PERMISSION)
  @ApiOperation({
    summary: 'Delete user-role',
    description: 'Delete user-role, Require permission: D',
  })
  //@UseInterceptors(new AuthInterceptor(DELETE_PERMISSION))
  delete(@Param('id') id) {
    return this.service.delete(id);
  }
  @Delete('soft-delete/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(DELETE_PERMISSION)
  @ApiOperation({
    summary: 'Soft delete user-role',
    description: 'Soft delete user-role, Require permission: D',
  })
  softDelete(@Param('id') id) {
    const updatedUserRole: UserRole = {
      is_deleted: true,
      deleted_at: new Date(),
    };
    return this.service.update(id, new UserRoleDto(updatedUserRole));
  }
}
