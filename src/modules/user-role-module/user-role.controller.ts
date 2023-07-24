import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UserRoleService } from './user-role-service';
import {
  parseQuery,
  queryParamBuilder,
  QueryParams,
} from '../../commons/query_params';
import { UserRole } from '../../entities/UserRole';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserRoleDto } from '../../entities/dtos/UserRoleDto';

@Controller('user-role')
@ApiTags('user-role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  // http://localhost:3000/user-role/get
  @Get('get')
  @ApiOperation({
    summary: 'Get all user-role',
    description: 'Get all user-role, Permission: READ_USER_ROLE',
  })
  findAll(@Query() query: Record<string, any>) {
    const options: QueryParams = queryParamBuilder(query);
    return this.service.findAll(options);
  }
  // http://localhost:3000/user-role/get-by-user-id/1
  @Get('get-by-id/:id')
  findById(@Param('id') id) {
    return this.service.findById(id);
  }
  // http://localhost:3000/user-role/get-by-ids
  @Get('get-by-ids')
  findByIds(@Query() query) {
    if (!query.ids) throw new Error('ids is required');
    const ids = query.ids.split(',');
    return this.service.findByIds(ids, queryParamBuilder(query));
  }

  // http://localhost:3000/user-role/get-by-options?name=abc&status=1
  @Get('get-by-options')
  findByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.service.findByOptions(asBody, queryParamBuilder(query));
  }
  @Get('get-one-by-options')
  findOneByOptions(@Query() query) {
    const asBody = parseQuery(query);
    return this.service.findOneByOptions(asBody);
  }

  @Post('save')
  save(@Body() body: { entity: UserRole }) {
    return this.service.save(new UserRoleDto(body.entity));
  }
  @Patch('update/:id')
  update(@Param('id') id, @Body() body: { entity: UserRole }) {
    return this.service.update(id, new UserRoleDto(body.entity));
  }
  @Post('delete/:id')
  delete(@Param('id') id) {
    return this.service.delete(id);
  }
}
