import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RoleService } from './role-service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  CommonQueryParam,
  parseQuery,
  queryParamBuilder,
} from '../../commons/query_params';
import { Role } from './Role';
import { RoleDto } from '../../entities/dtos/RoleDto';
import { JwtAuthGuard } from '../../auth/jwt/jwt';
import {
  AuthInterceptor,
  RequiredPermission,
} from '../auth-module/auth.interceptor';
import {
  DELETE_PERMISSION,
  READ_PERMISSION,
  WRITE_PERMISSION,
} from '../../commons/globals/Constants';
import { ResponseInterceptor } from '../../commons/CommonResponse';

@Controller('roles')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ResponseInterceptor)
@ApiTags('Roles')
export class RoleControllerController {
  constructor(private readonly roleService: RoleService) {}
  @Get('get')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @CommonQueryParam()
  @ApiOperation({
    summary: 'Get all role',
    description: 'Get all role, Permission: not required',
  })
  findAll(@Query() query: Record<string, any>) {
    const options = queryParamBuilder(query);
    return this.roleService.findAll(options);
  }
  @Get('get-by-id/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @ApiOperation({
    summary: 'Get role by id',
    description: 'Get role by id, Permission: not required',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'role id',
  })
  findById(@Param('id') id) {
    return this.roleService.findById(id);
  }
  @Get('get-by-ids')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @CommonQueryParam()
  @ApiOperation({
    summary: 'Get role by ids',
    description: 'Get role by ids, Permission: not required',
  })
  @ApiQuery({
    name: 'ids',
    type: String,
    description: 'role ids',
    example: 'ids=1,2,3',
  })
  findByIds(@Query() query) {
    if (!query.ids) throw new Error('ids is required');
    const ids = query.ids.split(',');
    return this.roleService.findByIds(ids, queryParamBuilder(query));
  }
  @Get('get-by-options')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @CommonQueryParam()
  @ApiOperation({
    summary: 'Get role by options',
    description: 'Get role by options, Permission: not required',
  })
  @ApiQuery({
    name: 'example query string',
    example: 'name=exName&status=ACTIVE&description=exDescription',
  })
  findByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.roleService.findByOptions(asBody, queryParamBuilder(query));
  }
  @Get('get-one-by-options')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @ApiOperation({
    summary: 'Get one role by options',
    description: 'Get one role by options, Permission: not required',
  })
  @ApiQuery({
    name: 'example query string',
    example: 'name=exName&status=ACTIVE&description=exDescription',
  })
  findOneByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.roleService.findOneByOptions(asBody);
  }
  @Post('save')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(WRITE_PERMISSION)
  @ApiOperation({
    summary: 'Save role',
    description: 'Save role, Permission WRITE_ROLE',
  })
  @ApiBody({
    type: Role,
  })
  save(@Body() body: Role) {
    return this.roleService.save(new RoleDto(body));
  }
  @Put('update/:id')
  //@UseInterceptors(new AuthInterceptor(UPDATE_PERMISSION))
  @ApiOperation({
    summary: 'Update role',
    description: 'Update role, Permission UPDATE_ROLE',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'role id',
  })
  @ApiBody({
    type: Role,
  })
  update(@Param('id') id, @Body() body: Role) {
    return this.roleService.update(id, new RoleDto(body));
  }
  @Delete('delete/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(DELETE_PERMISSION)
  //@UseInterceptors(new AuthInterceptor(DELETE_PERMISSION))
  @ApiOperation({
    summary: 'Delete role',
    description: 'Delete role, Permission DELETE_ROLE',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'role id',
  })
  delete(@Param('id') id) {
    return this.roleService.delete(id);
  }
}
