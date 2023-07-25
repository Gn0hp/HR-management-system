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
import { RoleService } from './role-service';
import {ApiOperation, ApiParam, ApiQuery, ApiTags} from '@nestjs/swagger';
import {
  CommonQueryParam,
  parseQuery,
  queryParamBuilder,
} from '../../commons/query_params';
import { Role } from '../../entities/Role';
import { RoleDto } from '../../entities/dtos/RoleDto';
import { JwtAuthGuard } from '../../auth/jwt/jwt';
import { AuthInterceptor } from '../../commons/auth.interceptor';
import {
  DELETE_PERMISSION,
  UPDATE_PERMISSION,
  WRITE_PERMISSION,
} from '../../commons/globals/Constants';

@Controller('role-controller')
@UseGuards(JwtAuthGuard)
@ApiTags('role-controller')
export class RoleControllerController {
  constructor(private readonly roleService: RoleService) {}
  @Get('get')
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
  @UseInterceptors(new AuthInterceptor(WRITE_PERMISSION))
  @ApiOperation({
    summary: 'Save role',
    description: 'Save role, Permission WRITE_ROLE',
  })
  save(@Body() body: Role) {
    return this.roleService.save(new RoleDto(body));
  }
  @Patch('update/:id')
  @UseInterceptors(new AuthInterceptor(UPDATE_PERMISSION))
  @ApiOperation({
    summary: 'Update role',
    description: 'Update role, Permission UPDATE_ROLE',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'role id',
  })
  update(@Param('id') id, @Body() body: Role) {
    return this.roleService.update(id, new RoleDto(body));
  }
  @Post('delete/:id')
  @UseInterceptors(new AuthInterceptor(DELETE_PERMISSION))
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
