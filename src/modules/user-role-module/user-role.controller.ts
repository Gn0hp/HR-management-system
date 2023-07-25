import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
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
import { UserRole } from '../../entities/UserRole';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UserRoleDto } from '../../entities/dtos/UserRoleDto';
import { JwtAuthGuard } from '../../auth/jwt/jwt';
import { AuthInterceptor } from '../../commons/auth.interceptor';
import {
  DELETE_PERMISSION,
  UPDATE_PERMISSION,
  WRITE_PERMISSION,
} from '../../commons/globals/Constants';

// just need authentication, not required any roles or permissions (for get request only)
@Controller('user-role')
@UseGuards(JwtAuthGuard)
@ApiTags('user-role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  // http://localhost:3000/user-role/get
  @Get('get')
  @CommonQueryParam()
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
  @CommonQueryParam()
  findByIds(@Query() query) {
    if (!query.ids) throw new Error('ids is required');
    const ids = query.ids.split(',');
    return this.service.findByIds(ids, queryParamBuilder(query));
  }

  // http://localhost:3000/user-role/get-by-options?name=abc&status=1
  @Get('get-by-options')
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
  @UseInterceptors(new AuthInterceptor(WRITE_PERMISSION))
  @ApiOperation({
    summary: 'Save user-role',
    description: 'Save user-role, Require permission: W',
  })
  save(@Body() body: UserRole) {
    return this.service.save(new UserRoleDto(body));
  }
  @Patch('update/:id')
  @ApiOperation({
    summary: 'Update user-role',
    description: 'Update user-role, Require permission: U',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'user-role id',
  })
  @UseInterceptors(new AuthInterceptor(UPDATE_PERMISSION))
  update(@Param('id') id, @Body() body: UserRole) {
    return this.service.update(id, new UserRoleDto(body));
  }
  @Post('delete/:id')
  @ApiOperation({
    summary: 'Delete user-role',
    description: 'Delete user-role, Require permission: D',
  })
  @UseInterceptors(new AuthInterceptor(DELETE_PERMISSION))
  delete(@Param('id') id) {
    return this.service.delete(id);
  }
}
