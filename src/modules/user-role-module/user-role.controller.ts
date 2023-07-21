import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { UserRoleService } from './user-role-service';
import { queryParamBuilder, QueryParams } from '../../commons/query_params';
import { UserRole } from '../../entities/UserRole';
import { ApiTags } from '@nestjs/swagger';

@Controller('user-role')
@ApiTags('user-role')
export class UserRoleController {
  constructor(private readonly service: UserRoleService) {}

  // http://localhost:3000/user-role/get-by-user-id/1
  @Get('get-by-id/:id')
  findById(@Param('id') id, @Query() query) {
    return this.service.findById(id, queryParamBuilder(query));
  }
  // http://localhost:3000/user-role/get-by-ids
  @Post('get-by-ids')
  findByIds(@Query() query, @Body() body: { ids: number[] }) {
    return this.service.findByIds(body.ids, queryParamBuilder(query));
  }
  @Post('get-by-options')
  findByOptions(@Query() query, @Body() body: { options: any }) {
    return this.service.findByOptions(body.options, queryParamBuilder(query));
  }
  @Post('save')
  save(@Body() body: { entity: UserRole }) {
    return this.service.save(body.entity);
  }
  @Post('update/:id')
  update(@Param('id') id, @Body() body: { entity: UserRole }) {
    return this.service.update(id, body.entity);
  }
  @Post('delete/:id')
  delete(@Param('id') id) {
    return this.service.delete(id);
  }
  // http://localhost:3000/user-role/get
  @Get('get')
  findAll(@Query() query: Record<string, any>) {
    const options: QueryParams = queryParamBuilder(query);
    return this.service.findAll(options);
  }
}
