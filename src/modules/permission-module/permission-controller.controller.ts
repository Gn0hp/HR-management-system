import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PermissionService } from './permission-service';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  CommonQueryParam,
  parseQuery,
  queryParamBuilder,
} from '../../commons/query_params';
import { Permission } from './Permission';
import { PermissionDto } from '../../entities/dtos/PermissionDto';
import { JwtAuthGuard } from '../../auth/jwt/jwt';
import { UserService } from '../user-module/user-service';
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

@Controller('permissions')
@UseGuards(JwtAuthGuard)
@ApiTags('Permissions')
export class PermissionControllerController {
  constructor(
    private readonly service: PermissionService,
    @Inject(UserService) private readonly userService: UserService,
  ) {}
  @Get('get')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @CommonQueryParam()
  @ApiOperation({
    summary: 'Get all permission',
    description: 'Get all permission, Permission: not required',
  })
  findAll(@Query() query: Record<string, any>) {
    return this.service.findAll(queryParamBuilder(query));
  }
  @Get('get-by-id/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @ApiOperation({
    summary: 'Get permission by id',
    description: 'Get permission by id, Permission: not required',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'permission id',
  })
  findById(@Param('id') id: number) {
    return this.service.findById(id);
  }
  @Get('get-by-ids')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @CommonQueryParam()
  @ApiOperation({
    summary: 'Get permission by ids',
    description: 'Get permission by ids, Permission: not required',
  })
  @ApiQuery({
    name: 'ids',
    type: String,
    description: 'permission ids',
    example: 'ids=1,2,3',
  })
  findByIds(@Query() query) {
    if (!query.ids) throw new Error('ids is required');
    const ids = query.ids.split(',');
    return this.service.findByIds(ids, queryParamBuilder(query));
  }
  @Get('get-by-options')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @CommonQueryParam()
  @ApiOperation({
    summary: 'Get permission by options',
    description: 'Get permission by options, Permission: not required',
  })
  @ApiQuery({
    name: 'example query string',
    example: 'name=exName&status=ACTIVE&description=exDescription',
  })
  findByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.service.findByOptions(asBody, queryParamBuilder(query));
  }
  @Get('get-one-by-options')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(READ_PERMISSION)
  @ApiOperation({
    summary: 'Get permission by options',
    description: 'Get permission by options, Permission: not required',
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
  //@UseInterceptors(new AuthInterceptor(WRITE_PERMISSION))
  @ApiOperation({
    summary: 'Save permission',
    description: 'Save permission, Permission: WRITE_PERMISSION',
  })
  save(@Body() body: Permission) {
    return this.service.save(new PermissionDto(body));
  }
  @Put('update/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(UPDATE_PERMISSION)
  //@UseInterceptors(new AuthInterceptor(UPDATE_PERMISSION))
  @ApiOperation({
    summary: 'Update permission',
    description: 'Update permission, Permission: UPDATE_PERMISSION',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'permission id',
  })
  update(@Param('id') id, @Body() body: Permission) {
    return this.service.update(id, new PermissionDto(body));
  }
  @Delete('delete/:id')
  @UseInterceptors(AuthInterceptor)
  @RequiredPermission(DELETE_PERMISSION)
  //@UseInterceptors(new AuthInterceptor(DELETE_PERMISSION))
  @ApiOperation({
    summary: 'Delete permission',
    description: 'Delete permission, Permission: DELETE_PERMISSION',
  })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'permission id',
  })
  delete(@Param('id') id) {
    return this.service.delete(id);
  }
}
